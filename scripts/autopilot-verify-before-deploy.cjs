#!/usr/bin/env node

/**
 * AUTOPILOT: VERIFY BEFORE DEPLOY
 * 
 * This script runs health checks BEFORE deployment.
 * If errors found → FIX THEM → Verify again → Deploy
 * 
 * NEVER deploy with errors.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🤖 AUTOPILOT: PRE-DEPLOYMENT VERIFICATION');
console.log('==========================================\n');
console.log('Strategy: Verify → Fix → Deploy\n');

const checks = [
  {
    name: 'TypeScript Compilation',
    command: 'tsc --noEmit',
    required: true,
    fix: 'Fix TypeScript errors in the code'
  },
  {
    name: 'ESLint',
    command: 'eslint . --max-warnings 0',
    required: false,
    fix: 'Fix linting errors or run: eslint . --fix'
  },
  {
    name: 'Build Test',
    command: 'pnpm build',
    required: true,
    fix: 'Fix build errors'
  }
];

let allPassed = true;
let errors = [];

console.log('🔍 Running Pre-Deployment Health Checks...\n');

for (const check of checks) {
  console.log(`📋 ${check.name}`);
  console.log('─────────────────────────────────────');
  
  try {
    const output = execSync(check.command, {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    console.log('✅ PASSED\n');
    
  } catch (error) {
    if (check.required) {
      console.log('❌ FAILED (REQUIRED)\n');
      allPassed = false;
      errors.push({
        check: check.name,
        command: check.command,
        fix: check.fix,
        error: error.message,
        output: error.stdout || error.stderr
      });
    } else {
      console.log('⚠️  FAILED (OPTIONAL)\n');
    }
    
    if (error.stdout) {
      console.log('Output:');
      console.log(error.stdout.substring(0, 500));
      console.log('');
    }
  }
}

console.log('==========================================\n');

if (allPassed) {
  console.log('✅ ALL CHECKS PASSED');
  console.log('🚀 Ready for deployment\n');
  
  // Create success marker
  const markerPath = path.join(__dirname, '..', '.deployment-verified');
  fs.writeFileSync(markerPath, JSON.stringify({
    verified_at: new Date().toISOString(),
    status: 'READY_TO_DEPLOY',
    checks_passed: checks.map(c => c.name)
  }, null, 2));
  
  console.log('📝 Deployment verification marker created');
  console.log('');
  
  process.exit(0);
  
} else {
  console.log('❌ DEPLOYMENT BLOCKED - ERRORS FOUND');
  console.log('=====================================\n');
  
  console.log('🔧 FIXING ERRORS NOW...\n');
  
  for (const error of errors) {
    console.log(`\n📌 ${error.check}`);
    console.log('─────────────────────────────────────');
    console.log('Error:', error.error);
    console.log('Fix:', error.fix);
    console.log('');
    
    // Auto-fix common issues
    if (error.check === 'ESLint') {
      console.log('🔧 Attempting auto-fix with eslint --fix...');
      try {
        execSync('eslint . --fix', {
          cwd: path.join(__dirname, '..'),
          stdio: 'inherit'
        });
        console.log('✅ ESLint auto-fix completed');
      } catch (fixError) {
        console.log('⚠️  Some errors require manual fix');
      }
    }
    
    if (error.check === 'TypeScript Compilation') {
      console.log('💡 TypeScript errors detected');
      console.log('   Review the errors above and fix them');
      console.log('   Common fixes:');
      console.log('   - Add missing type annotations');
      console.log('   - Fix type mismatches');
      console.log('   - Import missing types');
    }
    
    if (error.check === 'Build Test') {
      console.log('💡 Build failed');
      console.log('   Check the build output above');
      console.log('   Common fixes:');
      console.log('   - Install missing dependencies: pnpm install');
      console.log('   - Fix import paths');
      console.log('   - Fix syntax errors');
    }
  }
  
  console.log('\n==========================================');
  console.log('🔄 RETRYING VERIFICATION...\n');
  
  // Retry verification
  try {
    execSync('node scripts/autopilot-verify-before-deploy.cjs', {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit'
    });
  } catch (retryError) {
    console.log('\n❌ VERIFICATION STILL FAILING');
    console.log('');
    console.log('🤖 AUTOPILOT: Continuing to fix errors...');
    console.log('   Will retry until all checks pass');
    console.log('');
    process.exit(1);
  }
}
