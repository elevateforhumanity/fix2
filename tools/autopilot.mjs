#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const r = (p) => path.resolve(ROOT, p);

let ok = true;
const fail = (m) => {
  ok = false;
  console.error('✖', m);
};
const pass = (m) => console.log('✔', m);

// ---------- 1) Netlify redirects (SPA deep-links) ----------
const nlt = r('netlify.toml');
const redir = r('_redirects');
const hasSpaToml =
  fs.existsSync(nlt) &&
  /to\s*=\s*["']\/index\.html["']\s*[\r\n]+status\s*=\s*200/im.test(
    fs.readFileSync(nlt, 'utf8')
  );
const hasSpaRedirects =
  fs.existsSync(redir) &&
  /\/\*\s+\/index\.html\s+200/.test(fs.readFileSync(redir, 'utf8'));
hasSpaToml || hasSpaRedirects
  ? pass('SPA fallback present')
  : fail('Missing SPA fallback. Add `/* /index.html 200`');

// ---------- 2) Security headers ----------
if (fs.existsSync(nlt)) {
  const t = fs.readFileSync(nlt, 'utf8');
  const need = [
    'X-Frame-Options',
    'X-Content-Type-Options',
    'Referrer-Policy',
    'Permissions-Policy',
  ];
  const missing = need.filter((k) => !new RegExp(`${k}\\s*=`, 'i').test(t));
  missing.length
    ? fail('Add security headers in netlify.toml: ' + missing.join(', '))
    : pass('Security headers configured');
} else {
  fail('netlify.toml not found (recommended for headers)');
}

// ---------- 3) Mixed-content scan (http:// in project) ----------
const exts = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json'];
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() &&
      !['node_modules', '.git', 'dist', 'build', 'docs', 'scripts'].includes(
        e.name
      )
      ? walk(p)
      : e.isFile() && exts.some((x) => p.endsWith(x))
        ? [p]
        : [];
  });
const files = walk(ROOT);
const httpHits = [];
const safePatterns = [
  /http:\/\/localhost/,
  /http:\/\/127\.0\.0\.1/,
  /http:\/\/www\.w3\.org/,
  /http:\/\/www\.sitemaps\.org/,
  /http:\/\/xmlns\.com/,
];
for (const f of files) {
  const txt = fs.readFileSync(f, 'utf8');
  const hits = [...txt.matchAll(/\bhttp:\/\/[^"'\s)]+/g)]
    .filter((m) => !safePatterns.some((p) => p.test(m[0])))
    .map((m) => `${f}:${m.index} -> ${m[0]}`);
  httpHits.push(...hits);
}
httpHits.length
  ? fail(
      `Found non-HTTPS references:\n  - ${httpHits.slice(0, 20).join('\n  - ')}${httpHits.length > 20 ? `\n  (+${httpHits.length - 20} more)` : ``}`
    )
  : pass('No http:// references (excluding safe patterns)');

// ---------- 4) Push/notification/suspicious SDK scan ----------
const suspicious = files.filter((f) => {
  const t = fs.readFileSync(f, 'utf8');
  return /(OneSignal|serviceWorker\.register|PushManager|Notification\.requestPermission)/i.test(
    t
  );
});
suspicious.length
  ? fail(
      'Push/notification code present (verify necessity):\n  - ' +
        suspicious.join('\n  - ')
    )
  : pass('No push/notification code');

// ---------- 5) SEO/OG tags in index.html ----------
const idxPath = r('index.html');
if (!fs.existsSync(idxPath)) {
  fail('index.html not found to verify meta tags');
} else {
  const html = fs.readFileSync(idxPath, 'utf8');
  const must = [
    /<title>.+<\/title>/i,
    /name="description"/i,
    /property="og:title"/i,
    /property="og:description"/i,
    /property="og:image"/i,
    /link rel="canonical"/i,
  ];
  const missing = must.filter((rx) => !rx.test(html));
  missing.length
    ? fail(
        'Missing meta tags in index.html (add title/description/OG/canonical)'
      )
    : pass('SEO/OG tags present');
}

// ---------- 6) 404 route exists ----------
const hasNotFound = files.some((f) =>
  /pages[\/\\]NotFound\.(jsx?|tsx?)$/.test(f)
);
hasNotFound
  ? pass('NotFound route component present')
  : fail('Add a NotFound route for unknown paths');

// ---------- 7) Result ----------
if (!ok) {
  console.error('\nAutopilot: FAIL. See items above. Exit 1.');
  process.exit(1);
} else {
  console.log('\nAutopilot: PASS. Ready to go live ✅');
}
