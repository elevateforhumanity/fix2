export const runtime = 'nodejs';
export const maxDuration = 60;

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

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
        enrollment_status: 'pending', // Requires approval before portal access
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
      .eq('user_id', userId)
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
          user_id: userId,
          program_id: program.id,
          status: 'pending', // Changed from 'active' - requires approval
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

      // Notify admins of pending enrollment
      const { data: admins } = await supabase
        .from('profiles')
        .select('id')
        .in('role', ['admin', 'super_admin']);

      if (admins && admins.length > 0) {
        const notifications = admins.map((admin) => ({
          user_id: admin.id,
          type: 'system',
          title: 'New Enrollment Pending Approval',
          message: `${firstName} ${lastName} (${emailLower}) has enrolled in ${program.name}. Enrollment ID: ${enrollmentId}`,
        }));

        await supabase.from('notifications').insert(notifications);
        logger.info('Admin notifications created', { count: admins.length });
      }
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

    // STEP 8: Barber program internal fee now uses the commerce/accounting workflow.
    if (programSlug === 'barber-apprenticeship') {
      await supabase.from('payment_records').insert({
        user_id: userId,
        amount: 295,
        currency: 'usd',
        status: 'pending',
        description: 'Milady RISE Fee - Elevate internal payment',
        metadata: { enrollment_id: enrollmentId, application_id: application?.id || '', provider: 'quickbooks_paypal', paid_by: 'elevate' },
      });
      return NextResponse.json({
        ok: true,
        userId,
        enrollmentId,
        checkoutUrl: '/checkout/payment?name=Milady+RISE+Fee&program=barber-apprenticeship&amount=295',
        message: 'Enrollment successful. Internal program fee queued in commerce.',
      });
    }

    // STEP 9: For non-barber programs, enrollment is complete
    logger.info('FREE enrollment complete', {
      userId,
      enrollmentId,
      programSlug,
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    return NextResponse.json({
      ok: true,
      userId,
      enrollmentId,
      redirectUrl: `${siteUrl}/enroll/success?enrolled=true`,
      message: 'Enrollment successful! Check your email to set your password.',
    });
  } catch (err: unknown) {
    logger.err('Auto-enrollment err', err);
    return NextResponse.json(
      { err: toErrorMessage(err) || 'Internal server err' },
      { status: 500 }
    );
  }
}
