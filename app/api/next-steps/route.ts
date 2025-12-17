import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

function computeProgress(row: any) {
  const checks = [
    !!row.inquiry_submitted,
    !!row.icc_account_created,
    !!row.workone_appointment_scheduled,
    !!row.told_advisor_efh,
    !!row.advisor_docs_uploaded,
    row.funding_status === 'approved' || row.funding_status === 'denied',
    !!row.efh_onboarding_call_completed,
    !!row.program_start_confirmed,
  ];
  const done = checks.filter(Boolean).length;
  return {
    done,
    total: checks.length,
    percent: Math.round((done / checks.length) * 100),
  };
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const adminClient = createAdminClient();

  const { data: profile } = await adminClient
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .maybeSingle();

  const { data, error } = await adminClient
    .from('student_next_steps')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  // Create default row if missing (one-shot UX)
  if (!data) {
    const { data: created, error: createErr } = await adminClient
      .from('student_next_steps')
      .insert({
        user_id: user.id,
        organization_id: profile?.organization_id ?? null,
      })
      .select('*')
      .single();

    if (createErr)
      return NextResponse.json({ error: createErr.message }, { status: 500 });

    return NextResponse.json({
      ...created,
      progress: computeProgress(created),
    });
  }

  return NextResponse.json({ ...data, progress: computeProgress(data) });
}

export async function PATCH(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const adminClient = createAdminClient();
  const body = await req.json();

  // Server-side allowlist (prevents random fields)
  const allowed: Record<string, boolean> = {
    inquiry_submitted: true,
    inquiry_submitted_at: true,

    icc_account_created: true,
    icc_username: true,

    workone_appointment_scheduled: true,
    workone_appointment_date: true,
    workone_appointment_time: true,
    workone_location: true,

    told_advisor_efh: true,

    advisor_docs_uploaded: true,
    advisor_docs_note: true,

    funding_status: true,
    funding_type: true,

    efh_onboarding_call_completed: true,
    efh_onboarding_call_date: true,

    program_start_confirmed: true,
    program_start_date: true,
  };

  const update: Record<string, any> = {};
  for (const [k, v] of Object.entries(body || {})) {
    if (allowed[k]) update[k] = v;
  }

  const { data, error } = await adminClient
    .from('student_next_steps')
    .update(update)
    .eq('user_id', user.id)
    .select('*')
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ...data, progress: computeProgress(data) });
}
