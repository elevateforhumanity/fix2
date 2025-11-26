import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function test() {
  console.log('🔍 Testing Supabase connection...\n');
  
  console.log('Environment variables:');
  console.log('  NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL || '❌ NOT SET');
  console.log('  SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ SET' : '❌ NOT SET');
  console.log('');
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing environment variables!');
    console.log('\nTo fix:');
    console.log('1. Run: vercel env pull .env.local');
    console.log('2. Or manually create .env.local with Supabase credentials');
    process.exit(1);
  }
  
  // Test 1: Can we connect?
  console.log('Test 1: Testing connection...');
  const { data, error } = await supabase
    .from('profiles')
    .select('count')
    .limit(1);
  
  if (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\nPossible issues:');
    console.log('- Table "profiles" does not exist (migrations not run)');
    console.log('- Invalid API key');
    console.log('- Supabase project is paused');
    return;
  }
  
  console.log('✅ Connection successful!\n');
  
  // Test 2: What tables exist?
  console.log('Test 2: Checking tables...');
  const { data: tables, error: tablesError } = await supabase.rpc('get_tables');
  
  if (tablesError) {
    console.log('⚠️ Could not list tables (this is normal, trying alternate method)');
    
    // Try checking specific tables
    const tablesToCheck = [
      'profiles',
      'programs',
      'courses',
      'lessons',
      'enrollments',
      'lesson_progress',
      'program_holders',
      'delegates',
      'achievements',
      'learning_activity_streaks'
    ];
    
    console.log('\nChecking required tables:');
    for (const table of tablesToCheck) {
      const { error: checkError } = await supabase
        .from(table)
        .select('count')
        .limit(1);
      
      if (checkError) {
        console.log(`  ❌ ${table} - MISSING`);
      } else {
        console.log(`  ✅ ${table} - EXISTS`);
      }
    }
  } else {
    console.log('\n📊 Tables found:', tables?.length || 0);
    tables?.forEach(t => console.log('  -', t.table_name));
  }
  
  console.log('\n✅ Test complete!');
}

test().catch(err => {
  console.error('❌ Test failed:', err.message);
  process.exit(1);
});
