// app/api/enroll/route.ts
import { NextResponse } from 'next/server';
import { createServerSupabaseClient, getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { courseId } = await req.json().catch(() => ({}) as any);

    if (!courseId) {
      return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();

    // 1) Make sure course exists and is active
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('id, title, status')
      .eq('id', courseId)
      .single();

    if (courseError || !course || course.status !== 'published') {
      return NextResponse.json(
        { error: 'Course not found or not active' },
        { status: 404 }
      );
    }

    // 2) Check if enrollment already exists
    const { data: existingEnrollment, error: existingError } = await supabase
      .from('enrollments')
      .select('id, status')
      .eq('user_id', user.id)
      .eq('course_id', course.id)
      .maybeSingle();

    if (existingError) {
      console.error('Error checking enrollment:', existingError);
      return NextResponse.json(
        { error: 'Could not check existing enrollment' },
        { status: 500 }
      );
    }

    if (existingEnrollment) {
      // Already enrolled – just return it
      return NextResponse.json(
        {
          ok: true,
          status: existingEnrollment.status,
          message: 'Already enrolled in this course',
        },
        { status: 200 }
      );
    }

    // 3) Create new enrollment
    const { data: newEnrollment, error: enrollError } = await supabase
      .from('enrollments')
      .insert({
        user_id: user.id,
        course_id: course.id,
        status: 'active',
        progress: 0,
        enrolled_at: new Date().toISOString(),
      })
      .select('id, status')
      .single();

    if (enrollError || !newEnrollment) {
      console.error('Error creating enrollment:', enrollError);
      return NextResponse.json(
        { error: 'Could not create enrollment' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        status: newEnrollment.status,
        message: 'Enrollment created',
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Enroll route error:', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
