#!/usr/bin/env node

/**
 * AUTOPILOT: UPDATE TOKEN AND DEPLOY (ZERO INTERACTION)
 *
 * Usage: node scripts/autopilot-update-token-deploy.cjs <CLOUDFLARE_API_TOKEN>
 *
 * The autopilot calls this with a fresh token and it:
 * 1. Updates .env file
 * 2. Deploys worker
 * 3. Reports success
 *
 * ZERO MANUAL INTERACTION
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🤖 AUTOPILOT: AUTONOMOUS TOKEN UPDATE & DEPLOYMENT');
console.log('===================================================\n');

// Get token from command line argument
const token = process.argv[2];

if (!token) {
  console.log('❌ No token provided');
  console.log('');
  console.log('Usage: node scripts/autopilot-update-token-deploy.cjs <TOKEN>');
  console.log('');
  console.log(
    'The autopilot should call this script with a valid Cloudflare API token.'
  );
  console.log('');
  process.exit(1);
}

console.log('✅ Token received from autopilot');
console.log('📝 Updating .env file...');

// Update .env file
const envPath = path.join(__dirname, '..', '.env');
const envBackupPath = path.join(__dirname, '..', '.env.backup');

let envContent = '';
if (fs.existsSync(envBackupPath)) {
  envContent = fs.readFileSync(envBackupPath, 'utf8');
} else if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
} else {
  // Create new .env
  envContent = `# Cloudflare Configuration
CLOUDFLARE_API_TOKEN=${token}
CLOUDFLARE_ACCOUNT_ID=6ba1d2a52a3fa230972960db307ac7c0
`;
}

// Replace token in env content
const lines = envContent.split('\n');
const newLines = lines.map((line) => {
  if (line.startsWith('CLOUDFLARE_API_TOKEN=')) {
    return `CLOUDFLARE_API_TOKEN=${token}`;
  }
  if (line.startsWith('CF_API_TOKEN=')) {
    return `CF_API_TOKEN=${token}`;
  }
  return line;
});

// Write updated .env
fs.writeFileSync(envPath, newLines.join('\n'));
console.log('✅ .env file updated\n');

console.log('🚀 DEPLOYING WORKER TO CLOUDFLARE...\n');

try {
  const output = execSync('node scripts/autopilot-deploy-now.cjs', {
    cwd: path.join(__dirname, '..'),
    encoding: 'utf8',
    stdio: 'pipe',
  });

  console.log(output);
  console.log('\n🎉 AUTOPILOT: DEPLOYMENT COMPLETE!');
  console.log('===================================');
  console.log('');
  console.log('✅ Token updated in .env');
  console.log('✅ Worker deployed to Cloudflare');
  console.log('✅ Enrollment injector is LIVE');
  console.log('');
  console.log('🌐 Next: Configure routes in Cloudflare dashboard');
  console.log('   Or the autopilot can do this via API');
  console.log('');
} catch (error) {
  console.log('\n❌ Deployment failed');
  console.log('Error:', error.message);

  if (error.stdout) {
    console.log('\nOutput:');
    console.log(error.stdout);
  }

  console.log('\n🤖 AUTOPILOT: Trying alternative deployment...\n');

  // Try direct wrangler deploy
  try {
    console.log('Attempting direct wrangler deployment...');
    const directOutput = execSync(
      'wrangler deploy --config wrangler-enrollment.toml --env production',
      {
        cwd: path.join(__dirname, '..'),
        env: {
          ...process.env,
          CLOUDFLARE_API_TOKEN: token,
          CLOUDFLARE_ACCOUNT_ID: '6ba1d2a52a3fa230972960db307ac7c0',
        },
        encoding: 'utf8',
        stdio: 'pipe',
      }
    );

    console.log(directOutput);
    console.log('\n✅ ALTERNATIVE DEPLOYMENT SUCCESSFUL!');
  } catch (altError) {
    console.log('❌ Alternative deployment also failed');
    console.log('Error:', altError.message);
    console.log('\nAutopilot needs to try another workaround...');
    process.exit(1);
  }
}
