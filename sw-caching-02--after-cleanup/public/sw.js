
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open('static').then(function (cache) {
      console.log('[Service Worker] Precaching app shell');
      cache.add('/');
      cache.add('/index.html');
      cache.add('src/js/app.js');
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log('already existed');
        return response;
      } else {
        console.log('didnt exist yet');
        return fetch(event.request);
      }
    })
  );
});