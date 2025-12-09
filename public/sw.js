// Use timestamp-based cache version to force updates on each deployment
const CACHE_VERSION = 'v2.0.0';
const BUILD_TIMESTAMP = '2025-12-09T06-13-44Z';
const CACHE_NAME = `betteraibots-${CACHE_VERSION}-${BUILD_TIMESTAMP}`;

// Only activate service worker for BetterAiBots domains
const ALLOWED_ORIGINS = [
  'betteraibots.com',
  'www.betteraibots.com'
];

function isAllowedOrigin(url) {
  try {
    const urlObj = new URL(url);
    // Allow localhost only if it's specifically for BetterAiBots testing
    // Otherwise, only allow production domains
    if (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1') {
      // Check if the path suggests it's BetterAiBots (has /sw.js from BetterAiBots)
      return self.location.pathname.includes('bottify') || 
             self.location.pathname.includes('betteraibots') ||
             urlObj.pathname.includes('/sw.js');
    }
    return ALLOWED_ORIGINS.some(origin => urlObj.hostname === origin || urlObj.hostname.endsWith('.' + origin));
  } catch (e) {
    return false;
  }
}

const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/apple-touch-icon.png',
  '/og-image.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;800&display=swap',
  'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2',
  'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2',
  'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2'
];

// Install event - cache resources and skip waiting to activate immediately
self.addEventListener('install', (event) => {
  console.log('Service Worker installing with cache:', CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache failed:', error);
      })
      .then(() => {
        // Skip waiting to activate the new service worker immediately
        return self.skipWaiting();
      })
  );
});

// Fetch event - network-first strategy for updates, cache-fallback for offline
self.addEventListener('fetch', (event) => {
  // Only handle requests for BetterAiBots domains
  if (!isAllowedOrigin(event.request.url)) {
    return; // Let browser handle requests for other origins
  }
  
  // Skip service worker file itself
  if (event.request.url.includes('/sw.js')) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // For HTML, JS, CSS - use network-first to always get latest updates
  if (event.request.mode === 'navigate' || 
      event.request.url.includes('/static/js/') || 
      event.request.url.includes('/static/css/') ||
      event.request.url.includes('.html')) {
    
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Only cache successful responses with valid content
          if (response && response.status === 200) {
            // For JavaScript files, validate they're not empty or corrupted
            if (event.request.url.includes('/static/js/')) {
              // Validate asynchronously but don't block the response
              response.clone().text().then(text => {
                // Check if the response is valid JavaScript (not empty, not an error page)
                if (text && text.length > 100 && !text.includes('<!DOCTYPE') && !text.includes('Error')) {
                  const responseToCache = response.clone();
                  caches.open(CACHE_NAME)
                    .then((cache) => {
                      cache.put(event.request, responseToCache);
                    });
                } else {
                  console.log('Invalid JavaScript response, not caching:', event.request.url);
                }
              }).catch(() => {
                // If we can't validate, don't cache but still return the response
                console.log('Could not validate JavaScript, not caching:', event.request.url);
              });
            } else {
              // For non-JS files, cache normally
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }
          }
          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(event.request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                // For JavaScript, validate cached response before using it
                if (event.request.url.includes('/static/js/')) {
                  // Validate the cached response
                  return cachedResponse.clone().text().then(text => {
                    // If cached JS is invalid, don't use it - let it fail so browser can retry
                    if (!text || text.length < 100 || text.includes('<!DOCTYPE') || text.includes('Error')) {
                      console.log('Cached JavaScript is invalid, not using cache:', event.request.url);
                      // Delete the bad cache entry
                      caches.open(CACHE_NAME).then(cache => cache.delete(event.request));
                      // Return network error to force browser retry
                      return new Response('Invalid cached content', { status: 503 });
                    }
                    return cachedResponse;
                  }).catch(() => {
                    // If we can't validate, don't use cache
                    return new Response('Could not validate cache', { status: 503 });
                  });
                }
                return cachedResponse;
              }
              // If navigation fails and no cache, return offline page
              if (event.request.mode === 'navigate') {
                return caches.match('/offline.html');
              }
              return new Response('Network error', { status: 503 });
            });
        })
    );
    return;
  }

  // For Google Fonts - use cache-first and suppress 503 errors
  if (event.request.url.includes('fonts.googleapis.com') || 
      event.request.url.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            // Return cached version immediately, update in background
            fetch(event.request)
              .then((response) => {
                if (response && response.status === 200) {
                  const responseToCache = response.clone();
                  caches.open(CACHE_NAME)
                    .then((cache) => {
                      cache.put(event.request, responseToCache);
                    });
                }
              })
              .catch(() => {
                // Silently ignore Google Fonts network errors
              });
            return cachedResponse;
          }
          // Not in cache, try network but return empty response if it fails
          return fetch(event.request)
            .then((response) => {
              if (response && response.status === 200) {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseToCache);
                  });
              }
              return response;
            })
            .catch(() => {
              // Return empty CSS response if Google Fonts fails (browser uses fallback fonts)
              return new Response('', { 
                status: 200, 
                headers: { 'Content-Type': 'text/css' } 
              });
            });
        })
    );
    return;
  }
  
  // For other static assets (images, etc.) - use cache-first with network fallback
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Also fetch in background to update cache
          fetch(event.request)
            .then((response) => {
              if (response && response.status === 200) {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseToCache);
                  });
              }
            })
            .catch(() => {
              // Ignore background fetch errors
            });
          return cachedResponse;
        }
        
        // Not in cache, fetch from network
        return fetch(event.request)
          .then((response) => {
            if (response && response.status === 200) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }
            return response;
          })
          .catch(() => {
            return new Response('Network error', { status: 503 });
          });
      })
  );
});

// Activate event - clean up old caches and claim clients immediately
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating with cache:', CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete all caches that don't match current cache name
          if (!cacheName.startsWith('betteraibots-') || cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Claim all clients immediately to activate the new service worker
      return self.clients.claim();
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle any background sync tasks
  console.log('Background sync triggered');
  return Promise.resolve();
}

// Push notifications (if implemented later)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update from BetterAiBots!',
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Bots',
        icon: '/logo192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/logo192.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('BetterAiBots', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
}); 