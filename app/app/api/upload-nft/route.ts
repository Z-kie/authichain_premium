
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { db } from '@/lib/prisma';
import { UsageTracker } from '@/lib/usage-tracker';
import { UsageType, NftStatus, SubscriptionTier } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user can upload
    const canUpload = await UsageTracker.canPerformAction(
      user.id,
      UsageType.NFT_UPLOAD,
      user.subscriptionTier as SubscriptionTier
    );

    if (!canUpload) {
      return NextResponse.json(
        { error: 'Monthly upload limit reached' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      title,
      description,
      imageUrl,
      tokenId,
      contractAddress,
      blockchain = 'ethereum'
    } = body;

    // Validation
    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Title and image URL are required' },
        { status: 400 }
      );
    }

    // Create NFT upload
    const nftUpload = await db.nftUpload.create({
      data: {
        userId: user.id,
        title,
        description,
        imageUrl,
        tokenId,
        contractAddress,
        blockchain,
        status: NftStatus.ACTIVE
      }
    });

    // Track usage
    await UsageTracker.trackUsage(user.id, UsageType.NFT_UPLOAD);

    return NextResponse.json({
      message: 'NFT uploaded successfully',
      nft: nftUpload
    });

  } catch (error) {
    console.error('Upload NFT error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
