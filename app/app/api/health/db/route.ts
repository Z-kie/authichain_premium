
/**
 * Database health check endpoint
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/monitoring/logger';
import { performanceMonitor } from '@/lib/monitoring/performance';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const startTime = Date.now();

  try {
    // Simple query to check database connectivity
    await prisma.$queryRaw`SELECT 1`;

    const duration = Date.now() - startTime;

    // Track performance
    performanceMonitor.trackDatabaseQuery('health_check', duration);

    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'database',
      responseTime: duration,
      details: {
        provider: 'postgresql',
        connected: true,
      },
    };

    logger.info('Database health check passed', {
      action: 'db_health_check',
      metadata: { duration },
    });

    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    const duration = Date.now() - startTime;

    logger.error('Database health check failed', {
      action: 'db_health_check',
      metadata: { duration },
    }, error as Error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        service: 'database',
        responseTime: duration,
        error: error instanceof Error ? error.message : 'Database connection failed',
        details: {
          provider: 'postgresql',
          connected: false,
        },
      },
      { status: 503 }
    );
  }
}
