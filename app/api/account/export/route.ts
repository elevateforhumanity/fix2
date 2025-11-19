// app/api/account/export/route.ts
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/getSession';
import { createSupabaseClient } from '@/lib/supabase-api';

export async function GET() {
  const session = await requireAuth();
  const email = session.user?.email;

  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseClient();
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (userError || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Fetch enrollments
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, course:courses(title)')
    .eq('user_id', user.id);

  // Fetch exam attempts
  const { data: examAttempts } = await supabase
    .from('exam_attempts')
    .select('*, exam:exams(title)')
    .eq('student_id', user.id);

  const exportData = {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
    },
    enrollments: (enrollments || []).map((e: any) => ({
      courseTitle: e.course?.title,
      status: e.status,
      startDate: e.start_date,
      completedAt: e.completed_at,
    })),
    examAttempts: (examAttempts || []).map((a: any) => ({
      examTitle: a.exam?.title,
      status: a.status,
      score: a.score,
      startedAt: a.started_at,
      completedAt: a.completed_at,
    })),
  };

  // Log export event for audit trail
  await supabase.from('account_export_events').insert({
    user_id: user.id,
    email: user.email,
    format: 'json',
  });

  const body = JSON.stringify(exportData, null, 2);

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="efh-account-export.json"',
    },
  });
}
