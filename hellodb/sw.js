var cacheName = 'Hello-PWA';

var filesToCache = [
    '/',
    '/css/style.css'
];

/* start the service worker and cache all of the app's */

self.addEventListener('install',function(e) {
    e.waitUntil(
        caches.open(cacheName).then(
            function(cache) {
                return cache.addAll(filesToCache);
            }
        )
    );
});


/* serve cache content when offline */

self.addEventListener('fetch',function(e) {
    e.respondWith (
        caches.match(e.request).then(
            function(response) {
                return response || fetch(e.request);
            }
        )
    );
});