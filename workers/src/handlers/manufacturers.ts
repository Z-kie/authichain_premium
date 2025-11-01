import { Env } from '../types';
import { successResponse, errorResponse } from '../utils/response';
import * as db from '../db/operations';

export async function handleManufacturers(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const method = request.method;
  const origin = request.headers.get('Origin') || env.ALLOWED_ORIGINS;

  // Check if DB is available
  if (!env.DB) {
    return errorResponse('Database not configured. Please add D1 permissions to your API token.', 503, origin);
  }

  try {
    // GET /manufacturers - List all manufacturers
    // GET /manufacturers/:id - Get specific manufacturer
    if (method === 'GET') {
      const id = url.pathname.split('/').pop();
      
      if (id && id !== 'manufacturers') {
        const manufacturer = await db.getManufacturerById(env.DB, id);
        if (!manufacturer) {
          return errorResponse('Manufacturer not found', 404, origin);
        }
        return successResponse(manufacturer, undefined, origin);
      }
      
      const manufacturers = await db.getAllManufacturers(env.DB);
      return successResponse(manufacturers, undefined, origin);
    }

    // POST /manufacturers - Create new manufacturer
    if (method === 'POST') {
      const body = await request.json() as any;
      
      if (!body.company_name || !body.contact_email) {
        return errorResponse('Missing required fields: company_name, contact_email', 400, origin);
      }

      const manufacturer = await db.createManufacturer(env.DB, body);
      return successResponse(manufacturer, 'Manufacturer created successfully', origin);
    }

    // PUT /manufacturers/:id - Update manufacturer tier
    if (method === 'PUT') {
      const id = url.pathname.split('/').pop();
      if (!id || id === 'manufacturers') {
        return errorResponse('Manufacturer ID required', 400, origin);
      }

      const body = await request.json() as any;
      if (!body.tier) {
        return errorResponse('Missing required field: tier', 400, origin);
      }

      const manufacturer = await db.updateManufacturerTier(env.DB, id, body.tier);
      return successResponse(manufacturer, 'Manufacturer updated successfully', origin);
    }

    return errorResponse('Method not allowed', 405, origin);
  } catch (error) {
    console.error('Manufacturers handler error:', error);
    return errorResponse(error instanceof Error ? error.message : 'Internal server error', 500, origin);
  }
}
