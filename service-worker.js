// ===============================
// Foreman Affiliates Agency
// Service Worker with Cache Busting
// ===============================

const CACHE_NAME = "foreman-affiliates-cache-v5"; // bump version when updating
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/favicon.png",
  "/apple-touch-icon.png",
  "/mstile-150x150.png",
  "/manifest.json",
  "/assets/preview.png"
];

// Install SW and cache assets
self.addEventListener("install", (event) => {
  console.log(`🟢 Installing service worker, cache: ${CACHE_NAME}`);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

// Serve requests, update cache in background
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      });
      return response || fetchPromise;
    })
  );
});

// Clean old caches
self.addEventListener("activate", (event) => {
  console.log(`⚡ Activating new service worker: ${CACHE_NAME}`);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});
