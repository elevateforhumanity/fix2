#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing all remaining build errors...\n');

// List of files with errors
const errorFiles = [
  'app/admin/autopilots/page.tsx',
  'app/admin/cash-advances/page.tsx',
  'app/admin/course-studio/page.tsx',
  'app/admin/courses/page.tsx',
  'app/admin/dev-studio/page.tsx',
  'app/admin/editor/page.tsx',
  'app/admin/email-marketing/analytics/page.tsx',
  'app/admin/email-marketing/automation/new/page.tsx',
  'app/admin/email-marketing/automation/page.tsx',
  'app/admin/email-marketing/campaigns/new/page.tsx',
  'app/admin/email-marketing/page.tsx',
  'app/admin/grants/workflow/page.tsx',
  'app/admin/master-control/page.tsx',
  'app/admin/media-studio/page.tsx',
  'app/admin/notifications/page.tsx',
  'app/admin/payroll/page.tsx',
  'app/admin/social-media/campaigns/new/page.tsx',
  'app/admin/social-media/page.tsx',
  'app/admin/store/clones/page.tsx',
  'app/admin/tax-filing/page.tsx',
  'app/admin/users/page.tsx',
  'app/board/dashboard/page.tsx',
  'app/compare-programs/page.tsx',
  'app/delegate/dashboard/page.tsx',
  'app/demos/page.tsx',
  'app/jri/page.tsx',
  'app/lms/course/[courseId]/page.tsx',
  'app/lms/dashboard/page.tsx',
  'app/partner/dashboard/page.tsx',
  'app/portal/instructor/skills-tracking-esthetician/page.tsx',
  'app/portal/instructor/skills-tracking-nail/page.tsx',
  'app/portal/student/courses/[courseId]/page.tsx',
  'app/programs/[slug]/page.tsx',
  'app/programs/page.tsx',
  'app/store/page.tsx',
  'app/student/courses/[courseId]/page.tsx',
  'app/student/portfolio/page.tsx',
  'app/supersonicfastcash/page.tsx',
  'app/tax-filing/locations/[state]/page.tsx',
  'app/vita/page.tsx',
  'app/workforce-board/dashboard/page.tsx'
];

let fixed = 0;
let errors = 0;

for (const file of errorFiles) {
  try {
    if (!fs.existsSync(file)) {
      console.log(`⚠️  File not found: ${file}`);
      continue;
    }

    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    let changed = false;

    // Fix 1: Remove duplicate imports
    const importLines = content.split('\n').filter(line => line.trim().startsWith('import'));
    const uniqueImports = [...new Set(importLines)];
    if (importLines.length !== uniqueImports.length) {
      const nonImportContent = content.split('\n').filter(line => !line.trim().startsWith('import') || line.includes('import type')).join('\n');
      content = uniqueImports.join('\n') + '\n' + nonImportContent;
      changed = true;
    }

    // Fix 2: Ensure 'use client' is first line if it exists
    if (content.includes("'use client'") && !content.startsWith("'use client'")) {
      content = content.replace(/"use client";?\n?/g, '');
      content = content.replace(/'use client';?\n?/g, '');
      content = "'use client';\n\n" + content;
      changed = true;
    }

    // Fix 3: Remove metadata from client components
    if (content.includes("'use client'") && content.includes('export const metadata')) {
      content = content.replace(/export const metadata: Metadata = \{[\s\S]*?\};?\n\n?/g, '');
      content = content.replace(/import.*Metadata.*from ['"]next['"];\n?/g, '');
      changed = true;
    }

    // Fix 4: Fix missing notFound import
    if (content.includes('notFound()') && !content.includes("import { notFound }")) {
      const firstImport = content.indexOf('import');
      if (firstImport !== -1) {
        const endOfFirstImport = content.indexOf('\n', firstImport);
        content = content.slice(0, endOfFirstImport + 1) + 
                  "import { notFound } from 'next/navigation';\n" + 
                  content.slice(endOfFirstImport + 1);
        changed = true;
      }
    }

    // Fix 5: Fix params type issues in dynamic routes
    if (file.includes('[') && content.includes('params.')) {
      // Add proper params type if missing
      if (!content.includes('params:') && content.includes('export default async function')) {
        content = content.replace(
          /export default async function \w+\(\)/,
          'export default async function Page({ params }: { params: { [key: string]: string } })'
        );
        changed = true;
      }
    }

    // Fix 6: Remove trailing commas in JSX
    content = content.replace(/,(\s*)\}/g, '$1}');
    if (content !== original) changed = true;

    // Fix 7: Fix duplicate const declarations
    const constMatches = content.match(/const (\w+) =/g);
    if (constMatches) {
      const constNames = constMatches.map(m => m.match(/const (\w+) =/)[1]);
      const duplicates = constNames.filter((name, index) => constNames.indexOf(name) !== index);
      
      if (duplicates.length > 0) {
        // Remove duplicate declarations
        duplicates.forEach(dupName => {
          const regex = new RegExp(`const ${dupName} = [^;]+;\\n`, 'g');
          const matches = content.match(regex);
          if (matches && matches.length > 1) {
            // Keep first, remove others
            let first = true;
            content = content.replace(regex, (match) => {
              if (first) {
                first = false;
                return match;
              }
              return '';
            });
            changed = true;
          }
        });
      }
    }

    // Fix 8: Clean up empty lines
    content = content.replace(/\n\n\n+/g, '\n\n');

    if (changed && content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✓ Fixed: ${file}`);
      fixed++;
    } else if (content === original) {
      console.log(`  Skipped (no changes): ${file}`);
    }

  } catch (error) {
    console.log(`✗ Error in ${file}: ${error.message}`);
    errors++;
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`\n✅ Fixed: ${fixed} files`);
console.log(`⚠️  Errors: ${errors} files`);
console.log(`📊 Total processed: ${errorFiles.length} files\n`);
