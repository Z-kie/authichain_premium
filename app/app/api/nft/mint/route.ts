import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { uploadNFTToIPFS, uploadBatchToIPFS } from '@/lib/ipfs';
import { nanoid } from 'nanoid';

/**
 * POST /api/nft/mint
 * Mint a new NFT (single or batch)
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { mode, nfts } = body;

    // Validate request
    if (!mode || !['single', 'batch'].includes(mode)) {
      return NextResponse.json(
        { error: 'Invalid mode. Must be "single" or "batch"' },
        { status: 400 }
      );
    }

    if (mode === 'single' && !body.nft) {
      return NextResponse.json(
        { error: 'Missing NFT data for single mint' },
        { status: 400 }
      );
    }

    if (mode === 'batch' && (!nfts || !Array.isArray(nfts) || nfts.length === 0)) {
      return NextResponse.json(
        { error: 'Missing or invalid NFT array for batch mint' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (mode === 'single') {
      return await mintSingleNFT(body.nft, user.id);
    } else {
      return await mintBatchNFTs(nfts, user.id);
    }
  } catch (error) {
    console.error('Error minting NFT:', error);
    return NextResponse.json(
      { error: 'Failed to mint NFT', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

async function mintSingleNFT(nftData: any, userId: string) {
  const {
    name,
    description,
    image,
    imageFile,
    animationUrl,
    externalUrl,
    collectionId,
    attributes,
    royaltyPercentage,
    price,
    currency,
    blockchain,
  } = nftData;

  // Validate required fields
  if (!name || (!image && !imageFile)) {
    return NextResponse.json(
      { error: 'Missing required fields: name and image' },
      { status: 400 }
    );
  }

  try {
    // Generate unique token ID
    const tokenId = `${Date.now()}-${nanoid(10)}`;
    
    // Upload to IPFS if imageFile is provided
    let imageIpfs = image;
    let metadataIpfs;
    
    if (imageFile) {
      // Convert base64 to buffer
      const base64Data = imageFile.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      
      // Upload to IPFS
      const ipfsResult = await uploadNFTToIPFS(
        buffer,
        `${tokenId}.png`,
        {
          name,
          description,
          external_url: externalUrl,
          animation_url: animationUrl,
          attributes: attributes || [],
        }
      );
      
      imageIpfs = ipfsResult.imageResult.gatewayUrl;
      metadataIpfs = ipfsResult.metadataResult.ipfsUrl;
    }

    // Create NFT in database
    const nft = await prisma.nFT.create({
      data: {
        tokenId,
        contractAddress: '0x0000000000000000000000000000000000000000', // Placeholder
        blockchain: blockchain || 'ethereum',
        name,
        description,
        image: imageIpfs,
        imageIpfs: imageFile ? imageIpfs : undefined,
        animationUrl,
        externalUrl,
        metadata: attributes ? { attributes } : undefined,
        metadataIpfs,
        collectionId,
        creatorId: userId,
        ownerId: userId,
        price: price ? parseFloat(price) : undefined,
        currency: currency || 'ETH',
        royaltyPercentage: royaltyPercentage ? parseFloat(royaltyPercentage) : 0,
        status: price ? 'LISTED' : 'ACTIVE',
        listingType: 'FIXED_PRICE',
        isMinted: true,
        mintedAt: new Date(),
      },
      include: {
        collection: true,
      },
    });

    // Create price history entry if listed
    if (price) {
      await prisma.priceHistory.create({
        data: {
          nftId: nft.id,
          price: parseFloat(price),
          currency: currency || 'ETH',
          eventType: 'LISTING',
        },
      });
    }

    // Update collection item count if part of a collection
    if (collectionId) {
      await prisma.collection.update({
        where: { id: collectionId },
        data: {
          itemCount: {
            increment: 1,
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      nft,
      message: 'NFT minted successfully',
    });
  } catch (error) {
    console.error('Error in mintSingleNFT:', error);
    throw error;
  }
}

async function mintBatchNFTs(nftsData: any[], userId: string) {
  try {
    const results = [];
    const errors = [];

    for (let i = 0; i < nftsData.length; i++) {
      try {
        const response = await mintSingleNFT(nftsData[i], userId);
        const data = await response.json();
        
        if (data.success) {
          results.push(data.nft);
        } else {
          errors.push({ index: i, error: data.error });
        }
      } catch (error) {
        errors.push({
          index: i,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: errors.length === 0,
      minted: results.length,
      errors: errors.length,
      nfts: results,
      errorDetails: errors,
      message: `Batch minting completed: ${results.length} successful, ${errors.length} failed`,
    });
  } catch (error) {
    console.error('Error in mintBatchNFTs:', error);
    throw error;
  }
}
