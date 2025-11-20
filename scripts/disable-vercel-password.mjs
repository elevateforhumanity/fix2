#!/usr/bin/env node

/**
 * Disable Vercel Password Protection
 * Makes the site publicly accessible
 */

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID =
  process.env.VERCEL_PROJECT_ID || 'prj_I89m6xUtwJlmA3qSE8Su7jIF7Xg7';
const VERCEL_TEAM_ID =
  process.env.VERCEL_TEAM_ID || 'team_Xj2yJdLklcMExBxDPK7I2G4w';

async function main() {
  console.log('🔓 Disabling Vercel Password Protection');
  console.log('========================================\n');

  if (!VERCEL_TOKEN) {
    console.error('❌ VERCEL_TOKEN environment variable is required');
    process.exit(1);
  }

  try {
    // Update project settings to disable password protection
    console.log('📝 Updating project settings...');

    const url = `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}?teamId=${VERCEL_TEAM_ID}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        passwordProtection: null,
        ssoProtection: null,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to update project: ${response.status} ${error}`);
    }

    const data = await response.json();
    console.log('✅ Password protection disabled');
    console.log(`   Project: ${data.name}`);
    console.log('');

    // Trigger a new deployment to apply changes
    console.log('🚀 Triggering fresh deployment...');
    const deployUrl = `https://api.vercel.com/v13/deployments?teamId=${VERCEL_TEAM_ID}`;
    const deployResponse = await fetch(deployUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
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

    if (!deployResponse.ok) {
      const error = await deployResponse.text();
      throw new Error(
        `Failed to trigger deployment: ${deployResponse.status} ${error}`
      );
    }

    const deployment = await deployResponse.json();
    console.log('✅ Deployment triggered');
    console.log(`   Deployment ID: ${deployment.id}`);
    console.log(`   URL: https://${deployment.url}`);
    console.log('');

    console.log('✅ SUCCESS!');
    console.log('\n🌐 Site will be publicly accessible in 2-5 minutes');
    console.log(
      '📊 Monitor: https://vercel.com/elevate-48e460c9/fix2-gpql/deployments'
    );
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  }
}

main();
