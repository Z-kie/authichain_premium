
/**
 * Overall system health check endpoint
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/monitoring/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      services: {
        api: 'operational',
        database: 'checking...',
        stripe: 'checking...',
        nftStorage: 'checking...',
      },
      version: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
      uptime: process.uptime(),
    };

    // Quick health check - just confirm the API is responding
    logger.info('Health check requested', {
      action: 'health_check',
    });

    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    logger.error('Health check failed', {}, error as Error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 500 }
    );
  }
}
