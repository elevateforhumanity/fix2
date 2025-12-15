#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

let total = 0;
let fullyIntegrated = 0;
let needsWork = 0;

const issues = {
  noDatabase: [],
  noImages: [],
  noHero: [],
  noCTAs: [],
  noStorytelling: [],
  tooShort: []
};

function checkIntegration(filePath) {
  total++;
  
  try {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').length;
    const relativePath = filePath.replace('app/', '/').replace('/page.tsx', '');
    
    // Check all integration points
    const checks = {
      hasDatabase: content.includes('createClient') && content.includes('supabase'),
      hasImages: content.includes('<Image') && content.includes('next/image'),
      hasHero: content.includes('h-[400px]') || content.includes('h-[500px]') || content.includes('h-[600px]'),
      hasCTAs: content.includes('Apply') || content.includes('Get Started') || content.includes('Learn More'),
      hasStorytelling: content.length > 2000 && (content.includes('Transform') || content.includes('journey') || content.includes('career')),
      isSubstantial: lines > 100
    };
    
    // Determine if needs database
    const needsDB = filePath.includes('/admin/') || 
                    filePath.includes('/portal/') ||
                    filePath.includes('/student/') ||
                    filePath.includes('/lms/') ||
                    filePath.includes('/dashboard');
    
    // Track issues
    if (needsDB && !checks.hasDatabase) issues.noDatabase.push(relativePath);
    if (!checks.hasImages) issues.noImages.push(relativePath);
    if (!checks.hasHero) issues.noHero.push(relativePath);
    if (!checks.hasCTAs) issues.noCTAs.push(relativePath);
    if (!checks.hasStorytelling) issues.noStorytelling.push(relativePath);
    if (!checks.isSubstantial) issues.tooShort.push(relativePath);
    
    // Count as fully integrated if all applicable checks pass
    const requiredChecks = needsDB ? 
      [checks.hasDatabase, checks.hasImages, checks.hasHero, checks.hasCTAs, checks.isSubstantial] :
      [checks.hasImages, checks.hasHero, checks.hasCTAs, checks.isSubstantial];
    
    if (requiredChecks.every(Boolean)) {
      fullyIntegrated++;
    } else {
      needsWork++;
    }
    
  } catch (error) {
    needsWork++;
  }
}

function scanDirectory(dir) {
  try {
    const items = readdirSync(dir);
    
    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanDirectory(fullPath);
      } else if (item === 'page.tsx') {
        checkIntegration(fullPath);
      }
    }
  } catch (error) {
    // Skip
  }
}

console.log('🔍 FINAL INTEGRATION CHECK');
console.log('='.repeat(80));
console.log('Checking all pages for full integration...\n');

scanDirectory('app');

console.log('='.repeat(80));
console.log('INTEGRATION REPORT');
console.log('='.repeat(80));
console.log(`Total Pages: ${total}`);
console.log(`✅ Fully Integrated: ${fullyIntegrated} (${Math.round(fullyIntegrated/total*100)}%)`);
console.log(`⚠️  Needs Work: ${needsWork} (${Math.round(needsWork/total*100)}%)`);
console.log('');

if (issues.noDatabase.length > 0) {
  console.log(`❌ Missing Database (${issues.noDatabase.length} pages):`);
  issues.noDatabase.slice(0, 10).forEach(p => console.log(`   ${p}`));
  if (issues.noDatabase.length > 10) console.log(`   ... and ${issues.noDatabase.length - 10} more`);
  console.log('');
}

if (issues.noImages.length > 0) {
  console.log(`❌ Missing Images (${issues.noImages.length} pages):`);
  issues.noImages.slice(0, 10).forEach(p => console.log(`   ${p}`));
  if (issues.noImages.length > 10) console.log(`   ... and ${issues.noImages.length - 10} more`);
  console.log('');
}

if (issues.noHero.length > 0) {
  console.log(`❌ Missing Hero (${issues.noHero.length} pages):`);
  issues.noHero.slice(0, 10).forEach(p => console.log(`   ${p}`));
  if (issues.noHero.length > 10) console.log(`   ... and ${issues.noHero.length - 10} more`);
  console.log('');
}

if (issues.noCTAs.length > 0) {
  console.log(`❌ Missing CTAs (${issues.noCTAs.length} pages):`);
  issues.noCTAs.slice(0, 10).forEach(p => console.log(`   ${p}`));
  if (issues.noCTAs.length > 10) console.log(`   ... and ${issues.noCTAs.length - 10} more`);
  console.log('');
}

console.log('='.repeat(80));
if (needsWork === 0) {
  console.log('🎉 ALL PAGES FULLY INTEGRATED!');
} else {
  console.log(`⚠️  ${needsWork} pages need integration work`);
}

