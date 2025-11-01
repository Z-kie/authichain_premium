
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { getGoolixPlan } from '@/lib/googlix-pricing';

export const dynamic = 'force-dynamic';


export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        subscriptions: {
          where: { status: 'ACTIVE' },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        usageRecords: {
          where: {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentSubscription = user.subscriptions[0];
    const plan = getGoolixPlan(user.subscriptionTier as any);

    // Calculate usage statistics
    const nftsMinted = user.usageRecords
      .filter((r: any) => r.action === 'NFT_UPLOAD')
      .reduce((sum: any, r: any) => sum + r.count, 0);

    return NextResponse.json({
      tier: user.subscriptionTier,
      plan: plan,
      subscription: currentSubscription || null,
      usage: {
        nftsMinted,
        nftsLimit: plan?.limits.nftsPerMonth || 0,
        verificationsUsed: 0, // TODO: Implement verification tracking
        verificationsLimit: plan?.limits.verificationsPerMonth || 0,
        storageUsed: 0, // TODO: Implement storage tracking
        storageLimit: plan?.limits.storageGB || 0,
      },
      referrals: {
        total: user.totalReferrals,
        earnings: user.referralEarnings,
      },
    });
  } catch (error) {
    console.error('Subscription status error:', error);
    return NextResponse.json(
      { error: 'Failed to get subscription status' },
      { status: 500 }
    );
  }
}
