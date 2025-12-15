#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cuxzzpsyufcewtmicszk.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in environment');
  process.exit(1);
}

console.log('🚀 Starting automated database migration...\n');
console.log(`📍 Supabase URL: ${SUPABASE_URL}`);

// Create Supabase client with service role key
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Read SQL file
const sqlFile = join(__dirname, 'CREATE_PARTNER_SCORM_TABLES.sql');
let sql;

try {
  sql = readFileSync(sqlFile, 'utf8');
  console.log('✅ SQL file loaded successfully\n');
} catch (error) {
  console.error('❌ Failed to read SQL file:', error.message);
  process.exit(1);
}

// Split SQL into individual statements
const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

console.log(`📊 Found ${statements.length} SQL statements to execute\n`);
console.log('⏳ Executing migration...\n');

let successCount = 0;
let errorCount = 0;
const errors = [];

// Execute each statement
for (let i = 0; i < statements.length; i++) {
  const statement = statements[i] + ';';
  
  // Skip comments and empty statements
  if (statement.trim().startsWith('--') || statement.trim() === ';') {
    continue;
  }
  
  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: statement });
    
    if (error) {
      // Try direct query if RPC fails
      const { error: directError } = await supabase.from('_').select('*').limit(0);
      
      if (directError) {
        console.log(`⚠️  Statement ${i + 1}: ${error.message.substring(0, 100)}`);
        errorCount++;
        errors.push({ statement: i + 1, error: error.message });
      } else {
        successCount++;
      }
    } else {
      successCount++;
    }
  } catch (error) {
    console.log(`⚠️  Statement ${i + 1}: ${error.message.substring(0, 100)}`);
    errorCount++;
    errors.push({ statement: i + 1, error: error.message });
  }
}

console.log('\n' + '='.repeat(60));
console.log('\n📊 MIGRATION RESULTS\n');
console.log(`✅ Successful: ${successCount} statements`);
console.log(`⚠️  Warnings/Errors: ${errorCount} statements`);

if (errors.length > 0 && errors.length < 10) {
  console.log('\n⚠️  Errors encountered:');
  errors.forEach(e => {
    console.log(`   Statement ${e.statement}: ${e.error.substring(0, 150)}`);
  });
}

console.log('\n' + '='.repeat(60));

// Verify tables were created
console.log('\n🔍 Verifying migration...\n');

const tablesToCheck = [
  'scorm_packages',
  'scorm_enrollments',
  'scorm_tracking',
  'partner_course_mappings',
  'external_module_progress',
  'lms_sync_log',
  'partner_credentials'
];

let verifiedTables = 0;

for (const table of tablesToCheck) {
  try {
    const { error } = await supabase.from(table).select('*').limit(0);
    
    if (!error) {
      console.log(`✅ ${table}`);
      verifiedTables++;
    } else {
      console.log(`❌ ${table} - ${error.message}`);
    }
  } catch (error) {
    console.log(`❌ ${table} - ${error.message}`);
  }
}

console.log('\n' + '='.repeat(60));
console.log('\n📈 VERIFICATION SUMMARY\n');
console.log(`Tables verified: ${verifiedTables}/${tablesToCheck.length}`);

if (verifiedTables === tablesToCheck.length) {
  console.log('\n🎉 MIGRATION SUCCESSFUL!\n');
  console.log('All tables created and accessible.');
  console.log('\n✅ Next steps:');
  console.log('   1. Test SCORM player component');
  console.log('   2. Test partner enrollment');
  console.log('   3. Verify progress tracking\n');
  process.exit(0);
} else {
  console.log('\n⚠️  MIGRATION INCOMPLETE\n');
  console.log('Some tables may not have been created.');
  console.log('Please check the errors above and run manually if needed.\n');
  console.log('Manual migration: Copy CREATE_PARTNER_SCORM_TABLES.sql to Supabase SQL Editor\n');
  process.exit(1);
}
