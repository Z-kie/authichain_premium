export const dynamic = 'force-dynamic';


import { Metadata } from 'next';
import { LaunchSpecialsContent } from '@/components/marketing/launch-specials-content';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://authichain.app';

export const metadata: Metadata = {
  title: 'AuthiChain Launch Specials - $15,000+ in Bonus Value',
  description: 'Limited-time launch bonuses for AuthiChain creators. Get the NFT Marketing Masterclass, pre-designed templates, email campaigns, and exclusive access worth $15,947 when you join during our launch period.',
  keywords: [
    'AuthiChain launch bonuses', 'NFT marketing masterclass', 'NFT launch specials',
    'NFT creator bonuses', 'limited time offer', 'NFT authentication launch',
    'creator launch kit', 'NFT marketing templates', 'launch week specials'
  ],
  openGraph: {
    title: 'AuthiChain Launch Specials - $15,000+ in Bonus Value',
    description: 'Limited-time bonuses for early creators: Marketing masterclass, templates, campaigns, and exclusive access.',
    url: `${baseUrl}/launch-specials`,
    images: [
      {
        url: `${baseUrl}/og-launch-specials.jpg`,
        width: 1200,
        height: 630,
        alt: 'AuthiChain Launch Specials'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuthiChain Launch Specials',
    description: '$15,000+ in NFT creator bonuses - Limited time only',
    images: [`${baseUrl}/twitter-launch-specials.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/launch-specials`,
  },
};

export default function LaunchSpecialsPage() {
  return <LaunchSpecialsContent />;
}
