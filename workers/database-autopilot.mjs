#!/usr/bin/env node
/**
 * DATABASE AUTOPILOT WORKER
 * Executes database migrations and setup tasks
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cuxzzpsyufcewtmicszk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE';

console.log('🤖 DATABASE AUTOPILOT WORKER');
console.log('============================\n');

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration(sqlFile) {
  console.log(`📄 Reading ${sqlFile}...`);
  
  try {
    const sql = readFileSync(sqlFile, 'utf8');
    
    // Try using Supabase CLI if available
    console.log('🔧 Attempting to use Supabase CLI...');
    
    try {
      execSync(`supabase db push --file ${sqlFile}`, { stdio: 'inherit' });
      console.log('✅ Migration executed via Supabase CLI');
      return true;
    } catch (cliError) {
      console.log('⚠️  Supabase CLI not available');
    }
    
    // Fallback: Try psql if available
    console.log('🔧 Attempting to use psql...');
    
    const dbPassword = process.env.SUPABASE_DB_PASSWORD || 'Aniqh0116***';
    const dbUrl = `postgresql://postgres:${dbPassword}@db.cuxzzpsyufcewtmicszk.supabase.co:5432/postgres`;
    
    try {
      execSync(`psql "${dbUrl}" -f ${sqlFile}`, { stdio: 'inherit' });
      console.log('✅ Migration executed via psql');
      return true;
    } catch (psqlError) {
      console.log('⚠️  psql not available');
    }
    
    // Last resort: Manual instructions
    console.log('\n❌ Cannot execute SQL automatically');
    console.log('\n📋 MANUAL STEPS REQUIRED:');
    console.log('1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new');
    console.log(`2. Copy contents of: ${sqlFile}`);
    console.log('3. Paste into SQL Editor');
    console.log('4. Click "Run"');
    console.log('\n💡 Or install Supabase CLI: npm install -g supabase');
    
    return false;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

// Main execution
console.log('🎯 Task: Create credential system\n');

const success = await runMigration('simple-credentials.sql');

if (success) {
  console.log('\n✅ DATABASE AUTOPILOT: SUCCESS');
} else {
  console.log('\n⚠️  DATABASE AUTOPILOT: MANUAL INTERVENTION REQUIRED');
  console.log('The SQL file is ready but needs to be executed in Supabase SQL Editor');
}
