// const STORE = 'adv'
// const KEY_NAME = 'guid'

// function idb() {
//   return new Promise((resolve, reject) => {
//     const open = indexedDB.open('bw', DB_VERSION )
//     open.onupgradeneeded = event => {
//       idb = event.target.result
//       idb.createObjectStore(STORE, {
//         keyPath: KEY_NAME
//       })
//     }
//     open.onversionchange = event => {
//       console.warn(event)
//     }
//     open.onerror = event => {
//       console.log(event)
//       reject(event.target.error)
//     }
//     open.onsuccess = event => {
//       resolve(event.target.result)
//     }
//     // console.log(open)
//   })
//   .catch(error => console.log(error))
// }

const DB_NAME = 'bw'
const DB_VERSION = 1

function open_idb(onsuccess) {
  const open = indexedDB.open(DB_NAME, DB_VERSION )
  open.onupgradeneeded = event => {
    idb = event.target.result
    const advStore = idb.createObjectStore('adv', {
      keyPath: 'guid',
    })
    advStore.createIndex('w6_offer_id', 'w6_offer_id', {unique: true})
    advStore.createIndex('object_guid', 'object_guid', {unique: false})
    idb.createObjectStore('user', {
      keyPath: ['user_id', 'offer_id'],
    })
    // idb.createObjectStore('offerIdSpecific', {
    //   keyPath: 'offer_id',
    // })
    // idb.createObjectStore('snippet', {
    //   keyPath: 'object_guid',
    // })
  }
  open.onversionchange = event => {
    postMessage({status: 'warn', message: `${event}`})
  }
  open.onerror = event => {
    postMessage({status: 'error', message: `${event}`})
  }
  open.onsuccess = event => {
    onsuccess(event.target.result)
  }
}

// https://www.w3.org/TR/IndexedDB/
onmessage = function(event) {
  if (event.data.cmd == 'recs') {
    const request = event.data
    // console.log(request)
    open_idb(idb => {
      const response = {}

      const transaction = idb.transaction('adv', 'readonly')
      const start = Date.now()
      const objectStore = transaction.objectStore('adv');
      let idx = 0
      if (request.by_guid) {
        response.by_guid = new Map()
        const guidIter = request.by_guid.keys()
        const nextGuid = () => {
          const next = guidIter.next()
          // console.log(next)
          if (next.done) {
            // console.log(response)
            postMessage({status: 'ok', ...response, timing: Date.now() - start})
          } else {
            let guidRequest = objectStore.get(next.value) // https://www.oreilly.com/library/view/client-side-data-storage/9781491935101/ch04.html
            guidRequest.onsuccess = (event) => {
              // console.log(event)
              const fld_values = event.target.result
              const guid = next.value
              const guid_request = request.by_guid.get(guid)
              const guid_response = new Map()
              // console.log(guid_request)
              guid_request.forEach(fld => {
                const fld_value = fld_values[fld]
                if (fld_value !== void 0) {
                  guid_response.set(fld, fld_value)
                }
              })
              if (guid_response.size) {
                response.by_guid.set(guid, guid_response)
              }
              // console.log(guid_response, response.by_guid)
              nextGuid()
            }
            guidRequest.onerror = (event) => {
              console.error(event)
              nextGuid()
            }
          }
        }
        nextGuid()
      } else if (request.by_idx) {
        response.by_idx = new Map()
        const openCursor = objectStore.openCursor()
        openCursor.onsuccess = function(event) {
          var cursor = event.target.result;
          // const size = 500
          if (cursor) {
            if (request.by_idx.has(idx)) {
              const idx_request = request.by_idx.get(idx)
              const idx_response = new Map()
              idx_request.forEach(fld => {
                const fld_value = cursor.value[fld]
                if (fld_value !== void 0) {
                  idx_response.set(fld, fld_value)
                }
              })
              response.by_idx.set(idx, idx_response)
              if (response.by_idx.size >= request.by_idx.size) {
                postMessage({status: 'ok', ...response, timing: Date.now() - start})
                return
              }
            }
            idx++
            cursor.continue();
          } else {
            postMessage({status: 'ok', ...response, timing: Date.now() - start})
          }
        }
      } else {
        postMessage({status: 'warn', message: 'no .by_guid, neither .by_idx'})
      }
    })
  } else if (event.data.cmd == 'count') {
    open_idb(idb => {
      const transaction = idb.transaction(['adv'], 'readonly')
      const start = Date.now()
      const objectStore = transaction.objectStore('adv');
      let count = 0
      const openCursor = objectStore.openCursor()
      openCursor.onsuccess = function(event) {
        var cursor = event.target.result;
        // postMessage({status: 'ok', count, timing: Date.now() - start})
        // const size = 1
        const size = 10000
        if (cursor) {
          count++
          cursor.continue();
        } else if (count >= size) {
          postMessage({status: 'ok', count, timing: Date.now() - start})
        } else {
          const headers = new Headers([
            ['Accept', 'application/json'],
            ['Content-Type', 'application/json'],
          ])
          // {"filters":{"guid":"00B3EA1A-9961-0000-002C-00638D7C0000"},"conditions":{"realty_section":{"code":["flat"]},"area":{"code":["msk"]},"deal_type":{"code":["sale"]}},"from":0,"size":1,"dsl_version":2,"fields":["user_note","note","owners_count","ownership_type_id","ownership_year"]}
          const bodyJson = {
            aggregations: {
              avg_price_rub: true,
              avg_meter_price_rub: true,
            },
            fields: [
              // key
              "guid",

              // adv hash like
              'search_update_datetime',

              "w6_offer_id",
              'object_guid',

              // user specific (linked to offer id)
              "is_selected",
              "is_favorite",
              "is_hidden",
              "is_sended_to_viewboard",
              "is_liked_on_viewboard",
              "is_disliked_on_viewboard",
              "is_monitored",
              "user_note",

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
            sort: [
              { winner_relevance: { order:"desc" } },
              { w6_offer_id: { order:"desc" } },
            ],
            from: 0,
            size,
            conditions: {
              published_days_ago: { days: 7 },
              realty_section: { code: ["flat"] },
              deal_type: { code: ["sale"] },
              area: { code:["msk"] },
              is_deal_actual: true,
              use_strict_conditions: true,
            },
            mixins: { is_selected: true },
            dsl_version:2,
          }
          const body = JSON.stringify(bodyJson)
          const start = Date.now()
          fetch('https://mls.baza-winner.ru/v2/users/unauthenticated/items/_search.json?project_code=w7', {
            method: 'POST',
            headers,
            body,
            // body: `{"aggregations":{"avg_price_rub":true,"avg_meter_price_rub":true},"fields":["guid","deal_status_id","user_deal_status_id","winner_relevance","w6_offer_id","w6_offer_pub_list","object_guid","free_mode_relevance","is_selected","is_favorite","is_hidden","is_sended_to_viewboard","is_liked_on_viewboard","is_disliked_on_viewboard","is_monitored","photo_count","video_count","geo_cache_street_name","price_rub","pub_datetime","media_id","media_name","broker.short_name","broker.url","external_url","phone_list.is_black","phone_list.black_note","creation_datetime","deal_type_id","geo_cache_building_name","storey","storeys_count","walls_material_type_id","total_square","life_square","kitchen_square","security_type_id","user_note","note","owners_count","ownership_type_id","ownership_year","balcony_type_id","price_change_date","price_change_type_id","video_list","built_year","sale_type_name","agency_bonus","agency_bonus_type_id","agency_bonus_currency_type_id","total_room_count","offer_room_count","is_studio","is_free_planning","realty_type_id","rooms_adjacency_type_id","geo_cache_subway_station_name_1","geo_subway_station_guid_1","transport_access_1","walking_access_1","geo_cache_subway_station_name_2","geo_subway_station_guid_2","transport_access_2","walking_access_2","geo_cache_subway_station_name_3","geo_subway_station_guid_3","transport_access_3","walking_access_3","geo_cache_subway_station_name_4","geo_subway_station_guid_4","transport_access_4","walking_access_4"],"sort":[{"winner_relevance":{"order":"desc"}},{"w6_offer_id":{"order":"desc"}}],"from":0,"size":${size},"conditions":{"published_days_ago":{"days":7},"realty_section":{"code":["flat"]},"deal_type":{"code":["sale"]},"area":{"code":["msk"]},"is_deal_actual":true,"use_strict_conditions":true},"mixins":{"is_selected":true},"dsl_version":2}`,
            mode: 'cors',
            cache: 'no-store',
          })
          .catch(error => postMessage({status: 'error', message: `${error}`}))
          .then(response => {
            console.log({fetch: Date.now() - start})
            if (response.status != 200) {
              postMessage({status: 'error', message: response.statusText})
            } else {
              const start = Date.now()
              response.json()
              .catch(error => postMessage({status: 'error', message: `${error}`}))
              .then(data => {
                // console.log(data)
                const count = data.advs.length
                const transaction = idb.transaction(['adv', 'user'], 'readwrite')
                transaction.oncomplete = (event) => {
                  postMessage({status: 'ok', count, timing: Date.now() - start})
                  console.log(event)
                }
                transaction.onabort = (event) => {
                  postMessage({status: 'error', message: `${event}`})
                  console.error(event)
                }
                const advStore = transaction.objectStore('adv')
                const userStore = transaction.objectStore('user')
                let success_qt = count
                const object_guid = {}
                for (let i = 0; i < count; i++) {
                  const adv = data.advs[i]
                  const user = { user_id: 'anon', offer_id: adv.w6_offer_id }
                  const flds = ['is_selected', 'is_favorite', 'is_hidden', 'is_sended_to_viewboard', 'is_liked_on_viewboard', 'is_disliked_on_viewboard', 'is_monitored', 'user_note']
                  for (let j = 0; j < flds.length; j++) {
                    const fld = flds[i]
                    user[fld] = adv[fld]
                    delete adv[fld]
                  }
                  advStore.put(adv)
                  userStore.put(user)
                  object_guid[adv.object_guid] = (object_guid[adv.object_guid] || 0) + 1
                }
                {
                  const qt = Object.keys(object_guid).length
                  const max = Math.max(...Object.keys(object_guid).map(key => object_guid[key]))
                  const avg = count / qt
                  console.log({qt, max, avg})
                  for (let i = max; i > 1; i--) {
                    console.log(i + ': ' + Object.keys(object_guid).map(key => object_guid[key]).filter(qt => qt == i).length)
                  }
                }
              })
            }
          })
        }
      }
    })
  }
}


;
// const DB_NAME = 'bw'
// const DB_VERSION = 2
// const STORE = 'advs'
// const KEY_NAME = 'guid'
// function createDB() {
//   if (!indexedDB) {
//     console.error('!window.indexedDB')
//     return
//   }
//   console.log('createDB')
//   const open = indexedDB.open('bw', DB_VERSION, function(upgradeDB) {
//     console.log('upgradeDB')
//     var store = upgradeDB.createObjectStore(STORE, {
//       keyPath: KEY_NAME
//     });
//     // store.put({id: 123, name: 'coke', price: 10.99, quantity: 200});
//     // store.put({id: 321, name: 'pepsi', price: 8.99, quantity: 100});
//     // store.put({id: 222, name: 'water', price: 11.99, quantity: 300});
//   })

//   open.onerror = function(event) {
//     console.error(event)
//   }
//   open.onsuccess = function(event) {
//     console.log(event)
//   }
// }
// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     createDB()
//   );
//   console.log('Brand new Finally active. Ready to start serving content!')
// })
// self.addEventListener('message', function(event){
//   // console.log(event.data)
//     // console.log("SW Received Message: ", event.data);
//     // event.ports[0].postMessage("SW Says 'Hello back!'");
//     // console.log(event)
//     const headers = new Headers([
//       ['Accept', 'application/json'],
//       ['Content-Type', 'application/json'],
//     ])
//     const size = event.data.size
//     fetch('https://mls.baza-winner.ru/v2/users/unauthenticated/items/_search.json?project_code=w7', {
//       method: 'POST',
//       headers,
//       body: `{"aggregations":{"avg_price_rub":true,"avg_meter_price_rub":true},"fields":["guid","deal_status_id","user_deal_status_id","winner_relevance","w6_offer_id","object_guid","free_mode_relevance","is_selected","is_favorite","is_hidden","is_sended_to_viewboard","is_liked_on_viewboard","is_disliked_on_viewboard","is_monitored","photo_count","video_count","geo_cache_street_name","price_rub","pub_datetime","media_id","media_name","broker.short_name","broker.url","external_url","phone_list.is_black","phone_list.black_note","creation_datetime","deal_type_id","geo_cache_building_name","storey","storeys_count","walls_material_type_id","total_square","life_square","kitchen_square","security_type_id","user_note","balcony_type_id","price_change_date","price_change_type_id","video_list","built_year","sale_type_name","agency_bonus","agency_bonus_type_id","agency_bonus_currency_type_id","total_room_count","offer_room_count","is_studio","is_free_planning","realty_type_id","rooms_adjacency_type_id","geo_cache_subway_station_name_1","geo_subway_station_guid_1","transport_access_1","walking_access_1","geo_cache_subway_station_name_2","geo_subway_station_guid_2","transport_access_2","walking_access_2","geo_cache_subway_station_name_3","geo_subway_station_guid_3","transport_access_3","walking_access_3","geo_cache_subway_station_name_4","geo_subway_station_guid_4","transport_access_4","walking_access_4"],"sort":[{"winner_relevance":{"order":"desc"}},{"w6_offer_id":{"order":"desc"}}],"from":0,"size":${size},"conditions":{"published_days_ago":{"days":7},"realty_section":{"code":["flat"]},"deal_type":{"code":["sale"]},"area":{"code":["msk"]},"is_deal_actual":true,"use_strict_conditions":true},"mixins":{"is_selected":true},"dsl_version":2}`,
//       mode: 'cors',
//       cache: 'no-store',
//     }).then(response => {
//       if (response.status != 200) {
//         event.ports[0].postMessage({error: response.statusText});
//       } else {
//         response.json()
//         .catch(error =>
//           event.ports[0].postMessage({error})
//         )
//         .then(data => {
//           event.ports[0].postMessage(data.advs)

//           const open = indexedDB.open(DB_NAME, DB_VERSION);
//           console.log(open)

//           open.onerror = function(event) {
//             console.error(event)
//           }
//           open.onsuccess = function(event) {
//             console.log(event)
//             let db = event.target.result
//             const advs = [...data.advs]
//             const putAdv = () => {
//               const transaction = db.transaction(STORE, 'readwrite')
//               const store = transaction.objectStore(STORE)
//               const request = store.put(advs[0])
//               request.onsuccess = function(e) {
//                 // todoDB.indexedDB.getAllTodoItems();
//                 console.log('request.onsuccess')
//               }
//               request.onerror = function(e) {
//                 console.error("Error Adding an item: ", e);
//               }

//               transaction.onerror = function(event) {
//                 console.error(event)
//               }
//               transaction.oncomplete(result => {
//                 console.log(result)
//               })
//             }
//             putAdv()

//             // result.onsuccess = function(event) {
//             //   if (!event.target.result) {
//             //     console.error(event)
//             //     reject('filesDir not set');
//             //   } else {
//             //     resolve(JSON.parse(event.target.result.value));
//             //   }
//             // }
//           }

//         })
//       }
//       return response
//     })
// });

const CACHE_NAME = 'bw-app-cache-v1'
self.addEventListener('install', (event) => {
  self.skipWaiting()
})
self.addEventListener('activate', function(event) {
  // event.waitUntil(
  //   createDB()
  // );
  console.log('Brand new Finally active. Ready to start serving content!')
})
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(response => {
      // console.log(event.request.url, response.status)
      if (response.status == 200) {
        if (event.request.referrer.endsWith('/dw.js')) {
          // console.log(event.request)
          return response
        } else {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          })
        }
      } else {
        caches.match(event.request).then(cachedResponse => {
          console.log('used cache')
          if (cachedResponse) {
            return cachedResponse
          } else {
            return response
          }
        })
      }
    })
  )
})
// self.addEventListener('push', function(event) {
//   var title = 'Yay a message.';
//   var body = 'We have received a push message.';
//   var icon = '/bw/app/logo_icon_192.png';
//   var tag = 'simple-push-example-tag';
//   event.waitUntil(
//     self.registration.showNotification(title, {
//       body: body,
//       icon: icon,
//       tag: tag
//     })
//   )
// })
;
export default $
//# sourceMappingURL=web.esm.js.map