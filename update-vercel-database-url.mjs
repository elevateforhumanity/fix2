import { execSync } from 'child_process';

const projectId = 'prj_mqHr6z23gRSqM5In6bLXtEo9cMGI';
const teamId = 'team_MrVTNV6aoxL54Bw6ZP6MFviT';

// The correct DATABASE_URL with pooler and URL-encoded password
const correctDatabaseUrl = 'postgresql://postgres.cuxzzpsyufcewtmicszk:kingGreene08%24%24%24@aws-0-us-east-1.pooler.supabase.com:6543/postgres';

console.log('🔧 Updating Vercel DATABASE_URL...\n');

try {
  // Try to get Vercel token from environment or auth
  let token = process.env.VERCEL_TOKEN;
  
  if (!token) {
    console.log('📋 Checking for Vercel authentication...');
    try {
      const authConfig = execSync('cat ~/.config/vercel/auth.json 2>/dev/null || echo ""', { encoding: 'utf8' });
      if (authConfig) {
        const auth = JSON.parse(authConfig);
        token = auth.token;
      }
    } catch (e) {
      console.log('⚠️  No Vercel token found in config');
    }
  }
  
  if (!token) {
    console.log('\n❌ No Vercel token available');
    console.log('\n📋 Manual Update Required:');
    console.log('Go to: https://vercel.com/elevateforhumanitys-projects/fix2/settings/environment-variables');
    console.log('\nUpdate DATABASE_URL to:');
    console.log(correctDatabaseUrl);
    console.log('\nSet for: Production, Preview, Development\n');
    process.exit(1);
  }
  
  console.log('✅ Found Vercel token\n');
  
  // Update DATABASE_URL for all environments
  const environments = ['production', 'preview', 'development'];
  
  for (const env of environments) {
    console.log(`📝 Updating ${env}...`);
    
    const response = await fetch(`https://api.vercel.com/v10/projects/${projectId}/env`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: 'DATABASE_URL',
        value: correctDatabaseUrl,
        type: 'encrypted',
        target: [env]
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.log(`  ⚠️  ${env}: ${error}`);
    } else {
      console.log(`  ✅ ${env} updated`);
    }
  }
  
  console.log('\n🎉 DATABASE_URL updated successfully!\n');
  console.log('🚀 Now redeploy at: https://vercel.com/elevateforhumanitys-projects/fix2\n');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\n📋 Manual Update Required:');
  console.log('Go to: https://vercel.com/elevateforhumanitys-projects/fix2/settings/environment-variables');
  console.log('\nUpdate DATABASE_URL to:');
  console.log(correctDatabaseUrl);
  console.log('\nSet for: Production, Preview, Development\n');
}
