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

async function testLicensingAndStore() {
  console.log('🔍 TESTING LICENSING AND STORE TABLES...\n');
  console.log('='.repeat(60));

  const results = {
    working: [],
    broken: []
  };

  // Test licensing tables
  const licensingTables = [
    'program_licenses',
    'license_usage_log'
  ];

  console.log('\n📋 LICENSING TABLES:\n');
  for (const table of licensingTables) {
    try {
      const { data, error } = await supabase.from(table).select('id').limit(1);
      if (error) {
        results.broken.push({ table, error: error.message });
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        results.working.push(table);
        console.log(`✅ ${table}: EXISTS`);
      }
    } catch (err) {
      results.broken.push({ table, error: err.message });
      console.log(`❌ ${table}: ${err.message}`);
    }
  }

  // Test store tables
  const storeTables = [
    'store_instances',
    'store_branding'
  ];

  console.log('\n🏪 STORE TABLES:\n');
  for (const table of storeTables) {
    try {
      const { data, error } = await supabase.from(table).select('id').limit(1);
      if (error) {
        results.broken.push({ table, error: error.message });
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        results.working.push(table);
        console.log(`✅ ${table}: EXISTS`);
      }
    } catch (err) {
      results.broken.push({ table, error: err.message });
      console.log(`❌ ${table}: ${err.message}`);
    }
  }

  // Check program_licenses data
  console.log('\n📊 LICENSE DATA:\n');
  const { data: licenses, error: licError } = await supabase
    .from('program_licenses')
    .select('license_key, license_type, lms_model, status')
    .limit(5);

  if (!licError && licenses) {
    console.log(`Found ${licenses.length} licenses:`);
    licenses.forEach(l => {
      console.log(`  - ${l.license_key}: ${l.license_type} (${l.lms_model}) - ${l.status}`);
    });
  } else if (licError) {
    console.log(`⚠️  Could not query licenses: ${licError.message}`);
  }

  // Check store_instances data
  console.log('\n🏪 STORE DATA:\n');
  const { data: stores, error: storeError } = await supabase
    .from('store_instances')
    .select('store_name, store_url, is_active')
    .limit(5);

  if (!storeError && stores) {
    console.log(`Found ${stores.length} stores:`);
    stores.forEach(s => {
      console.log(`  - ${s.store_name}: ${s.store_url} (${s.is_active ? 'active' : 'inactive'})`);
    });
  } else if (storeError) {
    console.log(`⚠️  Could not query stores: ${storeError.message}`);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY\n');
  
  const totalTables = licensingTables.length + storeTables.length;
  console.log(`✅ Working: ${results.working.length}/${totalTables}`);
  console.log(`❌ Broken: ${results.broken.length}/${totalTables}`);

  if (results.broken.length > 0) {
    console.log('\n⚠️  BROKEN TABLES:');
    results.broken.forEach(({ table, error }) => {
      console.log(`   ❌ ${table}: ${error}`);
    });
    console.log('\nYou need to run:');
    console.log('  - PROGRAM_BASED_LMS_LICENSING.sql');
    console.log('  - UPDATE_STORE_SETUP.sql');
    console.log('');
    return false;
  } else {
    console.log('\n🎉 ALL LICENSING AND STORE TABLES OPERATIONAL!\n');
    return true;
  }
}

testLicensingAndStore().then(success => {
  process.exit(success ? 0 : 1);
});
