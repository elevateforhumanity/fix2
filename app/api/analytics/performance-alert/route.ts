import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log performance alert
    console.warn('[Performance Alert]', data);
    
    // Send to monitoring service if configured
    if (process.env.SENTRY_DSN) {
      try {
        // Sentry integration
        const Sentry = await import('@sentry/nextjs');
        Sentry.captureMessage('Performance Alert', {
          level: 'warning',
          extra: data,
        });
      } catch (sentryError) {
        console.error('Failed to send to Sentry:', sentryError);
      }
    }
    
    // Log to database for internal tracking
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/logs/performance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'performance_alert',
          data: data,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (logError) {
      console.error('Failed to log to database:', logError);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Performance Alert] Error:', error);
    return NextResponse.json({ error: 'Failed to log alert' }, { status: 500 });
  }
}
