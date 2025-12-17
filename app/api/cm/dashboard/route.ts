// app/api/cm/dashboard/route.ts - Case Manager Dashboard API
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClients';
import { getAuthUser } from '@/lib/auth';
import { logger } from '@/lib/logger';

export async function GET(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Database not configured' },
      { status: 503 }
    );
  }

  try {
    // Get current user
    const user = await getAuthUser();
    if (!user || (user.role as string) !== 'case_manager') {
      return NextResponse.json(
        { error: 'Unauthorized - Case manager access required' },
        { status: 403 }
      );
    }

    const caseManagerId = user.id;

    // Get assigned learners
    const { data: assignments, error: assignmentsError } = await supabaseAdmin
      .from('case_manager_assignments')
      .select('learner_id')
      .eq('case_manager_id', caseManagerId)
      .eq('status', 'active');

    if (assignmentsError) throw assignmentsError;

    const learnerIds = assignments?.map((a) => a.learner_id) || [];

    // Calculate summary stats
    const summary = {
      assigned_learners: learnerIds.length,
      active_enrollments: 0,
      completions_last_30_days: 0,
    };

    if (learnerIds.length > 0) {
      // Get active enrollments count
      const { count: activeCount } = await supabaseAdmin
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .in('user_id', learnerIds)
        .eq('status', 'active');

      summary.active_enrollments = activeCount || 0;

      // Get completions in last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { count: completionsCount } = await supabaseAdmin
        .from('certificates')
        .select('*', { count: 'exact', head: true })
        .in('user_id', learnerIds)
        .gte('issued_at', thirtyDaysAgo.toISOString());

      summary.completions_last_30_days = completionsCount || 0;
    }

    // Get learner details with enrollments
    const learners = [];

    if (learnerIds.length > 0) {
      const { data: profiles } = await supabaseAdmin
        .from('profiles')
        .select('id, first_name, last_name, email')
        .in('id', learnerIds);

      for (const profile of profiles || []) {
        // Get primary enrollment (most recent active)
        const { data: enrollments } = await supabaseAdmin
          .from('enrollments')
          .select(
            `
            id,
            status,
            funding_type,
            started_at,
            programs (title)
          `
          )
          .eq('user_id', profile.id)
          .order('created_at', { ascending: false })
          .limit(1);

        const primaryEnrollment = enrollments?.[0];

        // Calculate progress (simplified - you can enhance this)
        const { data: progress } = await supabaseAdmin
          .from('progress')
          .select('completed')
          .eq('enrollment_id', primaryEnrollment?.id || '')
          .eq('completed', true);

        const percentComplete = progress
          ? Math.min(100, progress.length * 10)
          : 0;

        learners.push({
          learner_id: profile.id,
          first_name: profile.first_name,
          last_name: profile.last_name,
          primary_program:
            // @ts-expect-error TS2339: Property 'title' does not exist on type 'string'.
            // @ts-expect-error TS2352: Conversion of type '{ title: any; }[]' to type 'string' may be a mistake beca...
            (primaryEnrollment?.programs as string)?.title || null,
          status: primaryEnrollment?.status || 'inactive',
          percent_complete: percentComplete,
          last_activity: primaryEnrollment?.started_at || null,
          funding_type: primaryEnrollment?.funding_type || null,
        });
      }
    }

    return NextResponse.json({
      summary,
      learners,
    });
  } catch (err) {
    logger.error('Case manager dashboard error:', err);
    return NextResponse.json(
      { error: 'Failed to load dashboard' },
      { status: 500 }
    );
  }
}
