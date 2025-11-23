#!/usr/bin/env node

/**
 * Test Supabase Connection
 * Verifies that Supabase environment variables are set and connection works
 */

console.log('🔍 Testing Supabase Connection...\n');

// Check environment variables
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

console.log('📋 Checking Environment Variables:');
let allVarsSet = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value && value !== 'undefined' && !value.includes('your-')) {
    console.log(`  ✅ ${varName}: Set (${value.substring(0, 20)}...)`);
  } else {
    console.log(`  ❌ ${varName}: Not set or using placeholder`);
    allVarsSet = false;
  }
});

console.log('');

if (!allVarsSet) {
  console.log('⚠️  WARNING: Some Supabase environment variables are not set.');
  console.log('   This is expected in local development.');
  console.log('   In production (Vercel), these should be set in the dashboard.\n');
  process.exit(0);
}

// Test connection
console.log('🔌 Testing Supabase Connection...');

try {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Simple fetch test to Supabase REST API
  const response = await fetch(`${supabaseUrl}/rest/v1/`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });

  if (response.ok || response.status === 404) {
    console.log('  ✅ Supabase connection successful!');
    console.log(`  📍 Connected to: ${supabaseUrl}`);
  } else {
    console.log(`  ⚠️  Unexpected response: ${response.status} ${response.statusText}`);
  }
} catch (error) {
  console.log(`  ❌ Connection failed: ${error.message}`);
}

console.log('\n✅ Supabase configuration check complete.');
