#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing final 30 build errors...\n');

const errorFiles = [
  'app/admin/cash-advances/page.tsx',
  'app/admin/courses/page.tsx',
  'app/admin/email-marketing/page.tsx',
  'app/admin/grants/workflow/page.tsx',
  'app/admin/master-control/page.tsx',
  'app/admin/notifications/page.tsx',
  'app/admin/payroll/page.tsx',
  'app/admin/store/clones/page.tsx',
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

for (const file of errorFiles) {
  try {
    if (!fs.existsSync(file)) {
      console.log(`⚠️  Not found: ${file}`);
      continue;
    }

    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    // Fix 1: Check for unmatched braces
    const openBraces = (content.match(/{/g) || []).length;
    const closeBraces = (content.match(/}/g) || []).length;
    
    if (openBraces > closeBraces) {
      content += '\n}'.repeat(openBraces - closeBraces);
    } else if (closeBraces > openBraces) {
      // Remove extra closing braces from end
      const extraBraces = closeBraces - openBraces;
      for (let i = 0; i < extraBraces; i++) {
        const lastBrace = content.lastIndexOf('}');
        if (lastBrace !== -1) {
          content = content.substring(0, lastBrace) + content.substring(lastBrace + 1);
        }
      }
    }

    // Fix 2: Check for unmatched parentheses
    const openParens = (content.match(/\(/g) || []).length;
    const closeParens = (content.match(/\)/g) || []).length;
    
    if (openParens > closeParens) {
      content += ')'.repeat(openParens - closeParens);
    }

    // Fix 3: Ensure proper function closing
    if (!content.trim().endsWith('}')) {
      content += '\n}';
    }

    // Fix 4: Fix params in dynamic routes
    if (file.includes('[') && file.includes(']')) {
      // Ensure params is properly typed
      if (content.includes('export default async function') && !content.includes('{ params }')) {
        content = content.replace(
          /export default async function (\w+)\(\s*\)/,
          'export default async function $1({ params }: { params: { [key: string]: string } })'
        );
      }
      
      // Add await to params if needed (Next.js 15)
      if (content.includes('params.') && !content.includes('const params = await')) {
        content = content.replace(
          /export default async function (\w+)\(\s*{\s*params\s*}[^)]*\)/,
          'export default async function $1(props: { params: Promise<{ [key: string]: string }> })'
        );
        
        // Add params resolution at start of function
        const funcStart = content.indexOf(') {');
        if (funcStart !== -1) {
          const insertPos = funcStart + 3;
          content = content.slice(0, insertPos) + 
                    '\n  const params = await props.params;' + 
                    content.slice(insertPos);
        }
      }
    }

    // Fix 5: Remove any stray characters after final closing brace
    const lines = content.split('\n');
    let lastBraceIndex = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim() === '}') {
        lastBraceIndex = i;
        break;
      }
    }
    if (lastBraceIndex !== -1 && lastBraceIndex < lines.length - 1) {
      // Check if there's meaningful content after
      const afterContent = lines.slice(lastBraceIndex + 1).join('\n').trim();
      if (afterContent && !afterContent.startsWith('//') && !afterContent.startsWith('/*')) {
        // Keep it
      } else {
        lines.splice(lastBraceIndex + 1);
        content = lines.join('\n');
      }
    }

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✓ Fixed: ${file}`);
      fixed++;
    } else {
      console.log(`  No changes: ${file}`);
    }

  } catch (error) {
    console.log(`✗ Error: ${file} - ${error.message}`);
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`✅ Fixed ${fixed} files\n`);
