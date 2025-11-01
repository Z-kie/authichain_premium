
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/collections/create
 * Create a new collection
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
    const {
      name,
      description,
      coverImage,
      bannerImage,
      category,
      royaltyPercentage,
      blockchain,
      contractAddress,
      tags,
      socialLinks,
    } = body;

    // Validate required fields
    if (!name || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: name and category' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Check if slug already exists
    const existingCollection = await prisma.collection.findUnique({
      where: { slug },
    });

    if (existingCollection) {
      return NextResponse.json(
        { error: 'A collection with this name already exists' },
        { status: 409 }
      );
    }

    // Create collection
    const collection = await prisma.collection.create({
      data: {
        name,
        slug,
        description,
        coverImage,
        bannerImage,
        creatorId: user.id,
        category,
        royaltyPercentage: royaltyPercentage ? parseFloat(royaltyPercentage) : 0,
        blockchain: blockchain || 'ethereum',
        contractAddress,
        tags: tags || [],
        socialLinks,
      },
    });

    return NextResponse.json({
      success: true,
      collection,
      message: 'Collection created successfully',
    });
  } catch (error) {
    console.error('Error creating collection:', error);
    return NextResponse.json(
      { error: 'Failed to create collection', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
