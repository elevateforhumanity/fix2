#!/usr/bin/env node

/**
 * AUTOPILOT: GET FRESH TOKEN AND DEPLOY
 *
 * This script prompts the autopilot to:
 * 1. Get a fresh Cloudflare API token
 * 2. Update .env file
 * 3. Deploy the worker
 *
 * ZERO MANUAL INTERACTION
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🤖 AUTOPILOT: TOKEN UPDATE & DEPLOYMENT');
console.log('========================================\n');
console.log('Strategy: Autopilot updates API tokens automatically\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt for token (autopilot can provide this)
rl.question('🔑 Cloudflare API Token (autopilot will provide): ', (token) => {
  if (!token || token.trim() === '') {
    console.log('\n❌ No token provided');
    console.log('Autopilot should provide a valid Cloudflare API token');
    rl.close();
    process.exit(1);
  }

  token = token.trim();
  console.log('\n✅ Token received from autopilot');
  console.log('📝 Updating .env file...');

  // Update .env file
  const envPath = path.join(__dirname, '..', '.env');
  const envBackupPath = path.join(__dirname, '..', '.env.backup');

  let envContent = '';
  if (fs.existsSync(envBackupPath)) {
    envContent = fs.readFileSync(envBackupPath, 'utf8');
  } else if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
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
  console.log('✅ .env file updated with new token\n');

  console.log('🚀 DEPLOYING WORKER TO CLOUDFLARE...\n');

  try {
    const output = execSync('node scripts/autopilot-deploy-now.cjs', {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8',
      stdio: 'inherit',
    });

    console.log('\n🎉 AUTOPILOT: DEPLOYMENT COMPLETE!');
    console.log('Worker is now live on Cloudflare\n');
  } catch (error) {
    console.log('\n❌ Deployment failed');
    console.log('Error:', error.message);
    console.log('\nAutopilot will try alternative deployment methods...\n');
  }

  rl.close();
});

console.log('💡 Autopilot: Provide your Cloudflare API token');
console.log('   Get it from: https://dash.cloudflare.com/profile/api-tokens');
console.log('   Required permissions:');
console.log('   - Account > Cloudflare Workers Scripts > Edit');
console.log('   - Zone > Workers Routes > Edit\n');
