/**
 * Centralized Error Handling for AuthiChain
 * 
 * Provides consistent error responses and logging across all API routes.
 * Differentiates between development and production environments.
 */

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

// Error types
export enum ErrorType {
  VALIDATION = 'VALIDATION_ERROR',
  AUTHENTICATION = 'AUTHENTICATION_ERROR',
  AUTHORIZATION = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  RATE_LIMIT = 'RATE_LIMIT_EXCEEDED',
  PAYMENT = 'PAYMENT_ERROR',
  BLOCKCHAIN = 'BLOCKCHAIN_ERROR',
  DATABASE = 'DATABASE_ERROR',
  EXTERNAL_API = 'EXTERNAL_API_ERROR',
  INTERNAL = 'INTERNAL_SERVER_ERROR',
}

// Error codes mapping to HTTP status codes
const ERROR_STATUS_CODES: Record<ErrorType, number> = {
  [ErrorType.VALIDATION]: 400,
  [ErrorType.AUTHENTICATION]: 401,
  [ErrorType.AUTHORIZATION]: 403,
  [ErrorType.NOT_FOUND]: 404,
  [ErrorType.CONFLICT]: 409,
  [ErrorType.RATE_LIMIT]: 429,
  [ErrorType.PAYMENT]: 402,
  [ErrorType.BLOCKCHAIN]: 500,
  [ErrorType.DATABASE]: 500,
  [ErrorType.EXTERNAL_API]: 502,
  [ErrorType.INTERNAL]: 500,
};

// Custom application error
export class AppError extends Error {
  constructor(
    public type: ErrorType,
    public message: string,
    public details?: any,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode || ERROR_STATUS_CODES[type];
  }
}

// Error response interface
interface ErrorResponse {
  error: string;
  message: string;
  type: ErrorType;
  code?: string;
  details?: any;
  timestamp: string;
  path?: string;
  requestId?: string;
  stack?: string; // Only in development
}

/**
 * Check if running in production
 */
function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Generate request ID for tracking
 */
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Log error (in production, you'd send this to a logging service)
 */
function logError(error: Error, context?: any): void {
  const timestamp = new Date().toISOString();
  const logData = {
    timestamp,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    context,
  };
  
  if (isProduction()) {
    // In production, send to logging service (e.g., Sentry, LogRocket, etc.)
    console.error('[ERROR]', JSON.stringify(logData));
    
    // TODO: Send to external logging service
    // Example: Sentry.captureException(error, { extra: context });
  } else {
    // In development, log to console with formatting
    console.error('\n=== ERROR ===');
    console.error('Time:', timestamp);
    console.error('Name:', error.name);
    console.error('Message:', error.message);
    if (context) {
      console.error('Context:', JSON.stringify(context, null, 2));
    }
    console.error('Stack:', error.stack);
    console.error('=============\n');
  }
}

/**
 * Handle Zod validation errors
 */
function handleZodError(error: ZodError): ErrorResponse {
  return {
    error: 'Validation Error',
    message: 'Invalid request data',
    type: ErrorType.VALIDATION,
    details: error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    })),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Type guard to check if error is a Prisma error
 */
function isPrismaError(error: any): error is { code: string; meta?: any; message: string } {
  return error && typeof error.code === 'string' && error.code.startsWith('P');
}

/**
 * Handle Prisma errors
 */
function handlePrismaError(error: any): ErrorResponse {
  const timestamp = new Date().toISOString();
  
  switch (error.code) {
    case 'P2002':
      // Unique constraint violation
      return {
        error: 'Conflict',
        message: 'A record with this data already exists',
        type: ErrorType.CONFLICT,
        code: error.code,
        details: {
          fields: error.meta?.target,
        },
        timestamp,
      };
      
    case 'P2025':
      // Record not found
      return {
        error: 'Not Found',
        message: 'The requested resource was not found',
        type: ErrorType.NOT_FOUND,
        code: error.code,
        timestamp,
      };
      
    case 'P2003':
      // Foreign key constraint violation
      return {
        error: 'Validation Error',
        message: 'Invalid reference to related resource',
        type: ErrorType.VALIDATION,
        code: error.code,
        timestamp,
      };
      
    case 'P2014':
      // Invalid relation
      return {
        error: 'Validation Error',
        message: 'Invalid relation in request',
        type: ErrorType.VALIDATION,
        code: error.code,
        timestamp,
      };
      
    default:
      return {
        error: 'Database Error',
        message: isProduction()
          ? 'A database error occurred'
          : `Database error: ${error.message}`,
        type: ErrorType.DATABASE,
        code: error.code,
        timestamp,
      };
  }
}

/**
 * Handle Stripe errors
 */
function handleStripeError(error: any): ErrorResponse {
  return {
    error: 'Payment Error',
    message: isProduction()
      ? 'Payment processing failed. Please try again.'
      : error.message,
    type: ErrorType.PAYMENT,
    code: error.code,
    details: isProduction() ? undefined : {
      type: error.type,
      statusCode: error.statusCode,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * Handle blockchain/web3 errors
 */
function handleWeb3Error(error: Error): ErrorResponse {
  return {
    error: 'Blockchain Error',
    message: isProduction()
      ? 'Blockchain transaction failed. Please try again.'
      : error.message,
    type: ErrorType.BLOCKCHAIN,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Main error handler
 */
export function handleError(
  error: Error | AppError | ZodError,
  request?: Request
): NextResponse {
  const requestId = generateRequestId();
  let response: ErrorResponse;
  let statusCode: number = 500;
  
  // Log the error
  logError(error, {
    requestId,
    url: request?.url,
    method: request?.method,
  });
  
  // Handle specific error types
  if (error instanceof AppError) {
    // Custom application error
    response = {
      error: error.type,
      message: error.message,
      type: error.type,
      details: isProduction() ? undefined : error.details,
      timestamp: new Date().toISOString(),
      path: request?.url,
      requestId,
    };
    statusCode = error.statusCode ?? 500;
  } else if (error instanceof ZodError) {
    // Zod validation error
    response = handleZodError(error);
    statusCode = 400;
  } else if (isPrismaError(error)) {
    // Prisma database error
    const prismaResponse = handlePrismaError(error);
    response = {
      ...prismaResponse,
      path: request?.url,
      requestId,
    };
    statusCode = ERROR_STATUS_CODES[prismaResponse.type];
  } else if (error.name === 'StripeError' || (error as any).type?.includes('Stripe')) {
    // Stripe payment error
    response = handleStripeError(error);
    statusCode = 402;
  } else if (
    error.message.includes('web3') ||
    error.message.includes('contract') ||
    error.message.includes('transaction')
  ) {
    // Blockchain/Web3 error
    response = handleWeb3Error(error);
    statusCode = 500;
  } else {
    // Generic error
    response = {
      error: 'Internal Server Error',
      message: isProduction()
        ? 'An unexpected error occurred. Please try again later.'
        : error.message,
      type: ErrorType.INTERNAL,
      timestamp: new Date().toISOString(),
      path: request?.url,
      requestId,
      stack: isProduction() ? undefined : error.stack,
    };
  }
  
  // Add stack trace in development
  if (!isProduction() && !response.stack) {
    response.stack = error.stack;
  }
  
  return NextResponse.json(response, {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'X-Request-Id': requestId,
    },
  });
}

/**
 * Try-catch wrapper for API route handlers
 * 
 * Usage:
 * ```typescript
 * export const POST = withErrorHandler(async (request) => {
 *   // Your handler logic here
 *   return NextResponse.json({ success: true });
 * });
 * ```
 */
export function withErrorHandler(
  handler: (request: Request, context?: any) => Promise<Response>
) {
  return async (request: Request, context?: any): Promise<Response> => {
    try {
      return await handler(request, context);
    } catch (error) {
      return handleError(error as Error, request);
    }
  };
}

/**
 * Create a standardized success response
 */
export function successResponse<T>(
  data: T,
  message?: string,
  statusCode: number = 200
): NextResponse {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    },
    { status: statusCode }
  );
}

/**
 * Create a standardized error response
 */
export function errorResponse(
  type: ErrorType,
  message: string,
  details?: any,
  statusCode?: number
): NextResponse {
  const response: ErrorResponse = {
    error: type,
    message,
    type,
    details: isProduction() ? undefined : details,
    timestamp: new Date().toISOString(),
  };
  
  return NextResponse.json(response, {
    status: statusCode || ERROR_STATUS_CODES[type],
  });
}

/**
 * Validation error helper
 */
export function validationError(message: string, details?: any): NextResponse {
  return errorResponse(ErrorType.VALIDATION, message, details);
}

/**
 * Authentication error helper
 */
export function authenticationError(message: string = 'Authentication required'): NextResponse {
  return errorResponse(ErrorType.AUTHENTICATION, message);
}

/**
 * Authorization error helper
 */
export function authorizationError(message: string = 'Insufficient permissions'): NextResponse {
  return errorResponse(ErrorType.AUTHORIZATION, message);
}

/**
 * Not found error helper
 */
export function notFoundError(resource: string = 'Resource'): NextResponse {
  return errorResponse(ErrorType.NOT_FOUND, `${resource} not found`);
}

/**
 * Conflict error helper
 */
export function conflictError(message: string): NextResponse {
  return errorResponse(ErrorType.CONFLICT, message);
}

/**
 * Rate limit error helper
 */
export function rateLimitError(message: string = 'Too many requests'): NextResponse {
  return errorResponse(ErrorType.RATE_LIMIT, message);
}

// Export all error types and helpers
export default {
  AppError,
  ErrorType,
  handleError,
  withErrorHandler,
  successResponse,
  errorResponse,
  validationError,
  authenticationError,
  authorizationError,
  notFoundError,
  conflictError,
  rateLimitError,
};
