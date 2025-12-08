#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔧 Fixing metadata semicolons...\n');

// Get all page files
const files = execSync('find app -name "page.tsx" -type f', { encoding: 'utf8' })
  .trim()
  .split('\n');

let fixed = 0;

for (const file of files) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    // Fix: = {; should be = {
    content = content.replace(/= \{;/g, '= {');
    
    // Fix: }; should be };
    content = content.replace(/\};;\n/g, '};\n');
    
    // Fix double semicolons
    content = content.replace(/;;/g, ';');
    
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
