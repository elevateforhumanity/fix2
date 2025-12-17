import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Mark course as completed
 * POST /api/lms/progress/complete
 * Accepts both JSON and FormData
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Handle both JSON and FormData
    let courseId: string;
    let evidenceUrl: string | null = null;

    const contentType = req.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const body = await req.json();
      courseId = body.courseId;
      evidenceUrl = body.evidenceUrl || null;
    } else {
      const formData = await req.formData();
      courseId = String(formData.get('courseId') || '');
      evidenceUrl = String(formData.get('evidenceUrl') || '') || null;
    }

    if (!courseId) {
      return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
    }

    // Get course details
    const { data: course } = await supabase
      .from('courses')
      .select('slug')
      .eq('id', courseId)
      .single();

    // Update progress to completed
    const { error } = await supabase.from('lms_progress').upsert(
      {
        user_id: user.id,
        course_id: courseId,
        course_slug: course?.slug,
        status: 'completed',
        completed_at: new Date().toISOString(),
        progress_percent: 100,
        evidence_url: evidenceUrl,
        last_activity_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id,course_id',
      }
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Redirect if form submission, JSON response if API call
    if (
      contentType?.includes('application/x-www-form-urlencoded') ||
      contentType?.includes('multipart/form-data')
    ) {
      return NextResponse.redirect(
        new URL(`/lms/courses/${courseId}`, req.url)
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error completing course:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to complete course' },
      { status: 500 }
    );
  }
}
