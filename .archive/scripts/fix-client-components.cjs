#!/usr/bin/env node

const fs = require('fs');

const files = [
  'app/admin/email-marketing/page.tsx',
  'app/admin/notifications/page.tsx',
  'app/admin/payroll/page.tsx',
  'app/admin/store/clones/page.tsx',
  'app/compare-programs/page.tsx',
  'app/demos/page.tsx',
  'app/jri/page.tsx',
  'app/lms/course/[courseId]/page.tsx',
  'app/portal/instructor/skills-tracking-esthetician/page.tsx',
  'app/portal/instructor/skills-tracking-nail/page.tsx',
  'app/portal/student/courses/[courseId]/page.tsx',
  'app/programs/[slug]/page.tsx',
  'app/store/page.tsx',
  'app/student/courses/[courseId]/page.tsx',
  'app/student/portfolio/page.tsx',
  'app/supersonicfastcash/page.tsx',
  'app/tax-filing/locations/[state]/page.tsx',
  'app/vita/page.tsx'
];

console.log('🔧 Fixing client component pages...\n');

let fixed = 0;

for (const file of files) {
  try {
    const backup = file + '.backup';
    if (!fs.existsSync(backup)) continue;
    
    let content = fs.readFileSync(backup, 'utf8');
    
    // These are client components - find the default export
    const exportMatch = content.match(/export default function (\w+)\s*\([^)]*\)\s*{/);
    
    if (!exportMatch) {
      console.log(`⚠️  No export found in ${file}`);
      continue;
    }
    
    const funcName = exportMatch[1];
    const funcStart = content.indexOf(exportMatch[0]) + exportMatch[0].length;
    
    // Find matching brace
    let depth = 1;
    let funcEnd = funcStart;
    
    for (let i = funcStart; i < content.length; i++) {
      if (content[i] === '{') depth++;
      if (content[i] === '}') {
        depth--;
        if (depth === 0) {
          funcEnd = i;
          break;
        }
      }
    }
    
    const funcBody = content.substring(funcStart, funcEnd);
    
    // Get everything before the function
    const beforeFunc = content.substring(0, content.indexOf('export default function'));
    
    // Rebuild
    const cleanContent = `${beforeFunc}export default function ${funcName}() {
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

console.log(`\n✅ Fixed ${fixed} client components\n`);
