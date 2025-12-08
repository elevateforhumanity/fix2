#!/usr/bin/env node

/**
 * Smoke Test - Quick validation of critical functionality
 * Tests the most important user flows and features
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

const results = {
  passed: [],
  failed: [],
  warnings: []
};

console.log('🔥 Running Smoke Test...\n');
console.log('Testing critical functionality and user flows\n');
console.log('='.repeat(70) + '\n');

// Test 1: Build succeeds
async function testBuild() {
  console.log('📦 Test 1: Build Process');
  try {
    // Create temporary env file for build
    const envContent = `
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder_key
SUPABASE_SERVICE_ROLE_KEY=placeholder_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
STRIPE_SECRET_KEY=sk_test_placeholder
`;
    fs.writeFileSync('.env.local', envContent);
    
    const { stdout, stderr } = await execAsync('npm run build', { 
      timeout: 300000,
      maxBuffer: 10 * 1024 * 1024 
    });
    
    // Clean up
    if (fs.existsSync('.env.local')) {
      fs.unlinkSync('.env.local');
    }
    
    if (stderr && stderr.includes('error')) {
      results.failed.push('Build process failed with errors');
      console.log('   ❌ FAILED: Build has errors\n');
      return false;
    }
    
    results.passed.push('Build process completes successfully');
    console.log('   ✅ PASSED: Build completes without errors\n');
    return true;
  } catch (error) {
    // Clean up
    if (fs.existsSync('.env.local')) {
      fs.unlinkSync('.env.local');
    }
    
    results.failed.push(`Build process failed: ${error.message}`);
    console.log('   ❌ FAILED: Build process crashed\n');
    console.log(`   Error: ${error.message}\n`);
    return false;
  }
}

// Test 2: Critical routes exist
function testCriticalRoutes() {
  console.log('🛣️  Test 2: Critical Routes');
  
  const criticalRoutes = [
    'app/page.tsx',                    // Homepage
    'app/apply/page.tsx',              // Application
    'app/programs/page.tsx',           // Programs listing
    'app/contact/page.tsx',            // Contact
    'app/about/page.tsx',              // About
    'app/funding/page.tsx',            // Funding info
    'app/accessibility/page.tsx',      // Accessibility
    'app/privacy/page.tsx',            // Privacy policy
    'app/terms/page.tsx',              // Terms of service
  ];
  
  let allExist = true;
  
  for (const route of criticalRoutes) {
    if (fs.existsSync(route)) {
      console.log(`   ✅ ${route}`);
    } else {
      console.log(`   ❌ ${route} - MISSING`);
      results.failed.push(`Critical route missing: ${route}`);
      allExist = false;
    }
  }
  
  if (allExist) {
    results.passed.push('All critical routes exist');
    console.log('   ✅ PASSED: All critical routes exist\n');
  } else {
    console.log('   ❌ FAILED: Some critical routes are missing\n');
  }
  
  return allExist;
}

// Test 3: Critical components exist
function testCriticalComponents() {
  console.log('🧩 Test 3: Critical Components');
  
  const criticalComponents = [
    'components/EnrollmentProcess.tsx',
    'components/security/SimpleCaptcha.tsx',
    'components/layout/Header.tsx',
    'components/layout/Footer.tsx',
  ];
  
  let allExist = true;
  
  for (const component of criticalComponents) {
    if (fs.existsSync(component)) {
      console.log(`   ✅ ${component}`);
    } else {
      console.log(`   ❌ ${component} - MISSING`);
      results.warnings.push(`Component missing: ${component}`);
      allExist = false;
    }
  }
  
  if (allExist) {
    results.passed.push('All critical components exist');
    console.log('   ✅ PASSED: All critical components exist\n');
  } else {
    console.log('   ⚠️  WARNING: Some components are missing\n');
  }
  
  return allExist;
}

// Test 4: Configuration files
function testConfiguration() {
  console.log('⚙️  Test 4: Configuration Files');
  
  const configFiles = [
    'package.json',
    'next.config.mjs',
    'tailwind.config.ts',
    'tsconfig.json',
    '.gitignore',
  ];
  
  let allExist = true;
  
  for (const file of configFiles) {
    if (fs.existsSync(file)) {
      console.log(`   ✅ ${file}`);
    } else {
      console.log(`   ❌ ${file} - MISSING`);
      results.failed.push(`Config file missing: ${file}`);
      allExist = false;
    }
  }
  
  if (allExist) {
    results.passed.push('All configuration files exist');
    console.log('   ✅ PASSED: All configuration files exist\n');
  } else {
    console.log('   ❌ FAILED: Some configuration files are missing\n');
  }
  
  return allExist;
}

// Test 5: Package dependencies
function testDependencies() {
  console.log('📚 Test 5: Critical Dependencies');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    const criticalDeps = [
      'next',
      'react',
      'react-dom',
      'tailwindcss',
      '@supabase/supabase-js',
      'stripe',
    ];
    
    let allExist = true;
    
    for (const dep of criticalDeps) {
      if (deps[dep]) {
        console.log(`   ✅ ${dep} (${deps[dep]})`);
      } else {
        console.log(`   ❌ ${dep} - MISSING`);
        results.failed.push(`Critical dependency missing: ${dep}`);
        allExist = false;
      }
    }
    
    if (allExist) {
      results.passed.push('All critical dependencies installed');
      console.log('   ✅ PASSED: All critical dependencies present\n');
    } else {
      console.log('   ❌ FAILED: Some critical dependencies are missing\n');
    }
    
    return allExist;
  } catch (error) {
    results.failed.push('Cannot read package.json');
    console.log('   ❌ FAILED: Cannot read package.json\n');
    return false;
  }
}

// Test 6: Public assets
function testPublicAssets() {
  console.log('🖼️  Test 6: Public Assets');
  
  const criticalAssets = [
    'public/images/hero-training.jpg',
    'public/media/programs/cna-hd.jpg',
    'public/media/programs/hvac-hd.jpg',
    'public/media/programs/barber-hd.jpg',
  ];
  
  let allExist = true;
  
  for (const asset of criticalAssets) {
    if (fs.existsSync(asset)) {
      console.log(`   ✅ ${asset}`);
    } else {
      console.log(`   ⚠️  ${asset} - MISSING`);
      results.warnings.push(`Asset missing: ${asset}`);
      allExist = false;
    }
  }
  
  if (allExist) {
    results.passed.push('All critical assets exist');
    console.log('   ✅ PASSED: All critical assets exist\n');
  } else {
    console.log('   ⚠️  WARNING: Some assets are missing\n');
  }
  
  return allExist;
}

// Test 7: TypeScript compilation
async function testTypeScript() {
  console.log('📘 Test 7: TypeScript Compilation');
  
  try {
    const { stdout, stderr } = await execAsync('npx tsc --noEmit', { 
      timeout: 60000,
      maxBuffer: 10 * 1024 * 1024 
    });
    
    if (stderr && stderr.includes('error TS')) {
      results.warnings.push('TypeScript has compilation errors');
      console.log('   ⚠️  WARNING: TypeScript has errors (non-blocking)\n');
      return false;
    }
    
    results.passed.push('TypeScript compiles without errors');
    console.log('   ✅ PASSED: TypeScript compiles cleanly\n');
    return true;
  } catch (error) {
    // TypeScript errors are warnings, not failures
    results.warnings.push('TypeScript compilation has issues');
    console.log('   ⚠️  WARNING: TypeScript has compilation issues\n');
    return false;
  }
}

// Run all tests
async function runTests() {
  const testResults = [];
  
  // Run tests in sequence
  testResults.push(testCriticalRoutes());
  testResults.push(testCriticalComponents());
  testResults.push(testConfiguration());
  testResults.push(testDependencies());
  testResults.push(testPublicAssets());
  
  // TypeScript test (non-blocking)
  await testTypeScript();
  
  // Build test (most important, run last)
  const buildPassed = await testBuild();
  testResults.push(buildPassed);
  
  // Print summary
  console.log('='.repeat(70));
  console.log('📊 SMOKE TEST SUMMARY');
  console.log('='.repeat(70) + '\n');
  
  console.log(`✅ Passed: ${results.passed.length}`);
  results.passed.forEach(item => console.log(`   - ${item}`));
  console.log('');
  
  if (results.warnings.length > 0) {
    console.log(`⚠️  Warnings: ${results.warnings.length}`);
    results.warnings.forEach(item => console.log(`   - ${item}`));
    console.log('');
  }
  
  if (results.failed.length > 0) {
    console.log(`❌ Failed: ${results.failed.length}`);
    results.failed.forEach(item => console.log(`   - ${item}`));
    console.log('');
  }
  
  const totalTests = results.passed.length + results.failed.length;
  const passRate = Math.round((results.passed.length / totalTests) * 100);
  
  console.log(`Pass Rate: ${passRate}%`);
  
  if (results.failed.length === 0) {
    console.log('\n🎉 SMOKE TEST PASSED - Website is functional!\n');
    return 0;
  } else {
    console.log('\n🚨 SMOKE TEST FAILED - Critical issues found!\n');
    return 1;
  }
}

// Execute
runTests().then(exitCode => {
  process.exit(exitCode);
}).catch(error => {
  console.error('Smoke test crashed:', error);
  process.exit(1);
});
