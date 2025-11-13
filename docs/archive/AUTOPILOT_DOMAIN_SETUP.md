#!/bin/bash
# Autopilot Domain Setup Guide
# Automated scripts to add custom domain and configure SSL

## Overview

Your autopilot can automatically add `elevateconnectsdirectory.org` to Netlify and configure SSL using the Netlify API.

## Prerequisites

You need a **Netlify Personal Access Token**:

1. Go to: https://app.netlify.com/user/applications
2. Click "New access token"
3. Name it: "Autopilot Domain Setup"
4. Click "Generate token"
5. Copy the token (you'll only see it once)

## Option 1: Automated Script (Recommended)

### Step 1: Set Your Token

```bash
export NETLIFY_AUTH_TOKEN='your-token-here'
```

### Step 2: Run Autopilot

```bash
bash scripts/autopilot-add-domain.sh
```

This will:
- ✅ Add `elevateconnectsdirectory.org` to Netlify
- ✅ Trigger SSL certificate provisioning
- ✅ Clear cache and rebuild
- ✅ Provide status updates

### Step 3: Monitor SSL Provisioning

```bash
bash scripts/autopilot-check-ssl.sh
```

Run this every few minutes to check SSL status.

## Option 2: Cloudflare Worker (Advanced)

If you have the Cloudflare Worker deployed, you can trigger it:

### Deploy the Worker

```bash
cd workers
wrangler deploy autopilot-add-domain.ts
```

### Set Secrets

```bash
wrangler secret put NETLIFY_TOKEN
wrangler secret put NETLIFY_SITE_ID
wrangler secret put AUTOPILOT_TOKEN
```

### Trigger via API

```bash
curl -X POST https://your-worker.workers.dev \
  -H "Authorization: Bearer YOUR_AUTOPILOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"task":"full_setup","domain":"elevateconnectsdirectory.org"}'
```

## What the Autopilot Does

### 1. Add Custom Domain
```
POST https://api.netlify.com/api/v1/sites/{site_id}/domains
Body: {"domain_name":"elevateconnectsdirectory.org"}
```

### 2. Check SSL Status
```
GET https://api.netlify.com/api/v1/sites/{site_id}
Checks: ssl, ssl_url, domain_aliases
```

### 3. Trigger Cache Clear
```
POST https://api.netlify.com/api/v1/sites/{site_id}/builds
Body: {"clear_cache":true}
```

### 4. Monitor SSL Provisioning
```
Checks SSL certificate every few minutes
Waits for Let's Encrypt certificate to be issued
```

## Timeline

- **Add domain**: Instant (API call)
- **SSL provisioning**: 2-10 minutes (automatic)
- **Cache clear**: 2-3 minutes (rebuild)
- **Total**: 5-15 minutes

## Verification

### Check DNS
```bash
curl -s "https://dns.google/resolve?name=elevateconnectsdirectory.org&type=A" | jq
```

Expected: `75.2.60.5`

### Check SSL Certificate
```bash
curl -Ivk https://elevateconnectsdirectory.org 2>&1 | grep "subject:"
```

Expected: `CN=elevateconnectsdirectory.org`

### Check Site Loads
```bash
curl -I https://elevateconnectsdirectory.org
```

Expected: `HTTP/2 200`

## Troubleshooting

### "Domain already exists"
If the domain is already added:
```bash
# Check current domains
curl -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  "https://api.netlify.com/api/v1/sites/12f120ab-3f63-419b-bc49-430f043415c1" | \
  jq '.domain_aliases'
```

### SSL Taking Too Long
If SSL provisioning takes more than 15 minutes:
1. Check Netlify dashboard: https://app.netlify.com/sites/elevateproduction/settings/domain
2. Look for error messages
3. Contact Netlify support (usually instant chat)

### Token Issues
If you get authentication errors:
1. Verify token is correct
2. Check token has not expired
3. Ensure token has "sites:update" permission

## Manual Alternative

If autopilot fails, you can add the domain manually:

1. Go to: https://app.netlify.com/sites/elevateproduction/settings/domain
2. Click "Add custom domain"
3. Enter: `elevateconnectsdirectory.org`
4. Click "Verify" then "Add domain"
5. Wait 2-10 minutes for SSL

## Scripts Created

### `/scripts/autopilot-add-domain.sh`
Main script to add domain and configure SSL

**Usage:**
```bash
NETLIFY_AUTH_TOKEN='your-token' bash scripts/autopilot-add-domain.sh
```

### `/scripts/autopilot-check-ssl.sh`
Monitor SSL certificate provisioning

**Usage:**
```bash
bash scripts/autopilot-check-ssl.sh
```

### `/workers/autopilot-add-domain.ts`
Cloudflare Worker for remote automation

**Deploy:**
```bash
cd workers && wrangler deploy autopilot-add-domain.ts
```

## Environment Variables

### Required for Scripts
```bash
export NETLIFY_AUTH_TOKEN='nfp_your_token_here'
```

### Required for Worker
```bash
# Set via wrangler
wrangler secret put NETLIFY_TOKEN
wrangler secret put NETLIFY_SITE_ID
wrangler secret put AUTOPILOT_TOKEN
```

## API Endpoints Used

### Netlify API
- **Base URL**: `https://api.netlify.com/api/v1`
- **Site ID**: `12f120ab-3f63-419b-bc49-430f043415c1`
- **Authentication**: Bearer token in Authorization header

### Endpoints
1. `GET /sites/{site_id}` - Get site info
2. `POST /sites/{site_id}/domains` - Add custom domain
3. `POST /sites/{site_id}/builds` - Trigger build
4. `GET /sites/{site_id}/deploys` - Check deploy status

## Success Criteria

After running autopilot, you should see:

✅ Domain added to Netlify
✅ SSL certificate provisioned
✅ Site accessible at https://elevateconnectsdirectory.org
✅ No SSL errors in browser
✅ All styling and images loading correctly

## Next Steps After Success

1. Clear browser cache (Ctrl+Shift+R)
2. Visit https://elevateconnectsdirectory.org
3. Verify all pages work
4. Test navigation and functionality
5. Check mobile responsiveness

## Support

If you encounter issues:

1. **Check logs**: Scripts output detailed status
2. **Run check script**: `bash scripts/autopilot-check-ssl.sh`
3. **Verify token**: Ensure NETLIFY_AUTH_TOKEN is set correctly
4. **Manual fallback**: Use Netlify dashboard if needed

## Summary

**Autopilot can:**
- ✅ Add custom domain via API
- ✅ Trigger SSL provisioning
- ✅ Clear cache and rebuild
- ✅ Monitor SSL status

**Autopilot cannot:**
- ❌ Speed up SSL provisioning (Netlify controls this)
- ❌ Fix DNS issues (must be configured separately)
- ❌ Access Netlify dashboard UI (API only)

**Estimated time:** 5-15 minutes total (mostly waiting for SSL)

---

## Quick Start

```bash
# 1. Set token
export NETLIFY_AUTH_TOKEN='your-token-here'

# 2. Run autopilot
bash scripts/autopilot-add-domain.sh

# 3. Wait 5 minutes

# 4. Check status
bash scripts/autopilot-check-ssl.sh

# 5. Visit site
# https://elevateconnectsdirectory.org
```

**That's it!** Your autopilot will handle the rest.
