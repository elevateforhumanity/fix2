#!/usr/bin/env node

/**
 * Page Polish Audit Script
 * Scans all pages and checks for common issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.join(__dirname, '../app');

const issues = {
  noMetadata: [],
  noHero: [],
  noH1: [],
  noCTA: [],
  noImage: [],
  duplicateH1: [],
  loremIpsum: [],
  missingAlt: [],
  hardcodedSizes: [],
  noResponsive: [],
};

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = filePath.replace(appDir, '');
  
  // Check for metadata
  if (!content.includes('export const metadata') && !content.includes('Metadata')) {
    issues.noMetadata.push(relativePath);
  }
  
  // Check for H1
  const h1Matches = content.match(/<h1/g);
  if (!h1Matches) {
    issues.noH1.push(relativePath);
  } else if (h1Matches.length > 1) {
    issues.duplicateH1.push(relativePath);
  }
  
  // Check for hero section
  if (!content.includes('hero') && !content.includes('Hero')) {
    issues.noHero.push(relativePath);
  }
  
  // Check for CTA
  if (!content.includes('Apply') && !content.includes('Get Started') && !content.includes('Learn More')) {
    issues.noCTA.push(relativePath);
  }
  
  // Check for images
  if (!content.includes('<Image') && !content.includes('<img')) {
    issues.noImage.push(relativePath);
  }
  
  // Check for lorem ipsum
  if (content.toLowerCase().includes('lorem ipsum')) {
    issues.loremIpsum.push(relativePath);
  }
  
  // Check for missing alt text
  if (content.includes('<Image') && !content.includes('alt=')) {
    issues.missingAlt.push(relativePath);
  }
  
  // Check for hardcoded image sizes
  if (content.includes('width=') && content.includes('height=') && !content.includes('sizes=')) {
    issues.hardcodedSizes.push(relativePath);
  }
  
  // Check for responsive classes
  if (!content.includes('md:') && !content.includes('lg:') && !content.includes('sm:')) {
    issues.noResponsive.push(relativePath);
  }
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules, .next, etc.
      if (!file.startsWith('.') && file !== 'node_modules' && file !== 'api') {
        scanDirectory(filePath);
      }
    } else if (file === 'page.tsx' || file === 'page.ts') {
      scanFile(filePath);
    }
  }
}

console.log('🔍 Scanning pages for polish issues...\n');
scanDirectory(appDir);

console.log('📊 AUDIT RESULTS\n');
console.log('================\n');

let totalIssues = 0;

for (const [issue, files] of Object.entries(issues)) {
  if (files.length > 0) {
    totalIssues += files.length;
    console.log(`❌ ${issue}: ${files.length} pages`);
    if (files.length <= 10) {
      files.forEach(f => console.log(`   - ${f}`));
    } else {
      files.slice(0, 5).forEach(f => console.log(`   - ${f}`));
      console.log(`   ... and ${files.length - 5} more`);
    }
    console.log('');
  }
}

console.log(`\n📈 Total Issues Found: ${totalIssues}`);
console.log(`📄 Total Pages Scanned: ${Object.values(issues).flat().length / Object.keys(issues).length}`);

// Write detailed report
const report = {
  timestamp: new Date().toISOString(),
  totalIssues,
  issues,
};

fs.writeFileSync(
  path.join(__dirname, '../docs/audit-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('\n✅ Detailed report saved to docs/audit-report.json');
