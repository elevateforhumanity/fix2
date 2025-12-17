#!/usr/bin/env node
/**
 * Conservative TypeScript fixes - only safe, high-impact changes
 */

import fs from 'node:fs';

const errors = JSON.parse(fs.readFileSync('.autopilot/reports/errors-final.json', 'utf8')).errors;

const fileErrors = new Map();
for (const err of errors) {
  if (!fileErrors.has(err.file)) fileErrors.set(err.file, []);
  fileErrors.get(err.file).push(err);
}

let fixCount = 0;

console.log('Applying conservative fixes...\n');

for (const [file, errs] of fileErrors.entries()) {
  try {
    if (!fs.existsSync(file)) continue;

    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    // Fix 1: Import toError utility
    const needsToError = errs.some(e => 
      e.code === 'TS2339' && e.msg.includes("Property 'message' does not exist on type 'unknown'")
    );
    
    if (needsToError && !content.includes("from '@/lib/utils/errors'")) {
      const lines = content.split('\n');
      const firstImport = lines.findIndex(l => l.trim().startsWith('import '));
      if (firstImport >= 0) {
        lines.splice(firstImport, 0, "import { toError } from '@/lib/utils/errors';");
        content = lines.join('\n');
      }
    }

    // Fix 2: Use toError for error.message
    if (needsToError) {
      content = content.replace(
        /catch\s*\((\w+):\s*unknown\)\s*\{/g,
        'catch ($1: unknown) {\n    const err = toError($1);'
      );
      content = content.replace(/\berror\.message\b/g, 'err.message');
      content = content.replace(/\be\.message\b/g, 'toError(e).message');
    }

    // Fix 3: Auth handler signatures - only if using withAuth
    if (content.includes('withAuth') && content.includes(', user:')) {
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('async function') && line.includes(', user:')) {
          // Change signature
          lines[i] = line.replace(
            /(async function \w+\([^,]+,\s*context:[^,]+),\s*user:[^)]+\)/,
            '$1, context: { params: any; user: any })'
          );
          // Find and replace user. with context.user. in function body
          let braceCount = 0;
          let inFunction = false;
          for (let j = i; j < lines.length; j++) {
            if (lines[j].includes('{')) {
              braceCount += (lines[j].match(/\{/g) || []).length;
              inFunction = true;
            }
            if (lines[j].includes('}')) {
              braceCount -= (lines[j].match(/\}/g) || []).length;
            }
            if (inFunction && braceCount > 0) {
              lines[j] = lines[j].replace(/\buser\./g, 'context.user.');
            }
            if (braceCount === 0 && inFunction) break;
          }
        }
      }
      content = lines.join('\n');
    }

    // Fix 4: Stripe API version
    if (content.includes('apiVersion')) {
      content = content.replace(
        /apiVersion:\s*['"]2024-11-20\.acacia['"]/g,
        "apiVersion: '2025-10-29.clover' as const"
      );
      content = content.replace(
        /apiVersion:\s*['"]2024-12-18\.acacia['"]/g,
        "apiVersion: '2025-10-29.clover' as const"
      );
      content = content.replace(
        /apiVersion:\s*['"]2023-10-16['"]/g,
        "apiVersion: '2025-10-29.clover' as const"
      );
    }

    // Fix 5: Missing Link import
    if (content.includes('<Link') && !content.includes("import Link from 'next/link'")) {
      const lines = content.split('\n');
      const firstImport = lines.findIndex(l => l.trim().startsWith('import '));
      if (firstImport >= 0) {
        lines.splice(firstImport, 0, "import Link from 'next/link';");
        content = lines.join('\n');
      }
    }

    // Fix 6: Missing Resend import
    if (content.includes('resend.') && !content.includes('Resend')) {
      const lines = content.split('\n');
      const firstImport = lines.findIndex(l => l.trim().startsWith('import '));
      if (firstImport >= 0) {
        lines.splice(firstImport, 0, "import { Resend } from 'resend';");
        lines.splice(firstImport + 1, 0, "const resend = new Resend(process.env.RESEND_API_KEY);");
        content = lines.join('\n');
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

console.log(`\n✅ Fixed ${fixCount} files total`);
