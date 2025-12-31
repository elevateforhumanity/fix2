#!/usr/bin/env node
/**
 * Fix Remaining Pages
 * Handles the 167 pages that need database but don't have it yet
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

console.log('🔧 Fix Remaining Pages');
console.log('======================\n');

const BACKUP_DIR = '.page-backups-remaining';
const LOG_FILE = 'fix-remaining-pages-log.txt';
let log = `Fix Remaining Pages Log - ${new Date().toISOString()}\n${'='.repeat(60)}\n\n`;

let stats = {
  total: 0,
  updated: 0,
  skipped: 0,
  errors: 0,
  alreadyUsingDB: 0,
  staticContent: 0,
};

if (!existsSync(BACKUP_DIR)) {
  mkdirSync(BACKUP_DIR, { recursive: true });
}

function backupFile(filePath) {
  const backupPath = `${BACKUP_DIR}/${filePath.replace(/\//g, '_')}`;
  const content = readFileSync(filePath, 'utf8');
  writeFileSync(backupPath, content);
}

function isStaticPage(content) {
  // Check if page is purely static (no data display)
  const hasDataDisplay = content.match(/\.map\(|\.filter\(|\.length|\.forEach\(/);
  const hasHardcodedData = content.match(/const\s+\w+\s*=\s*\[/);
  
  return !hasDataDisplay && !hasHardcodedData;
}

function needsDatabaseUpdate(filePath, content) {
  // Skip if already using Supabase properly
  if (content.includes('createClient') && content.includes('await supabase')) {
    return false;
  }
  
  // Skip static pages
  if (isStaticPage(content)) {
    return false;
  }
  
  // Skip form-only pages
  if (content.includes('<form') && !content.match(/\.map\(|\.filter\(/)) {
    return false;
  }
  
  // Skip utility pages
  const utilityPages = ['login', 'signup', 'forgot', 'reset', 'verify', 'unauthorized', 'offline'];
  if (utilityPages.some(page => filePath.includes(page))) {
    return false;
  }
  
  return true;
}

function fixPage(filePath) {
  stats.total++;
  
  try {
    if (!existsSync(filePath)) {
      stats.errors++;
      return false;
    }

    let content = readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Check if needs update
    if (!needsDatabaseUpdate(filePath, content)) {
      if (content.includes('createClient')) {
        log += `✓ Already using database: ${filePath}\n`;
        stats.alreadyUsingDB++;
      } else if (isStaticPage(content)) {
        log += `ℹ Static content: ${filePath}\n`;
        stats.staticContent++;
      } else {
        log += `⏭️  Skipped: ${filePath}\n`;
        stats.skipped++;
      }
      return false;
    }

    backupFile(filePath);
    let changes = [];

    // Add Supabase import
    if (!content.includes("import { createClient } from '@/lib/supabase/server'")) {
      const importStatement = "import { createClient } from '@/lib/supabase/server';\n";
      const lastImportMatch = content.match(/import[^;]+;/g);
      
      if (lastImportMatch) {
        const lastImport = lastImportMatch[lastImportMatch.length - 1];
        const insertIndex = content.indexOf(lastImport) + lastImport.length;
        content = content.slice(0, insertIndex) + '\n' + importStatement + content.slice(insertIndex);
      } else {
        content = importStatement + '\n' + content;
      }
      changes.push('Added Supabase import');
    }

    // Convert to async
    if (content.includes('export default function') && !content.includes('export default async function')) {
      content = content.replace(/export default function/g, 'export default async function');
      changes.push('Converted to async');
    }

    // Add Supabase client
    const functionMatch = content.match(/export default async function \w+\([^)]*\) \{/);
    if (functionMatch && !content.includes('const supabase = createClient()')) {
      const insertPoint = functionMatch.index + functionMatch[0].length;
      content = content.slice(0, insertPoint) + '\n  const supabase = createClient();\n' + content.slice(insertPoint);
      changes.push('Added Supabase client');
    }

    // Fix common hardcoded patterns
    const patterns = [
      { regex: /const\s+data\s*=\s*\[[^\]]*\];?/gs, replacement: "const { data } = await supabase.from('data').select('*');" },
      { regex: /const\s+items\s*=\s*\[[^\]]*\];?/gs, replacement: "const { data: items } = await supabase.from('items').select('*');" },
      { regex: /const\s+list\s*=\s*\[[^\]]*\];?/gs, replacement: "const { data: list } = await supabase.from('list').select('*');" },
    ];

    for (const pattern of patterns) {
      if (pattern.regex.test(content)) {
        content = content.replace(pattern.regex, pattern.replacement);
        changes.push('Fixed hardcoded array');
      }
    }

    // Add null safety
    if (changes.length > 0) {
      content = content.replace(/(\w+)\.map\(/g, '$1?.map(');
      content = content.replace(/(\w+)\.filter\(/g, '$1?.filter(');
      content = content.replace(/(\w+)\.length(?!\?)/g, '$1?.length ?? 0');
    }

    if (content !== originalContent) {
      writeFileSync(filePath, content);
      log += `✅ Updated: ${filePath}\n   Changes: ${changes.join(', ')}\n\n`;
      stats.updated++;
      return true;
    } else {
      stats.skipped++;
      return false;
    }

  } catch (error) {
    log += `❌ Error: ${filePath}\n   ${error.message}\n\n`;
    stats.errors++;
    return false;
  }
}

// Find all page.tsx files recursively
function findAllPages(dir, fileList = []) {
  const files = readdirSync(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and hidden directories
      if (!file.startsWith('.') && file !== 'node_modules') {
        findAllPages(filePath, fileList);
      }
    } else if (file === 'page.tsx' || file === 'page.ts') {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

// Find all pages
console.log('Finding all pages...');
const allPages = findAllPages('app');
console.log(`Found ${allPages.length} pages\n`);

// Filter to pages that need updates
console.log('Analyzing pages...');
const pagesToFix = allPages.filter(page => {
  try {
    const content = readFileSync(page, 'utf8');
    return needsDatabaseUpdate(page, content);
  } catch {
    return false;
  }
});

console.log(`${pagesToFix.length} pages need database updates\n`);
console.log('Processing...\n');

// Process pages
let processed = 0;
for (const page of pagesToFix) {
  processed++;
  if (processed % 10 === 0) {
    console.log(`Processed ${processed}/${pagesToFix.length}...`);
  }
  fixPage(page);
}

// Save log
writeFileSync(LOG_FILE, log);

// Summary
console.log('\n' + '='.repeat(60));
console.log('✅ Fix Remaining Pages Complete\n');
console.log('Statistics:');
console.log(`  Total analyzed: ${stats.total}`);
console.log(`  Updated: ${stats.updated}`);
console.log(`  Already using DB: ${stats.alreadyUsingDB}`);
console.log(`  Static content: ${stats.staticContent}`);
console.log(`  Skipped: ${stats.skipped}`);
console.log(`  Errors: ${stats.errors}\n`);

console.log('Next steps:');
console.log('1. Review: git diff');
console.log('2. Test: pnpm dev');
console.log('3. Type check: pnpm type-check');
console.log('4. Commit changes\n');

console.log(`📝 Log: ${LOG_FILE}`);
console.log(`📦 Backups: ${BACKUP_DIR}/\n`);
