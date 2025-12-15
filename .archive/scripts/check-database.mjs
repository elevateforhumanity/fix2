#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '.env.local') });

// Check if we're using Vercel env vars or local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Checking Supabase Database Status\n');
console.log('Environment:');
console.log('  URL:', supabaseUrl ? '✅ SET' : '❌ NOT SET');
console.log('  Key:', supabaseKey ? '✅ SET' : '❌ NOT SET');
console.log('');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  console.log('\nMake sure these are set in Vercel:');
  console.log('  - NEXT_PUBLIC_SUPABASE_URL');
  console.log('  - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Tables we expect to exist based on migrations
const requiredTables = {
  core: [
    'profiles',
    'programs', 
    'courses',
    'lessons',
    'enrollments',
    'lesson_progress'
  ],
  workforce: [
    'program_holders',
    'delegates',
    'delegate_assignments'
  ],
  wioa: [
    'participant_eligibility',
    'attendance_records',
    'employment_outcomes'
  ],
  gamification: [
    'achievements',
    'user_achievements',
    'learning_activity_streaks'
  ],
  optional: [
    'program_revenue',
    'course_tasks',
    'announcements',
    'forums',
    'learner_compliance'
  ]
};

async function checkTables() {
  console.log('📊 Checking Database Tables\n');
  
  const results = {
    existing: [],
    missing: []
  };
  
  for (const [category, tables] of Object.entries(requiredTables)) {
    console.log(`\n${category.toUpperCase()} TABLES:`);
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          if (error.message.includes('does not exist')) {
            console.log(`  ❌ ${table} - MISSING`);
            results.missing.push(table);
          } else {
            console.log(`  ⚠️  ${table} - ERROR: ${error.message}`);
            results.missing.push(table);
          }
        } else {
          console.log(`  ✅ ${table} - EXISTS`);
          results.existing.push(table);
        }
      } catch (err) {
        console.log(`  ❌ ${table} - ERROR: ${err.message}`);
        results.missing.push(table);
      }
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📈 SUMMARY:');
  console.log(`  ✅ Existing tables: ${results.existing.length}`);
  console.log(`  ❌ Missing tables: ${results.missing.length}`);
  
  if (results.missing.length > 0) {
    console.log('\n⚠️  MISSING TABLES:');
    results.missing.forEach(t => console.log(`     - ${t}`));
    console.log('\n📝 ACTION REQUIRED:');
    console.log('   1. Go to Supabase Dashboard → SQL Editor');
    console.log('   2. Open: supabase/migrations/RUN_ALL_MIGRATIONS.sql');
    console.log('   3. Copy entire file and paste into SQL Editor');
    console.log('   4. Click "Run"');
    console.log('   5. Run this script again to verify');
  } else {
    console.log('\n✅ All required tables exist!');
    console.log('\n🚀 READY TO WIRE UP DASHBOARDS:');
    console.log('   1. Student Dashboard');
    console.log('   2. Program Holder Dashboard');
    console.log('   3. Delegate Dashboard');
    console.log('   4. Compliance Dashboard');
    console.log('   5. Admin Operations Dashboard');
    console.log('   6. Executive Analytics Dashboard');
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
}

// Test connection first
async function testConnection() {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error && error.message.includes('Invalid API key')) {
      console.error('❌ Invalid Supabase API key!');
      console.log('\nCheck your credentials in Vercel:');
      console.log('  Settings → Environment Variables');
      process.exit(1);
    }
    
    console.log('✅ Connection successful!\n');
    await checkTables();
    
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }
}

testConnection();
