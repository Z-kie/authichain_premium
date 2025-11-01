
/**
 * NFT.Storage API health check endpoint
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/monitoring/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const startTime = Date.now();

  try {
    if (!process.env.NFT_STORAGE_API_KEY) {
      throw new Error('NFT_STORAGE_API_KEY not configured');
    }

    // Check NFT.Storage API status
    const response = await fetch('https://api.nft.storage/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.NFT_STORAGE_API_KEY}`,
      },
    });

    const duration = Date.now() - startTime;

    if (!response.ok) {
      throw new Error(`NFT.Storage API returned ${response.status}`);
    }

    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'nft-storage',
      responseTime: duration,
      details: {
        apiEndpoint: 'https://api.nft.storage',
        connected: true,
      },
    };

    logger.info('NFT.Storage health check passed', {
      action: 'nft_storage_health_check',
      metadata: { duration },
    });

    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    const duration = Date.now() - startTime;

    logger.error('NFT.Storage health check failed', {
      action: 'nft_storage_health_check',
      metadata: { duration },
    }, error as Error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        service: 'nft-storage',
        responseTime: duration,
        error: error instanceof Error ? error.message : 'NFT.Storage API connection failed',
        details: {
          connected: false,
        },
      },
      { status: 503 }
    );
  }
}
