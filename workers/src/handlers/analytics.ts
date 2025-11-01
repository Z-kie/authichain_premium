import { Env } from '../types';
import { successResponse, errorResponse } from '../utils/response';
import * as db from '../db/operations';

export async function handleAnalytics(request: Request, env: Env): Promise<Response> {
  const method = request.method;
  const origin = request.headers.get('Origin') || env.ALLOWED_ORIGINS;

  // Check if DB is available
  if (!env.DB) {
    return errorResponse('Database not configured. Please add D1 permissions to your API token.', 503, origin);
  }

  try {
    if (method === 'GET') {
      const analytics = await db.getAnalytics(env.DB);
      return successResponse(analytics, undefined, origin);
    }

    return errorResponse('Method not allowed', 405, origin);
  } catch (error) {
    console.error('Analytics handler error:', error);
    return errorResponse(error instanceof Error ? error.message : 'Internal server error', 500, origin);
  }
}
