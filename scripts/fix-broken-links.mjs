import { readFileSync, writeFileSync, existsSync } from 'fs';
import { basename } from 'path';

console.log('🔧 Fixing broken links in main site files...\n');

const fixes = [
  // Fix SPA routes - remove .html extension
  { from: /href="hub\.html"/g, to: 'href="/hub"', desc: 'hub.html → /hub' },
  {
    from: /href="programs\.html"/g,
    to: 'href="/programs"',
    desc: 'programs.html → /programs',
  },
  {
    from: /href="connect\.html"/g,
    to: 'href="/connect"',
    desc: 'connect.html → /connect',
  },

  // Fix relative index.html links
  { from: /href="index\.html"/g, to: 'href="/"', desc: 'index.html → /' },

  // Fix public/ paths
  {
    from: /href="public\/apply\.html"/g,
    to: 'href="/apply"',
    desc: 'public/apply.html → /apply',
  },
  {
    from: /href="public\/connect\.html"/g,
    to: 'href="/connect"',
    desc: 'public/connect.html → /connect',
  },

  // Fix connect.html links
  {
    from: /href="connect\.html#contact"/g,
    to: 'href="/connect#contact"',
    desc: 'connect.html#contact → /connect#contact',
  },
];

const filesToFix = [
  'dist/academic-calendar.html',
  'dist/apply.html',
  'dist/employers.html',
  'dist/federal-apprenticeships.html',
  'dist/lms-test-index.html',
  'dist/index.html',
  'dist/404.html',
];

let totalFixes = 0;
let filesFixed = 0;

for (const file of filesToFix) {
  if (!existsSync(file)) {
    continue;
  }

  let content = readFileSync(file, 'utf8');
  let fileFixes = 0;
  const originalContent = content;

  for (const fix of fixes) {
    const matches = content.match(fix.from);
    if (matches) {
      content = content.replace(fix.from, fix.to);
      fileFixes += matches.length;
    }
  }

  if (content !== originalContent) {
    writeFileSync(file, content, 'utf8');
    totalFixes += fileFixes;
    filesFixed++;
    console.log(`✅ Fixed ${fileFixes} link(s) in ${basename(file)}`);
  }
}

if (totalFixes > 0) {
  console.log(`\n✅ Fixed ${totalFixes} broken links in ${filesFixed} file(s)`);
} else {
  console.log('✅ No broken links found in main site files');
}
