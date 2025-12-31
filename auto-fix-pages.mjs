#!/usr/bin/env node
/**
 * Auto-Fix Pages Script
 * Automatically updates pages from hardcoded data to database queries
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';

console.log('🔧 Auto-Fix Pages Script');
console.log('========================\n');

const BACKUP_DIR = '.page-backups-auto';
const LOG_FILE = 'auto-fix-log.txt';
let log = `Auto-Fix Log - ${new Date().toISOString()}\n${'='.repeat(50)}\n\n`;

// Create backup directory
if (!existsSync(BACKUP_DIR)) {
  mkdirSync(BACKUP_DIR, { recursive: true });
}

// Backup file
function backupFile(filePath) {
  const backupPath = `${BACKUP_DIR}/${filePath.replace(/\//g, '_')}`;
  const content = readFileSync(filePath, 'utf8');
  writeFileSync(backupPath, content);
  log += `📦 Backed up: ${filePath}\n`;
}

// Update file with database query
function updateFile(filePath, updateType) {
  try {
    backupFile(filePath);
    let content = readFileSync(filePath, 'utf8');
    let updated = false;
    const originalContent = content;

    // Check if already using Supabase
    if (content.includes('createClient') || content.includes('supabase')) {
      log += `⏭️  Skipped (already using database): ${filePath}\n\n`;
      return false;
    }

    // Add imports at the top
    const hasImports = content.includes('import');
    const importStatement = "import { createClient } from '@/lib/supabase/server';\n";
    
    if (!content.includes(importStatement)) {
      if (hasImports) {
        // Add after last import
        const lastImportIndex = content.lastIndexOf('import');
        const nextLineIndex = content.indexOf('\n', lastImportIndex);
        content = content.slice(0, nextLineIndex + 1) + importStatement + content.slice(nextLineIndex + 1);
      } else {
        // Add at the beginning
        content = importStatement + '\n' + content;
      }
      updated = true;
    }

    // Convert to async function if needed
    if (content.includes('export default function') && !content.includes('export default async function')) {
      content = content.replace('export default function', 'export default async function');
      updated = true;
    }

    // Add Supabase client initialization
    const functionMatch = content.match(/export default async function \w+\([^)]*\) \{/);
    if (functionMatch && !content.includes('const supabase = createClient()')) {
      const insertPoint = functionMatch.index + functionMatch[0].length;
      const supabaseInit = '\n  const supabase = createClient();\n';
      content = content.slice(0, insertPoint) + supabaseInit + content.slice(insertPoint);
      updated = true;
    }

    // Replace hardcoded arrays based on type
    if (updateType === 'courses') {
      // Replace hardcoded courses array
      const coursesPattern = /const\s+courses\s*=\s*\[[^\]]*\];?/gs;
      if (coursesPattern.test(content)) {
        content = content.replace(coursesPattern, 
          `const { data: courses } = await supabase\n    .from('courses')\n    .select('*')\n    .eq('active', true)\n    .order('order_index');`
        );
        updated = true;
      }
    } else if (updateType === 'programs') {
      // Replace hardcoded programs array
      const programsPattern = /const\s+programs\s*=\s*\[[^\]]*\];?/gs;
      if (programsPattern.test(content)) {
        content = content.replace(programsPattern,
          `const { data: programs } = await supabase\n    .from('programs')\n    .select('*')\n    .eq('active', true)\n    .order('name');`
        );
        updated = true;
      }
    } else if (updateType === 'students') {
      // Replace hardcoded students array
      const studentsPattern = /const\s+students\s*=\s*\[[^\]]*\];?/gs;
      if (studentsPattern.test(content)) {
        content = content.replace(studentsPattern,
          `const { data: students } = await supabase\n    .from('profiles')\n    .select('*')\n    .eq('role', 'student')\n    .order('created_at', { ascending: false });`
        );
        updated = true;
      }
    } else if (updateType === 'events') {
      // Replace hardcoded events array
      const eventsPattern = /const\s+events\s*=\s*\[[^\]]*\];?/gs;
      if (eventsPattern.test(content)) {
        content = content.replace(eventsPattern,
          `const { data: events } = await supabase\n    .from('events')\n    .select('*')\n    .gte('date', new Date().toISOString())\n    .order('date');`
        );
        updated = true;
      }
    } else {
      // Generic array replacement
      const arrayPattern = /const\s+(\w+)\s*=\s*\[[^\]]*\];?/g;
      const matches = [...content.matchAll(arrayPattern)];
      
      if (matches.length > 0) {
        // Replace first hardcoded array with generic query
        const varName = matches[0][1];
        content = content.replace(matches[0][0],
          `const { data: ${varName} } = await supabase\n    .from('${varName}')\n    .select('*')\n    .order('created_at', { ascending: false });`
        );
        updated = true;
      }
    }

    // Add null check for data
    if (updated && !content.includes('|| []')) {
      // Find data usage and add null coalescing
      content = content.replace(/\.map\(/g, '?.map(');
      content = content.replace(/\.filter\(/g, '?.filter(');
      content = content.replace(/\.length/g, '?.length ?? 0');
    }

    if (updated) {
      writeFileSync(filePath, content);
      log += `✅ Updated: ${filePath} (${updateType})\n`;
      log += `   Changes: Added Supabase query, converted to async\n\n`;
      return true;
    } else {
      log += `⏭️  No changes needed: ${filePath}\n\n`;
      return false;
    }

  } catch (error) {
    log += `❌ Error updating ${filePath}: ${error.message}\n\n`;
    return false;
  }
}

// Detect update type from file content
function detectUpdateType(filePath) {
  const content = readFileSync(filePath, 'utf8');
  
  if (content.includes('courses') || filePath.includes('course')) return 'courses';
  if (content.includes('programs') || filePath.includes('program')) return 'programs';
  if (content.includes('students') || filePath.includes('student')) return 'students';
  if (content.includes('events') || filePath.includes('event')) return 'events';
  if (content.includes('enrollments') || filePath.includes('enroll')) return 'enrollments';
  
  return 'generic';
}

// High priority pages
const highPriorityPages = [
  'app/student/courses/page.tsx',
  'app/student/progress/page.tsx',
  'app/student/portfolio/page.tsx',
  'app/courses/page.tsx',
  'app/pathways/page.tsx',
  'app/compare/page.tsx',
  'app/program-finder/page.tsx',
  'app/schedule/page.tsx',
  'app/calendar/page.tsx',
  'app/events/page.tsx',
  'app/staff-portal/campaigns/page.tsx',
  'app/staff-portal/customer-service/page.tsx',
  'app/staff-portal/qa-checklist/page.tsx',
  'app/staff-portal/training/page.tsx',
  'app/staff-portal/processes/page.tsx',
  'app/admin/editor/page.tsx',
  'app/program-holder/compliance/page.tsx',
  'app/program-holder/documents/page.tsx',
  'app/program-holder/verification/page.tsx',
  'app/booking/page.tsx',
  'app/partner/dashboard/page.tsx',
  'app/partner/attendance/page.tsx',
  'app/employer/page.tsx',
  'app/employers/page.tsx',
  'app/hire-graduates/page.tsx',
  'app/workforce-partners/page.tsx',
  'app/agencies/page.tsx',
  'app/success-stories/page.tsx',
  'app/alumni/page.tsx',
  'app/team/page.tsx',
];

// Process pages
let totalProcessed = 0;
let totalUpdated = 0;
let totalSkipped = 0;
let totalErrors = 0;

console.log(`Processing ${highPriorityPages.length} high-priority pages...\n`);

for (const filePath of highPriorityPages) {
  totalProcessed++;
  console.log(`[${totalProcessed}/${highPriorityPages.length}] ${filePath}`);
  
  if (!existsSync(filePath)) {
    console.log('  ❌ File not found\n');
    log += `❌ File not found: ${filePath}\n\n`;
    totalErrors++;
    continue;
  }

  const updateType = detectUpdateType(filePath);
  const updated = updateFile(filePath, updateType);
  
  if (updated) {
    console.log(`  ✅ Updated (${updateType})\n`);
    totalUpdated++;
  } else {
    console.log('  ⏭️  Skipped\n');
    totalSkipped++;
  }
}

// Save log
writeFileSync(LOG_FILE, log);

// Summary
console.log('='.repeat(50));
console.log('✅ Auto-Fix Complete\n');
console.log(`Total processed: ${totalProcessed}`);
console.log(`Updated: ${totalUpdated}`);
console.log(`Skipped: ${totalSkipped}`);
console.log(`Errors: ${totalErrors}\n`);

console.log('Next steps:');
console.log('1. Review changes: git diff');
console.log('2. Test pages: pnpm dev');
console.log('3. Type check: pnpm type-check');
console.log('4. Build: pnpm build');
console.log('5. Commit: git commit -m "Auto-fix high-priority pages"\n');

console.log(`Log saved to: ${LOG_FILE}`);
console.log(`Backups saved to: ${BACKUP_DIR}/\n`);
