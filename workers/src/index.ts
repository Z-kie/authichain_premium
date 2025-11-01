import { Env } from './types';
import { handleOptions, errorResponse, successResponse } from './utils/response';
import { handleManufacturers } from './handlers/manufacturers';
import { handleDeals } from './handlers/deals';
import { handleSubscriptions } from './handlers/subscriptions';
import { handleNFTs } from './handlers/nfts';
import { handleAnalytics } from './handlers/analytics';

export { RateLimiter } from './RateLimiter';

async function checkRateLimit(request: Request, env: Env): Promise<Response | null> {
  // Get client identifier (IP address or API key)
  const clientId = request.headers.get('CF-Connecting-IP') || 
                   request.headers.get('X-Forwarded-For') || 
                   'anonymous';

  // Get Durable Object stub
  const id = env.RATE_LIMITER.idFromName(clientId);
  const stub = env.RATE_LIMITER.get(id);

  // Check rate limit (100 requests per minute)
  const rateLimitUrl = new URL(request.url);
  rateLimitUrl.searchParams.set('clientId', clientId);
  rateLimitUrl.searchParams.set('limit', '100');
  rateLimitUrl.searchParams.set('windowMs', '60000');

  const rateLimitRequest = new Request(rateLimitUrl.toString());
  const rateLimitResponse = await stub.fetch(rateLimitRequest);

  if (rateLimitResponse.status === 429) {
    return rateLimitResponse;
  }

  return null;
}

async function handleRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;
  const origin = request.headers.get('Origin') || env.ALLOWED_ORIGINS;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return handleOptions(origin);
  }

  // Check rate limit for non-GET requests
  if (request.method !== 'GET') {
    const rateLimitResponse = await checkRateLimit(request, env);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
  }

  // Route requests
  try {
    // Health check
    if (path === '/' || path === '/health') {
      return successResponse({
        status: 'healthy',
        environment: env.ENVIRONMENT,
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      }, undefined, origin);
    }

    // Analytics
    if (path === '/analytics') {
      return handleAnalytics(request, env);
    }

    // Manufacturers
    if (path.startsWith('/manufacturers')) {
      return handleManufacturers(request, env);
    }

    // Deals
    if (path.startsWith('/deals')) {
      return handleDeals(request, env);
    }

    // Subscriptions
    if (path.startsWith('/subscriptions')) {
      return handleSubscriptions(request, env);
    }

    // NFTs
    if (path.startsWith('/nfts')) {
      return handleNFTs(request, env);
    }

    // Not found
    return errorResponse('Endpoint not found', 404, origin);
  } catch (error) {
    console.error('Request handler error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      500,
      origin
    );
  }
}

async function handleScheduled(event: ScheduledEvent, env: Env): Promise<void> {
  console.log('Cron trigger fired at:', new Date(event.scheduledTime).toISOString());
  
  try {
    // Example: Cleanup old rate limiter data
    // Example: Send analytics reports
    // Example: Process pending subscriptions
    
    console.log('Scheduled task completed successfully');
  } catch (error) {
    console.error('Scheduled task error:', error);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return handleRequest(request, env);
  },

  async scheduled(event: ScheduledEvent, env: Env): Promise<void> {
    return handleScheduled(event, env);
  },
};
