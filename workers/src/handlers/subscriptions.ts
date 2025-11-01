import { Env } from '../types';
import { successResponse, errorResponse } from '../utils/response';
import * as db from '../db/operations';

export async function handleSubscriptions(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const method = request.method;
  const origin = request.headers.get('Origin') || env.ALLOWED_ORIGINS;

  // Check if DB is available
  if (!env.DB) {
    return errorResponse('Database not configured. Please add D1 permissions to your API token.', 503, origin);
  }

  try {
    // GET /subscriptions?manufacturer_id=xxx - List subscriptions (optionally filtered)
    if (method === 'GET') {
      const manufacturerId = url.searchParams.get('manufacturer_id');
      
      if (manufacturerId) {
        const subscriptions = await db.getSubscriptionsByManufacturer(env.DB, manufacturerId);
        return successResponse(subscriptions, undefined, origin);
      }
      
      const subscriptions = await db.getAllSubscriptions(env.DB);
      return successResponse(subscriptions, undefined, origin);
    }

    // POST /subscriptions - Create new subscription
    if (method === 'POST') {
      const body = await request.json() as any;
      
      if (!body.manufacturer_id || !body.plan_name || !body.amount || !body.status) {
        return errorResponse('Missing required fields: manufacturer_id, plan_name, amount, status', 400, origin);
      }

      const subscription = await db.createSubscription(env.DB, body);
      return successResponse(subscription, 'Subscription created successfully', origin);
    }

    // PUT /subscriptions/:id - Update subscription status
    if (method === 'PUT') {
      const id = url.pathname.split('/').pop();
      if (!id || id === 'subscriptions') {
        return errorResponse('Subscription ID required', 400, origin);
      }

      const body = await request.json() as any;
      if (!body.status) {
        return errorResponse('Missing required field: status', 400, origin);
      }

      const subscription = await db.updateSubscriptionStatus(env.DB, id, body.status);
      return successResponse(subscription, 'Subscription updated successfully', origin);
    }

    return errorResponse('Method not allowed', 405, origin);
  } catch (error) {
    console.error('Subscriptions handler error:', error);
    return errorResponse(error instanceof Error ? error.message : 'Internal server error', 500, origin);
  }
}
