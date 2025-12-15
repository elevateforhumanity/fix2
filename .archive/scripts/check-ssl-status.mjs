import https from 'https';

const token = 'YNJJXounybj4YMwxin3JjVTL';
const domain = 'elevateforhumanityeducation.com';

const options = {
  hostname: 'api.vercel.com',
  path: `/v4/domains/${domain}/config`,
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

console.log(`🔍 Checking SSL for ${domain}...\n`);

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      console.log('SSL Status:', JSON.stringify(result, null, 2));
    } catch (e) {
      console.log('Response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Error:', e.message);
});

req.end();
