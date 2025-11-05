#!/usr/bin/env node
/**
 * Generate comprehensive sitemap including all HTML pages
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join, relative } from 'path';
import { existsSync } from 'fs';

const SITE_URL = 'https://portal.elevateforhumanity.org';
const DIST_DIR = 'dist';

// Pages to exclude from sitemap
const EXCLUDE_PAGES = [
  'auto-inject-bridge.html',
  'enrollment-test.html',
  'analytics.html',
  'og-placeholder.html',
  'offline.html',
  'google-site-verification.html',
];

// Get all HTML files recursively
async function getAllHtmlFiles(dir, fileList = []) {
  const files = await readdir(dir, { withFileTypes: true });
  
  for (const file of files) {
    const filePath = join(dir, file.name);
    
    if (file.isDirectory()) {
      await getAllHtmlFiles(filePath, fileList);
    } else if (file.name.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

// Extract title and meta description from HTML
async function extractMetadata(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    
    const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    
    return {
      title: titleMatch ? titleMatch[1].trim() : null,
      description: descMatch ? descMatch[1].trim() : null,
    };
  } catch (err) {
    return { title: null, description: null };
  }
}

// Determine priority based on page type
function getPriority(url) {
  if (url === '/') return 1.0;
  if (url.includes('/programs') || url.includes('/lms')) return 0.9;
  if (url.includes('/about') || url.includes('/connect')) return 0.8;
  if (url.includes('/legal') || url.includes('/policies')) return 0.3;
  if (url.includes('/pages/')) return 0.6;
  return 0.7;
}

// Determine change frequency
function getChangeFreq(url) {
  if (url === '/') return 'daily';
  if (url.includes('/programs') || url.includes('/lms')) return 'weekly';
  if (url.includes('/legal') || url.includes('/policies')) return 'yearly';
  return 'monthly';
}

async function generateSitemap() {
  console.log('🗺️  Generating comprehensive sitemap...\n');
  
  if (!existsSync(DIST_DIR)) {
    console.error('❌ dist/ directory not found. Run build first.');
    process.exit(1);
  }
  
  // Get all HTML files
  const htmlFiles = await getAllHtmlFiles(DIST_DIR);
  
  // Filter and process files
  const urls = [];
  
  for (const filePath of htmlFiles) {
    const relativePath = relative(DIST_DIR, filePath);
    const fileName = relativePath.split('/').pop();
    
    // Skip excluded files
    if (EXCLUDE_PAGES.includes(fileName)) {
      continue;
    }
    
    // Convert file path to URL
    let url = '/' + relativePath.replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\.html$/, '');
    if (url.endsWith('/')) url = url.slice(0, -1);
    if (!url) url = '/';
    
    // Extract metadata
    const metadata = await extractMetadata(filePath);
    
    urls.push({
      url,
      priority: getPriority(url),
      changefreq: getChangeFreq(url),
      lastmod: new Date().toISOString().split('T')[0],
      title: metadata.title,
      description: metadata.description,
    });
  }
  
  // Sort by priority (highest first)
  urls.sort((a, b) => b.priority - a.priority);
  
  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(item => `  <url>
    <loc>${SITE_URL}${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  // Write sitemap
  await writeFile(join(DIST_DIR, 'sitemap-all-pages.xml'), xml, 'utf-8');
  
  // Update sitemap index
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-all-pages.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-static.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-programs.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-courses.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;
  
  await writeFile(join(DIST_DIR, 'sitemap.xml'), sitemapIndex, 'utf-8');
  
  console.log(`✅ Generated sitemap-all-pages.xml with ${urls.length} URLs`);
  console.log(`✅ Updated sitemap.xml (index)`);
  console.log(`\n📊 Summary:`);
  console.log(`   Total pages: ${urls.length}`);
  console.log(`   Priority 1.0: ${urls.filter(u => u.priority === 1.0).length}`);
  console.log(`   Priority 0.9: ${urls.filter(u => u.priority === 0.9).length}`);
  console.log(`   Priority 0.8: ${urls.filter(u => u.priority === 0.8).length}`);
  console.log(`   Priority 0.7: ${urls.filter(u => u.priority === 0.7).length}`);
  console.log(`   Priority 0.6: ${urls.filter(u => u.priority === 0.6).length}`);
  console.log(`   Priority 0.3: ${urls.filter(u => u.priority === 0.3).length}`);
}

generateSitemap().catch(console.error);
