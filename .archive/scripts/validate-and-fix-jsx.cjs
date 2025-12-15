#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 Validating and fixing JSX syntax...\n');

const files = [
  'app/admin/cash-advances/page.tsx',
  'app/admin/grants/workflow/page.tsx',
  'app/admin/notifications/page.tsx',
  'app/admin/payroll/page.tsx',
  'app/admin/store/clones/page.tsx',
  'app/admin/courses/page.tsx',
  'app/admin/email-marketing/page.tsx',
  'app/admin/master-control/page.tsx',
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
    if (!fs.existsSync(file)) continue;
    
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    // Count braces in JSX context
    let inJSX = false;
    let braceCount = 0;
    let parenCount = 0;
    let bracketCount = 0;
    
    // Find the return statement
    const returnMatch = content.match(/return\s*\(/);
    if (returnMatch) {
      const returnIndex = returnMatch.index + returnMatch[0].length;
      const afterReturn = content.substring(returnIndex);
      
      // Count opening and closing in JSX
      for (let i = 0; i < afterReturn.length; i++) {
        const char = afterReturn[i];
        if (char === '(') parenCount++;
        if (char === ')') parenCount--;
        if (char === '{') braceCount++;
        if (char === '}') braceCount--;
        if (char === '[') bracketCount++;
        if (char === ']') bracketCount--;
        
        // If we've closed the return statement
        if (parenCount === -1) {
          // Check if there's a semicolon
          const nextChars = afterReturn.substring(i, i + 5);
          if (!nextChars.includes(';')) {
            content = content.substring(0, returnIndex + i + 1) + ';' + content.substring(returnIndex + i + 1);
          }
          break;
        }
      }
    }
    
    // Ensure function ends properly
    const lines = content.split('\n');
    let lastMeaningfulLine = lines.length - 1;
    
    // Find last non-empty line
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim()) {
        lastMeaningfulLine = i;
        break;
      }
    }
    
    // Ensure it ends with }
    if (!lines[lastMeaningfulLine].trim().endsWith('}')) {
      lines[lastMeaningfulLine] += '\n}';
      content = lines.join('\n');
    }
    
    // Remove any content after the final closing brace of the function
    const functionMatch = content.match(/export default async function \w+/);
    if (functionMatch) {
      let depth = 0;
      let inFunction = false;
      let functionEnd = -1;
      
      for (let i = functionMatch.index; i < content.length; i++) {
        if (content[i] === '{') {
          depth++;
          inFunction = true;
        }
        if (content[i] === '}') {
          depth--;
          if (inFunction && depth === 0) {
            functionEnd = i;
            break;
          }
        }
      }
      
      if (functionEnd !== -1) {
        content = content.substring(0, functionEnd + 1) + '\n';
      }
    }
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✓ Fixed: ${file}`);
      fixed++;
    }
    
  } catch (error) {
    console.log(`✗ Error: ${file} - ${error.message}`);
  }
}

console.log(`\n✅ Fixed ${fixed} files\n`);
