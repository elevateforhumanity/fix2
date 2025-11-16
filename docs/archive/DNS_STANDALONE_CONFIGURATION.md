# DNS STANDALONE CONFIGURATION

**Purpose:** Configure EFH to run completely standalone without Durable.co
**Status:** Ready to implement

---

## 🎯 CURRENT STATE

### Primary Domain:

- **Production:** `elevateforhumanity.org`
- **Netlify:** `elevateproduction.netlify.app`
- **Supabase:** `cuxzzpsyufcewtmicszk.supabase.co`

### Current DNS Setup:

```
elevateforhumanity.org → Needs DNS configuration
├── www.elevateforhumanity.org → Should redirect to apex
├── api.elevateforhumanity.org → Supabase (optional)
└── admin.elevateforhumanity.org → Admin portal (optional)
```

---

## 🌐 RECOMMENDED DNS CONFIGURATION

### 1. Apex Domain (elevateforhumanity.org)

#### Option A: Point to Netlify (RECOMMENDED)

```
Type: A
Name: @
Value: 75.2.60.5 (Netlify Load Balancer)

Type: AAAA
Name: @
Value: 2600:1f18:2148:bc00:e87f:535d:9c1:b5c (Netlify IPv6)
```

#### Option B: Use CNAME (if registrar supports ANAME/ALIAS)

```
Type: ANAME/ALIAS
Name: @
Value: elevateproduction.netlify.app
```

### 2. WWW Subdomain

```
Type: CNAME
Name: www
Value: elevateproduction.netlify.app
```

### 3. API Subdomain (Optional - for Supabase)

```
Type: CNAME
Name: api
Value: cuxzzpsyufcewtmicszk.supabase.co
```

### 4. Admin Subdomain (Optional)

```
Type: CNAME
Name: admin
Value: elevateproduction.netlify.app
```

---

## 📋 NETLIFY CONFIGURATION

### Step 1: Add Custom Domain in Netlify Dashboard

1. Go to: https://app.netlify.com/sites/elevateproduction/settings/domain
2. Click "Add custom domain"
3. Enter: `elevateforhumanity.org`
4. Click "Verify"
5. Add domain

### Step 2: Configure Domain Settings

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20.19.0"

# Custom domain configuration
[[redirects]]
  from = "https://www.elevateforhumanity.org/*"
  to = "https://elevateforhumanity.org/:splat"
  status = 301
  force = true

[[redirects]]
  from = "https://elevateproduction.netlify.app/*"
  to = "https://elevateforhumanity.org/:splat"
  status = 301
  force = true

# SPA fallback
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Security headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
```

### Step 3: Enable HTTPS

Netlify automatically provisions SSL certificates via Let's Encrypt.

- ✅ Automatic SSL
- ✅ Auto-renewal
- ✅ Force HTTPS

---

## 🔧 ENVIRONMENT VARIABLES

### Update .env.example:

```bash
# Production URLs
PUBLIC_SITE_URL=https://elevateforhumanity.org
VITE_SITE_URL=https://elevateforhumanity.org
VITE_API_URL=https://cuxzzpsyufcewtmicszk.supabase.co

# Supabase
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=<your-stripe-key>

# Environment
VITE_APP_ENV=production
NODE_ENV=production
```

### Set in Netlify Dashboard:

1. Go to: https://app.netlify.com/sites/elevateproduction/settings/deploys#environment
2. Add each variable
3. Redeploy

---

## 🗺️ SITEMAP CONFIGURATION

### Update sitemap to use production domain:

```javascript
// vite.config.js or sitemap generation script
const sitemapConfig = {
  hostname: 'https://elevateforhumanity.org',
  routes: [
    '/',
    '/about',
    '/programs',
    '/programs/barber',
    '/programs/building-tech',
    // ... all routes
  ],
  changefreq: 'weekly',
  priority: 0.8,
};
```

---

## 📊 DNS PROVIDER INSTRUCTIONS

### Cloudflare (RECOMMENDED)

1. **Add Site to Cloudflare:**
   - Go to: https://dash.cloudflare.com
   - Click "Add a Site"
   - Enter: `elevateforhumanity.org`
   - Select Free plan
   - Click "Add Site"

2. **Update Nameservers at Registrar:**

   ```
   Cloudflare will provide nameservers like:
   - ns1.cloudflare.com
   - ns2.cloudflare.com

   Update these at your domain registrar (GoDaddy, Namecheap, etc.)
   ```

3. **Add DNS Records in Cloudflare:**

   ```
   A     @     75.2.60.5 (Netlify)
   AAAA  @     2600:1f18:2148:bc00:e87f:535d:9c1:b5c (Netlify)
   CNAME www   elevateproduction.netlify.app
   CNAME api   cuxzzpsyufcewtmicszk.supabase.co (optional)
   ```

4. **Configure Cloudflare Settings:**
   - SSL/TLS: Full (strict)
   - Always Use HTTPS: On
   - Auto Minify: On (HTML, CSS, JS)
   - Brotli: On
   - HTTP/2: On
   - HTTP/3: On

### GoDaddy / Namecheap / Other Registrars

1. **Login to DNS Management**
2. **Add A Records:**

   ```
   Type: A
   Host: @
   Points to: 75.2.60.5
   TTL: 1 Hour
   ```

3. **Add CNAME Records:**
   ```
   Type: CNAME
   Host: www
   Points to: elevateproduction.netlify.app
   TTL: 1 Hour
   ```

---

## ✅ VERIFICATION CHECKLIST

### After DNS Configuration:

1. **Wait for DNS Propagation (24-48 hours)**

   ```bash
   # Check DNS propagation
   dig elevateforhumanity.org
   dig www.elevateforhumanity.org
   ```

2. **Verify Domain in Netlify:**
   - Go to Netlify dashboard
   - Check domain status shows "Netlify DNS"
   - Verify SSL certificate is active

3. **Test URLs:**

   ```bash
   # Should all resolve to your site
   curl -I https://elevateforhumanity.org
   curl -I https://www.elevateforhumanity.org
   curl -I https://elevateproduction.netlify.app
   ```

4. **Verify Redirects:**
   - www → apex (301 redirect)
   - netlify.app → custom domain (301 redirect)
   - http → https (301 redirect)

5. **Test SSL:**
   - Visit: https://www.ssllabs.com/ssltest/
   - Enter: elevateforhumanity.org
   - Should get A+ rating

6. **Update External Services:**
   - Google Search Console
   - Google Analytics
   - Social media links
   - Email signatures
   - Marketing materials

---

## 🚀 DEPLOYMENT WORKFLOW

### Current Workflow:

```
1. Push to GitHub
2. Netlify auto-deploys
3. Site available at: elevateproduction.netlify.app
```

### After DNS Setup:

```
1. Push to GitHub
2. Netlify auto-deploys
3. Site available at: elevateforhumanity.org
4. Old URLs redirect to new domain
```

---

## 🔒 SECURITY CONSIDERATIONS

### 1. HTTPS Enforcement

```toml
# netlify.toml
[[redirects]]
  from = "http://elevateforhumanity.org/*"
  to = "https://elevateforhumanity.org/:splat"
  status = 301
  force = true
```

### 2. HSTS Header

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
```

### 3. Content Security Policy

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self' https:; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https:; font-src 'self' https: data:; connect-src 'self' https://cuxzzpsyufcewtmicszk.supabase.co https://api.stripe.com"
```

---

## 📱 SUBDOMAIN STRATEGY

### Recommended Subdomains:

1. **www.elevateforhumanity.org**
   - Redirects to apex domain
   - Standard practice

2. **api.elevateforhumanity.org** (Optional)
   - Points to Supabase
   - Cleaner API URLs
   - Better branding

3. **admin.elevateforhumanity.org** (Optional)
   - Admin dashboard
   - Separate from main site
   - Better security

4. **portal.elevateforhumanity.org** (Optional)
   - Student portal
   - LMS access
   - Dedicated subdomain

5. **blog.elevateforhumanity.org** (Optional)
   - Blog/news
   - Separate content
   - Can use different platform

---

## 🎯 FINAL CONFIGURATION

### Minimal Setup (Start Here):

```
DNS Records:
- A     @     75.2.60.5
- CNAME www   elevateproduction.netlify.app

Netlify:
- Custom domain: elevateforhumanity.org
- SSL: Enabled (automatic)
- Redirects: www → apex

Environment Variables:
- VITE_SITE_URL=https://elevateforhumanity.org
```

### Full Setup (Recommended):

```
DNS Records:
- A     @     75.2.60.5
- AAAA  @     2600:1f18:2148:bc00:e87f:535d:9c1:b5c
- CNAME www   elevateproduction.netlify.app
- CNAME api   cuxzzpsyufcewtmicszk.supabase.co

Cloudflare:
- Proxy enabled (orange cloud)
- SSL: Full (strict)
- Security features enabled

Netlify:
- Custom domain: elevateforhumanity.org
- SSL: Enabled
- Redirects configured
- Environment variables set
```

---

## 📋 QUICK START CHECKLIST

- [ ] Choose DNS provider (Cloudflare recommended)
- [ ] Add domain to Netlify
- [ ] Configure DNS records
- [ ] Wait for DNS propagation (24-48 hours)
- [ ] Verify SSL certificate
- [ ] Update environment variables
- [ ] Test all URLs
- [ ] Update external services
- [ ] Monitor for issues

---

## 🆘 TROUBLESHOOTING

### Domain not resolving?

- Check DNS propagation: https://dnschecker.org
- Verify nameservers at registrar
- Wait 24-48 hours for full propagation

### SSL certificate error?

- Verify domain is added in Netlify
- Check DNS records point to Netlify
- Wait for Netlify to provision certificate (can take 24 hours)

### Redirects not working?

- Check netlify.toml configuration
- Verify redirects in Netlify dashboard
- Clear browser cache

### Site not loading?

- Check Netlify deployment status
- Verify build succeeded
- Check browser console for errors

---

**STATUS:** ✅ Ready to implement
**ESTIMATED TIME:** 1-2 hours (plus DNS propagation)
**DIFFICULTY:** Easy to Medium
**COST:** $0 (using free tiers)

---

_This configuration makes EFH completely standalone and independent of Durable.co_
