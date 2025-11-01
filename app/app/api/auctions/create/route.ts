
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/auctions/create
 * Create a new auction
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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const {
      nftId,
      startPrice,
      reservePrice,
      bidIncrement,
      durationHours,
      startTime,
    } = body;

    // Validate required fields
    if (!nftId || !startPrice || !durationHours) {
      return NextResponse.json(
        { error: 'Missing required fields: nftId, startPrice, durationHours' },
        { status: 400 }
      );
    }

    // Check if NFT exists and user owns it
    const nft = await prisma.nFT.findUnique({
      where: { id: nftId },
    });

    if (!nft) {
      return NextResponse.json(
        { error: 'NFT not found' },
        { status: 404 }
      );
    }

    if (nft.ownerId !== user.id) {
      return NextResponse.json(
        { error: 'You do not own this NFT' },
        { status: 403 }
      );
    }

    if (nft.status === 'IN_AUCTION') {
      return NextResponse.json(
        { error: 'NFT is already in an active auction' },
        { status: 400 }
      );
    }

    // Calculate end time
    const auctionStartTime = startTime ? new Date(startTime) : new Date();
    const endTime = new Date(auctionStartTime.getTime() + durationHours * 60 * 60 * 1000);

    // Create auction
    const auction = await prisma.auction.create({
      data: {
        nftId,
        sellerId: user.id,
        startPrice: parseFloat(startPrice),
        reservePrice: reservePrice ? parseFloat(reservePrice) : undefined,
        bidIncrement: bidIncrement ? parseFloat(bidIncrement) : 0.01,
        startTime: auctionStartTime,
        endTime,
        status: startTime ? 'PENDING' : 'ACTIVE',
      },
      include: {
        nft: true,
      },
    });

    // Update NFT status
    await prisma.nFT.update({
      where: { id: nftId },
      data: {
        status: 'IN_AUCTION',
        listingType: 'AUCTION',
      },
    });

    return NextResponse.json({
      success: true,
      auction,
      message: 'Auction created successfully',
    });
  } catch (error) {
    console.error('Error creating auction:', error);
    return NextResponse.json(
      { error: 'Failed to create auction', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
