# 🧪 Test Autopilot Configuration

## Quick Test Guide

### Step 1: Run Full Setup

```bash
./scripts/full-autopilot-setup.sh
```

**What it does:**

- Prompts for Cloudflare email/password
- Launches Puppeteer browser (you'll see it)
- Logs into Cloudflare
- Creates API token automatically
- Deploys Durable Object worker
- Sets GitHub secrets
- Tests everything

**Expected Output:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Full Autopilot Setup - Complete Automation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Credentials loaded
✅ Browser launched
✅ Logged in successfully
✅ API token created
✅ Worker deployed
✅ GitHub secret set
✅ Worker responding

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ AUTOPILOT FULLY CONFIGURED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 2: Verify Worker Deployment

```bash
# Check if worker is live
curl https://efh-autopilot-metrics.workers.dev/summary

# Expected response:
{
  "totalChecks": 0,
  "healthyCount": 0,
  "degradedCount": 0,
  "criticalCount": 0,
  "averageSuccessRate": 0,
  "lastCheck": null,
  "recentChecks": [],
  "uptimePercentage": 0,
  "mtbf": 0,
  "mttr": 0
}
```

### Step 3: Trigger GitHub Workflow

```bash
# Trigger the inline check workflow manually
gh workflow run advanced-autopilot-inline-check.yml

# Or just push a commit
git commit --allow-empty -m "Test autopilot data flow"
git push
```

### Step 4: Watch Data Flow

```bash
# Wait 2-3 minutes for workflow to complete, then check:
curl https://efh-autopilot-metrics.workers.dev/summary | jq

# You should see:
{
  "totalChecks": 1,
  "healthyCount": 1,
  "degradedCount": 0,
  "criticalCount": 0,
  "averageSuccessRate": 100,
  "lastCheck": {
    "timestamp": "2025-10-31T13:45:00Z",
    "runId": "12345",
    "branch": "main",
    "commit": "abc123",
    "checks": { ... },
    "overall": {
      "status": "healthy",
      "passed": 8,
      "failed": 0,
      "total": 8,
      "successRate": 100
    }
  },
  "recentChecks": [ ... ],
  "uptimePercentage": 100,
  "mtbf": 0,
  "mttr": 0
}
```

### Step 5: View Recent Checks

```bash
# Get last 5 checks
curl https://efh-autopilot-metrics.workers.dev/recent?limit=5 | jq

# Get 24-hour history
curl https://efh-autopilot-metrics.workers.dev/history?hours=24 | jq

# Get trend analysis
curl https://efh-autopilot-metrics.workers.dev/trends?hours=24 | jq
```

## 🎯 Success Criteria

✅ **Worker Deployed**: `curl` returns valid JSON (not 404)
✅ **GitHub Secret Set**: Workflow shows "Durable Storage: ✅ Stored"
✅ **Data Flowing**: `totalChecks` increases after each workflow run
✅ **Metrics Calculated**: `averageSuccessRate`, `uptimePercentage` show values
✅ **Historical Data**: `/history` endpoint returns check results

## 🔍 Debugging

### Worker Not Responding

```bash
# Check Cloudflare dashboard
open https://dash.cloudflare.com/workers

# Check wrangler logs
cd workers
wrangler tail --config wrangler-metrics.toml
```

### Data Not Flowing

```bash
# Check GitHub workflow logs
gh run list --workflow=advanced-autopilot-inline-check.yml

# View specific run
gh run view <run-id> --log
```

### Token Issues

```bash
# Verify token in .env
grep AUTOPILOT_TOKEN .env

# Verify GitHub secret
gh secret list | grep AUTOPILOT_TOKEN
```

## 📊 Expected Timeline

| Time    | Event                          | Status         |
| ------- | ------------------------------ | -------------- |
| T+0     | Run setup script               | 🚀 Starting    |
| T+1min  | Puppeteer creates token        | 🤖 Automating  |
| T+2min  | Worker deployed                | ☁️ Deploying   |
| T+3min  | GitHub secret set              | 🔐 Configuring |
| T+5min  | First workflow runs            | ✅ Testing     |
| T+8min  | Data appears in Durable Object | 📊 Flowing     |
| T+10min | Metrics available via API      | 🎉 Complete    |

## 🎉 What Success Looks Like

After successful setup:

1. **Cloudflare Dashboard**: Shows `efh-autopilot-metrics` worker
2. **GitHub Actions**: Workflows show "Durable Storage: ✅ Stored"
3. **API Endpoints**: Return real data
4. **Automatic Flow**: Every push triggers check → stores data → updates metrics

## 🚨 Common Issues

### Issue: Puppeteer Can't Login

**Solution**: Check Cloudflare email/password, handle 2FA manually

### Issue: Worker Deployment Fails

**Solution**: Verify API token has "Workers Scripts:Edit" permission

### Issue: GitHub Secret Not Set

**Solution**: Run `gh auth login` or set manually in GitHub UI

### Issue: Data Not Storing

**Solution**: Check AUTOPILOT_TOKEN matches in GitHub secrets and worker

## 📝 Manual Verification Checklist

- [ ] `.env` has `CLOUDFLARE_API_TOKEN`
- [ ] `.env` has `AUTOPILOT_TOKEN`
- [ ] Worker visible in Cloudflare dashboard
- [ ] GitHub secret `AUTOPILOT_TOKEN` is set
- [ ] Worker responds to `/summary` endpoint
- [ ] Workflow shows "Durable Storage: ✅ Stored"
- [ ] Data appears in API responses
- [ ] Metrics update after each workflow run

---

**Ready to test?** Run: `./scripts/full-autopilot-setup.sh`
