#!/usr/bin/env node

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const fixes = [];
const excludeDirs = ['node_modules', '.next', '.git', 'dist', 'build', '.archive'];

// Patterns to remove (debug/development console logs)
const removePatterns = [
  // Generic debug logs
  /console\.log\([^)]*\);?\s*\n/g,
  /console\.debug\([^)]*\);?\s*\n/g,
  /console\.info\([^)]*\);?\s*\n/g,
  
  // Standalone console.error with generic messages (keep specific error handling)
  /console\.error\(['"]Error:['"][^)]*\);?\s*\n/g,
];

// Patterns to keep (essential error logging)
const keepPatterns = [
  /console\.error\(['"].*notification.*error/i,
  /console\.error\(['"].*certificate.*error/i,
  /console\.error\(['"]Failed to/i,
  /console\.error\(['"]Error (creating|fetching|marking|deleting|getting|cleaning)/i,
];

async function shouldRemoveConsoleLine(line) {
  // Keep essential error logs
  for (const pattern of keepPatterns) {
    if (pattern.test(line)) {
      return false;
    }
  }
  
  // Remove debug logs
  if (line.includes('console.log') || 
      line.includes('console.debug') || 
      line.includes('console.info')) {
    return true;
  }
  
  return false;
}

async function cleanConsoleStatements(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    let modified = false;
    const newLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      
      // Check if this is a console statement line
      if (trimmed.match(/^\s*console\.(log|debug|info)\(/)) {
        // Check if it's a multi-line console statement
        let fullStatement = line;
        let j = i;
        
        // Collect full statement if it spans multiple lines
        while (j < lines.length && !fullStatement.includes(');')) {
          j++;
          if (j < lines.length) {
            fullStatement += '\n' + lines[j];
          }
        }
        
        if (await shouldRemoveConsoleLine(fullStatement)) {
          modified = true;
          // Skip all lines that were part of this statement
          i = j;
          continue;
        }
      }
      
      newLines.push(line);
    }
    
    if (modified) {
      const newContent = newLines.join('\n');
      await writeFile(filePath, newContent, 'utf-8');
      fixes.push({ 
        file: filePath, 
        success: true,
        removed: lines.length - newLines.length
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

async function scanDirectory(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (excludeDirs.includes(entry.name)) continue;
      
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await scanDirectory(fullPath);
      } else if (entry.name.match(/\.(ts|tsx|js|jsx)$/)) {
        // Focus on notification and certificate files
        const content = await readFile(fullPath, 'utf-8');
        if (content.match(/notif|certificate|cert/i) && 
            content.match(/console\.(log|debug|info)/)) {
          await cleanConsoleStatements(fullPath);
        }
      }
    }
  } catch (error) {
    // Skip directories that can't be read
  }
}

console.log('🧹 Cleaning console.log statements from notifications and certificates...\n');

await scanDirectory('app');
await scanDirectory('components');
await scanDirectory('lib');

console.log('\n📊 CLEANUP SUMMARY\n');
console.log('='.repeat(60));

const successful = fixes.filter(f => f.success);
const failed = fixes.filter(f => !f.success);

console.log(`✅ Files cleaned: ${successful.length}`);
console.log(`❌ Failed: ${failed.length}`);

if (successful.length > 0) {
  console.log('\n📁 Cleaned files:');
  successful.forEach(f => {
    console.log(`  - ${f.file} (removed ${f.removed} lines)`);
  });
}

if (failed.length > 0) {
  console.log('\n❌ Failed files:');
  failed.forEach(f => {
    console.log(`  - ${f.file}: ${f.error}`);
  });
}

const totalLinesRemoved = successful.reduce((sum, f) => sum + f.removed, 0);
console.log(`\n🎯 Total console.log lines removed: ${totalLinesRemoved}`);
console.log('\n✨ Console log cleanup complete!');
console.log('   Essential error logging has been preserved.');
