#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

// Configuration
const NEW_DOMAIN = 'www.elevateforhumanity.org';
const DIST_DIR = path.resolve('dist');
const NEW_DOMAIN_URL = `https://${NEW_DOMAIN}`;
const LEGACY_DOMAINS = [
  'stripe-integrate-curvaturebodysc.replit.app',
  '149dac3d-f555-4440-8be8-758dc290baa7-00-18qn78v70z4k6.janeway.replit.dev',
  'elevateforhumanity.pages.dev',
  'www.elevateforhumanity.pages.dev',
  'elevateforhumanity.vercel.app',
];
const SKIP_CANONICAL = new Set(['analytics.html']);
const canonicalTagPattern =
  /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["'][^>]*>/i;

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateCanonicalUrls() {
  console.log(`🔗 Updating canonical URLs to ${NEW_DOMAIN_URL}...`);

  const htmlFiles = readdirSync('.')
    .filter((file) => file.endsWith('.html'))
    .sort();

  if (!htmlFiles.length) {
    console.log('No HTML files found to update canonical URLs.');
    return { updatedFiles: 0, totalReplacements: 0 };
  }

  let updatedFiles = 0;
  let totalReplacements = 0;

  htmlFiles.forEach((file) => {
    if (SKIP_CANONICAL.has(file)) {
      console.log(`  [skip] ${file} (partial include)`);
      return;
    }
    try {
      const originalContent = readFileSync(file, 'utf8');
      let content = LEGACY_DOMAINS.reduce((acc, domain) => {
        const pattern = new RegExp(`https?://${escapeRegExp(domain)}`, 'g');
        return acc.replace(pattern, NEW_DOMAIN_URL);
      }, originalContent);

      // Normalize canonical tag if it uses any legacy domain.
      const canonicalMatch = content.match(canonicalTagPattern);
      if (canonicalMatch) {
        const href = canonicalMatch[1];
        const hasLegacy = LEGACY_DOMAINS.some((domain) =>
          href.includes(domain)
        );
        if (!href.startsWith(NEW_DOMAIN_URL) || hasLegacy) {
          content = content.replace(
            canonicalTagPattern,
            `    <link rel="canonical" href="${NEW_DOMAIN_URL}/">`
          );
        }
      }

      const canonicalFallbackMatch = content.match(canonicalTagPattern);
      if (!canonicalFallbackMatch && file === 'index.html') {
        const viewportMatch = content.match(/(<meta name="viewport"[^>]*>)/);
        if (viewportMatch) {
          content = content.replace(
            viewportMatch[1],
            `${viewportMatch[1]}\n    <link rel="canonical" href="${NEW_DOMAIN_URL}/">`
          );
        }
      }

      const legacyCount = LEGACY_DOMAINS.reduce(
        (acc, domain) =>
          acc +
          (originalContent.match(new RegExp(escapeRegExp(domain), 'g')) || [])
            .length,
        0
      );
      const fileReplacements = legacyCount;

      if (content !== originalContent) {
        writeFileSync(file, content);
        updatedFiles += 1;
        totalReplacements += fileReplacements;
        console.log(`  ✅ Updated ${file} (${fileReplacements} replacements)`);
      }
    } catch (error) {
      console.error(`  ❌ Error updating ${file}:`, error.message);
    }
  });

  console.log('\n📊 Summary:');
  console.log(`   • Files scanned: ${htmlFiles.length}`);
  console.log(`   • Files updated: ${updatedFiles}`);
  console.log(`   • Total replacements: ${totalReplacements}`);
  console.log(`   • Legacy domains normalized: ${LEGACY_DOMAINS.length}`);
  console.log(`   • New domain: ${NEW_DOMAIN}`);

  return { updatedFiles, totalReplacements };
}

function addCanonicalToIndexHtml() {
  const indexFile = 'index.html';

  if (!existsSync(indexFile)) {
    console.warn(
      'index.html not found in dist/. Skipping canonical injection.'
    );
    return;
  }

  try {
    let content = readFileSync(indexFile, 'utf8');

    if (content.includes('rel="canonical"')) {
      const canonicalMatch = content.match(canonicalTagPattern);
      if (canonicalMatch && !canonicalMatch[1].startsWith(NEW_DOMAIN_URL)) {
        content = content.replace(
          canonicalTagPattern,
          `    <link rel="canonical" href="${NEW_DOMAIN_URL}/">`
        );
        writeFileSync(indexFile, content);
        console.log('  ✅ Normalized canonical URL in index.html');
      } else {
        console.log('  📍 index.html already has canonical URL');
      }
      return;
    }

    const canonicalTag = `    <link rel="canonical" href="${NEW_DOMAIN_URL}/">`;
    const viewportMatch = content.match(/(<meta name="viewport"[^>]*>)/);

    if (viewportMatch) {
      content = content.replace(
        viewportMatch[1],
        `${viewportMatch[1]}\n${canonicalTag}`
      );
      writeFileSync(indexFile, content);
      console.log('  ✅ Added canonical URL to index.html');
    } else {
      console.warn(
        '  ⚠️ Could not find viewport meta tag to anchor canonical link.'
      );
    }
  } catch (error) {
    console.error(`  ❌ Error updating ${indexFile}:`, error.message);
  }
}

function verifyCanonicalUrls(sampleSize = 10) {
  console.log('\n🔍 Verifying canonical URLs...');

  const htmlFiles = readdirSync('.')
    .filter((file) => file.endsWith('.html'))
    .slice(0, sampleSize);

  htmlFiles.forEach((file) => {
    if (SKIP_CANONICAL.has(file)) {
      console.log(
        `  [skip] ${file} intentionally has no canonical (partial include)`
      );
      return;
    }
    try {
      const content = readFileSync(file, 'utf8');
      if (content.includes('rel="canonical"')) {
        if (content.includes(NEW_DOMAIN)) {
          console.log(`  ✅ ${file} has correct canonical URL`);
        } else if (LEGACY_DOMAINS.some((domain) => content.includes(domain))) {
          console.log(`  ⚠️  ${file} still has old domain`);
        } else {
          console.log(`  ❓ ${file} has canonical but unknown domain`);
        }
      } else {
        console.log(`  ⚪ ${file} has no canonical URL`);
      }
    } catch (error) {
      console.error(`  ❌ Error checking ${file}:`, error.message);
    }
  });
}

function main() {
  if (!existsSync(DIST_DIR)) {
    console.warn('dist/ directory not found. Skipping canonical URL update.');
    return;
  }

  process.chdir(DIST_DIR);
  updateCanonicalUrls();
  addCanonicalToIndexHtml();
  verifyCanonicalUrls();
}

const isMainModule = (() => {
  const invocation = process.argv[1];
  if (!invocation) return false;
  return pathToFileURL(invocation).href === import.meta.url;
})();

if (isMainModule) {
  main();
}

export { NEW_DOMAIN, updateCanonicalUrls };
