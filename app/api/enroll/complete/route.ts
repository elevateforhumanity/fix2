import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

interface CompleteEnrollmentRequest {
  sessionId: string;
  applicationId: string;
  programSlug: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  amountPaid?: number;
}

export async function POST(req: Request) {
  try {
    const body: CompleteEnrollmentRequest = await req.json();
    const {
      sessionId,
      applicationId,
      programSlug,
      firstName,
      lastName,
      email,
      phone,
      amountPaid,
    } = body;

    const supabase = await createClient();
    const emailLower = email.toLowerCase();

    logger.info('Starting enrollment completion', {
      sessionId,
      applicationId,
      email: emailLower,
    });

    // Step 1: Get program details
    const { data: program, error: programError } = await supabase
      .from('programs')
      .select('id, name, slug')
      .eq('slug', programSlug)
      .single();

    if (programError || !program) {
      throw new Error(`Program not found: ${programSlug}`);
    }

    // Step 2: Check if user already exists
    let userId: string;
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', emailLower)
      .single();

    if (existingUser) {
      userId = existingUser.id;
      logger.info('User already exists', { userId, email: emailLower });
    } else {
      // Step 3: Create auth user with temporary password
      const tempPassword = Math.random().toString(36).slice(-12) + 'Aa1!';
      const { data: authData, error: authError } =
        await supabase.auth.admin.createUser({
          email: emailLower,
          password: tempPassword,
          email_confirm: true,
          user_metadata: {
            full_name: `${firstName} ${lastName}`,
            first_name: firstName,
            last_name: lastName,
          },
        });

      if (authError || !authData.user) {
        logger.error('Auth user creation error', authError);
        throw new Error('Failed to create user account');
      }

      userId = authData.user.id;

      // Step 4: Create profile
      const { error: profileError } = await supabase.from('profiles').insert({
        id: userId,
        email: emailLower,
        full_name: `${firstName} ${lastName}`,
        first_name: firstName,
        last_name: lastName,
        phone: phone ?? null,
        role: 'student',
      });

      if (profileError) {
        logger.error('Profile creation error', profileError);
        throw profileError;
      }

      logger.info('Created new user', { userId, email: emailLower });

      // Step 5: Send password reset email so student can set their password
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        emailLower,
        {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
        }
      );

      if (resetError) {
        logger.warn('Password reset email failed', resetError);
      }
    }

    // Step 6: Check if already enrolled
    const { data: existingEnrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('student_id', userId)
      .eq('program_id', program.id)
      .single();

    let enrollmentId: string;

    if (existingEnrollment) {
      enrollmentId = existingEnrollment.id;
      logger.info('Student already enrolled', { enrollmentId });

      // Update payment status
      await supabase
        .from('enrollments')
        .update({
          payment_status: 'paid',
          status: 'active',
        })
        .eq('id', enrollmentId);
    } else {
      // Step 7: Create enrollment
      const { data: enrollment, error: enrollError } = await supabase
        .from('enrollments')
        .insert({
          student_id: userId,
          program_id: program.id,
          status: 'active',
          enrolled_at: new Date().toISOString(),
          payment_status: 'paid',
        })
        .select('id')
        .single();

      if (enrollError) {
        logger.error('Enrollment creation error', enrollError);
        throw enrollError;
      }

      enrollmentId = enrollment.id;
      logger.info('Created enrollment', {
        enrollmentId,
        userId,
        programId: program.id,
      });
    }

    // Step 8: Update application status
    await supabase
      .from('applications')
      .update({
        status: 'approved',
      })
      .eq('id', applicationId);

    // Step 9: Auto-enroll in Milady RISE if barber program
    if (programSlug === 'barber-apprenticeship') {
      try {
        const miladyResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/milady/auto-enroll`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              studentId: userId,
              programId: program.id,
            }),
          }
        );

        if (miladyResponse.ok) {
          logger.info('Milady auto-enrollment successful', { userId });
        } else {
          logger.warn('Milady auto-enrollment failed', { userId });
        }
      } catch (miladyError) {
        logger.warn('Milady auto-enrollment error', miladyError);
        // Don't fail the whole enrollment if Milady fails
      }
    }

    // Step 10: Send welcome email
    // TODO: Implement email service
    // await sendWelcomeEmail({
    //   email: emailLower,
    //   name: `${firstName} ${lastName}`,
    //   programName: program.name,
    //   dashboardUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/student/dashboard`,
    // });

    logger.info('Enrollment completed successfully', {
      userId,
      enrollmentId,
      programId: program.id,
    });

    return NextResponse.json({
      ok: true,
      userId,
      enrollmentId,
      message: 'Enrollment completed successfully',
    });
  } catch (error: any) {
    logger.error('Enrollment completion error', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
