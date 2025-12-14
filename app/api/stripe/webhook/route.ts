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
    // Handle enrollment payment completion
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Check if this is an enrollment payment
      if (session.metadata?.userId && session.metadata?.enrollmentId) {
        console.log('[Webhook] Processing enrollment payment', {
          sessionId: session.id,
          userId: session.metadata.userId,
          email: session.metadata.email,
        });

        const supabase = new Stripe(process.env.STRIPE_SECRET_KEY!, {
          apiVersion: '2024-12-18.acacia',
        });

        // Import Supabase client
        const { createClient } = await import('@/lib/supabase/server');
        const supabaseClient = await createClient();

        // Update enrollment status to active and paid
        await supabaseClient
          .from('enrollments')
          .update({
            status: 'active',
            payment_status: 'paid',
          })
          .eq('id', session.metadata.enrollmentId);

        // Update application status
        if (session.metadata.applicationId) {
          await supabaseClient
            .from('applications')
            .update({ status: 'approved' })
            .eq('id', session.metadata.applicationId);
        }

        // Send password reset email for new users
        if (session.metadata.isNewUser === 'true' && session.metadata.email) {
          const { error: resetError } =
            await supabaseClient.auth.resetPasswordForEmail(
              session.metadata.email,
              {
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
              }
            );

          if (resetError) {
            console.error('[Webhook] Password reset email failed', resetError);
          } else {
            console.log(
              '[Webhook] Password reset email sent to',
              session.metadata.email
            );
          }
        }

        // Auto-enroll in Milady RISE if barber program
        if (session.metadata.programSlug === 'barber-apprenticeship') {
          try {
            const miladyResponse = await fetch(
              `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/milady/auto-enroll`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  studentId: session.metadata.userId,
                  programId: session.metadata.programId,
                }),
              }
            );

            if (miladyResponse.ok) {
              console.log('[Webhook] Milady auto-enrollment successful');
            } else {
              console.warn('[Webhook] Milady auto-enrollment failed');
            }
          } catch (miladyError) {
            console.warn('[Webhook] Milady auto-enrollment error', miladyError);
          }
        }

        console.log('[Webhook] Enrollment completed successfully');
      }
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
