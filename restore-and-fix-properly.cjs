#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 Restoring and fixing pages properly...\n');

const files = [
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

for (const file of files) {
  try {
    const backup = file + '.backup';
    if (!fs.existsSync(backup)) continue;
    
    // Restore from backup
    let content = fs.readFileSync(backup, 'utf8');
    
    // Deep fix: Parse and rebuild the entire file structure
    
    // 1. Extract imports
    const importLines = [];
    const otherLines = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      if (line.trim().startsWith('import ') || line.trim().startsWith('export const metadata')) {
        importLines.push(line);
      } else {
        otherLines.push(line);
      }
    }
    
    // 2. Find the function
    const funcContent = otherLines.join('\n');
    const funcMatch = funcContent.match(/export default async function (\w+)\s*\([^)]*\)\s*{/);
    
    if (!funcMatch) {
      console.log(`⚠️  No function found in ${file}`);
      continue;
    }
    
    const funcName = funcMatch[1];
    const funcStart = funcContent.indexOf(funcMatch[0]) + funcMatch[0].length;
    
    // 3. Find the matching closing brace
    let depth = 1;
    let funcEnd = funcStart;
    
    for (let i = funcStart; i < funcContent.length; i++) {
      if (funcContent[i] === '{') depth++;
      if (funcContent[i] === '}') {
        depth--;
        if (depth === 0) {
          funcEnd = i;
          break;
        }
      }
    }
    
    const funcBody = funcContent.substring(funcStart, funcEnd);
    
    // 4. Rebuild the file cleanly
    const cleanImports = [...new Set(importLines)].filter(l => l.trim()).join('\n');
    const cleanContent = `${cleanImports}

export default async function ${funcName}() {
${funcBody}
}
`;
    
    fs.writeFileSync(file, cleanContent, 'utf8');
    console.log(`✓ ${file}`);
    fixed++;
    
  } catch (error) {
    console.log(`✗ ${file}: ${error.message}`);
  }
}

console.log(`\n✅ Restored and fixed ${fixed} files\n`);
