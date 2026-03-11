export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/auctions/list
 * Get list of auctions
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const nftId = searchParams.get('nftId');
    const sellerId = searchParams.get('sellerId');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (nftId) {
      where.nftId = nftId;
    }

    if (sellerId) {
      where.sellerId = sellerId;
    }

    // Build orderBy clause
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Get auctions
    const [auctions, total] = await Promise.all([
      prisma.auction.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          nft: {
            include: {
              collection: true,
            },
          },
          bids: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
        },
      }),
      prisma.auction.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      auctions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch auctions', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
