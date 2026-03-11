export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/collections/[slug]
 * Get collection details by slug
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const collection = await prisma.collection.findUnique({
      where: { slug },
      include: {
        nfts: {
          take: 20,
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { nfts: true },
        },
      },
    });

    if (!collection) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      collection,
    });
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collection', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/collections/[slug]
 * Update collection
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { slug } = params;
    const body = await req.json();

    const collection = await prisma.collection.findUnique({
      where: { slug },
    });

    if (!collection) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user || collection.creatorId !== user.id) {
      return NextResponse.json(
        { error: 'Not authorized to edit this collection' },
        { status: 403 }
      );
    }

    // Update collection
    const updatedCollection = await prisma.collection.update({
      where: { slug },
      data: {
        name: body.name || collection.name,
        description: body.description !== undefined ? body.description : collection.description,
        coverImage: body.coverImage !== undefined ? body.coverImage : collection.coverImage,
        bannerImage: body.bannerImage !== undefined ? body.bannerImage : collection.bannerImage,
        category: body.category || collection.category,
        royaltyPercentage: body.royaltyPercentage !== undefined
          ? parseFloat(body.royaltyPercentage)
          : collection.royaltyPercentage,
        tags: body.tags !== undefined ? body.tags : collection.tags,
        socialLinks: body.socialLinks !== undefined ? body.socialLinks : collection.socialLinks,
        isPublic: body.isPublic !== undefined ? body.isPublic : collection.isPublic,
      },
    });

    return NextResponse.json({
      success: true,
      collection: updatedCollection,
      message: 'Collection updated successfully',
    });
  } catch (error) {
    console.error('Error updating collection:', error);
    return NextResponse.json(
      { error: 'Failed to update collection', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/collections/[slug]
 * Delete collection
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { slug } = params;

    const collection = await prisma.collection.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { nfts: true },
        },
      },
    });

    if (!collection) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user || collection.creatorId !== user.id) {
      return NextResponse.json(
        { error: 'Not authorized to delete this collection' },
        { status: 403 }
      );
    }

    if (collection._count.nfts > 0) {
      return NextResponse.json(
        { error: 'Cannot delete collection with NFTs. Please remove all NFTs first.' },
        { status: 400 }
      );
    }

    await prisma.collection.delete({
      where: { slug },
    });

    return NextResponse.json({
      success: true,
      message: 'Collection deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting collection:', error);
    return NextResponse.json(
      { error: 'Failed to delete collection', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
