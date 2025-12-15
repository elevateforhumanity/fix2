#!/usr/bin/env node
/**
 * Test all admin pages for basic structure and common issues
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const results = {
  total: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
  errors: []
};

function findPageFiles(dir) {
  const pages = [];
  try {
    const items = readdirSync(dir);
    
    for (const item of items) {
      const fullPath = join(dir, item);
      try {
        const stat = statSync(fullPath);
        
        if (stat.isDirectory()) {
          pages.push(...findPageFiles(fullPath));
        } else if (item === 'page.tsx' || item === 'page.js') {
          pages.push(fullPath);
        }
      } catch (err) {
        // Skip files we can't access
      }
    }
  } catch (err) {
    // Skip directories we can't access
  }
  
  return pages;
}

function testPage(filePath) {
  results.total++;
  
  try {
    const content = readFileSync(filePath, 'utf-8');
    const issues = [];
    const warnings = [];
    
    // Check for common issues
    if (!content.includes('export default')) {
      issues.push('Missing default export');
    }
    
    // Check for authentication
    const hasAuth = content.includes('requireAdmin') || 
                    content.includes('requireAuth') ||
                    content.includes('authGuard') ||
                    content.includes('getSession');
    
    if (!hasAuth && !filePath.includes('/admin/page.tsx')) {
      warnings.push('No authentication check found');
    }
    
    // Check for common React patterns
    if (!content.includes('return') && !content.includes('React')) {
      issues.push('No return statement found');
    }
    
    // Check for TypeScript
    if (filePath.endsWith('.tsx') && !content.includes('import') && content.length > 100) {
      warnings.push('No imports found (might be incomplete)');
    }
    
    if (issues.length === 0) {
      results.passed++;
      if (warnings.length > 0) {
        results.warnings++;
      }
    } else {
      results.failed++;
      results.errors.push({
        file: filePath.replace(process.cwd() + '/', ''),
        issues,
        warnings
      });
    }
    
  } catch (error) {
    results.failed++;
    results.errors.push({
      file: filePath.replace(process.cwd() + '/', ''),
      issues: [error.message],
      warnings: []
    });
  }
}

console.log('🔍 Testing Admin Pages...\n');

const adminDir = join(__dirname, 'app', 'admin');
const pages = findPageFiles(adminDir);

console.log(`Found ${pages.length} admin page files\n`);

for (const page of pages) {
  testPage(page);
}

console.log('\n📊 Results:');
console.log(`Total: ${results.total}`);
console.log(`✅ Passed: ${results.passed}`);
console.log(`⚠️  With Warnings: ${results.warnings}`);
console.log(`❌ Failed: ${results.failed}`);

if (results.errors.length > 0) {
  console.log('\n❌ Issues Found:\n');
  for (const error of results.errors.slice(0, 10)) {
    console.log(`  ${error.file}`);
    if (error.issues.length > 0) {
      for (const issue of error.issues) {
        console.log(`    ❌ ${issue}`);
      }
    }
    if (error.warnings.length > 0) {
      for (const warning of error.warnings) {
        console.log(`    ⚠️  ${warning}`);
      }
    }
  }
  
  if (results.errors.length > 10) {
    console.log(`\n  ... and ${results.errors.length - 10} more issues`);
  }
}

console.log('\n✅ Admin page validation complete');
process.exit(results.failed > 0 ? 1 : 0);
