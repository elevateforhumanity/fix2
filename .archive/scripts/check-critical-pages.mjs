#!/usr/bin/env node

import { readFileSync } from 'fs';

const criticalPages = [
  // Public pages
  'app/page.tsx',
  'app/programs/page.tsx',
  'app/apply/page.tsx',
  'app/getstarted/page.tsx',
  'app/about/page.tsx',
  'app/contact/page.tsx',
  
  // User portals
  'app/student/dashboard/page.tsx',
  'app/program-holder/portal/page.tsx',
  'app/employer/dashboard/page.tsx',
  'app/staff-portal/dashboard/page.tsx',
  'app/instructor/dashboard/page.tsx',
  
  // Admin
  'app/admin/dashboard/page.tsx',
  'app/admin/master-control/page.tsx',
  'app/admin/ai-console/page.tsx',
  'app/admin/courses/page.tsx',
  'app/admin/students/page.tsx',
  
  // Onboarding
  'app/onboarding/page.tsx',
  'app/onboarding/learner/page.tsx',
  'app/program-holder/onboarding/page.tsx',
];

console.log('='.repeat(80));
console.log('CRITICAL PAGES VERIFICATION');
console.log('='.repeat(80));
console.log('');

let complete = 0;
let total = 0;

for (const page of criticalPages) {
  total++;
  try {
    const content = readFileSync(page, 'utf-8');
    const lines = content.split('\n').length;
    
    const hasHero = content.includes('hero') || content.includes('Hero') || 
                    content.includes('h-[400px]') || content.includes('h-[500px]') ||
                    content.includes('h-[600px]') || content.includes('min-h-[400px]');
    const hasImages = content.includes('<Image') || content.includes('next/image');
    const hasDB = content.includes('supabase') || content.includes('createClient');
    const substantial = lines > 50;
    
    const status = substantial && (hasHero || hasImages || hasDB) ? '✅' : '❌';
    
    if (status === '✅') complete++;
    
    console.log(`${status} ${page.replace('app/', '/')}`);
    console.log(`   Lines: ${lines} | Hero: ${hasHero ? '✅' : '❌'} | Images: ${hasImages ? '✅' : '❌'} | DB: ${hasDB ? '✅' : '❌'}`);
    console.log('');
    
  } catch (error) {
    console.log(`❌ ${page} - FILE NOT FOUND`);
    console.log('');
  }
}

console.log('='.repeat(80));
console.log(`CRITICAL PAGES: ${complete}/${total} Complete (${Math.round(complete/total*100)}%)`);
console.log('='.repeat(80));

