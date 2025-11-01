
'use client';

/**
 * Web Vitals tracking component
 * Tracks Core Web Vitals and sends to monitoring services
 */

import { useReportWebVitals } from 'next/web-vitals';
import { trackWebVitals } from '@/lib/monitoring/performance';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Track with our monitoring system
    trackWebVitals(metric);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', metric);
    }
  });

  return null;
}
