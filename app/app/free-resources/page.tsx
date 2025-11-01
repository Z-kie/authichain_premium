export const dynamic = 'force-dynamic';


import { Metadata } from 'next';
import { LeadMagnetShowcase } from '@/components/marketing/lead-magnet-forms';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://authichain.app';

export const metadata: Metadata = {
  title: 'Free NFT Success Resources - AuthiChain Creator Tools',
  description: 'Download free NFT success guides, templates, and tools. Get the NFT Creator Success Guide, authentication checklist, email templates, and pricing calculator to launch your NFT business.',
  keywords: [
    'free NFT resources', 'NFT creator guide', 'NFT success templates',
    'NFT marketing templates', 'free NFT tools', 'NFT authentication guide',
    'NFT pricing calculator', 'NFT email templates', 'digital creator resources'
  ],
  openGraph: {
    title: 'Free NFT Success Resources - Creator Tools & Guides',
    description: 'Download proven NFT success templates, guides, and tools used by 10,000+ creators.',
    url: `${baseUrl}/free-resources`,
    images: [
      {
        url: `${baseUrl}/og-free-resources.jpg`,
        width: 1200,
        height: 630,
        alt: 'Free NFT Success Resources'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NFT Success Resources',
    description: 'Proven templates and guides for NFT creators',
    images: [`${baseUrl}/twitter-free-resources.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/free-resources`,
  },
};

export default function FreeResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <LeadMagnetShowcase />
      </div>
    </div>
  );
}
