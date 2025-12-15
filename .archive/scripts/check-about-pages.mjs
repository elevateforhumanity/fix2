#!/usr/bin/env node

import { readFileSync } from 'fs';

const aboutPages = [
  'app/about/page.tsx',
  'app/about/team/page.tsx',
];

console.log('='.repeat(80));
console.log('ABOUT PAGES STATUS CHECK');
console.log('='.repeat(80));
console.log('');

let complete = 0;
let needsWork = 0;

for (const page of aboutPages) {
  try {
    const content = readFileSync(page, 'utf-8');
    const lines = content.split('\n').length;
    
    const hasHero = content.includes('h-[300px]') || content.includes('h-[400px]') || 
                    content.includes('h-[500px]') || content.includes('h-[600px]') ||
                    content.includes('min-h-[400px]');
    const hasImage = content.includes('<Image') && content.includes('next/image');
    const hasMultipleImages = (content.match(/<Image/g) || []).length >= 2;
    const hasStorytelling = (content.includes('mission') || content.includes('story') || 
                            content.includes('journey') || content.includes('vision')) &&
                            content.length > 3000;
    const hasCTAs = content.includes('Apply') || content.includes('Get Started') || 
                    content.includes('Learn More') || content.includes('Contact');
    const hasTeamInfo = content.includes('team') || content.includes('staff') || 
                        content.includes('leadership');
    const substantial = lines > 150;
    
    const missing = [];
    if (!hasHero) missing.push('hero');
    if (!hasImage) missing.push('images');
    if (!hasMultipleImages) missing.push('multiple-images');
    if (!hasStorytelling) missing.push('storytelling');
    if (!hasCTAs) missing.push('CTAs');
    if (!substantial) missing.push('content');
    
    console.log(`${missing.length === 0 ? '✅' : '⚠️ '} ${page}`);
    console.log(`   Lines: ${lines}`);
    console.log(`   Hero: ${hasHero ? '✅' : '❌'} | Images: ${hasImage ? '✅' : '❌'} (${(content.match(/<Image/g) || []).length} total)`);
    console.log(`   Storytelling: ${hasStorytelling ? '✅' : '❌'} | CTAs: ${hasCTAs ? '✅' : '❌'} | Team Info: ${hasTeamInfo ? '✅' : '❌'}`);
    if (missing.length > 0) {
      console.log(`   Missing: ${missing.join(', ')}`);
      needsWork++;
    } else {
      complete++;
    }
    console.log('');
    
  } catch (error) {
    console.log(`❌ ${page} - ERROR: ${error.message}`);
    console.log('');
    needsWork++;
  }
}

console.log('='.repeat(80));
console.log(`✅ Complete: ${complete}/${aboutPages.length}`);
console.log(`⚠️  Needs Work: ${needsWork}/${aboutPages.length}`);
console.log('='.repeat(80));

