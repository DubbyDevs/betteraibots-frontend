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
if ('serviceWorker' in navigator) {
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
}

