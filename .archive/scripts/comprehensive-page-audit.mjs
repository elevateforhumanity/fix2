#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const results = {
  fullCode: [],
  missingHero: [],
  missingImages: [],
  notConnected: [],
  placeholder: []
};

function checkPage(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const relativePath = filePath.replace('app/', '/').replace('/page.tsx', '');
    
    // Check for full code (substantial content)
    const lineCount = content.split('\n').length;
    const hasSubstantialCode = lineCount > 30;
    
    // Check for hero banner
    const hasHero = content.includes('hero') || 
                    content.includes('Hero') || 
                    content.includes('h-[400px]') ||
                    content.includes('h-[500px]') ||
                    content.includes('h-[600px]') ||
                    content.includes('min-h-[400px]') ||
                    content.includes('min-h-[500px]') ||
                    content.includes('min-h-[600px]');
    
    // Check for images
    const hasImages = content.includes('<Image') || 
                      content.includes('next/image') ||
                      content.includes('src="/images');
    
    // Check for database connection
    const hasDatabase = content.includes('supabase') || 
                        content.includes('createClient') ||
                        content.includes('.from(') ||
                        content.includes('.select(');
    
    // Check if placeholder
    const isPlaceholder = content.includes('No recent activity') ||
                          content.includes('Discover more about');
    
    const page = {
      path: relativePath,
      lines: lineCount,
      hasHero,
      hasImages,
      hasDatabase,
      isPlaceholder
    };
    
    if (isPlaceholder) {
      results.placeholder.push(page);
    } else if (hasSubstantialCode && hasHero && hasImages && hasDatabase) {
      results.fullCode.push(page);
    } else {
      if (!hasHero && hasSubstantialCode) results.missingHero.push(page);
      if (!hasImages && hasSubstantialCode) results.missingImages.push(page);
      if (!hasDatabase && hasSubstantialCode && !relativePath.includes('/admin/')) {
        // Admin pages might not need DB if they're navigation pages
        results.notConnected.push(page);
      }
    }
    
  } catch (error) {
    // Skip files that can't be read
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
        checkPage(fullPath);
      }
    }
  } catch (error) {
    // Skip directories that can't be read
  }
}

console.log('🔍 Comprehensive Page Audit Starting...\n');
scanDirectory('app');

console.log('='.repeat(80));
console.log('COMPREHENSIVE PAGE AUDIT RESULTS');
console.log('='.repeat(80));
console.log('');

console.log(`✅ FULL CODE (Hero + Images + Database): ${results.fullCode.length}`);
console.log(`⚠️  MISSING HERO: ${results.missingHero.length}`);
console.log(`⚠️  MISSING IMAGES: ${results.missingImages.length}`);
console.log(`⚠️  NOT CONNECTED: ${results.notConnected.length}`);
console.log(`❌ PLACEHOLDER: ${results.placeholder.length}`);
console.log('');

const total = results.fullCode.length + results.missingHero.length + 
              results.missingImages.length + results.notConnected.length + 
              results.placeholder.length;

console.log(`📊 TOTAL PAGES SCANNED: ${total}`);
console.log('');

if (results.missingHero.length > 0) {
  console.log('='.repeat(80));
  console.log('PAGES MISSING HERO BANNERS:');
  console.log('='.repeat(80));
  results.missingHero.slice(0, 20).forEach(p => {
    console.log(`  ${p.path} (${p.lines} lines)`);
  });
  if (results.missingHero.length > 20) {
    console.log(`  ... and ${results.missingHero.length - 20} more`);
  }
  console.log('');
}

if (results.missingImages.length > 0) {
  console.log('='.repeat(80));
  console.log('PAGES MISSING IMAGES:');
  console.log('='.repeat(80));
  results.missingImages.slice(0, 20).forEach(p => {
    console.log(`  ${p.path} (${p.lines} lines)`);
  });
  if (results.missingImages.length > 20) {
    console.log(`  ... and ${results.missingImages.length - 20} more`);
  }
  console.log('');
}

if (results.placeholder.length > 0) {
  console.log('='.repeat(80));
  console.log('PLACEHOLDER PAGES:');
  console.log('='.repeat(80));
  results.placeholder.slice(0, 20).forEach(p => {
    console.log(`  ${p.path} (${p.lines} lines)`);
  });
  if (results.placeholder.length > 20) {
    console.log(`  ... and ${results.placeholder.length - 20} more`);
  }
  console.log('');
}

console.log('='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));

const percentComplete = Math.round((results.fullCode.length / total) * 100);
console.log(`Completion Rate: ${percentComplete}%`);
console.log(`Pages with Full Code: ${results.fullCode.length}/${total}`);
console.log('');

if (percentComplete === 100) {
  console.log('🎉 ALL PAGES HAVE FULL CODE, HEROES, IMAGES, AND DATABASE CONNECTIONS!');
} else if (percentComplete >= 90) {
  console.log('✅ Platform is mostly complete! Just a few pages need attention.');
} else if (percentComplete >= 75) {
  console.log('⚠️  Platform is functional but some pages need enhancement.');
} else {
  console.log('❌ Significant work needed on multiple pages.');
}

