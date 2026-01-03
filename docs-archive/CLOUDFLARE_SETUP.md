# Cloudflare Configuration

## Status: ✅ CONFIGURED

Cloudflare is integrated for CDN, security, and performance optimization.

---

## Environment Variables Required

Add these to your `.env.local` and Vercel:

```bash
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token
```

---

## Configuration Files

### 1. Security Headers

**File**: `public/_headers`

Configured headers:

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Content-Security-Policy
- Cache-Control for static assets

### 2. DNS Configuration

**Domain**: www.elevateforhumanity.org

**DNS Records** (Configure in Cloudflare Dashboard):

```
Type    Name    Content                     Proxy Status
A       @       76.76.21.21 (Vercel)       Proxied (Orange Cloud)
CNAME   www     cname.vercel-dns.com       Proxied (Orange Cloud)
```

### 3. SSL/TLS Settings

**Mode**: Full (strict)

- Encrypts traffic between Cloudflare and origin server
- Validates SSL certificate

### 4. Page Rules

**Rule 1**: Force HTTPS

```
URL: http://*elevateforhumanity.org/*
Setting: Always Use HTTPS
```

**Rule 2**: WWW Redirect

```
URL: elevateforhumanity.org/*
Forwarding URL: 301 Redirect to https://www.elevateforhumanity.org/$1
```

---

## Cloudflare Features Enabled

### Performance

- ✅ Auto Minify (HTML, CSS, JS)
- ✅ Brotli Compression
- ✅ HTTP/2 & HTTP/3
- ✅ Early Hints
- ✅ Rocket Loader (optional)

### Security

- ✅ WAF (Web Application Firewall)
- ✅ DDoS Protection
- ✅ Bot Fight Mode
- ✅ Security Level: Medium
- ✅ Challenge Passage: 30 minutes

### Caching

- ✅ Browser Cache TTL: 4 hours
- ✅ Caching Level: Standard
- ✅ Always Online: Enabled

### Speed

- ✅ Argo Smart Routing (optional, paid)
- ✅ Image Optimization (Polish)
- ✅ Mirage (lazy loading)

---

## Cache Rules

### Static Assets (Long Cache)

```
/images/*       → Cache for 1 year
/videos/*       → Cache for 1 year
/_next/static/* → Cache for 1 year
```

### Dynamic Content (No Cache)

```
/api/*          → Bypass cache
/admin/*        → Bypass cache
/dashboard/*    → Bypass cache
```

### HTML Pages (Short Cache)

```
/*.html         → Cache for 0 seconds (always revalidate)
/               → Cache for 5 minutes
```

---

## Cloudflare Workers (Optional)

If using Cloudflare Workers for edge functions:

**File**: `_worker.js` (not currently implemented)

```javascript
export default {
  async fetch(request, env) {
    // Custom edge logic here
    return fetch(request);
  },
};
```

---

## Verification

### Check Cloudflare is Active

```bash
# Check if site is behind Cloudflare
curl -I https://www.elevateforhumanity.org | grep -i "cf-ray\|cloudflare"

# Expected output:
# cf-ray: xxxxx-ORD
# server: cloudflare
```

### Check Headers

```bash
curl -I https://www.elevateforhumanity.org

# Should see:
# x-frame-options: DENY
# x-content-type-options: nosniff
# cf-cache-status: HIT (or MISS, DYNAMIC)
```

### Check SSL

```bash
# Verify SSL certificate
openssl s_client -connect www.elevateforhumanity.org:443 -servername www.elevateforhumanity.org

# Should show Cloudflare certificate
```

---

## Analytics

### Cloudflare Analytics Dashboard

- Page views
- Bandwidth usage
- Threats blocked
- Cache hit ratio
- Top countries/pages

### Integration with Google Analytics

Both Cloudflare and Google Analytics are active:

- Cloudflare: Server-side metrics
- Google Analytics: Client-side behavior

---

## Troubleshooting

### Issue: Site not loading

1. Check Cloudflare status page
2. Verify DNS records are proxied (orange cloud)
3. Check SSL/TLS mode is "Full (strict)"

### Issue: Cache not working

1. Verify cache rules in Cloudflare dashboard
2. Check `_headers` file is deployed
3. Purge cache manually if needed

### Issue: Redirect loops

1. Ensure only ONE redirect rule (Cloudflare OR Vercel, not both)
2. Check SSL/TLS mode
3. Verify origin server is using HTTPS

---

## Maintenance

### Purge Cache

When deploying updates:

1. Go to Cloudflare Dashboard
2. Caching → Configuration
3. Click "Purge Everything"

Or use API:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

### Update Security Rules

1. Go to Security → WAF
2. Add custom rules as needed
3. Monitor Security Events

---

## Cost

### Free Plan Includes

- Unlimited bandwidth
- DDoS protection
- SSL certificate
- CDN
- Basic WAF
- Analytics

### Paid Features (Optional)

- Argo Smart Routing: $5/month + $0.10/GB
- Load Balancing: $5/month
- Advanced DDoS: $200/month
- Rate Limiting: $5/month

---

## Status Summary

✅ **DNS**: Configured and proxied  
✅ **SSL**: Full (strict) mode  
✅ **Headers**: Security headers active  
✅ **Cache**: Rules configured  
✅ **CDN**: Global distribution  
✅ **Security**: WAF and DDoS protection  
✅ **Performance**: Optimizations enabled

**Last Updated**: January 1, 2026
