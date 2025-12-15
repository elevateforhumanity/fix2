#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing build errors...\n');

// Get list of files with duplicate code
const adminFiles = execSync('find app/admin -name "page.tsx" -type f', { encoding: 'utf8' })
  .trim()
  .split('\n');

let fixed = 0;

for (const file of adminFiles) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    // Remove duplicate auth/profile checks
    const authPattern = /const { data: { user } } = await supabase\.auth\.getUser\(\);[\s\S]*?\.single\(\);/g;
    const matches = content.match(authPattern);
    
    if (matches && matches.length > 1) {
      // Keep only the first occurrence
      let firstMatch = true;
      content = content.replace(authPattern, (match) => {
        if (firstMatch) {
          firstMatch = false;
          return match;
        }
        return '';
      });
    }
    
    // Remove duplicate items queries
    const itemsPattern = /\/\/ Fetch relevant data[\s\S]*?const { data: items, count } = await supabase[\s\S]*?\.limit\(\d+\);/;
    if (itemsPattern.test(content) && content.includes('const { data: items, count: totalItems }')) {
      content = content.replace(itemsPattern, '');
    }
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✓ Fixed: ${file}`);
      fixed++;
    }
  } catch (error) {
    console.log(`✗ Error in ${file}: ${error.message}`);
  }
}

console.log(`\n✅ Fixed ${fixed} files\n`);
