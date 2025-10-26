import { existsSync, readFileSync } from 'node:fs';
import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { ROUTES } from '../routes.config.mjs';

const routerSrc = readFileSync('src/router.jsx', 'utf8');
const routeRegex = /<Route\s+[^>]*path=["']([^"']+)["']/g;
const routerPaths = [];
let mm;
while ((mm = routeRegex.exec(routerSrc)) !== null) routerPaths.push(mm[1]);
const realRouterPaths = routerPaths.filter(
  (p) => p !== '*' && !p.startsWith('/:')
);
const configPaths = ROUTES.map((r) => r.path);
const driftA = realRouterPaths.filter((p) => !configPaths.includes(p));
if (driftA.length) {
  console.error('Route drift detected:', {
    missingInConfig: driftA,
  });
  // continue (warn) or uncomment next line to hard fail:
  // process.exit(1);
}

const distDir = path.resolve('dist');
if (!existsSync(distDir)) {
  console.error('dist/ not found. Run build first.');
  process.exit(1);
}

const siteUrl =
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  'https://www.elevateforhumanity.org';

const routesForSitemap = ROUTES.filter((r) => r.sitemap !== false).map((r) => ({
  url: r.path,
  changefreq: r.changefreq || 'monthly',
  priority: r.priority ?? 0.5,
}));

async function buildSitemap() {
  const smStream = new SitemapStream({ hostname: siteUrl });
  routesForSitemap.forEach((r) => smStream.write(r));
  smStream.end();
  const data = await streamToPromise(smStream);
  await writeFile(path.join(distDir, 'sitemap.xml'), data.toString('utf8'));
}

async function buildRobots() {
  const content = `User-agent: *
Allow: /
Sitemap: ${siteUrl.replace(/\/+$/, '')}/sitemap.xml
`;
  await writeFile(path.join(distDir, 'robots.txt'), content, 'utf8');
}

async function verificationFiles() {
  const spec = process.env.VERIFICATION_FILES;
  if (!spec) return;
  const parts = spec
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  for (const p of parts) {
    const [filename, ...rest] = p.split('|');
    if (!filename) continue;
    const body = rest.join('|') || '';
    await writeFile(path.join(distDir, filename), body, 'utf8');
  }
}

(async () => {
  await mkdir(distDir, { recursive: true });
  await Promise.all([buildSitemap(), buildRobots(), verificationFiles()]);
  
  // Copy static landing page
  const landingSource = path.resolve('public/index-landing.html');
  const landingDest = path.join(distDir, 'index-landing.html');
  if (existsSync(landingSource)) {
    await copyFile(landingSource, landingDest);
    console.log('Copied index-landing.html to dist/');
  }
  
  console.log(
    `Postbuild: sitemap.xml (${routesForSitemap.length} routes), robots.txt, verification files done.`
  );
})();
