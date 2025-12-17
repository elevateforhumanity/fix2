#!/usr/bin/env node
/**
 * Fix remaining TypeScript errors carefully
 */

import fs from 'node:fs';
import { execSync } from 'node:child_process';

// Get current errors
const output = execSync('pnpm -s typecheck 2>&1', { encoding: 'utf8', cwd: '/workspaces/fix2' });
const errorLines = output.split('\n').filter(l => l.includes('error TS'));

console.log(`Found ${errorLines.length} errors to fix\n`);

// Parse errors
const errors = [];
for (const line of errorLines) {
  const match = line.match(/^(.+)\((\d+),(\d+)\): error (TS\d+): (.+)$/);
  if (match) {
    errors.push({
      file: match[1],
      line: parseInt(match[2]),
      col: parseInt(match[3]),
      code: match[4],
      msg: match[5]
    });
  }
}

// Group by file
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

    // Fix TS1144: '{' or ';' expected - caused by bad async insertion
    // Revert bad changes
    content = content.replace(
      /^(export default function \w+\([^)]*\)) async \{/gm,
      'export default async function $1 {'
    );

    // Fix properly: add async before function name
    const lines = content.split('\n');
    for (const err of errs) {
      if (err.code === 'TS1144' || err.code === 'TS1308') {
        const lineIdx = err.line - 1;
        if (lines[lineIdx]) {
          const line = lines[lineIdx];
          // Check if it's a function declaration that needs async
          if (line.match(/^export default function/) && !line.includes('async')) {
            lines[lineIdx] = line.replace('export default function', 'export default async function');
          } else if (line.match(/^function \w+/) && !line.includes('async') && content.includes('await')) {
            lines[lineIdx] = line.replace(/^function/, 'async function');
          } else if (line.match(/^export function \w+/) && !line.includes('async') && content.includes('await')) {
            lines[lineIdx] = line.replace('export function', 'export async function');
          }
        }
      }
    }
    content = lines.join('\n');

    // Fix TS1003: Identifier expected - usually template literal issues
    for (const err of errs) {
      if (err.code === 'TS1003') {
        const lineIdx = err.line - 1;
        if (lines[lineIdx]) {
          // Check for unescaped template literals in strings
          const line = lines[lineIdx];
          if (line.includes('${') && !line.includes('`')) {
            // Likely a string that should be a template literal
            lines[lineIdx] = line.replace(/(['"])([^'"]*\$\{[^'"]*)\1/g, '`$2`');
          }
        }
      }
    }
    content = lines.join('\n');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      fixCount++;
      console.log(`✅ Fixed: ${file}`);
    }

  } catch (err) {
    console.log(`❌ Error: ${file} - ${err.message}`);
  }
}

console.log(`\n✅ Fixed ${fixCount} files`);
