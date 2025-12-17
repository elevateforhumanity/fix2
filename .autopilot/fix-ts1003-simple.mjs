#!/usr/bin/env node
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const output = execSync('pnpm -s typecheck 2>&1 || true', { encoding: 'utf8', cwd: '/workspaces/fix2' });
const errorLines = output.split('\n').filter(l => l.includes('error TS1003'));

const files = new Set();
for (const line of errorLines) {
  const match = line.match(/^([^(]+)\(/);
  if (match) files.add(match[1]);
}

console.log(`Fixing ${files.size} files with TS1003 errors\n`);

for (const file of files) {
  try {
    if (!fs.existsSync(file)) continue;

    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    // ONLY fix: varName.(propName as any) -> (varName.propName as any)
    // Use a very specific regex that won't break other things
    content = content.replace(
      /\b([a-zA-Z_][a-zA-Z0-9_]*)\.\(([a-zA-Z_][a-zA-Z0-9_]*) as any\)/g,
      '($1.$2 as any)'
    );

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ ${file}`);
    }
  } catch (err) {
    console.log(`❌ ${file}: ${err.message}`);
  }
}

console.log('\nDone');
