#!/usr/bin/env node
/**
 * Validate that all navigation hrefs correspond to actual route files
 */

const fs = require('fs');
const path = require('path');

// Extract all hrefs from nav config
const navConfigPath = path.join(__dirname, '../lib/navigation/dashboard-nav.config.ts');
const navConfig = fs.readFileSync(navConfigPath, 'utf-8');

// Extract hrefs using regex
const hrefMatches = navConfig.matchAll(/href:\s*['"]([^'"]+)['"]/g);
const hrefs = [...hrefMatches].map(match => match[1]);

console.log(`Found ${hrefs.length} hrefs in nav config\n`);

const results = {
  valid: [],
  invalid: [],
  routeGroups: [],
};

// Check each href
for (const href of hrefs) {
  // Skip external URLs
  if (href.startsWith('http')) {
    results.valid.push({ href, reason: 'external URL' });
    continue;
  }

  // Check for route groups (invalid URLs)
  if (href.includes('/(')) {
    results.routeGroups.push({ href, reason: 'contains route group syntax' });
    continue;
  }

  // Convert href to file path - need to check for route groups
  const routePath = href === '/' ? '/page.tsx' : `${href}/page.tsx`;
  const filePath = path.join(__dirname, '../app', routePath);

  // Helper to find page.tsx considering route groups
  function findPageFile(basePath) {
    const directPath = path.join(__dirname, '../app', basePath, 'page.tsx');
    if (fs.existsSync(directPath)) {
      return directPath;
    }

    // Check for route groups like (app), (auth), etc.
    const dir = path.join(__dirname, '../app', basePath);
    if (!fs.existsSync(dir)) {
      const parentDir = path.dirname(dir);
      if (fs.existsSync(parentDir)) {
        const entries = fs.readdirSync(parentDir);
        for (const entry of entries) {
          if (entry.startsWith('(') && entry.endsWith(')')) {
            const routeGroupPath = path.join(parentDir, entry, path.basename(basePath), 'page.tsx');
            if (fs.existsSync(routeGroupPath)) {
              return routeGroupPath;
            }
          }
        }
      }
      return null;
    }

    // Check subdirectories for route groups
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      if (entry.startsWith('(') && entry.endsWith(')')) {
        const routeGroupPath = path.join(dir, entry, 'page.tsx');
        if (fs.existsSync(routeGroupPath)) {
          return routeGroupPath;
        }
      }
    }
    return null;
  }

  const foundPath = findPageFile(href === '/' ? '' : href);
  if (foundPath) {
    results.valid.push({ href, path: foundPath });
  } else if (fs.existsSync(filePath)) {
    results.valid.push({ href, path: filePath });
  } else {
    results.invalid.push({ href, reason: 'no page.tsx found', expectedPath: filePath });
  }
}

// Print results
console.log('✅ VALID ROUTES:');
results.valid.forEach(({ href, reason, path }) => {
  console.log(`  ${href}${reason ? ` (${reason})` : ''}`);
});

if (results.routeGroups.length > 0) {
  console.log('\n⚠️  ROUTE GROUP SYNTAX (INVALID URLs):');
  results.routeGroups.forEach(({ href, reason }) => {
    console.log(`  ${href} - ${reason}`);
  });
}

if (results.invalid.length > 0) {
  console.log('\n❌ INVALID ROUTES (NO PAGE.TSX):');
  results.invalid.forEach(({ href, reason, expectedPath }) => {
    console.log(`  ${href} - ${reason}`);
    if (expectedPath) {
      console.log(`    Expected: ${expectedPath}`);
    }
  });
}

console.log('\n📊 SUMMARY:');
console.log(`  Valid: ${results.valid.length}`);
console.log(`  Route Groups: ${results.routeGroups.length}`);
console.log(`  Invalid: ${results.invalid.length}`);
console.log(`  Total: ${hrefs.length}`);

// Exit with error if any invalid routes
if (results.invalid.length > 0 || results.routeGroups.length > 0) {
  process.exit(1);
}
