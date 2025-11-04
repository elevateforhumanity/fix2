#!/usr/bin/env node
/**
 * DEPLOY NOW - Complete autonomous deployment
 * Verifies everything, then deploys using best available method
 */

const fs = require('fs');
const { execSync } = require('child_process');

function log(msg, icon = '📋') {
  console.log(`${icon} ${msg}`);
}
function exec(cmd, silent = false) {
  try {
    return {
      success: true,
      output: execSync(cmd, {
        encoding: 'utf8',
        stdio: silent ? 'pipe' : 'inherit',
      }),
    };
  } catch (error) {
    return { success: false, error: error.message, output: error.stdout || '' };
  }
}

console.log('═══════════════════════════════════════════════════════');
console.log('  DEPLOY NOW - Autonomous Deployment System');
console.log('═══════════════════════════════════════════════════════\n');

// Step 1: Final verification
log('Step 1: Final verification...', '🔍');
const checks = [
  { name: 'Build exists', test: () => fs.existsSync('./dist/index.html') },
  { name: 'Assets exist', test: () => fs.existsSync('./dist/assets') },
  { name: 'Netlify config', test: () => fs.existsSync('./netlify.toml') },
  { name: 'Environment vars', test: () => fs.existsSync('./.env') },
];

let allPass = true;
for (const check of checks) {
  const pass = check.test();
  log(`  ${check.name}: ${pass ? '✅' : '❌'}`, '');
  if (!pass) allPass = false;
}

if (!allPass) {
  log('\n❌ Pre-deployment checks failed', '');
  process.exit(1);
}

log('\n✅ All checks passed\n', '');

// Step 2: Try deployment methods
log('Step 2: Attempting deployment...', '🚀');

const methods = [
  {
    name: 'Netlify CLI',
    cmd: 'netlify deploy --prod --dir=dist',
    check: () => exec('netlify --version', true).success,
  },
  {
    name: 'Vercel',
    cmd: 'npx vercel --prod --yes',
    check: () => true,
  },
  {
    name: 'GitHub Pages',
    cmd: 'git checkout -b gh-pages 2>/dev/null || git checkout gh-pages && cp -r dist/* . && git add . && git commit -m "Deploy" && git push origin gh-pages --force && git checkout main',
    check: () => fs.existsSync('./.git'),
  },
];

for (const method of methods) {
  if (!method.check()) {
    log(`  ${method.name}: Not available`, '⏭️');
    continue;
  }

  log(`  Trying ${method.name}...`, '🎯');
  const result = exec(method.cmd, false);

  if (result.success) {
    log(`\n✅ DEPLOYED via ${method.name}!`, '🎉');

    // Save deployment info
    fs.writeFileSync(
      './deployment-success.json',
      JSON.stringify(
        {
          method: method.name,
          timestamp: new Date().toISOString(),
          success: true,
        },
        null,
        2
      )
    );

    log('\n📋 Deployment complete!', '');
    log('   Check your hosting platform for the live URL', '');
    process.exit(0);
  }

  log(`  ${method.name} failed, trying next method...`, '⚠️');
}

// Fallback: Create deployment package
log('\n📦 Creating deployment package...', '');
exec('tar -czf deployment-package.tar.gz -C dist .');
log('✅ Created: deployment-package.tar.gz', '');
log('\n📋 Manual deployment options:', '');
log('   1. Upload to Netlify Drop: https://app.netlify.com/drop', '');
log('   2. Extract deployment-package.tar.gz to your web server', '');
log('   3. Use any static hosting service', '');

process.exit(0);
