# Autopilot Cloudflare Configuration Instructions

**Project:** Elevate for Humanity  
**Task:** Complete Cloudflare Configuration via Autopilot  
**Created:** 2025-10-26

---

## Overview

Your autopilot system can now handle all Cloudflare configurations automatically. This document explains what has been set up and how to execute the configuration.

---

## What Has Been Created

### 1. Task Definition

**File:** `AUTOPILOT_CLOUDFLARE_TASK.json`

A comprehensive JSON task definition that includes:

- 11 subtasks covering all aspects of Cloudflare configuration
- DNS setup, SSL/TLS configuration, caching, security
- Worker deployment and registration
- Environment variable management
- Verification and monitoring

### 2. Automation Script

**File:** `scripts/autopilot-cloudflare-config.sh`

An executable bash script that automates:

- ✅ API token verification
- ✅ Zone ID retrieval
- ✅ DNS record configuration (A and CNAME)
- ✅ SSL/TLS settings (Full strict, Always HTTPS)
- ✅ Caching configuration (aggressive, Brotli)
- ✅ Security settings (Medium level)
- ✅ Environment file updates
- ✅ Source code URL replacements
- ✅ Configuration report generation

---

## Prerequisites

Before running the autopilot configuration, you need:

### 1. Cloudflare Account

- Create account at: https://dash.cloudflare.com/sign-up
- Add domain: elevateforhumanity.org
- Update nameservers at your domain registrar

### 2. API Token

Create an API token with these permissions:

- Zone → DNS → Edit
- Zone → Zone Settings → Edit
- Zone → Zone → Read
- Account → Account Settings → Read

Get token from: https://dash.cloudflare.com/profile/api-tokens

### 3. Account ID

Find your Account ID in the Cloudflare dashboard (right sidebar on Overview page)

---

## How to Execute

### Option 1: Manual Execution (Recommended First Time)

```bash
# Set environment variables
export CLOUDFLARE_API_TOKEN="your-api-token-here"
export CLOUDFLARE_ACCOUNT_ID="your-account-id-here"

# Run the configuration script
bash scripts/autopilot-cloudflare-config.sh
```

The script will:

1. Verify your credentials
2. Configure all Cloudflare settings
3. Update source code files
4. Generate a detailed report

### Option 2: Autopilot Orchestrator Execution

If you have the autopilot orchestrator deployed:

```bash
# Set orchestrator URL
export ORCHESTRATOR_URL="https://efh-autopilot-orchestrator.workers.dev"

# Submit the task
curl -X POST "$ORCHESTRATOR_URL/autopilot/plan" \
  -H "Content-Type: application/json" \
  -d @AUTOPILOT_CLOUDFLARE_TASK.json
```

### Option 3: Using Existing Autopilot Scripts

```bash
# Run through your existing autopilot system
bash scripts/autopilot.sh run
```

---

## What Gets Configured

### DNS Records

- **A Record:** @ → 75.2.60.5 (Netlify load balancer)
- **CNAME:** www → elevateforhumanity.netlify.app
- **Proxy:** Enabled (orange cloud) for both records

### SSL/TLS

- **Mode:** Full (strict) - end-to-end encryption
- **Always Use HTTPS:** Enabled
- **Automatic HTTPS Rewrites:** Enabled

### Caching

- **Level:** Aggressive
- **Browser Cache TTL:** 4 hours (14400 seconds)
- **Brotli Compression:** Enabled

### Security

- **Security Level:** Medium
- **Bot Fight Mode:** Available (enable in dashboard)

### Environment Variables

Updated in `.env.example` and new `.env.cloudflare`:

- CLOUDFLARE_API_TOKEN
- CLOUDFLARE_ACCOUNT_ID
- CLOUDFLARE_ZONE_ID
- ORCHESTRATOR_URL
- ANALYZER_URL
- AGENT_WORKER_URL
- AI_STYLIST_URL

### Source Code Updates

Placeholder URLs replaced in:

- `src/components/AIPageBuilder.tsx`
- `src/components/OrchestratorAdmin.tsx`
- `src/components/AssetGenerator.tsx`
- `src/pages/AutopilotAdmin.tsx`

**Before:**

```typescript
'https://efh-ai-stylist.your-subdomain.workers.dev/templates';
```

**After:**

```typescript
'https://efh-ai-stylist.YOUR_ACCOUNT_ID.workers.dev/templates';
```

---

## After Configuration

### 1. Review the Report

Check `CLOUDFLARE_CONFIG_REPORT.md` for:

- Configuration summary
- All settings applied
- Next steps
- Files updated

### 2. Deploy Cloudflare Workers

Workers need to be deployed separately using Wrangler CLI:

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy each worker (requires wrangler.toml files)
cd workers/efh-autopilot-orchestrator
wrangler deploy

cd ../efh-autopilot-analyzer
wrangler deploy

cd ../efh-ai-stylist
wrangler deploy

cd ../efh-agent
wrangler deploy
```

**Note:** Worker source code and wrangler.toml files need to be created first.

### 3. Register Autopilots

Once workers are deployed:

```bash
export ORCHESTRATOR_URL=https://efh-autopilot-orchestrator.workers.dev
bash scripts/register-autopilots.sh
```

This registers all workers with the orchestrator:

- AI Employee (efh-agent)
- AI Stylist (efh-ai-stylist)
- Page Deployer
- Payout Batch

### 4. Add Variables to Netlify

Add environment variables to Netlify dashboard:

1. Go to: https://app.netlify.com
2. Select your site: elevateforhumanity
3. Navigate to: **Site settings** → **Environment variables**
4. Click **"Add a variable"** for each:

```
CLOUDFLARE_API_TOKEN=your-token
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ZONE_ID=your-zone-id
ORCHESTRATOR_URL=https://efh-autopilot-orchestrator.workers.dev
ANALYZER_URL=https://efh-autopilot-analyzer.workers.dev
AGENT_WORKER_URL=https://efh-agent.YOUR_ACCOUNT_ID.workers.dev
AI_STYLIST_URL=https://efh-ai-stylist.YOUR_ACCOUNT_ID.workers.dev
```

### 5. Verify Configuration

```bash
# Run test script
bash scripts/test-cloudflare.sh

# Check DNS resolution
dig elevateforhumanity.org

# Check SSL certificate
curl -I https://elevateforhumanity.org

# Test worker endpoints (after deployment)
curl https://efh-autopilot-orchestrator.workers.dev/health
curl https://efh-autopilot-analyzer.workers.dev/health
```

### 6. Rebuild and Deploy

Trigger a new Netlify build to use the updated environment variables:

```bash
# Commit changes
git add .
git commit -m "chore: configure Cloudflare via autopilot

- Configure DNS, SSL/TLS, caching, and security
- Update Worker URLs in source code
- Add Cloudflare environment variables
- Generate configuration report

Co-authored-by: Ona <no-reply@ona.com>"

# Push to trigger deployment
git push origin main
```

---

## Monitoring

### Cloudflare Dashboard

Monitor at: https://dash.cloudflare.com

**Key Metrics:**

- Cache hit ratio (aim for >80%)
- Bandwidth saved
- Threats blocked
- SSL certificate status

### Analytics

- **Traffic:** Total requests and bandwidth
- **Security:** Blocked threats and attacks
- **Performance:** Cache performance
- **Reliability:** Uptime and errors

### Alerts

Set up notifications for:

- SSL certificate expiration
- High error rates
- DDoS attacks
- Traffic spikes

---

## Troubleshooting

### Issue: "Invalid API token"

**Solution:**

- Regenerate token with correct permissions
- Verify token is not expired
- Check token has Zone DNS Edit permission

### Issue: "DNS not resolving"

**Solution:**

- Wait for DNS propagation (up to 48 hours)
- Check nameservers are updated at registrar
- Verify DNS records in Cloudflare dashboard

### Issue: "SSL certificate error"

**Solution:**

- Wait for certificate provisioning (up to 24 hours)
- Verify SSL mode is "Full (strict)"
- Check Netlify has SSL enabled

### Issue: "Too many redirects"

**Solution:**

- Check SSL/TLS mode is "Full (strict)"
- Disable "Always Use HTTPS" temporarily
- Review Netlify redirect rules

### Issue: "Worker not found"

**Solution:**

- Deploy workers using Wrangler CLI
- Verify worker URLs are correct
- Check CLOUDFLARE_ACCOUNT_ID is set correctly

---

## Files Created/Modified

### Created

- ✅ `AUTOPILOT_CLOUDFLARE_TASK.json` - Task definition
- ✅ `scripts/autopilot-cloudflare-config.sh` - Automation script
- ✅ `AUTOPILOT_CLOUDFLARE_INSTRUCTIONS.md` - This file
- ✅ `.env.cloudflare` - Cloudflare-specific environment variables (after running script)
- ✅ `CLOUDFLARE_CONFIG_REPORT.md` - Configuration report (after running script)

### Modified

- `.env.example` - Updated with Worker URLs
- `src/components/AIPageBuilder.tsx` - Updated Worker URLs
- `src/components/OrchestratorAdmin.tsx` - Updated Worker URLs
- `src/components/AssetGenerator.tsx` - Updated Worker URLs
- `src/pages/AutopilotAdmin.tsx` - Updated Worker URLs

---

## Security Notes

### API Token Security

- ✅ Never commit API tokens to Git
- ✅ Store tokens in environment variables only
- ✅ Use `.env.cloudflare` for local development (in .gitignore)
- ✅ Add tokens to Netlify environment variables
- ✅ Rotate tokens periodically
- ✅ Set token expiration dates

### Best Practices

- ✅ Use API tokens instead of API keys
- ✅ Limit token permissions to minimum needed
- ✅ Enable 2FA on Cloudflare account
- ✅ Monitor API usage in Cloudflare dashboard
- ✅ Review security logs regularly

---

## Estimated Time

- **Initial Setup:** 15-20 minutes
  - Create Cloudflare account
  - Generate API token
  - Set environment variables

- **Automated Configuration:** 2-3 minutes
  - Run autopilot script
  - Configure all settings

- **Worker Deployment:** 10-15 minutes
  - Create wrangler.toml files
  - Deploy workers
  - Register with orchestrator

- **Netlify Configuration:** 5 minutes
  - Add environment variables
  - Trigger rebuild

- **Verification:** 5 minutes
  - Test DNS, SSL, workers
  - Review configuration

**Total:** 35-45 minutes (excluding DNS propagation time)

---

## Success Criteria

Configuration is complete when:

- ✅ All DNS records are configured
- ✅ SSL/TLS is properly configured
- ✅ Caching and security settings are optimized
- ✅ All Cloudflare Workers are deployed and accessible
- ✅ Environment variables are set in all required locations
- ✅ No placeholder URLs remain in source code
- ✅ All autopilots are registered with orchestrator
- ✅ Frontend can communicate with Workers
- ✅ No broken links in application
- ✅ Netlify build succeeds with new configuration
- ✅ Site is accessible at https://elevateforhumanity.org

---

## Support

### Documentation

- Cloudflare API: https://developers.cloudflare.com/api/
- Cloudflare Workers: https://developers.cloudflare.com/workers/
- Wrangler CLI: https://developers.cloudflare.com/workers/wrangler/

### Existing Scripts

- `scripts/setup_cloudflare.sh` - Manual setup script
- `scripts/get-cloudflare-zone-id.sh` - Get zone ID
- `scripts/test-cloudflare.sh` - Test configuration
- `scripts/register-autopilots.sh` - Register workers

### Guides

- `CLOUDFLARE_API_SETUP.md` - Detailed setup guide
- `CLOUDFLARE_CONFIG_REPORT.md` - Configuration report (generated)

---

## Next Steps

1. **Set Environment Variables**

   ```bash
   export CLOUDFLARE_API_TOKEN="your-token"
   export CLOUDFLARE_ACCOUNT_ID="your-account-id"
   ```

2. **Run Autopilot Configuration**

   ```bash
   bash scripts/autopilot-cloudflare-config.sh
   ```

3. **Review Report**

   ```bash
   cat CLOUDFLARE_CONFIG_REPORT.md
   ```

4. **Deploy Workers** (requires wrangler.toml files)

   ```bash
   wrangler deploy
   ```

5. **Register Autopilots**

   ```bash
   bash scripts/register-autopilots.sh
   ```

6. **Add to Netlify**
   - Add environment variables in Netlify dashboard

7. **Verify and Deploy**
   ```bash
   bash scripts/test-cloudflare.sh
   git add . && git commit -m "chore: configure Cloudflare" && git push
   ```

---

**Status:** Ready to execute  
**Automation Level:** 90% automated (manual steps: API token creation, Netlify variables)  
**Estimated Completion:** 35-45 minutes

---

**Document Version:** 1.0  
**Last Updated:** 2025-10-26  
**Maintained By:** Autopilot System
