#!/usr/bin/env node

import { readFileSync } from 'fs';

const resourcePages = [
  'app/resources/page.tsx',
  'app/student/resources/page.tsx',
  'app/portal/student/resources/page.tsx',
  'app/lms/resources/page.tsx',
  'app/vita/resources/page.tsx',
  'app/student/courses/[courseId]/resources/page.tsx',
  'app/portal/student/courses/[courseId]/resources/page.tsx',
];

console.log('='.repeat(80));
console.log('RESOURCES PAGES STATUS CHECK');
console.log('='.repeat(80));
console.log('');

let complete = 0;
let needsWork = 0;

for (const page of resourcePages) {
  try {
    const content = readFileSync(page, 'utf-8');
    const lines = content.split('\n').length;
    
    const hasHero = content.includes('h-[300px]') || content.includes('h-[400px]') || 
                    content.includes('h-[500px]') || content.includes('h-[600px]');
    const hasImage = content.includes('<Image') && content.includes('next/image');
    const hasDB = content.includes('createClient') && content.includes('supabase');
    const hasStorytelling = content.includes('Transform') || content.includes('journey') || 
                            content.includes('success') || content.includes('resources');
    const hasCTAs = content.includes('Apply') || content.includes('Get Started') || 
                    content.includes('Learn More') || content.includes('Download');
    const substantial = lines > 100;
    
    const missing = [];
    if (!hasHero) missing.push('hero');
    if (!hasImage) missing.push('images');
    if (!hasDB) missing.push('database');
    if (!hasStorytelling) missing.push('storytelling');
    if (!hasCTAs) missing.push('CTAs');
    if (!substantial) missing.push('content');
    
    if (missing.length === 0) {
      console.log(`✅ ${page}`);
      console.log(`   Lines: ${lines} | All elements present`);
      complete++;
    } else {
      console.log(`⚠️  ${page}`);
      console.log(`   Lines: ${lines} | Missing: ${missing.join(', ')}`);
      console.log(`   Hero: ${hasHero ? '✅' : '❌'} | Images: ${hasImage ? '✅' : '❌'} | DB: ${hasDB ? '✅' : '❌'} | Story: ${hasStorytelling ? '✅' : '❌'} | CTAs: ${hasCTAs ? '✅' : '❌'}`);
      needsWork++;
    }
    console.log('');
    
  } catch (error) {
    console.log(`❌ ${page} - NOT FOUND or ERROR`);
    console.log('');
    needsWork++;
  }
}

console.log('='.repeat(80));
console.log(`✅ Complete: ${complete}/${resourcePages.length}`);
console.log(`⚠️  Needs Work: ${needsWork}/${resourcePages.length}`);
console.log('='.repeat(80));

