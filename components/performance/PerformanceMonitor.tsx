'use client';

import { useEffect } from 'react';
import { reportWebVitals, observePerformance, monitorResources } from '@/lib/performance/web-vitals';

export function PerformanceMonitor() {
  useEffect(() => {
    // Report web vitals
    reportWebVitals();

    // Observe performance
    observePerformance();

    // Monitor resources
    monitorResources();

    // Log performance metrics
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
          'DNS Lookup': `${(perfData.domainLookupEnd - perfData.domainLookupStart).toFixed(2)}ms`,
          'TCP Connection': `${(perfData.connectEnd - perfData.connectStart).toFixed(2)}ms`,
          'Request Time': `${(perfData.responseStart - perfData.requestStart).toFixed(2)}ms`,
          'Response Time': `${(perfData.responseEnd - perfData.responseStart).toFixed(2)}ms`,
          'DOM Processing': `${(perfData.domComplete - perfData.domLoading).toFixed(2)}ms`,
          'Load Complete': `${(perfData.loadEventEnd - perfData.fetchStart).toFixed(2)}ms`,
        });
      });
    }
  }, []);

  return null;
}
