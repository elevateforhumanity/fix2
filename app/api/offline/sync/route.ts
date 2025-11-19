import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { pendingActions } = await req.json();

    // Process pending actions from offline queue
    if (pendingActions && Array.isArray(pendingActions)) {
      for (const action of pendingActions) {
        // Handle different action types
        switch (action.type) {
          case 'progress_update':
            await supabase
              .from('enrollments')
              .update({ progress: action.progress })
              .eq('id', action.enrollmentId);
            break;

          case 'lesson_complete':
            await supabase.from('lesson_completions').insert({
              user_id: user.id,
              lesson_id: action.lessonId,
              completed_at: action.timestamp,
            });
            break;

          case 'quiz_submission':
            await supabase.from('quiz_submissions').insert({
              user_id: user.id,
              quiz_id: action.quizId,
              answers: action.answers,
              submitted_at: action.timestamp,
            });
            break;

          default:
            console.warn(`Unknown action type: ${action.type}`);
        }
      }
    }

    return NextResponse.json({
      ok: true,
      synced: pendingActions?.length || 0,
    });
  } catch (error: any) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: error.message || 'Sync failed' },
      { status: 500 }
    );
  }
}
