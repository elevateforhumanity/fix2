const fs = require('fs');
const path = require('path');

async function generate() {
  const modulePath = path.resolve(process.cwd(), 'ssg.config.js');
  const { siteUrl } = await import(modulePath);
  const base =
    (siteUrl || process.env.SITE_URL || '').replace(/\/$/, '') ||
    'https://elevateforhumanity.pages.dev';
  const txt = `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`;

  fs.mkdirSync('public', { recursive: true });
  fs.writeFileSync('public/robots.txt', txt);
  console.log('✅ robots.txt generated');
}

generate().catch((error) => {
  console.error('❌ Failed to generate robots.txt:', error);
  process.exitCode = 1;
});
