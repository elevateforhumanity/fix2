// instrumentation.ts
// Next.js 13+ App Router instrumentation hook for Sentry and OpenTelemetry
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // OpenTelemetry disabled temporarily due to package version conflicts
    // await import('./otel/otel-node');
    await import('./sentry.server.config');
  } else if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}
