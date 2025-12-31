#!/usr/bin/env node
/**
 * Test Database Connection
 * Tests Supabase connection and queries
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🧪 Testing Database Connection');
console.log('================================\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✓' : '✗');
  process.exit(1);
}

console.log('✓ Supabase URL:', supabaseUrl);
console.log('✓ Anon Key:', supabaseKey.substring(0, 20) + '...\n');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Test 1: Check connection
console.log('Test 1: Checking connection...');
try {
  const { data, error } = await supabase.from('profiles').select('count');
  
  if (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('   Code:', error.code);
    console.error('   Details:', error.details);
  } else {
    console.log('✅ Connection successful');
    console.log('   Profiles table accessible\n');
  }
} catch (err) {
  console.error('❌ Connection error:', err.message);
}

// Test 2: Query programs table
console.log('Test 2: Querying programs table...');
try {
  const { data, error } = await supabase
    .from('programs')
    .select('id, name, slug')
    .limit(5);
  
  if (error) {
    console.error('❌ Query failed:', error.message);
    console.error('   This might mean:');
    console.error('   - Table does not exist');
    console.error('   - RLS policies blocking access');
    console.error('   - Anon key lacks permissions\n');
  } else {
    console.log('✅ Programs table accessible');
    console.log('   Found', data?.length || 0, 'programs');
    if (data && data.length > 0) {
      console.log('   Sample:', data[0].name);
    }
    console.log('');
  }
} catch (err) {
  console.error('❌ Query error:', err.message);
}

// Test 3: Query courses table
console.log('Test 3: Querying courses table...');
try {
  const { data, error } = await supabase
    .from('courses')
    .select('id, title')
    .limit(5);
  
  if (error) {
    console.error('❌ Query failed:', error.message);
  } else {
    console.log('✅ Courses table accessible');
    console.log('   Found', data?.length || 0, 'courses\n');
  }
} catch (err) {
  console.error('❌ Query error:', err.message);
}

// Test 4: Check table structure
console.log('Test 4: Checking available tables...');
try {
  // Try to query information_schema (may not work with anon key)
  const { data, error } = await supabase.rpc('get_tables');
  
  if (error) {
    console.log('⚠️  Cannot query table list (expected with anon key)');
    console.log('   This is normal - anon key has limited permissions\n');
  } else {
    console.log('✅ Tables:', data);
  }
} catch (err) {
  console.log('⚠️  Cannot query table list (expected)\n');
}

console.log('================================');
console.log('Database Connection Test Complete\n');

console.log('Summary:');
console.log('- If connection successful: Database is accessible');
console.log('- If tables not found: Run migrations to create schema');
console.log('- If RLS errors: Check Row Level Security policies');
console.log('- If anon key errors: Key may be truncated or invalid\n');

console.log('Next steps:');
console.log('1. If keys are truncated, get complete keys from Supabase dashboard');
console.log('2. If tables missing, run: pnpm run migrate');
console.log('3. If RLS blocking, check policies in Supabase dashboard\n');
