const CACHE_NAME = 'v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/assets/plugin.js',
    '/assets/chunk.js',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(URLS_TO_CACHE))
            .catch(error => console.error('Error while caching:', error))
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.startsWith(self.location.origin) || event.request.url.startsWith('http')) {
        event.respondWith(
            fetch(event.request).then(response => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            }).catch(() => {
                return caches.match(event.request).then(response => {
                    return response || fetch(event.request);
                });
            })
        );
    }
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
