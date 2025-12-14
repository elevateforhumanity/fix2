import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';

function tierFromPrice(priceId?: string | null): 'free' | 'student' | 'career' {
  if (!priceId) return 'free';
  if (priceId === process.env.STRIPE_PRICE_STUDENT) return 'student';
  if (priceId === process.env.STRIPE_PRICE_CAREER) return 'career';
  return 'free';
}

async function upsertAccess(payload: {
  user_id: string;
  tier: string;
  stripe_customer_id?: string | null;
  stripe_subscription_id?: string | null;
  stripe_price_id?: string | null;
  status?: string | null;
  current_period_end?: number | null;
}) {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/user_access`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify({
      user_id: payload.user_id,
      tier: payload.tier,
      stripe_customer_id: payload.stripe_customer_id ?? null,
      stripe_subscription_id: payload.stripe_subscription_id ?? null,
      stripe_price_id: payload.stripe_price_id ?? null,
      status: payload.status ?? null,
      current_period_end: payload.current_period_end
        ? new Date(payload.current_period_end * 1000).toISOString()
        : null,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Supabase upsert failed: ${res.status} ${text}`);
  }
}

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 503 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
  });

  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    return NextResponse.json(
      { error: 'Missing stripe-signature' },
      { status: 400 }
    );
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  try {
    // Handle funding payment completion - AUTOMATIC ENROLLMENT
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const studentId = session.metadata?.student_id;
      const programId = session.metadata?.program_id;
      const programSlug = session.metadata?.program_slug;
      const fundingSource = session.metadata?.funding_source || 'WIOA';

      if (!studentId || !programId) {
        console.log(
          '[Webhook] Missing student/program metadata, skipping auto-enrollment'
        );
        return NextResponse.json({ received: true });
      }

      console.log('[Webhook] Processing funding payment - AUTO-ENROLLMENT', {
        sessionId: session.id,
        studentId,
        programId,
        programSlug,
        fundingSource,
        amount: session.amount_total,
      });

      // Import Supabase client
      const { createClient } = await import('@/lib/supabase/server');
      const supabaseClient = await createClient();

      // STEP 1: Mark funding payment as paid (audit trail)
      await supabaseClient
        .from('funding_payments')
        .update({
          status: 'paid',
          stripe_payment_intent_id: session.payment_intent as string,
          paid_at: new Date().toISOString(),
        })
        .eq('stripe_checkout_session_id', session.id);

      console.log('[Webhook] Marked funding payment as paid');

      // STEP 2: Create/activate enrollment (AUTO-ENROLL)
      // Idempotency: don't double-enroll if webhook retries
      const { data: existing } = await supabaseClient
        .from('enrollments')
        .select('id, status')
        .eq('student_id', studentId)
        .eq('program_id', programId)
        .maybeSingle();

      if (!existing) {
        // Create new enrollment
        await supabaseClient.from('enrollments').insert({
          student_id: studentId,
          program_id: programId,
          status: 'active',
          payment_status: 'paid',
          enrolled_at: new Date().toISOString(),
        });
        console.log('[Webhook] ✅ Created new enrollment', {
          studentId,
          programId,
        });
      } else if (existing.status !== 'active') {
        // Activate existing enrollment
        await supabaseClient
          .from('enrollments')
          .update({
            status: 'active',
            payment_status: 'paid',
            enrolled_at: new Date().toISOString(),
          })
          .eq('id', existing.id);
        console.log('[Webhook] ✅ Activated existing enrollment', {
          enrollmentId: existing.id,
        });
      } else {
        console.log('[Webhook] Enrollment already active', {
          enrollmentId: existing.id,
        });
      }

      // STEP 3: Assign AI Instructor
      if (programSlug) {
        try {
          console.log('[Webhook] Assigning AI instructor...');
          const { assignAIInstructorForProgram } = await import('@/lib/ai/assign');
          const assignResult = await assignAIInstructorForProgram({
            studentId,
            programSlug,
          });

          if (assignResult.ok) {
            console.log('[Webhook] ✅ AI instructor assigned:', assignResult.instructorSlug);
          } else {
            console.warn('[Webhook] ⚠️ AI instructor assignment failed:', assignResult.reason);
          }
        } catch (aiError) {
          console.warn('[Webhook] ⚠️ AI instructor assignment error', aiError);
        }
      }

      // STEP 4: Milady auto-provision (turn it on automatically)
      if (programSlug === 'barber-apprenticeship') {
        try {
          console.log('[Webhook] Starting Milady auto-enrollment...');
          const miladyResponse = await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/milady/auto-enroll`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                studentId,
                programId,
              }),
            }
          );

          if (miladyResponse.ok) {
            console.log('[Webhook] ✅ Milady auto-enrollment successful');
          } else {
            const errorText = await miladyResponse.text();
            console.warn(
              '[Webhook] ⚠️ Milady auto-enrollment failed',
              errorText
            );
          }
        } catch (miladyError) {
          console.warn(
            '[Webhook] ⚠️ Milady auto-enrollment error',
            miladyError
          );
          // Don't fail the whole webhook - enrollment is still active
        }
      }

      console.log('[Webhook] ✅ AUTO-ENROLLMENT COMPLETE');
    }

    // Handle subscription lifecycle (created/updated/deleted)
    if (event.type.startsWith('customer.subscription.')) {
      const sub = event.data.object as Stripe.Subscription;
      const userId = (sub.metadata?.user_id || '') as string;

      // If user_id isn't stamped, we can't activate (safe no-op)
      if (!userId) {
        return NextResponse.json({
          ok: true,
          skipped: 'missing user_id metadata',
        });
      }

      const customerId =
        typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
      const priceId = sub.items.data[0]?.price?.id ?? null;
      const tier = tierFromPrice(priceId);
      const status = sub.status;
      const periodEnd = sub.current_period_end ?? null;

      // If deleted, downgrade to free
      const finalTier =
        event.type === 'customer.subscription.deleted' ? 'free' : tier;
      const finalStatus =
        event.type === 'customer.subscription.deleted' ? 'canceled' : status;

      await upsertAccess({
        user_id: userId,
        tier: finalTier,
        stripe_customer_id: customerId,
        stripe_subscription_id: sub.id,
        stripe_price_id: priceId,
        status: finalStatus,
        current_period_end: periodEnd,
      });

      console.log(
        `[Webhook] ${event.type}: user=${userId}, tier=${finalTier}, status=${finalStatus}`
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[Webhook Error]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
