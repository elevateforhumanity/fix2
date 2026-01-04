const VERCEL_TOKEN = 'g3xnZCxstfcmPU4T0wad9fEp';
const PROJECT_ID = 'prj_mqHr6z23gRSqM5In6bLXtEo9cMGI';
const TEAM_ID = 'team_MrVTNV6aoxL54Bw6ZP6MFviT';

const correctDatabaseUrl = 'postgresql://postgres.cuxzzpsyufcewtmicszk:kingGreene08%24%24%24@aws-0-us-east-1.pooler.supabase.com:6543/postgres';

console.log('🔧 Updating Vercel DATABASE_URL...\n');

try {
  // First, get existing env vars to find DATABASE_URL ID
  console.log('📋 Fetching existing environment variables...');
  const listResponse = await fetch(
    `https://api.vercel.com/v9/projects/${PROJECT_ID}/env?teamId=${TEAM_ID}`,
    {
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
      }
    }
  );

  if (!listResponse.ok) {
    throw new Error(`Failed to list env vars: ${await listResponse.text()}`);
  }

  const { envs } = await listResponse.json();
  const databaseUrlEnvs = envs.filter(env => env.key === 'DATABASE_URL');

  console.log(`Found ${databaseUrlEnvs.length} DATABASE_URL entries\n`);

  // Delete existing DATABASE_URL entries
  for (const env of databaseUrlEnvs) {
    console.log(`🗑️  Deleting old DATABASE_URL (${env.target.join(', ')})...`);
    const deleteResponse = await fetch(
      `https://api.vercel.com/v9/projects/${PROJECT_ID}/env/${env.id}?teamId=${TEAM_ID}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${VERCEL_TOKEN}`,
        }
      }
    );

    if (deleteResponse.ok) {
      console.log('  ✅ Deleted\n');
    } else {
      console.log(`  ⚠️  Failed: ${await deleteResponse.text()}\n`);
    }
  }

  // Create new DATABASE_URL for all environments
  console.log('📝 Creating new DATABASE_URL for all environments...');
  const createResponse = await fetch(
    `https://api.vercel.com/v10/projects/${PROJECT_ID}/env?teamId=${TEAM_ID}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: 'DATABASE_URL',
        value: correctDatabaseUrl,
        type: 'encrypted',
        target: ['production', 'preview', 'development']
      })
    }
  );

  if (!createResponse.ok) {
    const error = await createResponse.text();
    throw new Error(`Failed to create env var: ${error}`);
  }

  const result = await createResponse.json();
  console.log('✅ DATABASE_URL created successfully!\n');
  console.log('Targets:', result.target.join(', '));
  console.log('Type:', result.type);
  console.log('');

  console.log('🎉 SUCCESS! DATABASE_URL updated for all environments\n');
  console.log('🚀 Now triggering redeploy...\n');

  // Trigger a redeploy by creating a deployment
  const deployResponse = await fetch(
    `https://api.vercel.com/v13/deployments?teamId=${TEAM_ID}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'fix2',
        project: PROJECT_ID,
        target: 'production',
        gitSource: {
          type: 'github',
          ref: 'main',
          repoId: 'elevateforhumanity/fix2'
        }
      })
    }
  );

  if (deployResponse.ok) {
    const deployment = await deployResponse.json();
    console.log('✅ Deployment triggered!');
    console.log(`🔗 URL: https://vercel.com/elevateforhumanitys-projects/fix2/${deployment.id}`);
    console.log('');
  } else {
    console.log('⚠️  Could not trigger automatic deployment');
    console.log('Please redeploy manually at: https://vercel.com/elevateforhumanitys-projects/fix2\n');
  }

  console.log('🎊 ALL DONE! System will be live in ~2 minutes\n');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
