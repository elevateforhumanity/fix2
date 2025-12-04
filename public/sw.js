const CACHE_VERSION = 'v3';
const CACHE_NAME = `elevate-${CACHE_VERSION}`;
const STATIC_CACHE = `elevate-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `elevate-dynamic-${CACHE_VERSION}`;
const API_CACHE = `elevate-api-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  '/offline',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/logo.svg',
  '/favicon.ico',
];

const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
};

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate and clear old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.startsWith('elevate-') && !cacheName.includes(CACHE_VERSION))
            .map((cacheName) => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Determine caching strategy based on request
function getCacheStrategy(request) {
  const url = new URL(request.url);
  
  // API requests: Network first with short cache fallback
  if (url.pathname.startsWith('/api/')) {
    return { strategy: CACHE_STRATEGIES.NETWORK_FIRST, cacheName: API_CACHE, maxAge: 5 * 60 * 1000 }; // 5 min
  }
  
  // Static assets: Cache first
  if (request.destination === 'image' || request.destination === 'font' || request.destination === 'style' || request.destination === 'script') {
    return { strategy: CACHE_STRATEGIES.CACHE_FIRST, cacheName: STATIC_CACHE };
  }
  
  // HTML pages: Stale while revalidate
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    return { strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE, cacheName: DYNAMIC_CACHE };
  }
  
  // Default: Network first
  return { strategy: CACHE_STRATEGIES.NETWORK_FIRST, cacheName: DYNAMIC_CACHE };
}

// Cache-first strategy
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return caches.match('/offline');
  }
}

// Network-first strategy
async function networkFirst(request, cacheName, maxAge) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      const clonedResponse = response.clone();
      
      // Add timestamp for cache expiration
      if (maxAge) {
        const headers = new Headers(clonedResponse.headers);
        headers.set('sw-cache-timestamp', Date.now().toString());
        const modifiedResponse = new Response(clonedResponse.body, {
          status: clonedResponse.status,
          statusText: clonedResponse.statusText,
          headers: headers,
        });
        cache.put(request, modifiedResponse);
      } else {
        cache.put(request, clonedResponse);
      }
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      // Check if cache is expired
      if (maxAge) {
        const timestamp = cached.headers.get('sw-cache-timestamp');
        if (timestamp && Date.now() - parseInt(timestamp) > maxAge) {
          return caches.match('/offline');
        }
      }
      return cached;
    }
    return caches.match('/offline');
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);
  
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      const cache = caches.open(cacheName);
      cache.then((c) => c.put(request, response.clone()));
    }
    return response;
  }).catch(() => cached || caches.match('/offline'));
  
  return cached || fetchPromise;
}

// Fetch event handler
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome extensions and other protocols
  if (!event.request.url.startsWith('http')) return;
  
  const { strategy, cacheName, maxAge } = getCacheStrategy(event.request);
  
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      event.respondWith(cacheFirst(event.request, cacheName));
      break;
    case CACHE_STRATEGIES.NETWORK_FIRST:
      event.respondWith(networkFirst(event.request, cacheName, maxAge));
      break;
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      event.respondWith(staleWhileRevalidate(event.request, cacheName));
      break;
    default:
      event.respondWith(fetch(event.request));
  }
});

// Background Sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-offline-actions') {
    event.waitUntil(syncOfflineActions());
  }
});

async function syncOfflineActions() {
  try {
    // Open IndexedDB and get offline actions
    const db = await openDB();
    const actions = await getAllOfflineActions(db);
    
    if (actions.length === 0) return;
    
    console.log(`Syncing ${actions.length} offline actions`);
    
    // Process each action
    for (const action of actions) {
      try {
        const response = await fetch(action.url, {
          method: action.method,
          headers: action.headers,
          body: action.body,
        });
        
        if (response.ok) {
          // Remove from offline queue
          await deleteOfflineAction(db, action.id);
          console.log(`Synced action: ${action.type}`);
        }
      } catch (error) {
        console.error(`Failed to sync action ${action.id}:`, error);
      }
    }
    
    // Notify all clients that sync is complete
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
      client.postMessage({
        type: 'SYNC_COMPLETE',
        syncedCount: actions.length,
      });
    });
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// IndexedDB helpers for background sync
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('elevate-offline', 1);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getAllOfflineActions(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['offline_actions'], 'readonly');
    const store = transaction.objectStore('offline_actions');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function deleteOfflineAction(db, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['offline_actions'], 'readwrite');
    const store = transaction.objectStore('offline_actions');
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Push notification handler
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  
  const title = data.title || 'Elevate for Humanity';
  const options = {
    body: data.body || 'You have a new notification',
    icon: data.icon || '/icon-192x192.png',
    badge: '/icon-72.png',
    image: data.image,
    data: {
      url: data.url || '/',
      timestamp: Date.now(),
      ...data.data,
    },
    actions: data.actions || [
      { action: 'open', title: 'Open' },
      { action: 'close', title: 'Close' },
    ],
    tag: data.tag || 'default',
    requireInteraction: data.requireInteraction || false,
    vibrate: data.vibrate || [200, 100, 200],
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window open
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window if none exists
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen);
        }
      })
  );
});

// Message handler for client communication
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data?.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.startsWith('elevate-'))
            .map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});
