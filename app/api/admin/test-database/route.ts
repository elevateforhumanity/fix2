import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/auth';

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Test courses
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('id, title, status')
      .limit(100);
    
    // Test programs
    const { data: programs, error: programsError } = await supabase
      .from('programs')
      .select('id, title, status')
      .limit(100);
    
    // Test modules
    const { data: modules, error: modulesError } = await supabase
      .from('modules')
      .select('id, title')
      .limit(100);
    
    // Test lessons
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('id, title')
      .limit(100);

    return NextResponse.json({
      courses: {
        count: courses?.length || 0,
        error: coursesError?.message,
        sample: courses?.slice(0, 5),
      },
      programs: {
        count: programs?.length || 0,
        error: programsError?.message,
        sample: programs?.slice(0, 5),
      },
      modules: {
        count: modules?.length || 0,
        error: modulesError?.message,
      },
      lessons: {
        count: lessons?.length || 0,
        error: lessonsError?.message,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
