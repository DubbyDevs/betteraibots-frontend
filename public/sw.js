// Cleanup-only service worker to disable PWA caching.
// This clears old caches and unregisters itself on activation.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
    } catch (err) {
      // Ignore cache cleanup failures; still proceed to unregister.
    }

    try {
      await self.registration.unregister();
    } catch (err) {
      // Ignore unregister failures.
    }

    await self.clients.claim();
    const clientList = await self.clients.matchAll({ type: 'window' });
    clientList.forEach((client) => {
      if (client.navigate) {
        client.navigate(client.url);
      }
    });
  })());
});
