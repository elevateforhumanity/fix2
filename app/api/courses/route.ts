import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/auth';

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();

    const { data: courses, error } = await supabase
      .from('courses')
      .select('*')
      .eq('moderation_status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ courses, total: courses?.length || 0 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data: newCourse, error } = await supabase
      .from('courses')
      .insert({
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/\s+/g, '-'),
        description: body.description,
        level: body.level,
        duration_weeks: body.duration_weeks || Math.ceil((body.duration_hours || 40) / 40),
        moderation_status: body.moderation_status || 'pending',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
