#!/usr/bin/env node

import { readdir, readFile, stat } from 'fs/promises';
import { join } from 'path';

const issues = {
  missingImplementations: [],
  consoleStatements: [],
  emptyRoutes: [],
  errorHandling: [],
  inactiveFeatures: []
};

async function analyzeFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    
    // Check for console statements
    lines.forEach((line, idx) => {
      if (line.match(/console\.(log|error|warn|debug|info)/)) {
        issues.consoleStatements.push({
          file: filePath,
          line: idx + 1,
          content: line.trim()
        });
      }
    });
    
    // Check for TODO/FIXME/incomplete implementations
    if (content.match(/TODO|FIXME|XXX|HACK|NOT IMPLEMENTED|throw new Error/i)) {
      issues.missingImplementations.push({
        file: filePath,
        reason: 'Contains TODO/FIXME or incomplete implementation'
      });
    }
    
    // Check for empty or minimal routes
    const stats = await stat(filePath);
    if (stats.size < 200) {
      issues.emptyRoutes.push({
        file: filePath,
        size: stats.size
      });
    }
    
    // Check for missing error handling
    if (!content.includes('try') && !content.includes('catch')) {
      issues.errorHandling.push({
        file: filePath,
        reason: 'No try-catch error handling'
      });
    }
    
    // Check for inactive/disabled features
    if (content.match(/disabled|inactive|commented out|return null|return \{\}/i)) {
      issues.inactiveFeatures.push({
        file: filePath,
        reason: 'Potentially inactive feature detected'
      });
    }
    
  } catch (error) {
    console.error(`Error analyzing ${filePath}:`, error.message);
  }
}

async function scanDirectory(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          await scanDirectory(fullPath);
        }
      } else if (entry.name === 'route.ts' || entry.name === 'route.js') {
        await analyzeFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error scanning ${dir}:`, error.message);
  }
}

console.log('🔍 Analyzing API routes...\n');

await scanDirectory('app/api');

console.log('📊 ANALYSIS RESULTS\n');
console.log('='.repeat(60));

console.log(`\n🔴 Console Statements: ${issues.consoleStatements.length}`);
if (issues.consoleStatements.length > 0) {
  const grouped = {};
  issues.consoleStatements.forEach(item => {
    if (!grouped[item.file]) grouped[item.file] = [];
    grouped[item.file].push(item);
  });
  
  Object.entries(grouped).slice(0, 10).forEach(([file, items]) => {
    console.log(`  ${file} (${items.length} statements)`);
  });
  if (Object.keys(grouped).length > 10) {
    console.log(`  ... and ${Object.keys(grouped).length - 10} more files`);
  }
}

console.log(`\n⚠️  Missing Implementations: ${issues.missingImplementations.length}`);
issues.missingImplementations.slice(0, 10).forEach(item => {
  console.log(`  ${item.file}`);
  console.log(`    → ${item.reason}`);
});

console.log(`\n📭 Empty/Minimal Routes: ${issues.emptyRoutes.length}`);
issues.emptyRoutes.slice(0, 10).forEach(item => {
  console.log(`  ${item.file} (${item.size} bytes)`);
});

console.log(`\n🚨 Missing Error Handling: ${issues.errorHandling.length}`);
issues.errorHandling.slice(0, 10).forEach(item => {
  console.log(`  ${item.file}`);
});

console.log(`\n💤 Potentially Inactive Features: ${issues.inactiveFeatures.length}`);
issues.inactiveFeatures.slice(0, 10).forEach(item => {
  console.log(`  ${item.file}`);
  console.log(`    → ${item.reason}`);
});

console.log('\n' + '='.repeat(60));
console.log('\n✅ Analysis complete!\n');

// Summary
const totalIssues = 
  issues.consoleStatements.length +
  issues.missingImplementations.length +
  issues.emptyRoutes.length +
  issues.errorHandling.length +
  issues.inactiveFeatures.length;

console.log(`📈 Total Issues Found: ${totalIssues}`);
console.log(`   - Console statements: ${issues.consoleStatements.length}`);
console.log(`   - Missing implementations: ${issues.missingImplementations.length}`);
console.log(`   - Empty routes: ${issues.emptyRoutes.length}`);
console.log(`   - Missing error handling: ${issues.errorHandling.length}`);
console.log(`   - Inactive features: ${issues.inactiveFeatures.length}`);
