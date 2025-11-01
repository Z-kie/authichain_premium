/**
 * CSRF (Cross-Site Request Forgery) Protection for AuthiChain
 * 
 * Implements token-based CSRF protection for all state-changing operations.
 * Uses cryptographically secure random tokens stored in HTTP-only cookies.
 */

import { cookies } from 'next/headers';
import crypto from 'crypto';

const CSRF_TOKEN_LENGTH = 32;
const CSRF_COOKIE_NAME = 'authichain_csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

interface CSRFToken {
  token: string;
  timestamp: number;
}

/**
 * Generate a cryptographically secure CSRF token
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex');
}

/**
 * Get or create CSRF token for the current session
 * Call this in Server Components or API routes to get/set token
 */
export async function getCSRFToken(): Promise<string> {
  const cookieStore = cookies();
  const existingToken = cookieStore.get(CSRF_COOKIE_NAME);
  
  if (existingToken?.value) {
    try {
      const parsed: CSRFToken = JSON.parse(existingToken.value);
      const now = Date.now();
      
      // Check if token is still valid (not expired)
      if (parsed.timestamp + TOKEN_EXPIRY > now) {
        return parsed.token;
      }
    } catch (error) {
      // Invalid token format, generate new one
      console.error('Invalid CSRF token format:', error);
    }
  }
  
  // Generate new token
  const newToken = generateCSRFToken();
  const tokenData: CSRFToken = {
    token: newToken,
    timestamp: Date.now(),
  };
  
  // Set cookie
  cookieStore.set(CSRF_COOKIE_NAME, JSON.stringify(tokenData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: TOKEN_EXPIRY / 1000, // Convert to seconds
    path: '/',
  });
  
  return newToken;
}

/**
 * Validate CSRF token from request
 * Call this in API routes that modify data (POST, PUT, DELETE, PATCH)
 */
export async function validateCSRFToken(request: Request): Promise<boolean> {
  try {
    // Get token from header
    const headerToken = request.headers.get(CSRF_HEADER_NAME);
    
    if (!headerToken) {
      console.warn('CSRF validation failed: No token in header');
      return false;
    }
    
    // Get token from cookie
    const cookieStore = cookies();
    const cookieToken = cookieStore.get(CSRF_COOKIE_NAME);
    
    if (!cookieToken?.value) {
      console.warn('CSRF validation failed: No token in cookie');
      return false;
    }
    
    // Parse cookie token
    const parsed: CSRFToken = JSON.parse(cookieToken.value);
    
    // Check if token is expired
    const now = Date.now();
    if (parsed.timestamp + TOKEN_EXPIRY < now) {
      console.warn('CSRF validation failed: Token expired');
      return false;
    }
    
    // Compare tokens (constant-time comparison to prevent timing attacks)
    const isValid = crypto.timingSafeEqual(
      Buffer.from(headerToken),
      Buffer.from(parsed.token)
    );
    
    if (!isValid) {
      console.warn('CSRF validation failed: Token mismatch');
    }
    
    return isValid;
  } catch (error) {
    console.error('CSRF validation error:', error);
    return false;
  }
}

/**
 * Middleware wrapper for CSRF protection
 * Use this in API routes that modify data
 * 
 * Usage:
 * ```typescript
 * export async function POST(request: NextRequest) {
 *   const csrf = await withCSRFProtection(request);
 *   if (!csrf.valid) {
 *     return csrf.response;
 *   }
 *   
 *   // Your handler logic here
 * }
 * ```
 */
export async function withCSRFProtection(
  request: Request,
  options: { skipValidation?: boolean } = {}
): Promise<{
  valid: boolean;
  response?: Response;
}> {
  // Skip validation for GET requests (read-only)
  if (request.method === 'GET' || request.method === 'HEAD' || options.skipValidation) {
    return { valid: true };
  }
  
  const isValid = await validateCSRFToken(request);
  
  if (!isValid) {
    return {
      valid: false,
      response: new Response(
        JSON.stringify({
          error: 'Invalid CSRF token',
          message: 'Your request could not be validated. Please refresh the page and try again.',
          code: 'CSRF_VALIDATION_FAILED',
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ),
    };
  }
  
  return { valid: true };
}

/**
 * Create a new CSRF token and return response headers
 * Useful for rotating tokens after successful operations
 */
export async function rotateCSRFToken(): Promise<string> {
  const newToken = generateCSRFToken();
  const tokenData: CSRFToken = {
    token: newToken,
    timestamp: Date.now(),
  };
  
  const cookieStore = cookies();
  cookieStore.set(CSRF_COOKIE_NAME, JSON.stringify(tokenData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: TOKEN_EXPIRY / 1000,
    path: '/',
  });
  
  return newToken;
}

/**
 * Clear CSRF token (for logout)
 */
export function clearCSRFToken(): void {
  const cookieStore = cookies();
  cookieStore.delete(CSRF_COOKIE_NAME);
}

/**
 * Client-side helper: Get CSRF token for fetch requests
 * Include this in your client-side code
 * 
 * Usage in client component:
 * ```typescript
 * const response = await fetch('/api/endpoint', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'x-csrf-token': await getClientCSRFToken(),
 *   },
 *   body: JSON.stringify(data),
 * });
 * ```
 */
export const getClientCSRFTokenScript = `
/**
 * Get CSRF token from meta tag or API
 * This should be included in your client-side code
 */
async function getClientCSRFToken() {
  // Try to get from meta tag first (if server-rendered)
  const metaTag = document.querySelector('meta[name="csrf-token"]');
  if (metaTag) {
    return metaTag.getAttribute('content');
  }
  
  // Otherwise, fetch from API
  try {
    const response = await fetch('/api/csrf-token');
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
    throw new Error('CSRF token not available');
  }
}

// Add CSRF token to all fetch requests automatically
const originalFetch = window.fetch;
window.fetch = async function(input, init) {
  // Only add CSRF token to same-origin requests that modify data
  const url = typeof input === 'string' ? input : input.url;
  const method = init?.method?.toUpperCase() || 'GET';
  
  if (
    url.startsWith('/api/') &&
    ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)
  ) {
    const token = await getClientCSRFToken();
    init = init || {};
    init.headers = {
      ...init.headers,
      'x-csrf-token': token,
    };
  }
  
  return originalFetch(input, init);
};
`;

/**
 * API route to get CSRF token
 * Create this route: /api/csrf-token/route.ts
 */
export async function csrfTokenHandler(): Promise<Response> {
  try {
    const token = await getCSRFToken();
    
    return new Response(
      JSON.stringify({
        token,
        expiresIn: TOKEN_EXPIRY,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Error generating CSRF token:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to generate CSRF token',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
