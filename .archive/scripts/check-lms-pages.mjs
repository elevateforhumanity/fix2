#!/usr/bin/env node

import { readFileSync } from 'fs';

const lmsPages = [
  'app/lms/page.tsx',
  'app/lms/dashboard/page.tsx',
  'app/lms/courses/page.tsx',
  'app/lms/courses/[id]/page.tsx',
  'app/lms/courses/[id]/lessons/[lessonId]/page.tsx',
  'app/lms/assignments/page.tsx',
  'app/lms/quizzes/page.tsx',
  'app/lms/grades/page.tsx',
  'app/lms/progress/page.tsx',
  'app/lms/certificates/page.tsx',
  'app/lms/profile/page.tsx',
  'app/lms/calendar/page.tsx',
  'app/lms/messages/page.tsx',
  'app/lms/forums/page.tsx',
  'app/lms/resources/page.tsx',
  'app/lms/help/page.tsx',
];

console.log('='.repeat(80));
console.log('LMS PAGES STATUS CHECK');
console.log('='.repeat(80));
console.log('');

let complete = 0;
let needsWork = 0;

for (const page of lmsPages) {
  try {
    const content = readFileSync(page, 'utf-8');
    const lines = content.split('\n').length;
    
    const hasHero = content.includes('h-[400px]') || content.includes('h-[500px]') || content.includes('h-[600px]');
    const hasImage = content.includes('<Image') && content.includes('next/image');
    const hasDB = content.includes('createClient') && content.includes('supabase');
    const hasStorytelling = content.includes('Transform') || content.includes('journey') || content.includes('success');
    const hasCTAs = content.includes('Apply') || content.includes('Get Started') || content.includes('Learn More');
    const substantial = lines > 100;
    
    const score = [hasHero, hasImage, hasDB, hasStorytelling, hasCTAs, substantial].filter(Boolean).length;
    
    if (score >= 5) {
      console.log(`✅ ${page}`);
      console.log(`   Lines: ${lines} | Hero: ${hasHero ? '✅' : '❌'} | Images: ${hasImage ? '✅' : '❌'} | DB: ${hasDB ? '✅' : '❌'} | Story: ${hasStorytelling ? '✅' : '❌'} | CTAs: ${hasCTAs ? '✅' : '❌'}`);
      complete++;
    } else {
      console.log(`⚠️  ${page}`);
      console.log(`   Lines: ${lines} | Hero: ${hasHero ? '✅' : '❌'} | Images: ${hasImage ? '✅' : '❌'} | DB: ${hasDB ? '✅' : '❌'} | Story: ${hasStorytelling ? '✅' : '❌'} | CTAs: ${hasCTAs ? '✅' : '❌'}`);
      needsWork++;
    }
    console.log('');
    
  } catch (error) {
    console.log(`❌ ${page} - NOT FOUND`);
    console.log('');
    needsWork++;
  }
}

console.log('='.repeat(80));
console.log(`Complete: ${complete}/${lmsPages.length}`);
console.log(`Needs Work: ${needsWork}/${lmsPages.length}`);
console.log('='.repeat(80));

