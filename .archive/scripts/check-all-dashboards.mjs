#!/usr/bin/env node

import { readFileSync } from 'fs';

const dashboards = [
  'app/admin/dashboard/page.tsx',
  'app/student/dashboard/page.tsx',
  'app/program-holder/dashboard/page.tsx',
  'app/employer/dashboard/page.tsx',
  'app/staff-portal/dashboard/page.tsx',
  'app/portal/student/dashboard/page.tsx',
  'app/portal/staff/dashboard/page.tsx',
  'app/workforce-board/dashboard/page.tsx',
  'app/partner/dashboard/page.tsx',
  'app/instructor/dashboard/page.tsx',
  'app/board/dashboard/page.tsx',
  'app/lms/dashboard/page.tsx'
];

console.log('='.repeat(80));
console.log('DASHBOARD DATA CONNECTION AUDIT');
console.log('='.repeat(80));
console.log('');

for (const dashboard of dashboards) {
  try {
    const content = readFileSync(dashboard, 'utf-8');
    
    const hasSupabase = content.includes('createClient') || content.includes('supabase');
    const hasQuery = content.includes('.from(') || content.includes('.select(');
    const hasAuth = content.includes('getUser()');
    const hasRealData = content.includes('count:') || content.includes('.count');
    
    const status = hasSupabase && hasQuery && hasAuth && hasRealData ? '✅ FULL' : 
                   hasSupabase && hasQuery ? '⚠️  PARTIAL' : 
                   '❌ PLACEHOLDER';
    
    console.log(`${status} ${dashboard}`);
    
    if (status === '⚠️  PARTIAL' || status === '❌ PLACEHOLDER') {
      if (!hasSupabase) console.log('   - Missing: Supabase client');
      if (!hasQuery) console.log('   - Missing: Database queries');
      if (!hasAuth) console.log('   - Missing: Authentication');
      if (!hasRealData) console.log('   - Missing: Real data counts');
    }
    console.log('');
    
  } catch (error) {
    console.log(`❌ ERROR ${dashboard}`);
    console.log(`   - ${error.message}`);
    console.log('');
  }
}

