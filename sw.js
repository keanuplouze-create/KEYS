const CACHE_VERSION = 'v' + new Date().getTime();
const CACHE_NAME = 'studyhub-' + CACHE_VERSION;
const urlsToCache = [
  '/KEYS/',
  '/KEYS/index.html',
  '/KEYS/manifest.json'
];

// Installation
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.log('Cache error:', err))
  );
});

// Activation - alte Caches löschen
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - immer neue Version holen
self.addEventListener('fetch', event => {
  // Bei index.html IMMER vom Server laden
  if (event.request.url.includes('index.html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        })
        .catch(err => {
          return caches.match(event.request);
        })
    );
  } else {
    // Andere Dateien: Cache first, dann Network
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) return response;
          return fetch(event.request)
            .then(response => {
              const clonedResponse = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, clonedResponse);
              });
              return response;
            });
        })
        .catch(err => {
          return caches.match('/KEYS/index.html');
        })
    );
  }
});
