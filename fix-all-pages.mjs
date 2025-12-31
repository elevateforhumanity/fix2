#!/usr/bin/env node
/**
 * Fix All Pages - Comprehensive Update Script
 * Fixes mock data imports and hardcoded arrays in all pages
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';

console.log('🔧 Fix All Pages - Comprehensive Update');
console.log('========================================\n');

const BACKUP_DIR = '.page-backups-comprehensive';
const LOG_FILE = 'fix-all-pages-log.txt';
let log = `Fix All Pages Log - ${new Date().toISOString()}\n${'='.repeat(60)}\n\n`;

// Statistics
let stats = {
  total: 0,
  updated: 0,
  skipped: 0,
  errors: 0,
  mockDataFixed: 0,
  hardcodedArraysFixed: 0,
  convertedToAsync: 0,
};

// Create backup directory
if (!existsSync(BACKUP_DIR)) {
  mkdirSync(BACKUP_DIR, { recursive: true });
}

// Backup file
function backupFile(filePath) {
  const backupPath = `${BACKUP_DIR}/${filePath.replace(/\//g, '_')}`;
  const content = readFileSync(filePath, 'utf8');
  writeFileSync(backupPath, content);
}

// Fix a single page
function fixPage(filePath) {
  stats.total++;
  
  try {
    if (!existsSync(filePath)) {
      log += `❌ File not found: ${filePath}\n\n`;
      stats.errors++;
      return false;
    }

    let content = readFileSync(filePath, 'utf8');
    const originalContent = content;
    let changes = [];

    // Skip if already properly using Supabase
    if (content.includes('createClient') && content.includes('await supabase')) {
      log += `⏭️  Already using database: ${filePath}\n\n`;
      stats.skipped++;
      return false;
    }

    // Backup before making changes
    backupFile(filePath);

    // 1. Remove mock data imports
    if (content.includes('mock')) {
      content = content.replace(/import.*mock.*from.*['"].*['"];?\n/gi, '');
      changes.push('Removed mock imports');
      stats.mockDataFixed++;
    }

    // 2. Add Supabase import if not present
    if (!content.includes("import { createClient } from '@/lib/supabase/server'")) {
      const importStatement = "import { createClient } from '@/lib/supabase/server';\n";
      
      // Find where to insert (after other imports)
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

    // 3. Convert to async function
    if (content.includes('export default function') && !content.includes('export default async function')) {
      content = content.replace(/export default function/g, 'export default async function');
      changes.push('Converted to async function');
      stats.convertedToAsync++;
    }

    // 4. Add Supabase client initialization
    const functionMatch = content.match(/export default async function \w+\([^)]*\) \{/);
    if (functionMatch && !content.includes('const supabase = createClient()')) {
      const insertPoint = functionMatch.index + functionMatch[0].length;
      content = content.slice(0, insertPoint) + '\n  const supabase = createClient();\n' + content.slice(insertPoint);
      changes.push('Added Supabase client');
    }

    // 5. Fix hardcoded arrays - detect and replace
    const arrayPatterns = [
      { name: 'events', table: 'events', order: 'date' },
      { name: 'courses', table: 'courses', order: 'order_index' },
      { name: 'programs', table: 'programs', order: 'name' },
      { name: 'students', table: 'profiles', order: 'created_at', filter: "eq('role', 'student')" },
      { name: 'enrollments', table: 'enrollments', order: 'created_at' },
      { name: 'applications', table: 'applications', order: 'created_at' },
      { name: 'certificates', table: 'certificates', order: 'issued_date' },
      { name: 'assignments', table: 'assignments', order: 'due_date' },
      { name: 'submissions', table: 'submissions', order: 'submitted_at' },
      { name: 'team', table: 'profiles', order: 'last_name', filter: "eq('role', 'staff')" },
      { name: 'partners', table: 'partners', order: 'name' },
      { name: 'employers', table: 'employers', order: 'name' },
      { name: 'volunteers', table: 'volunteers', order: 'created_at' },
      { name: 'workshops', table: 'workshops', order: 'date' },
      { name: 'webinars', table: 'webinars', order: 'date' },
    ];

    for (const pattern of arrayPatterns) {
      // Match: const events = [...]
      const regex = new RegExp(`const\\s+${pattern.name}\\s*=\\s*\\[[^\\]]*\\];?`, 'gs');
      
      if (regex.test(content)) {
        const filterClause = pattern.filter ? `.${pattern.filter}\n    ` : '';
        const replacement = `const { data: ${pattern.name} } = await supabase
    .from('${pattern.table}')
    .select('*')
    ${filterClause}.order('${pattern.order}');`;
        
        content = content.replace(regex, replacement);
        changes.push(`Fixed ${pattern.name} array`);
        stats.hardcodedArraysFixed++;
      }
    }

    // 6. Add null safety for data usage
    if (changes.length > 0) {
      // Add optional chaining for common array methods
      content = content.replace(/(\w+)\.map\(/g, '$1?.map(');
      content = content.replace(/(\w+)\.filter\(/g, '$1?.filter(');
      content = content.replace(/(\w+)\.length(?!\?)/g, '$1?.length ?? 0');
      content = content.replace(/(\w+)\.find\(/g, '$1?.find(');
      content = content.replace(/(\w+)\.some\(/g, '$1?.some(');
      content = content.replace(/(\w+)\.every\(/g, '$1?.every(');
    }

    // 7. Write changes if any were made
    if (content !== originalContent) {
      writeFileSync(filePath, content);
      log += `✅ Updated: ${filePath}\n`;
      log += `   Changes: ${changes.join(', ')}\n\n`;
      stats.updated++;
      return true;
    } else {
      log += `⏭️  No changes needed: ${filePath}\n\n`;
      stats.skipped++;
      return false;
    }

  } catch (error) {
    log += `❌ Error: ${filePath}\n   ${error.message}\n\n`;
    stats.errors++;
    return false;
  }
}

// Pages to fix
const pagesToFix = [
  // Mock data pages (4)
  'app/events/page.tsx',
  'app/admin/editor/page.tsx',
  'app/drug-testing-training/page.tsx',
  'app/volunteer/page.tsx',
  
  // Staff portal pages (15)
  'app/staff-portal/campaigns/page.tsx',
  'app/staff-portal/customer-service/page.tsx',
  'app/staff-portal/page.tsx',
  'app/staff-portal/qa-checklist/page.tsx',
  'app/staff-portal/dashboard/page.tsx',
  'app/staff-portal/processes/page.tsx',
  'app/staff-portal/training/page.tsx',
  'app/staff-portal/students/page.tsx',
  'app/staff-portal/courses/page.tsx',
  'app/staff-portal/reports/page.tsx',
  'app/staff-portal/analytics/page.tsx',
  'app/staff-portal/compliance/page.tsx',
  'app/staff-portal/documents/page.tsx',
  'app/staff-portal/verification/page.tsx',
  'app/staff-portal/settings/page.tsx',
  
  // Student portal pages (10)
  'app/student/portfolio/page.tsx',
  'app/student/courses/page.tsx',
  'app/student/progress/page.tsx',
  'app/student/milady-lms/page.tsx',
  'app/student/ai-tutor/page.tsx',
  'app/student/dashboard/page.tsx',
  'app/student/assignments/page.tsx',
  'app/student/grades/page.tsx',
  'app/student/schedule/page.tsx',
  'app/student/resources/page.tsx',
  
  // Program holder pages (8)
  'app/program-holder/compliance/page.tsx',
  'app/program-holder/campaigns/page.tsx',
  'app/program-holder/documents/page.tsx',
  'app/program-holder/verification/page.tsx',
  'app/program-holder/dashboard/page.tsx',
  'app/program-holder/reports/page.tsx',
  'app/program-holder/students/page.tsx',
  'app/program-holder/settings/page.tsx',
  
  // Shop pages (6)
  'app/shop/onboarding/documents/page.tsx',
  'app/shop/onboarding/page.tsx',
  'app/shop/reports/new/page.tsx',
  'app/shop/reports/page.tsx',
  'app/shop/dashboard/page.tsx',
  'app/shop/products/page.tsx',
  
  // Apprentice pages (5)
  'app/apprentice/hours/page.tsx',
  'app/apprentice/dashboard/page.tsx',
  'app/apprentice/timesheet/page.tsx',
  'app/apprentice/progress/page.tsx',
  'app/apprentice/documents/page.tsx',
  
  // Additional high-priority pages
  'app/booking/page.tsx',
  'app/pathways/page.tsx',
  'app/enhanced-home/page.tsx',
  'app/vita/upload/page.tsx',
  'app/diagnostic/page.tsx',
  'app/apply/track/page.tsx',
  'app/apply/page.tsx',
  'app/success-stories/page.tsx',
  'app/calendar/page.tsx',
  'app/schedule/page.tsx',
  'app/courses/page.tsx',
  'app/compare/page.tsx',
  'app/program-finder/page.tsx',
  'app/partner/dashboard/page.tsx',
  'app/partner/attendance/page.tsx',
  'app/employer/page.tsx',
  'app/employers/page.tsx',
  'app/hire-graduates/page.tsx',
  'app/workforce-partners/page.tsx',
  'app/agencies/page.tsx',
  'app/alumni/page.tsx',
  'app/team/page.tsx',
];

// Process all pages
console.log(`Processing ${pagesToFix.length} pages...\n`);

let processed = 0;
for (const filePath of pagesToFix) {
  processed++;
  console.log(`[${processed}/${pagesToFix.length}] ${filePath}`);
  fixPage(filePath);
}

// Save log
writeFileSync(LOG_FILE, log);

// Summary
console.log('\n' + '='.repeat(60));
console.log('✅ Fix All Pages Complete\n');
console.log('Statistics:');
console.log(`  Total processed: ${stats.total}`);
console.log(`  Updated: ${stats.updated}`);
console.log(`  Skipped: ${stats.skipped}`);
console.log(`  Errors: ${stats.errors}`);
console.log(`  Mock data fixed: ${stats.mockDataFixed}`);
console.log(`  Hardcoded arrays fixed: ${stats.hardcodedArraysFixed}`);
console.log(`  Converted to async: ${stats.convertedToAsync}\n`);

console.log('Next steps:');
console.log('1. Review changes: git diff');
console.log('2. Check log: cat fix-all-pages-log.txt');
console.log('3. Test pages: pnpm dev');
console.log('4. Type check: pnpm type-check');
console.log('5. Build test: pnpm build');
console.log('6. Commit: git add -A && git commit -m "Fix all pages: remove mock data and hardcoded arrays"\n');

console.log(`📝 Log: ${LOG_FILE}`);
console.log(`📦 Backups: ${BACKUP_DIR}/\n`);
