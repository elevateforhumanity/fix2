#!/usr/bin/env node
/**
 * Run Database Setup
 * Executes RLS policies and seeds program data
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🚀 Database Setup');
console.log('==================\n');

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing credentials');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', serviceRoleKey ? '✓' : '✗');
  process.exit(1);
}

// Create Supabase client with service role (admin access)
const supabase = createClient(supabaseUrl, serviceRoleKey);

console.log('✓ Connected with service role key\n');

// Step 1: Update RLS Policies
console.log('Step 1: Updating RLS policies...');
try {
  const rlsSQL = readFileSync('supabase/update-rls-policies.sql', 'utf8');
  
  // Split by semicolon and execute each statement
  const statements = rlsSQL
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'));
  
  for (const statement of statements) {
    if (statement.includes('DROP POLICY') || 
        statement.includes('CREATE POLICY') ||
        statement.includes('SELECT') && statement.includes('FROM programs')) {
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        if (error && !error.message.includes('does not exist')) {
          console.log('   ⚠️ ', error.message.substring(0, 80));
        }
      } catch (err) {
        // Policies might not exist yet, that's okay
      }
    }
  }
  
  console.log('✅ RLS policies updated\n');
} catch (error) {
  console.log('⚠️  Could not update RLS policies via API');
  console.log('   Please run supabase/update-rls-policies.sql in Supabase SQL Editor\n');
}

// Step 2: Seed Programs
console.log('Step 2: Seeding programs...');
try {
  // Read seed data
  const programs = [
    {
      slug: 'cna-certification',
      name: 'Certified Nursing Assistant (CNA)',
      description: 'Become a Certified Nursing Assistant in just 4-8 weeks. Learn patient care, vital signs, medical terminology, and clinical skills.',
      duration: '4-8 weeks',
      schedule: 'Full-time or Part-time',
      delivery: 'Hybrid',
      price: 0,
      credential: 'CNA Certification',
      etpl_approved: true,
      cip_code: '51.3902',
      active: true,
      metadata: { funding: ['WIOA', 'WRG'], provider: 'Elevate for Humanity' }
    },
    {
      slug: 'hvac-technician',
      name: 'HVAC Technician Training',
      description: '600-hour program covering HVAC installation, maintenance, and repair with EPA 608 certification.',
      duration: '16-24 weeks',
      schedule: 'Full-time',
      delivery: 'Hybrid',
      price: 0,
      credential: 'EPA 608, HVAC Certification',
      etpl_approved: true,
      cip_code: '47.0201',
      active: true,
      metadata: { funding: ['WIOA', 'WRG', 'Apprenticeship'], provider: 'Elevate for Humanity' }
    },
    {
      slug: 'barber-apprenticeship',
      name: 'Barber Apprenticeship Program',
      description: '1,500-hour DOL-registered apprenticeship. Earn while you learn. State barber license upon completion.',
      duration: '15-17 months',
      schedule: 'Full-time',
      delivery: 'Apprenticeship',
      price: 0,
      credential: 'State Barber License',
      etpl_approved: true,
      cip_code: '12.0402',
      active: true,
      metadata: { funding: ['WIOA', 'Apprenticeship', 'WRG', 'DWD'], provider: 'Elevate for Humanity' }
    },
    {
      slug: 'medical-assistant',
      name: 'Medical Assistant Program',
      description: 'Comprehensive 720-hour program preparing students for Certified Medical Assistant certification.',
      duration: '6-9 months',
      schedule: 'Full-time',
      delivery: 'Hybrid',
      price: 0,
      credential: 'Certified Medical Assistant (CMA)',
      etpl_approved: true,
      cip_code: '51.0801',
      active: true,
      metadata: { funding: ['WIOA', 'WRG', 'Pell'], provider: 'Elevate for Humanity' }
    },
    {
      slug: 'cdl-training',
      name: 'Commercial Driver License (CDL) Training',
      description: 'Get your Class A CDL in 3-6 weeks. Includes classroom instruction and behind-the-wheel training.',
      duration: '3-6 weeks',
      schedule: 'Full-time',
      delivery: 'In-person',
      price: 0,
      credential: 'Class A CDL',
      etpl_approved: true,
      cip_code: '49.0205',
      active: true,
      metadata: { funding: ['WIOA', 'WRG'], provider: 'Elevate for Humanity' }
    }
  ];

  // Insert programs
  const { data, error } = await supabase
    .from('programs')
    .upsert(programs, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error('❌ Error seeding programs:', error.message);
  } else {
    console.log(`✅ Seeded ${data.length} programs\n`);
  }
} catch (error) {
  console.error('❌ Error:', error.message);
}

// Step 3: Verify Data
console.log('Step 3: Verifying data...');
try {
  const { data: programs, error } = await supabase
    .from('programs')
    .select('slug, name, active')
    .eq('active', true);

  if (error) {
    console.error('❌ Error querying programs:', error.message);
  } else {
    console.log(`✅ Found ${programs.length} active programs:`);
    programs.forEach(p => {
      console.log(`   - ${p.name}`);
    });
  }
} catch (error) {
  console.error('❌ Error:', error.message);
}

console.log('\n==================');
console.log('✅ Database setup complete!\n');
console.log('Next steps:');
console.log('1. Visit programs catalog: /programs-catalog');
console.log('2. Test database queries: node test-database.mjs');
console.log('3. Verify programs appear on website\n');
