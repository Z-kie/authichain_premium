export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { ReferralSystem } from '@/lib/referral-system';

/**
 * Payout API
 * POST /api/referrals/payouts - Request payout
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, amount, paymentMethod, paymentDetails } = body;

    if (!userId || !amount || !paymentMethod) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate payment method
    if (!['stripe', 'paypal', 'bank_transfer'].includes(paymentMethod)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment method' },
        { status: 400 }
      );
    }

    // Minimum payout amount $50
    if (amount < 50) {
      return NextResponse.json(
        { success: false, error: 'Minimum payout amount is $50' },
        { status: 400 }
      );
    }

    const payoutId = await ReferralSystem.processPayout(
      userId,
      amount,
      paymentMethod,
      paymentDetails
    );

    return NextResponse.json({
      success: true,
      payoutId,
      message: 'Payout request submitted successfully',
      estimatedProcessingTime: '3-5 business days',
    });
  } catch (error) {
    console.error('Process payout error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process payout',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
