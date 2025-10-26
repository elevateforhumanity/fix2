#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Read programs data
const programsFile = readFileSync(
  join(rootDir, 'src/data/programs.ts'),
  'utf-8'
);

// Extract program slugs using regex
const slugMatches = [...programsFile.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
const programSlugs = slugMatches.map((match) => match[1]);

console.log('Found programs:', programSlugs);

// Base domain - use primary domain for SEO
const domain = 'https://elevateforhumanity.org';
const now = new Date().toISOString();

// Static pages with priorities
const staticPages = [
  {
    path: '/',
    priority: '1',
    changefreq: 'daily',
    image: '/assets/og/efh-hero.png',
  },
  {
    path: '/programs',
    priority: '0.9',
    changefreq: 'daily',
    image: '/programs/placeholder.jpg',
  },
  {
    path: '/get-started',
    priority: '0.8',
    changefreq: 'weekly',
    image: '/assets/og/efh-hero.png',
  },
  {
    path: '/apply',
    priority: '0.8',
    changefreq: 'weekly',
    image: '/assets/og/efh-hero.png',
  },
  {
    path: '/connect',
    priority: '0.7',
    changefreq: 'monthly',
    image: '/assets/og/efh-hero.png',
  },
  {
    path: '/analytics',
    priority: '0.6',
    changefreq: 'monthly',
    image: '/assets/og/efh-hero.png',
  },
  {
    path: '/donate',
    priority: '0.6',
    changefreq: 'monthly',
    image: '/assets/og/efh-hero.png',
  },
  {
    path: '/federal-apprenticeships',
    priority: '0.6',
    changefreq: 'monthly',
    image: '/assets/og/efh-hero.png',
  },
  {
    path: '/about',
    priority: '0.7',
    changefreq: 'monthly',
    image: '/assets/og/efh-hero.png',
  },
];

// Generate XML
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

// Add static pages
staticPages.forEach((page) => {
  xml += `  <url>
    <loc>${domain}${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <image:image><image:loc>${domain}${page.image}</image:loc></image:image>
  </url>
`;
});

// Add dynamic program pages
programSlugs.forEach((slug) => {
  // Add /programs/:slug pattern
  xml += `  <url>
    <loc>${domain}/programs/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
    <image:image><image:loc>${domain}/images/programs/efh-${slug}-card.jpg</image:loc></image:image>
  </url>
`;

  // Add /program/:slug pattern (singular)
  xml += `  <url>
    <loc>${domain}/program/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
    <image:image><image:loc>${domain}/images/programs/efh-${slug}-card.jpg</image:loc></image:image>
  </url>
`;
});

xml += `</urlset>`;

// Write sitemap
const sitemapPath = join(rootDir, 'public/sitemap.xml');
writeFileSync(sitemapPath, xml, 'utf-8');

console.log(
  `✅ Sitemap generated with ${staticPages.length} static pages and ${programSlugs.length * 2} dynamic program pages`
);
console.log(`   Total URLs: ${staticPages.length + programSlugs.length * 2}`);
console.log(`   Written to: ${sitemapPath}`);
