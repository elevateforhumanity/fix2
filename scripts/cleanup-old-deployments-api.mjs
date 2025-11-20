#!/usr/bin/env node
/**
 * Cleanup Old Vercel Deployments via API
 *
 * Deletes all deployments except the latest one
 */

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const PROJECT_ID = 'prj_WSdzX00UNP1rcWNXQ3RrpeuVOkeA';
const TEAM_ID = 'team_Ae8f33vVYR36quLOS8HCeROs';
const KEEP_LATEST = 1; // Keep only the latest deployment

if (!VERCEL_TOKEN) {
  console.error('❌ VERCEL_TOKEN not set');
  console.error('Set it with: export VERCEL_TOKEN="your-token"');
  process.exit(1);
}

console.log('🧹 Cleaning Up Old Vercel Deployments');
console.log('=====================================\n');

async function fetchDeployments() {
  console.log('📋 Fetching deployments...');

  const response = await fetch(
    `https://api.vercel.com/v6/deployments?projectId=${PROJECT_ID}&teamId=${TEAM_ID}&limit=100`,
    {
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `API Error: ${error.error?.message || response.statusText}`
    );
  }

  const data = await response.json();
  return data.deployments || [];
}

async function deleteDeployment(deploymentId) {
  const response = await fetch(
    `https://api.vercel.com/v13/deployments/${deploymentId}?teamId=${TEAM_ID}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Delete failed: ${error.error?.message || response.statusText}`
    );
  }

  return response.json();
}

async function main() {
  try {
    // Fetch all deployments
    const deployments = await fetchDeployments();

    if (deployments.length === 0) {
      console.log('ℹ️  No deployments found');
      return;
    }

    console.log(`   Found ${deployments.length} total deployments\n`);

    // Sort by created date (newest first)
    deployments.sort((a, b) => b.created - a.created);

    // Keep the latest N deployments
    const toKeep = deployments.slice(0, KEEP_LATEST);
    const toDelete = deployments.slice(KEEP_LATEST);

    console.log('📊 Deployment Plan:');
    console.log(`   Keep:   ${toKeep.length} deployment(s)`);
    console.log(`   Delete: ${toDelete.length} deployment(s)\n`);

    if (toDelete.length === 0) {
      console.log('✅ No old deployments to clean up');
      return;
    }

    // Show what we're keeping
    console.log('✅ Keeping:');
    for (const dep of toKeep) {
      const date = new Date(dep.created).toLocaleString();
      const branch = dep.meta?.githubCommitRef || 'unknown';
      const commit = dep.meta?.githubCommitSha?.substring(0, 7) || 'unknown';
      console.log(`   - ${dep.uid} (${branch}@${commit}) - ${date}`);
    }
    console.log('');

    // Delete old deployments
    console.log('🗑️  Deleting old deployments:');
    let deleted = 0;
    let failed = 0;

    for (let i = 0; i < toDelete.length; i++) {
      const dep = toDelete[i];
      const date = new Date(dep.created).toLocaleString();
      const branch = dep.meta?.githubCommitRef || 'unknown';

      process.stdout.write(
        `   [${i + 1}/${toDelete.length}] ${dep.uid} (${branch}) - ${date}... `
      );

      try {
        await deleteDeployment(dep.uid);
        console.log('✅');
        deleted++;
      } catch (error) {
        console.log(`❌ ${error.message}`);
        failed++;
      }

      // Rate limiting - wait 100ms between requests
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log('');
    console.log('=====================================');
    console.log('📊 Cleanup Summary:');
    console.log(`   ✅ Deleted: ${deleted}`);
    console.log(`   ❌ Failed:  ${failed}`);
    console.log(`   📦 Kept:    ${toKeep.length}`);
    console.log('');
    console.log('✅ Cleanup complete!');
    console.log('');
    console.log('🔍 Verify at:');
    console.log('   https://vercel.com/elevate-48e460c9/fix2-gpql/deployments');
    console.log('');
  } catch (error) {
    console.error('');
    console.error('❌ Error:', error.message);
    console.error('');

    if (
      error.message.includes('forbidden') ||
      error.message.includes('Not authorized')
    ) {
      console.error('💡 Token issue:');
      console.error('   1. Get new token: https://vercel.com/account/tokens');
      console.error('   2. Set: export VERCEL_TOKEN="your-new-token"');
      console.error('   3. Run again: pnpm cleanup:deployments-api');
    }

    process.exit(1);
  }
}

main();
