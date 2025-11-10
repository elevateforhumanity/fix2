/**
 * Monitoring Stub (Sentry Removed)
 * Provides no-op functions for monitoring calls
 */

// Sentry has been removed - all functions are now no-ops
// If you want to re-enable monitoring, install @sentry/react and update this file

export function initializeSentry() {
  // No-op: Sentry removed
}

export function setSentryUser(_user: {
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

export function setSentryContext(_key: string, _context: Record<string, any>) {
  // No-op: Sentry removed
}

export function addSentryBreadcrumb(
  _message: string,
  _category: string,
  _data?: Record<string, any>
) {
  // No-op: Sentry removed
}

export function captureError(error: Error, context?: Record<string, any>) {
}

export function captureMessage(
  message: string,
  level: 'info' | 'warning' | 'error' = 'info'
) {
}

export function startTransaction(_name: string, _op: string) {
  return null;
}

export function trackPageView(_pageName: string, _url: string) {
  // No-op: Sentry removed
}

export function trackEvent(
  _eventName: string,
  _properties?: Record<string, any>
) {
  // No-op: Sentry removed
}

export function measurePerformance(
  _name: string,
  fn: () => void | Promise<void>
) {
  return fn();
}

// Export stub Sentry object for compatibility
export const Sentry = {
  setUser: () => {},
  setContext: () => {},
  addBreadcrumb: () => {},
};
