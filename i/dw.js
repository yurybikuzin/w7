(function() { 'use strict'
// ============================================================================

const DB_NAME = 'bw'
const DB_VERSION = 1
const headers = new Headers([
  ['Accept', 'application/json'],
  ['Content-Type', 'application/json'],
])
const _idx_set = new Set()

let _idx_min
let _idx_max
let _page = 0
let _conditions = void 0
let _count = void 0
let cols = void 0

function open_idb(onsuccess) {
  const open = indexedDB.open(DB_NAME, DB_VERSION )
  open.onupgradeneeded = event => {
    const idb = event.target.result
    const searchResultStore = idb.createObjectStore('searchResult', {keyPath: 'idx'})
    searchResultStore.createIndex('guid', 'guid', {unique: true})

    const advStore = idb.createObjectStore('adv', {keyPath: 'guid'})
  }
  open.onversionchange = event => console.warn(event)
  open.onerror = event => console.error(event)
  open.onsuccess = event => onsuccess(event.target.result)
}

onmessage = function(event) {
  const start = performance.now()
  if (event.data.cmd == 'conditions') {
    let conditions = event.data.conditions
    _count = void 0

    open_idb(idb => {
      const transaction = idb.transaction(['searchResult'], 'readwrite')
      transaction.onerror = () => console.error(transaction.error)
      transaction.oncomplete = function(event) {
        postMessage({cmd: 'conditions', status: 'ok', _conditions})
        _conditions = conditions
        process()
      }
      var objectStore = transaction.objectStore("searchResult")
      var objectStoreRequest = objectStore.clear()
    })

  } else if (event.data.cmd == 'page') {
    _page = event.data.page
  } else if (event.data.cmd == 'idx_min_max') {
    _idx_min = event.data.idx_min
    _idx_max = event.data.idx_max
    process()
  } else if (event.data.cmd == 'idx_set') {
    for (let idx of event.data.idx_set) _idx_set.add(idx)
    open_idb(idb => {
      fetchHelper(idb, () => process(), (error) => finish(error) )
    })
  } else if (event.data.cmd == 'cols') {
    cols = event.data.cols
  } else {
    console.error(event.data)
  }
}

let _guids_to_fetch = new Set()
let _process_in_progress
let _process_failed
let _current_process
let _networkDuration
let _start
function finish(error) {
  if (error) {
    console.error(error, error.message, error.name)
    console.trace()
    _process_failed = true
  } else {
    _process_in_progress = false
    if (_current_process) {
      _current_process.totalTime = +(performance.now() - _start).toFixed(1)
      if (_networkDuration !== void 0) {
        _current_process.networkTime = +_networkDuration.toFixed(1)
        _current_process.dbTime = +(_current_process.totalTime - _current_process.networkTime).toFixed(1)
        _networkDuration = void 0
      }
      console.log(_current_process)
      _current_process = void 0
    }
    process()
  }
}

let _process_in_progress_raf
let _last_section
function process() {
  if (_process_failed) { console.error({_process_failed}); return }
  if (_process_in_progress_raf !== void 0) {
    clearTimeout(_process_in_progress_raf)
    _process_in_progress_raf = void 0
  }
  if (_process_in_progress) {
    _process_in_progress_raf = setTimeout(() => {
      _process_in_progress_raf = void 0
      if (_process_in_progress) console.warn({_process_in_progress, _last_section})
    }, 1000)
    return
  }
  // console.log(_idx_set, {_count}, _guids_to_fetch.size)
  _start = performance.now()
  if (_conditions && _page && (_count === void 0 || _idx_set.size) ) {
    _last_section = 'idx'
    _process_in_progress = true
    if (_count === void 0) {
      fetchSearchResult(0, _page * 3)
    } else {
      open_idb(idb => {
        fetchHelper(idb, () => {
          if (!_idx_set.size) { finish(); return }
          const idx_sorted = [..._idx_set].sort((a, b) => a - b)
          for (let i = idx_sorted.length - 1; i >= 0; i--) {
            const idx = idx_sorted[i]
            if (idx < _count) break
            _idx_set.delete(idx)
            idx_sorted.pop()
          }
          if (!idx_sorted.length) { finish(); return }
          let i, j
          for (i = 0; i < idx_sorted.length && idx_sorted[i] < _idx_min; i++);
          if (i >= idx_sorted.length) {
            _idx_set.clear()
            finish();
            return
          }
          let fetch_size = 0
          for (
            j = i;
            j - 1 >= 0 && idx_sorted[j - 1] + 1 == idx_sorted[j] && fetch_size <= _page;
            j--, fetch_size++
          );
          const fetch_from = idx_sorted[j]
          for (j--; j >= 0; j--) _idx_set.delete(idx_sorted[j])
          for (
            j = i;
            j < idx_sorted.length - 1 && idx_sorted[j] + 1 == idx_sorted[j + 1] && fetch_size < _page * 3;
            j++, fetch_size++
          );
          for (; j < idx_sorted.length; j++) _idx_set.delete(idx_sorted[j])
          if (fetch_size > 0) fetchSearchResult(fetch_from, fetch_size); else finish()
        }, (error) => finish(error) )
      })
    }
  } else if (_guids_to_fetch.size && _idx_min !== void 0 && _idx_max !== void 0) {
    _last_section = 'guid'
    _process_in_progress = true
    open_idb(idb => {
      const guids_to_fetch = new Set()
      var transaction = idb.transaction(["searchResult"], "readonly")
      transaction.onerror = () => finish(transaction.error)
      transaction.oncomplete = function(event) {
        try {
          _guids_to_fetch = guids_to_fetch
          if (guids_to_fetch.size) fetchAdv(guids_to_fetch); else finish()
        } catch(e) {
          finish(e)
        }
      }
      const idx_min = Math.max(0, _idx_min - _page)
      const idx_max = Math.min(_count - 1, idx_min + _page * 3 - 1)
      const searchResultStore = transaction.objectStore('searchResult')
      for (let idx = idx_min; idx <= idx_max; idx++) {
        const idxRequest = searchResultStore.get(idx)
        idxRequest.onerror = (event) => finish(event.target.result)
        idxRequest.onsuccess = (event) => {
          if (event.target.result) {
            const guid = event.target.result.guid
            if (_guids_to_fetch.has(guid)) guids_to_fetch.add(guid)
          }
        }
      }
    })
  }
}

function fetchAdv(guids_to_fetch) {
  _current_process = {fetchAdv: guids_to_fetch.size}
  // console.log({fetchAdv: guids_to_fetch.size})
  const bodyJson = {
    fields: [
      // key
      "guid",
      // adv hash like
      'search_update_datetime',

      "w6_offer_id",
      'object_guid',

      // linked to offer id
      "offer_pub_list",

      "deal_status_id",
      "user_deal_status_id",
      "winner_relevance",
      "free_mode_relevance",
      "photo_count",
      "video_count",
      "geo_cache_street_name",
      "price_rub",
      "pub_datetime",
      "media_id",
      "media_name",
      "broker.short_name",
      "broker.url",
      "external_url",
      "phone_list.is_black",
      "phone_list.black_note",
      "creation_datetime",
      "deal_type_id",
      "geo_cache_building_name",
      "storey",
      "storeys_count",
      "walls_material_type_id",
      "total_square",
      "life_square",
      "kitchen_square",
      "security_type_id",
      "note",
      "owners_count",
      "ownership_type_id",
      "ownership_year",
      "balcony_type_id",
      "price_change_date",
      "price_change_type_id",
      "video_list",
      "built_year",
      "sale_type_name",
      "agency_bonus",
      "agency_bonus_type_id",
      "agency_bonus_currency_type_id",
      "total_room_count",
      "offer_room_count",
      "is_studio",
      "is_free_planning",
      "realty_type_id",
      "rooms_adjacency_type_id",
      "geo_cache_subway_station_name_1",
      "geo_subway_station_guid_1",
      "transport_access_1",
      "walking_access_1",
      "geo_cache_subway_station_name_2",
      "geo_subway_station_guid_2",
      "transport_access_2",
      "walking_access_2",
      "geo_cache_subway_station_name_3",
      "geo_subway_station_guid_3",
      "transport_access_3",
      "walking_access_3",
      "geo_cache_subway_station_name_4",
      "geo_subway_station_guid_4",
      "transport_access_4",
      "walking_access_4",
      'water_closet_type_id',
      'parking_type_id',
      'territory_type_id',
      'window_overlook_type_id',
      'apartment_condition_type_id',
      'elevator_type_id',
      'square_explication',
      'meter_price_rub',
    ],
    filters: { guid: [...guids_to_fetch] },
    size: guids_to_fetch.size,
    conditions: _conditions,
    dsl_version:2,
  }

  const body = JSON.stringify(bodyJson)
  const fetchStart = performance.now()
  fetch(_url, {method: 'POST', headers, body, mode: 'cors'})
  .catch(error => finish(error) )
  .then(response => {
      if (response.status != 200) {
      finish([response.status, response.statusText, bodyJson])
    } else {
      _networkDuration = performance.now() - fetchStart
      // const start = Date.now()
      response.json()
      .catch(error => finish(error))
      .then(data => {
        open_idb(idb => {
          var transaction = idb.transaction(["adv"], "readwrite")
          transaction.onerror = () => finish(transaction.error)
          transaction.oncomplete = function(event) {
            const cell_texts = new Map()
            const transaction = idb.transaction(["searchResult", 'adv'], "readonly")
            transaction.onerror = () => finish(transaction.error)
            let finished = false
            transaction.oncomplete = (event) => {
              postMessage({cmd: 'cell_texts', status: 'ok', cell_texts})
              if (finished) console.log('finish')
              finish()
            }
            const searchResultStore = transaction.objectStore('searchResult')
            const guidIndex = searchResultStore.index('guid')
            if (_idx_min === void 0 || _idx_max === void 0) {
              console.error({_idx_min, _idx_max})
              finish()
            } else {
              const idx_min = Math.max(0, _idx_min - _page)
              const idx_max = Math.min(_count - 1, idx_min + _page * 3 - 1)

              let didSet = false
              for (let i = 0; i < data.advs.length; i++) {
                const adv = data.advs[i]
                const guidRequest = guidIndex.get(adv.guid)
                guidRequest.onerror = (event) => finish(event.target.result)
                guidRequest.onsuccess = (event) => {
                  if (event.target.result) {
                    const idx = event.target.result.idx
                    if (idx_min <= idx && idx <= idx_max) {
                      add_row_to(cell_texts, idx, adv)
                      didSet = true
                    }
                  }
                  if (i === data.advs.length - 1 && !didSet) {
                    console.warn('finish')
                    finished = true
                    finish()
                  }
                }
              }
            }
          }
          if (!data.advs.length) {
            finish()
          } else {
            var objectStore = transaction.objectStore("adv");
            for (let i = 0; i < data.advs.length; i++) {
              const adv = data.advs[i]
              var request = objectStore.put(adv) // TODO: use add instead of put
              _guids_to_fetch.delete(adv.guid)
            }
          }
        })
      })
    }
  })
}

const _url = 'https://mls.baza-winner.ru/v2/users/unauthenticated/items/_search.json?project_code=w7'
function fetchSearchResult(fetchFrom, size) {
   _current_process = {fetchFrom, size}
  // console.log({fetchFrom, size})
   const bodyJson = {
    aggregations: {
      avg_price_rub: true,
      avg_meter_price_rub: true,
    },
    fields: [
      "guid",
      'search_update_datetime',

      // "w6_offer_id",
      // 'object_guid',

      // user specific (linked to offer id)
      // "is_selected",
      // "is_favorite",
      // "is_hidden",
      // "is_sended_to_viewboard",
      // "is_liked_on_viewboard",
      // "is_disliked_on_viewboard",
      // "is_monitored",
      // "user_note",
    ],
    sort: [
      { winner_relevance: { order:"desc" } },
      { w6_offer_id: { order:"desc" } },
    ],
    from: fetchFrom,
    size,
    conditions: _conditions,
    // mixins: { is_selected: true },
    dsl_version:2,
  }
  const body = JSON.stringify(bodyJson)
  // console.log({fetchFrom, size})
  const fetchStart = performance.now()
  fetch(_url, {method: 'POST', headers, body, mode: 'cors'})
  .catch(error => finish(error))
  .then(response => {
    if (response.status != 200) {
      console.error(response.statusText)
      _count = null
      _process_in_progress = false
      _process_failed = true
    } else {
      _networkDuration = performance.now() - fetchStart
      // const start = Date.now()
      response.json()
      .catch(error => {
        console.error(error)
        _count = null
        _process_in_progress = false
        _process_failed = true
      })
      .then(data => {
        postMessage({cmd: 'count', status: 'ok', count: _count = data.meta.total})
        // console.warn({_count, fetchFrom, size}, data.advs)

        open_idb(idb => {

          var transaction = idb.transaction(["searchResult"], "readwrite")
          transaction.onerror = () => finish(transaction.error)
          transaction.oncomplete = function(event) {
            fetchHelper(idb, () => finish(), (error) => finish(error))
          }
          if (!data.advs.length) {
            finish()
          } else {
            var objectStore = transaction.objectStore("searchResult");
            for (let i = 0;  i < data.advs.length; i++) {
              const idx = fetchFrom + i
              _idx_set.add(idx)
              const adv = data.advs[i]
              const item = {idx, guid: adv.guid, search_update_datetime: adv.search_update_datetime}
              // objectStore.add(item);
              objectStore.put(item); // TODO: use add instead put
            }
          }
        })
      })
    }
  })
}

function fetchHelper(idb, oncomplete, onerror) {
  var transaction = idb.transaction(["searchResult"], "readwrite")
  transaction.onerror = () => onerror(transaction.error)
  transaction.oncomplete = function(event) {
    const transaction = idb.transaction(["searchResult", 'adv'], "readonly")
    const searchResultStore = transaction.objectStore('searchResult')
    const advStore = transaction.objectStore('adv')
    const cell_texts = new Map()
    transaction.onerror = () => onerror(transaction.error)
    transaction.oncomplete = function(event) {
      // console.log(_guids_to_fetch)
      if (cell_texts.size) postMessage({cmd: 'cell_texts', status: 'ok', cell_texts})
      oncomplete()
    }
    for (let idx of _idx_set) {
      searchResultStore.get(idx).onsuccess = function(event) {
        if (!event.target.result) return
        _idx_set.delete(idx)
        const {guid, search_update_datetime} = event.target.result
        const guidRequest = advStore.get(guid)
        guidRequest.onerror = (event) => onerror(event.target.result)
        guidRequest.onsuccess = function(event) {
          try {
            // console.log(event.target.result)
            const adv = event.target.result
            if (adv) add_row_to(cell_texts, idx, adv)
            if (!adv || adv.search_update_datetime != search_update_datetime) _guids_to_fetch.add(guid)
          } catch (e) {
            finish(e)
          }
        }
      }
    }
  }
}

function add_row_to(cell_texts, idx, adv) {
  const row = new Map()
  for (let fld of cols) {
    let result
    if (fld == 'blank') {

    } else if (fld == 'photo') {

    } else if (fld == 'room_qt') {
      result = adv['total_room_count']
    } else if (fld == 'metro') {
      result = adv['geo_cache_subway_station_name_1']
    } else if (fld == 'far') {
      const walking = adv['walking_access_1']
      const transport = adv['transport_access_1']
      result =
          walking ? walking + 'п' :
          transport ? transport + 'т' :
          ''
    } else if (fld == 'address') {
      const geo_cache_street_name = adv['geo_cache_street_name']
      const geo_cache_building_name = adv['geo_cache_building_name']
      result = !geo_cache_building_name ? geo_cache_street_name : geo_cache_street_name + ', ' + geo_cache_building_name
    }
    if (result != null) row.set(fld, result)
  }
  cell_texts.set(idx, row)
}

// ============================================================================
})()
