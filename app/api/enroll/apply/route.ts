import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const required = ['firstName', 'lastName', 'email', 'preferredProgramId'];
    const missing = required.filter((key) => !body[key]);

    if (missing.length) {
      return NextResponse.json(
        {
          message: `Missing required fields: ${missing.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get or create user profile
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let studentId = user?.id;

    // If no authenticated user, create a lead record
    if (!studentId) {
      // Store as partner inquiry for now (can be migrated to dedicated applications table)
      const { data: inquiry, error: inquiryError } = await supabase
        .from('partner_inquiries')
        .insert({
          name: `${body.firstName} ${body.lastName}`,
          email: body.email,
          phone: body.phone || null,
          message: `Application for program: ${body.preferredProgramId}`,
          inquiry_type: 'student_application',
          status: 'new',
        })
        .select()
        .single();

      if (inquiryError) {
        logger.error('[Enroll Apply] Failed to create inquiry:', inquiryError);
        throw inquiryError;
      }

      logger.info('[New Application - Lead Created]', {
        inquiryId: inquiry.id,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        preferredProgramId: body.preferredProgramId,
        submittedAt: new Date().toISOString(),
      });
    } else {
      // Authenticated user - check enrollment approval status
      const { data: profile } = await supabase
        .from('profiles')
        .select('enrollment_status, program_holder_id')
        .eq('id', studentId)
        .single();

      // Enrollment gate: must be approved or active
      if (
        !profile?.enrollment_status ||
        !['approved', 'active'].includes(profile.enrollment_status)
      ) {
        return NextResponse.json(
          {
            message:
              'You must be approved for enrollment before you can enroll. Please contact your program coordinator.',
          },
          { status: 403 }
        );
      }

      // Program holder must be assigned
      if (!profile.program_holder_id) {
        return NextResponse.json(
          {
            message: 'No program holder assigned. Please contact support.',
          },
          { status: 403 }
        );
      }

      // Create enrollment record with program holder assignment
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('program_enrollments')
        .insert({
          student_id: studentId,
          program_id: body.preferredProgramId,
          program_holder_id: profile.program_holder_id,
          funding_source: body.fundingSource || 'WIOA',
          status: 'INTAKE',
        })
        .select()
        .single();

      if (enrollmentError) {
        logger.error(
          '[Enroll Apply] Failed to create enrollment:',
          enrollmentError
        );
        throw enrollmentError;
      }

      logger.info('[New Application - Enrollment Created]', {
        enrollmentId: enrollment.id,
        studentId,
        programId: body.preferredProgramId,
        programHolderId: profile.program_holder_id,
        submittedAt: new Date().toISOString(),
      });
    }

    // TODO: Send confirmation email to applicant
    // TODO: Send notification email to admin team (elevate4humanityedu@gmail.com)

    return NextResponse.json(
      {
        message:
          'Application received. A member of the Elevate team will follow up within 24 hours.',
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    logger.error('[Enroll Apply] Error:', err);
    return NextResponse.json(
      {
        message:
          'Something went wrong submitting your application. Please try again or call (317) 314-3757.',
      },
      { status: 500 }
    );
  }
}
