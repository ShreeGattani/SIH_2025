// PWA utility functions for service worker registration and offline support

export const isPWASupported = (): boolean => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
};

export const registerServiceWorker = async (): Promise<void> => {
  if (!isPWASupported()) {
    console.log('PWA features not supported');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered successfully:', registration);
    
    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content is available, refresh the page
            if (confirm('New version available! Refresh to update?')) {
              window.location.reload();
            }
          }
        });
      }
    });
    
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
};

export const unregisterServiceWorker = async (): Promise<void> => {
  if (!isPWASupported()) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.unregister();
      console.log('Service Worker unregistered');
    }
  } catch (error) {
    console.error('Service Worker unregistration failed:', error);
  }
};

// Check if app is running in standalone mode (installed as PWA)
export const isRunningStandalone = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone ||
         document.referrer.includes('android-app://');
};

// Install prompt for PWA
export const showInstallPrompt = (): Promise<boolean> => {
  return new Promise((resolve) => {
    let deferredPrompt: any;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show install button or modal
      const installApp = async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          resolve(outcome === 'accepted');
          deferredPrompt = null;
        }
      };
      
      // You can call installApp() when user clicks install button
      (window as any).installApp = installApp;
    });
    
    // If already installed or not supported
    setTimeout(() => resolve(false), 1000);
  });
};

// Offline status management
export const isOnline = (): boolean => {
  return navigator.onLine;
};

export const onlineStatusListener = (callback: (isOnline: boolean) => void): (() => void) => {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};
