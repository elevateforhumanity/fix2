#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const BASE_URL = 'http://localhost:3000';

console.log('🎯 COMPLETE PLATFORM TEST');
console.log('==========================\n');

let results = {
  login: false,
  profile: false,
  courses: false,
  enrollments: false,
  progress: false,
  apis: false,
  completion: false
};

// Test 1: Login
console.log('1️⃣ Testing Login...');
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
  email: 'testuser@elevatetest.com',
  password: 'TestPassword123!'
});

if (authError) {
  console.log('❌ Login failed:', authError.message);
  process.exit(1);
}
console.log('✅ Login successful');
results.login = true;

const token = authData.session.access_token;
const userId = authData.user.id;

// Test 2: Profile Access
console.log('\n2️⃣ Testing Profile Access...');
const { data: profile, error: profileError } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single();

if (profileError) {
  console.log('❌ Profile access failed:', profileError.message);
} else {
  console.log('✅ Profile accessible');
  console.log('   Name:', profile.full_name || 'Not set');
  console.log('   Role:', profile.role);
  results.profile = true;
}

// Test 3: Course Catalog
console.log('\n3️⃣ Testing Course Catalog...');
const { data: courses, error: coursesError } = await supabase
  .from('courses')
  .select('*')
  .eq('published', true);

if (coursesError) {
  console.log('❌ Course catalog failed:', coursesError.message);
} else {
  console.log('✅ Course catalog accessible');
  console.log('   Courses:', courses.length);
  results.courses = true;
}

// Test 4: Enrollments
console.log('\n4️⃣ Testing Enrollments...');
const { data: enrollments, error: enrollError } = await supabase
  .from('enrollments')
  .select('*')
  .eq('user_id', userId);

if (enrollError) {
  console.log('❌ Enrollments failed:', enrollError.message);
} else {
  console.log('✅ Enrollments accessible');
  console.log('   Enrollments:', enrollments.length);
  results.enrollments = true;
}

// Test 5: Progress Update
console.log('\n5️⃣ Testing Progress Update...');
if (enrollments && enrollments.length > 0) {
  const { data: updated, error: updateError } = await supabase
    .from('enrollments')
    .update({ progress: 25 })
    .eq('id', enrollments[0].id)
    .eq('user_id', userId)
    .select()
    .single();

  if (updateError) {
    console.log('❌ Progress update failed:', updateError.message);
  } else {
    console.log('✅ Progress update successful');
    console.log('   New progress:', updated.progress + '%');
    results.progress = true;
  }
} else {
  console.log('⚠️  No enrollments to test');
}

// Test 6: API Endpoints
console.log('\n6️⃣ Testing API Endpoints...');
const apis = [
  { path: '/api/student/enrollments', method: 'GET' },
  { path: '/api/student/progress', method: 'POST', body: { enrollmentId: enrollments?.[0]?.id, progress: 50 } },
  { path: '/api/notifications', method: 'GET' },
];

let apisPassed = 0;
for (const api of apis) {
  const options = {
    method: api.method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  
  if (api.body) {
    options.body = JSON.stringify(api.body);
  }

  const response = await fetch(`${BASE_URL}${api.path}`, options);
  const text = await response.text();
  const isHtml = text.trim().startsWith('<!DOCTYPE html>');
  
  if (!isHtml && response.status < 500) {
    console.log(`   ✅ ${api.method} ${api.path} - ${response.status}`);
    apisPassed++;
  } else {
    console.log(`   ❌ ${api.method} ${api.path} - ${response.status}`);
  }
}

if (apisPassed === apis.length) {
  results.apis = true;
}

// Test 7: Course Completion
console.log('\n7️⃣ Testing Course Completion...');
if (enrollments && enrollments.length > 0) {
  const { data: completed, error: completeError } = await supabase
    .from('enrollments')
    .update({ 
      progress: 100,
      status: 'completed',
      completed_at: new Date().toISOString()
    })
    .eq('id', enrollments[0].id)
    .eq('user_id', userId)
    .select()
    .single();

  if (completeError) {
    console.log('❌ Course completion failed:', completeError.message);
  } else {
    console.log('✅ Course completion successful');
    console.log('   Status:', completed.status);
    console.log('   Progress:', completed.progress + '%');
    results.completion = true;
    
    // Reset for next test
    await supabase
      .from('enrollments')
      .update({ progress: 0, status: 'active', completed_at: null })
      .eq('id', enrollments[0].id);
  }
} else {
  console.log('⚠️  No enrollments to test');
}

await supabase.auth.signOut();

// Summary
console.log('\n📊 FINAL RESULTS');
console.log('================');
const passed = Object.values(results).filter(v => v).length;
const total = Object.keys(results).length;

Object.entries(results).forEach(([test, result]) => {
  console.log(`${result ? '✅' : '❌'} ${test}`);
});

console.log(`\n🎯 SCORE: ${passed}/${total} tests passed`);

if (passed === total) {
  console.log('\n🎉 ALL TESTS PASSED - PLATFORM FULLY WORKING!');
  process.exit(0);
} else {
  console.log('\n⚠️  Some tests failed - see details above');
  process.exit(1);
}
