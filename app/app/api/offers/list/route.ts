export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/offers/list
 * Get list of offers (received or made)
 */
export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'received'; // 'received' or 'made'
    const status = searchParams.get('status');
    const nftId = searchParams.get('nftId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (nftId) {
      where.nftId = nftId;
    } else if (type === 'received') {
      // Get offers on NFTs owned by the user
      where.nft = {
        ownerId: user.id,
      };
    } else if (type === 'made') {
      where.offererId = user.id;
    }

    if (status) {
      where.status = status;
    }

    // Get offers
    const [offers, total] = await Promise.all([
      prisma.offer.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          nft: {
            include: {
              collection: true,
            },
          },
        },
      }),
      prisma.offer.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      offers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching offers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch offers', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
