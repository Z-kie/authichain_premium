
'use client';

/**
 * Performance observer component
 * Tracks navigation timing and resource loading
 */

import { useEffect } from 'react';
import { performanceMonitor } from '@/lib/monitoring/performance';

export function PerformanceObserver() {
  useEffect(() => {
    // Track navigation timing
    if (typeof window !== 'undefined' && window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      if (pageLoadTime > 0) {
        performanceMonitor.track('page_load_time', pageLoadTime);
      }
      if (connectTime > 0) {
        performanceMonitor.track('server_connect_time', connectTime);
      }
      if (renderTime > 0) {
        performanceMonitor.track('dom_render_time', renderTime);
      }
    }

    // Track resource timing
    if (typeof window !== 'undefined' && window.performance && window.performance.getEntriesByType) {
      const resources = window.performance.getEntriesByType('resource');
      resources.forEach((resource: any) => {
        if (resource.initiatorType === 'fetch' || resource.initiatorType === 'xmlhttprequest') {
          performanceMonitor.track('api_resource_time', resource.duration, {
            url: resource.name,
          });
        }
      });
    }
  }, []);

  return null;
}
