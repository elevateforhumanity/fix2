#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function createTables() {
  console.log('🚀 Creating missing tables...\n');

  // 1. Payment Records
  console.log('Creating payment_records table...');
  const paymentSQL = `
    CREATE TABLE IF NOT EXISTS payment_records (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
      amount DECIMAL(10,2) NOT NULL,
      currency TEXT DEFAULT 'usd',
      status TEXT DEFAULT 'pending',
      stripe_payment_intent_id TEXT,
      description TEXT,
      metadata JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_payment_records_user ON payment_records(user_id);
    CREATE INDEX IF NOT EXISTS idx_payment_records_status ON payment_records(status);

    ALTER TABLE payment_records ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "payment_records_select_own" ON payment_records;
    CREATE POLICY "payment_records_select_own" ON payment_records
      FOR SELECT TO authenticated
      USING (user_id = auth.uid());

    GRANT SELECT ON payment_records TO authenticated;
  `;

  try {
    const { error } = await supabase.rpc('exec', { sql: paymentSQL });
    if (error) console.log('⚠️  payment_records:', error.message);
    else console.log('✅ payment_records created');
  } catch (err) {
    console.log('⚠️  payment_records:', err.message);
  }

  // 2. Onboarding Steps
  console.log('\nCreating onboarding_steps table...');
  const onboardingSQL = `
    CREATE TABLE IF NOT EXISTS onboarding_steps (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
      step_name TEXT NOT NULL,
      completed BOOLEAN DEFAULT false,
      completed_at TIMESTAMPTZ,
      data JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(user_id, step_name)
    );

    CREATE INDEX IF NOT EXISTS idx_onboarding_user ON onboarding_steps(user_id);

    ALTER TABLE onboarding_steps ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "onboarding_select_own" ON onboarding_steps;
    DROP POLICY IF EXISTS "onboarding_insert_own" ON onboarding_steps;
    DROP POLICY IF EXISTS "onboarding_update_own" ON onboarding_steps;

    CREATE POLICY "onboarding_select_own" ON onboarding_steps
      FOR SELECT TO authenticated
      USING (user_id = auth.uid());

    CREATE POLICY "onboarding_insert_own" ON onboarding_steps
      FOR INSERT TO authenticated
      WITH CHECK (user_id = auth.uid());

    CREATE POLICY "onboarding_update_own" ON onboarding_steps
      FOR UPDATE TO authenticated
      USING (user_id = auth.uid());

    GRANT SELECT, INSERT, UPDATE ON onboarding_steps TO authenticated;
  `;

  try {
    const { error } = await supabase.rpc('exec', { sql: onboardingSQL });
    if (error) console.log('⚠️  onboarding_steps:', error.message);
    else console.log('✅ onboarding_steps created');
  } catch (err) {
    console.log('⚠️  onboarding_steps:', err.message);
  }

  // 3. Add course modules
  console.log('\nAdding course modules...');
  
  const { data: course } = await supabase
    .from('courses')
    .select('id')
    .eq('slug', 'intro-hvac')
    .single();

  if (course) {
    const modules = [
      {
        course_id: course.id,
        title: 'HVAC System Components',
        description: 'Understanding the key components of HVAC systems',
        order_index: 2,
        duration_minutes: 45,
        content: 'Learn about compressors, condensers, evaporators, and expansion valves.'
      },
      {
        course_id: course.id,
        title: 'Installation and Maintenance',
        description: 'Best practices for HVAC installation and maintenance',
        order_index: 3,
        duration_minutes: 60,
        content: 'Proper installation techniques and preventive maintenance schedules.'
      },
      {
        course_id: course.id,
        title: 'Troubleshooting Common Issues',
        description: 'Diagnosing and fixing common HVAC problems',
        order_index: 4,
        duration_minutes: 50,
        content: 'Learn systematic troubleshooting approaches for HVAC systems.'
      }
    ];

    for (const module of modules) {
      const { error } = await supabase
        .from('course_modules')
        .upsert(module, { onConflict: 'course_id,order_index', ignoreDuplicates: true });
      
      if (!error) {
        console.log(`✅ Added module: ${module.title}`);
      }
    }
  }

  // Verify
  console.log('\n📊 Verification:\n');
  
  const tables = ['messages', 'payment_records', 'onboarding_steps', 'partner_enrollments'];
  
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('id').limit(1);
    console.log(`${error ? '❌' : '✅'} ${table}`);
  }

  const { data: modules } = await supabase
    .from('course_modules')
    .select('title')
    .eq('course_id', course?.id);

  console.log(`\n✅ Course modules: ${modules?.length || 0}`);
  modules?.forEach(m => console.log(`   - ${m.title}`));

  console.log('\n✨ Setup complete!\n');
}

createTables();
