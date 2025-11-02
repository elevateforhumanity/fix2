#!/usr/bin/env node

/**
 * AUTOPILOT: Cloudflare Worker Deployment
 * 
 * This script uses the autopilot system to deploy the enrollment injector worker
 * to Cloudflare. It reads credentials from environment variables and executes
 * the deployment autonomously.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🤖 AUTOPILOT: Cloudflare Worker Deployment');
console.log('==========================================\n');

// Check for Cloudflare credentials
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '6ba1d2a52a3fa230972960db307ac7c0';

if (!CLOUDFLARE_API_TOKEN) {
  console.log('❌ CLOUDFLARE_API_TOKEN not found in environment');
  console.log('');
  console.log('The autopilot needs the Cloudflare API token to deploy.');
  console.log('');
  console.log('Options:');
  console.log('1. Set it in your environment:');
  console.log('   export CLOUDFLARE_API_TOKEN="your_token_here"');
  console.log('');
  console.log('2. Or run with the token:');
  console.log('   CLOUDFLARE_API_TOKEN="your_token" node scripts/autopilot-cloudflare-deploy.js');
  console.log('');
  console.log('Get your token from: https://dash.cloudflare.com/profile/api-tokens');
  process.exit(1);
}

console.log('✅ Cloudflare API Token: Found');
console.log('✅ Cloudflare Account ID:', CLOUDFLARE_ACCOUNT_ID);
console.log('');

// Deployment steps
const steps = [
  {
    name: 'Validate Worker Configuration',
    command: 'wrangler deploy --config wrangler-enrollment.toml --env production --dry-run',
    description: 'Checking worker configuration and syntax'
  },
  {
    name: 'Deploy Worker to Cloudflare',
    command: 'wrangler deploy --config wrangler-enrollment.toml --env production',
    description: 'Deploying enrollment injector to Cloudflare edge network'
  }
];

let deploymentSuccess = false;
let workerUrl = null;

// Execute deployment
for (let i = 0; i < steps.length; i++) {
  const step = steps[i];
  console.log(`📋 Step ${i + 1}/${steps.length}: ${step.name}`);
  console.log(`   ${step.description}`);
  console.log('');

  try {
    const output = execSync(step.command, {
      cwd: path.join(__dirname, '..'),
      env: {
        ...process.env,
        CLOUDFLARE_API_TOKEN,
        CLOUDFLARE_ACCOUNT_ID
      },
      encoding: 'utf8',
      stdio: 'pipe'
    });

    console.log(output);
    console.log(`✅ ${step.name} - SUCCESS\n`);

    // Extract worker URL from output
    if (output.includes('workers.dev')) {
      const match = output.match(/https:\/\/[^\s]+\.workers\.dev/);
      if (match) {
        workerUrl = match[0];
      }
    }

    if (i === steps.length - 1) {
      deploymentSuccess = true;
    }
  } catch (error) {
    console.log(`❌ ${step.name} - FAILED\n`);
    console.log('Error output:');
    console.log(error.stdout || error.message);
    console.log('');
    
    // Provide helpful error messages
    if (error.message.includes('Authentication')) {
      console.log('💡 The API token appears to be invalid or expired.');
      console.log('   Get a new token from: https://dash.cloudflare.com/profile/api-tokens');
    } else if (error.message.includes('permission')) {
      console.log('💡 The API token doesn\'t have the required permissions.');
      console.log('   Required permissions:');
      console.log('   - Account > Cloudflare Workers Scripts > Edit');
      console.log('   - Zone > Workers Routes > Edit');
    } else if (error.message.includes('zone')) {
      console.log('💡 The domain might not be configured in your Cloudflare account.');
      console.log('   Make sure elevateforhumanity.org is added to your Cloudflare account.');
    }
    
    process.exit(1);
  }
}

// Success summary
if (deploymentSuccess) {
  console.log('');
  console.log('🎉 AUTOPILOT DEPLOYMENT COMPLETE!');
  console.log('=================================\n');
  
  if (workerUrl) {
    console.log('🌐 Worker URL:', workerUrl);
    console.log('');
  }
  
  console.log('✅ Deployment Status: SUCCESS');
  console.log('✅ Worker Name: enrollment-injector');
  console.log('✅ Environment: production');
  console.log('');
  console.log('📋 What was deployed:');
  console.log('   • DNS-level enrollment injector');
  console.log('   • Intercepts ALL traffic to elevateforhumanity.org');
  console.log('   • Injects enrollment programs automatically');
  console.log('   • Programs: Barber, Building Tech, CNA');
  console.log('');
  console.log('🔧 Next Steps:');
  console.log('   1. Configure routes in Cloudflare dashboard');
  console.log('   2. Go to: https://dash.cloudflare.com');
  console.log('   3. Select: elevateforhumanity.org');
  console.log('   4. Navigate to: Workers Routes');
  console.log('   5. Add route: elevateforhumanity.org/*');
  console.log('   6. Select worker: enrollment-injector');
  console.log('');
  console.log('🚀 Once routes are configured, the autopilot will run autonomously!');
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
      status: 'active',
      auto_deploy: true
    };
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('✅ Autopilot configuration updated');
  } catch (error) {
    console.log('⚠️  Could not update autopilot config:', error.message);
  }
}
