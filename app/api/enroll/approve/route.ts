import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

interface ApproveEnrollmentRequest {
  enrollment_id: string;
}

/**
 * SINGLE APPROVAL ENDPOINT
 * 
 * This is the authoritative trigger point for enrollment activation.
 * 
 * Flow:
 * 1. Verify caller is program holder or admin
 * 2. Flip enrollments.status: pending -> active
 * 3. Flip profiles.enrollment_status: pending -> active
 * 4. Call generate_enrollment_steps RPC
 * 5. Return proof of orchestration
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user is program holder or admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, program_holder_id')
      .eq('id', user.id)
      .single();

    const isAuthorized =
      profile?.role === 'admin' ||
      profile?.role === 'super_admin' ||
      profile?.role === 'program_holder';

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Forbidden - Admin or program holder access required' },
        { status: 403 }
      );
    }

    // Parse request
    const body: ApproveEnrollmentRequest = await req.json();
    const { enrollment_id } = body;

    if (!enrollment_id) {
      return NextResponse.json(
        { error: 'Missing required field: enrollment_id' },
        { status: 400 }
      );
    }

    logger.info('Starting enrollment approval', {
      enrollment_id,
      approver_id: user.id,
      approver_role: profile?.role,
    });

    // Get enrollment details
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .select('id, student_id, program_id, status')
      .eq('id', enrollment_id)
      .single();

    if (enrollmentError || !enrollment) {
      logger.error('Enrollment not found', { enrollment_id, enrollmentError });
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    if (enrollment.status !== 'pending') {
      return NextResponse.json(
        {
          error: `Enrollment status is ${enrollment.status}, expected pending`,
        },
        { status: 400 }
      );
    }

    // STEP 1: Activate enrollment
    const { error: updateEnrollmentError } = await supabase
      .from('enrollments')
      .update({
        status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('id', enrollment_id);

    if (updateEnrollmentError) {
      logger.error('Failed to activate enrollment', updateEnrollmentError);
      return NextResponse.json(
        { error: 'Failed to activate enrollment' },
        { status: 500 }
      );
    }

    logger.info('Enrollment activated', { enrollment_id });

    // STEP 2: Activate profile enrollment_status
    const { error: updateProfileError } = await supabase
      .from('profiles')
      .update({
        enrollment_status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('id', enrollment.student_id);

    if (updateProfileError) {
      logger.error('Failed to activate profile enrollment_status', updateProfileError);
      // Continue - enrollment is already active
    } else {
      logger.info('Profile enrollment_status activated', {
        student_id: enrollment.student_id,
      });
    }

    // STEP 3: Generate enrollment steps via RPC
    const { data: stepsResult, error: stepsError } = await supabase.rpc(
      'generate_enrollment_steps',
      { p_enrollment_id: enrollment_id }
    );

    if (stepsError) {
      logger.error('Failed to generate enrollment steps', {
        enrollment_id,
        error: stepsError,
      });
      // Continue - enrollment is active, steps can be generated manually
    } else {
      logger.info('Enrollment steps generated', {
        enrollment_id,
        steps_created: stepsResult,
      });
    }

    // STEP 4: Log approval action
    await supabase.from('audit_logs').insert({
      user_id: user.id,
      action: 'enrollment_approved',
      resource_type: 'enrollment',
      resource_id: enrollment_id,
      metadata: {
        student_id: enrollment.student_id,
        program_id: enrollment.program_id,
        steps_generated: stepsResult || 0,
      },
    });

    // Return proof
    return NextResponse.json({
      success: true,
      enrollmentId: enrollment_id,
      enrollment: {
        id: enrollment_id,
        status: 'active',
        student_id: enrollment.student_id,
        program_id: enrollment.program_id,
      },
      stepsGeneratedCount: stepsResult || 0,
      message: 'Enrollment approved and activated successfully',
    });
  } catch (error: any) {
    logger.error('Enrollment approval error', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
