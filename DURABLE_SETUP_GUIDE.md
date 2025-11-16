# Durable Setup Guide for www.elevateforhumanity.org

## 🎯 Goal

Host the marketing site for **www.elevateforhumanity.org** on Durable (durablesites.co).

---

## 📋 Prerequisites

1. Durable account at https://durablesites.co
2. Access to DNS provider for elevateforhumanity.org
3. Cloudflare API token (if using Cloudflare)

---

## 🚀 Quick Start (Automated)

### Step 1: Run Cloudflare Cleanup Script

```bash
# Export your Cloudflare API token
export CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"

# Run the cleanup script
./scripts/workers/cleanup-cloudflare-elevateforhumanity.sh
```

This will:

- Remove Cloudflare configuration for www.elevateforhumanity.org
- Update DNS to point to Durable
- Disable Cloudflare proxy

### Step 2: Configure in Durable

1. Log in to Durable: https://durablesites.co
2. Go to your site dashboard
3. Click "Settings" or "Domain"
4. Click "Add Custom Domain"
5. Enter: `www.elevateforhumanity.org`
6. Click "Add Domain"
7. Follow Durable's verification steps
8. Wait for SSL certificate (5-10 minutes)

### Step 3: Verify

```bash
# Check DNS propagation
curl -I https://www.elevateforhumanity.org

# Should return:
# HTTP/2 200
# (Durable headers)
```

---

## 🔧 Manual Setup (If Script Fails)

### Step 1: Get Durable CNAME Target

1. Log in to Durable: https://durablesites.co
2. Go to your site settings
3. Look for "Custom Domain" or "Connect Domain"
4. Find the CNAME target (examples):
   - `sites.durablesites.co`
   - `[your-site].durablesites.co`
   - `proxy.durablesites.co`

**Note**: If you can't find it, contact Durable support or check their documentation.

### Step 2: Update DNS Records

#### If using Cloudflare:

1. Go to: https://dash.cloudflare.com
2. Select the `elevateforhumanity.org` zone
3. Go to DNS → Records
4. Find the record for `www`
5. Edit it:
   - Type: CNAME
   - Name: www
   - Target: `[durable-cname-from-step-1]`
   - Proxy status: DNS only (gray cloud)
   - TTL: Auto
6. Save

#### If using another DNS provider (GoDaddy, Namecheap, etc.):

1. Log in to your DNS provider
2. Find DNS management for elevateforhumanity.org
3. Find the record for `www`
4. Edit or create:
   - Type: CNAME
   - Host/Name: www
   - Points to/Target: `[durable-cname-from-step-1]`
   - TTL: Auto or 3600
5. Save

### Step 3: Add Domain in Durable

1. Go back to Durable dashboard
2. Add custom domain: `www.elevateforhumanity.org`
3. Durable will verify DNS
4. Wait for SSL certificate (5-10 minutes)

---

## 📊 Expected DNS Configuration

After setup, your DNS should be:

```
Type   Name   Target                    TTL    Proxy
CNAME  www    sites.durablesites.co     Auto   No
```

**Important**:

- Proxy must be DISABLED (DNS only)
- If using Cloudflare, the cloud icon should be GRAY, not orange

---

## 🔍 Verification Steps

### 1. Check DNS Propagation

Go to: https://dnschecker.org/#CNAME/www.elevateforhumanity.org

Should show: `sites.durablesites.co` (or your Durable CNAME)

### 2. Test HTTP Response

```bash
curl -I https://www.elevateforhumanity.org
```

Should return:

```
HTTP/2 200
server: [Durable server]
```

### 3. Test in Browser

Open: https://www.elevateforhumanity.org

Should show:

- Your marketing site content
- Valid SSL certificate (green padlock)
- No errors

---

## 🚨 Troubleshooting

### Issue: SSL Handshake Failure

**Cause**: DNS not pointing to Durable correctly

**Fix**:

1. Verify DNS CNAME points to Durable target
2. Ensure Cloudflare proxy is disabled
3. Wait 15 minutes for DNS propagation
4. Clear browser cache

### Issue: "Domain not verified" in Durable

**Cause**: DNS not propagated yet

**Fix**:

1. Wait 15-30 minutes
2. Check DNS propagation: https://dnschecker.org
3. Try "Verify" button again in Durable
4. Contact Durable support if still failing

### Issue: "This site can't be reached"

**Cause**: DNS not configured or propagated

**Fix**:

1. Verify DNS record exists
2. Check DNS propagation
3. Wait up to 48 hours (usually 15 minutes)
4. Try different DNS server: `nslookup www.elevateforhumanity.org 8.8.8.8`

### Issue: Shows old content or wrong site

**Cause**: Browser cache or DNS cache

**Fix**:

1. Clear browser cache
2. Try incognito/private mode
3. Flush DNS cache:
   - Windows: `ipconfig /flushdns`
   - Mac: `sudo dscacheutil -flushcache`
   - Linux: `sudo systemd-resolve --flush-caches`

---

## 📝 Common Durable CNAME Targets

Depending on your Durable plan, the CNAME might be:

- `sites.durablesites.co`
- `hosting.durablesites.co`
- `[your-site-name].durablesites.co`
- `proxy.durablesites.co`

**Check your Durable dashboard for the exact target.**

---

## ⚡ Quick Reference

### Cloudflare Cleanup Command:

```bash
export CLOUDFLARE_API_TOKEN="your-token"
./scripts/workers/cleanup-cloudflare-elevateforhumanity.sh
```

### DNS Configuration:

```
CNAME  www  sites.durablesites.co  (DNS only, no proxy)
```

### Verification:

```bash
curl -I https://www.elevateforhumanity.org
```

### DNS Checker:

https://dnschecker.org/#CNAME/www.elevateforhumanity.org

---

## 🎯 Success Checklist

- [ ] Cloudflare cleanup complete (or manual DNS update)
- [ ] DNS points to Durable CNAME
- [ ] Cloudflare proxy disabled (if using Cloudflare)
- [ ] Domain added in Durable dashboard
- [ ] DNS verified in Durable
- [ ] SSL certificate provisioned
- [ ] Site loads: https://www.elevateforhumanity.org
- [ ] Valid SSL (green padlock)
- [ ] Marketing content displays correctly

---

## 📞 Support

### Durable Support:

- Website: https://durablesites.co/support
- Email: support@durablesites.co
- Documentation: https://durablesites.co/docs

### DNS Provider Support:

- Cloudflare: https://support.cloudflare.com
- GoDaddy: https://www.godaddy.com/help
- Namecheap: https://www.namecheap.com/support

---

## 🔗 Related Documentation

- [CORRECT_DOMAIN_SETUP.md](./CORRECT_DOMAIN_SETUP.md) - Complete architecture
- [VERCEL_DOMAIN_SETUP.md](./VERCEL_DOMAIN_SETUP.md) - Vercel LMS setup
- [scripts/workers/remove-elevateforhumanity-from-cloudflare.mjs](./scripts/workers/remove-elevateforhumanity-from-cloudflare.mjs) - Cleanup script

---

**Estimated Time**: 15-30 minutes (including DNS propagation)

**Difficulty**: Easy (with automation) / Medium (manual)

**Result**: Marketing site live on www.elevateforhumanity.org via Durable
