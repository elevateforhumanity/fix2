import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log slow resource loading
    console.warn('[Slow Resources]', data);
    
    // Send to monitoring service for analysis
    if (process.env.SENTRY_DSN) {
      try {
        const Sentry = await import('@sentry/nextjs');
        Sentry.captureMessage('Slow Resource Loading', {
          level: 'warning',
          extra: data,
          tags: {
            resource_type: data.resourceType,
            duration: data.duration,
          },
        });
      } catch (sentryError) {
        console.error('Failed to send to Sentry:', sentryError);
      }
    }
    
    // Store in database for analytics
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/logs/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'slow_resource',
          data: data,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (logError) {
      console.error('Failed to log to database:', logError);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Slow Resources] Error:', error);
    return NextResponse.json({ error: 'Failed to log resources' }, { status: 500 });
  }
}
