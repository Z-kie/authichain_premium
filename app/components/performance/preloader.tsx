
'use client';

import { useEffect, useState } from 'react';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical resources
    const preloadResources = async () => {
      try {
        // Preload critical CSS
        const criticalCSS = document.createElement('link');
        criticalCSS.rel = 'preload';
        criticalCSS.as = 'style';
        criticalCSS.href = '/critical.css';
        document.head.appendChild(criticalCSS);

        // Preload critical images
        const criticalImages = [
          '/og-image.jpg',
          '/icons/icon-192x192.png',
          '/images/og/og-homepage.jpg'
        ];

        const imagePromises = criticalImages.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
          });
        });

        await Promise.all(imagePromises);
        
        // Simulate minimum loading time for UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setIsLoading(false);
      } catch (error) {
        console.log('Preloader completed with some errors:', error);
        setIsLoading(false);
      }
    };

    preloadResources();
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-green-400 font-semibold text-lg">
          Loading AuthiChain...
        </div>
        <div className="text-gray-400 text-sm mt-2">
          Premium Product NFT Marketplace
        </div>
      </div>
    </div>
  );
}
