

import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { PricingPreview } from '@/components/pricing-preview';
import { ConsumerHomepage } from '@/components/home/consumer-homepage';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://authichain.app';

export const metadata: Metadata = {
  title: 'AuthiChain - Premier Product NFT Marketplace & AI Analytics Platform',
  description: 'Discover, authenticate, and trade premium product NFTs with AI-powered item verification, QR code scanning, seed-to-sale tracking, and comprehensive business analytics. Join the future of product technology.',
  keywords: [
    'product NFT marketplace', 'digital asset NFT', 'product blockchain', 'item authentication',
    'QR code product scanner', 'seed to sale tracking', 'product analytics platform',
    'weed NFT trading', 'product collectibles', 'digital asset business tools',
    'product AI technology', 'item genetics verification', 'dispensary analytics',
    'product investment platform', 'digital asset crypto trading'
  ],
  openGraph: {
    title: 'AuthiChain - Premier Product NFT Marketplace',
    description: 'Trade premium product NFTs with AI-powered authentication, QR scanning, and comprehensive analytics',
    url: baseUrl,
    siteName: 'AuthiChain',
    images: [
      {
        url: `${baseUrl}/og-homepage.jpg`,
        width: 1200,
        height: 630,
        alt: 'AuthiChain Product NFT Marketplace Homepage'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuthiChain - Product NFT Marketplace',
    description: 'Premium product NFTs with AI authentication and analytics',
    images: [`${baseUrl}/twitter-homepage.jpg`],
  },
  alternates: {
    canonical: baseUrl,
  },
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  // Admins see complex business homepage, consumers see simple homepage
  const isAdmin = session && (session.user as any).role === 'ADMIN';
  
  // Redirect logged-in users to their respective dashboards
  if (session) {
    if (isAdmin) {
      redirect('/admin');
    } else {
      redirect('/dashboard');
    }
  }

  // Show simple consumer homepage for non-logged-in users
  return <ConsumerHomepage />;
}
