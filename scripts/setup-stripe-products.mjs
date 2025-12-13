#!/usr/bin/env node
/**
 * Setup Stripe Products for Elevate for Humanity Programs
 * Creates products and prices for all training programs
 */

import Stripe from 'stripe';
import { config } from 'dotenv';

// Load environment variables
config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
});

const PROGRAMS = [
  {
    name: 'Barber Apprenticeship Program - Milady RISE',
    description: 'Milady RISE certification course fee for Barber Apprenticeship. Includes Client Well-Being & Safety certification.',
    price: 29500, // $295.00 (in cents)
    paymentPlans: [
      { name: 'Full Payment', amount: 29500, installments: 1 },
      { name: '2-Month Plan', amount: 15000, installments: 2 },
    ],
    metadata: {
      program_slug: 'barber-apprenticeship',
      duration_hours: '1500',
      includes_milady: 'true',
      wioa_eligible: 'true',
      apprenticeship_registered: 'true',
      course_fee_only: 'true',
    },
  },
  // Add other programs here as needed with their course fees only
];

async function createProduct(programData) {
  console.log(`\n📦 Creating product: ${programData.name}`);
  
  try {
    // Create Stripe product
    const product = await stripe.products.create({
      name: programData.name,
      description: programData.description,
      metadata: programData.metadata,
      default_price_data: {
        currency: 'usd',
        unit_amount: programData.price,
      },
    });

    console.log(`✅ Product created: ${product.id}`);
    console.log(`   Default price: ${product.default_price}`);

    // Create additional payment plan prices
    const prices = [];
    for (const plan of programData.paymentPlans) {
      if (plan.installments === 1) {
        // Skip - already created as default price
        prices.push({
          id: product.default_price,
          name: plan.name,
          amount: plan.amount,
          installments: 1,
        });
        continue;
      }

      const price = await stripe.prices.create({
        product: product.id,
        currency: 'usd',
        unit_amount: plan.amount,
        recurring: {
          interval: 'month',
          interval_count: 1,
        },
        metadata: {
          payment_plan: plan.name,
          installments: plan.installments.toString(),
          total_amount: (plan.amount * plan.installments).toString(),
        },
      });

      prices.push({
        id: price.id,
        name: plan.name,
        amount: plan.amount,
        installments: plan.installments,
      });

      console.log(`   💳 Payment plan created: ${plan.name} - ${price.id}`);
    }

    return {
      product,
      prices,
    };
  } catch (error) {
    console.error(`❌ Error creating product: ${error.message}`);
    throw error;
  }
}

async function main() {
  console.log('🚀 Setting up Stripe products for Elevate for Humanity\n');
  console.log('=' .repeat(70));

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY not found in environment variables');
    console.error('   Please set it in your .env.local file');
    process.exit(1);
  }

  const results = [];

  for (const program of PROGRAMS) {
    try {
      const result = await createProduct(program);
      results.push({
        program: program.name,
        slug: program.metadata.program_slug,
        productId: result.product.id,
        defaultPriceId: result.product.default_price,
        paymentPlans: result.prices,
      });
    } catch (error) {
      console.error(`Failed to create ${program.name}`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n✅ Setup complete!\n');
  console.log('📋 Product Summary:');
  console.log(JSON.stringify(results, null, 2));

  console.log('\n💡 Next steps:');
  console.log('1. Save these product IDs in your database');
  console.log('2. Update your .env.local with product IDs if needed');
  console.log('3. Test checkout flow with test card: 4242 4242 4242 4242');
  console.log('\n🔗 View products in Stripe Dashboard:');
  console.log('   https://dashboard.stripe.com/products\n');
}

main().catch(console.error);
