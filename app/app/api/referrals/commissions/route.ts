
import { NextRequest, NextResponse } from 'next/server';
import { ReferralSystem } from '@/lib/referral-system';

/**
 * Commission API
 * GET /api/referrals/commissions - Get pending commissions
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

    const pendingPayout = await ReferralSystem.calculatePayout(userId);

    return NextResponse.json({
      success: true,
      pendingPayout,
      formatted: `$${pendingPayout.toFixed(2)}`,
    });
  } catch (error) {
    console.error('Get commissions error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch commissions',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
