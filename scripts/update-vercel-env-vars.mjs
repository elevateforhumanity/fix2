#!/usr/bin/env node

/**
 * Update Vercel Environment Variables
 * Automatically updates domain-related env vars for migration
 */

const VERCELACESSTOKEN = process.env.VERCELACESSTOKEN;
const VERCEL_PROJECT_ID =
  process.env.VERCEL_PROJECT_ID || 'prj_I89m6xUtwJlmA3qSE8Su7jIF7Xg7';
const VERCEL_TEAM_ID =
  process.env.VERCEL_TEAM_ID || 'team_Xj2yJdLklcMExBxDPK7I2G4w';

const ENV_VARS_TO_UPDATE = [
  {
    key: 'NEXT_PUBLIC_SITE_URL',
    value: 'https://www.elevateforhumanity.org',
    target: ['production', 'preview', 'development'],
    type: 'plain',
  },
  {
    key: 'NEXT_PUBLIC_APP_URL',
    value: 'https://www.elevateforhumanity.org',
    target: ['production', 'preview', 'development'],
    type: 'plain',
  },
];

async function main() {
  console.log('🔧 Vercel Environment Variable Updater');
  console.log('=====================================\n');

  if (!VERCELACESSTOKEN) {
    console.error('❌ VERCELACESSTOKEN environment variable is required');
    console.error('\nSet it with:');
    console.error('  export VERCELACESSTOKEN=your_token_here');
    console.error('\nGet your token from: https://vercel.com/account/tokens');
    process.exit(1);
  }

  console.log(`📦 Project ID: ${VERCEL_PROJECT_ID}`);
  console.log(`👥 Team ID: ${VERCEL_TEAM_ID}\n`);

  try {
    // Step 1: Get existing environment variables
    console.log('📋 Step 1: Fetching existing environment variables...');
    const existingVars = await getEnvironmentVariables();
    console.log(`   Found ${existingVars.length} existing variables\n`);

    // Step 2: Update each variable
    console.log('🔄 Step 2: Updating environment variables...\n');

    for (const envVar of ENV_VARS_TO_UPDATE) {
      console.log(`   Processing: ${envVar.key}`);

      // Find existing variable
      const existing = existingVars.find((v) => v.key === envVar.key);

      if (existing) {
        console.log(`   - Found existing variable (ID: ${existing.id})`);
        console.log(`   - Old value: ${existing.value}`);
        console.log('   - Deleting old variable...');
        await deleteEnvironmentVariable(existing.id);
        console.log('   ✓ Deleted');
      } else {
        console.log('   - No existing variable found');
      }

      // Create new variable
      console.log(`   - Creating new variable with value: ${envVar.value}`);
      const created = await createEnvironmentVariable(envVar);
      console.log(`   ✓ Created (ID: ${created.id})`);
      console.log('');
    }

    // Step 3: Trigger deployment
    console.log('🚀 Step 3: Triggering new deployment...');
    const deployment = await triggerDeployment();
    console.log('   ✓ Deployment triggered');
    console.log(`   - Deployment ID: ${deployment.id}`);
    console.log(`   - URL: https://${deployment.url}`);
    console.log('');

    console.log('✅ SUCCESS!');
    console.log('\nEnvironment variables updated:');
    ENV_VARS_TO_UPDATE.forEach((v) => {
      console.log(`  - ${v.key} = ${v.value}`);
    });
    console.log('\n📊 Monitor deployment at:');
    console.log(
      `   https://vercel.com/${VERCEL_TEAM_ID}/fix2-gpql/deployments/${deployment.id}`
    );
    console.log('\n⏱️  Deployment typically takes 2-5 minutes');
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  }
}

async function getEnvironmentVariables() {
  const url = `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/env?teamId=${VERCEL_TEAM_ID}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${VERCELACESSTOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get env vars: ${response.status} ${error}`);
  }

  const data = await response.json();
  return data.envs || [];
}

async function deleteEnvironmentVariable(varId) {
  const url = `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/env/${varId}?teamId=${VERCEL_TEAM_ID}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${VERCELACESSTOKEN}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to delete env var: ${response.status} ${error}`);
  }

  return response.json();
}

async function createEnvironmentVariable(envVar) {
  const url = `https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}/env?teamId=${VERCEL_TEAM_ID}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VERCELACESSTOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: envVar.key,
      value: envVar.value,
      target: envVar.target,
      type: envVar.type,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create env var: ${response.status} ${error}`);
  }

  return response.json();
}

async function triggerDeployment() {
  const url = `https://api.vercel.com/v13/deployments?teamId=${VERCEL_TEAM_ID}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VERCELACESSTOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'fix2-gpql',
      project: VERCEL_PROJECT_ID,
      target: 'production',
      gitSource: {
        type: 'github',
        ref: 'main',
        repoId: 'elevateforhumanity/fix2',
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(
      `Failed to trigger deployment: ${response.status} ${error}`
    );
  }

  return response.json();
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
