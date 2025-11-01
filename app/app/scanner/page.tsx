export const dynamic = 'force-dynamic';


import { Metadata } from 'next';
import { ScannerPageClient } from '@/components/scanner-page-client';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://authichain.app';

export const metadata: Metadata = {
  title: 'Product QR Scanner - Authenticate Strains & Create NFTs',
  description: 'Scan product packaging QR codes to authenticate items, verify genetics, access lab testing data, and automatically create unique NFTs. AI-powered product authentication technology.',
  keywords: [
    'product QR scanner', 'digital asset package scanner', 'item authentication scanner',
    'product QR code reader', 'digital asset genetics verification', 'product lab test scanner',
    'item QR authentication', 'product package verification', 'digital asset NFT scanner',
    'product AI scanner', 'dispensary QR scanner', 'product product authentication',
    'digital asset item verification', 'product genetics scanner', 'weed package scanner'
  ],
  openGraph: {
    title: 'Product QR Scanner - Strain Authentication Technology',
    description: 'Scan product packages to authenticate items, verify genetics, and create NFTs with AI-powered technology',
    url: `${baseUrl}/scanner`,
    images: [
      {
        url: `${baseUrl}/og-scanner.jpg`,
        width: 1200,
        height: 630,
        alt: 'AuthiChain Product QR Scanner'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product QR Scanner',
    description: 'AI-powered item authentication and NFT creation',
    images: [`${baseUrl}/twitter-scanner.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/scanner`,
  },
};

export default function ScannerPage() {
  return <ScannerPageClient />;
}
