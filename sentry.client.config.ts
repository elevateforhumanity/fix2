import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0, // 10% in production, 100% in dev

  // Session Replay
  replaysSessionSampleRate: 0.1, // 10% of sessions
  replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

  // Environment
  environment: process.env.NODE_ENV || 'development',

  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',

  // Integrations
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: [
        'localhost',
        /^https:\/\/.*\.elevateforhumanity\.org/,
        /^https:\/\/.*\.vercel\.app/,
      ],
    }),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Ignore common errors
  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    // Random plugins/extensions
    'originalCreateNotification',
    'canvas.contentDocument',
    'MyApp_RemoveAllHighlights',
    // Facebook
    'fb_xd_fragment',
    // Network errors
    'NetworkError',
    'Network request failed',
  ],

  // Before send hook
  beforeSend(event, hint) {
    // Filter out development errors
    if (process.env.NODE_ENV === 'development') {
      console.log('Sentry Event:', event);
      return null; // Don't send in development
    }
    return event;
  },
});
