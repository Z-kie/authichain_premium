
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './providers';
import { AnnouncementBar } from '@/components/marketing/promotional-elements';
import { WebVitals } from './web-vitals';
import { ErrorBoundary } from '@/components/monitoring/ErrorBoundary';
import { PerformanceObserver } from '@/components/monitoring/PerformanceObserver';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AuthiChain - NFT Authentication & Marketplace',
  description: 'The leading NFT authentication and marketplace platform. Verify authenticity, discover collections, and trade with confidence.',
  keywords: [
    'NFT authentication', 'NFT marketplace', 'digital asset verification',
    'NFT trading', 'blockchain verification', 'digital collectibles',
    'NFT platform', 'crypto art', 'digital art marketplace'
  ],
  authors: [{ name: 'AuthiChain Team' }],
  creator: 'AuthiChain',
  publisher: 'AuthiChain',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.authichain.com',
    siteName: 'AuthiChain',
    title: 'AuthiChain - NFT Authentication & Marketplace',
    description: 'The leading NFT authentication and marketplace platform. Verify authenticity, discover collections, and trade with confidence.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AuthiChain - NFT Authentication Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuthiChain - NFT Authentication & Marketplace',
    description: 'The leading NFT authentication and marketplace platform.',
    images: ['/twitter-image.jpg'],
    creator: '@authichain',
    site: '@authichain',
  },
  icons: {
    icon: '/icons/icon-192x192.png',
    shortcut: '/icons/icon-192x192.png',
    apple: '/icons/icon-180x180.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/icons/icon-180x180.png',
    },
  },
  manifest: '/manifest.webmanifest',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S90J3SNRH0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S90J3SNRH0');
          `}
        </Script>

        {/* Google Ads Conversion Tracking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17679463585"
          strategy="afterInteractive"
        />
        <Script id="google-ads-conversion" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17679463585');
          `}
        </Script>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <ErrorBoundary>
              <div className="min-h-screen bg-background">
                {/* Announcement Bar for marketing promotions */}
                <AnnouncementBar />
                
                {/* Main content */}
                <main className="flex-1">
                  {children}
                </main>
              </div>
            </ErrorBoundary>
            
            {/* Monitoring Components */}
            <WebVitals />
            <PerformanceObserver />
          </Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
