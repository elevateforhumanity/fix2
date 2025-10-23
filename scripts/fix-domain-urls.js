#!/usr/bin/env node
import { promises as fs, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const LEGACY_DOMAINS = [
  'https://stripe-integrate-curvaturebodysc.replit.app',
  'https://149dac3d-f555-4440-8be8-758dc290baa7-00-18qn78v70z4k6.janeway.replit.dev',
  'https://elevateforhumanity.pages.dev',
  'https://www.elevateforhumanity.pages.dev',
];
const NEW_DOMAIN = 'https://www.elevateforhumanity.org';
const DIST_DIR = path.resolve('dist');
const EXTENSIONS = new Set(['.html', '.js', '.css']);

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function collectFiles(dir) {
  const queue = [dir];
  const files = [];

  while (queue.length) {
    const current = queue.pop();
    let entries = [];

    try {
      entries = await fs.readdir(current, { withFileTypes: true });
    } catch (error) {
      console.error(`Failed to read directory ${current}: ${error.message}`);
      continue;
    }

    for (const entry of entries) {
      const entryPath = path.join(current, entry.name);

      if (entry.isDirectory()) {
        if (entry.name === 'node_modules') continue;
        queue.push(entryPath);
      } else if (EXTENSIONS.has(path.extname(entry.name))) {
        files.push(entryPath);
      }
    }
  }

  return files;
}

function fixUrlsInFile(file) {
  try {
    const src = readFileSync(file, 'utf8');
    let updated = src;
    let touched = false;

    for (const domain of LEGACY_DOMAINS) {
      if (!updated.includes(domain)) continue;
      const pattern = new RegExp(escapeRegExp(domain), 'g');
      updated = updated.replace(pattern, NEW_DOMAIN);
      touched = true;
    }

    if (!touched || updated === src) return false;

    writeFileSync(file, updated);
    console.log(`✅ Fixed URLs in: ${path.relative(process.cwd(), file)}`);
    return true;
  } catch (error) {
    console.error(`Failed to fix URLs in ${file}: ${error.message}`);
  }
  return false;
}

async function main() {
  if (
    !(await fs
      .stat(DIST_DIR)
      .then((stats) => stats.isDirectory())
      .catch(() => false))
  ) {
    console.warn('dist/ directory not found. Skipping domain fix.');
    return;
  }

  const files = await collectFiles(DIST_DIR);

  console.log(`🔄 Fixing domain URLs in ${files.length} files...`);
  let updatedCount = 0;
  files.forEach((file) => {
    if (fixUrlsInFile(file)) updatedCount += 1;
  });

  console.log(`Domain URL cleanup complete. Files updated: ${updatedCount}`);
}

main().catch((error) => {
  console.error('Unexpected error while fixing domain URLs:', error);
  process.exitCode = 1;
});
