export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/offers/[id]/reject
 * Reject an offer
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

    // Reject offer
    await prisma.offer.update({
      where: { id },
      data: {
        status: 'REJECTED',
        rejectedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Offer rejected successfully',
    });
  } catch (error) {
    console.error('Error rejecting offer:', error);
    return NextResponse.json(
      { error: 'Failed to reject offer', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
