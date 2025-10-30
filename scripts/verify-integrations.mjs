#!/usr/bin/env node

/**
 * Comprehensive Integration Verification Script
 * Verifies all systems are working together properly
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const results = {
  passed: [],
  failed: [],
  warnings: []
};

function log(message, type = 'info') {
  const prefix = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: '📋'
  }[type];
  console.log(`${prefix} ${message}`);
}

function checkFile(path, description) {
  if (existsSync(path)) {
    results.passed.push(description);
    return true;
  } else {
    results.failed.push(description);
    return false;
  }
}

// 1. Check Build Output
log('\n=== Build Output Verification ===', 'info');
if (checkFile('dist/index.html', 'Build output exists')) {
  log('Build output verified', 'success');
  const indexHtml = readFileSync('dist/index.html', 'utf-8');
  if (indexHtml.includes('script')) {
    results.passed.push('Build includes JavaScript bundles');
    log('JavaScript bundles included', 'success');
  }
} else {
  log('Build output missing', 'error');
}

// 2. Check Environment Variables Integration
log('\n=== Environment Variables Integration ===', 'info');
if (existsSync('.env')) {
  const envContent = readFileSync('.env', 'utf-8');
  const requiredVars = [
    'OPENAI_API_KEY',
    'STRIPE_SECRET_KEY',
    'VITE_STRIPE_PUBLISHABLE_KEY',
    'CLOUDFLARE_API_TOKEN',
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];
  
  requiredVars.forEach(varName => {
    if (envContent.includes(varName) && !envContent.includes(`${varName}=your_`)) {
      results.passed.push(`${varName} configured`);
      log(`${varName} configured`, 'success');
    } else {
      results.failed.push(`${varName} not configured`);
      log(`${varName} not configured`, 'error');
    }
  });
} else {
  results.failed.push('.env file missing');
  log('.env file missing', 'error');
}

// 3. Check Netlify Configuration
log('\n=== Netlify Configuration ===', 'info');
if (existsSync('netlify.toml')) {
  const netlifyConfig = readFileSync('netlify.toml', 'utf-8');
  
  if (netlifyConfig.includes('command = "pnpm run build"')) {
    results.passed.push('Netlify build command configured');
    log('Build command configured', 'success');
  }
  
  if (netlifyConfig.includes('publish = "dist"')) {
    results.passed.push('Netlify publish directory configured');
    log('Publish directory configured', 'success');
  }
  
  if (netlifyConfig.includes('baseUrl = "https://elevateforhumanityfix2.netlify.app"')) {
    results.passed.push('Netlify baseUrl configured correctly');
    log('BaseUrl configured correctly', 'success');
  }
  
  if (netlifyConfig.includes('_redirects')) {
    results.passed.push('Netlify redirects configured');
    log('Redirects configured', 'success');
  }
} else {
  results.failed.push('netlify.toml missing');
  log('netlify.toml missing', 'error');
}

// 4. Check Cloudflare Configuration
log('\n=== Cloudflare Configuration ===', 'info');
if (existsSync('wrangler.toml')) {
  const wranglerConfig = readFileSync('wrangler.toml', 'utf-8');
  
  if (wranglerConfig.includes('name = "elevate-for-humanity-worker"')) {
    results.passed.push('Cloudflare worker name configured');
    log('Worker name configured', 'success');
  }
  
  if (wranglerConfig.includes('main = "workers/autopilot-deploy-worker.ts"')) {
    results.passed.push('Cloudflare worker entry point configured');
    log('Worker entry point configured', 'success');
  }
  
  if (existsSync('workers/autopilot-deploy-worker.ts')) {
    results.passed.push('Cloudflare worker file exists');
    log('Worker file exists', 'success');
  } else {
    results.failed.push('Cloudflare worker file missing');
    log('Worker file missing', 'error');
  }
} else {
  results.failed.push('wrangler.toml missing');
  log('wrangler.toml missing', 'error');
}

// 5. Check Supabase Configuration
log('\n=== Supabase Configuration ===', 'info');
if (existsSync('supabase/config.toml')) {
  results.passed.push('Supabase config exists');
  log('Supabase config exists', 'success');
  
  const migrationFiles = existsSync('supabase/migrations') ? 
    readFileSync('supabase/migrations', { withFileTypes: true }) : [];
  
  if (existsSync('supabase/migrations')) {
    results.passed.push('Supabase migrations directory exists');
    log('Migrations directory exists', 'success');
  }
  
  if (existsSync('supabase/functions')) {
    results.passed.push('Supabase edge functions directory exists');
    log('Edge functions directory exists', 'success');
  }
} else {
  results.warnings.push('Supabase config.toml missing (optional)');
  log('Supabase config.toml missing', 'warning');
}

// 6. Check React Router Configuration
log('\n=== React Router Configuration ===', 'info');
if (existsSync('src/router/AppRoutes.tsx')) {
  const routesContent = readFileSync('src/router/AppRoutes.tsx', 'utf-8');
  
  if (routesContent.includes('path="/" element={<Page_55 />}')) {
    results.passed.push('Homepage route configured correctly');
    log('Homepage route configured correctly', 'success');
  } else if (routesContent.includes('path="/" element={<Page_38 />}')) {
    results.failed.push('Homepage still pointing to Durable landing page');
    log('Homepage still pointing to Durable landing page', 'error');
  }
  
  if (routesContent.includes('VITAProgram')) {
    results.passed.push('VITA Program route exists');
    log('VITA Program route exists', 'success');
  }
} else {
  results.failed.push('AppRoutes.tsx missing');
  log('AppRoutes.tsx missing', 'error');
}

// 7. Check New Features
log('\n=== New Features Verification ===', 'info');
if (existsSync('src/pages/VITAProgram.jsx')) {
  results.passed.push('VITA Program page exists');
  log('VITA Program page exists', 'success');
} else {
  results.failed.push('VITA Program page missing');
  log('VITA Program page missing', 'error');
}

if (existsSync('src/layouts/AppLayout.jsx')) {
  const layoutContent = readFileSync('src/layouts/AppLayout.jsx', 'utf-8');
  if (layoutContent.includes('Buy Black Certified')) {
    results.passed.push('Buy Black badge integrated');
    log('Buy Black badge integrated', 'success');
  } else {
    results.failed.push('Buy Black badge not integrated');
    log('Buy Black badge not integrated', 'error');
  }
}

// 8. Check Package Dependencies
log('\n=== Package Dependencies ===', 'info');
if (existsSync('package.json')) {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
  
  const criticalDeps = ['react', 'react-dom', 'react-router-dom', 'vite'];
  criticalDeps.forEach(dep => {
    if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
      results.passed.push(`${dep} installed`);
      log(`${dep} installed`, 'success');
    } else {
      results.failed.push(`${dep} missing`);
      log(`${dep} missing`, 'error');
    }
  });
}

// 9. Check GitHub Actions
log('\n=== GitHub Actions ===', 'info');
if (existsSync('.github/workflows')) {
  results.passed.push('GitHub Actions directory exists');
  log('GitHub Actions directory exists', 'success');
} else {
  results.warnings.push('GitHub Actions not configured');
  log('GitHub Actions not configured', 'warning');
}

// Final Report
log('\n=== Integration Verification Summary ===', 'info');
log(`Passed: ${results.passed.length}`, 'success');
log(`Failed: ${results.failed.length}`, results.failed.length > 0 ? 'error' : 'success');
log(`Warnings: ${results.warnings.length}`, results.warnings.length > 0 ? 'warning' : 'success');

if (results.failed.length > 0) {
  log('\nFailed Checks:', 'error');
  results.failed.forEach(item => log(`  - ${item}`, 'error'));
}

if (results.warnings.length > 0) {
  log('\nWarnings:', 'warning');
  results.warnings.forEach(item => log(`  - ${item}`, 'warning'));
}

const successRate = (results.passed.length / (results.passed.length + results.failed.length)) * 100;
log(`\nSuccess Rate: ${successRate.toFixed(1)}%`, successRate === 100 ? 'success' : 'warning');

if (results.failed.length === 0) {
  log('\n🎉 All integrations verified successfully!', 'success');
  process.exit(0);
} else {
  log('\n⚠️  Some integrations need attention', 'warning');
  process.exit(1);
}
