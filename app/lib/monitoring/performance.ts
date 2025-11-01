
/**
 * Performance monitoring utilities for AuthiChain
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];

  /**
   * Track a performance metric
   */
  track(name: string, value: number, metadata?: Record<string, any>) {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: new Date(),
      metadata,
    };

    this.metrics.push(metric);

    // Send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoring(metric);
    }
  }

  /**
   * Start timing an operation
   */
  startTimer(name: string): () => void {
    const startTime = Date.now();

    return () => {
      const duration = Date.now() - startTime;
      this.track(name, duration);
    };
  }

  /**
   * Track API endpoint performance
   */
  trackAPICall(endpoint: string, method: string, duration: number, status: number) {
    this.track('api_call_duration', duration, {
      endpoint,
      method,
      status,
    });
  }

  /**
   * Track database query performance
   */
  trackDatabaseQuery(query: string, duration: number) {
    this.track('db_query_duration', duration, {
      query,
    });
  }

  /**
   * Track NFT minting performance
   */
  trackNFTMinting(duration: number, success: boolean) {
    this.track('nft_minting_duration', duration, {
      success,
    });
  }

  /**
   * Track IPFS upload performance
   */
  trackIPFSUpload(fileSize: number, duration: number) {
    this.track('ipfs_upload_duration', duration, {
      fileSize,
    });
  }

  /**
   * Get metrics summary
   */
  getMetricsSummary() {
    const summary: Record<string, { count: number; avg: number; min: number; max: number }> = {};

    this.metrics.forEach((metric) => {
      if (!summary[metric.name]) {
        summary[metric.name] = {
          count: 0,
          avg: 0,
          min: Infinity,
          max: -Infinity,
        };
      }

      const s = summary[metric.name];
      s.count++;
      s.avg = (s.avg * (s.count - 1) + metric.value) / s.count;
      s.min = Math.min(s.min, metric.value);
      s.max = Math.max(s.max, metric.value);
    });

    return summary;
  }

  /**
   * Send metric to monitoring service
   */
  private sendToMonitoring(metric: PerformanceMetric) {
    // Send to Sentry or other monitoring service
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.addBreadcrumb({
        category: 'performance',
        message: `${metric.name}: ${metric.value}ms`,
        level: 'info',
        data: metric.metadata,
      });
    }
  }

  /**
   * Clear old metrics (keep last 1000)
   */
  clearOldMetrics() {
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Web Vitals tracking for client-side
export function trackWebVitals(metric: any) {
  const { id, name, label, value } = metric;

  // Send to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      event_label: id,
      non_interaction: true,
    });
  }

  // Send to Sentry
  if (typeof window !== 'undefined' && window.Sentry) {
    window.Sentry.addBreadcrumb({
      category: 'web-vitals',
      message: `${name}: ${value}`,
      level: 'info',
    });
  }

  // Track with our performance monitor
  performanceMonitor.track(`web_vital_${name.toLowerCase()}`, value);
}
