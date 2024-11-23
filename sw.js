const CACHE_NAME = `cognify-v1`;

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      // Attempt to add all resources to the cache
      await cache.addAll([
        '/',
        '/Cognify/converter.js',
        '/Cognify/stylesheet.css'
      ]);
    } catch (error) {
      // Log the error if any resource fails to cache
      console.error('Failed to cache resources:', error);
    }
  })());
});

self.addEventListener('fetch', event => {
  if(event.request.url.indexOf('firestore.googleapis.com') === -1) {
  event.respondWith((async () => {
  const cache = await caches.open(CACHE_NAME);

  // Get the resource from the cache.
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
      } else {
        try {
          // If the resource was not in the cache, try the network.
        const fetchResponse = await fetch(event.request);

          // Save the resource in the cache and return it.
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
       } catch (e) {
          // The network failed.
       }
   }
 })());
}
});
