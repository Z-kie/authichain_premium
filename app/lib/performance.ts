
// Performance monitoring utilities for SEO optimization

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Measure Core Web Vitals
  measureCoreWebVitals() {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    this.measureLCP();
    
    // First Input Delay (FID)
    this.measureFID();
    
    // Cumulative Layout Shift (CLS)
    this.measureCLS();
    
    // Time to First Byte (TTFB)
    this.measureTTFB();
  }

  private measureLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.startTime;
        
        this.metrics.set('lcp', lcp);
        this.reportMetric('lcp', lcp);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  private measureFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          this.metrics.set('fid', fid);
          this.reportMetric('fid', fid);
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  private measureCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        this.metrics.set('cls', clsValue);
        this.reportMetric('cls', clsValue);
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  private measureTTFB() {
    if ('performance' in window && 'navigation' in performance) {
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const ttfb = navigationTiming.responseStart - navigationTiming.fetchStart;
      
      this.metrics.set('ttfb', ttfb);
      this.reportMetric('ttfb', ttfb);
    }
  }

  private reportMetric(name: string, value: number) {
    // Report to Google Analytics
    if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'web_vitals', {
        custom_map: { metric: name },
        value: Math.round(value),
        metric_name: name,
        page_path: window.location.pathname
      });
    }

    // Report to console for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 ${name.toUpperCase()}: ${Math.round(value)}ms`);
    }
  }

  // Product-specific performance tracking
  trackProductInteractions() {
    if (typeof window === 'undefined') return;

    // Track NFT view performance
    this.trackEvent('nft_view_performance');
    
    // Track QR scanner performance
    this.trackEvent('qr_scanner_performance');
    
    // Track marketplace load performance
    this.trackEvent('marketplace_performance');
  }

  private trackEvent(eventName: string) {
    const startTime = performance.now();
    
    // Return a function to end timing
    return () => {
      const duration = performance.now() - startTime;
      
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', eventName, {
          value: Math.round(duration),
          product_platform: 'authichain',
          performance_timing: true
        });
      }
    };
  }

  // Image loading performance
  trackImageLoad(imageSrc: string, context: string = 'general') {
    const startTime = performance.now();
    
    const img = new Image();
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', 'image_load_time', {
          value: Math.round(loadTime),
          image_context: context,
          product_content: context.includes('product') || context.includes('nft')
        });
      }
    };
    
    img.src = imageSrc;
  }

  // Get all metrics for reporting
  getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// Initialize monitoring when module loads
if (typeof window !== 'undefined') {
  // Wait for page load
  window.addEventListener('load', () => {
    performanceMonitor.measureCoreWebVitals();
    performanceMonitor.trackProductInteractions();
  });
}
