export const dynamic = 'force-dynamic';


import { Metadata } from 'next';
import { AffiliateDashboard } from '@/components/marketing/affiliate-dashboard';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://authichain.app';

export const metadata: Metadata = {
  title: 'AuthiChain Affiliate Program - Earn 25-40% Commissions',
  description: 'Join the AuthiChain affiliate program and earn 25-40% recurring commissions promoting the leading NFT authentication platform. Access proven marketing materials and high-converting campaigns.',
  keywords: [
    'AuthiChain affiliate program', 'NFT affiliate marketing', 'earn commissions',
    'NFT platform affiliate', 'digital marketing affiliate', 'recurring commissions',
    'affiliate marketing program', 'NFT referral program', 'earn money online'
  ],
  openGraph: {
    title: 'AuthiChain Affiliate Program - High Commission NFT Platform',
    description: 'Earn 25-40% recurring commissions with proven marketing materials and support.',
    url: `${baseUrl}/affiliate`,
    images: [
      {
        url: `${baseUrl}/og-affiliate.jpg`,
        width: 1200,
        height: 630,
        alt: 'AuthiChain Affiliate Program'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuthiChain Affiliate Program',
    description: 'Earn 25-40% commissions promoting AuthiChain',
    images: [`${baseUrl}/twitter-affiliate.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/affiliate`,
  },
};

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <AffiliateDashboard />
      </div>
    </div>
  );
}
