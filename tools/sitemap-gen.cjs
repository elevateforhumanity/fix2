const fs = require('fs');
const path = require('path');

async function generate() {
  const modulePath = path.resolve(process.cwd(), 'ssg.config.js');
  const { routes, siteUrl } = await import(modulePath);
  const base =
    (siteUrl || process.env.SITE_URL || '').replace(/\/$/, '') ||
    'https://elevateforhumanity.pages.dev';

  const xmlEntries = routes
    .map((route) => {
      const {
        loc,
        changefreq = 'weekly',
        priority = 0.5,
        lastmod,
        image,
      } = route;
      const url = loc || `${base}${route.path}`;
      const imageTag = image
        ? `\n    <image:image><image:loc>${image}</image:loc></image:image>`
        : '';
      const lastmodTag = lastmod
        ? `\n    <lastmod>${new Date(lastmod).toISOString()}</lastmod>`
        : '';
      return `  <url>\n    <loc>${url}</loc>${lastmodTag}\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>${imageTag}\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${xmlEntries}\n</urlset>`;

  fs.mkdirSync('public', { recursive: true });
  fs.writeFileSync('public/sitemap.xml', xml);
  console.log(`✅ sitemap.xml generated with ${routes.length} routes`);
}

generate().catch((error) => {
  console.error('❌ Failed to generate sitemap:', error);
  process.exitCode = 1;
});
