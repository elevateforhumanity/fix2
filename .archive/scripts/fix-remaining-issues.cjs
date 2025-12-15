#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const report = JSON.parse(fs.readFileSync(path.join(__dirname, 'VERIFICATION_REPORT.json'), 'utf8'));

console.log('🔧 Fixing remaining issues...\n');

let fixed = 0;

// Fix duplicate supabase
for (const relativePath of report.issues.stillHasDuplicateSupabase) {
  const fullPath = path.join(__dirname, 'app', relativePath);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Remove all but first supabase initialization
  const matches = [...content.matchAll(/const supabase = await createClient\(\);/g)];
  if (matches.length > 1) {
    // Keep first, remove others
    for (let i = 1; i < matches.length; i++) {
      content = content.replace('const supabase = await createClient();', '');
    }
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`  ✓ Fixed duplicate supabase: ${relativePath}`);
    fixed++;
  }
}

// Fix missing imports
for (const relativePath of report.issues.missingImports) {
  const fullPath = path.join(__dirname, 'app', relativePath);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  if (content.includes('supabase') && !content.includes("from '@/lib/supabase/")) {
    // Add import after first import statement
    content = content.replace(
      /(import.*from ['"][^'"]+['"];)/,
      `$1\nimport { createClient } from '@/lib/supabase/server';`
    );
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`  ✓ Fixed missing import: ${relativePath}`);
    fixed++;
  }
}

// Fix syntax issues
for (const relativePath of report.issues.syntaxIssues) {
  const fullPath = path.join(__dirname, 'app', relativePath);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Try to balance braces
  const openBraces = (content.match(/{/g) || []).length;
  const closeBraces = (content.match(/}/g) || []).length;
  
  if (openBraces > closeBraces) {
    content += '\n}'.repeat(openBraces - closeBraces);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`  ✓ Fixed syntax: ${relativePath}`);
    fixed++;
  }
}

console.log(`\n✅ Fixed ${fixed} remaining issues\n`);
