import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ courseId: string; lessonId: string }> }
) {
  try {
    const supabase = await createClient();
    const { lessonId } = await params;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { progress } = await request.json();

    const { error } = await supabase.from('video_progress').upsert({
      user_id: user.id,
      lesson_id: lessonId,
      progress_seconds: progress,
      last_watched: new Date().toISOString(),
    });

    if (error) {
      return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
