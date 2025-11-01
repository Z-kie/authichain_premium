
/**
 * Comprehensive health check - checks all services
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/monitoring/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ServiceHealth {
  status: 'healthy' | 'unhealthy' | 'degraded';
  responseTime: number;
  error?: string;
}

export async function GET(req: NextRequest) {
  const startTime = Date.now();

  try {
    // Check all services
    const [dbHealth, stripeHealth, nftStorageHealth] = await Promise.allSettled([
      fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/health/db`),
      fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/health/stripe`),
      fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/health/nft-storage`),
    ]);

    const services: Record<string, ServiceHealth> = {
      database: await processHealthResponse(dbHealth),
      stripe: await processHealthResponse(stripeHealth),
      nftStorage: await processHealthResponse(nftStorageHealth),
    };

    // Determine overall status
    const allHealthy = Object.values(services).every((s) => s.status === 'healthy');
    const anyUnhealthy = Object.values(services).some((s) => s.status === 'unhealthy');

    const overallStatus = allHealthy ? 'healthy' : anyUnhealthy ? 'degraded' : 'unhealthy';

    const healthData = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      totalResponseTime: Date.now() - startTime,
      services,
      environment: process.env.NODE_ENV,
      version: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
    };

    logger.info('Comprehensive health check completed', {
      action: 'comprehensive_health_check',
      metadata: { status: overallStatus },
    });

    const statusCode = overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 207 : 503;

    return NextResponse.json(healthData, { status: statusCode });
  } catch (error) {
    logger.error('Comprehensive health check failed', {}, error as Error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Comprehensive health check failed',
      },
      { status: 500 }
    );
  }
}

async function processHealthResponse(
  result: PromiseSettledResult<Response>
): Promise<ServiceHealth> {
  if (result.status === 'rejected') {
    return {
      status: 'unhealthy',
      responseTime: 0,
      error: 'Service check failed',
    };
  }

  const response = result.value;
  const data = await response.json().catch(() => ({}));

  return {
    status: response.ok ? 'healthy' : 'unhealthy',
    responseTime: data.responseTime || 0,
    error: data.error,
  };
}
