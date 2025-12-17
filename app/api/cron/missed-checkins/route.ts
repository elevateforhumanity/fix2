import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

// Using nodejs runtime for better compatibility with Supabase
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();
    const today = new Date().toISOString().split('T')[0];

    // Get all active apprenticeships
    const { data: apprenticeships, error } = await supabase
      .from('apprenticeship_enrollments')
      .select(
        `
        id,
        student_id,
        employer_id,
        program_id,
        student:profiles!apprenticeship_enrollments_student_id_fkey(
          id,
          email,
          full_name
        ),
        employer:profiles!apprenticeship_enrollments_employer_id_fkey(
          id,
          email,
          full_name
        ),
        program:programs(
          id,
          name
        )
      `
      )
      .eq('status', 'active');

    if (error) throw error;

    const results = [];

    for (const apprenticeship of apprenticeships || []) {
      // Check if student has checked in today
      const { data: todayLog, error: logError } = await supabase
        .from('ojt_hours_log')
        .select('id, check_in_time')
        .eq('apprenticeship_id', apprenticeship.id)
        .eq('work_date', today)
        .maybeSingle();

      if (logError) {
        logger.error('Error checking logs:', logError);
        continue;
      }

      // If no check-in found, send alert to employer
      // @ts-expect-error TS2339: Property 'email' does not exist on type '{ id: any; email: any; full_name: an...
      if (!todayLog && apprenticeship.employer?.email) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/apprentice/email-alerts`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'missed_checkin',
              apprenticeshipId: apprenticeship.id,
              data: {
                // @ts-expect-error TS2339: Property 'full_name' does not exist on type '{ id: any; email: any; full_name...
                studentName: apprenticeship.student?.full_name,
                // @ts-expect-error TS2339: Property 'email' does not exist on type '{ id: any; email: any; full_name: an...
                employerEmail: apprenticeship.employer.email,
                // @ts-expect-error TS2339: Property 'full_name' does not exist on type '{ id: any; email: any; full_name...
                employerName: apprenticeship.employer.full_name,
                // @ts-expect-error TS2339: Property 'name' does not exist on type '{ id: any; name: any; }[]'.
                programName: apprenticeship.program?.name,
                date: today,
              },
            }),
          }
        );

        results.push({
          // @ts-expect-error TS2339: Property 'full_name' does not exist on type '{ id: any; email: any; full_name...
          student: apprenticeship.student?.full_name,
          // @ts-expect-error TS2339: Property 'full_name' does not exist on type '{ id: any; email: any; full_name...
          employer: apprenticeship.employer.full_name,
          status: response.ok ? 'alert_sent' : 'failed',
        });
      }
    }

    return NextResponse.json({
      success: true,
      alerts_sent: results.length,
      results,
    });
  } catch (error) {
    logger.error('Missed check-ins cron error:', error);
    return NextResponse.json(
      { error: 'Failed to check missed check-ins' },
      { status: 500 }
    );
  }
}
