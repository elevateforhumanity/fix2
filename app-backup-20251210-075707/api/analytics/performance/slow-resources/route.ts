import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    // Store slow resource data for analysis
    const { error } = await supabase.from('slow_resources').insert({
      name: data.name,
      duration: data.duration,
      size: data.size,
      type: data.type,
      user_agent: request.headers.get('user-agent'),
      url: request.headers.get('referer'),
      created_at: new Date().toISOString(),
    });

    if (error) {
      logger.error('Error storing slow resource data:', error);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    logger.error('Slow resources API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
