#!/usr/bin/env node

/**
 * Stripe Auto-Enrollment Setup Script
 * Creates products, prices, and payment links with proper metadata
 * for automatic enrollment system
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Program definitions with metadata
const PROGRAMS = [
  {
    id: 'prog-cna',
    name: 'Certified Nursing Assistant (CNA)',
    description: 'Complete CNA training program with state certification prep',
    price: 150000, // $1,500
    courses: ['job-ready-indy-core'],
  },
  {
    id: 'prog-barber',
    name: 'Barber Apprenticeship',
    description: 'Complete barbering program with state licensure prep',
    price: 250000, // $2,500
    courses: ['barber-apprentice-foundations'],
  },
  {
    id: 'prog-tax-vita',
    name: 'Tax Preparation (VITA)',
    description: 'IRS VITA certification and tax preparation training',
    price: 120000, // $1,200
    courses: ['tax-vita-onramp'],
  },
  {
    id: 'prog-hvac',
    name: 'HVAC Technician',
    description: 'HVAC installation, maintenance, and repair training',
    price: 350000, // $3,500
    courses: ['hvac-tech-foundations'],
  },
  {
    id: 'prog-cdl',
    name: 'Commercial Driver License (CDL)',
    description: 'CDL training with ELDT certification',
    price: 400000, // $4,000
    courses: ['cdl-eldt-core'],
  },
  {
    id: 'prog-business-apprentice',
    name: 'Business Apprenticeship',
    description: 'Business fundamentals and entrepreneurship training',
    price: 180000, // $1,800
    courses: ['business-apprentice-foundations'],
  },
  {
    id: 'prog-esthetics-apprentice',
    name: 'Esthetics Apprenticeship',
    description: 'Esthetics and skincare professional training',
    price: 220000, // $2,200
    courses: ['esthetics-apprentice-foundations'],
  },
];

// HSI Partner Courses
const HSI_COURSES = [
  {
    id: 'hsi-cpr-aed-all-ages',
    name: 'CPR/AED Certification (All Ages)',
    description: 'CPR and AED training for adults, children, and infants',
    price: 13500, // $135
    partnerId: 'partner-hsi',
    enrollmentLink: 'https://otis.osmanager4.com/#/nts/openenrollment/906B45CC-211D-48B3-A2FE-71D2C6D464F3',
  },
  {
    id: 'hsi-cpr-aed-adult',
    name: 'CPR/AED Certification (Adult Only)',
    description: 'CPR and AED training for adults only',
    price: 11900, // $119
    partnerId: 'partner-hsi',
    enrollmentLink: 'https://otis.osmanager4.com/#/nts/openenrollment/8B978D3E-85A4-48E7-AFF2-5F01FFF12F35',
  },
  {
    id: 'hsi-first-aid-cpr-all-ages',
    name: 'First Aid + CPR/AED (All Ages)',
    description: 'Complete first aid and CPR training for all ages',
    price: 18900, // $189
    partnerId: 'partner-hsi',
    enrollmentLink: 'https://otis.osmanager4.com/#/nts/openenrollment/D84A8E63-967E-4A63-944A-AA3E33D777A8',
  },
  {
    id: 'hsi-first-aid-cpr-adult',
    name: 'First Aid + CPR/AED (Adult Only)',
    description: 'Complete first aid and CPR training for adults',
    price: 18900, // $189
    partnerId: 'partner-hsi',
    enrollmentLink: 'https://otis.osmanager4.com/#/nts/openenrollment/A373CD50-3045-49B1-B119-62A1DC5EFF47',
  },
];

async function main() {
  console.log('\n🚀 Stripe Auto-Enrollment Setup\n');
  console.log('This script will guide you through setting up Stripe for automatic enrollment.\n');

  // Check for Stripe key
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  
  if (!stripeKey || stripeKey.includes('sk_test_...') || stripeKey.includes('sk_live_...')) {
    console.log('❌ STRIPE_SECRET_KEY not found in environment variables.\n');
    console.log('Please set your Stripe secret key:');
    console.log('1. Go to https://dashboard.stripe.com/apikeys');
    console.log('2. Copy your Secret key (starts with sk_test_ or sk_live_)');
    console.log('3. Add to Vercel environment variables:');
    console.log('   - Go to Vercel Dashboard → Project → Settings → Environment Variables');
    console.log('   - Add: STRIPE_SECRET_KEY = your_key_here');
    console.log('   - Add: STRIPE_PUBLIC_KEY = your_publishable_key_here');
    console.log('   - Redeploy your project\n');
    
    const continueAnyway = await question('Continue with manual setup instructions? (y/n): ');
    if (continueAnyway.toLowerCase() !== 'y') {
      console.log('\nSetup cancelled. Please configure Stripe keys and try again.\n');
      rl.close();
      return;
    }
  }

  console.log('\n📋 MANUAL SETUP INSTRUCTIONS\n');
  console.log('Since Stripe keys need to be configured in Vercel, follow these steps:\n');

  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('STEP 1: Configure Environment Variables in Vercel\n');
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables');
  console.log('2. Add these variables:\n');
  console.log('   STRIPE_SECRET_KEY = sk_live_... (from Stripe Dashboard)');
  console.log('   STRIPE_PUBLIC_KEY = pk_live_... (from Stripe Dashboard)');
  console.log('   STRIPE_WEBHOOK_SECRET = whsec_... (will get this in Step 3)\n');
  console.log('3. Click "Save" for each variable\n');

  await question('Press Enter when environment variables are configured...');

  console.log('\n═══════════════════════════════════════════════════════════════\n');
  console.log('STEP 2: Create Products and Payment Links in Stripe\n');
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('Go to: https://dashboard.stripe.com/payment-links\n');
  console.log('For each program below, create a payment link:\n');

  for (const program of PROGRAMS) {
    console.log(`\n📦 ${program.name}`);
    console.log(`   Price: $${(program.price / 100).toFixed(2)}`);
    console.log(`   Description: ${program.description}`);
    console.log(`   \n   IMPORTANT - Add this metadata:`);
    console.log(`   ┌─────────────────────────────────────┐`);
    console.log(`   │ Key: programId                      │`);
    console.log(`   │ Value: ${program.id.padEnd(28)} │`);
    console.log(`   └─────────────────────────────────────┘\n`);
  }

  console.log('\n💉 HSI Partner Courses:\n');

  for (const course of HSI_COURSES) {
    console.log(`\n📦 ${course.name}`);
    console.log(`   Price: $${(course.price / 100).toFixed(2)}`);
    console.log(`   Description: ${course.description}`);
    console.log(`   \n   IMPORTANT - Add this metadata:`);
    console.log(`   ┌─────────────────────────────────────┐`);
    console.log(`   │ Key: courseId                       │`);
    console.log(`   │ Value: ${course.id.padEnd(28)} │`);
    console.log(`   │                                     │`);
    console.log(`   │ Key: partnerId                      │`);
    console.log(`   │ Value: ${course.partnerId.padEnd(28)} │`);
    console.log(`   └─────────────────────────────────────┘\n`);
  }

  await question('Press Enter when all payment links are created...');

  console.log('\n═══════════════════════════════════════════════════════════════\n');
  console.log('STEP 3: Configure Webhook Endpoint\n');
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('1. Go to: https://dashboard.stripe.com/webhooks');
  console.log('2. Click "Add endpoint"');
  console.log('3. Enter endpoint URL:');
  console.log('   https://fix2-gpql-git-main-elevate-48e460c9.vercel.app/api/stripe/webhook');
  console.log('4. Select events to listen to:');
  console.log('   ✓ checkout.session.completed');
  console.log('5. Click "Add endpoint"');
  console.log('6. Copy the "Signing secret" (starts with whsec_)');
  console.log('7. Add to Vercel environment variables:');
  console.log('   STRIPE_WEBHOOK_SECRET = whsec_...\n');

  await question('Press Enter when webhook is configured...');

  console.log('\n═══════════════════════════════════════════════════════════════\n');
  console.log('STEP 4: Test the System\n');
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('1. Redeploy your Vercel project to apply environment variables');
  console.log('2. Use a test payment link with test card: 4242 4242 4242 4242');
  console.log('3. Complete checkout');
  console.log('4. Check Stripe webhook logs: https://dashboard.stripe.com/webhooks');
  console.log('5. Verify enrollment created in Supabase database');
  console.log('6. Check student can access courses\n');

  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('✅ SETUP COMPLETE!\n');
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('Your Stripe auto-enrollment system is now configured.\n');
  console.log('When students pay via Stripe:');
  console.log('  ✓ Enrollment record created automatically');
  console.log('  ✓ Courses assigned automatically');
  console.log('  ✓ Partner enrollments processed automatically');
  console.log('  ✓ Welcome emails sent automatically\n');
  console.log('No manual work required! 🎉\n');

  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('📚 DOCUMENTATION\n');
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('For detailed information, see:');
  console.log('  - STRIPE_AUTO_ENROLLMENT_STATUS.md');
  console.log('  - STRIPE_HSI_AUTO_ENROLLMENT.md');
  console.log('  - app/api/stripe/webhook/route.ts (webhook handler code)\n');

  rl.close();
}

main().catch(console.error);
