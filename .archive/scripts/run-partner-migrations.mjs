#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 Running Partner LMS Integration Migrations\n');

const migrations = [
  '20241129_partner_lms_integration.sql',
  '20241129_seed_partner_credentials.sql',
  '20241129_all_certiport_programs.sql',
  '20241129_certiport_accurate_pricing.sql',
  '20241129_add_hsi_certifications.sql',
  '20241129_add_jri_integration.sql',
  '20241129_add_nrf_rise_up.sql',
  '20241129_add_certiport_certifications.sql'
];

for (const migration of migrations) {
  try {
    console.log(`📄 Running ${migration}...`);
    const sql = readFileSync(join(__dirname, 'supabase/migrations', migration), 'utf8');
    
    // Execute SQL using Supabase client
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      console.error(`❌ Error in ${migration}:`, error.message);
    } else {
      console.log(`✅ ${migration} completed`);
    }
  } catch (err) {
    console.error(`❌ Failed to read ${migration}:`, err.message);
  }
}

console.log('\n✅ All migrations completed!');
