/**
 * Sentry Error Tracking and Performance Monitoring
 */

import * as Sentry from '@sentry/nextjs';

/**
 * Initialize Sentry for error tracking
 */
export function initSentry() {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    console.warn('Sentry DSN not configured - error tracking disabled');
    return;
  }

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    
    // Sample rate for performance monitoring (10% of transactions)
    tracesSampleRate: 0.1,
    
    // Sample rate for error tracking (100% in production)
    sampleRate: process.env.NODE_ENV === 'production' ? 1.0 : 0.5,
    
    // Don't send errors in development
    enabled: process.env.NODE_ENV === 'production',
    
    // Ignore common errors
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
      'Network request failed',
    ],
    
    // Before sending, add custom context
    beforeSend(event, hint) {
      // Add user context if available
      const user = getUserFromStorage();
      if (user) {
        event.user = {
          id: user.id,
          email: user.email,
          username: user.name,
        };
      }
      
      return event;
    },
  });
}

/**
 * Capture an exception
 */
export function captureException(error: Error, context?: Record<string, any>) {
  if (context) {
    Sentry.setContext('custom', context);
  }
  Sentry.captureException(error);
}

/**
 * Capture a message
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  Sentry.captureMessage(message, level);
}

/**
 * Set user context
 */
export function setUser(user: { id: string; email: string; name: string }) {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.name,
  });
}

/**
 * Clear user context
 */
export function clearUser() {
  Sentry.setUser(null);
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(message: string, category: string, data?: Record<string, any>) {
  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: 'info',
  });
}

/**
 * Start a span for performance monitoring
 */
export function startSpan(name: string, op: string, callback: () => void) {
  return Sentry.startSpan({
    name,
    op,
  }, callback);
}

/**
 * Helper to get user from storage
 */
function getUserFromStorage() {
  try {
    const stored = localStorage.getItem('user-storage');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.state?.user;
    }
  } catch (error) {
    // Ignore
  }
  return null;
}

/**
 * Error boundary component
 */
export const SentryErrorBoundary = Sentry.ErrorBoundary;
