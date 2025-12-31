#!/usr/bin/env node
/**
 * Safe Fix All Pages
 * Carefully updates pages to use database without breaking syntax
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';

console.log('🔧 Safe Fix All Pages');
console.log('=====================\n');

const BACKUP_DIR = '.page-backups-safe';
if (!existsSync(BACKUP_DIR)) {
  mkdirSync(BACKUP_DIR, { recursive: true });
}

let stats = { total: 0, updated: 0, skipped: 0 };

function backupFile(filePath) {
  const backupPath = `${BACKUP_DIR}/${filePath.replace(/\//g, '_')}`;
  const content = readFileSync(filePath, 'utf8');
  writeFileSync(backupPath, content);
}

function safeFix(filePath) {
  stats.total++;
  
  try {
    if (!existsSync(filePath)) {
      stats.skipped++;
      return false;
    }

    let content = readFileSync(filePath, 'utf8');
    const original = content;

    // Skip if already using Supabase
    if (content.includes('createClient') && content.includes('await supabase')) {
      stats.skipped++;
      return false;
    }

    // Skip if no hardcoded data
    if (!content.match(/const\s+\w+\s*=\s*\[/) && !content.includes('mock')) {
      stats.skipped++;
      return false;
    }

    backupFile(filePath);

    // Step 1: Remove mock imports
    content = content.replace(/import.*mock.*from.*['"].*['"];?\n/gi, '');

    // Step 2: Add Supabase import (only if not present)
    if (!content.includes("from '@/lib/supabase/server'")) {
      const importLine = "import { createClient } from '@/lib/supabase/server';\n";
      
      // Find last import
      const imports = content.match(/import[^;]+;/g);
      if (imports && imports.length > 0) {
        const lastImport = imports[imports.length - 1];
        const insertPos = content.indexOf(lastImport) + lastImport.length;
        content = content.slice(0, insertPos) + '\n' + importLine + content.slice(insertPos);
      } else {
        content = importLine + '\n' + content;
      }
    }

    // Step 3: Convert to async (only if not already)
    if (content.includes('export default function') && !content.includes('export default async function')) {
      content = content.replace('export default function', 'export default async function');
    }

    // Step 4: Add Supabase client (only if not present)
    const funcMatch = content.match(/export default async function \w+\([^)]*\) \{/);
    if (funcMatch && !content.includes('createClient()')) {
      const insertPos = funcMatch.index + funcMatch[0].length;
      content = content.slice(0, insertPos) + '\n  const supabase: any = createClient();\n' + content.slice(insertPos);
    }

    // Step 5: Replace specific hardcoded arrays (be very specific)
    const replacements = [
      {
        pattern: /const upcomingEvents = \[[^\]]*\];/s,
        replacement: "const { data: upcomingEvents }: any = await supabase.from('events').select('*').gte('date', new Date().toISOString()).order('date');"
      },
      {
        pattern: /const events = \[[^\]]*\];/s,
        replacement: "const { data: events }: any = await supabase.from('events').select('*').order('date');"
      },
      {
        pattern: /const courses = \[[^\]]*\];/s,
        replacement: "const { data: courses }: any = await supabase.from('courses').select('*').eq('active', true).order('order_index');"
      },
      {
        pattern: /const programs = \[[^\]]*\];/s,
        replacement: "const { data: programs }: any = await supabase.from('programs').select('*').eq('active', true).order('name');"
      },
    ];

    for (const { pattern, replacement } of replacements) {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
      }
    }

    if (content !== original) {
      writeFileSync(filePath, content);
      console.log(`✅ ${filePath}`);
      stats.updated++;
      return true;
    }

    stats.skipped++;
    return false;

  } catch (error) {
    console.error(`❌ ${filePath}: ${error.message}`);
    stats.skipped++;
    return false;
  }
}

// Target specific files that we know need fixing
const filesToFix = [
  'app/events/page.tsx',
  'app/admin/editor/page.tsx',
  'app/drug-testing-training/page.tsx',
  'app/volunteer/page.tsx',
];

console.log(`Processing ${filesToFix.length} files...\n`);

for (const file of filesToFix) {
  safeFix(file);
}

console.log('\n' + '='.repeat(60));
console.log(`✅ Complete: ${stats.updated} updated, ${stats.skipped} skipped\n`);
