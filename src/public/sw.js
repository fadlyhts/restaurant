import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';
import CONFIG from './globals/config';

// Update daftar asset
const assetsToCache = [
  '/',
  '/index.html',
  '/favicon.png',
  '/manifest.json',
  '/app.bundle.js',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
];

self.addEventListener('install', (event) => {
  console.log('Installing Service Worker ...');
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  console.log('Activating Service Worker ...');
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (url.origin === location.origin) {
    event.respondWith(CacheHelper.revalidateCache(request));
  } else if (url.origin === CONFIG.BASE_URL) {
    event.respondWith(
      caches.open(CONFIG.CACHE_NAME).then(async (cache) => {
        try {
          const response = await fetch(request);
          cache.put(request, response.clone());
          return response;
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
          return caches.match(request);
        }
      })
    );
  }
});
