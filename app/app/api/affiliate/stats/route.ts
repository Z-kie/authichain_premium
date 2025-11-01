
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get or create affiliate code for user
    let affiliateCode = await prisma.referralCode.findFirst({
      where: { 
        userId: session.user.id,
        type: 'AFFILIATE'
      },
      include: {
        referrals: true
      }
    });

    if (!affiliateCode) {
      // Generate unique affiliate code
      const baseCode = session.user.email?.split('@')[0]?.toUpperCase() || 'AFFILIATE';
      const randomSuffix = Math.random().toString(36).substr(2, 3).toUpperCase();
      const code = `${baseCode}${randomSuffix}`;

      affiliateCode = await prisma.referralCode.create({
        data: {
          code,
          userId: session.user.id,
          type: 'AFFILIATE',
          commission: 0.25, // 25% commission for affiliates
          isActive: true
        },
        include: {
          referrals: true
        }
      });
    }

    if (!affiliateCode) {
      return NextResponse.json(
        { error: 'Failed to create affiliate code' },
        { status: 500 }
      );
    }

    // Calculate stats
    const totalReferrals = affiliateCode.referrals?.length || 0;
    const activeReferrals = affiliateCode.referrals?.filter((r: any) => r.status === 'PENDING' || r.status === 'PAID').length || 0;
    const totalEarnings = affiliateCode.totalEarnings || 0;
    
    // Calculate monthly earnings (this month)
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    
    const monthlyReferrals = affiliateCode.referrals?.filter(r => 
      r.createdAt >= thisMonth && (r.status === 'PENDING' || r.status === 'PAID')
    ) || [];
    const monthlyEarnings = monthlyReferrals.reduce((sum: any, r: any) => sum + (r.commission || 0), 0);

    // Calculate conversion rate (dummy data for now)
    const conversionRate = totalReferrals > 0 ? Math.round((activeReferrals / totalReferrals) * 100 * 100) / 100 : 15.2;

    // Determine tier based on earnings
    let tier = 'BRONZE';
    let commissionRate = 25;
    let nextTierTarget = 1000;

    if (totalEarnings >= 10000) {
      tier = 'PLATINUM';
      commissionRate = 40;
      nextTierTarget = 0;
    } else if (totalEarnings >= 5000) {
      tier = 'GOLD';
      commissionRate = 35;
      nextTierTarget = 10000;
    } else if (totalEarnings >= 1000) {
      tier = 'SILVER';
      commissionRate = 30;
      nextTierTarget = 5000;
    }

    // Mock pending payout (would be calculated from recent unpaid commissions)
    const pendingPayout = monthlyEarnings * 0.7; // Assume 70% of monthly earnings pending

    const affiliateStats = {
      totalEarnings: totalEarnings,
      monthlyEarnings: monthlyEarnings,
      totalReferrals: totalReferrals,
      activeReferrals: activeReferrals,
      conversionRate: conversionRate,
      tier: tier,
      commissionRate: commissionRate,
      nextTierTarget: nextTierTarget,
      affiliateCode: affiliateCode.code,
      affiliateLink: `https://authichain.app/ref/${affiliateCode.code}`,
      payoutSchedule: 'Monthly on the 15th',
      lastPayout: '2024-10-15',
      pendingPayout: Math.round(pendingPayout * 100) / 100
    };

    return NextResponse.json(affiliateStats);

  } catch (error) {
    console.error('Affiliate stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch affiliate statistics' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { action } = await request.json();

    if (action === 'upgrade_to_affiliate') {
      // Upgrade user's referral code to affiliate status
      let affiliateCode = await prisma.referralCode.findFirst({
        where: { userId: session.user.id }
      });

      if (!affiliateCode) {
        const baseCode = session.user.email?.split('@')[0]?.toUpperCase() || 'AFFILIATE';
        const randomSuffix = Math.random().toString(36).substr(2, 3).toUpperCase();
        const code = `${baseCode}${randomSuffix}`;

        affiliateCode = await prisma.referralCode.create({
          data: {
            code,
            userId: session.user.id,
            type: 'AFFILIATE',
            commission: 0.25,
            isActive: true
          }
        });
      } else {
        affiliateCode = await prisma.referralCode.update({
          where: { id: affiliateCode.id },
          data: {
            type: 'AFFILIATE',
            commission: 0.25
          }
        });
      }

      return NextResponse.json({ 
        success: true, 
        affiliateCode: affiliateCode.code,
        message: 'Successfully upgraded to affiliate status' 
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Affiliate action error:', error);
    return NextResponse.json(
      { error: 'Failed to process affiliate action' },
      { status: 500 }
    );
  }
}
