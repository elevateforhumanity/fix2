import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log performance alert
    console.warn('[Performance Alert]', data);
    
    // TODO: Send to monitoring service (Sentry, DataDog, etc.)
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Performance Alert] Error:', error);
    return NextResponse.json({ error: 'Failed to log alert' }, { status: 500 });
  }
}
