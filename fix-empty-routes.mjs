#!/usr/bin/env node

import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join } from 'path';

const fixes = [];
const excludeDirs = ['node_modules', '.next', '.git', 'dist', 'build', '.archive'];

async function analyzeRoute(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    const stats = await stat(filePath);
    
    // Check if route is empty or minimal
    if (stats.size < 300) {
      return {
        file: filePath,
        size: stats.size,
        isEmpty: true,
        content: content
      };
    }
    
    // Check for stub implementations
    if (content.includes('return NextResponse.json({})') ||
        content.includes('return NextResponse.json({ })') ||
        content.includes('return NextResponse.json([])')) {
      return {
        file: filePath,
        size: stats.size,
        isStub: true,
        content: content
      };
    }
    
    // Check for console.log in routes
    if (content.match(/console\.(log|debug|info)/)) {
      return {
        file: filePath,
        size: stats.size,
        hasConsoleLog: true,
        content: content
      };
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

async function fixEmptyRoute(filePath, content) {
  try {
    // Remove console.log statements
    let newContent = content;
    const lines = newContent.split('\n');
    const cleanedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      
      // Skip console.log lines
      if (trimmed.match(/^\s*console\.(log|debug|info)\(/)) {
        // Handle multi-line console statements
        let j = i;
        while (j < lines.length && !lines[j].includes(');')) {
          j++;
        }
        i = j;
        continue;
      }
      
      cleanedLines.push(line);
    }
    
    newContent = cleanedLines.join('\n');
    
    // If content changed, write it back
    if (newContent !== content) {
      await writeFile(filePath, newContent, 'utf-8');
      return {
        success: true,
        linesRemoved: lines.length - cleanedLines.length
      };
    }
    
    return { success: false, reason: 'No changes needed' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function scanApiRoutes(dir, depth = 0) {
  if (depth > 10) return;
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (excludeDirs.includes(entry.name)) continue;
      
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await scanApiRoutes(fullPath, depth + 1);
      } else if (entry.name === 'route.ts' || entry.name === 'route.js') {
        const analysis = await analyzeRoute(fullPath);
        if (analysis) {
          const fix = await fixEmptyRoute(fullPath, analysis.content);
          fixes.push({
            ...analysis,
            fix
          });
        }
      }
    }
  } catch (error) {
    // Skip
  }
}

console.log('🔍 Scanning API routes for empty implementations and console.logs...\n');

await scanApiRoutes('app/api');

console.log('📊 ROUTE ANALYSIS\n');
console.log('='.repeat(70));

const emptyRoutes = fixes.filter(f => f.isEmpty);
const stubRoutes = fixes.filter(f => f.isStub);
const consoleLogRoutes = fixes.filter(f => f.hasConsoleLog);
const fixedRoutes = fixes.filter(f => f.fix?.success);

console.log(`\n📭 Empty Routes (< 300 bytes): ${emptyRoutes.length}`);
if (emptyRoutes.length > 0) {
  emptyRoutes.slice(0, 10).forEach(r => {
    console.log(`   ${r.file} (${r.size} bytes)`);
  });
}

console.log(`\n🔸 Stub Routes (returning empty objects): ${stubRoutes.length}`);
if (stubRoutes.length > 0) {
  stubRoutes.slice(0, 10).forEach(r => {
    console.log(`   ${r.file}`);
  });
}

console.log(`\n🔴 Routes with console.log: ${consoleLogRoutes.length}`);
if (consoleLogRoutes.length > 0) {
  consoleLogRoutes.slice(0, 10).forEach(r => {
    console.log(`   ${r.file}`);
  });
}

console.log(`\n✅ Routes Fixed: ${fixedRoutes.length}`);
if (fixedRoutes.length > 0) {
  fixedRoutes.forEach(r => {
    console.log(`   ${r.file} (removed ${r.fix.linesRemoved} lines)`);
  });
}

console.log('\n' + '='.repeat(70));

const totalIssues = emptyRoutes.length + stubRoutes.length;
const totalFixed = fixedRoutes.length;

console.log(`\n📈 SUMMARY`);
console.log(`   Total routes with issues: ${totalIssues}`);
console.log(`   Routes fixed: ${totalFixed}`);
console.log(`   Empty routes needing implementation: ${emptyRoutes.length}`);
console.log(`   Stub routes needing implementation: ${stubRoutes.length}`);

if (totalIssues > 0) {
  console.log(`\n⚡ ACTION REQUIRED: ${totalIssues} routes need proper implementation`);
} else {
  console.log(`\n✅ All routes appear to be properly implemented!`);
}

console.log('\n✨ Route cleanup complete!');
