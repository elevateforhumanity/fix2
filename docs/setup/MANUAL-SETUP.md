# 🔧 Manual Autopilot Setup

Since the Cloudflare API token needs proper permissions, here's the manual setup process:

## Step 1: Create Cloudflare API Token

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click **"Create Token"**
3. Use **"Edit Cloudflare Workers"** template
4. Ensure these permissions are selected:
   - **Workers Scripts:Edit**
   - **Workers KV Storage:Edit**
   - **Workers Routes:Edit**
   - **Account Settings:Read**
5. Click **"Continue to summary"**
6. Click **"Create Token"**
7. **Copy the token** (you'll only see it once!)

## Step 2: Update .env File

```bash
# Open .env and update this line:
CLOUDFLARE_API_TOKEN=your-new-token-here
```

## Step 3: Run Auto-Configuration

```bash
./scripts/auto-configure-autopilot.sh
```

This will:

- ✅ Generate AUTOPILOT_TOKEN
- ✅ Deploy Durable Object worker
- ✅ Set worker secrets
- ✅ Test deployment

## Step 4: Set GitHub Secret

### Option A: Using GitHub CLI (Recommended)

```bash
# Login to GitHub CLI
gh auth login

# Set the secret
gh secret set AUTOPILOT_TOKEN --body "$(grep AUTOPILOT_TOKEN .env | cut -d'=' -f2)"
```

### Option B: Manual via GitHub UI

1. Go to https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `AUTOPILOT_TOKEN`
4. Value: Copy from `autopilot-config-summary.txt` or `.env`
5. Click **"Add secret"**

## Step 5: Verify Setup

```bash
# Test worker endpoint
curl https://efh-autopilot-metrics.workers.dev/summary

# Should return:
{
  "totalChecks": 0,
  "healthyCount": 0,
  ...
}
```

## Step 6: Trigger First Check

```bash
# Push a commit to trigger workflow
git commit --allow-empty -m "Test autopilot"
git push

# Or trigger manually
gh workflow run advanced-autopilot-inline-check.yml
```

## Step 7: Verify Data Flow

Wait 2-3 minutes, then:

```bash
# Check if data is flowing
curl https://efh-autopilot-metrics.workers.dev/summary | jq

# Should show totalChecks > 0
```

## ✅ Success Checklist

- [ ] Cloudflare API token created with correct permissions
- [ ] `.env` updated with new token
- [ ] Auto-configuration script ran successfully
- [ ] Worker deployed to Cloudflare
- [ ] GitHub secret `AUTOPILOT_TOKEN` set
- [ ] Worker endpoint responds (not 404)
- [ ] Workflow runs show "Durable Storage: ✅ Stored"
- [ ] Data appears in `/summary` endpoint

## 🚨 Troubleshooting

### Worker Deployment Fails

**Error**: "Authentication error [code: 10000]"

**Solution**:

1. Verify token has "Workers Scripts:Edit" permission
2. Create new token if needed
3. Update `.env` and run script again

### GitHub Secret Not Working

**Error**: Workflow shows "⚠️ Not stored"

**Solution**:

1. Verify secret name is exactly `AUTOPILOT_TOKEN`
2. Check secret value matches `.env` file
3. Re-run workflow after fixing

### Worker Returns 404

**Solution**:

1. Check Cloudflare dashboard for deployed worker
2. Wait 2-3 minutes for DNS propagation
3. Verify worker name is `efh-autopilot-metrics`

## 📊 What Happens Next

Once setup is complete:

1. **Every push** triggers inline checks
2. **Results sent** to Durable Object automatically
3. **Data stored** for 30 days
4. **Metrics calculated** (MTBF, MTTR, uptime)
5. **API available** for querying data
6. **Alerts sent** on critical issues

## 🎯 Quick Commands

```bash
# View configuration summary
cat autopilot-config-summary.txt

# Test worker
curl https://efh-autopilot-metrics.workers.dev/summary

# View recent checks
curl https://efh-autopilot-metrics.workers.dev/recent?limit=5 | jq

# Check GitHub secret
gh secret list | grep AUTOPILOT_TOKEN

# View workflow runs
gh run list --workflow=advanced-autopilot-inline-check.yml

# Trigger workflow manually
gh workflow run advanced-autopilot-inline-check.yml
```

## 📝 Current Status

Based on the last run:

```
✅ AUTOPILOT_TOKEN: Generated
✅ Cloudflare: Token exists (needs permissions update)
⚠️  Durable Worker: Deployment failed (token permissions)
⚠️  GitHub Secrets: Not set yet
⚠️  Worker Status: Not deployed yet
```

**Next action**: Create new Cloudflare API token with correct permissions, then run `./scripts/auto-configure-autopilot.sh` again.

---

**Need help?** Check [AUTOPILOT-SETUP.md](AUTOPILOT_SETUP_GUIDE.md) for detailed documentation.
