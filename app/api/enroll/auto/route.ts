import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe/client';
import { logger } from '@/lib/logger';

interface AutoEnrollRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  programSlug: string;
  notes?: string;
}

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Payment system not configured' },
        { status: 503 }
      );
    }

    const body: AutoEnrollRequest = await req.json();
    const { firstName, lastName, email, phone, programSlug, notes } = body;

    if (!firstName || !lastName || !email || !programSlug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const emailLower = email.toLowerCase();

    logger.info('Starting auto-enrollment', { email: emailLower, programSlug });

    // STEP 1: Get program details
    const { data: program, error: programError } = await supabase
      .from('programs')
      .select('id, name, slug, total_cost')
      .eq('slug', programSlug)
      .single();

    if (programError || !program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    // STEP 2: Check if user exists
    let userId: string;
    let isNewUser = false;

    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', emailLower)
      .single();

    if (existingUser) {
      userId = existingUser.id;
      logger.info('User already exists', { userId });
    } else {
      // STEP 3: Create auth user
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
        logger.error('Auth user creation failed', authError);
        return NextResponse.json(
          { error: 'Failed to create account' },
          { status: 500 }
        );
      }

      userId = authData.user.id;
      isNewUser = true;

      // STEP 4: Create profile
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
        logger.error('Profile creation failed', profileError);
        return NextResponse.json(
          { error: 'Failed to create profile' },
          { status: 500 }
        );
      }

      logger.info('Created new user', { userId });
    }

    // STEP 5: Create enrollment (FREE - no payment required)
    const { data: existingEnrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('student_id', userId)
      .eq('program_id', program.id)
      .single();

    let enrollmentId: string;

    if (existingEnrollment) {
      enrollmentId = existingEnrollment.id;
      logger.info('Enrollment already exists', { enrollmentId });
    } else {
      const { data: enrollment, error: enrollError } = await supabase
        .from('enrollments')
        .insert({
          student_id: userId,
          program_id: program.id,
          status: 'active',
          enrolled_at: new Date().toISOString(),
          payment_status: 'waived', // Program is FREE
        })
        .select('id')
        .single();

      if (enrollError) {
        logger.error('Enrollment creation failed', enrollError);
        return NextResponse.json(
          { error: 'Failed to create enrollment' },
          { status: 500 }
        );
      }

      enrollmentId = enrollment.id;
      logger.info('Created FREE enrollment', { enrollmentId });
    }

    // STEP 6: Create application record
    const { data: application } = await supabase
      .from('applications')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: emailLower,
        phone: phone ?? null,
        program_id: programSlug,
        status: 'approved',
      })
      .select('id')
      .single();

    // STEP 7: Send password reset email for new users
    if (isNewUser) {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        emailLower,
        {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
        }
      );

      if (resetError) {
        logger.warn('Password reset email failed', resetError);
      } else {
        logger.info('Password reset email sent', { email: emailLower });
      }
    }

    // STEP 8: Enrollment complete - completely FREE for students
    // Note: Elevate pays $295 Milady fee separately from their Stripe account
    // Students self-enroll in Milady RISE using promo code: efhcti-rise295
    logger.info('FREE enrollment complete', {
      userId,
      enrollmentId,
      programSlug,
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Note: No Milady API auto-enrollment - students use manual login
    // They will self-enroll at: https://www.miladytraining.com/bundles/client-well-being-safety-certification
    // Using promo code: efhcti-rise295

    return NextResponse.json({
      ok: true,
      userId,
      enrollmentId,
      redirectUrl: `${siteUrl}/enroll/success?enrolled=true`,
      message: 'Enrollment successful! Check your email to set your password.',
    });
  } catch (error: any) {
    logger.error('Auto-enrollment error', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
