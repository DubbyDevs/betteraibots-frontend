import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

// Add Bootstrap import here:
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Register service worker for PWA functionality with aggressive update handling
// Only register in production (not in development)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    // Register service worker with no cache
    navigator.serviceWorker.register('/sw.js', { 
      updateViaCache: 'none',
      scope: '/'
    }).then((registration) => {
      console.log('SW registered: ', registration);
      
      // Check for updates immediately and periodically
      registration.update();
      setInterval(() => {
        registration.update();
      }, 60000); // Check every minute
      
      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('New service worker found, installing...');
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New service worker is available, force reload
              console.log('New service worker installed, reloading page...');
              window.location.reload();
            } else {
              // First install, no reload needed
              console.log('Service worker installed for first time');
            }
          }
        });
      });
      
      // Handle controller change (when new service worker takes control)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service worker controller changed, reloading...');
        window.location.reload();
      });
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError);
      // Don't let service worker errors break the app
    });
  });
} else if (process.env.NODE_ENV === 'development') {
  // In development, aggressively clear all service workers and caches
  // Run immediately, don't wait for load event
  (async function clearServiceWorkersInDev() {
    if ('serviceWorker' in navigator) {
      try {
        // Unregister all service workers immediately
        const registrations = await navigator.serviceWorker.getRegistrations();
        console.log(`Found ${registrations.length} service worker(s) to unregister in development`);
        
        for (let registration of registrations) {
          const success = await registration.unregister();
          if (success) {
            console.log('Service worker unregistered:', registration.scope);
          }
        }
        
        // Clear all caches
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          console.log(`Found ${cacheNames.length} cache(s) to clear in development`);
          
          await Promise.all(
            cacheNames.map((cacheName) => {
              console.log('Deleting cache in development:', cacheName);
              return caches.delete(cacheName);
            })
          );
          console.log('All caches cleared in development mode');
        }
      } catch (error) {
        console.error('Error clearing service workers in development:', error);
      }
    }
  })();
  
  // Also clear on page load as backup
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
      
      if ('caches' in window) {
        caches.keys().then((cacheNames) => {
          return Promise.all(
            cacheNames.map((cacheName) => caches.delete(cacheName))
          );
        });
      }
    }
  });
  
  // Also clear on page unload to ensure clean state
  window.addEventListener('beforeunload', () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
    }
  });
}

