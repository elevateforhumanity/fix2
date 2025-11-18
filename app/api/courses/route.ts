import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/auth';

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();

    const { data: courses, error } = await supabase
      .from('courses')
      .select('*')
      .eq('status', 'published')
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
        subtitle: body.subtitle,
        description: body.description,
        level: body.level,
        duration_hours: body.duration_hours,
        status: body.status || 'draft',
        is_free: body.is_free || true,
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
