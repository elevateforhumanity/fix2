/**
 * Monitoring Stub (Sentry Removed)
 * Provides no-op functions for monitoring calls
 */

// Sentry has been removed - all functions are now no-ops
// If you want to re-enable monitoring, install @sentry/react and update this file

export function initializeSentry() {
  // No-op: Sentry removed
}

export function setSentryUser(user: {
  id: string;
  email?: string;
  username?: string;
  role?: string;
}) {
  // No-op: Sentry removed
}

export function clearSentryUser() {
  // No-op: Sentry removed
}

export function setSentryContext(key: string, context: Record<string, any>) {
  // No-op: Sentry removed
}

export function addSentryBreadcrumb(
  message: string,
  category: string,
  data?: Record<string, any>
) {
  // No-op: Sentry removed
}

export function captureError(error: Error, context?: Record<string, any>) {
  console.error('Error:', error, context);
}

export function captureMessage(
  message: string,
  level: 'info' | 'warning' | 'error' = 'info'
) {
  console.log(`[${level}]`, message);
}

export function startTransaction(name: string, op: string) {
  return null;
}

export function trackPageView(pageName: string, url: string) {
  // No-op: Sentry removed
}

export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  // No-op: Sentry removed
}

export function measurePerformance(
  name: string,
  fn: () => void | Promise<void>
) {
  return fn();
}

// Export stub Sentry object for compatibility
export const Sentry = {
  captureException: (error: Error) => console.error('Error:', error),
  captureMessage: (message: string) => console.log('Message:', message),
  setUser: () => {},
  setContext: () => {},
  addBreadcrumb: () => {},
};
