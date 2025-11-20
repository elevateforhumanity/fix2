// instrumentation.ts
// Next.js 13+ App Router instrumentation hook for Sentry and OpenTelemetry
// DISABLED: Causing 500 errors due to OpenTelemetry package conflicts
export async function register() {
  // Instrumentation temporarily disabled to fix production errors
  // Re-enable after resolving OpenTelemetry dependency issues
  
  // if (process.env.NEXT_RUNTIME === 'nodejs') {
  //   await import('./sentry.server.config');
  // } else if (process.env.NEXT_RUNTIME === 'edge') {
  //   await import('./sentry.edge.config');
  // }
}
