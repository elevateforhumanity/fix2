import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { employer_id, customerId, amount, description } = body;

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      );
    }

    // Compliance check: Only allow admin/platform/compliance fees
    const allowedDescriptions = [
      'admin',
      'platform',
      'compliance',
      'coordination',
      'supervision',
    ];
    const isAllowed = allowedDescriptions.some((keyword) =>
      description.toLowerCase().includes(keyword)
    );

    if (!isAllowed) {
      return NextResponse.json(
        {
          error:
            'Invalid invoice description. Only admin/platform/compliance fees allowed.',
        },
        { status: 400 }
      );
    }

    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
    });

    // Create invoice item
    const invoiceItem = await stripe.invoiceItems.create({
      customer: customerId,
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      description,
    });

    // Create invoice
    const invoice = await stripe.invoices.create({
      customer: customerId,
      auto_advance: true,
    });

    // Save to database
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('invoices')
      .insert([
        {
          employer_id,
          amount,
          description,
          status: 'pending',
          stripe_invoice_id: invoice.id,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ invoiceId: invoice.id, invoice: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ invoices: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
