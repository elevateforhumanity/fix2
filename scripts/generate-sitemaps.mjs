#!/usr/bin/env node
/**
 * Generate sitemap index and sectioned sitemaps from Supabase data
 * Runs after build to create dynamic sitemaps for programs and courses
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

const SITE_URL = 'https://www.elevateforhumanity.org';
const DIST_DIR = './dist';

// Fetch programs from public API
async function fetchPrograms() {
  try {
    const response = await fetch(`${SITE_URL}/api/public/programs.json`);
    if (!response.ok) {
      console.warn('⚠️  Programs API not available, using empty list');
      return [];
    }
    return await response.json();
  } catch (error) {
    console.warn('⚠️  Failed to fetch programs:', error.message);
    return [];
  }
}

// Fetch courses from public API
async function fetchCourses() {
  try {
    const response = await fetch(`${SITE_URL}/api/public/courses.json`);
    if (!response.ok) {
      console.warn('⚠️  Courses API not available, using empty list');
      return [];
    }
    return await response.json();
  } catch (error) {
    console.warn('⚠️  Failed to fetch courses:', error.message);
    return [];
  }
}

// Generate XML sitemap from URLs
function generateSitemap(urls) {
  const urlEntries = urls
    .map(
      ({ loc, lastmod, changefreq, priority }) => `
  <url>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
    ${priority ? `<priority>${priority}</priority>` : ''}
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// Generate sitemap index
function generateSitemapIndex(sitemaps) {
  const sitemapEntries = sitemaps
    .map(
      ({ loc, lastmod }) => `
  <sitemap>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
  </sitemap>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
}

// Static pages sitemap
function getStaticPages() {
  const now = new Date().toISOString().split('T')[0];
  return [
    { loc: `${SITE_URL}/`, lastmod: now, changefreq: 'daily', priority: '1.0' },
    { loc: `${SITE_URL}/about`, lastmod: now, changefreq: 'monthly', priority: '0.8' },
    { loc: `${SITE_URL}/programs`, lastmod: now, changefreq: 'weekly', priority: '0.9' },
    { loc: `${SITE_URL}/lms/courses`, lastmod: now, changefreq: 'weekly', priority: '0.9' },
    { loc: `${SITE_URL}/get-started`, lastmod: now, changefreq: 'monthly', priority: '0.8' },
    { loc: `${SITE_URL}/donate`, lastmod: now, changefreq: 'monthly', priority: '0.7' },
    { loc: `${SITE_URL}/legal/terms-of-use`, lastmod: now, changefreq: 'yearly', priority: '0.3' },
    { loc: `${SITE_URL}/legal/privacy`, lastmod: now, changefreq: 'yearly', priority: '0.3' },
    { loc: `${SITE_URL}/legal/dmca`, lastmod: now, changefreq: 'yearly', priority: '0.3' },
    { loc: `${SITE_URL}/legal/legal-ipnotice`, lastmod: now, changefreq: 'yearly', priority: '0.3' },
  ];
}

async function main() {
  console.log('🗺️  Generating sitemaps...');

  const now = new Date().toISOString().split('T')[0];

  // Fetch dynamic content
  const [programs, courses] = await Promise.all([fetchPrograms(), fetchCourses()]);

  console.log(`✅ Found ${programs.length} programs`);
  console.log(`✅ Found ${courses.length} courses`);

  // Generate static pages sitemap
  const staticSitemap = generateSitemap(getStaticPages());
  writeFileSync(join(DIST_DIR, 'sitemap-static.xml'), staticSitemap);
  console.log('✅ Generated sitemap-static.xml');

  // Generate programs sitemap
  const programUrls = programs.map((program) => ({
    loc: `${SITE_URL}/programs/${program.slug}`,
    lastmod: program.updated_at?.split('T')[0] || now,
    changefreq: 'weekly',
    priority: '0.8',
  }));
  const programsSitemap = generateSitemap(programUrls);
  writeFileSync(join(DIST_DIR, 'sitemap-programs.xml'), programsSitemap);
  console.log('✅ Generated sitemap-programs.xml');

  // Generate courses sitemap
  const courseUrls = courses.map((course) => ({
    loc: `${SITE_URL}/lms/course/${course.id}`,
    lastmod: course.updated_at?.split('T')[0] || now,
    changefreq: 'weekly',
    priority: '0.7',
  }));
  const coursesSitemap = generateSitemap(courseUrls);
  writeFileSync(join(DIST_DIR, 'sitemap-courses.xml'), coursesSitemap);
  console.log('✅ Generated sitemap-courses.xml');

  // Generate sitemap index
  const sitemapIndex = generateSitemapIndex([
    { loc: `${SITE_URL}/sitemap-static.xml`, lastmod: now },
    { loc: `${SITE_URL}/sitemap-programs.xml`, lastmod: now },
    { loc: `${SITE_URL}/sitemap-courses.xml`, lastmod: now },
  ]);
  writeFileSync(join(DIST_DIR, 'sitemap.xml'), sitemapIndex);
  console.log('✅ Generated sitemap.xml (index)');

  console.log('🎉 Sitemap generation complete!');
}

main().catch((error) => {
  console.error('❌ Sitemap generation failed:', error);
  process.exit(1);
});
