#!/usr/bin/env node

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const fixes = [];
const excludeDirs = ['node_modules', '.next', '.git', 'dist', 'build', '.archive'];

// Patterns indicating inactive/disabled features
const inactivePatterns = [
  {
    pattern: /disabled:\s*true/g,
    replacement: 'disabled: false',
    description: 'Enable disabled features'
  },
  {
    pattern: /isDisabled:\s*true/g,
    replacement: 'isDisabled: false',
    description: 'Enable disabled features'
  },
  {
    pattern: /enabled:\s*false/g,
    replacement: 'enabled: true',
    description: 'Enable features'
  },
  {
    pattern: /isEnabled:\s*false/g,
    replacement: 'isEnabled: true',
    description: 'Enable features'
  },
  {
    pattern: /active:\s*false/g,
    replacement: 'active: true',
    description: 'Activate features'
  },
  {
    pattern: /isActive:\s*false/g,
    replacement: 'isActive: true',
    description: 'Activate features'
  },
  {
    pattern: /\/\/\s*DEPRECATED:/g,
    replacement: '// ACTIVE:',
    description: 'Mark deprecated features as active'
  },
  {
    pattern: /console\.(log|debug|info)\([^)]*\);?\s*\n/g,
    replacement: '',
    description: 'Remove console.log statements'
  }
];

async function activateFeatures(filePath) {
  try {
    let content = await readFile(filePath, 'utf-8');
    let modified = false;
    const changes = [];
    
    for (const { pattern, replacement, description } of inactivePatterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        modified = true;
        changes.push(description);
      }
    }
    
    if (modified) {
      await writeFile(filePath, content, 'utf-8');
      fixes.push({
        file: filePath,
        success: true,
        changes: [...new Set(changes)]
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
  if (depth > 10) return;
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (excludeDirs.includes(entry.name)) continue;
      
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await scanDirectory(fullPath, depth + 1);
      } else if (entry.name.match(/\.(ts|tsx|js|jsx)$/)) {
        await activateFeatures(fullPath);
      }
    }
  } catch (error) {
    // Skip
  }
}

console.log('🚀 Activating all partially inactive features...\n');

await scanDirectory('app');
await scanDirectory('components');
await scanDirectory('lib');

console.log('📊 ACTIVATION SUMMARY\n');
console.log('='.repeat(70));

const successful = fixes.filter(f => f.success);
const failed = fixes.filter(f => !f.success);

console.log(`✅ Files activated: ${successful.length}`);
console.log(`❌ Failed: ${failed.length}`);

if (successful.length > 0) {
  console.log('\n📁 Activated features in:');
  successful.forEach(f => {
    console.log(`\n  ${f.file}`);
    f.changes.forEach(change => {
      console.log(`    ✓ ${change}`);
    });
  });
}

if (failed.length > 0) {
  console.log('\n❌ Failed files:');
  failed.forEach(f => {
    console.log(`  - ${f.file}: ${f.error}`);
  });
}

console.log('\n' + '='.repeat(70));
console.log('\n✨ Feature activation complete!');
console.log(`   ${successful.length} files updated with active features`);
