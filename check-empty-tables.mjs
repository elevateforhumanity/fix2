#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  console.error('   Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Tables to check
const tablesToCheck = [
  'programs',
  'courses',
  'lessons',
  'quizzes',
  'certificates',
  'achievements',
  'notifications',
  'enrollments',
  'users',
  'organizations',
  'partners',
  'instructors',
  'categories',
  'tags',
  'resources',
  'announcements',
  'events',
  'forums',
  'forum_threads',
  'forum_posts',
  'faqs',
  'testimonials',
  'blog_posts',
  'pages',
  'settings'
];

console.log('🔍 Checking database tables for empty data...\n');

const emptyTables = [];
const populatedTables = [];
const missingTables = [];

for (const table of tablesToCheck) {
  try {
    const { data, error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      if (error.message.includes('does not exist') || error.code === '42P01') {
        missingTables.push(table);
      } else {
        console.error(`⚠️  Error checking ${table}:`, error.message);
      }
      continue;
    }
    
    if (count === 0) {
      emptyTables.push(table);
    } else {
      populatedTables.push({ table, count });
    }
  } catch (err) {
    console.error(`⚠️  Error checking ${table}:`, err.message);
  }
}

console.log('📊 DATABASE TABLE ANALYSIS\n');
console.log('='.repeat(70));

console.log(`\n✅ Populated Tables: ${populatedTables.length}`);
populatedTables.forEach(({ table, count }) => {
  console.log(`   ${table}: ${count} records`);
});

console.log(`\n📭 Empty Tables: ${emptyTables.length}`);
if (emptyTables.length > 0) {
  emptyTables.forEach(table => {
    console.log(`   ⚠️  ${table} (0 records)`);
  });
}

console.log(`\n❌ Missing Tables: ${missingTables.length}`);
if (missingTables.length > 0) {
  missingTables.forEach(table => {
    console.log(`   ❌ ${table} (table does not exist)`);
  });
}

console.log('\n' + '='.repeat(70));

if (emptyTables.length > 0) {
  console.log('\n⚡ ACTION REQUIRED:');
  console.log(`   ${emptyTables.length} tables need to be populated with data`);
  console.log('\n   Priority tables to populate:');
  
  const priorityTables = emptyTables.filter(t => 
    ['programs', 'courses', 'categories', 'settings', 'faqs'].includes(t)
  );
  
  if (priorityTables.length > 0) {
    priorityTables.forEach(table => {
      console.log(`   🔴 ${table}`);
    });
  }
} else {
  console.log('\n✅ All checked tables have data!');
}

process.exit(0);
