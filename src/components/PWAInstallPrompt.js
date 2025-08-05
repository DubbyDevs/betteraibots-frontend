import React, { useState, useEffect } from 'react';

const PWAInstallPrompt = ({ isVisible, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      if (onClose) onClose();
      console.log('PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [onClose]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
    if (onClose) onClose();
  };

  const handleDismiss = () => {
    if (onClose) onClose();
  };

  // Don't show if already installed, not visible, or no install prompt available
  if (isInstalled || !isVisible || !deferredPrompt) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      right: '20px',
      background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
      color: 'white',
      padding: '16px',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 212, 255, 0.3)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
          📱 Install BetterAiBots
        </div>
        <div style={{ fontSize: '14px', opacity: 0.9 }}>
          Get quick access to AI bots on your home screen
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleInstallClick}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
        >
          Install
        </button>
        
        <button
          onClick={handleDismiss}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseOut={(e) => e.target.style.background = 'transparent'}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt; 