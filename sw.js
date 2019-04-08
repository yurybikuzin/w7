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