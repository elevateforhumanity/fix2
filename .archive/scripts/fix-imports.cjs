#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing import statements...\n');

// Get all page files
const pageFiles = execSync('find app -name "page.tsx" -type f', { encoding: 'utf8' })
  .trim()
  .split('\n');

let fixed = 0;

for (const file of pageFiles) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    // Fix broken imports (import { \n\n should be import {)
    content = content.replace(/import\s*{\s*\n\s*\n/g, 'import {\n  ');
    
    // Remove duplicate useState imports
    const useStateImports = content.match(/import.*useState.*from 'react';/g);
    if (useStateImports && useStateImports.length > 1) {
      // Keep only first
      let first = true;
      content = content.replace(/import.*useState.*from 'react';/g, (match) => {
        if (first) {
          first = false;
          return match;
        }
        return '';
      });
    }

    // Remove duplicate useEffect imports
    const useEffectImports = content.match(/import.*useEffect.*from 'react';/g);
    if (useEffectImports && useEffectImports.length > 1) {
      let first = true;
      content = content.replace(/import.*useEffect.*from 'react';/g, (match) => {
        if (first) {
          first = false;
          return match;
        }
        return '';
      });
    }

    // Consolidate React imports
    const reactImportLines = [];
    const lines = content.split('\n');
    const nonReactLines = [];
    
    for (const line of lines) {
      if (line.includes("from 'react'") && !line.includes('react-')) {
        reactImportLines.push(line);
      } else {
        nonReactLines.push(line);
      }
    }

    if (reactImportLines.length > 1) {
      // Extract all React imports
      const reactImports = new Set();
      reactImportLines.forEach(line => {
        const match = line.match(/import\s*{([^}]+)}\s*from\s*'react'/);
        if (match) {
          match[1].split(',').forEach(imp => {
            reactImports.add(imp.trim());
          });
        }
      });

      if (reactImports.size > 0) {
        const consolidatedImport = `import { ${Array.from(reactImports).join(', ')} } from 'react';`;
        
        // Remove all React import lines and add consolidated one
        content = nonReactLines.join('\n');
        
        // Add consolidated import after 'use client' if present
        if (content.includes("'use client'")) {
          content = content.replace("'use client';\n", "'use client';\n\n" + consolidatedImport + '\n');
        } else {
          // Add at beginning
          content = consolidatedImport + '\n' + content;
        }
      }
    }

    // Clean up multiple empty lines
    content = content.replace(/\n\n\n+/g, '\n\n');

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
