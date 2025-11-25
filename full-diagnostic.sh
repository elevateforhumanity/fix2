#!/bin/bash

echo "🔍 FULL LMS DOMAIN DIAGNOSTIC"
echo "================================"
echo ""

# 1. DNS Resolution
echo "1️⃣ DNS RESOLUTION CHECK"
echo "------------------------"
getent hosts elevateforhumanityeducation.com
echo "Expected: Should resolve to Vercel IP"
echo ""

# 2. DNS A Record
echo "2️⃣ DNS A RECORD"
echo "----------------"
host -t A elevateforhumanityeducation.com 2>/dev/null || echo "host command not available"
echo ""

# 3. SSL Certificate Check
echo "3️⃣ SSL CERTIFICATE CHECK"
echo "-------------------------"
timeout 10 openssl s_client -connect elevateforhumanityeducation.com:443 -servername elevateforhumanityeducation.com </dev/null 2>/dev/null | grep -E "subject=|issuer=|Verify return code" | head -5
echo ""

# 4. HTTP Response Headers
echo "4️⃣ HTTP RESPONSE HEADERS"
echo "-------------------------"
timeout 15 curl -I -v https://elevateforhumanityeducation.com 2>&1 | grep -E "HTTP/|Server:|X-Vercel|Location:" | head -10
echo ""

# 5. Compare with working domain
echo "5️⃣ WORKING DOMAIN (www.elevateforhumanity.org)"
echo "------------------------------------------------"
timeout 10 curl -I https://www.elevateforhumanity.org 2>&1 | grep -E "HTTP/|Server:|X-Vercel" | head -5
echo ""

# 6. Check Vercel API domain status
echo "6️⃣ VERCEL API DOMAIN STATUS"
echo "----------------------------"
node << 'NODESCRIPT'
const https = require('https');
const token = 'YNJJXounybj4YMwxin3JjVTL';
const projectId = 'prj_S1qaRjgCpbvMkUuV2gob3ACLn8YO';

const options = {
  hostname: 'api.vercel.com',
  path: `/v9/projects/${projectId}/domains`,
  method: 'GET',
  headers: { 'Authorization': `Bearer ${token}` }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      const lmsDomain = result.domains?.find(d => d.name === 'elevateforhumanityeducation.com');
      if (lmsDomain) {
        console.log('Domain:', lmsDomain.name);
        console.log('Verified:', lmsDomain.verified);
        console.log('SSL Enabled:', lmsDomain.sslEnabled);
        console.log('Created:', new Date(lmsDomain.createdAt).toLocaleString());
      } else {
        console.log('Domain not found in API response');
      }
    } catch (e) {
      console.log('Error:', e.message);
    }
  });
});
req.on('error', (e) => console.error('Error:', e.message));
req.end();
NODESCRIPT
echo ""

# 7. Check middleware configuration
echo "7️⃣ MIDDLEWARE CONFIGURATION"
echo "----------------------------"
grep -A 10 "elevateforhumanityeducation" middleware.ts | head -15
echo ""

# 8. Check if main domain works
echo "8️⃣ MAIN DOMAIN /lms PATH"
echo "-------------------------"
timeout 10 curl -I https://www.elevateforhumanity.org/lms 2>&1 | grep -E "HTTP/|Location:" | head -3
echo ""

# 9. Traceroute to domain
echo "9️⃣ NETWORK PATH TO DOMAIN"
echo "--------------------------"
timeout 10 traceroute -m 5 elevateforhumanityeducation.com 2>&1 | head -10 || echo "traceroute not available"
echo ""

# 10. Check if it's a timeout or connection refused
echo "🔟 CONNECTION TEST"
echo "------------------"
timeout 5 nc -zv elevateforhumanityeducation.com 443 2>&1
echo ""

echo "================================"
echo "✅ DIAGNOSTIC COMPLETE"
echo "================================"
