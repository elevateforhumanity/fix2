# 🤖 Automated Vercel Environment Variable Update

## Automatic Domain Migration Configuration

I've created automated workers to update Vercel environment variables for the domain migration.

---

## Option 1: Run Node.js Script (EASIEST)

### Prerequisites:

- Vercel API token

### Get Your Vercel Token:

1. Go to: https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it: "Domain Migration"
4. Copy the token

### Run the Script:

```bash
# Set your Vercel token
export VERCEL_TOKEN=your_token_here

# Run the updater
node scripts/update-vercel-env-vars.mjs
```

### What It Does:

1. ✅ Fetches existing environment variables
2. ✅ Deletes old `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_APP_URL`
3. ✅ Creates new variables with `https://www.elevateforhumanity.org`
4. ✅ Applies to ALL environments (production, preview, development)
5. ✅ Triggers fresh deployment without cache
6. ✅ Returns deployment URL for monitoring

### Expected Output:

```
🔧 Vercel Environment Variable Updater
=====================================

📦 Project ID: prj_I89m6xUtwJlmA3qSE8Su7jIF7Xg7
👥 Team ID: team_Xj2yJdLklcMExBxDPK7I2G4w

📋 Step 1: Fetching existing environment variables...
   Found 25 existing variables

🔄 Step 2: Updating environment variables...

   Processing: NEXT_PUBLIC_SITE_URL
   - Found existing variable (ID: env_xxx)
   - Old value: https://elevateconnectsdirectory.org
   - Deleting old variable...
   ✓ Deleted
   - Creating new variable with value: https://www.elevateforhumanity.org
   ✓ Created (ID: env_yyy)

   Processing: NEXT_PUBLIC_APP_URL
   - Found existing variable (ID: env_zzz)
   - Old value: https://elevateconnectsdirectory.org
   - Deleting old variable...
   ✓ Deleted
   - Creating new variable with value: https://www.elevateforhumanity.org
   ✓ Created (ID: env_aaa)

🚀 Step 3: Triggering new deployment...
   ✓ Deployment triggered
   - Deployment ID: dpl_xxx
   - URL: https://fix2-gpql-xxx.vercel.app

✅ SUCCESS!

Environment variables updated:
  - NEXT_PUBLIC_SITE_URL = https://www.elevateforhumanity.org
  - NEXT_PUBLIC_APP_URL = https://www.elevateforhumanity.org

📊 Monitor deployment at:
   https://vercel.com/elevate-48e460c9/fix2-gpql/deployments/dpl_xxx

⏱️  Deployment typically takes 2-5 minutes
```

---

## Option 2: Deploy Cloudflare Worker (ADVANCED)

### Prerequisites:

- Cloudflare account
- Wrangler CLI installed

### Deploy the Worker:

```bash
# Run the deployment script
./scripts/deploy-vercel-env-updater.sh
```

### Set Secrets:

```bash
cd workers

# Set Vercel credentials
wrangler secret put VERCEL_TOKEN --config wrangler-vercel-env-updater.toml
wrangler secret put VERCEL_PROJECT_ID --config wrangler-vercel-env-updater.toml
wrangler secret put VERCEL_TEAM_ID --config wrangler-vercel-env-updater.toml
```

### Trigger the Update:

```bash
curl -X POST https://vercel-env-updater.elevateforhumanity.workers.dev
```

---

## What Gets Updated:

### Environment Variables:

| Variable               | Old Value                              | New Value                            |
| ---------------------- | -------------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | `https://elevateconnectsdirectory.org` | `https://www.elevateforhumanity.org` |
| `NEXT_PUBLIC_APP_URL`  | `https://elevateconnectsdirectory.org` | `https://www.elevateforhumanity.org` |

### Environments:

- ✅ Production
- ✅ Preview
- ✅ Development

### Actions Taken:

1. Delete old variables
2. Create new variables with www subdomain
3. Trigger fresh deployment
4. Clear build cache

---

## Verification:

After the script runs, verify the changes:

### 1. Check Vercel Dashboard:

https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables

You should see:

- `NEXT_PUBLIC_SITE_URL` = `https://www.elevateforhumanity.org`
- `NEXT_PUBLIC_APP_URL` = `https://www.elevateforhumanity.org`

### 2. Check Deployment:

https://vercel.com/elevate-48e460c9/fix2-gpql/deployments

Latest deployment should be:

- Status: "Ready" (green checkmark)
- Commit: Latest from main branch
- Time: Within last 5 minutes

### 3. Test the Site:

```bash
# Check build info
curl https://www.elevateforhumanity.org/api/build-info

# Should return:
{
  "deployment": {
    "timestamp": "AGGRESSIVE_REBUILD_...",
    ...
  }
}
```

### 4. Verify Domain:

- Visit: https://www.elevateforhumanity.org
- Check that all links use www subdomain
- Verify sitemap: https://www.elevateforhumanity.org/sitemap.xml

---

## Troubleshooting:

### Error: "Failed to get env vars: 401"

**Solution:** Your VERCEL_TOKEN is invalid or expired

- Generate a new token at https://vercel.com/account/tokens
- Make sure it has "Full Access" permissions

### Error: "Failed to get env vars: 403"

**Solution:** Token doesn't have access to the project

- Verify you're using the correct team ID
- Check token permissions include project access

### Error: "Failed to trigger deployment"

**Solution:** Check GitHub integration

- Verify Vercel is connected to GitHub
- Check that auto-deployments are enabled

### Deployment Stuck in "Building"

**Solution:** Check build logs

- Go to deployment in Vercel dashboard
- Click "View Build Logs"
- Look for errors

---

## Files Created:

1. **scripts/update-vercel-env-vars.mjs**
   - Node.js script to update env vars
   - Can run locally or in CI/CD

2. **workers/vercel-env-updater.ts**
   - Cloudflare Worker for automated updates
   - Can be triggered via HTTP

3. **workers/wrangler-vercel-env-updater.toml**
   - Wrangler configuration for worker

4. **scripts/deploy-vercel-env-updater.sh**
   - Deployment script for Cloudflare Worker

---

## Next Steps After Running:

1. ✅ Wait 2-5 minutes for deployment to complete
2. ✅ Verify environment variables in Vercel dashboard
3. ✅ Test https://www.elevateforhumanity.org
4. ✅ Submit sitemap to Google Search Console
5. ✅ Submit sitemap to Bing Webmaster Tools
6. ✅ Monitor analytics for traffic

---

## Support:

If you encounter issues:

1. Check the deployment logs in Vercel
2. Verify your VERCEL_TOKEN has correct permissions
3. Ensure GitHub integration is active
4. Check that DNS is properly configured

**Status:** ✅ Automation Ready
**Recommended:** Run Option 1 (Node.js script) - it's the simplest!
