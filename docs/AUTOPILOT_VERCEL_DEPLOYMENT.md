# Autopilot Vercel Deployment

## Overview

The Autopilot system automates deployment to Vercel using Cloudflare Workers to manage the deployment pipeline.

**Target Deployment**: `fix2-1c7w-git-main-gitpod.vercel.app`

## Architecture

```
┌─────────────────┐
│  GitHub Repo    │
│  (main branch)  │
└────────┬────────┘
         │
         │ push
         ▼
┌─────────────────┐      ┌──────────────────┐
│ Autopilot Worker│◄────►│  Vercel API      │
│ (Cloudflare)    │      │  (Deployments)   │
└────────┬────────┘      └──────────────────┘
         │
         │ monitors
         ▼
┌─────────────────┐
│  fix2-1c7w      │
│  (Production)   │
└─────────────────┘
```

## Components

### 1. Vercel Autopilot Worker

**File**: `workers/vercel-autopilot-worker.ts`

**Capabilities**:
- Trigger deployments via GitHub push
- Check deployment status
- Add custom domains
- Manage environment variables
- Perform health checks
- Scheduled monitoring (every 10 minutes)

**API Endpoints**:
- `POST /` with `task: "trigger_deploy"` - Trigger deployment
- `POST /` with `task: "check_deploy_status"` - Check status
- `POST /` with `task: "get_deployments"` - List deployments
- `POST /` with `task: "add_domain"` - Add custom domain
- `POST /` with `task: "add_env_vars"` - Add environment variables
- `POST /` with `task: "health_check"` - Run health check

### 2. Deployment Script

**File**: `scripts/autopilot-deploy-to-vercel.sh`

**Features**:
- Automatic commit of changes
- Triggers autopilot worker
- Monitors deployment progress
- Runs health checks
- Provides deployment status

### 3. Wrangler Configuration

**File**: `workers/wrangler-vercel-autopilot.toml`

**Settings**:
- Cron schedule: Every 10 minutes
- Environment: Production
- Compatibility: 2024-11-15

## Setup

### Prerequisites

1. **Cloudflare Account**
   - Sign up at https://cloudflare.com
   - Get API token

2. **Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

3. **Vercel Token**
   - Go to https://vercel.com/account/tokens
   - Create new token with full access

4. **GitHub Token**
   - Go to https://github.com/settings/tokens
   - Create token with `repo` scope

### Step 1: Deploy Autopilot Worker

```bash
cd workers

# Login to Cloudflare
wrangler login

# Set secrets
wrangler secret put AUTOPILOT_TOKEN --config wrangler-vercel-autopilot.toml
wrangler secret put VERCEL_TOKEN --config wrangler-vercel-autopilot.toml
wrangler secret put VERCEL_PROJECT_ID --config wrangler-vercel-autopilot.toml
wrangler secret put VERCEL_TEAM_ID --config wrangler-vercel-autopilot.toml
wrangler secret put GITHUB_TOKEN --config wrangler-vercel-autopilot.toml
wrangler secret put SUPABASE_URL --config wrangler-vercel-autopilot.toml

# Deploy worker
wrangler deploy --config wrangler-vercel-autopilot.toml
```

### Step 2: Get Vercel Project Details

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Get project info
vercel ls

# Find project ID
vercel inspect fix2-1c7w
```

Or from Vercel dashboard:
1. Go to https://vercel.com/dashboard
2. Select project: fix2-1c7w
3. Go to Settings → General
4. Copy Project ID and Team ID

### Step 3: Configure Environment

Add to your `.env`:

```bash
# Autopilot Configuration
AUTOPILOT_TOKEN=your_secure_token_here
VERCEL_TOKEN=your_vercel_token
VERCEL_PROJECT_ID=prj_xxx
VERCEL_TEAM_ID=team_xxx
GITHUB_TOKEN=ghp_xxx
```

### Step 4: Test Deployment

```bash
# Using autopilot
npm run deploy:vercel

# Or manually
bash scripts/autopilot-deploy-to-vercel.sh
```

## Usage

### Deploy with Autopilot

```bash
npm run deploy:vercel
```

This will:
1. ✅ Commit all changes
2. ✅ Push to GitHub
3. ✅ Trigger Vercel deployment
4. ✅ Monitor deployment status
5. ✅ Run health checks

### Manual Deployment

If autopilot is not available:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel will automatically deploy from GitHub.

### Check Deployment Status

```bash
curl -X POST https://your-worker.workers.dev \
  -H "Authorization: Bearer $AUTOPILOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "task": "get_deployments"
  }'
```

### Add Environment Variables

```bash
curl -X POST https://your-worker.workers.dev \
  -H "Authorization: Bearer $AUTOPILOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "task": "add_env_vars",
    "data": {
      "variables": {
        "NEXT_PUBLIC_VAPID_PUBLIC_KEY": "your_key",
        "VAPID_PRIVATE_KEY": "your_key"
      }
    }
  }'
```

### Run Health Check

```bash
curl -X POST https://your-worker.workers.dev \
  -H "Authorization: Bearer $AUTOPILOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "task": "health_check"
  }'
```

## Monitoring

### Scheduled Health Checks

The autopilot worker runs health checks every 10 minutes:

- ✅ Vercel API connectivity
- ✅ GitHub API connectivity
- ✅ Deployment URL accessibility
- ✅ SSL certificate status

### Logs

View worker logs:

```bash
wrangler tail --config wrangler-vercel-autopilot.toml
```

### Metrics

View deployment metrics in Vercel dashboard:
- Build times
- Deployment frequency
- Error rates
- Traffic patterns

## Troubleshooting

### Worker Not Responding

**Problem**: Autopilot worker returns errors

**Solutions**:
1. Check worker is deployed: `wrangler deployments list`
2. Verify secrets are set: `wrangler secret list`
3. Check worker logs: `wrangler tail`
4. Redeploy worker: `wrangler deploy`

### Deployment Fails

**Problem**: Deployment triggered but fails

**Solutions**:
1. Check Vercel build logs in dashboard
2. Verify GitHub push succeeded
3. Check environment variables are set
4. Review error messages in logs

### Health Check Fails

**Problem**: Health check reports unhealthy

**Solutions**:
1. Check Vercel API token is valid
2. Verify GitHub token has correct permissions
3. Test deployment URL manually
4. Check SSL certificate status

### Authentication Errors

**Problem**: 401 Unauthorized errors

**Solutions**:
1. Verify AUTOPILOT_TOKEN is correct
2. Check token is set in worker secrets
3. Ensure Authorization header is included
4. Regenerate token if needed

## Security

### Token Management

- **AUTOPILOT_TOKEN**: Secure random string (32+ characters)
- **VERCEL_TOKEN**: From Vercel dashboard, full access
- **GITHUB_TOKEN**: Personal access token with `repo` scope
- **Storage**: All tokens stored as Cloudflare Worker secrets

### Best Practices

1. ✅ Use strong, unique tokens
2. ✅ Rotate tokens regularly
3. ✅ Limit token permissions to minimum required
4. ✅ Never commit tokens to git
5. ✅ Use environment variables for local development
6. ✅ Monitor worker logs for suspicious activity

## Advanced Features

### Custom Domains

Add custom domain via autopilot:

```bash
curl -X POST https://your-worker.workers.dev \
  -H "Authorization: Bearer $AUTOPILOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "task": "add_domain",
    "data": {
      "domain": "yourdomain.com"
    }
  }'
```

### Rollback Deployment

To rollback, redeploy a previous commit:

```bash
git revert HEAD
git push origin main
```

Or use Vercel dashboard:
1. Go to Deployments
2. Find previous successful deployment
3. Click "..." → "Promote to Production"

### Scheduled Deployments

Configure cron in `wrangler-vercel-autopilot.toml`:

```toml
[triggers]
crons = ["0 2 * * *"]  # Daily at 2 AM
```

## Integration with CI/CD

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Trigger Autopilot
        run: |
          curl -X POST ${{ secrets.AUTOPILOT_WORKER_URL }} \
            -H "Authorization: Bearer ${{ secrets.AUTOPILOT_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d '{"task": "trigger_deploy"}'
```

## Support

- **Worker Logs**: `wrangler tail`
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Cloudflare Dashboard**: https://dash.cloudflare.com
- **Documentation**: `/docs/`

---

**Target**: fix2-1c7w-git-main-gitpod.vercel.app  
**Status**: Ready for autopilot deployment  
**Last Updated**: 2024-11-15
