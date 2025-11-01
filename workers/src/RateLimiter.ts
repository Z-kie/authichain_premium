export interface RateLimiterState {
  requests: number;
  resetTime: number;
}

export class RateLimiter {
  private state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const clientId = url.searchParams.get('clientId') || 'anonymous';
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const windowMs = parseInt(url.searchParams.get('windowMs') || '60000'); // 1 minute default

    // Get current state
    const now = Date.now();
    let state = await this.state.storage.get<RateLimiterState>(clientId);

    // Reset if window expired
    if (!state || now > state.resetTime) {
      state = {
        requests: 0,
        resetTime: now + windowMs,
      };
    }

    // Check if rate limit exceeded
    if (state.requests >= limit) {
      const remaining = Math.ceil((state.resetTime - now) / 1000);
      return new Response(
        JSON.stringify({
          allowed: false,
          limit,
          remaining: 0,
          resetIn: remaining,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': state.resetTime.toString(),
            'Retry-After': remaining.toString(),
          },
        }
      );
    }

    // Increment and save
    state.requests++;
    await this.state.storage.put(clientId, state);

    return new Response(
      JSON.stringify({
        allowed: true,
        limit,
        remaining: limit - state.requests,
        resetIn: Math.ceil((state.resetTime - now) / 1000),
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': (limit - state.requests).toString(),
          'X-RateLimit-Reset': state.resetTime.toString(),
        },
      }
    );
  }
}
