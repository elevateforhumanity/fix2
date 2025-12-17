#!/usr/bin/env node
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const output = execSync('pnpm -s typecheck 2>&1 || true', { encoding: 'utf8', cwd: '/workspaces/fix2' });
const errorLines = output.split('\n').filter(l => l.includes('error TS1003') || l.includes('error TS1005'));

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

    // Fix: varName.(prop as any) -> (varName.prop as any)
    content = content.replace(/(\w+)\.\((\w+ as any)\)/g, '($1.$2)');

    // Fix: varName.(prop as unknown as Type) -> (varName.prop as unknown as Type)
    content = content.replace(/(\w+)\.\((\w+ as unknown as \w+)\)/g, '($1.$2)');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ ${file}`);
    }
  } catch (err) {
    console.log(`❌ ${file}: ${err.message}`);
  }
}

console.log('\nDone');
