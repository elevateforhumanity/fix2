# Cloudflare API Token Setup - Required for Worker Deployment

## Current Status

- ✅ Cloudflare Worker code ready: `workers/enrollment-injector-worker.ts`
- ✅ Worker configuration ready: `wrangler-enrollment.toml`
- ✅ GitHub Actions workflow ready: `.github/workflows/cloudflare-worker-deploy.yml`
- ❌ **BLOCKED:** Invalid Cloudflare API token

## Why Autopilot Cannot Create Token

Cloudflare API tokens **cannot be created programmatically** without existing authentication:

- Need Global API Key OR valid API token to create new tokens
- Current token in `.env` is invalid (returns 403/1000 error)
- Puppeteer automation requires Cloudflare login credentials (email + password)

## Solution: Manual Token Creation (One-Time Setup)

### Step 1: Create API Token

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Click "Create Custom Token"
4. Configure:
   - **Token name:** `EFH Autopilot Worker Deploy`
   - **Permissions:**
     - Account > Workers Scripts > Edit
     - Account > Workers Routes > Edit
   - **Account Resources:** Include > Your Account
5. Click "Continue to summary"
6. Click "Create Token"
7. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Add Token to GitHub Secrets

1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Click "New repository secret"
3. Name: `CLOUDFLARE_API_TOKEN`
4. Value: Paste the token you copied
5. Click "Add secret"

### Step 3: Trigger Deployment

The worker will deploy automatically when you:

- Push changes to `workers/` folder, OR
- Push changes to `wrangler*.toml` files, OR
- Manually trigger workflow at: https://github.com/elevateforhumanity/fix2/actions/workflows/cloudflare-worker-deploy.yml

### Step 4: Verify Deployment

After deployment completes:

```bash
# Check if worker is live
curl https://enrollment-injector.workers.dev

# Or check on your domain (after routes are configured)
curl https://www.elevateforhumanity.org | grep "Enroll in Our Programs"
```

## Alternative: Use Global API Key (Not Recommended)

If you have your Cloudflare Global API Key:

```bash
export CLOUDFLARE_EMAIL="elevateforhumanity@gmail.com"
export CLOUDFLARE_GLOBAL_API_KEY="your-global-key"
node scripts/create-cloudflare-token.cjs
```

This will create a new API token automatically.

## What Happens After Token is Added

1. **Automatic Deployment:** GitHub Actions will deploy the worker
2. **Worker Goes Live:** Enrollment injector activates at CDN edge
3. **Durable Integration:** Enrollment programs appear on www.elevateforhumanity.org
4. **Zero Manual Work:** All future updates deploy automatically

## Files Ready for Deployment

- `workers/enrollment-injector-worker.ts` - Worker code
- `wrangler-enrollment.toml` - Worker configuration
- `.github/workflows/cloudflare-worker-deploy.yml` - Deployment automation
- `public/enrollment-injector.js` - Backup script on Netlify

## Current Workaround

Until Cloudflare Worker is deployed, you can manually add the enrollment script to Durable:

1. Go to site editor
2. Add custom HTML block
3. Paste:

```html
<script src="https://main--elevateforhumanityfix.netlify.app/enrollment-injector.js"></script>
```

This will inject enrollment programs on the page.

---

**Bottom Line:** Autopilot cannot create Cloudflare API tokens without existing credentials. One-time manual token creation required, then everything is automated.
