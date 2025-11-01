
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/auctions/bid
 * Place a bid on an auction
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
    const { auctionId, amount } = body;

    // Validate required fields
    if (!auctionId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: auctionId, amount' },
        { status: 400 }
      );
    }

    // Get auction with related data
    const auction = await prisma.auction.findUnique({
      where: { id: auctionId },
      include: {
        nft: true,
        bids: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!auction) {
      return NextResponse.json(
        { error: 'Auction not found' },
        { status: 404 }
      );
    }

    // Check if auction is active
    if (auction.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Auction is not active' },
        { status: 400 }
      );
    }

    // Check if auction has ended
    if (new Date() > auction.endTime) {
      return NextResponse.json(
        { error: 'Auction has ended' },
        { status: 400 }
      );
    }

    // Check if user is the seller
    if (auction.sellerId === user.id) {
      return NextResponse.json(
        { error: 'You cannot bid on your own auction' },
        { status: 400 }
      );
    }

    const bidAmount = parseFloat(amount);

    // Check if bid meets minimum requirements
    const currentBid = auction.currentBid || auction.startPrice;
    const minimumBid = currentBid + auction.bidIncrement;

    if (bidAmount < minimumBid) {
      return NextResponse.json(
        {
          error: `Bid must be at least ${minimumBid} ${auction.nft.currency}`,
          minimumBid,
        },
        { status: 400 }
      );
    }

    // Mark previous bids as outbid
    if (auction.currentBidderId) {
      await prisma.bid.updateMany({
        where: {
          auctionId,
          bidderId: auction.currentBidderId,
          status: 'WINNING',
        },
        data: {
          status: 'OUTBID',
        },
      });
    }

    // Create new bid
    const bid = await prisma.bid.create({
      data: {
        auctionId,
        bidderId: user.id,
        amount: bidAmount,
        status: 'WINNING',
      },
    });

    // Update auction
    await prisma.auction.update({
      where: { id: auctionId },
      data: {
        currentBid: bidAmount,
        currentBidderId: user.id,
        bidCount: {
          increment: 1,
        },
      },
    });

    // Get updated auction with bids
    const updatedAuction = await prisma.auction.findUnique({
      where: { id: auctionId },
      include: {
        nft: true,
        bids: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    return NextResponse.json({
      success: true,
      bid,
      auction: updatedAuction,
      message: 'Bid placed successfully',
    });
  } catch (error) {
    console.error('Error placing bid:', error);
    return NextResponse.json(
      { error: 'Failed to place bid', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
