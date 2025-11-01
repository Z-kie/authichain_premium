
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AuthiChain - Product NFT Marketplace',
    short_name: 'AuthiChain',
    description: 'Premium product NFT marketplace with AI-powered analytics and authentication',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#10b981',
    orientation: 'portrait-primary',
    scope: '/',
    id: 'authichain-app',
    categories: ['business', 'finance', 'productivity'],
    lang: 'en',
    dir: 'ltr',
    icons: [
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    screenshots: [
      {
        src: '/screenshots/desktop-homepage.jpg',
        sizes: '1280x720',
        type: 'image/jpeg'
      },
      {
        src: '/screenshots/mobile-marketplace.jpg',
        sizes: '390x844',
        type: 'image/jpeg'
      }
    ],
    shortcuts: [
      {
        name: 'Product Marketplace',
        short_name: 'Marketplace',
        description: 'Browse premium product NFTs',
        url: '/marketplace',
        icons: [{ src: '/icons/icon-96x96.png', sizes: '96x96' }]
      },
      {
        name: 'QR Scanner',
        short_name: 'Scanner',
        description: 'Scan product packages',
        url: '/scanner',
        icons: [{ src: '/icons/icon-96x96.png', sizes: '96x96' }]
      },
      {
        name: 'Analytics',
        short_name: 'Analytics',
        description: 'View product analytics',
        url: '/analytics',
        icons: [{ src: '/icons/icon-96x96.png', sizes: '96x96' }]
      }
    ]
  };
}
