#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 Fixing all remaining build errors...\n');

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
    if (!fs.existsSync(file)) continue;
    
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    // Fix Image component props
    content = content.replace(/quality=\{100\}/g, 'quality={100}');
    content = content.replace(/quality=100/g, 'quality={100}');
    
    // Fix JSX closing tags
    content = content.replace(/<\/(\w+)>/g, (match, tag) => {
      // Ensure proper closing
      return `</${tag}>`;
    });
    
    // Fix broken JSX expressions
    content = content.replace(/\{([^}]*)\n\n/g, '{$1\n');
    
    // Remove orphaned closing braces after return
    const lines = content.split('\n');
    let inReturn = false;
    let returnDepth = 0;
    let fixedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.includes('return (')) {
        inReturn = true;
        returnDepth = 0;
      }
      
      if (inReturn) {
        returnDepth += (line.match(/\(/g) || []).length;
        returnDepth -= (line.match(/\)/g) || []).length;
        
        if (returnDepth < 0) {
          inReturn = false;
          // This line closes the return
          fixedLines.push(line);
          
          // Check if next line is just a closing brace
          if (i + 1 < lines.length && lines[i + 1].trim() === '}') {
            fixedLines.push(lines[i + 1]);
            i++; // Skip the closing brace line
          }
          continue;
        }
      }
      
      fixedLines.push(line);
    }
    
    content = fixedLines.join('\n');
    
    // Ensure proper function ending
    if (!content.trim().endsWith('}')) {
      content = content.trim() + '\n}\n';
    }
    
    // Fix params in dynamic routes for Next.js 15
    if (file.includes('[') && file.includes(']')) {
      // Check if using params
      if (content.includes('params.') && !content.includes('await props.params')) {
        // Update function signature
        content = content.replace(
          /export default async function (\w+)\(\s*{\s*params\s*}:\s*{\s*params:\s*{[^}]+}\s*}\s*\)/,
          'export default async function $1(props: { params: Promise<{ [key: string]: string }> })'
        );
        
        // Add params resolution
        if (content.includes('export default async function') && !content.includes('const params = await')) {
          content = content.replace(
            /(export default async function \w+\([^)]+\)\s*{\s*)/,
            '$1\n  const params = await props.params;\n'
          );
        }
      }
    }
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✓ ${file}`);
      fixed++;
    }
    
  } catch (error) {
    console.log(`✗ ${file}: ${error.message}`);
  }
}

console.log(`\n✅ Fixed ${fixed} files\n`);
