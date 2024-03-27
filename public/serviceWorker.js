const CACHE_NAME = 'v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/assets/plugin.js',
                    '/assets/chunk.js',
                ]).catch(error => {
                    console.error('Error while caching:', error);
                });
            })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.startsWith('chrome-extension')) {
        return;
    }

    if (!self.navigator.onLine && (event.request.url.includes('@vite/client') || event.request.url.includes('@react-refresh'))) {
        console.log('Offline mode activated');
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request).then(response => {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache).catch(error => {
                                console.error('Error while caching:', error);
                            });
                        });

                    return response;
                }).catch(error => {
                    return caches.match(event.request);
                });
            })
    );
});


self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});