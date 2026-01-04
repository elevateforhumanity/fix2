#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: '.env.local' });

console.log('🔍 TESTING ALL API ENDPOINTS');
console.log('==============================\n');

const BASE_URL = 'http://localhost:3000';

// Login to get auth token
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const { data: authData } = await supabase.auth.signInWithPassword({
  email: 'testuser@elevatetest.com',
  password: 'TestPassword123!'
});

const token = authData?.session?.access_token;

// API endpoints to test
const apis = [
  { method: 'POST', path: '/api/enroll/apply', auth: false, body: { firstName: 'Test', lastName: 'User', email: 'test@test.com', phone: '555-0000', preferredProgramId: 'hvac', fundingSource: 'WIOA' } },
  { method: 'GET', path: '/api/programs', auth: false },
  { method: 'GET', path: '/api/courses', auth: false },
  { method: 'POST', path: '/api/student/progress', auth: true, body: { enrollmentId: 'test', progress: 50 } },
  { method: 'GET', path: '/api/student/enrollments', auth: true },
  { method: 'POST', path: '/api/partner/enroll', auth: true, body: { studentId: 'test', courseId: 'test' } },
  { method: 'GET', path: '/api/messages', auth: true },
  { method: 'POST', path: '/api/messages', auth: true, body: { to: 'test', message: 'test' } },
  { method: 'GET', path: '/api/notifications', auth: true },
  { method: 'POST', path: '/api/payments/create-intent', auth: true, body: { amount: 100 } },
];

let passed = 0;
let failed = 0;
const failures = [];

for (const api of apis) {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (api.auth && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method: api.method,
    headers,
  };

  if (api.body) {
    options.body = JSON.stringify(api.body);
  }

  try {
    const response = await fetch(`${BASE_URL}${api.path}`, options);
    const text = await response.text();
    
    // Check if response is HTML (404 page)
    const isHtml = text.trim().startsWith('<!DOCTYPE html>') || text.trim().startsWith('<html');
    
    if (isHtml) {
      console.log(`❌ ${api.method} ${api.path} - Returns HTML (404)`);
      failed++;
      failures.push({ path: api.path, issue: '404 - Route not found' });
    } else if (response.status >= 500) {
      console.log(`❌ ${api.method} ${api.path} - ${response.status} Server Error`);
      failed++;
      failures.push({ path: api.path, issue: `${response.status} error` });
    } else if (response.status === 401 && !api.auth) {
      console.log(`⚠️  ${api.method} ${api.path} - ${response.status} (Requires auth)`);
      passed++;
    } else if (response.status === 400) {
      console.log(`⚠️  ${api.method} ${api.path} - ${response.status} (Bad request - expected)`);
      passed++;
    } else {
      console.log(`✅ ${api.method} ${api.path} - ${response.status}`);
      passed++;
    }
  } catch (error) {
    console.log(`❌ ${api.method} ${api.path} - Connection failed`);
    failed++;
    failures.push({ path: api.path, issue: 'Connection failed' });
  }
}

console.log('\n📊 SUMMARY');
console.log('==========');
console.log(`✅ Working: ${passed}`);
console.log(`❌ Broken: ${failed}`);

if (failures.length > 0) {
  console.log('\n🔧 NEEDS FIXING:');
  failures.forEach(f => {
    console.log(`  - ${f.path}: ${f.issue}`);
  });
}

await supabase.auth.signOut();
process.exit(failed > 0 ? 1 : 0);
