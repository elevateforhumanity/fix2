import https from 'https';

const token = 'YNJJXounybj4YMwxin3JjVTL';
const projectId = 'prj_S1qaRjgCpbvMkUuV2gob3ACLn8YO';

const options = {
  hostname: 'api.vercel.com',
  path: `/v9/projects/${projectId}/domains`,
  method: 'GET',
  headers: { 'Authorization': `Bearer ${token}` }
};

console.log('Checking Vercel domain configuration...\n');

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const result = JSON.parse(data);
    const mainDomain = result.domains?.find(d => d.name === 'www.elevateforhumanity.org');
    const rootDomain = result.domains?.find(d => d.name === 'elevateforhumanity.org');
    
    console.log('www.elevateforhumanity.org:');
    console.log('  Verified:', mainDomain?.verified);
    console.log('  Created:', new Date(mainDomain?.createdAt).toLocaleString());
    console.log('');
    
    console.log('elevateforhumanity.org:');
    console.log('  Verified:', rootDomain?.verified);
    console.log('  Created:', new Date(rootDomain?.createdAt).toLocaleString());
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.end();
