# 🤖 Autopilot Setup Guide

Complete automation for the Elevate For Humanity project with Durable Objects integration.

## 🚀 Quick Start (Fully Automated)

Run this single command to configure everything automatically:

```bash
./scripts/full-autopilot-setup.sh
```

This script will:

1. ✅ Install Puppeteer (if needed)
2. ✅ Prompt for Cloudflare credentials
3. ✅ Automatically create Cloudflare API token with correct permissions
4. ✅ Generate secure AUTOPILOT_TOKEN
5. ✅ Deploy Durable Object worker to Cloudflare
6. ✅ Set GitHub secrets
7. ✅ Test the complete data flow
8. ✅ Generate configuration summary

## 📋 What You Need

- **Cloudflare Account** (free tier works)
- **Cloudflare Email & Password** (for Puppeteer automation)
- **GitHub CLI** (optional, for automatic secret setting)

## 🎯 What Gets Configured

### 1. Cloudflare API Token

The Puppeteer script automatically:

- Logs into your Cloudflare account
- Creates a new API token named "EFH Autopilot Durable Objects"
- Configures these permissions:
  - Workers Scripts:Edit
  - Workers KV Storage:Edit
  - Workers Routes:Edit
  - Account Settings:Read
  - User Details:Read
- Saves the token to `.env`

### 2. Durable Object Worker

Deploys `efh-autopilot-metrics` worker with:

- Persistent storage for check results
- Historical data tracking (30 days)
- Metrics calculation (MTBF, MTTR, uptime)
- API endpoints for querying data

### 3. GitHub Integration

- Sets `AUTOPILOT_TOKEN` secret
- Enables automatic data flow from workflows
- Configures inline check reporting

### 4. Automatic Data Flow

```
GitHub Actions → Inline Checks → Durable Object → Historical Storage → Metrics API
```

## 📊 Available Endpoints

Once deployed, your metrics are available at:

```bash
# Get summary metrics
curl https://efh-autopilot-metrics.workers.dev/summary

# Get recent checks (last 10)
curl https://efh-autopilot-metrics.workers.dev/recent?limit=10

# Get 24-hour history
curl https://efh-autopilot-metrics.workers.dev/history?hours=24

# Get trend analysis
curl https://efh-autopilot-metrics.workers.dev/trends?hours=24

# Get alert history
curl https://efh-autopilot-metrics.workers.dev/alerts
```

## 🔧 Manual Setup (If Automation Fails)

### Step 1: Create Cloudflare API Token Manually

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use "Edit Cloudflare Workers" template
4. Add permissions:
   - Workers Scripts:Edit
   - Workers KV Storage:Edit
   - Account Settings:Read
5. Copy the token
6. Update `.env`:
   ```bash
   CLOUDFLARE_API_TOKEN=your-token-here
   ```

### Step 2: Run Configuration Script

```bash
./scripts/auto-configure-autopilot.sh
```

### Step 3: Set GitHub Secret Manually

1. Go to https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Add new secret:
   - Name: `AUTOPILOT_TOKEN`
   - Value: (from `autopilot-config-summary.txt`)

## 📈 Metrics Explained

### Summary Metrics

- **Total Checks**: Number of checks stored
- **Healthy/Degraded/Critical**: Status distribution
- **Average Success Rate**: Overall system health percentage
- **Uptime Percentage**: Percentage of healthy checks
- **MTBF**: Mean Time Between Failures (hours)
- **MTTR**: Mean Time To Recovery (hours)

### Check Result Structure

```json
{
  "timestamp": "2025-10-31T13:00:00Z",
  "runId": "12345",
  "branch": "main",
  "commit": "abc123",
  "checks": {
    "typecheck": "passed",
    "eslint": "passed",
    "build": "passed",
    "durableHealth": "passed",
    "durableTests": "passed",
    "envCheck": "passed",
    "fileCheck": "passed",
    "jsonCheck": "passed"
  },
  "overall": {
    "status": "healthy",
    "passed": 8,
    "failed": 0,
    "total": 8,
    "successRate": 100
  },
  "autoFixAttempted": false,
  "alertSent": false,
  "issueCreated": false
}
```

## 🔄 How It Works

### Automatic Workflow

1. **Trigger**: Push to main/develop, PR, or hourly schedule
2. **Checks Run**: 8 comprehensive checks execute
3. **Results Collected**: Success/failure status gathered
4. **Data Sent**: Results POST to Durable Object
5. **Storage**: Data persisted in Durable Object
6. **Metrics**: Calculated and available via API
7. **Alerts**: Sent if status is critical

### Data Retention

- **Recent Checks**: Last 1000 checks in memory
- **Historical Data**: 30 days in Durable Object storage
- **Automatic Cleanup**: Runs daily via alarm

## 🛠️ Troubleshooting

### Puppeteer Fails to Create Token

- **Issue**: 2FA enabled on Cloudflare account
- **Solution**: Script waits 60 seconds for manual 2FA completion

### Worker Deployment Fails

- **Issue**: API token lacks permissions
- **Solution**: Manually add "Workers Scripts:Edit" permission

### GitHub Secret Not Set

- **Issue**: GitHub CLI not authenticated
- **Solution**: Run `gh auth login` or set manually

### Worker Not Responding

- **Issue**: Deployment propagation delay
- **Solution**: Wait 2-3 minutes and try again

## 📝 Configuration Files

- `workers/autopilot-metrics-durable.ts` - Durable Object implementation
- `workers/wrangler-metrics.toml` - Worker configuration
- `.github/workflows/advanced-autopilot-inline-check.yml` - GitHub workflow
- `scripts/full-autopilot-setup.sh` - Complete setup automation
- `scripts/puppeteer-cloudflare-token.js` - Token creation automation
- `scripts/auto-configure-autopilot.sh` - Configuration automation

## 🎉 Success Indicators

When fully configured, you'll see:

- ✅ Worker deployed at `https://efh-autopilot-metrics.workers.dev`
- ✅ GitHub workflow runs show "Durable Storage: ✅ Stored"
- ✅ API endpoints return data
- ✅ Metrics accumulate over time
- ✅ Alerts sent on critical issues

## 🔐 Security Notes

- **AUTOPILOT_TOKEN**: 64-character random hex string
- **Cloudflare API Token**: Scoped to Workers only
- **GitHub Secrets**: Encrypted at rest
- **API Endpoints**: Read endpoints are public, write requires auth

## 📞 Support

If you encounter issues:

1. Check `autopilot-config-summary.txt` for status
2. Review GitHub Actions logs
3. Test worker endpoint manually
4. Verify Cloudflare dashboard shows deployed worker

## 🚀 Next Steps

After setup:

1. Monitor first few workflow runs
2. Check metrics API for data
3. Customize alert thresholds if needed
4. Build dashboard for visualization (optional)

---

**Automatic Configuration Complete!** 🎉

Your autopilot is now running and feeding data into Durable Objects automatically.
