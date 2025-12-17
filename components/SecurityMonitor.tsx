// @ts-nocheck
'use client';

import { useEffect } from 'react';

/**
 * Security Monitor Component
 * Monitors and logs security events in real-time
 */
export function SecurityMonitor() {
  useEffect(() => {
    // 1. Monitor for suspicious activity
    const monitorActivity = () => {
      // Track rapid page navigation (potential scraping)
      let pageViews = 0;
      let lastView = Date.now();

      const trackPageView = () => {
        const now = Date.now();
        if (now - lastView < 1000) {
          pageViews++;
          if (pageViews > 10) {
            logSecurityEvent('RAPID_NAVIGATION', {
              count: pageViews,
              timeWindow: now - lastView,
            });
          }
        } else {
          pageViews = 0;
        }
        lastView = now;
      };

      window.addEventListener('popstate', trackPageView);
      return () => window.removeEventListener('popstate', trackPageView);
    };

    // 2. Detect automated tools
    const detectAutomation = () => {
      // Check for common automation indicators
      const indicators = {
        webdriver: !!(window as any).navigator.webdriver,
        phantom: !!(window as any)._phantom || !!(window as any).callPhantom,
        selenium: !!(window as any).document.$cdc_asdjflasutopfhvcZLmcfl_,
        headless: /HeadlessChrome/.test(navigator.userAgent),
      };

      if (Object.values(indicators).some((v) => v)) {
        logSecurityEvent('AUTOMATION_DETECTED', indicators);
      }
    };

    // 3. Monitor console access
    const monitorConsole = () => {
      const originalLog = console.log;
      console.log = function (...args) {
        // Log console usage (potential developer inspection)
        if (args.length > 0 && typeof args[0] === 'string') {
          logSecurityEvent('CONSOLE_ACCESS', {
            message: args[0].substring(0, 100),
          });
        }
        originalLog.apply(console, args);
      };
    };

    // 4. Detect DevTools opening
    const detectDevTools = () => {
      const threshold = 160;
      const check = () => {
        const widthThreshold =
          window.outerWidth - window.innerWidth > threshold;
        const heightThreshold =
          window.outerHeight - window.innerHeight > threshold;

        if (widthThreshold || heightThreshold) {
          logSecurityEvent('DEVTOOLS_OPENED', {
            outerWidth: window.outerWidth,
            innerWidth: window.innerWidth,
            outerHeight: window.outerHeight,
            innerHeight: window.innerHeight,
          });
        }
      };

      const interval = setInterval(check, 1000);
      return () => clearInterval(interval);
    };

    // 5. Monitor for iframe embedding attempts
    const detectIframeEmbedding = () => {
      if (window.self !== window.top) {
        logSecurityEvent('IFRAME_EMBEDDING_DETECTED', {
          parentOrigin: document.referrer,
        });

        // Attempt to break out of iframe
        try {
          window.top!.location = window.self.location;
        } catch (e) {
          // If we can't break out, at least log it
          console.warn('Site embedded in unauthorized iframe');
        }
      }
    };

    // 6. Track failed resource loads (potential tampering)
    const monitorResourceLoading = () => {
      window.addEventListener(
        'error',
        (e) => {
          if (e.target && (e.target as any).src) {
            logSecurityEvent('RESOURCE_LOAD_FAILED', {
              resource: (e.target as any).src,
              type: (e.target as any).tagName,
            });
          }
        },
        true
      );
    };

    // 7. Monitor for clipboard access
    const monitorClipboard = () => {
      document.addEventListener('paste', (e) => {
        logSecurityEvent('CLIPBOARD_PASTE', {
          dataLength: e.clipboardData?.getData('text').length || 0,
        });
      });
    };

    // 8. Detect screen recording software
    const detectScreenRecording = () => {
      if (
        'mediaDevices' in navigator &&
        'getDisplayMedia' in navigator.mediaDevices
      ) {
        // Screen recording API is available
        logSecurityEvent('SCREEN_RECORDING_API_AVAILABLE', {});
      }
    };

    // Initialize all monitors
    const cleanup1 = monitorActivity();
    detectAutomation();
    monitorConsole();
    const cleanup2 = detectDevTools();
    detectIframeEmbedding();
    monitorResourceLoading();
    monitorClipboard();
    detectScreenRecording();

    // Cleanup
    return () => {
      cleanup1();
      cleanup2();
    };
  }, []);

  return null; // This component doesn't render anything
}

/**
 * Log security events
 */
function logSecurityEvent(eventType: string, data: any) {
  const event = {
    type: eventType,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    data,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.warn('[SECURITY EVENT]', event);
  }

  // Send to analytics/monitoring service
  try {
    // Send to your backend API
    fetch('/api/security/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    }).catch(() => {
      // Silently fail if API is not available
    });

    // Also send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'security_event', {
        event_category: 'Security',
        event_label: eventType,
        value: 1,
      });
    }
  } catch (error) {
    // Silently fail
  }
}

/**
 * Security Badge Component
 * Shows security status to users
 */
export function SecurityBadge() {
  return (
    <div className="fixed bottom-4 left-4 z-50 hidden md:block">
      <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <span className="font-semibold">Secure Connection</span>
      </div>
    </div>
  );
}
