#!/usr/bin/env node
/**
 * Remove all console.log statements from codebase
 * Keep console.error and console.warn
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = join(dirPath, file);
    if (statSync(filePath).isDirectory()) {
      if (!file.includes('node_modules') && !file.startsWith('.')) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      arrayOfFiles.push(filePath);
    }
  });
  return arrayOfFiles;
}

let totalFiles = 0;
let totalRemoved = 0;

function removeConsoleLogs(filePath) {
  try {
    let content = readFileSync(filePath, 'utf-8');
    const originalContent = content;
    let fileRemovals = 0;

    // Remove console.log statements (but keep console.error and console.warn)
    // Match: console.log(...) including multiline
    const consoleLogRegex = /console\.log\([^)]*\);?/g;
    const matches = content.match(consoleLogRegex);
    
    if (matches) {
      // Remove each console.log
      content = content.replace(consoleLogRegex, '');
      
      // Clean up empty lines left behind
      content = content.replace(/^\s*\n/gm, '');
      
      fileRemovals = matches.length;
    }

    // Also remove commented console.log
    content = content.replace(/\/\/\s*console\.log\([^)]*\);?/g, '');

    if (content !== originalContent) {
      writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ Removed ${fileRemovals} console.log from ${filePath}`);
      totalRemoved += fileRemovals;
      totalFiles++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

const files = [
  ...getAllFiles('app'),
  ...getAllFiles('lib'),
  ...getAllFiles('components'),
];

console.log(`🔍 Scanning ${files.length} files for console.log statements\n`);
files.forEach(removeConsoleLogs);

console.log(`\n✅ Complete!`);
console.log(`📊 Removed ${totalRemoved} console.log statements from ${totalFiles} files`);
console.log(`\n✅ Kept console.error and console.warn for proper error handling`);
