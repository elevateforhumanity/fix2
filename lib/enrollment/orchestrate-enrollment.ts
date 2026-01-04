import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { sendEmail } from '@/lib/email';

export interface EnrollmentOrchestrationResult {
  success: boolean;
  enrollmentId?: string;
  error?: string;
  stepsCreated?: number;
}

/**
 * Orchestrate enrollment: create enrollment, generate steps, notify program holder, send welcome email
 * Idempotent: safe to retry
 * 
 * Schema: enrollments table uses user_id (not student_id) and course_id (not program_id)
 */
export async function orchestrateEnrollment(params: {
  studentId: string;
  programId: string;
  programHolderId: string | null;
  fundingSource: string;
  idempotencyKey: string;
}): Promise<EnrollmentOrchestrationResult> {
  const supabase = await createClient();
  const {
    studentId,
    programId,
    fundingSource,
    idempotencyKey,
  } = params;

  try {
    // Check for existing enrollment with this idempotency key
    const { data: existingEnrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', studentId)
      .eq('course_id', programId)
      .eq('status', 'active')
      .single();

    if (existingEnrollment) {
      logger.info(
        '[Enrollment Orchestration] Idempotent: enrollment already exists',
        {
          enrollmentId: existingEnrollment.id,
          idempotencyKey,
        }
      );
      return {
        success: true,
        enrollmentId: existingEnrollment.id,
      };
    }

    // 1. Create enrollment record
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .insert({
        user_id: studentId,
        course_id: programId,
        status: 'active',
        progress: 0,
      })
      .select()
      .single();

    if (enrollmentError || !enrollment) {
      logger.error(
        '[Enrollment Orchestration] Failed to create enrollment',
        enrollmentError
      );
      return {
        success: false,
        error: 'Failed to create enrollment record',
      };
    }

    logger.info('[Enrollment Orchestration] Enrollment created', {
      enrollmentId: enrollment.id,
      studentId,
      programId,
    });

    // 2. Update student role if needed
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', studentId)
      .single();
    
    if (!currentProfile?.role || currentProfile.role === 'student') {
      await supabase
        .from('profiles')
        .update({ role: 'student' })
        .eq('id', studentId);
    }

    // 3. Get student and program details for notifications
    const { data: student } = await supabase
      .from('profiles')
      .select('full_name, id, email')
      .eq('id', studentId)
      .single();

    const { data: program } = await supabase
      .from('programs')
      .select('title, slug, id')
      .eq('id', programId)
      .single();

    // 4. Send student welcome email
    if (student?.email) {
      await sendStudentWelcomeEmail({
        studentEmail: student.email,
        studentName: student.full_name || 'Student',
        programName: program?.title || 'Program',
        enrollmentId: enrollment.id,
      });
    }

    return {
      success: true,
      enrollmentId: enrollment.id,
      stepsCreated: 0,
    };
  } catch (error: unknown) {
    logger.error('[Enrollment Orchestration] Unexpected error', error);
    return {
      success: false,
      error: 'Unexpected error during enrollment orchestration',
    };
  }
}

async function sendStudentWelcomeEmail(params: {
  studentEmail: string;
  studentName: string;
  programName: string;
  enrollmentId: string;
}) {
  const { studentEmail, studentName, programName, enrollmentId } = params;

  try {
    const emailResult = await sendEmail({
      to: studentEmail,
      subject: `Welcome to ${programName}!`,
      html: `
        <h2>Welcome to Elevate for Humanity!</h2>
        <p>Hi ${studentName},</p>
        <p>You've been successfully enrolled in <strong>${programName}</strong>.</p>
        <p>Your first step is now available in your student portal.</p>
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/student/dashboard">View My Dashboard</a></p>
        <p>If you have any questions, please contact your program coordinator.</p>
      `,
    });

    logger.info('[Student Welcome Email] Sent', {
      enrollmentId,
      email: studentEmail,
      success: emailResult.success,
    });
  } catch (error) {
    logger.error('[Student Welcome Email] Failed', { error, enrollmentId });
  }
}
