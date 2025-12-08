#!/usr/bin/env node
/**
 * Comprehensive admin page verification
 * Checks for: exports, auth, content, imports, errors
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
  errors: [],
  details: []
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
        console.error(`❌ Cannot access: ${fullPath} - ${err.message}`);
      }
    }
  } catch (err) {
    console.error(`❌ Cannot access directory: ${dir} - ${err.message}`);
  }
  
  return pages;
}

function verifyPage(filePath) {
  results.total++;
  const relativePath = filePath.replace(process.cwd() + '/', '');
  
  try {
    const content = readFileSync(filePath, 'utf-8');
    const issues = [];
    const checks = {
      hasExport: false,
      hasAuth: false,
      hasContent: false,
      hasImports: false,
      hasMetadata: false,
      fileSize: 0
    };
    
    checks.fileSize = content.length;
    
    // Check for export
    if (content.includes('export default')) {
      checks.hasExport = true;
    } else {
      issues.push('Missing default export');
    }
    
    // Check for authentication
    const authPatterns = [
      'requireAdmin',
      'requireAuth',
      'authGuard',
      'getSession',
      'getUser',
      'role === \'admin\'',
      'role !== \'admin\''
    ];
    
    checks.hasAuth = authPatterns.some(pattern => content.includes(pattern));
    if (!checks.hasAuth && !relativePath.includes('/admin/page.tsx')) {
      issues.push('No authentication check found');
    }
    
    // Check for actual content (not just placeholder)
    if (content.includes('return') || content.includes('React')) {
      checks.hasContent = true;
    } else {
      issues.push('No return statement or React content');
    }
    
    // Check for imports
    if (content.includes('import')) {
      checks.hasImports = true;
    } else if (checks.fileSize > 100) {
      issues.push('No imports found (might be incomplete)');
    }
    
    // Check for metadata
    if (content.includes('export const metadata') || content.includes('Metadata')) {
      checks.hasMetadata = true;
    }
    
    // Check for common errors
    if (content.includes('TODO') || content.includes('FIXME')) {
      issues.push('Contains TODO/FIXME comments');
    }
    
    if (content.includes('placeholder') || content.includes('Placeholder')) {
      issues.push('Contains placeholder text');
    }
    
    // File size check
    if (checks.fileSize < 100) {
      issues.push('File too small (< 100 bytes) - likely incomplete');
    }
    
    const isComplete = issues.length === 0 && 
                       checks.hasExport && 
                       checks.hasContent &&
                       checks.fileSize > 100;
    
    if (isComplete) {
      results.complete++;
    } else {
      results.incomplete++;
      results.errors.push({
        file: relativePath,
        issues,
        checks
      });
    }
    
    results.details.push({
      file: relativePath,
      complete: isComplete,
      checks,
      issues
    });
    
  } catch (error) {
    results.incomplete++;
    results.errors.push({
      file: relativePath,
      issues: [`Cannot read file: ${error.message}`],
      checks: {}
    });
  }
}

console.log('🔍 Comprehensive Admin Page Verification\n');
console.log('Checking all admin pages for completeness...\n');

const adminDir = join(__dirname, 'app', 'admin');
const pages = findPageFiles(adminDir);

console.log(`Found ${pages.length} admin page files\n`);
console.log('Verifying each page...\n');

for (const page of pages) {
  verifyPage(page);
}

console.log('\n📊 RESULTS:');
console.log('═══════════════════════════════════════════════════\n');
console.log(`Total Pages:      ${results.total}`);
console.log(`✅ Complete:      ${results.complete} (${Math.round(results.complete/results.total*100)}%)`);
console.log(`❌ Incomplete:    ${results.incomplete} (${Math.round(results.incomplete/results.total*100)}%)`);

if (results.errors.length > 0) {
  console.log('\n\n❌ INCOMPLETE PAGES:\n');
  console.log('═══════════════════════════════════════════════════\n');
  
  for (const error of results.errors) {
    console.log(`📄 ${error.file}`);
    
    if (error.checks.fileSize !== undefined) {
      console.log(`   Size: ${error.checks.fileSize} bytes`);
      console.log(`   Export: ${error.checks.hasExport ? '✅' : '❌'}`);
      console.log(`   Auth: ${error.checks.hasAuth ? '✅' : '⚠️'}`);
      console.log(`   Content: ${error.checks.hasContent ? '✅' : '❌'}`);
      console.log(`   Imports: ${error.checks.hasImports ? '✅' : '❌'}`);
      console.log(`   Metadata: ${error.checks.hasMetadata ? '✅' : '⚠️'}`);
    }
    
    if (error.issues.length > 0) {
      console.log('   Issues:');
      for (const issue of error.issues) {
        console.log(`     • ${issue}`);
      }
    }
    console.log('');
  }
}

// Summary by issue type
console.log('\n📋 ISSUE SUMMARY:\n');
console.log('═══════════════════════════════════════════════════\n');

const issueTypes = {};
for (const error of results.errors) {
  for (const issue of error.issues) {
    issueTypes[issue] = (issueTypes[issue] || 0) + 1;
  }
}

for (const [issue, count] of Object.entries(issueTypes).sort((a, b) => b[1] - a[1])) {
  console.log(`${count.toString().padStart(3)} pages: ${issue}`);
}

console.log('\n✅ Verification complete\n');

// Exit with error if any pages are incomplete
process.exit(results.incomplete > 0 ? 1 : 0);
