#!/usr/bin/env node
/**
 * Fix syntax errors from bad replacements
 */

import fs from 'node:fs';
import { execSync } from 'node:child_process';

// Get files with TS1003 errors
const output = execSync('pnpm -s typecheck 2>&1 || true', { encoding: 'utf8', cwd: '/workspaces/fix2' });
const errorLines = output.split('\n').filter(l => l.includes('error TS1003'));

const files = new Set();
for (const line of errorLines) {
  const match = line.match(/^([^(]+)\(/);
  if (match) files.add(match[1]);
}

console.log(`Fixing syntax errors in ${files.size} files\n`);

for (const file of files) {
  try {
    if (!fs.existsSync(file)) continue;

    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    // Fix: this.(lmsAPI as any) -> (this.lmsAPI as any)
    content = content.replace(/this\.\((lmsAPI as any)\)/g, '(this.lmsAPI as any)');
    
    // Fix: other broken (as any) patterns
    content = content.replace(/\.\((\w+ as any)\)/g, '.($1)');
    
    // Fix: window.(API as any) -> (window.API as any)
    content = content.replace(/window\.\((API(?:_1484_11)? as any)\)/g, '(window.$1)');

    // Fix template literal issues in strings
    content = content.replace(/`([^`]*)\$\{toError\((\w+)\)\.message\}([^`]*)`/g, '`$1${toError($2).message}$3`');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ ${file}`);
    }

  } catch (err) {
    console.log(`❌ ${file}: ${err.message}`);
  }
}

console.log('\nDone');
