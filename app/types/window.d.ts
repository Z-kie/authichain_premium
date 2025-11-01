
/**
 * Window type extensions for monitoring
 */

import * as Sentry from '@sentry/nextjs';

declare global {
  interface Window {
    Sentry: typeof Sentry;
    gtag?: (command: string, targetId: string, config?: Record<string, any>) => void;
    dataLayer?: Array<any>;
  }
}

export {};
