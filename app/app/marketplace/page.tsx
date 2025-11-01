
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { EnhancedNFTMarketplace } from '@/components/marketplace/enhanced-nft-marketplace';
import { SimpleMarketplace } from '@/components/marketplace/simple-marketplace';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://authichain.app';

export const metadata: Metadata = {
  title: 'Product NFT Marketplace - Buy, Sell & Trade Premium Product NFTs',
  description: 'Explore the world\'s largest collection of authenticated product NFTs. Buy rare item collectibles, trade with crypto payments, and discover premium digital asset art with verified genetics and lab testing.',
  keywords: [
    'product NFT marketplace', 'buy product NFTs', 'sell digital asset NFTs', 'trade product collectibles',
    'rare item NFTs', 'premium product art', 'verified product genetics', 'lab tested digital asset NFTs',
    'product crypto trading', 'digital asset blockchain collectibles', 'dispensary NFT marketplace',
    'product digital assets', 'item authentication NFTs', 'digital asset investment NFTs'
  ],
  openGraph: {
    title: 'Product NFT Marketplace - Premium Strain Collectibles',
    description: 'Discover authenticated product NFTs with verified genetics, lab testing, and AI-powered item authentication',
    url: `${baseUrl}/marketplace`,
    images: [
      {
        url: `${baseUrl}/og-marketplace.jpg`,
        width: 1200,
        height: 630,
        alt: 'AuthiChain Product NFT Marketplace'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product NFT Marketplace',
    description: 'Premium authenticated product NFTs with verified genetics',
    images: [`${baseUrl}/twitter-marketplace.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/marketplace`,
  },
};

export const dynamic = 'force-dynamic';

export default async function MarketplacePage() {
  const session = await getServerSession(authOptions);
  
  // Show enhanced marketplace for admins, simple marketplace for consumers
  const isAdmin = session && (session.user as any).role === 'ADMIN';
  
  if (isAdmin) {
    return <EnhancedNFTMarketplace />;
  }
  
  return <SimpleMarketplace />;
}
