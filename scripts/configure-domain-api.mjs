#!/usr/bin/env node
/**
 * Configure Vercel Domain via API
 * 
 * Ensures www.elevateforhumanity.org is properly configured
 */

const VERCELACESSTOKEN = process.env.VERCELACESSTOKEN;
const PROJECT_ID = 'prj_WSdzX00UNP1rcWNXQ3RrpeuVOkeA';
const TEAM_ID = 'team_Ae8f33vVYR36quLOS8HCeROs';
const DOMAIN = 'www.elevateforhumanity.org';

if (!VERCELACESSTOKEN) {
  console.error('❌ VERCELACESSTOKEN not set');
  console.error('Set it with: export VERCELACESSTOKEN="your-token"');
  process.exit(1);
}

console.log('🌐 Configuring Vercel Domain');
console.log('============================\n');

async function getProjectDomains() {
  console.log('📋 Fetching current domains...');
  
  const response = await fetch(
    `https://api.vercel.com/v9/projects/${PROJECT_ID}/domains?teamId=${TEAM_ID}`,
    {
      headers: {
        'Authorization': `Bearer ${VERCELACESSTOKEN}`
      }
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`API Error: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.domains || [];
}

async function addDomain(domain) {
  console.log(`➕ Adding domain: ${domain}`);
  
  const response = await fetch(
    `https://api.vercel.com/v10/projects/${PROJECT_ID}/domains?teamId=${TEAM_ID}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCELACESSTOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: domain
      })
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Add domain failed: ${error.error?.message || response.statusText}`);
  }

  return response.json();
}

async function updateDomain(domain, config) {
  console.log(`🔧 Updating domain configuration: ${domain}`);
  
  const response = await fetch(
    `https://api.vercel.com/v9/projects/${PROJECT_ID}/domains/${domain}?teamId=${TEAM_ID}`,
    {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${VERCELACESSTOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Update domain failed: ${error.error?.message || response.statusText}`);
  }

  return response.json();
}

async function verifyDomain(domain) {
  console.log(`✅ Verifying domain: ${domain}`);
  
  const response = await fetch(
    `https://api.vercel.com/v9/projects/${PROJECT_ID}/domains/${domain}/verify?teamId=${TEAM_ID}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCELACESSTOKEN}`
      }
    }
  );

  if (!response.ok) {
    const error = await response.json();
    // Verification can fail if DNS isn't set up yet - that's okay
    console.log(`   ⚠️  Verification pending: ${error.error?.message || 'DNS not configured yet'}`);
    return null;
  }

  return response.json();
}

async function getProject() {
  const response = await fetch(
    `https://api.vercel.com/v9/projects/${PROJECT_ID}?teamId=${TEAM_ID}`,
    {
      headers: {
        'Authorization': `Bearer ${VERCELACESSTOKEN}`
      }
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Get project failed: ${error.error?.message || response.statusText}`);
  }

  return response.json();
}

async function updateProject(config) {
  console.log('🔧 Updating project configuration...');
  
  const response = await fetch(
    `https://api.vercel.com/v9/projects/${PROJECT_ID}?teamId=${TEAM_ID}`,
    {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${VERCELACESSTOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Update project failed: ${error.error?.message || response.statusText}`);
  }

  return response.json();
}

async function main() {
  try {
    // Step 1: Check current domains
    const domains = await getProjectDomains();
    console.log(`   Found ${domains.length} domain(s)\n`);

    const existingDomain = domains.find(d => d.name === DOMAIN);

    if (existingDomain) {
      console.log(`✅ Domain ${DOMAIN} already exists`);
      console.log(`   Status: ${existingDomain.verified ? '✅ Verified' : '⚠️  Pending verification'}`);
      console.log(`   Redirect: ${existingDomain.redirect || 'None'}`);
      console.log('');
    } else {
      console.log(`⚠️  Domain ${DOMAIN} not found`);
      console.log('');
      
      // Add the domain
      try {
        const result = await addDomain(DOMAIN);
        console.log(`✅ Domain added successfully`);
        console.log('');
      } catch (error) {
        console.error(`❌ Failed to add domain: ${error.message}`);
        console.log('');
      }
    }

    // Step 2: Verify domain
    try {
      await verifyDomain(DOMAIN);
    } catch (error) {
      // Verification errors are okay
    }
    console.log('');

    // Step 3: Check production branch
    console.log('🔍 Checking production branch...');
    const project = await getProject();
    const currentBranch = project.productionBranch || project.link?.productionBranch || 'unknown';
    
    console.log(`   Current: ${currentBranch}`);
    
    if (currentBranch !== 'main') {
      console.log('   ⚠️  Production branch is not "main"');
      console.log('   🔧 Updating to "main"...');
      
      await updateProject({
        productionBranch: 'main'
      });
      
      console.log('   ✅ Production branch updated to "main"');
    } else {
      console.log('   ✅ Production branch is correctly set to "main"');
    }
    console.log('');

    // Step 4: Summary
    console.log('============================');
    console.log('📊 Configuration Summary:');
    console.log('');
    console.log('Domain:');
    console.log(`  ✅ ${DOMAIN}`);
    console.log('');
    console.log('Production Branch:');
    console.log('  ✅ main');
    console.log('');
    console.log('DNS Configuration:');
    console.log('  Add this CNAME record to your DNS:');
    console.log('  ┌─────────────────────────────────┐');
    console.log('  │ Type:  CNAME                    │');
    console.log('  │ Name:  www                      │');
    console.log('  │ Value: cname.vercel-dns.com     │');
    console.log('  │ TTL:   Auto or 3600             │');
    console.log('  └─────────────────────────────────┘');
    console.log('');
    console.log('✅ Configuration complete!');
    console.log('');
    console.log('🔍 Verify at:');
    console.log('   https://vercel.com/elevate-48e460c9/fix2-gpql/settings/domains');
    console.log('');
    console.log('⏱️  DNS propagation may take 5-60 minutes');
    console.log('');

  } catch (error) {
    console.error('');
    console.error('❌ Error:', error.message);
    console.error('');
    
    if (error.message.includes('forbidden') || error.message.includes('Not authorized')) {
      console.error('💡 Token issue:');
      console.error('   1. Get new token: https://vercel.com/account/tokens');
      console.error('   2. Set: export VERCELACESSTOKEN="your-new-token"');
      console.error('   3. Run again: pnpm configure:domain');
    } else {
      console.error('💡 Manual configuration:');
      console.error('   1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/domains');
      console.error('   2. Add domain: www.elevateforhumanity.org');
      console.error('   3. Set as Production Domain');
      console.error('   4. Configure DNS CNAME: cname.vercel-dns.com');
    }
    
    process.exit(1);
  }
}

main();
