
// AuthiChain Mobile Service Worker
const CACHE_NAME = 'authichain-mobile-v1.0.0';
const OFFLINE_URL = '/mobile/offline';

// Core app files to cache
const CORE_CACHE = [
  '/',
  '/marketplace',
  '/mobile/scanner',
  '/mobile/analytics',
  '/mobile/portfolio',
  '/mobile/offline',
  '/manifest.json'
];

// Product data to cache for offline access
const PRODUCT_DATA_CACHE = [
  '/api/marketplace/nfts',
  '/api/marketplace/analytics'
];

// Install event - cache core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      
      // Cache core app files
      await cache.addAll(CORE_CACHE);
      
      // Skip waiting to activate immediately
      await self.skipWaiting();
    })()
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Delete old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
      
      // Take control of all clients
      await clients.claim();
    })()
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    (async () => {
      try {
        // Try to get from network first for product data
        if (event.request.url.includes('/api/')) {
          return await networkFirstStrategy(event.request);
        }
        
        // Use cache first for static assets
        return await cacheFirstStrategy(event.request);
        
      } catch (error) {
        // Fallback to offline page for navigation requests
        if (event.request.mode === 'navigate') {
          const cache = await caches.open(CACHE_NAME);
          return await cache.match(OFFLINE_URL);
        }
        
        throw error;
      }
    })()
  );
});

// Network first strategy for product data
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful product API responses
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback to cache for product data
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Cache first strategy for static assets
async function cacheFirstStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Fetch from network and cache
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Background sync for product NFT transactions
self.addEventListener('sync', (event) => {
  if (event.tag === 'product-nft-sync') {
    event.waitUntil(syncProductTransactions());
  }
});

async function syncProductTransactions() {
  try {
    // Sync pending product NFT transactions
    const pendingTransactions = await getStoredTransactions();
    
    for (const transaction of pendingTransactions) {
      await fetch('/api/marketplace/sync-transaction', {
        method: 'POST',
        body: JSON.stringify(transaction),
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Clear synced transactions
    await clearStoredTransactions();
  } catch (error) {
    console.error('Product transaction sync failed:', error);
  }
}

// Push notification handler for product alerts
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'New product NFT activity!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/marketplace',
      timestamp: Date.now()
    },
    actions: [
      {
        action: 'view',
        title: 'View Marketplace',
        icon: '/icons/action-view.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/action-dismiss.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('🌿 ItemChain Alert', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

// Helper functions for IndexedDB storage
async function getStoredTransactions() {
  return new Promise((resolve) => {
    // Simplified - would implement IndexedDB storage
    resolve([]);
  });
}

async function clearStoredTransactions() {
  return new Promise((resolve) => {
    // Simplified - would implement IndexedDB cleanup
    resolve();
  });
}
