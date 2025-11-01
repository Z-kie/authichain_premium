/**
 * CSRF Token API Endpoint
 * Provides CSRF tokens for client-side requests
 */

import { csrfTokenHandler } from '@/lib/csrf';

export const dynamic = 'force-dynamic';


export async function GET() {
  return await csrfTokenHandler();
}
