#!/usr/bin/env node
/**
 * Auto Generate and Update Vercel Token
 *
 * This script:
 * 1. Generates a new Vercel token via API
 * 2. Updates GitHub secrets
 * 3. Updates local .env file
 * 4. Exports to environment
 */

import { execSync } from 'child_process';
import { writeFileSync, readFileSync, existsSync } from 'fs';

console.log('🔑 Auto Generate Vercel Token');
console.log('==============================\n');

// Step 1: Check if we have credentials to generate token
const VERCEL_EMAIL = process.env.VERCEL_EMAIL;
const VERCEL_PASSWORD = process.env.VERCEL_PASSWORD;

if (!VERCEL_EMAIL || !VERCEL_PASSWORD) {
  console.log('❌ Missing Vercel credentials');
  console.log('');
  console.log('Set credentials:');
  console.log('  export VERCEL_EMAIL="your-vercel-email@example.com"');
  console.log('  export VERCEL_PASSWORD="your-vercel-password"');
  console.log('');
  console.log('Then run: pnpm generate-token');
  console.log('');
  process.exit(1);
}

console.log('🔐 Step 1: Logging in to Vercel...');

// Step 2: Login to Vercel and get token
try {
  // Use Vercel CLI to login and get token
  const loginResult = execSync(`npx vercel login --email ${VERCEL_EMAIL}`, {
    encoding: 'utf-8',
    stdio: 'pipe',
  });

  console.log('   ✅ Logged in successfully\n');
} catch (error) {
  console.log('   ❌ Login failed');
  console.log(
    '   Try manual token creation: https://vercel.com/account/tokens'
  );
  console.log('');
  process.exit(1);
}

// Step 3: Create token via Vercel API
console.log('🔑 Step 2: Creating new token...');

const tokenName = `fix2-gpql-auto-${Date.now()}`;

try {
  // Get current auth token from Vercel CLI config
  const homeDir = process.env.HOME || process.env.USERPROFILE;
  const vercelConfigPath = `${homeDir}/.vercel/auth.json`;

  let authToken;

  if (existsSync(vercelConfigPath)) {
    const authConfig = JSON.parse(readFileSync(vercelConfigPath, 'utf-8'));
    authToken = authConfig.token;
  }

  if (!authToken) {
    console.log('   ❌ Could not find Vercel auth token');
    console.log('   Manual token creation required');
    console.log('');
    console.log('   1. Go to: https://vercel.com/account/tokens');
    console.log('   2. Click "Create Token"');
    console.log('   3. Name: fix2-gpql-automation');
    console.log('   4. Copy token and run:');
    console.log('      export VERCEL_TOKEN="your-token"');
    console.log('      pnpm auto-fix');
    console.log('');
    process.exit(1);
  }

  // Create new token
  const response = await fetch('https://api.vercel.com/v3/user/tokens', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: tokenName,
      expiresAt: Date.now() + 90 * 24 * 60 * 60 * 1000, // 90 days
    }),
  });

  if (!response.ok) {
    throw new Error(`Token creation failed: ${response.statusText}`);
  }

  const tokenData = await response.json();
  const newToken = tokenData.token;

  console.log(`   ✅ Token created: ${tokenName}`);
  console.log(`   Token: ${newToken.substring(0, 20)}...`);
  console.log('');

  // Step 4: Update GitHub secrets
  console.log('🔄 Step 3: Updating GitHub secrets...');

  try {
    execSync(`gh secret set VERCEL_TOKEN --body "${newToken}"`, {
      stdio: 'inherit',
    });
    console.log('   ✅ GitHub secret updated\n');
  } catch (error) {
    console.log('   ⚠️  Could not update GitHub secret automatically');
    console.log('   Manual update required:');
    console.log(
      '   1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions'
    );
    console.log('   2. Update VERCEL_TOKEN with new value');
    console.log('');
  }

  // Step 5: Update local .env file
  console.log('📝 Step 4: Updating local .env file...');

  const envFile = '.env.local';
  let envContent = '';

  if (existsSync(envFile)) {
    envContent = readFileSync(envFile, 'utf-8');

    // Replace existing token
    if (envContent.includes('VERCEL_TOKEN=')) {
      envContent = envContent.replace(
        /VERCEL_TOKEN=.*/,
        `VERCEL_TOKEN="${newToken}"`
      );
    } else {
      envContent += `\nVERCEL_TOKEN="${newToken}"\n`;
    }
  } else {
    envContent = `VERCEL_TOKEN="${newToken}"\n`;
  }

  writeFileSync(envFile, envContent);
  console.log(`   ✅ Token saved to ${envFile}\n`);

  // Step 6: Export to current environment
  console.log('🌍 Step 5: Exporting to environment...');
  process.env.VERCEL_TOKEN = newToken;
  console.log('   ✅ Token exported to VERCEL_TOKEN\n');

  // Step 7: Show next steps
  console.log('==============================');
  console.log('✅ Token Generation Complete!');
  console.log('==============================\n');

  console.log('📋 Token Details:');
  console.log(`   Name: ${tokenName}`);
  console.log(`   Token: ${newToken.substring(0, 20)}...`);
  console.log('   Expires: 90 days from now');
  console.log('');

  console.log('📍 Token saved to:');
  console.log(`   ✅ ${envFile}`);
  console.log('   ✅ GitHub Secrets (if gh CLI available)');
  console.log('   ✅ Current environment (VERCEL_TOKEN)');
  console.log('');

  console.log('🚀 Next steps:');
  console.log('   Run the auto-fix:');
  console.log('   pnpm auto-fix');
  console.log('');

  console.log('💡 To use in new terminal:');
  console.log(`   export VERCEL_TOKEN="${newToken}"`);
  console.log('');
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('');
  console.log('💡 Manual token creation:');
  console.log('   1. Go to: https://vercel.com/account/tokens');
  console.log('   2. Click "Create Token"');
  console.log('   3. Name: fix2-gpql-automation');
  console.log('   4. Scope: Full Account');
  console.log('   5. Expiration: 90 days');
  console.log('   6. Copy token');
  console.log('');
  console.log('   Then run:');
  console.log('   export VERCEL_TOKEN="your-token"');
  console.log('   pnpm auto-fix');
  console.log('');
  process.exit(1);
}
