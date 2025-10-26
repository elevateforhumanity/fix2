import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const URLS_PER_SITEMAP = 50;
const SITE_URL = 'https://www.elevateforhumanity.org';

// Read the main sitemap
const sitemapPath = 'dist/sitemap.xml';
const sitemapContent = readFileSync(sitemapPath, 'utf8');

// Extract all URLs
const urlRegex = /<url>[\s\S]*?<\/url>/g;
const urls = sitemapContent.match(urlRegex) || [];

console.log(`Found ${urls.length} URLs in sitemap`);

if (urls.length <= URLS_PER_SITEMAP) {
  console.log(
    `✅ Sitemap has ${urls.length} URLs (under ${URLS_PER_SITEMAP} limit)`
  );
  process.exit(0);
}

// Split URLs into chunks
const chunks = [];
for (let i = 0; i < urls.length; i += URLS_PER_SITEMAP) {
  chunks.push(urls.slice(i, i + URLS_PER_SITEMAP));
}

console.log(
  `Splitting into ${chunks.length} sitemaps of max ${URLS_PER_SITEMAP} URLs each`
);

// Create individual sitemaps
const sitemapFiles = [];
chunks.forEach((chunk, index) => {
  const sitemapNum = index + 1;
  const filename = `sitemap-${sitemapNum}.xml`;

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${chunk.join('\n')}
</urlset>`;

  writeFileSync(join('dist', filename), xmlContent, 'utf8');
  sitemapFiles.push(filename);
  console.log(`✅ Created ${filename} with ${chunk.length} URLs`);
});

// Create sitemap index
const now = new Date().toISOString().split('T')[0];
const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles
  .map(
    (file) => `  <sitemap>
    <loc>${SITE_URL}/${file}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

writeFileSync('dist/sitemap-index.xml', sitemapIndexContent, 'utf8');
console.log(
  `✅ Created sitemap-index.xml with ${sitemapFiles.length} sitemaps`
);

// Update robots.txt to point to sitemap index
const robotsContent = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap-index.xml
Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync('dist/robots.txt', robotsContent, 'utf8');
console.log(`✅ Updated robots.txt to reference sitemap-index.xml`);

console.log('\n📊 Summary:');
console.log(`  Total URLs: ${urls.length}`);
console.log(`  Sitemaps created: ${sitemapFiles.length}`);
console.log(`  URLs per sitemap: max ${URLS_PER_SITEMAP}`);
console.log(`  Sitemap index: sitemap-index.xml`);
