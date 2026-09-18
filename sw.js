// This service worker exists only so the browser treats the site as an
// installable PWA. It deliberately does NOT cache anything, so every visit
// always gets whatever is currently deployed - no separate "update the app"
// step, ever.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
