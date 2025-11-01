
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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        referralCodes: {
          where: { isActive: true },
          include: {
            referrals: {
              orderBy: { createdAt: 'desc' },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const referralCode = user.referralCodes[0];
    
    if (!referralCode) {
      return NextResponse.json({
        totalReferrals: 0,
        activeReferrals: 0,
        totalEarnings: 0,
        pendingEarnings: 0,
        paidEarnings: 0,
        referrals: [],
      });
    }

    const totalEarnings = referralCode.totalEarnings;
    const pendingEarnings = referralCode.referrals
      .filter((r: any) => r.status === 'PENDING')
      .reduce((sum: any, r: any) => sum + r.commission, 0);
    const paidEarnings = referralCode.referrals
      .filter((r: any) => r.status === 'PAID')
      .reduce((sum: any, r: any) => sum + r.commission, 0);

    return NextResponse.json({
      code: referralCode.code,
      referralLink: `${process.env.NEXTAUTH_URL}/auth/signup?ref=${referralCode.code}`,
      totalReferrals: referralCode.usageCount,
      activeReferrals: referralCode.referrals.length,
      totalEarnings,
      pendingEarnings,
      paidEarnings,
      referrals: referralCode.referrals.map((r: any) => ({
        email: r.convertedEmail,
        tier: r.subscriptionTier,
        revenue: r.revenue,
        commission: r.commission,
        status: r.status,
        date: r.createdAt,
      })),
    });
  } catch (error) {
    console.error('Referral stats error:', error);
    return NextResponse.json(
      { error: 'Failed to get referral stats' },
      { status: 500 }
    );
  }
}
