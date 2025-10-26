/**
 * Sentry Real User Monitoring (RUM) Configuration
 * Tracks performance, errors, and user interactions
 */

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

// Environment configuration
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
const ENVIRONMENT =
  import.meta.env.VITE_ENVIRONMENT || import.meta.env.MODE || 'development';
const RELEASE = import.meta.env.VITE_APP_VERSION || '2.0.0';

// Only initialize Sentry in production or if DSN is explicitly set
const shouldInitialize =
  SENTRY_DSN &&
  (ENVIRONMENT === 'production' ||
    import.meta.env.VITE_SENTRY_ENABLED === 'true');

/**
 * Initialize Sentry with Real User Monitoring
 */
export function initializeSentry() {
  if (!shouldInitialize) {
    console.log(
      '[Sentry] Skipping initialization (no DSN or not in production)'
    );
    return;
  }

  try {
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: ENVIRONMENT,
      release: RELEASE,

      // Performance Monitoring
      integrations: [
        new BrowserTracing({
          // Track all route changes
          routingInstrumentation: Sentry.reactRouterV6Instrumentation(
            // @ts-ignore - React Router hooks
            React.useEffect,
            // @ts-ignore
            useLocation,
            // @ts-ignore
            useNavigationType,
            // @ts-ignore
            createRoutesFromChildren,
            // @ts-ignore
            matchRoutes
          ),
          // Track fetch/XHR requests
          traceFetch: true,
          traceXHR: true,
        }),
      ],

      // Performance Monitoring - Sample rate
      // 1.0 = 100% of transactions, 0.1 = 10%
      tracesSampleRate: ENVIRONMENT === 'production' ? 0.2 : 1.0,

      // Session Replay - Sample rate
      // Captures user sessions for debugging
      replaysSessionSampleRate: ENVIRONMENT === 'production' ? 0.1 : 0,
      replaysOnErrorSampleRate: 1.0, // Always capture on error

      // Error filtering
      beforeSend(event, hint) {
        // Filter out development errors
        if (ENVIRONMENT === 'development') {
          console.log('[Sentry] Would send error:', event);
          return null; // Don't send in development
        }

        // Filter out known non-critical errors
        const error = hint.originalException;
        if (error && typeof error === 'object' && 'message' in error) {
          const message = String(error.message);

          // Ignore network errors that are expected
          if (
            message.includes('Failed to fetch') ||
            message.includes('NetworkError')
          ) {
            return null;
          }

          // Ignore ResizeObserver errors (browser quirk)
          if (message.includes('ResizeObserver')) {
            return null;
          }
        }

        return event;
      },

      // Breadcrumbs - Track user actions
      beforeBreadcrumb(breadcrumb) {
        // Filter out noisy breadcrumbs
        if (breadcrumb.category === 'console' && breadcrumb.level === 'log') {
          return null;
        }
        return breadcrumb;
      },

      // Ignore specific URLs
      ignoreErrors: [
        // Browser extensions
        'top.GLOBALS',
        'chrome-extension://',
        'moz-extension://',
        // Random plugins/extensions
        "Can't find variable: ZiteReader",
        'jigsaw is not defined',
        'ComboSearch is not defined',
        // Facebook errors
        'fb_xd_fragment',
        // Network errors
        'NetworkError',
        'Failed to fetch',
      ],

      // Deny URLs - Don't track errors from these sources
      denyUrls: [
        /extensions\//i,
        /^chrome:\/\//i,
        /^chrome-extension:\/\//i,
        /^moz-extension:\/\//i,
      ],
    });

    console.log('[Sentry] Initialized successfully');
  } catch (error) {
    console.error('[Sentry] Failed to initialize:', error);
  }
}

/**
 * Set user context for Sentry
 */
export function setSentryUser(user: {
  id: string;
  email?: string;
  username?: string;
  role?: string;
}) {
  if (!shouldInitialize) return;

  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  });
}

/**
 * Clear user context (on logout)
 */
export function clearSentryUser() {
  if (!shouldInitialize) return;
  Sentry.setUser(null);
}

/**
 * Add custom context to Sentry
 */
export function setSentryContext(key: string, context: Record<string, any>) {
  if (!shouldInitialize) return;
  Sentry.setContext(key, context);
}

/**
 * Add breadcrumb for tracking user actions
 */
export function addSentryBreadcrumb(
  message: string,
  category: string,
  data?: Record<string, any>
) {
  if (!shouldInitialize) return;

  Sentry.addBreadcrumb({
    message,
    category,
    level: 'info',
    data,
    timestamp: Date.now() / 1000,
  });
}

/**
 * Capture custom error
 */
export function captureError(error: Error, context?: Record<string, any>) {
  if (!shouldInitialize) {
    console.error('[Sentry] Would capture error:', error, context);
    return;
  }

  if (context) {
    Sentry.withScope((scope) => {
      Object.entries(context).forEach(([key, value]) => {
        scope.setContext(key, value);
      });
      Sentry.captureException(error);
    });
  } else {
    Sentry.captureException(error);
  }
}

/**
 * Capture custom message
 */
export function captureMessage(
  message: string,
  level: 'info' | 'warning' | 'error' = 'info'
) {
  if (!shouldInitialize) {
    console.log('[Sentry] Would capture message:', message, level);
    return;
  }

  Sentry.captureMessage(message, level);
}

/**
 * Start a performance transaction
 */
export function startTransaction(name: string, op: string) {
  if (!shouldInitialize) return null;

  return Sentry.startTransaction({
    name,
    op,
  });
}

/**
 * Track page view
 */
export function trackPageView(pageName: string, url: string) {
  if (!shouldInitialize) return;

  addSentryBreadcrumb(`Viewed ${pageName}`, 'navigation', {
    url,
    pageName,
  });
}

/**
 * Track custom event
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  if (!shouldInitialize) return;

  addSentryBreadcrumb(eventName, 'user-action', properties);
}

/**
 * Measure performance
 */
export function measurePerformance(
  name: string,
  fn: () => void | Promise<void>
) {
  if (!shouldInitialize) {
    return fn();
  }

  const transaction = startTransaction(name, 'function');

  try {
    const result = fn();

    // Handle async functions
    if (result instanceof Promise) {
      return result.finally(() => {
        transaction?.finish();
      });
    }

    transaction?.finish();
    return result;
  } catch (error) {
    transaction?.finish();
    throw error;
  }
}

// Export Sentry for advanced usage
export { Sentry };
