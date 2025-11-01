import { Env } from '../types';
import { successResponse, errorResponse } from '../utils/response';
import * as db from '../db/operations';

export async function handleDeals(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const method = request.method;
  const origin = request.headers.get('Origin') || env.ALLOWED_ORIGINS;

  // Check if DB is available
  if (!env.DB) {
    return errorResponse('Database not configured. Please add D1 permissions to your API token.', 503, origin);
  }

  try {
    // GET /deals?manufacturer_id=xxx - List deals (optionally filtered by manufacturer)
    if (method === 'GET') {
      const manufacturerId = url.searchParams.get('manufacturer_id');
      
      if (manufacturerId) {
        const deals = await db.getDealsByManufacturer(env.DB, manufacturerId);
        return successResponse(deals, undefined, origin);
      }
      
      const deals = await db.getAllDeals(env.DB);
      return successResponse(deals, undefined, origin);
    }

    // POST /deals - Create new deal
    if (method === 'POST') {
      const body = await request.json() as any;
      
      if (!body.manufacturer_id || !body.deal_name || !body.deal_value || !body.stage || !body.owner_email) {
        return errorResponse('Missing required fields: manufacturer_id, deal_name, deal_value, stage, owner_email', 400, origin);
      }

      const deal = await db.createDeal(env.DB, body);
      return successResponse(deal, 'Deal created successfully', origin);
    }

    // PUT /deals/:id - Update deal stage
    if (method === 'PUT') {
      const id = url.pathname.split('/').pop();
      if (!id || id === 'deals') {
        return errorResponse('Deal ID required', 400, origin);
      }

      const body = await request.json() as any;
      if (!body.stage) {
        return errorResponse('Missing required field: stage', 400, origin);
      }

      const deal = await db.updateDealStage(env.DB, id, body.stage);
      return successResponse(deal, 'Deal updated successfully', origin);
    }

    return errorResponse('Method not allowed', 405, origin);
  } catch (error) {
    console.error('Deals handler error:', error);
    return errorResponse(error instanceof Error ? error.message : 'Internal server error', 500, origin);
  }
}
