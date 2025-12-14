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

    // STEP 5: Create enrollment (pending payment)
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
          status: 'pending',
          enrolled_at: new Date().toISOString(),
          payment_status: 'pending',
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
      logger.info('Created enrollment', { enrollmentId });
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
        status: 'pending_payment',
      })
      .select('id')
      .single();

    // STEP 7: Create Stripe checkout session
    const amount = program.total_cost
      ? Math.round(Number(program.total_cost) * 100)
      : 489000; // Default $4,890

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: emailLower,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: program.name,
              description: `Enrollment in ${program.name} program`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/enroll/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/apply?program=${programSlug}`,
      metadata: {
        userId,
        enrollmentId,
        applicationId: application?.id || '',
        programId: program.id,
        programSlug: program.slug,
        firstName,
        lastName,
        email: emailLower,
        phone: phone || '',
        isNewUser: isNewUser.toString(),
      },
      payment_method_types: ['card', 'affirm', 'klarna', 'afterpay_clearpay'],
      automatic_tax: { enabled: false },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      );
    }

    logger.info('Auto-enrollment complete, redirecting to checkout', {
      userId,
      enrollmentId,
      sessionId: session.id,
    });

    return NextResponse.json({
      ok: true,
      userId,
      enrollmentId,
      checkoutUrl: session.url,
      sessionId: session.id,
      message: 'Account created! Redirecting to payment...',
    });
  } catch (error: any) {
    logger.error('Auto-enrollment error', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
