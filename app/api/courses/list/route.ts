import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const category = searchParams.get('category');

    // Build query
    let query = supabase
      .from('courses')
      .select(`
        id,
        slug,
        title,
        description,
        category,
        level,
        duration,
        thumbnail_url,
        funding_programs,
        status,
        total_students,
        total_lessons,
        rating,
        created_at,
        updated_at
      `)
      .order('created_at', { ascending: false });

    // Filter by status
    if (status !== 'all') {
      query = query.eq('status', status);
    }

    // Filter by category
    if (category) {
      query = query.eq('category', category);
    }

    const { data: courses, error } = await query;

    if (error) {
      console.error('Courses fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ courses });

  } catch (error: any) {
    console.error('Courses list error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
