
/**
 * Monitoring middleware for API routes
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from './logger';
import { performanceMonitor } from './performance';

export interface MonitoringOptions {
  logRequests?: boolean;
  logResponses?: boolean;
  trackPerformance?: boolean;
}

const defaultOptions: MonitoringOptions = {
  logRequests: true,
  logResponses: true,
  trackPerformance: true,
};

/**
 * Middleware to monitor API requests
 */
export function withMonitoring(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: MonitoringOptions = defaultOptions
) {
  return async (req: NextRequest) => {
    const startTime = Date.now();
    const requestId = crypto.randomUUID();
    const { pathname } = new URL(req.url);
    const method = req.method;

    // Log request
    if (options.logRequests) {
      logger.logRequest(method, pathname, {
        requestId,
      });
    }

    try {
      // Execute handler
      const response = await handler(req);
      const duration = Date.now() - startTime;
      const status = response.status;

      // Log response
      if (options.logResponses) {
        logger.logResponse(method, pathname, status, duration, {
          requestId,
        });
      }

      // Track performance
      if (options.trackPerformance) {
        performanceMonitor.trackAPICall(pathname, method, duration, status);
      }

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;

      // Log error
      logger.error(`API Error: ${method} ${pathname}`, {
        requestId,
      }, error as Error);

      // Track performance
      if (options.trackPerformance) {
        performanceMonitor.trackAPICall(pathname, method, duration, 500);
      }

      // Return error response
      return NextResponse.json(
        { error: 'Internal Server Error', requestId },
        { status: 500 }
      );
    }
  };
}

/**
 * HOC for wrapping API route handlers with monitoring
 */
export function monitoredAPIRoute(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options?: MonitoringOptions
) {
  return withMonitoring(handler, options);
}
