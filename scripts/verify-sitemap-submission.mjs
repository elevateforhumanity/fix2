#!/usr/bin/env node
/**
 * Sitemap Verification and Submission Helper
 * Verifies sitemap accessibility and provides submission URLs for search engines
 */

import https from 'https';
import http from 'http';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Configuration
const DOMAINS = [
  'https://elevateforhumanity.pages.dev',
  'https://elevateforhumanity.org',
  'https://www.elevateforhumanity.org'
];

const SITEMAP_PATH = '/sitemap.xml';
const ROBOTS_PATH = '/robots.txt';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          size: data.length,
          success: res.statusCode === 200
        });
      });
    }).on('error', (err) => {
      resolve({
        url,
        status: 0,
        error: err.message,
        success: false
      });
    });
  });
}

async function verifySitemap(domain) {
  log(`\n📍 Checking: ${domain}`, 'cyan');
  
  // Check sitemap
  const sitemapUrl = `${domain}${SITEMAP_PATH}`;
  const sitemapResult = await checkUrl(sitemapUrl);
  
  if (sitemapResult.success) {
    log(`  ✅ Sitemap accessible: ${sitemapUrl}`, 'green');
    log(`     Status: ${sitemapResult.status}`, 'reset');
    log(`     Content-Type: ${sitemapResult.contentType}`, 'reset');
    log(`     Size: ${sitemapResult.size} bytes`, 'reset');
  } else {
    log(`  ❌ Sitemap not accessible: ${sitemapUrl}`, 'red');
    if (sitemapResult.error) {
      log(`     Error: ${sitemapResult.error}`, 'red');
    } else {
      log(`     Status: ${sitemapResult.status}`, 'red');
    }
  }
  
  // Check robots.txt
  const robotsUrl = `${domain}${ROBOTS_PATH}`;
  const robotsResult = await checkUrl(robotsUrl);
  
  if (robotsResult.success) {
    log(`  ✅ Robots.txt accessible: ${robotsUrl}`, 'green');
  } else {
    log(`  ❌ Robots.txt not accessible: ${robotsUrl}`, 'red');
  }
  
  return {
    domain,
    sitemap: sitemapResult,
    robots: robotsResult
  };
}

function readLocalSitemap() {
  try {
    const sitemapPath = join(rootDir, 'public/sitemap.xml');
    const content = readFileSync(sitemapPath, 'utf-8');
    
    // Count URLs
    const urlMatches = content.match(/<url>/g);
    const urlCount = urlMatches ? urlMatches.length : 0;
    
    // Extract some URLs
    const locMatches = content.match(/<loc>([^<]+)<\/loc>/g);
    const urls = locMatches ? locMatches.slice(0, 5).map(m => m.replace(/<\/?loc>/g, '')) : [];
    
    return {
      exists: true,
      urlCount,
      sampleUrls: urls,
      size: content.length
    };
  } catch (err) {
    return {
      exists: false,
      error: err.message
    };
  }
}

function generateSubmissionUrls(domain) {
  const sitemapUrl = encodeURIComponent(`${domain}${SITEMAP_PATH}`);
  
  return {
    google: `https://www.google.com/ping?sitemap=${sitemapUrl}`,
    googleConsole: `https://search.google.com/search-console`,
    bing: `https://www.bing.com/webmasters/ping.aspx?siteMap=${sitemapUrl}`,
    bingConsole: `https://www.bing.com/webmasters`
  };
}

async function main() {
  log('\n' + '='.repeat(70), 'bold');
  log('🗺️  SITEMAP VERIFICATION & SUBMISSION HELPER', 'bold');
  log('='.repeat(70) + '\n', 'bold');
  
  // Check local sitemap
  log('📄 Local Sitemap Check:', 'yellow');
  const localSitemap = readLocalSitemap();
  
  if (localSitemap.exists) {
    log(`  ✅ Sitemap file exists: public/sitemap.xml`, 'green');
    log(`     Total URLs: ${localSitemap.urlCount}`, 'reset');
    log(`     File size: ${localSitemap.size} bytes`, 'reset');
    log(`\n  Sample URLs:`, 'cyan');
    localSitemap.sampleUrls.forEach(url => {
      log(`    • ${url}`, 'reset');
    });
  } else {
    log(`  ❌ Sitemap file not found!`, 'red');
    log(`     Error: ${localSitemap.error}`, 'red');
    return;
  }
  
  // Verify sitemap accessibility on all domains
  log('\n🌐 Domain Accessibility Check:', 'yellow');
  const results = [];
  
  for (const domain of DOMAINS) {
    const result = await verifySitemap(domain);
    results.push(result);
  }
  
  // Generate submission URLs
  log('\n📤 Sitemap Submission URLs:', 'yellow');
  log('\n  For each domain, you can submit to search engines:\n', 'cyan');
  
  results.forEach(result => {
    if (result.sitemap.success) {
      const urls = generateSubmissionUrls(result.domain);
      
      log(`  ${result.domain}:`, 'bold');
      log(`    Google Ping: ${urls.google}`, 'green');
      log(`    Bing Ping: ${urls.bing}`, 'green');
      log('', 'reset');
    }
  });
  
  // Manual submission instructions
  log('\n📋 Manual Submission Steps:', 'yellow');
  log('\n  Google Search Console:', 'bold');
  log('    1. Go to: https://search.google.com/search-console', 'reset');
  log('    2. Select your property (or add it if not listed)', 'reset');
  log('    3. Go to: Sitemaps → Add a new sitemap', 'reset');
  log('    4. Enter: sitemap.xml', 'reset');
  log('    5. Click Submit', 'reset');
  
  log('\n  Bing Webmaster Tools:', 'bold');
  log('    1. Go to: https://www.bing.com/webmasters', 'reset');
  log('    2. Select your site (or add it if not listed)', 'reset');
  log('    3. Go to: Sitemaps → Submit Sitemap', 'reset');
  log('    4. Enter full URL: https://elevateforhumanity.org/sitemap.xml', 'reset');
  log('    5. Click Submit', 'reset');
  
  // Quick ping option
  log('\n⚡ Quick Ping (Optional):', 'yellow');
  log('  You can ping search engines directly using these URLs:', 'cyan');
  
  const primaryDomain = results.find(r => r.domain.includes('.org') && !r.domain.includes('www'));
  if (primaryDomain && primaryDomain.sitemap.success) {
    const urls = generateSubmissionUrls(primaryDomain.domain);
    log(`\n  Google: ${urls.google}`, 'green');
    log(`  Bing: ${urls.bing}`, 'green');
    log('\n  Note: Pinging notifies search engines but manual submission is recommended.', 'yellow');
  }
  
  // Summary
  log('\n' + '='.repeat(70), 'bold');
  log('📊 SUMMARY', 'bold');
  log('='.repeat(70), 'bold');
  
  const accessible = results.filter(r => r.sitemap.success).length;
  const total = results.length;
  
  log(`\n  Sitemap URLs: ${localSitemap.urlCount}`, 'cyan');
  log(`  Domains accessible: ${accessible}/${total}`, accessible === total ? 'green' : 'yellow');
  
  if (accessible === total) {
    log('\n  ✅ All domains are ready for search engine submission!', 'green');
  } else {
    log('\n  ⚠️  Some domains are not accessible. Check deployment status.', 'yellow');
  }
  
  log('\n' + '='.repeat(70) + '\n', 'bold');
}

main().catch(err => {
  log(`\n❌ Error: ${err.message}`, 'red');
  process.exit(1);
});
