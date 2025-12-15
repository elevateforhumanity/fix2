#!/usr/bin/env node
/**
 * Comprehensive Program Page Audit
 * Checks: structure, hero, content, CTAs, metadata, images, mobile
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const results = {
  total: 0,
  complete: 0,
  incomplete: 0,
  issues: [],
  summary: {
    missingHero: [],
    missingMetadata: [],
    missingCTA: [],
    missingContent: [],
    tooShort: [],
    noImages: [],
    noMobileCheck: []
  }
};

const REQUIRED_SECTIONS = [
  'hero',
  'overview',
  'curriculum',
  'outcomes',
  'credentials',
  'tuition',
  'apply'
];

function findProgramPages(dir) {
  const pages = [];
  try {
    const items = readdirSync(dir);
    
    for (const item of items) {
      const fullPath = join(dir, item);
      try {
        const stat = statSync(fullPath);
        
        if (stat.isDirectory() && item !== 'admin') {
          pages.push(...findProgramPages(fullPath));
        } else if (item === 'page.tsx' && !fullPath.includes('/admin/')) {
          pages.push(fullPath);
        }
      } catch (err) {
        console.error(`Cannot access: ${fullPath}`);
      }
    }
  } catch (err) {
    console.error(`Cannot access directory: ${dir}`);
  }
  
  return pages;
}

function auditProgramPage(filePath) {
  results.total++;
  const relativePath = filePath.replace(process.cwd() + '/', '');
  
  try {
    const content = readFileSync(filePath, 'utf-8');
    const issues = [];
    const checks = {
      hasHero: false,
      hasMetadata: false,
      hasCTA: false,
      hasOverview: false,
      hasCurriculum: false,
      hasOutcomes: false,
      hasCredentials: false,
      hasTuition: false,
      hasApply: false,
      hasImages: false,
      hasMobileCheck: false,
      fileSize: content.length,
      sectionCount: 0
    };
    
    // Check for hero section
    const heroPatterns = [
      /hero/i,
      /banner/i,
      /HeroSection/,
      /className.*hero/i
    ];
    checks.hasHero = heroPatterns.some(p => p.test(content));
    if (!checks.hasHero) {
      issues.push('Missing hero section');
      results.summary.missingHero.push(relativePath);
    }
    
    // Check for metadata
    if (content.includes('export const metadata') || content.includes('Metadata')) {
      checks.hasMetadata = true;
    } else {
      issues.push('Missing metadata');
      results.summary.missingMetadata.push(relativePath);
    }
    
    // Check for CTA (Call to Action)
    const ctaPatterns = [
      /apply/i,
      /enroll/i,
      /get started/i,
      /sign up/i,
      /Button.*href/i
    ];
    checks.hasCTA = ctaPatterns.some(p => p.test(content));
    if (!checks.hasCTA) {
      issues.push('Missing CTA buttons');
      results.summary.missingCTA.push(relativePath);
    }
    
    // Check for content sections
    if (content.match(/overview|about|description/i)) {
      checks.hasOverview = true;
      checks.sectionCount++;
    }
    
    if (content.match(/curriculum|courses|modules|lessons/i)) {
      checks.hasCurriculum = true;
      checks.sectionCount++;
    }
    
    if (content.match(/outcomes|career|jobs|employment|salary/i)) {
      checks.hasOutcomes = true;
      checks.sectionCount++;
    }
    
    if (content.match(/credential|certificate|certification|license/i)) {
      checks.hasCredentials = true;
      checks.sectionCount++;
    }
    
    if (content.match(/tuition|cost|price|funding|financial/i)) {
      checks.hasTuition = true;
      checks.sectionCount++;
    }
    
    if (content.match(/apply|enroll|admission|register/i)) {
      checks.hasApply = true;
      checks.sectionCount++;
    }
    
    // Check for images
    if (content.match(/Image|img|picture|photo/i)) {
      checks.hasImages = true;
    } else {
      issues.push('No images found');
      results.summary.noImages.push(relativePath);
    }
    
    // Check for mobile responsiveness
    if (content.match(/md:|lg:|sm:|mobile|responsive|breakpoint/i)) {
      checks.hasMobileCheck = true;
    } else {
      issues.push('No mobile responsiveness classes');
      results.summary.noMobileCheck.push(relativePath);
    }
    
    // File size check
    if (checks.fileSize < 1000) {
      issues.push('File too small (< 1000 bytes) - likely incomplete');
      results.summary.tooShort.push(relativePath);
    }
    
    // Content completeness
    if (checks.sectionCount < 4) {
      issues.push(`Only ${checks.sectionCount}/6 content sections found`);
      results.summary.missingContent.push(relativePath);
    }
    
    const isComplete = issues.length === 0 && 
                       checks.hasHero && 
                       checks.hasMetadata &&
                       checks.hasCTA &&
                       checks.sectionCount >= 4;
    
    if (isComplete) {
      results.complete++;
    } else {
      results.incomplete++;
      results.issues.push({
        file: relativePath,
        issues,
        checks,
        score: Math.round((checks.sectionCount / 6) * 100)
      });
    }
    
  } catch (error) {
    results.incomplete++;
    results.issues.push({
      file: relativePath,
      issues: [`Cannot read file: ${error.message}`],
      checks: {},
      score: 0
    });
  }
}

console.log('🔍 COMPREHENSIVE PROGRAM PAGE AUDIT\n');
console.log('═══════════════════════════════════════════════════\n');

const programsDir = join(__dirname, 'app', 'programs');
const pages = findProgramPages(programsDir);

console.log(`Found ${pages.length} program pages\n`);
console.log('Auditing each page...\n');

for (const page of pages) {
  auditProgramPage(page);
}

console.log('\n📊 AUDIT RESULTS:');
console.log('═══════════════════════════════════════════════════\n');
console.log(`Total Pages:      ${results.total}`);
console.log(`✅ Complete:      ${results.complete} (${Math.round(results.complete/results.total*100)}%)`);
console.log(`❌ Incomplete:    ${results.incomplete} (${Math.round(results.incomplete/results.total*100)}%)`);

console.log('\n\n📋 ISSUES BY TYPE:');
console.log('═══════════════════════════════════════════════════\n');
console.log(`Missing Hero Section:     ${results.summary.missingHero.length} pages`);
console.log(`Missing Metadata:         ${results.summary.missingMetadata.length} pages`);
console.log(`Missing CTA Buttons:      ${results.summary.missingCTA.length} pages`);
console.log(`Incomplete Content:       ${results.summary.missingContent.length} pages`);
console.log(`Too Short (< 1KB):        ${results.summary.tooShort.length} pages`);
console.log(`No Images:                ${results.summary.noImages.length} pages`);
console.log(`No Mobile Classes:        ${results.summary.noMobileCheck.length} pages`);

if (results.issues.length > 0) {
  console.log('\n\n❌ INCOMPLETE PAGES (sorted by score):');
  console.log('═══════════════════════════════════════════════════\n');
  
  // Sort by score (lowest first)
  results.issues.sort((a, b) => a.score - b.score);
  
  for (const issue of results.issues) {
    console.log(`📄 ${issue.file}`);
    console.log(`   Score: ${issue.score}%`);
    
    if (issue.checks.sectionCount !== undefined) {
      console.log(`   Sections: ${issue.checks.sectionCount}/6`);
      console.log(`   Size: ${issue.checks.fileSize} bytes`);
      console.log(`   Hero: ${issue.checks.hasHero ? '✅' : '❌'}`);
      console.log(`   Metadata: ${issue.checks.hasMetadata ? '✅' : '❌'}`);
      console.log(`   CTA: ${issue.checks.hasCTA ? '✅' : '❌'}`);
      console.log(`   Images: ${issue.checks.hasImages ? '✅' : '❌'}`);
      console.log(`   Mobile: ${issue.checks.hasMobileCheck ? '✅' : '❌'}`);
    }
    
    if (issue.issues.length > 0) {
      console.log('   Issues:');
      for (const iss of issue.issues) {
        console.log(`     • ${iss}`);
      }
    }
    console.log('');
  }
}

console.log('\n✅ Audit complete\n');

process.exit(results.incomplete > 0 ? 1 : 0);
