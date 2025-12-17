import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createClient();

    // Log security event to database
    const { error } = await supabase.from('security_logs').insert({
      event_type: body.type,
      timestamp: body.timestamp,
      url: body.url,
      user_agent: body.userAgent,
      // @ts-expect-error TS2339: Property 'ip' does not exist on type 'NextRequest'.
      ip_address: request.ip || request.headers.get('x-forwarded-for'),
      data: body.data,
      severity: getSeverity(body.type),
    });

    if (error) {
      // Error: $1
    }

    // Send alerts for critical events
    if (isCriticalEvent(body.type)) {
      await sendSecurityAlert(body);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // Error: $1
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

function getSeverity(eventType: string): string {
  const criticalEvents = [
    'AUTOMATION_DETECTED',
    'IFRAME_EMBEDDING_DETECTED',
    'DEVTOOLS_OPENED',
  ];
  const highEvents = ['RAPID_NAVIGATION', 'CONSOLE_ACCESS'];

  if (criticalEvents.includes(eventType)) return 'critical';
  if (highEvents.includes(eventType)) return 'high';
  return 'medium';
}

function isCriticalEvent(eventType: string): boolean {
  return ['AUTOMATION_DETECTED', 'IFRAME_EMBEDDING_DETECTED'].includes(
    eventType
  );
}

async function sendSecurityAlert(event: any) {
  // Send email/SMS/Slack notification for critical events
  // Implementation depends on your notification service
  // @ts-expect-error TS2304: Cannot find name 'logger'.
  logger.warn('[CRITICAL SECURITY EVENT]', event);

  // Example: Send to admin email
  try {
    await fetch('/api/notifications/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'security_alert',
        subject: `Security Alert: ${event.type}`,
        message: `Critical security event detected:\n\nType: ${event.type}\nURL: ${event.url}\nTime: ${event.timestamp}\n\nData: ${JSON.stringify(event.data, null, 2)}`,
      }),
    });
  } catch (error) {
    // Error: $1
  }
}
