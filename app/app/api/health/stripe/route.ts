
/**
 * Stripe API health check endpoint
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { logger } from '@/lib/monitoring/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const startTime = Date.now();

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-08-27.basil',
    });

    // Simple API call to check Stripe connectivity
    await stripe.customers.list({ limit: 1 });

    const duration = Date.now() - startTime;

    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'stripe',
      responseTime: duration,
      details: {
        apiVersion: '2025-08-27.basil',
        mode: process.env.STRIPE_SECRET_KEY.startsWith('sk_live_') ? 'live' : 'test',
        connected: true,
      },
    };

    logger.info('Stripe health check passed', {
      action: 'stripe_health_check',
      metadata: { duration },
    });

    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    const duration = Date.now() - startTime;

    logger.error('Stripe health check failed', {
      action: 'stripe_health_check',
      metadata: { duration },
    }, error as Error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        service: 'stripe',
        responseTime: duration,
        error: error instanceof Error ? error.message : 'Stripe API connection failed',
        details: {
          connected: false,
        },
      },
      { status: 503 }
    );
  }
}
