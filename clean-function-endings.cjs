#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔧 Cleaning function endings...\n');

const files = execSync('find app -name "page.tsx" -type f', { encoding: 'utf8' })
  .trim()
  .split('\n');

let fixed = 0;

for (const file of files) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    // Remove multiple blank lines before closing brace
    content = content.replace(/\n\n\n+}/g, '\n}');
    
    // Fix: );\n\n\n} should be );\n}
    content = content.replace(/\);\s*\n\s*\n\s*\n\s*}/g, ');\n}');
    
    // Ensure file ends with single newline
    content = content.trimEnd() + '\n';
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✓ ${file}`);
      fixed++;
    }
    
  } catch (error) {
    // Skip
  }
}

console.log(`\n✅ Fixed ${fixed} files\n`);
