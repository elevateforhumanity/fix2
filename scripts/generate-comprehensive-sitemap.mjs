#!/usr/bin/env node

/**
 * Generate comprehensive sitemap with ALL pages
 * Optimized for Google and Bing indexing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://www.elevateforhumanity.org';
const TODAY = new Date().toISOString().split('T')[0];

// ALL public pages
const pages = [
  // Main pages
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/about', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs', priority: 0.9, changefreq: 'daily' },
  { url: '/partners', priority: 0.8, changefreq: 'weekly' },
  { url: '/contact', priority: 0.8, changefreq: 'monthly' },
  
  // Program pages
  { url: '/programs/barber-apprenticeship', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/hvac-technician', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/medical-assistant', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/building-maintenance', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/truck-driving', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/cdl', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/workforce-readiness', priority: 0.9, changefreq: 'weekly' },
  
  // Enrollment
  { url: '/enroll', priority: 0.9, changefreq: 'weekly' },
  { url: '/partner-application', priority: 0.8, changefreq: 'weekly' },
  
  // Auth
  { url: '/login', priority: 0.7, changefreq: 'monthly' },
  { url: '/signup', priority: 0.7, changefreq: 'monthly' },
  
  // LMS Public
  { url: '/lms', priority: 0.8, changefreq: 'weekly' },
  { url: '/lms/dashboard', priority: 0.7, changefreq: 'daily' },
  { url: '/lms/courses', priority: 0.8, changefreq: 'daily' },
  { url: '/lms/certificates', priority: 0.7, changefreq: 'weekly' },
  { url: '/lms/progress', priority: 0.6, changefreq: 'weekly' },
  
  // Legal
  { url: '/privacy', priority: 0.5, changefreq: 'monthly' },
  { url: '/privacy-policy', priority: 0.5, changefreq: 'monthly' },
  { url: '/terms', priority: 0.5, changefreq: 'monthly' },
  { url: '/terms-of-service', priority: 0.5, changefreq: 'monthly' },
  { url: '/cookies', priority: 0.4, changefreq: 'monthly' },
  { url: '/accessibility', priority: 0.5, changefreq: 'monthly' },
  
  // Resources
  { url: '/resources', priority: 0.6, changefreq: 'weekly' },
  { url: '/faq', priority: 0.6, changefreq: 'weekly' },
  { url: '/help', priority: 0.6, changefreq: 'weekly' },
  { url: '/support', priority: 0.6, changefreq: 'weekly' },
];

function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
  xml += '        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

  pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}${page.url}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

function generateRobotsTxt() {
  return `# Robots.txt for Elevate for Humanity
# Updated: ${TODAY}

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /lms/messages
Disallow: /lms/profile
Disallow: /student/
Disallow: /partner/
Disallow: /delegate/

# Sitemaps
Sitemap: ${DOMAIN}/sitemap.xml

# Crawl delay
Crawl-delay: 1

# Google
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 0
`;
}

// Generate files
const sitemap = generateSitemap();
const robots = generateRobotsTxt();

const publicDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);

console.log('✅ Generated sitemap.xml with', pages.length, 'pages');
console.log('✅ Generated robots.txt');
console.log(`\nDomain: ${DOMAIN}`);
console.log(`Date: ${TODAY}`);
