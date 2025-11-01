
/**
 * Production-ready logging utility for AuthiChain
 * Provides structured logging with different severity levels
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  CRITICAL = 'critical',
}

export interface LogContext {
  userId?: string;
  walletAddress?: string;
  requestId?: string;
  action?: string;
  metadata?: Record<string, any>;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isProduction = process.env.NODE_ENV === 'production';

  /**
   * Format log entry with timestamp and structure
   */
  private formatLog(level: LogLevel, message: string, context?: LogContext, error?: Error) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      environment: process.env.NODE_ENV,
      ...context,
    };

    if (error) {
      logEntry['error'] = {
        name: error.name,
        message: error.message,
        stack: this.isProduction ? undefined : error.stack,
      };
    }

    return logEntry;
  }

  /**
   * Send log to external monitoring service
   */
  private async sendToMonitoring(logEntry: any) {
    // In production, you might want to send to external service
    // For now, we'll rely on Vercel's built-in logging
    if (this.isProduction) {
      console.log(JSON.stringify(logEntry));
    }
  }

  /**
   * Debug level logging
   */
  debug(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      const logEntry = this.formatLog(LogLevel.DEBUG, message, context);
      console.log(JSON.stringify(logEntry));
    }
  }

  /**
   * Info level logging
   */
  info(message: string, context?: LogContext) {
    const logEntry = this.formatLog(LogLevel.INFO, message, context);
    console.log(JSON.stringify(logEntry));
    this.sendToMonitoring(logEntry);
  }

  /**
   * Warning level logging
   */
  warn(message: string, context?: LogContext) {
    const logEntry = this.formatLog(LogLevel.WARN, message, context);
    console.warn(JSON.stringify(logEntry));
    this.sendToMonitoring(logEntry);
  }

  /**
   * Error level logging
   */
  error(message: string, context?: LogContext, error?: Error) {
    const logEntry = this.formatLog(LogLevel.ERROR, message, context, error);
    console.error(JSON.stringify(logEntry));
    this.sendToMonitoring(logEntry);

    // Also send to Sentry if available
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error || new Error(message), {
        contexts: { custom: context as any },
      });
    }
  }

  /**
   * Critical level logging - for system failures
   */
  critical(message: string, context?: LogContext, error?: Error) {
    const logEntry = this.formatLog(LogLevel.CRITICAL, message, context, error);
    console.error(JSON.stringify(logEntry));
    this.sendToMonitoring(logEntry);

    // Always send critical errors to Sentry
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error || new Error(message), {
        level: 'fatal',
        contexts: { custom: context as any },
      });
    }
  }

  /**
   * Log API request
   */
  logRequest(method: string, path: string, context?: LogContext) {
    this.info(`API Request: ${method} ${path}`, {
      ...context,
      action: 'api_request',
    });
  }

  /**
   * Log API response
   */
  logResponse(method: string, path: string, status: number, duration: number, context?: LogContext) {
    const level = status >= 500 ? LogLevel.ERROR : status >= 400 ? LogLevel.WARN : LogLevel.INFO;
    this[level](`API Response: ${method} ${path} - ${status} (${duration}ms)`, {
      ...context,
      action: 'api_response',
      metadata: {
        status,
        duration,
      },
    });
  }

  /**
   * Log NFT operation
   */
  logNFTOperation(operation: string, success: boolean, context?: LogContext) {
    const message = `NFT Operation: ${operation} - ${success ? 'SUCCESS' : 'FAILED'}`;
    if (success) {
      this.info(message, { ...context, action: 'nft_operation' });
    } else {
      this.error(message, { ...context, action: 'nft_operation' });
    }
  }

  /**
   * Log payment operation
   */
  logPayment(operation: string, amount: number, currency: string, success: boolean, context?: LogContext) {
    const message = `Payment: ${operation} - ${amount} ${currency} - ${success ? 'SUCCESS' : 'FAILED'}`;
    if (success) {
      this.info(message, {
        ...context,
        action: 'payment',
        metadata: { amount, currency },
      });
    } else {
      this.error(message, {
        ...context,
        action: 'payment',
        metadata: { amount, currency },
      });
    }
  }

  /**
   * Log authentication event
   */
  logAuth(event: string, success: boolean, context?: LogContext) {
    const message = `Auth: ${event} - ${success ? 'SUCCESS' : 'FAILED'}`;
    if (success) {
      this.info(message, { ...context, action: 'auth' });
    } else {
      this.warn(message, { ...context, action: 'auth' });
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export type for logger
export type LoggerType = typeof logger;
