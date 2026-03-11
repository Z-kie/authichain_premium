export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/offers/[id]/cancel
 * Cancel an offer (by the offerer)
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

    // Get offer
    const offer = await prisma.offer.findUnique({
      where: { id },
    });

    if (!offer) {
      return NextResponse.json(
        { error: 'Offer not found' },
        { status: 404 }
      );
    }

    // Check if user made the offer
    if (offer.offererId !== user.id) {
      return NextResponse.json(
        { error: 'You did not make this offer' },
        { status: 403 }
      );
    }

    // Check if offer can be cancelled
    if (offer.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Offer cannot be cancelled' },
        { status: 400 }
      );
    }

    // Cancel offer
    await prisma.offer.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Offer cancelled successfully',
    });
  } catch (error) {
    console.error('Error cancelling offer:', error);
    return NextResponse.json(
      { error: 'Failed to cancel offer', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
