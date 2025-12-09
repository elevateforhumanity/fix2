import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const product = await req.json();

    // Create product in Stripe
    const stripeProduct = await createStripeProduct(product);

    // Save to database
    const { data, error } = await supabase
      .from('store_products')
      .upsert({
        title: product.title,
        description: product.description,
        features: product.features,
        pricing: product.pricing,
        demo_enabled: product.demo.enabled,
        demo_url: product.demo.url,
        stripe_product_id: stripeProduct.id,
        published: true,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      url: `/store/codebase-clone`,
      productId: data.id
    });
  } catch (error: any) {
    logger.error('Failed to publish product:', error);
    return NextResponse.json(
      { error: 'Failed to publish product', message: error.message },
      { status: 500 }
    );
  }
}

async function createStripeProduct(product: any) {
  // Create Stripe product with pricing tiers
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  const stripeProduct = await stripe.products.create({
    name: product.title,
    description: product.description,
    metadata: {
      type: 'codebase_clone'
    }
  });

  // Create prices for each tier
  for (const [key, tier] of Object.entries(product.pricing) as any) {
    await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: tier.price * 100, // Convert to cents
      currency: 'usd',
      metadata: {
        tier: key,
        name: tier.name
      }
    });
  }

  return stripeProduct;
}
