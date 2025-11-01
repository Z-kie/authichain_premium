
import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // For now, allow unauthenticated access for testing
    // In production, you would add authentication here

    // Get parameters from query
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('address');
    const blockchain = searchParams.get('blockchain') || 'ethereum';
    const collection = searchParams.get('collection');

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // Mock NFT data - in real app, this would fetch from blockchain APIs like Alchemy, Moralis
    const mockNFTs = [
      {
        tokenId: '001',
        contractAddress: '0x742d35cc6eabbf9b8a3c6f5e5b8f7aae96c8b9f2',
        collection: {
          name: 'AuthiChain Legends',
          slug: 'authichain-legends',
          verified: true
        },
        metadata: {
          name: 'Myles High #001 - The Pressure Creator',
          description: 'Meet Myles High, the high-flying hot air balloon aeronaut who soars through the clouds with his diamond in balance.',
          image: 'https://cdn.abacus.ai/images/56f7b5d8-589f-46f1-a464-9280108b75da.png',
          attributes: [
            { trait_type: 'Background', value: 'Aerial Clouds', rarity: 12 },
            { trait_type: 'Character', value: 'Aviator', rarity: 8 },
            { trait_type: 'Accessory', value: 'Hot Air Balloon', rarity: 3 },
            { trait_type: 'Special Item', value: 'Diamond Balance', rarity: 1 }
          ]
        },
        marketData: {
          lastPrice: '2.5 ETH',
          floorPrice: '2.0 ETH',
          listed: true,
          listPrice: '2.8 ETH'
        },
        acquired: '2024-09-15T14:30:00Z'
      },
      {
        tokenId: '002',
        contractAddress: '0x742d35cc6eabbf9b8a3c6f5e5b8f7aae96c8b9f2',
        collection: {
          name: 'AuthiChain Legends',
          slug: 'authichain-legends',
          verified: true
        },
        metadata: {
          name: 'Canvas Dreams #002 - The Creative Visionary',
          description: 'A vibrant artist whose creativity flows like the perfect item.',
          image: 'https://cdn.abacus.ai/images/f5bd99e9-f06b-42ad-a291-0e3a9c8d81e3.png',
          attributes: [
            { trait_type: 'Background', value: 'Rainbow Art Studio', rarity: 18 },
            { trait_type: 'Character', value: 'Artist', rarity: 15 },
            { trait_type: 'Accessory', value: 'Paint Brushes', rarity: 25 },
            { trait_type: 'Special Item', value: 'Color Palette', rarity: 12 }
          ]
        },
        marketData: {
          lastPrice: '1.8 ETH',
          floorPrice: '1.5 ETH',
          listed: false
        },
        acquired: '2024-09-10T11:20:00Z'
      },
      {
        tokenId: '156',
        contractAddress: '0x8ba1f109551bd432803012645hac136c3bb8f134',
        collection: {
          name: 'Product Culture',
          slug: 'product-culture',
          verified: false
        },
        metadata: {
          name: 'Strain Scientist #156',
          description: 'A dedicated researcher exploring product genetics.',
          image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
          attributes: [
            { trait_type: 'Background', value: 'Laboratory', rarity: 35 },
            { trait_type: 'Character', value: 'Scientist', rarity: 20 },
            { trait_type: 'Equipment', value: 'Microscope', rarity: 40 }
          ]
        },
        marketData: {
          lastPrice: '0.5 ETH',
          floorPrice: '0.3 ETH',
          listed: true,
          listPrice: '0.6 ETH'
        },
        acquired: '2024-09-08T15:45:00Z'
      }
    ];

    // Filter by collection if specified
    let filteredNFTs = mockNFTs;
    if (collection) {
      filteredNFTs = mockNFTs.filter(nft => 
        nft.collection.slug.toLowerCase() === collection.toLowerCase()
      );
    }

    // Calculate portfolio stats
    const totalNFTs = filteredNFTs.length;
    const collections = Array.from(new Set(filteredNFTs.map(nft => nft.collection.name)));
    const totalValue = filteredNFTs.reduce((sum, nft) => {
      const price = parseFloat(nft.marketData.lastPrice.replace(' ETH', ''));
      return sum + (price || 0);
    }, 0);

    return NextResponse.json({
      success: true,
      data: {
        walletAddress,
        blockchain: blockchain.charAt(0).toUpperCase() + blockchain.slice(1),
        nfts: filteredNFTs,
        stats: {
          totalNFTs,
          totalCollections: collections.length,
          totalValue: `${totalValue.toFixed(2)} ETH`,
          collections: collections
        },
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Blockchain NFTs error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
