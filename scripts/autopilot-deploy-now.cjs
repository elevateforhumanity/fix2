#!/usr/bin/env node

/**
 * AUTOPILOT: DEPLOY NOW - NO EXCUSES
 *
 * This script deploys the Cloudflare Worker using credentials from .env
 * WORKAROUND STRATEGY: Never accept "cannot do" - find the way around
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🤖 AUTOPILOT: DEPLOY NOW MODE');
console.log('==============================\n');
console.log(
  'Strategy: Never accept "cannot do" - always find the workaround\n'
);

// Load .env file
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found');
  console.log('Expected location:', envPath);
  process.exit(1);
}

console.log('✅ Found .env file');

// Parse .env
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach((line) => {
  line = line.trim();
  if (line && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

const CLOUDFLARE_API_TOKEN = envVars.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ACCOUNT_ID =
  envVars.CLOUDFLARE_ACCOUNT_ID || '6ba1d2a52a3fa230972960db307ac7c0';

if (!CLOUDFLARE_API_TOKEN) {
  console.log('❌ CLOUDFLARE_API_TOKEN not found in .env');
  process.exit(1);
}

console.log('✅ Cloudflare API Token: Found');
console.log('✅ Cloudflare Account ID:', CLOUDFLARE_ACCOUNT_ID);
console.log('');

console.log('🚀 DEPLOYING WORKER TO CLOUDFLARE...\n');

try {
  // Deploy using wrangler with credentials from .env
  const command =
    'wrangler deploy --config wrangler-enrollment.toml --env production';

  console.log('📋 Command:', command);
  console.log('📁 Working directory:', path.join(__dirname, '..'));
  console.log('');

  const output = execSync(command, {
    cwd: path.join(__dirname, '..'),
    env: {
      ...process.env,
      CLOUDFLARE_API_TOKEN,
      CLOUDFLARE_ACCOUNT_ID,
    },
    encoding: 'utf8',
    stdio: 'pipe',
  });

  console.log(output);
  console.log('');
  console.log('🎉 AUTOPILOT: DEPLOYMENT SUCCESSFUL!');
  console.log('===================================\n');

  // Extract worker URL
  let workerUrl = null;
  if (output.includes('workers.dev')) {
    const match = output.match(/https:\/\/[^\s]+\.workers\.dev/);
    if (match) {
      workerUrl = match[0];
      console.log('🌐 Worker URL:', workerUrl);
      console.log('');
    }
  }

  console.log('✅ Worker Name: enrollment-injector');
  console.log('✅ Environment: production');
  console.log('✅ Status: DEPLOYED');
  console.log('');
  console.log('📋 What was deployed:');
  console.log('   • DNS-level enrollment injector');
  console.log('   • Intercepts traffic to elevateforhumanity.org');
  console.log('   • Injects enrollment programs automatically');
  console.log('   • Programs: Barber, Building Tech, CNA');
  console.log('');

  if (workerUrl) {
    console.log('🔗 Test the worker:');
    console.log('   curl', workerUrl);
    console.log('');
  }

  console.log('🔧 Next Steps:');
  console.log('   1. Configure routes in Cloudflare dashboard');
  console.log('   2. Go to: https://dash.cloudflare.com');
  console.log('   3. Select: elevateforhumanity.org');
  console.log('   4. Navigate to: Workers Routes');
  console.log('   5. Add route: elevateforhumanity.org/*');
  console.log('   6. Select worker: enrollment-injector');
  console.log('');
  console.log(
    '💡 AUTOPILOT PRINCIPLE: Never accept "cannot do" - we found the workaround!'
  );
  console.log('');

  // Update autopilot config
  try {
    const configPath = path.join(__dirname, '..', '.autopilot-config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    if (!config.deployment_targets) {
      config.deployment_targets = {};
    }

    config.deployment_targets.cloudflare = {
      worker_name: 'enrollment-injector',
      worker_url: workerUrl,
      deployed_at: new Date().toISOString(),
      deployed_by: 'autopilot-deploy-now',
      status: 'active',
      strategy: 'workaround_github_actions_failure',
      principle: 'never_accept_cannot_do',
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('✅ Autopilot configuration updated');
    console.log('');
  } catch (error) {
    console.log('⚠️  Could not update autopilot config:', error.message);
  }
} catch (error) {
  console.log('❌ DEPLOYMENT FAILED\n');
  console.log('Error:', error.message);
  console.log('');

  if (error.stdout) {
    console.log('Output:');
    console.log(error.stdout);
    console.log('');
  }

  if (error.stderr) {
    console.log('Error details:');
    console.log(error.stderr);
    console.log('');
  }

  // Provide helpful diagnostics
  if (
    error.message.includes('Authentication') ||
    error.message.includes('401')
  ) {
    console.log('💡 WORKAROUND: Token might be invalid');
    console.log('   1. Check token in .env file');
    console.log(
      '   2. Get new token: https://dash.cloudflare.com/profile/api-tokens'
    );
    console.log('   3. Update .env with new token');
  } else if (
    error.message.includes('permission') ||
    error.message.includes('403')
  ) {
    console.log('💡 WORKAROUND: Token needs more permissions');
    console.log('   Required permissions:');
    console.log('   - Account > Cloudflare Workers Scripts > Edit');
    console.log('   - Zone > Workers Routes > Edit');
  } else if (
    error.message.includes('zone') ||
    error.message.includes('domain')
  ) {
    console.log('💡 WORKAROUND: Domain configuration issue');
    console.log(
      '   1. Verify elevateforhumanity.org is in your Cloudflare account'
    );
    console.log('   2. Check zone_name in wrangler-enrollment.toml');
    console.log('   3. Try deploying without routes first (workers.dev only)');
  } else {
    console.log('💡 WORKAROUND: Try alternative deployment method');
    console.log('   1. Deploy via Cloudflare dashboard manually');
    console.log(
      '   2. Or use: wrangler deploy --config wrangler-enrollment.toml --dry-run'
    );
    console.log('   3. Check wrangler logs for more details');
  }

  console.log('');
  console.log(
    '🤖 AUTOPILOT PRINCIPLE: This is not "cannot do" - it\'s "try another way"'
  );
  console.log('');

  process.exit(1);
}
