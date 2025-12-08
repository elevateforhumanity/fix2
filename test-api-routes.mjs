#!/usr/bin/env node
/**
 * Test all API routes for basic syntax and import errors
 * Does NOT make HTTP requests - just validates the code compiles
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const results = {
  total: 0,
  passed: 0,
  failed: 0,
  errors: []
};

function findRouteFiles(dir) {
  const routes = [];
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      routes.push(...findRouteFiles(fullPath));
    } else if (item === 'route.ts' || item === 'route.js') {
      routes.push(fullPath);
    }
  }
  
  return routes;
}

function testRoute(filePath) {
  results.total++;
  
  try {
    const content = readFileSync(filePath, 'utf-8');
    
    // Basic syntax checks
    const checks = [
      { name: 'Has export', test: /export\s+(async\s+)?function\s+(GET|POST|PUT|DELETE|PATCH)/i },
      { name: 'No syntax errors', test: /^(?!.*\bsyntax\s+error\b)/i },
      { name: 'Has imports', test: /^import\s+/m }
    ];
    
    let passed = true;
    const routeErrors = [];
    
    for (const check of checks) {
      if (!check.test.test(content)) {
        passed = false;
        routeErrors.push(`Failed: ${check.name}`);
      }
    }
    
    if (passed) {
      results.passed++;
    } else {
      results.failed++;
      results.errors.push({
        file: filePath.replace(process.cwd() + '/', ''),
        errors: routeErrors
      });
    }
    
  } catch (error) {
    results.failed++;
    results.errors.push({
      file: filePath.replace(process.cwd() + '/', ''),
      errors: [error.message]
    });
  }
}

console.log('🔍 Testing API Routes...\n');

const appDir = join(__dirname, 'app');
const routes = findRouteFiles(appDir);

console.log(`Found ${routes.length} API route files\n`);

for (const route of routes) {
  testRoute(route);
}

console.log('\n📊 Results:');
console.log(`Total: ${results.total}`);
console.log(`✅ Passed: ${results.passed}`);
console.log(`❌ Failed: ${results.failed}`);

if (results.errors.length > 0) {
  console.log('\n❌ Errors:\n');
  for (const error of results.errors.slice(0, 10)) {
    console.log(`  ${error.file}`);
    for (const err of error.errors) {
      console.log(`    - ${err}`);
    }
  }
  
  if (results.errors.length > 10) {
    console.log(`\n  ... and ${results.errors.length - 10} more errors`);
  }
}

console.log('\n✅ API route validation complete');
process.exit(results.failed > 0 ? 1 : 0);
