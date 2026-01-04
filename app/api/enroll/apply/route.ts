export const runtime = 'nodejs';
export const maxDuration = 60;

import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { orchestrateEnrollment } from '@/lib/enrollment/orchestrate-enrollment';
import {
  sendApplicationConfirmation,
  sendAdminApplicationNotification,
} from '@/lib/email/service';
import { checkRateLimit, verifyTurnstileToken } from '@/lib/turnstile';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    // Rate limiting by email
    if (body.email) {
      const rateLimit = checkRateLimit(`enroll:${body.email}`, 3, 60000); // 3 per minute
      if (!rateLimit.allowed) {
        return NextResponse.json(
          {
            message: 'Too many requests. Please try again in a minute.',
          },
          { status: 429 }
        );
      }
    }

    // Verify Turnstile token (if provided)
    if (body.turnstileToken) {
      const verification = await verifyTurnstileToken(body.turnstileToken);
      if (!verification.success) {
        return NextResponse.json(
          {
            message: verification.error || 'Verification failed',
          },
          { status: 400 }
        );
      }
    }

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

    const studentId = user?.id;

    // If no authenticated user, create student application
    if (!studentId) {
      const { data: application, error: applicationError } = await supabase
        .from('student_applications')
        .insert({
          full_name: `${body.firstName} ${body.lastName}`,
          email: body.email,
          phone: body.phone || null,
          status: 'pending',
          data: {
            firstName: body.firstName,
            lastName: body.lastName,
            preferredProgramId: body.preferredProgramId,
            fundingSource: body.fundingSource || 'WIOA',
            submittedAt: new Date().toISOString(),
          },
        })
        .select()
        .single();

      if (applicationError) {
        logger.error('[Enroll Apply] Failed to create application:', applicationError);
        throw applicationError;
      }

      logger.info('[New Application - Created]', {
        applicationId: application.id,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        preferredProgramId: body.preferredProgramId,
        submittedAt: new Date().toISOString(),
      });
      
      // Send notification to admin (non-blocking)
      sendAdminApplicationNotification(
        `${body.firstName} ${body.lastName}`,
        body.email,
        body.preferredProgramId,
        application.id
      ).catch((err) => logger.error('[Email] Admin notification failed:', err));
    } else {
      // Authenticated user - get or create profile
      let { data: profile } = await supabase
        .from('profiles')
        .select('id, email, full_name, role')
        .eq('id', studentId)
        .single();

      // Create profile if it doesn't exist
      if (!profile) {
        const { data: newProfile, error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: studentId,
            email: body.email,
            full_name: `${body.firstName} ${body.lastName}`,
            role: 'student',
          })
          .select()
          .single();

        if (profileError) {
          logger.error('[Enroll Apply] Failed to create profile:', profileError);
          throw profileError;
        }
        profile = newProfile;
      }

      // Look up program UUID from slug
      const { data: program, error: programError } = await supabase
        .from('programs')
        .select('id')
        .eq('slug', body.preferredProgramId)
        .single();

      if (programError || !program) {
        logger.error('[Enroll Apply] Program not found:', body.preferredProgramId, programError);
        return NextResponse.json(
          { message: 'Program not found' },
          { status: 404 }
        );
      }

      // Orchestrate enrollment (idempotent)
      const orchestrationResult = await orchestrateEnrollment({
        studentId,
        programId: program.id,
        programHolderId: null, // Not using program holders in current schema
        fundingSource: body.fundingSource || 'WIOA',
        idempotencyKey: `enrollment-${studentId}-${program.id}`,
      });

      if (!orchestrationResult.success) {
        logger.error(
          '[Enroll Apply] Orchestration failed:',
          orchestrationResult.error
        );
        return NextResponse.json(
          {
            message:
              orchestrationResult.error ||
              'Enrollment failed. Please try again.',
          },
          { status: 500 }
        );
      }

      logger.info('[New Application - Enrollment Orchestrated]', {
        enrollmentId: orchestrationResult.enrollmentId,
        studentId,
        programId: body.preferredProgramId,
        stepsCreated: orchestrationResult.stepsCreated,
        submittedAt: new Date().toISOString(),
      });
    }

    // Send confirmation email to applicant (non-blocking)
    sendApplicationConfirmation(
      body.email,
      `${body.firstName} ${body.lastName}`,
      body.preferredProgramId
    ).catch((err) =>
      logger.error('[Email] Application confirmation failed:', err)
    );

    // Send notification to admin team (non-blocking)
    sendAdminApplicationNotification(
      `${body.firstName} ${body.lastName}`,
      body.email,
      body.preferredProgramId,
      studentId || 'pending'
    ).catch((err) => logger.error('[Email] Admin notification failed:', err));

    return NextResponse.json(
      {
        message:
          'Application received. A member of the Elevate team will follow up within 24 hours.',
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const error = err as Error;
    logger.error('[Enroll Apply] Error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    logger.error('[Enroll Apply] Full error:', err);
    return NextResponse.json(
      {
        message:
          'Something went wrong submitting your application. Please try again or call (317) 314-3757.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
