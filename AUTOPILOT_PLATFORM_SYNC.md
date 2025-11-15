# Autopilot Platform Sync (Netlify ↔ Vercel)

## 🔄 What This Does

Keeps Netlify and Vercel **perfectly synchronized** with identical environment variables. No more "it works on Netlify but not Vercel" or vice versa.

Your autopilot can:
1. **Sync all environment variables** between both platforms
2. **Ensure consistency** across production, preview, and development
3. **Optionally trigger deploys** on both platforms
4. **Run automatically** on a schedule or on-demand

---

## 📁 Files Created

### 1. `scripts/autopilot-sync-platforms.sh`
The sync worker that:
- Validates credentials for both platforms
- Installs Vercel and Netlify CLIs
- Syncs all environment variables to both platforms
- Handles all environments (production, preview, development)
- Provides detailed summary of what was synced

### 2. `.github/workflows/autopilot-sync-platforms.yml`
GitHub Actions workflow that:
- Can be triggered manually or via API
- Runs the sync script with all secrets
- Optionally triggers deploys on both platforms
- Provides a summary of sync results

---

## 🔐 Required GitHub Secrets

Add these to: **Settings** → **Secrets and variables** → **Actions**

### Vercel Credentials

| Secret Name | Description |
|-------------|-------------|
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | Your Vercel organization ID |
| `VERCEL_PROJECT_ID` | Your Vercel project ID |

### Netlify Credentials

| Secret Name | Description |
|-------------|-------------|
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token |
| `NETLIFY_SITE_ID` | Your Netlify site ID |

### Application Secrets (Same as before)

All the same secrets from `AUTOPILOT_VERCEL_WORKER.md`:
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `RESEND_API_KEY`
- `VAPID_PUBLIC_KEY`
- `VAPID_PRIVATE_KEY`
- etc.

---

## 🔍 How to Get Netlify Credentials

### NETLIFY_AUTH_TOKEN

1. Go to [Netlify User Settings](https://app.netlify.com/user/applications)
2. Click **New access token**
3. Give it a name (e.g., "GitHub Actions Autopilot")
4. Copy the token (you won't see it again)

### NETLIFY_SITE_ID

**Method 1: From Netlify Dashboard**
1. Go to your site in Netlify
2. **Site settings** → **General**
3. Look for **Site information** → **API ID**

**Method 2: From URL**
When viewing your site, the URL looks like:
```
https://app.netlify.com/sites/your-site-name/overview
```
The site name is your site ID.

**Method 3: Using Netlify CLI**
```bash
netlify sites:list
```

---

## 🚀 How to Use

### Option 1: Manual Trigger (GitHub UI)

1. Go to **Actions** tab
2. Select **Autopilot - Sync Netlify & Vercel Environments**
3. Click **Run workflow**
4. Choose options:
   - **trigger_deploys**: Check to deploy to both platforms
5. Click **Run workflow**

### Option 2: Programmatic Trigger (Autopilot API)

```bash
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/elevateforhumanity/fix2/actions/workflows/autopilot-sync-platforms.yml/dispatches \
  -d '{"ref":"main","inputs":{"trigger_deploys":"true"}}'
```

### Option 3: Automatic Schedule (Optional)

Uncomment the schedule section in the workflow file to run automatically:

```yaml
schedule:
  - cron: '0 0 * * 0'  # Weekly on Sunday at midnight
```

---

## 📊 What Gets Synchronized

### Core Application Variables

| Variable | Synced To |
|----------|-----------|
| `NEXT_PUBLIC_SITE_URL` | Vercel (prod/preview/dev) + Netlify (prod/preview/branch) |
| `NEXT_PUBLIC_APP_URL` | Vercel (prod/preview/dev) + Netlify (prod/preview/branch) |
| `NEXT_PUBLIC_BASE_URL` | Vercel (prod/preview/dev) + Netlify (prod/preview/branch) |
| `NODE_ENV` | Vercel (prod/preview/dev) + Netlify (prod/preview/branch) |

### Supabase Variables

| Variable | Synced To |
|----------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Both platforms, all environments |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Both platforms, all environments |
| `SUPABASE_SERVICE_ROLE_KEY` | Both platforms, all environments |

### Optional Integrations

All optional variables (if provided as secrets):
- Stripe (secret, publishable, webhook)
- Resend (API key)
- VAPID (public, private, subject)
- AWS (access key, secret, region, bucket)
- OpenAI (API key)
- Google Cloud (credentials)

---

## 🔄 Sync Flow

```
┌─────────────────────────────────────┐
│  GitHub Actions Trigger             │
│  (Manual, API, or Scheduled)        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Sync Script Starts                 │
│  - Validates all credentials        │
│  - Installs CLIs                    │
└──────────────┬──────────────────────┘
               │
               ├──────────────────────┐
               ▼                      ▼
┌──────────────────────┐  ┌──────────────────────┐
│  Sync to Vercel      │  │  Sync to Netlify     │
│  - Production        │  │  - Production        │
│  - Preview           │  │  - Deploy Preview    │
│  - Development       │  │  - Branch Deploy     │
└──────────────────────┘  └──────────────────────┘
               │                      │
               └──────────┬───────────┘
                          ▼
               ┌─────────────────────────────────┐
               │  Optional: Trigger Deploys      │
               │  - Vercel production            │
               │  - Netlify production           │
               └─────────────────────────────────┘
```

---

## 🎯 Use Cases

### 1. Initial Setup
Run once to configure both platforms identically:
```bash
# Trigger via GitHub Actions UI
# Or via API with trigger_deploys=true
```

### 2. Secret Rotation
When you rotate a secret (e.g., Stripe key):
1. Update the GitHub Secret
2. Run the sync workflow
3. Both platforms get the new value

### 3. Adding New Integration
When adding a new service (e.g., AWS S3):
1. Add the secrets to GitHub
2. Run the sync workflow
3. Both platforms get the new variables

### 4. Disaster Recovery
If one platform's env vars get corrupted:
1. Run the sync workflow
2. Both platforms reset to correct values

### 5. Automated Maintenance
Enable the schedule to keep platforms in sync weekly:
```yaml
schedule:
  - cron: '0 0 * * 0'  # Every Sunday
```

---

## 🛡️ Safety Features

### ✅ What's Protected

- **No destructive operations** - only adds/updates variables
- **Validates credentials** before making changes
- **Atomic operations** - each variable is set independently
- **Error handling** - continues even if one variable fails
- **Detailed logging** - shows exactly what was synced

### ⚠️ What to Watch

- **Overwrites existing values** - sync is one-way from GitHub Secrets
- **All environments** - affects production, preview, and development
- **Both platforms** - changes apply to Netlify AND Vercel

---

## 🧪 Testing the Sync

### 1. Dry Run (Validate Credentials)

```bash
# Set test credentials
export VERCEL_TOKEN="your_token"
export VERCEL_ORG_ID="your_org"
export VERCEL_PROJECT_ID="your_project"
export NETLIFY_AUTH_TOKEN="your_token"
export NETLIFY_SITE_ID="your_site"
export SUPABASE_ANON_KEY="test"
export SUPABASE_SERVICE_ROLE_KEY="test"

# Run script
./scripts/autopilot-sync-platforms.sh
```

### 2. Verify Sync Results

**Vercel:**
```bash
vercel env ls --token $VERCEL_TOKEN
```

**Netlify:**
```bash
netlify env:list --auth $NETLIFY_AUTH_TOKEN --site $NETLIFY_SITE_ID
```

**Or check dashboards:**
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Environment variables

---

## 🔧 Troubleshooting

### Error: "NETLIFY_AUTH_TOKEN is missing"

**Solution:** Add token to GitHub Secrets

### Error: "Site not found"

**Solution:** Verify `NETLIFY_SITE_ID` is correct

### Error: "Project not found"

**Solution:** Verify `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are correct

### Variables not syncing

**Solution:**
1. Check GitHub Secrets are set correctly
2. Verify tokens have necessary permissions
3. Check workflow logs for specific errors

### One platform syncs, other fails

**Solution:**
- Script continues even if one platform fails
- Check logs to see which platform had issues
- Verify credentials for the failing platform

---

## 📈 Monitoring

### GitHub Actions Logs

View detailed sync logs:
1. **Actions** tab
2. Click on workflow run
3. Expand "Sync environment variables" step

### Platform Verification

After sync, verify in dashboards:
- **Vercel:** Settings → Environment Variables
- **Netlify:** Site settings → Environment variables

### Sync Summary

The workflow provides a summary showing:
- Number of variables synced to each platform
- Which environments were updated
- Whether deploys were triggered

---

## 🔄 Integration with Other Workflows

### Trigger After Secret Updates

```yaml
# In another workflow
- name: Sync platforms after secret update
  uses: actions/github-script@v7
  with:
    script: |
      await github.rest.actions.createWorkflowDispatch({
        owner: context.repo.owner,
        repo: context.repo.repo,
        workflow_id: 'autopilot-sync-platforms.yml',
        ref: 'main'
      })
```

### Chain with Deployment Workflows

```yaml
# After successful deploy to one platform
- name: Sync to other platform
  run: |
    curl -X POST \
      -H "Authorization: Bearer ${{ secrets.GITHUB_TOKEN }}" \
      https://api.github.com/repos/${{ github.repository }}/actions/workflows/autopilot-sync-platforms.yml/dispatches \
      -d '{"ref":"main"}'
```

---

## 📚 Related Documentation

- `AUTOPILOT_VERCEL_WORKER.md` - Vercel-only configuration
- `VERCEL_DEPLOYMENT_FIX_GUIDE.md` - Manual Vercel setup
- `ELEVATE_ENV_CHECKLIST.md` - Complete environment variable list

---

## 🎯 Quick Reference

### Sync Both Platforms
```
Actions → Autopilot - Sync Netlify & Vercel Environments → Run workflow
```

### Sync + Deploy Both
```
Actions → Autopilot - Sync Netlify & Vercel Environments → 
  ✓ trigger_deploys → Run workflow
```

### Verify Sync
```bash
# Vercel
vercel env ls --token $VERCEL_TOKEN

# Netlify
netlify env:list --auth $NETLIFY_AUTH_TOKEN
```

### Trigger via API
```bash
curl -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/elevateforhumanity/fix2/actions/workflows/autopilot-sync-platforms.yml/dispatches \
  -d '{"ref":"main","inputs":{"trigger_deploys":"true"}}'
```

---

## 💡 Pro Tips

### 1. Use Sync for Consistency
Run sync before important deploys to ensure both platforms are identical.

### 2. Schedule Regular Syncs
Enable the weekly schedule to catch any drift between platforms.

### 3. Sync After Secret Rotation
Always run sync after updating any GitHub Secret.

### 4. Test on Preview First
Use preview/deploy-preview environments to test changes before production.

### 5. Monitor Both Platforms
Check both Vercel and Netlify dashboards after sync to verify.

---

**Status:** ✅ Ready for autopilot integration
**Last Updated:** 2025-11-15
**Maintainer:** Autopilot System
