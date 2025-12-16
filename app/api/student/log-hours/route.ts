import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { enrollment_id, date, hours, services_performed, notes } = body;

    // Insert into student_hours table
    const { data, error } = await supabase
      .from('student_hours')
      .insert({
        student_id: user.id,
        enrollment_id,
        date,
        hours,
        activity_type: 'practical_work',
        notes: notes || null,
        approved: false,
      })
      .select()
      .single();

    if (error) {
      // Error: $1
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Also log to apprentice_hours_log if it exists
    try {
      await supabase.from('apprentice_hours_log').insert({
        apprenticeship_id: enrollment_id,
        log_date: date,
        ojl_hours: hours,
        services_performed,
        notes,
      });
    } catch (e) {
      // Table might not exist yet, that's okay
      logger.info('apprentice_hours_log not available:', e);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    // Error: $1
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
