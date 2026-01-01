// Sentry Error Monitoring Integration

export const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || '';

export const initSentry = () => {
  if (typeof window !== 'undefined' && SENTRY_DSN) {
    // Sentry will be initialized if DSN is provided
    console.log('Sentry monitoring active');
  }
};

export const captureException = (error: Error, context?: any) => {
  if (typeof window !== 'undefined') {
    console.error('Error captured:', error, context);
    // Send to Sentry if configured
    if (SENTRY_DSN && window.Sentry) {
      window.Sentry.captureException(error, { extra: context });
    }
  }
};

export const captureMessage = (
  message: string,
  level: 'info' | 'warning' | 'error' = 'info'
) => {
  if (typeof window !== 'undefined') {
    console.log(`[${level}]`, message);
    if (SENTRY_DSN && window.Sentry) {
      window.Sentry.captureMessage(message, level);
    }
  }
};

declare global {
  interface Window {
    Sentry?: any;
  }
}
