
import { NextRequest, NextResponse } from 'next/server';
import { ReferralSystem } from '@/lib/referral-system';

/**
 * Enhanced Referral API
 * GET /api/referrals/enhanced - Get referral stats
 * POST /api/referrals/enhanced - Create referral code
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    const stats = await ReferralSystem.getReferralStats(userId);

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('Get referral stats error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch referral stats',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, commissionRate } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    // Validate commission rate (20-35%)
    const rate = commissionRate || 0.25;
    if (rate < 0.20 || rate > 0.35) {
      return NextResponse.json(
        { success: false, error: 'Commission rate must be between 20% and 35%' },
        { status: 400 }
      );
    }

    const code = await ReferralSystem.generateReferralCode(userId, rate);

    return NextResponse.json({
      success: true,
      referralCode: code,
      commissionRate: rate,
      message: 'Referral code generated successfully',
    });
  } catch (error) {
    console.error('Create referral code error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create referral code',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
