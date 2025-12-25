// scripts/verify-nav-links.ts
import fs from 'node:fs';
import path from 'node:path';
import {
  studentNavigation,
  adminNavigation,
  programHolderNavigation,
  employerNavigation,
  staffNavigation,
  instructorNavigation,
  boardNavigation,
  workforceBoardNavigation,
} from '../lib/navigation/dashboard-nav.config';

type NavItem = { href?: string; children?: NavItem[] };
type NavSection = { children: NavItem[] };

const APP_DIR = path.join(process.cwd(), 'app');

function walk(obj: any): string[] {
  const out: string[] = [];
  const visit = (node: any) => {
    if (!node) return;
    if (Array.isArray(node)) return node.forEach(visit);
    if (typeof node !== 'object') return;

    if (typeof node.href === 'string') out.push(node.href);
    if (Array.isArray(node.children)) node.children.forEach(visit);
  };
  visit(obj);
  return out;
}

function normalizeHref(href: string): string {
  // Strip query/hash for auditing
  return href.split('#')[0].split('?')[0];
}

function hrefToPossibleRouteDirs(href: string): string[] {
  const clean = normalizeHref(href);
  const parts = clean.replace(/\/+$/, '').split('/').filter(Boolean);
  const base = path.join(APP_DIR, ...parts);
  return [base];
}

function routeExistsForHref(href: string): boolean {
  const clean = normalizeHref(href);

  // Reject route-group URLs (parentheses)
  if (clean.includes('(') || clean.includes(')')) return false;

  // Must be an absolute app route
  if (!clean.startsWith('/')) return false;

  const parts = clean.replace(/\/+$/, '').split('/').filter(Boolean);

  // Check direct path first
  const directPath = path.join(APP_DIR, ...parts);
  if (checkRouteFiles(directPath)) return true;

  // Check with route groups - try common patterns
  // For /lms/dashboard, check app/lms/(app)/dashboard, app/lms/(public)/dashboard, etc.
  if (parts.length >= 2) {
    const baseDir = path.join(APP_DIR, parts[0]);
    if (fs.existsSync(baseDir)) {
      const entries = fs.readdirSync(baseDir);
      for (const entry of entries) {
        if (entry.startsWith('(') && entry.endsWith(')')) {
          // Found a route group, check if our route exists inside it
          const groupPath = path.join(baseDir, entry, ...parts.slice(1));
          if (checkRouteFiles(groupPath)) return true;
        }
      }
    }
  }

  return false;
}

function checkRouteFiles(dir: string): boolean {
  if (!fs.existsSync(dir)) return false;

  const page = path.join(dir, 'page.tsx');
  const routeTs = path.join(dir, 'route.ts');
  const routeTsx = path.join(dir, 'route.tsx');

  return (
    fs.existsSync(page) || fs.existsSync(routeTs) || fs.existsSync(routeTsx)
  );
}

function main() {
  const navSets = [
    { name: 'studentNavigation', data: studentNavigation },
    { name: 'adminNavigation', data: adminNavigation },
    { name: 'programHolderNavigation', data: programHolderNavigation },
    { name: 'employerNavigation', data: employerNavigation },
    { name: 'staffNavigation', data: staffNavigation },
    { name: 'instructorNavigation', data: instructorNavigation },
    { name: 'boardNavigation', data: boardNavigation },
    { name: 'workforceBoardNavigation', data: workforceBoardNavigation },
  ];

  const allHrefs = new Map<string, string[]>(); // href -> [navSetName...]
  for (const set of navSets) {
    const hrefs = walk(set.data);
    for (const h of hrefs) {
      const clean = normalizeHref(h);
      const list = allHrefs.get(clean) ?? [];
      list.push(set.name);
      allHrefs.set(clean, list);
    }
  }

  const failures: { href: string; usedIn: string[]; reason: string }[] = [];

  for (const [href, usedIn] of allHrefs.entries()) {
    if (href.includes('(') || href.includes(')')) {
      failures.push({
        href,
        usedIn,
        reason: 'Contains route-group parentheses — invalid URL',
      });
      continue;
    }
    if (!routeExistsForHref(href)) {
      failures.push({
        href,
        usedIn,
        reason: 'No matching route folder with page.tsx/route.ts(x)',
      });
    }
  }

  const reportLines: string[] = [];
  reportLines.push('# Dashboard Nav Link Audit');
  reportLines.push('');
  reportLines.push(`Generated: ${new Date().toISOString()}`);
  reportLines.push('');
  reportLines.push(`Checked href count: ${allHrefs.size}`);
  reportLines.push(`Failures: ${failures.length}`);
  reportLines.push('');

  if (failures.length) {
    reportLines.push('## Failures');
    reportLines.push('');
    for (const f of failures) {
      reportLines.push(`- ${f.href}`);
      reportLines.push(`  - Used in: ${f.usedIn.join(', ')}`);
      reportLines.push(`  - Reason: ${f.reason}`);
    }
    reportLines.push('');
  } else {
    reportLines.push('## Passed');
    reportLines.push('');
    reportLines.push(
      'All navigation hrefs resolve to actual App Router routes and contain no route-group segments.'
    );
    reportLines.push('');
  }

  const outPath = path.join(
    process.cwd(),
    'docs',
    'dashboard-nav-link-audit.md'
  );
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, reportLines.join('\n'), 'utf8');

  console.log(`Report written to: ${outPath}`);
  console.log(`Total hrefs checked: ${allHrefs.size}`);
  console.log(`Failures: ${failures.length}`);

  if (failures.length) {
    console.error('\n❌ Navigation audit FAILED - dead links found');
    process.exit(1);
  } else {
    console.log('\n✅ Navigation audit PASSED - all links valid');
  }
}

main();
