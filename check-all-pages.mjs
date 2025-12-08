#!/usr/bin/env node

/**
 * Check All Pages - Comprehensive page audit
 * Checks for duplicate content, missing data, and placeholder text
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname);

console.log('🔍 Checking All Pages...\n');

const results = {
  totalPages: 0,
  uniqueContent: [],
  placeholderContent: [],
  missingMetadata: [],
  duplicateHero: [],
  genericSymbols: []
};

// Patterns to detect placeholder content
const placeholderPatterns = [
  /discover opportunities for career growth/i,
  /Explore .* and discover/i,
  /image8\.jpg/,
  /gallery\/image/
];

function checkPage(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = filePath.replace(rootDir + '/app', '');
    
    results.totalPages++;
    
    // Check for placeholder text
    let hasPlaceholder = false;
    for (const pattern of placeholderPatterns) {
      if (pattern.test(content)) {
        hasPlaceholder = true;
        break;
      }
    }
    
    if (hasPlaceholder) {
      results.placeholderContent.push(relativePath);
    } else {
      results.uniqueContent.push(relativePath);
    }
    
    // Check for missing metadata
    if (!content.includes('export const metadata') && !content.includes('export const dynamic')) {
      results.missingMetadata.push(relativePath);
    }
    
    // Check for duplicate hero images
    if (content.includes('image8.jpg') || content.includes('gallery/image')) {
      results.duplicateHero.push(relativePath);
    }
    
    // Check for generic symbols (SVG icons instead of images)
    if (content.includes('<svg') && content.includes('viewBox') && !content.includes('<Image')) {
      const svgCount = (content.match(/<svg/g) || []).length;
      const imageCount = (content.match(/<Image/g) || []).length;
      if (svgCount > imageCount) {
        results.genericSymbols.push(relativePath);
      }
    }
    
  } catch (error) {
    console.error(`Error checking ${filePath}: ${error.message}`);
  }
}

function scanDirectory(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      // Skip certain directories
      if (['api', 'components', '_components'].includes(item.name)) {
        continue;
      }
      scanDirectory(fullPath);
    } else if (item.name === 'page.tsx' || item.name === 'page.ts') {
      checkPage(fullPath);
    }
  }
}

// Start scanning
console.log('Scanning app directory...\n');
scanDirectory(path.join(rootDir, 'app'));

// Print results
console.log('='.repeat(70));
console.log('📊 PAGE AUDIT RESULTS');
console.log('='.repeat(70) + '\n');

console.log(`Total Pages: ${results.totalPages}\n`);

console.log(`✅ Unique Content: ${results.uniqueContent.length} pages (${Math.round(results.uniqueContent.length / results.totalPages * 100)}%)`);
if (results.uniqueContent.length > 0 && results.uniqueContent.length <= 20) {
  results.uniqueContent.forEach(page => console.log(`   ${page}`));
}
console.log('');

console.log(`⚠️  Placeholder Content: ${results.placeholderContent.length} pages (${Math.round(results.placeholderContent.length / results.totalPages * 100)}%)`);
if (results.placeholderContent.length > 0 && results.placeholderContent.length <= 30) {
  results.placeholderContent.forEach(page => console.log(`   ${page}`));
} else if (results.placeholderContent.length > 30) {
  results.placeholderContent.slice(0, 30).forEach(page => console.log(`   ${page}`));
  console.log(`   ... and ${results.placeholderContent.length - 30} more`);
}
console.log('');

console.log(`❌ Duplicate Hero Images: ${results.duplicateHero.length} pages`);
if (results.duplicateHero.length > 0 && results.duplicateHero.length <= 20) {
  results.duplicateHero.forEach(page => console.log(`   ${page}`));
} else if (results.duplicateHero.length > 20) {
  results.duplicateHero.slice(0, 20).forEach(page => console.log(`   ${page}`));
  console.log(`   ... and ${results.duplicateHero.length - 20} more`);
}
console.log('');

console.log(`🔶 Generic Symbols (SVG instead of images): ${results.genericSymbols.length} pages`);
if (results.genericSymbols.length > 0 && results.genericSymbols.length <= 20) {
  results.genericSymbols.forEach(page => console.log(`   ${page}`));
} else if (results.genericSymbols.length > 20) {
  results.genericSymbols.slice(0, 20).forEach(page => console.log(`   ${page}`));
  console.log(`   ... and ${results.genericSymbols.length - 20} more`);
}
console.log('');

// Summary
console.log('='.repeat(70));
console.log('📈 SUMMARY');
console.log('='.repeat(70) + '\n');

const uniquePercent = Math.round(results.uniqueContent.length / results.totalPages * 100);
const placeholderPercent = Math.round(results.placeholderContent.length / results.totalPages * 100);

if (uniquePercent >= 80) {
  console.log('✅ EXCELLENT: Most pages have unique content');
} else if (uniquePercent >= 50) {
  console.log('⚠️  GOOD: Many pages have unique content, but some need work');
} else if (uniquePercent >= 20) {
  console.log('⚠️  FAIR: Significant number of pages need unique content');
} else {
  console.log('❌ NEEDS WORK: Most pages have placeholder content');
}

console.log('');
console.log('Priority Actions:');
console.log('1. Update pages with placeholder content');
console.log('2. Replace duplicate hero images with unique ones');
console.log('3. Replace generic symbols with actual photos');
console.log('4. Add proper metadata to all pages');
console.log('');

// Save detailed report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalPages: results.totalPages,
    uniqueContent: results.uniqueContent.length,
    placeholderContent: results.placeholderContent.length,
    duplicateHero: results.duplicateHero.length,
    genericSymbols: results.genericSymbols.length,
    uniquePercent,
    placeholderPercent
  },
  pages: {
    uniqueContent: results.uniqueContent,
    placeholderContent: results.placeholderContent,
    duplicateHero: results.duplicateHero,
    genericSymbols: results.genericSymbols
  }
};

fs.writeFileSync('page-audit-report.json', JSON.stringify(report, null, 2));
console.log('📄 Detailed report saved to: page-audit-report.json\n');
