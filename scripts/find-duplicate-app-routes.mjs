#!/usr/bin/env node
import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const APP_DIR = 'app';
const PAGE_FILE_RE = /^page\.(js|jsx|ts|tsx|mdx)$/;
const ignoredDirs = new Set(['node_modules', '.next']);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (ignoredDirs.has(entry)) continue;

    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath, files);
    } else if (PAGE_FILE_RE.test(entry)) {
      files.push(fullPath);
    }
  }

  return files;
}

function routeForPage(filePath) {
  const rel = relative(APP_DIR, filePath).split(sep);
  const routeParts = rel.slice(0, -1).filter((part) => {
    const isRouteGroup = part.startsWith('(') && part.endsWith(')');
    const isParallelRoute = part.startsWith('@');
    return !isRouteGroup && !isParallelRoute;
  });

  return `/${routeParts.join('/')}`.replace(/\/$/, '') || '/';
}

const pages = walk(APP_DIR);
const routes = new Map();

for (const page of pages) {
  const route = routeForPage(page);
  const existing = routes.get(route) ?? [];
  existing.push(page);
  routes.set(route, existing);
}

const duplicates = [...routes.entries()].filter(
  ([, files]) => files.length > 1
);

if (duplicates.length > 0) {
  console.error('Duplicate Next.js App Router pages found:');
  for (const [route, files] of duplicates) {
    console.error(`\n${route}`);
    for (const file of files) {
      console.error(`  - ${file}`);
    }
  }
  process.exit(1);
}

console.log(
  `No duplicate App Router pages found across ${pages.length} page files.`
);
