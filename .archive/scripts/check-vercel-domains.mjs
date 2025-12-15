import https from 'https';

const token = 'YNJJXounybj4YMwxin3JjVTL';
const projectId = 'prj_S1qaRjgCpbvMkUuV2gob3ACLn8YO';

const options = {
  hostname: 'api.vercel.com',
  path: `/v9/projects/${projectId}/domains`,
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

console.log('🔍 Checking Vercel domains...\n');

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      
      if (result.domains) {
        console.log(`✅ Found ${result.domains.length} domains:\n`);
        result.domains.forEach(domain => {
          console.log(`Domain: ${domain.name}`);
          console.log(`  Verified: ${domain.verified}`);
          console.log(`  SSL: ${domain.sslEnabled ? 'Enabled' : 'Disabled'}`);
          console.log('');
        });
      } else {
        console.log('❌ Error:', result);
      }
    } catch (e) {
      console.log('❌ Parse error:', e.message);
      console.log('Response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Request error:', e.message);
});

req.end();
