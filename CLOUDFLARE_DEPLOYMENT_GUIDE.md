# Cloudflare Worker Deployment Guide

## Current Status

✅ **Code Ready** - All worker files are in the repository  
✅ **GitHub Actions Configured** - Workflow is set up and triggering  
✅ **Secrets Added** - CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID are in GitHub  
❌ **Deployment Failing** - Worker deployment returns exit code 1

## The Problem

The GitHub Actions workflow is failing during the `wrangler deploy` step. This is likely due to one of:

1. **API Token Permissions** - The token might not have the correct permissions
2. **Zone Configuration** - The domain might not be properly configured in Cloudflare
3. **Account Access** - The token might not have access to the account

## Solution: Manual Deployment

Since the GitHub secrets are configured but deployment is failing, let's deploy manually to see the actual error:

### Step 1: Get Your Cloudflare API Token

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Find your existing token OR create a new one with these permissions:
   - **Account** > **Cloudflare Workers Scripts** > **Edit**
   - **Zone** > **Workers Routes** > **Edit**
   - **Zone** > **DNS** > **Read** (optional, for route configuration)

### Step 2: Deploy from Gitpod

Run these commands in your Gitpod terminal:

```bash
cd /workspaces/fix2

# Set your API token (replace with your actual token)
export CLOUDFLARE_API_TOKEN="your_token_here"

# Deploy the worker
wrangler deploy --config wrangler-enrollment.toml --env production
```

### Step 3: Check the Output

The command will show you:

- ✅ If successful: Worker URL (e.g., `https://enrollment-injector.your-subdomain.workers.dev`)
- ❌ If failed: The actual error message

### Step 4: Configure Routes (After Successful Deployment)

Once the worker deploys successfully, you need to configure routes in Cloudflare:

1. Go to https://dash.cloudflare.com
2. Select your domain: **elevateforhumanity.org**
3. Go to **Workers Routes** (in the sidebar)
4. Click **Add Route**
5. Add these routes:
   - Route: `elevateforhumanity.org/*`
   - Worker: `enrollment-injector`
   - Click **Save**
6. Repeat for:
   - Route: `www.elevateforhumanity.org/*`
   - Worker: `enrollment-injector`

## Alternative: Update GitHub Secret

If the manual deployment works, but GitHub Actions still fails, the issue is with the GitHub secret:

1. Go to https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Delete the existing `CLOUDFLARE_API_TOKEN`
3. Create a new one with the token that worked manually

## What Happens After Deployment

Once deployed and routes are configured:

1. **DNS-Level Interception**: All traffic to elevateforhumanity.org goes through the worker
2. **Automatic Injection**: The worker fetches HTML from Durable.co and injects enrollment programs
3. **Zero Manual Work**: Runs autonomously on Cloudflare's edge network
4. **Real Programs Displayed**:
   - Barber Training Program
   - Building Technology Program
   - Certified Nursing Assistant (CNA)

## Files in Repository

- `workers/enrollment-injector-worker.ts` - The autopilot worker code
- `wrangler-enrollment.toml` - Worker configuration
- `.github/workflows/cloudflare-worker-deploy.yml` - GitHub Actions workflow
- `DURABLE_ENROLLMENT_CODE.html` - The enrollment HTML being injected
- `CLOUDFLARE_WORKER_SOLUTION.md` - Complete technical documentation

## Need Help?

If you see an error during manual deployment, share the error message and I can help troubleshoot.

The most common issues are:

- **"Authentication error"** - Token is invalid or expired
- **"Insufficient permissions"** - Token doesn't have Workers Scripts Edit permission
- **"Zone not found"** - Domain isn't added to your Cloudflare account
- **"Route already exists"** - Another worker is using the same route

---

**Remember**: This is the intelligent solution you asked for - "How the autopilot signal the worker thru dns". The worker IS the autopilot, running at the DNS level, intercepting all traffic before it reaches Durable.co.
