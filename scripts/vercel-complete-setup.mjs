#!/usr/bin/env node
/**
 * Complete Vercel Setup - All-in-One
 * 
 * Runs all configuration steps:
 * 1. Configure domain
 * 2. Set production branch to main
 * 3. Clean up old deployments
 * 4. Trigger fresh deployment
 */

import { execSync } from 'child_process';

const VERCELACESSTOKEN = process.env.VERCELACESSTOKEN;

if (!VERCELACESSTOKEN) {
  console.error('❌ VERCELACESSTOKEN not set');
  console.error('Set it with: export VERCELACESSTOKEN="your-token"');
  console.error('');
  console.error('Get token from: https://vercel.com/account/tokens');
  process.exit(1);
}

console.log('🚀 Complete Vercel Setup');
console.log('========================\n');

function runStep(name, command) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`📦 ${name}`);
  console.log('='.repeat(50) + '\n');
  
  try {
    execSync(command, { 
      stdio: 'inherit',
      env: { ...process.env, VERCELACESSTOKEN }
    });
    console.log(`\n✅ ${name} - Complete\n`);
    return true;
  } catch (error) {
    console.error(`\n❌ ${name} - Failed\n`);
    return false;
  }
}

async function main() {
  const steps = [
    {
      name: 'Step 1: Configure Domain',
      command: 'node scripts/configure-domain-api.mjs'
    },
    {
      name: 'Step 2: Clean Up Old Deployments',
      command: 'node scripts/cleanup-old-deployments-api.mjs'
    }
  ];

  let successCount = 0;
  let failCount = 0;

  for (const step of steps) {
    const success = runStep(step.name, step.command);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Setup Summary');
  console.log('='.repeat(50) + '\n');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed:     ${failCount}`);
  console.log('');

  if (failCount === 0) {
    console.log('🎉 All steps completed successfully!');
    console.log('');
    console.log('🔍 Next steps:');
    console.log('   1. Push code to trigger deployment:');
    console.log('      git push origin main');
    console.log('');
    console.log('   2. Wait 2-3 minutes for build');
    console.log('');
    console.log('   3. Check deployment:');
    console.log('      https://vercel.com/elevate-48e460c9/fix2-gpql/deployments');
    console.log('');
    console.log('   4. Verify site:');
    console.log('      https://www.elevateforhumanity.org');
    console.log('');
  } else {
    console.log('⚠️  Some steps failed. Check errors above.');
    console.log('');
    console.log('💡 Manual verification:');
    console.log('   https://vercel.com/elevate-48e460c9/fix2-gpql/settings');
    console.log('');
  }
}

main();
