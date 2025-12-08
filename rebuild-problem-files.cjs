#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 Rebuilding problem files...\n');

const problemFiles = [
  'app/admin/cash-advances/page.tsx',
  'app/admin/grants/workflow/page.tsx',
  'app/admin/notifications/page.tsx',
  'app/admin/payroll/page.tsx',
  'app/admin/store/clones/page.tsx'
];

for (const file of problemFiles) {
  try {
    if (!fs.existsSync(file)) continue;
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Extract the function body
    const funcMatch = content.match(/export default async function (\w+)\([^)]*\)\s*{([\s\S]*)/);
    if (!funcMatch) continue;
    
    const funcName = funcMatch[1];
    let funcBody = funcMatch[2];
    
    // Find where the function actually ends
    let depth = 1;
    let endPos = 0;
    
    for (let i = 0; i < funcBody.length; i++) {
      if (funcBody[i] === '{') depth++;
      if (funcBody[i] === '}') {
        depth--;
        if (depth === 0) {
          endPos = i;
          break;
        }
      }
    }
    
    if (endPos > 0) {
      funcBody = funcBody.substring(0, endPos);
    }
    
    // Get everything before the function
    const beforeFunc = content.substring(0, content.indexOf('export default async function'));
    
    // Rebuild the file
    const newContent = beforeFunc + `export default async function ${funcName}() {\n${funcBody}\n}\n`;
    
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`✓ Rebuilt: ${file}`);
    
  } catch (error) {
    console.log(`✗ ${file}: ${error.message}`);
  }
}

console.log('\n✅ Done\n');
