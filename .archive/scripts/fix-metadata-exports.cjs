#!/usr/bin/env node

const fs = require('fs');

const files = [
  'app/admin/cash-advances/page.tsx',
  'app/admin/courses/page.tsx',
  'app/admin/grants/workflow/page.tsx',
  'app/admin/master-control/page.tsx',
  'app/admin/users/page.tsx',
  'app/board/dashboard/page.tsx',
  'app/delegate/dashboard/page.tsx',
  'app/lms/dashboard/page.tsx',
  'app/partner/dashboard/page.tsx',
  'app/programs/page.tsx',
  'app/workforce-board/dashboard/page.tsx'
];

console.log('🔧 Fixing metadata exports...\n');

for (const file of files) {
  try {
    if (!fs.existsSync(file)) continue;
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Find metadata export
    const metadataMatch = content.match(/export const metadata: Metadata = {/);
    if (!metadataMatch) continue;
    
    const metadataStart = metadataMatch.index + metadataMatch[0].length;
    
    // Find the closing brace for metadata
    let depth = 1;
    let metadataEnd = metadataStart;
    
    for (let i = metadataStart; i < content.length; i++) {
      if (content[i] === '{') depth++;
      if (content[i] === '}') {
        depth--;
        if (depth === 0) {
          metadataEnd = i + 1;
          break;
        }
      }
    }
    
    // Add semicolon and newline after metadata if missing
    if (content[metadataEnd] !== ';') {
      content = content.substring(0, metadataEnd) + ';\n\n' + content.substring(metadataEnd);
    } else if (content[metadataEnd + 1] !== '\n') {
      content = content.substring(0, metadataEnd + 1) + '\n\n' + content.substring(metadataEnd + 1);
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✓ ${file}`);
    
  } catch (error) {
    console.log(`✗ ${file}: ${error.message}`);
  }
}

console.log('\n✅ Done\n');
