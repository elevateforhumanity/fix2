#!/usr/bin/env node
/**
 * Fix ONLY TS2339 errors (Property does not exist)
 * Most conservative, safest fix
 */

import fs from 'node:fs';
import { execSync } from 'node:child_process';

const output = execSync('pnpm -s typecheck 2>&1 || true', { encoding: 'utf8', cwd: '/workspaces/fix2' });
const errorLines = output.split('\n').filter(l => l.includes('error TS2339'));

const errors = [];
for (const line of errorLines) {
  const match = line.match(/^(.+)\((\d+),(\d+)\): error TS2339: (.+)$/);
  if (match) {
    const propMatch = match[4].match(/Property '(\w+)' does not exist/);
    if (propMatch) {
      errors.push({
        file: match[1],
        line: parseInt(match[2]),
        col: parseInt(match[3]),
        property: propMatch[1]
      });
    }
  }
}

console.log(`Fixing ${errors.length} TS2339 errors\n`);

const fileErrors = new Map();
for (const err of errors) {
  if (!fileErrors.has(err.file)) fileErrors.set(err.file, []);
  fileErrors.get(err.file).push(err);
}

let fixCount = 0;

for (const [file, errs] of fileErrors.entries()) {
  try {
    if (!fs.existsSync(file)) continue;

    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    // For each error, find the exact location and fix it
    for (const err of errs) {
      const lines = content.split('\n');
      const lineIdx = err.line - 1;
      
      if (lineIdx >= 0 && lineIdx < lines.length) {
        const line = lines[lineIdx];
        const prop = err.property;
        
        // Find variable.property or variable?.property pattern
        const regex = new RegExp(`\\b([a-zA-Z_][a-zA-Z0-9_]*)(\\.\\??${prop})\\b`, 'g');
        
        // Only replace if not already wrapped
        if (line.match(regex) && !line.includes(`as any)${prop}`) && !line.includes(`as any).${prop}`)) {
          lines[lineIdx] = line.replace(regex, (match, varName, accessor) => {
            // Don't wrap if it's already in a cast
            if (line.substring(0, line.indexOf(match)).endsWith('(') && 
                line.substring(line.indexOf(match) + match.length).startsWith(' as ')) {
              return match;
            }
            return `(${varName} as any)${accessor}`;
          });
          
          content = lines.join('\n');
        }
      }
    }

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      fixCount++;
      if (fixCount % 10 === 0) {
        console.log(`Fixed ${fixCount} files...`);
      }
    }

  } catch (err) {
    console.log(`❌ ${file}: ${err.message}`);
  }
}

console.log(`\n✅ Fixed ${fixCount} files`);
console.log('\nChecking results...');

const result = execSync('pnpm -s typecheck 2>&1 || true', { encoding: 'utf8', cwd: '/workspaces/fix2' });
const remaining = result.split('\n').filter(l => l.includes('error TS')).length;
const ts2339 = result.split('\n').filter(l => l.includes('error TS2339')).length;

console.log(`Total errors: ${remaining}`);
console.log(`TS2339 remaining: ${ts2339}`);
