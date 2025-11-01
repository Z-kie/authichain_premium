
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/auctions/[id]
 * Get auction details
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const auction = await prisma.auction.findUnique({
      where: { id },
      include: {
        nft: {
          include: {
            collection: true,
          },
        },
        bids: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!auction) {
      return NextResponse.json(
        { error: 'Auction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      auction,
    });
  } catch (error) {
    console.error('Error fetching auction:', error);
    return NextResponse.json(
      { error: 'Failed to fetch auction', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/auctions/[id]
 * End or cancel an auction
 */
export async function POST(
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
    const { action } = body;

    if (!action || !['end', 'cancel'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "end" or "cancel"' },
        { status: 400 }
      );
    }

    const auction = await prisma.auction.findUnique({
      where: { id },
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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user || auction.sellerId !== user.id) {
      return NextResponse.json(
        { error: 'Not authorized to manage this auction' },
        { status: 403 }
      );
    }

    if (action === 'cancel') {
      // Cancel auction
      await prisma.auction.update({
        where: { id },
        data: {
          status: 'CANCELLED',
        },
      });

      // Update NFT status
      await prisma.nFT.update({
        where: { id: auction.nftId },
        data: {
          status: 'ACTIVE',
          listingType: 'NOT_FOR_SALE',
        },
      });

      // Mark all bids as cancelled
      await prisma.bid.updateMany({
        where: { auctionId: id },
        data: {
          status: 'CANCELLED',
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Auction cancelled successfully',
      });
    }

    if (action === 'end') {
      // Check if auction can be ended
      if (auction.status !== 'ACTIVE') {
        return NextResponse.json(
          { error: 'Auction is not active' },
          { status: 400 }
        );
      }

      // End auction
      const updateData: any = {
        status: 'ENDED',
      };

      // If there's a winning bid
      if (auction.currentBidderId && auction.currentBid) {
        // Check reserve price
        if (auction.reservePrice && auction.currentBid < auction.reservePrice) {
          updateData.status = 'ENDED';
        } else {
          updateData.status = 'SETTLED';
          updateData.winnerId = auction.currentBidderId;
          updateData.winningBid = auction.currentBid;
          updateData.settledAt = new Date();

          // Update NFT owner
          await prisma.nFT.update({
            where: { id: auction.nftId },
            data: {
              ownerId: auction.currentBidderId,
              status: 'SOLD',
              lastSalePrice: auction.currentBid,
              lastSaleDate: new Date(),
            },
          });

          // Create NFT transfer record
          await prisma.nFTTransfer.create({
            data: {
              nftId: auction.nftId,
              fromAddress: auction.sellerId,
              toAddress: auction.currentBidderId,
              transactionHash: 'pending', // Would be filled when blockchain tx is made
              transferType: 'SALE',
              price: auction.currentBid,
              currency: auction.nft.currency,
            },
          });

          // Mark winning bid as won
          await prisma.bid.updateMany({
            where: {
              auctionId: id,
              bidderId: auction.currentBidderId,
              status: 'WINNING',
            },
            data: {
              status: 'WON',
            },
          });

          // Mark other bids as lost
          await prisma.bid.updateMany({
            where: {
              auctionId: id,
              bidderId: { not: auction.currentBidderId },
              status: { in: ['ACTIVE', 'OUTBID'] },
            },
            data: {
              status: 'LOST',
            },
          });
        }
      } else {
        // No bids, just end the auction
        await prisma.nFT.update({
          where: { id: auction.nftId },
          data: {
            status: 'ACTIVE',
            listingType: 'NOT_FOR_SALE',
          },
        });
      }

      await prisma.auction.update({
        where: { id },
        data: updateData,
      });

      return NextResponse.json({
        success: true,
        message: 'Auction ended successfully',
        winner: updateData.winnerId,
        winningBid: updateData.winningBid,
      });
    }
  } catch (error) {
    console.error('Error managing auction:', error);
    return NextResponse.json(
      { error: 'Failed to manage auction', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
