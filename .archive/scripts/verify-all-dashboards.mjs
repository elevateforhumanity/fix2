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
  'app/instructor/dashboard/page.tsx',
  'app/workforce-board/dashboard/page.tsx',
  'app/partner/dashboard/page.tsx',
  'app/board/dashboard/page.tsx',
  'app/lms/dashboard/page.tsx',
  'app/delegate/dashboard/page.tsx'
];

console.log('='.repeat(80));
console.log('COMPLETE DASHBOARD CODE VERIFICATION');
console.log('='.repeat(80));
console.log('');

let fullCode = 0;
let partial = 0;
let missing = 0;

for (const dashboard of dashboards) {
  try {
    const content = readFileSync(dashboard, 'utf-8');
    
    // Check for essential components
    const hasImports = content.includes('import') && content.includes('createClient');
    const hasAuth = content.includes('getUser()') && content.includes('redirect');
    const hasQueries = content.includes('.from(') && content.includes('.select(');
    const hasStats = content.includes('count') || content.includes('Count');
    const hasUI = content.includes('className') && content.includes('return');
    const hasMetadata = content.includes('export const metadata');
    const hasRole = content.includes('role') || content.includes('profile');
    
    const lineCount = content.split('\n').length;
    const hasSubstantialCode = lineCount > 50;
    
    const score = [hasImports, hasAuth, hasQueries, hasStats, hasUI, hasMetadata, hasRole, hasSubstantialCode]
      .filter(Boolean).length;
    
    let status;
    if (score >= 7) {
      status = '✅ FULL CODE';
      fullCode++;
    } else if (score >= 4) {
      status = '⚠️  PARTIAL';
      partial++;
    } else {
      status = '❌ MISSING';
      missing++;
    }
    
    console.log(`${status} ${dashboard}`);
    console.log(`   Lines: ${lineCount} | Score: ${score}/8`);
    
    if (score < 7) {
      console.log('   Missing:');
      if (!hasImports) console.log('     - Imports/Supabase client');
      if (!hasAuth) console.log('     - Authentication');
      if (!hasQueries) console.log('     - Database queries');
      if (!hasStats) console.log('     - Statistics/counts');
      if (!hasUI) console.log('     - UI components');
      if (!hasMetadata) console.log('     - Metadata');
      if (!hasRole) console.log('     - Role checking');
      if (!hasSubstantialCode) console.log('     - Substantial code (< 50 lines)');
    }
    console.log('');
    
  } catch (error) {
    console.log(`❌ ERROR ${dashboard}`);
    console.log(`   ${error.message}`);
    console.log('');
    missing++;
  }
}

console.log('='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));
console.log(`✅ Full Code: ${fullCode}`);
console.log(`⚠️  Partial: ${partial}`);
console.log(`❌ Missing: ${missing}`);
console.log(`📊 Total: ${dashboards.length}`);
console.log('');

if (partial > 0 || missing > 0) {
  console.log('⚠️  Some dashboards need completion!');
} else {
  console.log('🎉 All dashboards have full code!');
}

