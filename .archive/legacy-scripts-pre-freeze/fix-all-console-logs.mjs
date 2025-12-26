#!/usr/bin/env node

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const fixes = [];
const excludeDirs = ['node_modules', '.next', '.git', 'dist', 'build', '.archive'];

// Keep only critical error logging, remove all debug/info logs
const shouldKeepLine = (line) => {
  const trimmed = line.trim();
  
  // Keep console.error for critical errors
  if (trimmed.includes('console.error')) {
    // But remove generic/redundant ones
    if (trimmed.match(/console\.error\(['"]Error:/)) {
      return false;
    }
    return true;
  }
  
  // Keep console.warn for important warnings
  if (trimmed.includes('console.warn')) {
    return true;
  }
  
  // Remove all console.log, console.debug, console.info
  return false;
};

async function cleanFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    
    // Check if file has console statements
    if (!content.match(/console\.(log|debug|info|error|warn)/)) {
      return false;
    }
    
    const lines = content.split('\n');
    const newLines = [];
    let modified = false;
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();
      
      // Check if this line contains a console statement
      if (trimmed.match(/console\.(log|debug|info)/)) {
        // Handle multi-line console statements
        let fullStatement = line;
        let j = i;
        
        // Collect full statement if it spans multiple lines
        while (j < lines.length && !fullStatement.includes(');')) {
          j++;
          if (j < lines.length) {
            fullStatement += '\n' + lines[j];
          }
        }
        
        if (!shouldKeepLine(fullStatement)) {
          modified = true;
          // Skip all lines that were part of this statement
          i = j + 1;
          continue;
        }
      }
      
      newLines.push(line);
      i++;
    }
    
    if (modified) {
      const newContent = newLines.join('\n');
      await writeFile(filePath, newContent, 'utf-8');
      
      const linesRemoved = lines.length - newLines.length;
      fixes.push({ 
        file: filePath, 
        success: true,
        removed: linesRemoved
      });
      return true;
    }
    
    return false;
  } catch (error) {
    fixes.push({ 
      file: filePath, 
      success: false, 
      error: error.message 
    });
    return false;
  }
}

async function scanDirectory(dir, depth = 0) {
  if (depth > 10) return; // Prevent infinite recursion
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (excludeDirs.includes(entry.name)) continue;
      
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await scanDirectory(fullPath, depth + 1);
      } else if (entry.name.match(/\.(ts|tsx|js|jsx)$/)) {
        await cleanFile(fullPath);
      }
    }
  } catch (error) {
    // Skip directories that can't be read
  }
}

console.log('🧹 Removing all console.log statements from codebase...\n');
console.log('   Keeping only console.error and console.warn for critical issues\n');

await scanDirectory('app');
await scanDirectory('components');
await scanDirectory('lib');

console.log('\n📊 CLEANUP SUMMARY\n');
console.log('='.repeat(70));

const successful = fixes.filter(f => f.success);
const failed = fixes.filter(f => !f.success);

console.log(`✅ Files cleaned: ${successful.length}`);
console.log(`❌ Failed: ${failed.length}`);

const totalLinesRemoved = successful.reduce((sum, f) => sum + f.removed, 0);
console.log(`🎯 Total console.log lines removed: ${totalLinesRemoved}`);

if (successful.length > 0 && successful.length <= 50) {
  console.log('\n📁 Cleaned files:');
  successful.forEach(f => {
    console.log(`  - ${f.file} (${f.removed} lines)`);
  });
} else if (successful.length > 50) {
  console.log('\n📁 Sample of cleaned files (showing first 20):');
  successful.slice(0, 20).forEach(f => {
    console.log(`  - ${f.file} (${f.removed} lines)`);
  });
  console.log(`  ... and ${successful.length - 20} more files`);
}

if (failed.length > 0) {
  console.log('\n❌ Failed files:');
  failed.forEach(f => {
    console.log(`  - ${f.file}: ${f.error}`);
  });
}

console.log('\n✨ Console log cleanup complete!');
console.log('   ✅ All debug console.log statements removed');
console.log('   ✅ Critical error logging preserved');
console.log('   ✅ Warning messages preserved');
