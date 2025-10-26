import fs from 'node:fs/promises';
import https from 'node:https';
const SITEMAP_URL =
  process.env.PERF_SITEMAP_URL ||
  'https://www.elevateforhumanity.org/sitemap.xml';

// Simple XML <loc> parser (no external deps)
function extractLocs(xml) {
  const locs = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = regex.exec(xml)) !== null) locs.push(m[1]);
  return locs;
}

function pickCritical(locs) {
  const priority = [
    '/',
    '/programs',
    '/apprenticeships',
    '/about',
    '/partners',
    '/funding',
    '/apply',
    '/contact',
    '/donate',
    '/blog',
  ];
  // keep top core + all program detail pages + blog posts (cap at 30 for run time)
  const core = new Set(
    priority.map((p) => `https://www.elevateforhumanity.org${p}`)
  );
  const programDetail = locs.filter((u) => /\/programs\//.test(u));
  const blog = locs.filter((u) => /\/blog\//.test(u));
  const result = [...core, ...programDetail, ...blog].slice(0, 30);
  return Array.from(new Set(result));
}

async function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

const xml = await get(SITEMAP_URL);
const locs = extractLocs(xml);
const critical = locs.length ? pickCritical(locs) : [];
if (critical.length) {
  await fs.writeFile(
    'autopilot/performance/urls.txt',
    critical.join('\n') + '\n'
  );
  console.log(
    `Wrote ${critical.length} URLs to autopilot/performance/urls.txt`
  );
} else {
  console.warn('No URLs extracted from sitemap; leaving urls.txt unchanged.');
}
