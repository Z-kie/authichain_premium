/**
 * Security Middleware for AuthiChain
 * 
 * Combines rate limiting, CSRF protection, input validation, and error handling
 * into a single, easy-to-use middleware wrapper.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { withRateLimit, RATE_LIMITS } from '@/lib/rate-limiter';
import { withCSRFProtection } from '@/lib/csrf';
import { validateRequest } from '@/lib/validations';
import { handleError, successResponse, authenticationError } from '@/lib/error-handler';
import { z } from 'zod';

// Middleware configuration
export interface SecurityConfig {
  // Rate limiting
  rateLimit?: keyof typeof RATE_LIMITS | false;
  
  // Authentication
  requireAuth?: boolean;
  
  // CSRF protection
  csrfProtection?: boolean;
  
  // Input validation
  validationSchema?: z.ZodSchema<any>;
  
  // Custom error handler
  errorHandler?: (error: Error) => Response;
}

// Middleware result
export interface MiddlewareResult<T = any> {
  success: boolean;
  data?: T;
  session?: any;
  userId?: string;
  response?: Response;
  rateLimitHeaders?: Record<string, string>;
}

/**
 * Main security middleware wrapper
 * 
 * Usage:
 * ```typescript
 * export async function POST(request: NextRequest) {
 *   const result = await withSecurity(request, {
 *     requireAuth: true,
 *     rateLimit: 'auth',
 *     csrfProtection: true,
 *     validationSchema: userLoginSchema,
 *   });
 *   
 *   if (!result.success) {
 *     return result.response;
 *   }
 *   
 *   // Your handler logic here with result.data and result.session
 *   return successResponse({ message: 'Success' });
 * }
 * ```
 */
export async function withSecurity<T = any>(
  request: Request,
  config: SecurityConfig = {}
): Promise<MiddlewareResult<T>> {
  try {
    const {
      rateLimit = 'api',
      requireAuth = false,
      csrfProtection = true,
      validationSchema,
    } = config;
    
    let session: any = null;
    let userId: string | undefined;
    let rateLimitHeaders: Record<string, string> = {};
    
    // 1. Check authentication if required
    if (requireAuth) {
      session = await getServerSession(authOptions);
      
      if (!session?.user) {
        return {
          success: false,
          response: authenticationError('Authentication required'),
        };
      }
      
      userId = session.user.id;
    }
    
    // 2. Apply rate limiting
    if (rateLimit !== false) {
      const rateLimitResult = await withRateLimit(request, rateLimit, userId);
      rateLimitHeaders = rateLimitResult.headers;
      
      if (!rateLimitResult.success) {
        return {
          success: false,
          response: rateLimitResult.response,
          rateLimitHeaders,
        };
      }
    }
    
    // 3. Check CSRF token for state-changing requests
    if (csrfProtection && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
      const csrfResult = await withCSRFProtection(request);
      
      if (!csrfResult.valid) {
        return {
          success: false,
          response: csrfResult.response,
          rateLimitHeaders,
        };
      }
    }
    
    // 4. Validate request body if schema provided
    let data: T | undefined;
    if (validationSchema) {
      const validationResult = await validateRequest<T>(request, validationSchema);
      
      if (!validationResult.success) {
        return {
          success: false,
          response: validationResult.response,
          rateLimitHeaders,
        };
      }
      
      data = validationResult.data;
    }
    
    // All checks passed
    return {
      success: true,
      data,
      session,
      userId,
      rateLimitHeaders,
    };
  } catch (error) {
    return {
      success: false,
      response: handleError(error as Error, request),
    };
  }
}

/**
 * Middleware for public endpoints (no auth required)
 * Includes rate limiting and optional validation
 */
export async function withPublicSecurity<T = any>(
  request: Request,
  config: Omit<SecurityConfig, 'requireAuth'> = {}
): Promise<MiddlewareResult<T>> {
  return withSecurity<T>(request, {
    ...config,
    requireAuth: false,
  });
}

/**
 * Middleware for protected endpoints (auth required)
 * Includes auth, rate limiting, CSRF, and optional validation
 */
export async function withProtectedSecurity<T = any>(
  request: Request,
  config: Omit<SecurityConfig, 'requireAuth'> = {}
): Promise<MiddlewareResult<T>> {
  return withSecurity<T>(request, {
    ...config,
    requireAuth: true,
  });
}

/**
 * Middleware for read-only endpoints
 * Uses generous rate limits, no CSRF protection
 */
export async function withReadOnlySecurity<T = any>(
  request: Request,
  config: Partial<SecurityConfig> = {}
): Promise<MiddlewareResult<T>> {
  return withSecurity<T>(request, {
    rateLimit: 'read',
    csrfProtection: false,
    ...config,
  });
}

/**
 * Middleware for authentication endpoints
 * Uses strict rate limits
 */
export async function withAuthSecurity<T = any>(
  request: Request,
  validationSchema?: z.ZodSchema<T>
): Promise<MiddlewareResult<T>> {
  return withSecurity<T>(request, {
    rateLimit: 'auth',
    requireAuth: false,
    csrfProtection: true,
    validationSchema,
  });
}

/**
 * Middleware for payment endpoints
 * Uses payment-specific rate limits
 */
export async function withPaymentSecurity<T = any>(
  request: Request,
  validationSchema?: z.ZodSchema<T>
): Promise<MiddlewareResult<T>> {
  return withSecurity<T>(request, {
    rateLimit: 'payment',
    requireAuth: true,
    csrfProtection: true,
    validationSchema,
  });
}

/**
 * Middleware for NFT minting endpoints
 * Uses mint-specific rate limits
 */
export async function withMintSecurity<T = any>(
  request: Request,
  validationSchema?: z.ZodSchema<T>
): Promise<MiddlewareResult<T>> {
  return withSecurity<T>(request, {
    rateLimit: 'mint',
    requireAuth: true,
    csrfProtection: true,
    validationSchema,
  });
}

/**
 * Middleware for blockchain transaction endpoints
 * Uses blockchain-specific rate limits
 */
export async function withBlockchainSecurity<T = any>(
  request: Request,
  validationSchema?: z.ZodSchema<T>
): Promise<MiddlewareResult<T>> {
  return withSecurity<T>(request, {
    rateLimit: 'blockchain',
    requireAuth: true,
    csrfProtection: true,
    validationSchema,
  });
}

/**
 * Middleware for file upload endpoints
 * Uses upload-specific rate limits
 */
export async function withUploadSecurity<T = any>(
  request: Request,
  validationSchema?: z.ZodSchema<T>
): Promise<MiddlewareResult<T>> {
  return withSecurity<T>(request, {
    rateLimit: 'upload',
    requireAuth: true,
    csrfProtection: true,
    validationSchema,
  });
}

/**
 * Middleware for webhook endpoints
 * Uses generous rate limits, no auth or CSRF
 */
export async function withWebhookSecurity(
  request: Request,
  validateSignature?: (request: Request) => Promise<boolean>
): Promise<MiddlewareResult> {
  try {
    // Check webhook signature if validator provided
    if (validateSignature) {
      const isValid = await validateSignature(request);
      
      if (!isValid) {
        return {
          success: false,
          response: new Response(
            JSON.stringify({ error: 'Invalid webhook signature' }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            }
          ),
        };
      }
    }
    
    // Apply generous rate limiting for webhooks
    return withSecurity(request, {
      rateLimit: 'webhook',
      requireAuth: false,
      csrfProtection: false,
    });
  } catch (error) {
    return {
      success: false,
      response: handleError(error as Error, request),
    };
  }
}

/**
 * Helper to add rate limit headers to response
 */
export function addRateLimitHeaders(
  response: Response,
  headers: Record<string, string>
): Response {
  const newHeaders = new Headers(response.headers);
  
  for (const [key, value] of Object.entries(headers)) {
    newHeaders.set(key, value);
  }
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

/**
 * Create a complete route handler with security
 * 
 * Usage:
 * ```typescript
 * export const POST = createSecureHandler(
 *   async (request, { data, session, userId }) => {
 *     // Your handler logic here
 *     return successResponse({ success: true });
 *   },
 *   {
 *     requireAuth: true,
 *     rateLimit: 'api',
 *     validationSchema: mySchema,
 *   }
 * );
 * ```
 */
export function createSecureHandler<T = any>(
  handler: (
    request: Request,
    context: {
      data?: T;
      session?: any;
      userId?: string;
      rateLimitHeaders: Record<string, string>;
    }
  ) => Promise<Response>,
  config: SecurityConfig = {}
) {
  return async (request: Request): Promise<Response> => {
    try {
      // Apply security middleware
      const result = await withSecurity<T>(request, config);
      
      if (!result.success) {
        return result.response!;
      }
      
      // Call the actual handler
      const response = await handler(request, {
        data: result.data,
        session: result.session,
        userId: result.userId,
        rateLimitHeaders: result.rateLimitHeaders || {},
      });
      
      // Add rate limit headers to response
      if (result.rateLimitHeaders) {
        return addRateLimitHeaders(response, result.rateLimitHeaders);
      }
      
      return response;
    } catch (error) {
      return handleError(error as Error, request);
    }
  };
}

// Export all middleware functions
export default {
  withSecurity,
  withPublicSecurity,
  withProtectedSecurity,
  withReadOnlySecurity,
  withAuthSecurity,
  withPaymentSecurity,
  withMintSecurity,
  withBlockchainSecurity,
  withUploadSecurity,
  withWebhookSecurity,
  createSecureHandler,
  addRateLimitHeaders,
};
