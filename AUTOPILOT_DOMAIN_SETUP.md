# Autopilot Domain Configuration

## 🤖 Available Autopilot Scripts

Your repository has autopilot scripts ready to configure custom domains automatically.

---

## Option 1: Portal Domain Setup (portal.elevateforhumanity.org)

**Script:** `scripts/autopilot-setup-portal-domain.sh`

### What It Does

1. ✅ Adds `portal.elevateforhumanity.org` to Netlify
2. ✅ Configures DNS CNAME record on Cloudflare
3. ✅ Provisions SSL certificate
4. ✅ Triggers deployment
5. ✅ Verifies configuration

### Prerequisites

```bash
# Required: Netlify Auth Token
export NETLIFY_AUTH_TOKEN="your_netlify_token"
# Get from: https://app.netlify.com/user/applications#personal-access-tokens

# Optional: Cloudflare API Token (for automatic DNS)
export CLOUDFLARE_API_TOKEN="your_cloudflare_token"
# Get from: https://dash.cloudflare.com/profile/api-tokens
```

### Execute

```bash
./scripts/autopilot-setup-portal-domain.sh
```

### Timeline

- DNS Propagation: 5-30 minutes
- SSL Certificate: 5-10 minutes after DNS
- Total: ~15-40 minutes

---

## Option 2: DNS Only Setup

**Script:** `scripts/autopilot-add-dns.sh`

### What It Does

1. ✅ Gets Cloudflare Zone ID
2. ✅ Checks for existing DNS record
3. ✅ Creates or updates CNAME record
4. ✅ Verifies DNS configuration

### Prerequisites

```bash
export CLOUDFLARE_API_TOKEN="your_cloudflare_token"
```

### Execute

```bash
./scripts/autopilot-add-dns.sh
```

---

## Current Configuration

### Netlify Site

- **Site ID:** `12f120ab-3f63-419b-bc49-430f043415c1`
- **Site Name:** `elevateforhumanityfix`
- **Current URL:** `elevateforhumanityfix.netlify.app`
- **Target:** `main--elevateforhumanityfix.netlify.app`

### Domain Setup

- **Primary Domain:** `elevateforhumanity.org` (Durable.co)
- **Portal Domain:** `portal.elevateforhumanity.org` (Netlify)
- **Cloudflare Zone:** `elevateforhumanity.org`

---

## Recommended Approach

### For Quick Fix (Current React SPA)

**Use portal.elevateforhumanity.org:**

```bash
# 1. Set tokens
export NETLIFY_AUTH_TOKEN="your_token"
export CLOUDFLARE_API_TOKEN="your_token"

# 2. Run autopilot
./scripts/autopilot-setup-portal-domain.sh

# 3. Wait for DNS propagation (15-40 min)

# 4. Verify
curl -I https://portal.elevateforhumanity.org
```

### For Next.js Migration

**Use app.elevateforhumanity.org or www.elevateforhumanity.org:**

1. Deploy Next.js site to new Netlify site
2. Configure custom domain
3. Update DNS
4. Test thoroughly
5. Switch primary domain

---

## Manual DNS Configuration (If Autopilot Fails)

### Cloudflare Dashboard

1. Go to: https://dash.cloudflare.com
2. Select domain: `elevateforhumanity.org`
3. Go to **DNS** → **Records**
4. Click **Add record**
5. Configure:
   ```
   Type: CNAME
   Name: portal (or app, or www)
   Target: elevateforhumanityfix.netlify.app
   TTL: Auto
   Proxy status: DNS only (gray cloud)
   ```
6. Click **Save**

### Netlify Dashboard

1. Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/domain
2. Click **Add custom domain**
3. Enter: `portal.elevateforhumanity.org`
4. Click **Verify**
5. Wait for SSL certificate (5-10 min)

---

## Verification Steps

### 1. Check DNS Propagation

```bash
# Check CNAME record
dig portal.elevateforhumanity.org CNAME

# Or use online tool
# https://dnschecker.org/#CNAME/portal.elevateforhumanity.org
```

### 2. Check SSL Certificate

```bash
# Check HTTPS
curl -I https://portal.elevateforhumanity.org

# Should return 200 OK with SSL
```

### 3. Check Site Loading

```bash
# Visit in browser
open https://portal.elevateforhumanity.org

# Check for:
# - No SSL warnings
# - Content loads
# - No skeleton pages (after env vars set)
```

---

## Troubleshooting

### DNS Not Propagating

- **Wait:** DNS can take up to 48 hours (usually 5-30 min)
- **Check:** Use https://dnschecker.org
- **Flush:** Clear local DNS cache

  ```bash
  # macOS
  sudo dscacheutil -flushcache

  # Windows
  ipconfig /flushdns

  # Linux
  sudo systemd-resolve --flush-caches
  ```

### SSL Certificate Not Provisioning

- **Wait:** Netlify needs DNS to propagate first
- **Check:** Netlify dashboard → Domain settings
- **Retry:** Click "Renew certificate" in Netlify
- **Verify:** DNS is pointing correctly

### Autopilot Script Fails

- **Check tokens:** Ensure both tokens are set and valid
- **Check permissions:** Tokens need appropriate scopes
- **Check logs:** Script outputs detailed error messages
- **Manual fallback:** Use manual DNS configuration above

---

## Environment Variables Required

After domain is configured, set these in Netlify:

```bash
VITE_API_URL=https://api.elevateforhumanity.org
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

See: [NETLIFY_ENV_VARS_REQUIRED.md](./NETLIFY_ENV_VARS_REQUIRED.md)

---

## Next Steps

### After Domain Configuration

1. ✅ **Set environment variables** in Netlify
2. ✅ **Trigger new deployment**
3. ✅ **Test the site** at new domain
4. ✅ **Verify no skeleton pages**
5. ✅ **Update marketing site** links

### For Next.js Migration

1. ✅ **Get Next.js starter** (efh-next-ssg-ssr-auth-plus.zip)
2. ✅ **Deploy to new Netlify site**
3. ✅ **Configure app.elevateforhumanity.org**
4. ✅ **Test thoroughly**
5. ✅ **Switch DNS** when ready

---

## Quick Reference

### Get Tokens

**Netlify:**
https://app.netlify.com/user/applications#personal-access-tokens

**Cloudflare:**
https://dash.cloudflare.com/profile/api-tokens

### Run Autopilot

```bash
# Full setup (Netlify + DNS + SSL)
export NETLIFY_AUTH_TOKEN="..."
export CLOUDFLARE_API_TOKEN="..."
./scripts/autopilot-setup-portal-domain.sh

# DNS only
export CLOUDFLARE_API_TOKEN="..."
./scripts/autopilot-add-dns.sh
```

### Verify

```bash
# DNS
dig portal.elevateforhumanity.org CNAME

# HTTPS
curl -I https://portal.elevateforhumanity.org

# Browser
open https://portal.elevateforhumanity.org
```

---

## Status

- ✅ **Autopilot scripts:** Ready
- ✅ **Documentation:** Complete
- ⏳ **Tokens required:** Set by user
- ⏳ **Execution:** Ready to run
- ⏳ **DNS propagation:** After execution
- ⏳ **SSL certificate:** After DNS

---

**Ready to configure domain with autopilot!** 🚀

Set your tokens and run the script to automatically configure everything.
