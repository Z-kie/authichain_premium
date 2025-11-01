
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of transactions
  
  // Environment
  environment: process.env.NODE_ENV || 'development',
  
  // Release tracking
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
  
  // Additional configuration
  beforeSend(event, hint) {
    // Filter out sensitive information
    if (event.request) {
      delete event.request.cookies;
      if (event.request.headers) {
        delete event.request.headers.authorization;
        delete event.request.headers.cookie;
      }
    }
    
    // Filter out sensitive data from extra context
    if (event.extra) {
      delete event.extra.password;
      delete event.extra.token;
      delete event.extra.apiKey;
    }
    
    return event;
  },
  
  // Ignore certain errors
  ignoreErrors: [
    'ECONNRESET',
    'ETIMEDOUT',
    'ECONNREFUSED',
  ],
  
  // Integrations
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Prisma({ client: undefined }), // Will be set up when Prisma client is initialized
  ],
});
