#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing client component metadata errors...\n');

// Get list of all page files
const pageFiles = execSync('find app -name "page.tsx" -type f', { encoding: 'utf8' })
  .trim()
  .split('\n');

let fixed = 0;

for (const file of pageFiles) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    // Check if it's a client component
    if (content.includes("'use client'")) {
      // Remove export const metadata
      if (content.includes('export const metadata')) {
        content = content.replace(/export const metadata: Metadata = \{[\s\S]*?\};?\n\n?/g, '');
        content = content.replace(/import.*Metadata.*from 'next';\n?/g, '');
      }
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
