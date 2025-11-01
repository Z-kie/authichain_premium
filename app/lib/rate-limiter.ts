/**
 * Rate Limiter for AuthiChain API Routes
 * 
 * Implements in-memory rate limiting with support for different tiers and endpoints.
 * Uses a simple token bucket algorithm with automatic cleanup.
 */

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max requests per interval
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

class RateLimiter {
  private tokenCache: Map<string, number[]>;
  private readonly config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.tokenCache = new Map();
    this.config = config;
    
    // Cleanup old entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Check if request should be rate limited
   */
  async check(identifier: string): Promise<RateLimitResult> {
    const now = Date.now();
    const windowStart = now - this.config.interval;
    
    // Get existing tokens for this identifier
    const tokens = this.tokenCache.get(identifier) || [];
    
    // Filter out expired tokens
    const validTokens = tokens.filter(timestamp => timestamp > windowStart);
    
    // Check if limit exceeded
    const success = validTokens.length < this.config.uniqueTokenPerInterval;
    
    if (success) {
      // Add new token
      validTokens.push(now);
      this.tokenCache.set(identifier, validTokens);
    } else {
      // Update cache even if rejected (for tracking)
      this.tokenCache.set(identifier, validTokens);
    }
    
    // Calculate reset time (when the oldest token expires)
    const oldestToken = validTokens[0] || now;
    const reset = Math.ceil((oldestToken + this.config.interval) / 1000);
    
    return {
      success,
      limit: this.config.uniqueTokenPerInterval,
      remaining: Math.max(0, this.config.uniqueTokenPerInterval - validTokens.length),
      reset,
    };
  }

  /**
   * Cleanup expired entries
   */
  private cleanup() {
    const now = Date.now();
    const windowStart = now - this.config.interval;
    
    for (const [key, tokens] of Array.from(this.tokenCache.entries())) {
      const validTokens = tokens.filter(timestamp => timestamp > windowStart);
      
      if (validTokens.length === 0) {
        this.tokenCache.delete(key);
      } else {
        this.tokenCache.set(key, validTokens);
      }
    }
  }

  /**
   * Reset rate limit for a specific identifier
   */
  reset(identifier: string): void {
    this.tokenCache.delete(identifier);
  }

  /**
   * Get current stats
   */
  getStats(): { totalIdentifiers: number; totalTokens: number } {
    let totalTokens = 0;
    for (const tokens of Array.from(this.tokenCache.values())) {
      totalTokens += tokens.length;
    }
    
    return {
      totalIdentifiers: this.tokenCache.size,
      totalTokens,
    };
  }
}

// Rate limit configurations for different endpoint types
export const RATE_LIMITS = {
  // Authentication endpoints - stricter limits
  auth: new RateLimiter({
    interval: 15 * 60 * 1000, // 15 minutes
    uniqueTokenPerInterval: 5, // 5 attempts per 15 minutes
  }),
  
  // NFT minting - moderate limits
  mint: new RateLimiter({
    interval: 60 * 60 * 1000, // 1 hour
    uniqueTokenPerInterval: 10, // 10 mints per hour
  }),
  
  // File uploads - moderate limits
  upload: new RateLimiter({
    interval: 60 * 60 * 1000, // 1 hour
    uniqueTokenPerInterval: 50, // 50 uploads per hour
  }),
  
  // Payment endpoints - stricter limits
  payment: new RateLimiter({
    interval: 60 * 60 * 1000, // 1 hour
    uniqueTokenPerInterval: 20, // 20 payment attempts per hour
  }),
  
  // Subscription management - moderate limits
  subscription: new RateLimiter({
    interval: 60 * 60 * 1000, // 1 hour
    uniqueTokenPerInterval: 10, // 10 subscription changes per hour
  }),
  
  // Blockchain transactions - stricter limits (expensive operations)
  blockchain: new RateLimiter({
    interval: 60 * 60 * 1000, // 1 hour
    uniqueTokenPerInterval: 30, // 30 blockchain calls per hour
  }),
  
  // Read-only endpoints - generous limits
  read: new RateLimiter({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 100, // 100 requests per minute
  }),
  
  // General API endpoints - standard limits
  api: new RateLimiter({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 60, // 60 requests per minute
  }),
  
  // Webhook endpoints - very generous limits
  webhook: new RateLimiter({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 300, // 300 requests per minute
  }),
};

/**
 * Get identifier for rate limiting from request
 * Uses IP address, or user ID if authenticated
 */
export function getRateLimitIdentifier(request: Request, userId?: string): string {
  // Prefer user ID if available (more accurate)
  if (userId) {
    return `user:${userId}`;
  }
  
  // Fall back to IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  return `ip:${ip}`;
}

/**
 * Apply rate limiting to a request
 */
export async function applyRateLimit(
  request: Request,
  limiterType: keyof typeof RATE_LIMITS = 'api',
  userId?: string
): Promise<RateLimitResult> {
  const identifier = getRateLimitIdentifier(request, userId);
  const limiter = RATE_LIMITS[limiterType];
  
  return await limiter.check(identifier);
}

/**
 * Create rate limit headers for response
 */
export function createRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.reset.toString(),
  };
}

/**
 * Middleware wrapper for rate limiting
 * 
 * Usage:
 * ```typescript
 * export async function POST(request: NextRequest) {
 *   const rateLimit = await withRateLimit(request, 'auth');
 *   if (!rateLimit.success) {
 *     return rateLimit.response;
 *   }
 *   
 *   // Your handler logic here
 * }
 * ```
 */
export async function withRateLimit(
  request: Request,
  limiterType: keyof typeof RATE_LIMITS = 'api',
  userId?: string
): Promise<{
  success: boolean;
  response?: Response;
  headers: Record<string, string>;
}> {
  const result = await applyRateLimit(request, limiterType, userId);
  const headers = createRateLimitHeaders(result);
  
  if (!result.success) {
    return {
      success: false,
      response: new Response(
        JSON.stringify({
          error: 'Too many requests',
          message: 'You have exceeded the rate limit. Please try again later.',
          limit: result.limit,
          reset: result.reset,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': (result.reset - Math.floor(Date.now() / 1000)).toString(),
            ...headers,
          },
        }
      ),
      headers,
    };
  }
  
  return {
    success: true,
    headers,
  };
}

export default RateLimiter;
