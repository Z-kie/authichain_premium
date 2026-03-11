export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/nft/list
 * Get list of NFTs with filtering and sorting
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const collectionId = searchParams.get('collectionId');
    const creatorId = searchParams.get('creatorId');
    const ownerId = searchParams.get('ownerId');
    const status = searchParams.get('status');
    const listingType = searchParams.get('listingType');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const verified = searchParams.get('verified');
    const category = searchParams.get('category');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (collectionId) {
      where.collectionId = collectionId;
    }

    if (creatorId) {
      where.creatorId = creatorId;
    }

    if (ownerId) {
      where.ownerId = ownerId;
    }

    if (status) {
      where.status = status;
    }

    if (listingType) {
      where.listingType = listingType;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price.gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        where.price.lte = parseFloat(maxPrice);
      }
    }

    if (verified === 'true') {
      where.isVerified = true;
    }

    if (category) {
      where.collection = {
        category,
      };
    }

    // Build orderBy clause
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Get NFTs
    const [nfts, total] = await Promise.all([
      prisma.nFT.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          collection: true,
        },
      }),
      prisma.nFT.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      nfts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NFTs', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
