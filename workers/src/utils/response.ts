import { APIResponse } from '../types';

export function corsHeaders(origin: string = '*'): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

export function jsonResponse<T>(data: APIResponse<T>, status: number = 200, origin?: string): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin),
    },
  });
}

export function successResponse<T>(data: T, message?: string, origin?: string): Response {
  return jsonResponse({ success: true, data, message }, 200, origin);
}

export function errorResponse(error: string, status: number = 400, origin?: string): Response {
  return jsonResponse({ success: false, error }, status, origin);
}

export function handleOptions(origin?: string): Response {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}
