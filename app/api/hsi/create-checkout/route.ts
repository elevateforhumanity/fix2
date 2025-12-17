import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      // @ts-expect-error TS2322: Type '"2024-11-20.acacia"' is not assignable to type '"2025-10-29.clover"'.
      apiVersion: '2024-11-20.acacia',
    })
  : null;

export async function POST(request: NextRequest) {
  const supabase = createAdminClient();
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 503 }
    );
  }

  try {
    const {
      courseType,
      studentId,
      studentEmail,
      studentName,
      studentPhone,
      studentAddress,
    } = await request.json();

    // Get course details
    const { data: course, error: courseError } = await supabase
      .from('hsi_course_products')
      .select('*')
      .eq('course_type', courseType)
      .single();

    if (courseError || !course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Create Stripe checkout session with Buy Now Pay Later options
    const session = await stripe.checkout.sessions.create({
      // @ts-expect-error TS2769: No overload matches this call.
      payment_method_types: [
        'card',
        'afterpay_clearpay',
        'klarna',
        'us_bank_account',
      ],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.course_name,
              description: course.description,
            },
            unit_amount: Math.round(course.price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL || `https://${process.env.VERCEL_URL}` || 'http://localhost:3000'}/courses/hsi/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || `https://${process.env.VERCEL_URL}` || 'http://localhost:3000'}/courses/hsi/${courseType}/enroll`,
      customer_email: studentEmail,
      client_reference_id: studentId,
      // Enable Buy Now Pay Later options
      payment_method_options: {
        afterpay_clearpay: {
          enabled: true,
        },
        klarna: {
          enabled: true,
        },
      },
      metadata: {
        course_type: courseType,
        student_id: studentId,
        student_name: studentName,
        student_email: studentEmail,
        student_phone: studentPhone || '',
        student_address: studentAddress || '',
        provider: 'hsi',
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: unknown) {
    // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'Error'.
    logger.error('Stripe checkout error:', error);
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
