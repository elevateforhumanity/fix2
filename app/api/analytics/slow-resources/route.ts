import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log slow resource loading
    console.warn('[Slow Resources]', data);
    
    // TODO: Send to monitoring service for analysis
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Slow Resources] Error:', error);
    return NextResponse.json({ error: 'Failed to log resources' }, { status: 500 });
  }
}
