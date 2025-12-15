import https from 'https';

const token = 'YNJJXounybj4YMwxin3JjVTL';
const projectId = 'prj_S1qaRjgCpbvMkUuV2gob3ACLn8YO';
const domain = 'elevateforhumanityeducation.com';

console.log('🔍 VERCEL API FULL DIAGNOSTIC');
console.log('================================\n');

// Helper function to make API requests
function apiRequest(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.end();
  });
}

// 1. Check Project Details
console.log('1️⃣ PROJECT DETAILS');
console.log('-------------------');
try {
  const project = await apiRequest(`/v9/projects/${projectId}`);
  console.log('Status:', project.status);
  console.log('Project Name:', project.data.name);
  console.log('Framework:', project.data.framework);
  console.log('Build Command:', project.data.buildCommand);
  console.log('');
} catch (e) {
  console.log('Error:', e.message);
  console.log('');
}

// 2. List All Domains
console.log('2️⃣ ALL DOMAINS');
console.log('---------------');
try {
  const domains = await apiRequest(`/v9/projects/${projectId}/domains`);
  console.log('Status:', domains.status);
  if (domains.data.domains) {
    domains.data.domains.forEach(d => {
      console.log(`\nDomain: ${d.name}`);
      console.log(`  Verified: ${d.verified}`);
      console.log(`  Created: ${new Date(d.createdAt).toLocaleString()}`);
      console.log(`  Updated: ${new Date(d.updatedAt).toLocaleString()}`);
      console.log(`  Git Branch: ${d.gitBranch || 'N/A'}`);
      console.log(`  Redirect: ${d.redirect || 'N/A'}`);
      console.log(`  Redirect Status: ${d.redirectStatusCode || 'N/A'}`);
    });
  }
  console.log('');
} catch (e) {
  console.log('Error:', e.message);
  console.log('');
}

// 3. Check Specific Domain Config
console.log('3️⃣ DOMAIN CONFIGURATION');
console.log('------------------------');
try {
  const config = await apiRequest(`/v6/domains/${domain}/config`);
  console.log('Status:', config.status);
  console.log('Response:', JSON.stringify(config.data, null, 2));
  console.log('');
} catch (e) {
  console.log('Error:', e.message);
  console.log('');
}

// 4. Check Domain Records
console.log('4️⃣ DOMAIN DNS RECORDS');
console.log('----------------------');
try {
  const records = await apiRequest(`/v4/domains/${domain}/records`);
  console.log('Status:', records.status);
  if (records.data.records) {
    records.data.records.forEach(r => {
      console.log(`\nType: ${r.type}`);
      console.log(`  Name: ${r.name}`);
      console.log(`  Value: ${r.value}`);
      console.log(`  TTL: ${r.ttl}`);
    });
  } else {
    console.log('Response:', JSON.stringify(records.data, null, 2));
  }
  console.log('');
} catch (e) {
  console.log('Error:', e.message);
  console.log('');
}

// 5. Check Latest Deployment
console.log('5️⃣ LATEST DEPLOYMENT');
console.log('---------------------');
try {
  const deployments = await apiRequest(`/v6/deployments?projectId=${projectId}&limit=1`);
  console.log('Status:', deployments.status);
  if (deployments.data.deployments && deployments.data.deployments[0]) {
    const latest = deployments.data.deployments[0];
    console.log('Deployment ID:', latest.uid);
    console.log('State:', latest.state);
    console.log('Ready State:', latest.readyState);
    console.log('URL:', latest.url);
    console.log('Created:', new Date(latest.created).toLocaleString());
    console.log('Alias:', latest.alias || 'N/A');
  }
  console.log('');
} catch (e) {
  console.log('Error:', e.message);
  console.log('');
}

// 6. Check Domain Verification
console.log('6️⃣ DOMAIN VERIFICATION');
console.log('-----------------------');
try {
  const verify = await apiRequest(`/v9/projects/${projectId}/domains/${domain}`);
  console.log('Status:', verify.status);
  console.log('Response:', JSON.stringify(verify.data, null, 2));
  console.log('');
} catch (e) {
  console.log('Error:', e.message);
  console.log('');
}

// 7. Check SSL Certificate
console.log('7️⃣ SSL CERTIFICATE STATUS');
console.log('--------------------------');
try {
  const cert = await apiRequest(`/v3/now/certs?domain=${domain}`);
  console.log('Status:', cert.status);
  console.log('Response:', JSON.stringify(cert.data, null, 2));
  console.log('');
} catch (e) {
  console.log('Error:', e.message);
  console.log('');
}

// 8. Check Aliases
console.log('8️⃣ DEPLOYMENT ALIASES');
console.log('----------------------');
try {
  const aliases = await apiRequest(`/v2/now/aliases?projectId=${projectId}`);
  console.log('Status:', aliases.status);
  if (aliases.data.aliases) {
    const lmsAliases = aliases.data.aliases.filter(a => a.alias.includes('elevateforhumanityeducation'));
    console.log(`Found ${lmsAliases.length} aliases for LMS domain`);
    lmsAliases.forEach(a => {
      console.log(`\nAlias: ${a.alias}`);
      console.log(`  Deployment: ${a.deploymentId}`);
      console.log(`  Created: ${new Date(a.created).toLocaleString()}`);
    });
  }
  console.log('');
} catch (e) {
  console.log('Error:', e.message);
  console.log('');
}

console.log('================================');
console.log('✅ DIAGNOSTIC COMPLETE');
console.log('================================');
