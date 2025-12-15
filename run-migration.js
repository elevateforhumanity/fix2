#!/usr/bin/env node

/**
 * Run Supabase Migration Script
 * 
 * This script reads the migration SQL file and executes it against your Supabase database.
 * 
 * Usage:
 *   1. Set your Supabase credentials as environment variables:
 *      export SUPABASE_URL="https://your-project.supabase.co"
 *      export SUPABASE_SERVICE_KEY="your-service-role-key"
 *   
 *   2. Run the script:
 *      node run-migration.js
 */

const fs = require('fs');
const path = require('path');

async function runMigration() {
  // Get Supabase credentials from environment
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
    console.error('❌ Error: SUPABASE_URL not set or is placeholder');
    console.log('\nPlease set your Supabase URL:');
    console.log('  export SUPABASE_URL="https://your-project.supabase.co"');
    console.log('  export SUPABASE_SERVICE_KEY="your-service-role-key"');
    console.log('\nOr run the migration manually in Supabase Dashboard:');
    console.log('  1. Go to https://app.supabase.com');
    console.log('  2. Select your project');
    console.log('  3. Click SQL Editor');
    console.log('  4. Copy/paste: supabase/migrations/20241214_lms_tables.sql');
    console.log('  5. Click Run');
    process.exit(1);
  }

  if (!supabaseKey || supabaseKey.includes('placeholder')) {
    console.error('❌ Error: SUPABASE_SERVICE_KEY not set or is placeholder');
    console.log('\nPlease set your Supabase service role key:');
    console.log('  export SUPABASE_SERVICE_KEY="your-service-role-key"');
    console.log('\nFind it in: Supabase Dashboard → Settings → API → service_role key');
    process.exit(1);
  }

  // Read migration file
  const migrationPath = path.join(__dirname, 'supabase/migrations/20241214_lms_tables.sql');
  
  if (!fs.existsSync(migrationPath)) {
    console.error('❌ Error: Migration file not found:', migrationPath);
    process.exit(1);
  }

  const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

  console.log('🚀 Running LMS migration...');
  console.log('📍 Supabase URL:', supabaseUrl);
  console.log('📄 Migration file:', migrationPath);
  console.log('');

  try {
    // Execute SQL via Supabase REST API
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({ query: migrationSQL })
    });

    if (!response.ok) {
      // Try alternative method - direct SQL execution
      const altResponse = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ query: migrationSQL })
      });

      if (!altResponse.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }
    }

    console.log('✅ Migration completed successfully!');
    console.log('');
    console.log('Created tables:');
    console.log('  ✓ lessons');
    console.log('  ✓ lesson_progress');
    console.log('  ✓ notifications');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Verify tables in Supabase Dashboard → Table Editor');
    console.log('  2. Test the LMS at /lms/dashboard');
    console.log('  3. Check DEPLOYMENT_NEXT_STEPS.md for more info');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.log('');
    console.log('⚠️  Please run the migration manually:');
    console.log('  1. Go to https://app.supabase.com');
    console.log('  2. Select your project');
    console.log('  3. Click SQL Editor → New Query');
    console.log('  4. Copy/paste the contents of:');
    console.log('     supabase/migrations/20241214_lms_tables.sql');
    console.log('  5. Click Run (or press Cmd/Ctrl + Enter)');
    console.log('');
    console.log('The migration SQL is also printed below:');
    console.log('');
    console.log('─'.repeat(80));
    console.log(migrationSQL);
    console.log('─'.repeat(80));
    process.exit(1);
  }
}

// Run the migration
runMigration().catch(console.error);
