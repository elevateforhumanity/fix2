#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
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

console.log('🚀 EXECUTING ALL SQL FILES\n');
console.log('='.repeat(60));

// Read SQL files
const sql1 = readFileSync(join(__dirname, 'FINAL_COMPLETE_ALL.sql'), 'utf-8');
const sql2 = readFileSync(join(__dirname, 'EXECUTE_ALL_TRIGGERS_FUNCTIONS.sql'), 'utf-8');

console.log('\n📋 File 1: FINAL_COMPLETE_ALL.sql');
console.log(`   Size: ${sql1.length} characters`);

console.log('\n📋 File 2: EXECUTE_ALL_TRIGGERS_FUNCTIONS.sql');
console.log(`   Size: ${sql2.length} characters`);

console.log('\n⚠️  NOTE: Supabase client library cannot execute raw SQL.');
console.log('⚠️  You must run these files in Supabase SQL Editor:');
console.log('⚠️  https://cuxzzpsyufcewtmicszk.supabase.co/project/_/sql');
console.log('\n');

// Try to verify if tables exist
console.log('🔍 Checking if SQL has been run...\n');

const tablesToCheck = [
  'program_licenses',
  'license_usage_log',
  'store_instances',
  'store_branding'
];

let allExist = true;

for (const table of tablesToCheck) {
  try {
    const { error } = await supabase.from(table).select('id').limit(1);
    if (error) {
      console.log(`❌ ${table}: NOT FOUND`);
      allExist = false;
    } else {
      console.log(`✅ ${table}: EXISTS`);
    }
  } catch (err) {
    console.log(`❌ ${table}: ERROR`);
    allExist = false;
  }
}

console.log('\n' + '='.repeat(60));

if (allExist) {
  console.log('\n✅ ALL TABLES EXIST! SQL HAS BEEN RUN!\n');
  console.log('🎉 Ready to run tests!\n');
  process.exit(0);
} else {
  console.log('\n❌ TABLES MISSING! YOU MUST RUN SQL FILES!\n');
  console.log('📋 Steps:');
  console.log('1. Go to: https://cuxzzpsyufcewtmicszk.supabase.co/project/_/sql');
  console.log('2. Click "New Query"');
  console.log('3. Copy contents of FINAL_COMPLETE_ALL.sql');
  console.log('4. Paste and click "Run"');
  console.log('5. Repeat for EXECUTE_ALL_TRIGGERS_FUNCTIONS.sql');
  console.log('6. Run this script again to verify\n');
  process.exit(1);
}
