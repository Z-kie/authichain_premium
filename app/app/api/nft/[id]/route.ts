export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/nft/[id]
 * Get NFT details
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Get NFT with all related data
    const nft = await prisma.nFT.findUnique({
      where: { id },
      include: {
        collection: true,
        auctions: {
          where: {
            status: 'ACTIVE',
          },
          include: {
            bids: {
              orderBy: { createdAt: 'desc' },
              take: 10,
            },
          },
        },
        offers: {
          where: {
            status: 'PENDING',
          },
          orderBy: { createdAt: 'desc' },
        },
        nftTransfers: {
          orderBy: { timestamp: 'desc' },
          take: 10,
        },
        priceHistory: {
          orderBy: { timestamp: 'desc' },
          take: 20,
        },
      },
    });

    if (!nft) {
      return NextResponse.json(
        { error: 'NFT not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.nFT.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      nft,
    });
  } catch (error) {
    console.error('Error fetching NFT:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NFT', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/nft/[id]
 * Update NFT
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await req.json();

    const nft = await prisma.nFT.findUnique({
      where: { id },
    });

    if (!nft) {
      return NextResponse.json(
        { error: 'NFT not found' },
        { status: 404 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user || nft.ownerId !== user.id) {
      return NextResponse.json(
        { error: 'Not authorized to edit this NFT' },
        { status: 403 }
      );
    }

    // Update NFT
    const updatedNFT = await prisma.nFT.update({
      where: { id },
      data: {
        name: body.name || nft.name,
        description: body.description !== undefined ? body.description : nft.description,
        price: body.price !== undefined ? parseFloat(body.price) : nft.price,
        status: body.status || nft.status,
        listingType: body.listingType || nft.listingType,
        externalUrl: body.externalUrl !== undefined ? body.externalUrl : nft.externalUrl,
      },
    });

    // Create price history entry if price changed
    if (body.price !== undefined && parseFloat(body.price) !== nft.price) {
      await prisma.priceHistory.create({
        data: {
          nftId: id,
          price: parseFloat(body.price),
          currency: nft.currency,
          eventType: 'PRICE_CHANGE',
        },
      });
    }

    return NextResponse.json({
      success: true,
      nft: updatedNFT,
      message: 'NFT updated successfully',
    });
  } catch (error) {
    console.error('Error updating NFT:', error);
    return NextResponse.json(
      { error: 'Failed to update NFT', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
