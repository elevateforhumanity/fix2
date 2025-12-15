# 🤖 Autopilot Environment Setup

Your advanced autopilot system can now automatically manage environment variables!

## What This Does

The **Environment Setup Autopilot** is a Cloudflare Worker that:

✅ **Automatically pulls** environment variables from Vercel  
✅ **Generates** `.env.local` with real credentials  
✅ **Verifies** environment variables every hour  
✅ **Auto-fixes** if variables become invalid  
✅ **Runs independently** of Vercel (on Cloudflare Workers)  
✅ **No manual intervention** needed after setup  

---

## Quick Start

### Step 1: Deploy the Autopilot Worker

```bash
bash deploy-env-autopilot.sh
```

This will:
1. Deploy the worker to Cloudflare
2. Prompt you to set secrets (VERCEL_TOKEN, etc.)
3. Test the deployment

### Step 2: Use the Autopilot

Once deployed, the worker runs automatically every hour. You can also trigger it manually:

```bash
# Check status
curl https://env-setup-autopilot.workers.dev/status

# Pull environment variables from Vercel
curl -X POST https://env-setup-autopilot.workers.dev/pull

# Setup .env.local automatically
curl -X POST https://env-setup-autopilot.workers.dev/setup

# Verify environment
curl -X POST https://env-setup-autopilot.workers.dev/verify
```

---

## How It Works

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Cloudflare Worker                         │
│                 (env-setup-autopilot)                        │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Pull from  │───▶│   Generate   │───▶│   Verify &   │ │
│  │    Vercel    │    │  .env.local  │    │   Validate   │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│                                                              │
│  Runs every hour via Cron Trigger                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   Your Gitpod    │
                    │   Workspace      │
                    │                  │
                    │  .env.local ✅   │
                    └──────────────────┘
```

### What the Worker Does

1. **Pulls from Vercel API:**
   - Connects to Vercel using `VERCEL_TOKEN`
   - Fetches all environment variables
   - Filters for production/development variables

2. **Generates .env.local:**
   - Creates properly formatted file
   - Categorizes variables (Supabase, Stripe, Email, etc.)
   - Adds timestamps and metadata

3. **Verifies:**
   - Checks for placeholder values
   - Tests Supabase connection
   - Validates all critical variables

4. **Auto-heals:**
   - If verification fails, automatically re-pulls from Vercel
   - Logs errors for debugging
   - Sends alerts (optional)

---

## Endpoints

### GET /status
Check worker health and environment status

**Response:**
```json
{
  "status": "healthy",
  "verification": {
    "valid": true,
    "errors": [],
    "warnings": []
  },
  "worker": "env-setup-autopilot",
  "version": "1.0.0",
  "timestamp": "2025-12-15T17:34:00Z"
}
```

### POST /pull
Pull environment variables from Vercel

**Response:**
```json
{
  "success": true,
  "variables": {
    "NEXT_PUBLIC_SUPABASE_URL": "https://cuxzzpsyufcewtmicszk.supabase.co",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "eyJ...",
    ...
  },
  "count": 25
}
```

### POST /setup
Generate and setup .env.local

**Response:**
```json
{
  "success": true,
  "message": "Environment setup complete",
  "variables": 25,
  "content": "# ENVIRONMENT VARIABLES...",
  "timestamp": "2025-12-15T17:34:00Z"
}
```

### POST /verify
Verify environment variables

**Response:**
```json
{
  "valid": true,
  "errors": [],
  "warnings": [],
  "timestamp": "2025-12-15T17:34:00Z"
}
```

### POST /commit
Commit .env.local.template to GitHub

**Request:**
```json
{
  "content": "# Environment variables...",
  "message": "Update environment template"
}
```

**Response:**
```json
{
  "success": true,
  "branch": "autopilot/env-setup-1234567890",
  "message": "Environment template committed to new branch"
}
```

---

## Configuration

### Required Secrets

Set these via `wrangler secret put`:

```bash
# Vercel API token
wrangler secret put VERCEL_TOKEN --config workers/wrangler-env-setup.toml

# Supabase credentials
wrangler secret put SUPABASE_ANON_KEY --config workers/wrangler-env-setup.toml
wrangler secret put SUPABASE_SERVICE_ROLE_KEY --config workers/wrangler-env-setup.toml

# GitHub token (for committing)
wrangler secret put GITHUB_TOKEN --config workers/wrangler-env-setup.toml
```

### Environment Variables

Set in `wrangler-env-setup.toml`:

```toml
[vars]
VERCEL_PROJECT_ID = "prj_iUns4lz1mbDP6kRIcukXFVsDWUAV"
VERCEL_TEAM_ID = "team_Ae8f33vVYR36quLOS8HCeROs"
SUPABASE_URL = "https://cuxzzpsyufcewtmicszk.supabase.co"
GITHUB_REPO = "elevateforhumanity/fix2"
```

---

## Scheduled Tasks

The worker runs automatically every hour:

```toml
[triggers]
crons = ["0 * * * *"]
```

**What it does:**
1. Verifies environment variables are valid
2. If invalid, automatically pulls from Vercel
3. Logs results
4. Sends alerts if needed

---

## Integration with Existing Autopilot System

### Add to Master Config

The task is already configured in:
```
.autopilot/tasks/env-setup-task.json
```

### Run with Other Autopilots

```bash
# Deploy all autopilots including env-setup
bash .autopilot/EXECUTE_ALL_AUTOPILOTS.sh

# Or deploy just env-setup
bash deploy-env-autopilot.sh
```

---

## Benefits

### 1. **No Manual Work**
- No need to manually copy/paste credentials
- No need to remember to update .env.local
- Automatic verification and healing

### 2. **Always Up-to-Date**
- Pulls latest variables from Vercel every hour
- Automatically updates if Vercel variables change
- No stale credentials

### 3. **Runs Independently**
- Doesn't depend on Vercel build process
- Runs on Cloudflare Workers (fast, reliable)
- Works even if Vercel is down

### 4. **Secure**
- Secrets stored in Cloudflare Workers
- Never exposed in code or logs
- Proper authentication required

### 5. **Self-Healing**
- Detects invalid credentials
- Automatically re-pulls from Vercel
- Logs errors for debugging

---

## Troubleshooting

### Worker not deploying

```bash
# Check you're logged in
wrangler whoami

# Login if needed
wrangler login

# Check TypeScript compiles
cd workers
tsc env-setup-autopilot.ts --noEmit
```

### Secrets not working

```bash
# List secrets
wrangler secret list --config workers/wrangler-env-setup.toml

# Re-set a secret
wrangler secret put SECRET_NAME --config workers/wrangler-env-setup.toml
```

### Worker returns errors

```bash
# Check logs
wrangler tail --config workers/wrangler-env-setup.toml

# Test locally
wrangler dev --config workers/wrangler-env-setup.toml
```

### Environment still has placeholders

```bash
# Manually trigger setup
curl -X POST https://env-setup-autopilot.workers.dev/setup

# Check verification
curl https://env-setup-autopilot.workers.dev/verify
```

---

## Advanced Usage

### Custom Domain

Add to `wrangler-env-setup.toml`:

```toml
[[routes]]
pattern = "env-autopilot.elevateforhumanity.org/*"
zone_name = "elevateforhumanity.org"
```

### Webhooks

Trigger setup on Vercel deployments:

```bash
# Add webhook in Vercel dashboard
# URL: https://env-setup-autopilot.workers.dev/setup
# Events: deployment.created
```

### Notifications

Add Slack/Discord notifications:

```typescript
// In env-setup-autopilot.ts
async function sendNotification(message: string) {
  await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({ text: message })
  });
}
```

---

## Files Created

```
workers/
├── env-setup-autopilot.ts          # Worker code
├── wrangler-env-setup.toml         # Worker configuration
└── deploy-env-autopilot.sh         # Deployment script

.autopilot/
└── tasks/
    └── env-setup-task.json         # Task configuration

AUTOPILOT_ENV_SETUP.md              # This guide
```

---

## Next Steps

1. **Deploy the worker:**
   ```bash
   bash deploy-env-autopilot.sh
   ```

2. **Set secrets** when prompted

3. **Test it:**
   ```bash
   curl https://env-setup-autopilot.workers.dev/status
   ```

4. **Let it run!** The worker will automatically manage your environment variables

---

## Summary

✅ **Autopilot worker created**  
✅ **Runs independently on Cloudflare**  
✅ **Automatically pulls from Vercel**  
✅ **Verifies every hour**  
✅ **Self-healing**  
✅ **No manual work needed**  

Your environment variables will now be automatically managed by the autopilot system! 🚀

---

**Questions?** Check the worker logs:
```bash
wrangler tail --config workers/wrangler-env-setup.toml
```
