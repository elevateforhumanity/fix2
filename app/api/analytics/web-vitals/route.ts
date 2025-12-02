import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const vitals = await request.json();
    const supabase = await createClient();

    // Store web vitals in database for analysis
    const { error } = await supabase.from('web_vitals').insert({
      name: vitals.name,
      value: vitals.value,
      rating: vitals.rating,
      delta: vitals.delta,
      metric_id: vitals.id,
      navigation_type: vitals.navigationType,
      user_agent: request.headers.get('user-agent'),
      url: request.headers.get('referer'),
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Error storing web vitals:', error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Web vitals API error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
