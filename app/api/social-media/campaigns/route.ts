import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: Request) {
  try {
    const supabase = await createClient();
    
    const { data: campaigns, error } = await supabase
      .from('social_media_campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, campaigns });
  } catch (error: any) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    const { data: campaign, error } = await supabase
      .from('social_media_campaigns')
      .insert({
        name: body.name,
        content_source: body.contentSource,
        platforms: body.platforms,
        frequency: body.frequency,
        posting_times: body.times,
        program: body.program,
        duration_days: parseInt(body.duration),
        posts: body.posts,
        status: body.status || 'draft',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, campaign });
  } catch (error: any) {
    console.error('Error creating campaign:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
