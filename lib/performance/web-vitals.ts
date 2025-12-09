// Web Vitals monitoring and reporting
import { onCLS, onFCP, onLCP, onTTFB, onINP, type Metric } from 'web-vitals';

export interface WebVitalsReport {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

// Thresholds for ratings
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
};

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

function sendToAnalytics(metric: Metric) {
  const report: WebVitalsReport = {
    name: metric.name,
    value: metric.value,
    rating: getRating(metric.name, metric.value),
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  };

  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Send to custom analytics endpoint
  if (typeof window !== 'undefined') {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
      keepalive: true,
    }).catch(() => {}); // Silent fail
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Web Vital:', report);
  }
}

export function reportWebVitals() {
  if (typeof window === 'undefined') return;

  onCLS(sendToAnalytics);
  onINP(sendToAnalytics); // INP replaced FID in web-vitals v3+
  onFCP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}

// Performance observer for custom metrics
export function observePerformance() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  // Observe long tasks
  try {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50 && process.env.NODE_ENV === 'development') {
          console.warn('⚠️ Long task detected:', {
            duration: entry.duration,
            startTime: entry.startTime,
          });
        }
      }
    });
    longTaskObserver.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // Long task API not supported
  }

  // Observe layout shifts
  try {
    const layoutShiftObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if ((entry as any).hadRecentInput) continue;
        if (process.env.NODE_ENV === 'development') {
          console.log('📐 Layout shift:', {
            value: (entry as any).value,
            sources: (entry as any).sources,
          });
        }
      }
    });
    layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    // Layout shift API not supported
  }
}

// Monitor resource loading
export function monitorResources() {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const slowResources = resources.filter((r) => r.duration > 1000);

    if (slowResources.length > 0) {
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Slow resources detected:', slowResources.map((r) => ({
          name: r.name,
          duration: Math.round(r.duration),
          size: r.transferSize ? `${(r.transferSize / 1024).toFixed(2)} KB` : 'unknown',
          type: r.initiatorType,
        })));
      }

      // Send slow resource alerts to analytics (production & development)
      slowResources.forEach((resource) => {
        fetch('/api/analytics/slow-resources', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: resource.name,
            duration: resource.duration,
            size: resource.transferSize,
            type: resource.initiatorType,
          }),
          keepalive: true,
        }).catch(() => {}); // Silent fail in production
      });
    }

    // Log total page weight
    const totalSize = resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
    const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📦 Total page weight:', totalSizeMB, 'MB');
    }

    // Warn if page is too heavy and send alert
    if (totalSize > 5 * 1024 * 1024) { // 5MB
      const message = `Page weight exceeds 5MB (${totalSizeMB}MB). Consider optimizing resources.`;
      
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️', message);
      }
      
      // Send performance alert to analytics
      fetch('/api/analytics/performance-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'page_weight',
          value: totalSize,
          message,
          url: window.location.href,
        }),
        keepalive: true,
      }).catch(() => {}); // Silent fail
    }

    // Log resource breakdown by type (development only)
    if (process.env.NODE_ENV === 'development') {
      const resourcesByType = resources.reduce((acc, r) => {
        const type = r.initiatorType || 'other';
        acc[type] = (acc[type] || 0) + (r.transferSize || 0);
        return acc;
      }, {} as Record<string, number>);

      console.log('📊 Resources by type:', Object.entries(resourcesByType).map(([type, size]) => ({
        type,
        size: `${(size / 1024).toFixed(2)} KB`,
        percentage: `${((size / totalSize) * 100).toFixed(1)}%`,
      })));
    }
  });
}
