type Metric = { name: string; value: number; id?: string };

export async function startWebVitals(report?: (m: Metric) => void) {
  try {
    const mod = await import('web-vitals');
    const cb =
      report ??
      ((m: Metric) =>
    mod.onCLS(cb);
    // onFID is deprecated in web-vitals v4, use onINP instead
    mod.onLCP(cb);
    if (typeof mod.onINP === 'function') mod.onINP(cb);
    mod.onTTFB(cb);
  } catch (e) {
      'web-vitals not available or failed to load:',
      (e as Error)?.message ?? e
    );
  }
}

// Sentry (optional; enable when DSN is present)
const dsn = import.meta.env.VITE_SENTRY_DSN;
if (dsn) {
  import('@sentry/browser' as any)
    .then((Sentry: any) => {
      Sentry.init({
        dsn,
        tracesSampleRate: 0.1,
        environment: import.meta.env.MODE,
      });
    })
    .catch(() => {});
}
