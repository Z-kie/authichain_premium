export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/offers/create
 * Create a new offer on an NFT
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
    const { nftId, amount, currency, message, expirationDays } = body;

    // Validate required fields
    if (!nftId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: nftId, amount' },
        { status: 400 }
      );
    }

    // Check if NFT exists
    const nft = await prisma.nFT.findUnique({
      where: { id: nftId },
    });

    if (!nft) {
      return NextResponse.json(
        { error: 'NFT not found' },
        { status: 404 }
      );
    }

    // Check if user is the owner
    if (nft.ownerId === user.id) {
      return NextResponse.json(
        { error: 'You cannot make an offer on your own NFT' },
        { status: 400 }
      );
    }

    // Calculate expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (expirationDays || 7));

    // Create offer
    const offer = await prisma.offer.create({
      data: {
        nftId,
        offererId: user.id,
        amount: parseFloat(amount),
        currency: currency || nft.currency,
        message,
        expiresAt,
        status: 'PENDING',
      },
      include: {
        nft: true,
      },
    });

    return NextResponse.json({
      success: true,
      offer,
      message: 'Offer created successfully',
    });
  } catch (error) {
    console.error('Error creating offer:', error);
    return NextResponse.json(
      { error: 'Failed to create offer', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
