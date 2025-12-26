#!/usr/bin/env node

import { readdir, readFile, stat } from 'fs/promises';
import { join } from 'path';

const partialFeatures = {
  todos: [],
  stubs: [],
  disabled: [],
  incomplete: [],
  emptyFunctions: [],
  missingImplementations: []
};

const excludeDirs = ['node_modules', '.next', '.git', 'dist', 'build', '.archive'];

async function analyzeFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    
    lines.forEach((line, idx) => {
      const lineNum = idx + 1;
      const trimmed = line.trim();
      
      // TODO/FIXME markers
      if (trimmed.match(/\/\/\s*(TODO|FIXME|XXX|HACK|BUG|OPTIMIZE)/i)) {
        partialFeatures.todos.push({
          file: filePath,
          line: lineNum,
          content: trimmed
        });
      }
      
      // Stub implementations
      if (trimmed.match(/return null|return undefined|return \{\}|return \[\]/)) {
        if (lines[idx - 1]?.includes('TODO') || lines[idx + 1]?.includes('TODO')) {
          partialFeatures.stubs.push({
            file: filePath,
            line: lineNum,
            content: trimmed
          });
        }
      }
      
      // Disabled features
      if (trimmed.match(/disabled:\s*true|isDisabled|commented out|feature flag.*false/i)) {
        partialFeatures.disabled.push({
          file: filePath,
          line: lineNum,
          content: trimmed
        });
      }
      
      // Not implemented errors
      if (trimmed.match(/throw new Error.*not implemented|not yet implemented/i)) {
        partialFeatures.incomplete.push({
          file: filePath,
          line: lineNum,
          content: trimmed
        });
      }
      
      // Empty function bodies
      if (trimmed.match(/function.*\{\s*\}|=>\s*\{\s*\}/)) {
        partialFeatures.emptyFunctions.push({
          file: filePath,
          line: lineNum,
          content: trimmed
        });
      }
    });
    
    // Check for missing implementations (placeholder components)
    if (content.match(/Coming Soon|Under Construction|Work in Progress|Placeholder/i)) {
      partialFeatures.missingImplementations.push({
        file: filePath,
        reason: 'Contains placeholder text'
      });
    }
    
  } catch (error) {
    // Skip files that can't be read
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
        await analyzeFile(fullPath);
      }
    }
  } catch (error) {
    // Skip directories that can't be read
  }
}

console.log('🔍 Scanning for partial/incomplete features...\n');

await scanDirectory('app');
await scanDirectory('components');
await scanDirectory('lib');

console.log('📊 PARTIAL FEATURES REPORT\n');
console.log('='.repeat(70));

console.log(`\n📝 TODO/FIXME Comments: ${partialFeatures.todos.length}`);
if (partialFeatures.todos.length > 0) {
  const grouped = {};
  partialFeatures.todos.forEach(item => {
    const key = item.file;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });
  
  Object.entries(grouped).slice(0, 15).forEach(([file, items]) => {
    console.log(`\n  📄 ${file} (${items.length} items)`);
    items.slice(0, 3).forEach(item => {
      console.log(`     Line ${item.line}: ${item.content.substring(0, 80)}`);
    });
    if (items.length > 3) {
      console.log(`     ... and ${items.length - 3} more`);
    }
  });
  
  if (Object.keys(grouped).length > 15) {
    console.log(`\n  ... and ${Object.keys(grouped).length - 15} more files`);
  }
}

console.log(`\n\n🔸 Stub Implementations: ${partialFeatures.stubs.length}`);
partialFeatures.stubs.slice(0, 10).forEach(item => {
  console.log(`  ${item.file}:${item.line}`);
  console.log(`    ${item.content}`);
});

console.log(`\n\n❌ Disabled Features: ${partialFeatures.disabled.length}`);
partialFeatures.disabled.slice(0, 10).forEach(item => {
  console.log(`  ${item.file}:${item.line}`);
  console.log(`    ${item.content}`);
});

console.log(`\n\n⚠️  Incomplete Implementations: ${partialFeatures.incomplete.length}`);
partialFeatures.incomplete.slice(0, 10).forEach(item => {
  console.log(`  ${item.file}:${item.line}`);
  console.log(`    ${item.content}`);
});

console.log(`\n\n🕳️  Empty Functions: ${partialFeatures.emptyFunctions.length}`);
partialFeatures.emptyFunctions.slice(0, 10).forEach(item => {
  console.log(`  ${item.file}:${item.line}`);
});

console.log(`\n\n🚧 Missing Implementations: ${partialFeatures.missingImplementations.length}`);
partialFeatures.missingImplementations.slice(0, 10).forEach(item => {
  console.log(`  ${item.file}`);
  console.log(`    → ${item.reason}`);
});

console.log('\n' + '='.repeat(70));

const totalIssues = 
  partialFeatures.todos.length +
  partialFeatures.stubs.length +
  partialFeatures.disabled.length +
  partialFeatures.incomplete.length +
  partialFeatures.emptyFunctions.length +
  partialFeatures.missingImplementations.length;

console.log(`\n📈 SUMMARY`);
console.log(`   Total Partial Features: ${totalIssues}`);
console.log(`   - TODO/FIXME comments: ${partialFeatures.todos.length}`);
console.log(`   - Stub implementations: ${partialFeatures.stubs.length}`);
console.log(`   - Disabled features: ${partialFeatures.disabled.length}`);
console.log(`   - Incomplete implementations: ${partialFeatures.incomplete.length}`);
console.log(`   - Empty functions: ${partialFeatures.emptyFunctions.length}`);
console.log(`   - Missing implementations: ${partialFeatures.missingImplementations.length}`);

if (totalIssues > 0) {
  console.log(`\n⚡ ACTION REQUIRED: ${totalIssues} features need completion`);
} else {
  console.log(`\n✅ All features appear to be complete!`);
}
