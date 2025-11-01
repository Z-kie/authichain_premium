export const dynamic = 'force-dynamic';


import { Metadata } from 'next';
import { GoolixPricingPage } from '@/components/googlix/pricing-page';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://authichain.app';

export const metadata: Metadata = {
  title: 'AuthiChain Pricing - NFT Authentication & Marketplace Plans',
  description: 'Choose the perfect AuthiChain plan. Free Explorer access, Creator ($29/mo), Pro ($79/mo), Enterprise ($299/mo), or Agency ($999/mo). All plans include NFT authentication, marketplace access, and comprehensive analytics.',
  keywords: [
    'AuthiChain pricing', 'NFT marketplace plans', 'NFT authentication pricing',
    'NFT platform subscription', 'NFT authentication software pricing', 'NFT trading costs',
    'digital asset analytics platform', 'NFT business tools pricing', 'NFT authentication pricing',
    'enterprise NFT solutions', 'NFT agency pricing', 'digital collectibles platform cost',
    'white-label NFT marketplace', 'NFT verification pricing'
  ],
  openGraph: {
    title: 'AuthiChain Pricing Plans - NFT Authentication Solutions',
    description: 'Flexible pricing for creators, brands, and agencies. From free browsing to enterprise white-label solutions.',
    url: `${baseUrl}/pricing`,
    images: [
      {
        url: `${baseUrl}/og-pricing.jpg`,
        width: 1200,
        height: 630,
        alt: 'AuthiChain Pricing Plans'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuthiChain Pricing Plans',
    description: 'NFT authentication solutions starting free',
    images: [`${baseUrl}/twitter-pricing.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/pricing`,
  },
};

export default function PricingPageRoute() {
  return <GoolixPricingPage />;
}
