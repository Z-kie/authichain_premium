export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/offers/[id]/accept
 * Accept an offer
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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const { id } = params;

    // Get offer with NFT
    const offer = await prisma.offer.findUnique({
      where: { id },
      include: {
        nft: true,
      },
    });

    if (!offer) {
      return NextResponse.json(
        { error: 'Offer not found' },
        { status: 404 }
      );
    }

    // Check if user owns the NFT
    if (offer.nft.ownerId !== user.id) {
      return NextResponse.json(
        { error: 'You do not own this NFT' },
        { status: 403 }
      );
    }

    // Check if offer is still valid
    if (offer.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Offer is no longer pending' },
        { status: 400 }
      );
    }

    if (new Date() > offer.expiresAt) {
      return NextResponse.json(
        { error: 'Offer has expired' },
        { status: 400 }
      );
    }

    // Accept offer
    await prisma.offer.update({
      where: { id },
      data: {
        status: 'ACCEPTED',
        acceptedAt: new Date(),
      },
    });

    // Update NFT ownership
    await prisma.nFT.update({
      where: { id: offer.nftId },
      data: {
        ownerId: offer.offererId,
        status: 'SOLD',
        lastSalePrice: offer.amount,
        lastSaleDate: new Date(),
      },
    });

    // Create transfer record
    await prisma.nFTTransfer.create({
      data: {
        nftId: offer.nftId,
        fromAddress: user.id,
        toAddress: offer.offererId,
        transactionHash: 'pending',
        transferType: 'SALE',
        price: offer.amount,
        currency: offer.currency,
      },
    });

    // Create price history entry
    await prisma.priceHistory.create({
      data: {
        nftId: offer.nftId,
        price: offer.amount,
        currency: offer.currency,
        eventType: 'SALE',
      },
    });

    // Reject all other pending offers on this NFT
    await prisma.offer.updateMany({
      where: {
        nftId: offer.nftId,
        status: 'PENDING',
        id: { not: id },
      },
      data: {
        status: 'REJECTED',
        rejectedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Offer accepted successfully',
    });
  } catch (error) {
    console.error('Error accepting offer:', error);
    return NextResponse.json(
      { error: 'Failed to accept offer', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
