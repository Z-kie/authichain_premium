export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { SubscriptionTier, UsageType } from '@/lib/types';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action } = await request.json();
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentPlan = SUBSCRIPTION_PLANS[user.subscriptionTier as SubscriptionTier];
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    // Get current usage
    const usage = await prisma.usageRecord.findUnique({
      where: {
        userId_action_month_year: {
          userId: user.id,
          action: action as UsageType,
          month,
          year
        }
      }
    });

    const currentUsage = usage?.count || 0;

    // Check limits based on action and tier
    let limit = -1; // -1 means unlimited
    let canPerformAction = true;

    if (action === UsageType.NFT_UPLOAD) {
      if (user.subscriptionTier === SubscriptionTier.BASIC) {
        limit = currentPlan.nfts_per_month;
        canPerformAction = currentUsage < limit;
      } else if (user.subscriptionTier === SubscriptionTier.PRO) {
        limit = currentPlan.nfts_per_month;
        canPerformAction = currentUsage < limit;
      }
      // BRAND tier has unlimited uploads
    }

    if (canPerformAction && action === UsageType.NFT_UPLOAD) {
      // Increment usage
      await prisma.usageRecord.upsert({
        where: {
          userId_action_month_year: {
            userId: user.id,
            action: action as UsageType,
            month,
            year
          }
        },
        update: {
          count: { increment: 1 }
        },
        create: {
          userId: user.id,
          action: action as UsageType,
          count: 1,
          month,
          year
        }
      });
    }

    return NextResponse.json({
      canPerformAction,
      currentUsage: canPerformAction ? currentUsage + 1 : currentUsage,
      limit,
      tier: user.subscriptionTier
    });

  } catch (error: any) {
    console.error('Usage check error:', error);
    return NextResponse.json(
      { error: 'Failed to check usage' },
      { status: 500 }
    );
  }
}
