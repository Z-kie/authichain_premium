
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';


export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const affiliate = await prisma.affiliatePartner.findUnique({
      where: { email: session.user.email },
    });

    if (!affiliate) {
      return NextResponse.json(
        { error: 'Affiliate account not found' },
        { status: 404 }
      );
    }

    if (affiliate.status !== 'APPROVED' && affiliate.status !== 'ACTIVE') {
      return NextResponse.json({
        status: affiliate.status,
        message: 'Your affiliate account is pending approval',
      });
    }

    // Get referral conversions for this affiliate
    const referralCode = await prisma.referralCode.findFirst({
      where: { userId: affiliate.userId || undefined, type: 'AFFILIATE' },
      include: {
        referrals: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!referralCode) {
      return NextResponse.json({
        status: affiliate.status,
        code: affiliate.affiliateCode,
        totalEarnings: 0,
        availableBalance: 0,
        totalConversions: 0,
        referrals: [],
      });
    }

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const monthlyConversions = referralCode.referrals.filter(
      (r: any) => r.createdAt >= thisMonth
    ).length;

    return NextResponse.json({
      status: affiliate.status,
      code: affiliate.affiliateCode,
      affiliateLink: `${process.env.NEXTAUTH_URL}/auth/signup?aff=${affiliate.affiliateCode}`,
      totalEarnings: affiliate.totalEarnings,
      availableBalance: affiliate.availableBalance,
      paidBalance: affiliate.paidBalance,
      totalConversions: affiliate.totalConversions,
      monthlyConversions,
      commissionRate: affiliate.commissionRate,
      payoutThreshold: affiliate.payoutThreshold,
      referrals: referralCode.referrals.slice(0, 20).map((r: any) => ({
        email: r.convertedEmail,
        tier: r.subscriptionTier,
        revenue: r.revenue,
        commission: r.commission,
        status: r.status,
        date: r.createdAt,
      })),
    });
  } catch (error) {
    console.error('Affiliate stats error:', error);
    return NextResponse.json(
      { error: 'Failed to get affiliate stats' },
      { status: 500 }
    );
  }
}
