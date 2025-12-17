#!/usr/bin/env node
/**
 * Automated TypeScript error fixer
 * Applies common fix patterns to resolve bulk errors
 */

import fs from 'node:fs';
import path from 'node:path';

const errors = JSON.parse(fs.readFileSync('.autopilot/reports/errors.json', 'utf8')).errors;

// Group errors by file
const fileErrors = new Map();
for (const err of errors) {
  if (!fileErrors.has(err.file)) {
    fileErrors.set(err.file, []);
  }
  fileErrors.get(err.file).push(err);
}

let fixCount = 0;
let skipCount = 0;

for (const [file, errs] of fileErrors.entries()) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Fix 1: Add await to createClient() calls
    if (content.includes('const supabase = createClient()')) {
      content = content.replace(/const supabase = createClient\(\)/g, 'const supabase = await createClient()');
      modified = true;
      fixCount++;
    }
    
    // Fix 2: Wrap error.message access
    const errorMessagePattern = /catch\s*\(\s*(\w+)\s*\)\s*\{[^}]*\1\.message/g;
    if (errorMessagePattern.test(content)) {
      content = content.replace(
        /catch\s*\(\s*(\w+)\s*\)\s*\{/g,
        (match, varName) => {
          return `catch (${varName}) {\n    const err = ${varName} instanceof Error ? ${varName} : new Error(String(${varName}));\n  `;
        }
      );
      // Then replace error.message with err.message
      content = content.replace(/(\w+)\.message/g, (match, varName) => {
        if (varName === 'error' || varName === 'e' || varName === 'err') {
          return 'err.message';
        }
        return match;
      });
      modified = true;
      fixCount++;
    }
    
    // Fix 3: Add missing resend import
    if (content.includes('resend.') && !content.includes('import') && !content.includes('Resend')) {
      const lines = content.split('\n');
      const importIndex = lines.findIndex(l => l.includes('import'));
      if (importIndex >= 0) {
        lines.splice(importIndex + 1, 0, "import { Resend } from 'resend';");
        lines.splice(importIndex + 2, 0, "const resend = new Resend(process.env.RESEND_API_KEY);");
        content = lines.join('\n');
        modified = true;
        fixCount++;
      }
    }
    
    // Fix 4: Add missing Link import
    if (content.includes('<Link') && !content.includes("import Link from 'next/link'")) {
      const lines = content.split('\n');
      const importIndex = lines.findIndex(l => l.includes('import'));
      if (importIndex >= 0) {
        lines.splice(importIndex + 1, 0, "import Link from 'next/link';");
        content = lines.join('\n');
        modified = true;
        fixCount++;
      }
    }
    
    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ Fixed: ${file}`);
    }
  } catch (err) {
    console.log(`⚠️  Skip: ${file} - ${err.message}`);
    skipCount++;
  }
}

console.log(`\n✅ Applied ${fixCount} automated fixes`);
console.log(`⚠️  Skipped ${skipCount} files`);
console.log(`\nRun: pnpm typecheck to see remaining errors`);
