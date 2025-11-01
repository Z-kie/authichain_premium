export const dynamic = 'force-dynamic';


import { Metadata } from 'next';
import { AnalyticsView } from '@/components/analytics/analytics-view';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://authichain.app';

export const metadata: Metadata = {
  title: 'Product Business Analytics - Dispensary Data & Strain Insights',
  description: 'Comprehensive product business analytics platform. Track item performance, dispensary sales, market trends, customer insights, and NFT trading data with AI-powered product analytics.',
  keywords: [
    'product analytics platform', 'dispensary analytics', 'digital asset business intelligence',
    'product sales analytics', 'item performance analytics', 'product market data',
    'dispensary business insights', 'digital asset trend analysis', 'product customer analytics',
    'item popularity metrics', 'product revenue analytics', 'dispensary dashboard',
    'digital asset business metrics', 'product data analysis', 'product industry analytics'
  ],
  openGraph: {
    title: 'Product Business Analytics - Dispensary Intelligence Platform',
    description: 'AI-powered product analytics for dispensaries, growers, and product businesses. Track performance and market trends.',
    url: `${baseUrl}/analytics`,
    images: [
      {
        url: `${baseUrl}/og-analytics.jpg`,
        width: 1200,
        height: 630,
        alt: 'AuthiChain Product Analytics Dashboard'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Business Analytics',
    description: 'AI-powered analytics for product businesses',
    images: [`${baseUrl}/twitter-analytics.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/analytics`,
  },
};

export default function AnalyticsPage() {
  const mockUser = { id: '1', name: 'Demo User', subscription: 'pro' };
  const mockNfts = [
    { id: '1', name: 'Product NFT 1', price: 100 },
    { id: '2', name: 'Product NFT 2', price: 200 }
  ];
  const mockUsageRecords = [
    { id: '1', action: 'nft_view', timestamp: new Date() },
    { id: '2', action: 'qr_scan', timestamp: new Date() }
  ];

  return (
    <AnalyticsView 
      user={mockUser}
      hasAccess={true}
      nfts={mockNfts}
      usageRecords={mockUsageRecords}
    />
  );
}
