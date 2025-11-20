# Cloudflare API Token Setup Guide

**Project:** Elevate for Humanity  
**Service:** Cloudflare CDN & Security  
**Purpose:** CDN, caching, security, DNS management

---

## 🎯 Overview

This guide will help you configure Cloudflare API tokens for CDN, security, and DNS management of elevateforhumanity.org.

---

## 1. Create Cloudflare Account

### Step 1: Sign Up

1. Go to: [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
2. Create your account
3. Verify your email
4. Complete setup

### Step 2: Add Your Site

1. Click **"Add a site"**
2. Enter: `elevateforhumanity.org`
3. Select plan: **Free** (or Pro for advanced features)
4. Click **"Continue"**

### Step 3: Update Nameservers

Cloudflare will provide nameservers like:

```
ns1.cloudflare.com
ns2.cloudflare.com
```

Update these at your domain registrar (where you bought elevateforhumanity.org).

---

## 2. Create API Token

### Step 1: Access API Tokens

1. Go to: [https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **"Create Token"**

### Step 2: Use Template or Custom

**Option A: Use Template (Recommended)**

- Select: **"Edit zone DNS"** template
- This gives permissions for DNS management

**Option B: Create Custom Token**

- Click **"Create Custom Token"**
- Configure permissions manually

### Step 3: Configure Permissions

**For Full Site Management:**

**Permissions:**

- Zone → DNS → Edit
- Zone → Zone Settings → Edit
- Zone → Zone → Read
- Account → Account Settings → Read

**Zone Resources:**

- Include → Specific zone → elevateforhumanity.org

**Client IP Address Filtering:**

- Leave blank (or add your IP for extra security)

**TTL:**

- Leave blank (token doesn't expire)
- Or set expiration date

### Step 4: Create and Copy Token

1. Click **"Continue to summary"**
2. Review permissions
3. Click **"Create Token"**
4. **IMPORTANT:** Copy the token immediately
   - Format: `cloudflare_api_token_here`
   - You won't be able to see it again!

---

## 3. Add API Token to Environment

### Option A: Add to Netlify

1. Go to: [https://app.netlify.com](https://app.netlify.com)
2. Select your site
3. Go to: **Site settings** → **Environment variables**
4. Click **"Add a variable"**

**Variable:**

- **Key:** `CLOUDFLARE_API_TOKEN`
- **Value:** Your API token
- **Scopes:** All scopes

### Option B: Add to Local Environment

Create `.env.local` file:

```bash
CLOUDFLARE_API_TOKEN=your_token_here
CLOUDFLARE_ZONE_ID=your_zone_id_here
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
```

**Get Zone ID:**

1. Go to Cloudflare dashboard
2. Select your site
3. Scroll down on Overview page
4. Copy **Zone ID** from right sidebar

**Get Account ID:**

1. Go to Cloudflare dashboard
2. Click on your profile (top right)
3. Copy **Account ID**

---

## 4. Configure DNS Records

### Step 1: Point to Netlify

1. Go to: Cloudflare Dashboard → DNS → Records
2. Add these records:

**A Record (Root Domain):**

- **Type:** A
- **Name:** @
- **IPv4 address:** 75.2.60.5 (Netlify load balancer)
- **Proxy status:** Proxied (orange cloud)
- **TTL:** Auto

**CNAME Record (WWW):**

- **Type:** CNAME
- **Name:** www
- **Target:** [your-site].netlify.app
- **Proxy status:** Proxied (orange cloud)
- **TTL:** Auto

**CNAME Record (Blog - Optional):**

- **Type:** CNAME
- **Name:** blog
- **Target:** [your-durable-site].durable.co
- **Proxy status:** Proxied (orange cloud)
- **TTL:** Auto

### Step 2: Verify DNS Propagation

```bash
# Check A record
dig elevateforhumanity.org

# Check CNAME
dig www.elevateforhumanity.org

# Check blog subdomain
dig blog.elevateforhumanity.org
```

---

## 5. Configure SSL/TLS

### Step 1: SSL/TLS Settings

1. Go to: SSL/TLS → Overview
2. Select: **Full (strict)**
   - This ensures end-to-end encryption
   - Netlify provides SSL certificate

### Step 2: Enable Always Use HTTPS

1. Go to: SSL/TLS → Edge Certificates
2. Enable: **Always Use HTTPS**
3. Enable: **Automatic HTTPS Rewrites**

### Step 3: Enable HSTS (Optional but Recommended)

1. Go to: SSL/TLS → Edge Certificates
2. Enable: **HTTP Strict Transport Security (HSTS)**
3. Settings:
   - Max Age: 6 months
   - Include subdomains: Yes
   - Preload: Yes (after testing)

---

## 6. Configure Caching

### Step 1: Caching Level

1. Go to: Caching → Configuration
2. Set: **Caching Level** → Standard

### Step 2: Browser Cache TTL

1. Set: **Browser Cache TTL** → 4 hours
2. This balances performance and freshness

### Step 3: Page Rules (Optional)

Create page rules for specific caching:

**Rule 1: Cache Static Assets**

- **URL:** `elevateforhumanity.org/assets/*`
- **Settings:**
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
  - Browser Cache TTL: 1 month

**Rule 2: Cache Images**

- **URL:** `elevateforhumanity.org/images/*`
- **Settings:**
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month

**Rule 3: Bypass Cache for API**

- **URL:** `elevateforhumanity.org/api/*`
- **Settings:**
  - Cache Level: Bypass

---

## 7. Configure Security

### Step 1: Security Level

1. Go to: Security → Settings
2. Set: **Security Level** → Medium
   - High for more protection (may block some users)
   - Low for less protection

### Step 2: Enable Bot Fight Mode

1. Go to: Security → Bots
2. Enable: **Bot Fight Mode** (Free plan)
   - Or upgrade to **Super Bot Fight Mode** (Paid)

### Step 3: Configure Firewall Rules (Optional)

1. Go to: Security → WAF
2. Create rules to:
   - Block specific countries
   - Block known bad IPs
   - Rate limit requests

**Example Rule: Rate Limiting**

- **Name:** Rate Limit API
- **Expression:** `(http.request.uri.path contains "/api/")`
- **Action:** Challenge
- **Rate:** 100 requests per minute

---

## 8. Configure Performance

### Step 1: Enable Auto Minify

1. Go to: Speed → Optimization
2. Enable:
   - ✅ JavaScript
   - ✅ CSS
   - ✅ HTML

### Step 2: Enable Brotli Compression

1. Go to: Speed → Optimization
2. Enable: **Brotli**

### Step 3: Enable Rocket Loader (Optional)

1. Go to: Speed → Optimization
2. Enable: **Rocket Loader**
   - Speeds up JavaScript loading
   - May cause issues with some scripts - test first

### Step 4: Enable Early Hints (Optional)

1. Go to: Speed → Optimization
2. Enable: **Early Hints**
   - Sends preload hints to browser
   - Improves page load time

---

## 9. Use Cloudflare Scripts

### Available Scripts

Your project has these Cloudflare scripts:

**1. Setup Script:**

```bash
bash scripts/setup_cloudflare.sh
```

- Configures Cloudflare settings
- Sets up DNS records
- Enables security features

**2. Get Zone ID:**

```bash
bash scripts/get-cloudflare-zone-id.sh
```

- Retrieves your Cloudflare zone ID
- Useful for API calls

**3. Test Cloudflare:**

```bash
bash scripts/test-cloudflare.sh
```

- Tests Cloudflare configuration
- Verifies DNS records
- Checks SSL/TLS

**4. Cleanup Deployments:**

```bash
bash scripts/cleanup-cloudflare-deployments.sh
```

- Removes old deployments
- Cleans up DNS records

**5. Setup Environment:**

```bash
bash scripts/setup-cloudflare-env.sh
```

- Configures environment variables
- Sets up API tokens

### Run Setup Script

```bash
# Set environment variables first
export CLOUDFLARE_API_TOKEN="your_token_here"
export CLOUDFLARE_ZONE_ID="your_zone_id_here"
export CLOUDFLARE_ACCOUNT_ID="your_account_id_here"

# Run setup
bash scripts/setup_cloudflare.sh
```

---

## 10. Verify Configuration

### Check DNS

```bash
# Check if Cloudflare is active
dig elevateforhumanity.org

# Should show Cloudflare nameservers
dig elevateforhumanity.org NS
```

### Check SSL

```bash
# Check SSL certificate
curl -I https://www.elevateforhumanity.org

# Should show:
# - HTTP/2 200
# - cf-ray header (Cloudflare)
# - Strict-Transport-Security header
```

### Check Caching

```bash
# Check if caching is working
curl -I https://www.elevateforhumanity.org/assets/logo.png

# Should show:
# - cf-cache-status: HIT (after first request)
# - cf-ray header
```

### Check Security

1. Go to: Security → Analytics
2. Check for:
   - Threats blocked
   - Requests served
   - Bandwidth saved

---

## 11. Monitoring & Analytics

### Cloudflare Analytics

1. Go to: Analytics & Logs → Traffic
2. Monitor:
   - **Requests:** Total requests served
   - **Bandwidth:** Data transferred
   - **Threats:** Blocked attacks
   - **Cache:** Cache hit ratio

### Set Up Alerts

1. Go to: Notifications
2. Enable alerts for:
   - SSL certificate expiration
   - DDoS attacks
   - High error rates
   - Traffic spikes

### Export Logs (Pro Plan)

1. Go to: Analytics & Logs → Logs
2. Set up Logpush to:
   - S3 bucket
   - Supabase
   - External service

---

## 12. Troubleshooting

### Common Issues

**Issue:** "Invalid API token"

- **Solution:** Regenerate token with correct permissions
- **Solution:** Check token is not expired
- **Solution:** Verify token has Zone DNS Edit permission

**Issue:** "DNS not resolving"

- **Solution:** Wait for DNS propagation (up to 48 hours)
- **Solution:** Check nameservers are updated at registrar
- **Solution:** Verify DNS records are correct

**Issue:** "SSL certificate error"

- **Solution:** Set SSL/TLS mode to "Full (strict)"
- **Solution:** Wait for certificate provisioning (up to 24 hours)
- **Solution:** Check Netlify has SSL enabled

**Issue:** "Too many redirects"

- **Solution:** Check SSL/TLS mode is "Full (strict)"
- **Solution:** Disable "Always Use HTTPS" temporarily
- **Solution:** Check Netlify redirect rules

### Debug Mode

Enable development mode:

1. Go to: Overview
2. Click **"Development Mode"**
3. Bypasses cache for 3 hours
4. Useful for testing changes

---

## 13. Best Practices

### Security

- ✅ Use API tokens instead of API keys
- ✅ Set token expiration dates
- ✅ Limit token permissions to minimum needed
- ✅ Rotate tokens periodically
- ✅ Enable 2FA on Cloudflare account

### Performance

- ✅ Enable Brotli compression
- ✅ Use page rules for static assets
- ✅ Enable Auto Minify
- ✅ Monitor cache hit ratio (aim for >80%)
- ✅ Use Cloudflare Workers for edge computing

### Monitoring

- ✅ Check analytics daily
- ✅ Set up alerts for critical events
- ✅ Monitor SSL certificate expiration
- ✅ Review security threats weekly
- ✅ Track bandwidth usage

---

## 14. Quick Reference

### API Token Permissions

```
Zone → DNS → Edit
Zone → Zone Settings → Edit
Zone → Zone → Read
Account → Account Settings → Read
```

### DNS Records

```
A     @     75.2.60.5 (Netlify)
CNAME www   [site].netlify.app
CNAME blog  [site].durable.co (optional)
```

### Environment Variables

```bash
CLOUDFLARE_API_TOKEN=your_token_here
CLOUDFLARE_ZONE_ID=your_zone_id_here
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
```

### Useful Commands

```bash
# Get zone ID
curl -X GET "https://api.cloudflare.com/client/v4/zones" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"

# List DNS records
curl -X GET "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"

# Purge cache
curl -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

---

## 15. Checklist

### Initial Setup

- [ ] Create Cloudflare account
- [ ] Add elevateforhumanity.org site
- [ ] Update nameservers at registrar
- [ ] Wait for DNS propagation
- [ ] Create API token
- [ ] Add token to environment variables

### DNS Configuration

- [ ] Add A record pointing to Netlify
- [ ] Add CNAME for www subdomain
- [ ] Add CNAME for blog subdomain (optional)
- [ ] Enable proxy (orange cloud)
- [ ] Verify DNS resolution

### SSL/TLS Configuration

- [ ] Set SSL/TLS mode to "Full (strict)"
- [ ] Enable "Always Use HTTPS"
- [ ] Enable "Automatic HTTPS Rewrites"
- [ ] Enable HSTS (after testing)
- [ ] Verify SSL certificate

### Performance Configuration

- [ ] Enable Auto Minify
- [ ] Enable Brotli compression
- [ ] Set caching level
- [ ] Create page rules for static assets
- [ ] Test cache hit ratio

### Security Configuration

- [ ] Set security level to Medium
- [ ] Enable Bot Fight Mode
- [ ] Create firewall rules (optional)
- [ ] Enable rate limiting (optional)
- [ ] Set up alerts

### Verification

- [ ] Test DNS resolution
- [ ] Test SSL certificate
- [ ] Test caching
- [ ] Check analytics
- [ ] Monitor for 24 hours

---

**Setup Time:** 30-60 minutes  
**DNS Propagation:** Up to 48 hours  
**SSL Provisioning:** Up to 24 hours

**Status:** Ready to configure - follow steps above

---

**Document Version:** 1.0  
**Last Updated:** 2025-10-26  
**Next Review:** After Cloudflare configuration
