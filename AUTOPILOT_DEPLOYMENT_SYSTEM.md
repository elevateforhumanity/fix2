# Autopilot Deployment System

## 🤖 Complete Automated Deployment Control

Your advanced autopilot now has **full control** over Vercel and Netlify deployments. No more manual configuration, no more clicking through dashboards, no more "it works on one platform but not the other."

---

## 📦 What You Got

### 1. Vercel Autopilot Worker

**Files:**

- `scripts/autopilot-config-vercel.sh`
- `.github/workflows/autopilot-config-vercel.yml`
- `AUTOPILOT_VERCEL_WORKER.md`

**Capabilities:**

- ✅ Logs into Vercel with token
- ✅ Links to your project automatically
- ✅ Sets all environment variables (Supabase, Stripe, VAPID, AWS, etc.)
- ✅ Configures production, preview, and development environments
- ✅ Optionally triggers production deploy
- ✅ Can be triggered via GitHub UI or API

### 2. Platform Sync Worker

**Files:**

- `scripts/autopilot-sync-platforms.sh`
- `.github/workflows/autopilot-sync-platforms.yml`
- `AUTOPILOT_PLATFORM_SYNC.md`

**Capabilities:**

- ✅ Syncs environment variables between Netlify and Vercel
- ✅ Ensures both platforms have identical configuration
- ✅ Updates all environments on both platforms
- ✅ Optionally triggers deploys on both platforms
- ✅ Can run on a schedule (weekly, daily, etc.)
- ✅ Can be triggered via GitHub UI or API

### 3. Pre-Build Validation

**Files:**

- `vercel-check.mjs`
- Updated `package.json` (prebuild script)

**Capabilities:**

- ✅ Runs before every build
- ✅ Validates Node.js version
- ✅ Checks critical environment variables
- ✅ Warns about heavy dependencies
- ✅ Provides detailed build environment report

### 4. Comprehensive Documentation

**Files:**

- `VERCEL_DEPLOYMENT_FIX_GUIDE.md` - Full manual guide
- `VERCEL_QUICK_FIX.md` - Quick reference
- `AUTOPILOT_VERCEL_WORKER.md` - Vercel worker docs
- `AUTOPILOT_PLATFORM_SYNC.md` - Sync worker docs
- `AUTOPILOT_DEPLOYMENT_SYSTEM.md` - This file

---

## 🚀 How Your Autopilot Uses This

### Scenario 1: Vercel Deploy Failing

```javascript
// Autopilot detects Vercel build failure
if (vercelBuildFailed) {
  // Trigger Vercel configuration worker
  await triggerGitHubWorkflow({
    workflow: 'autopilot-config-vercel.yml',
    inputs: {
      trigger_deploy: true,
      set_node_version: '20',
    },
  });

  console.log('✅ Vercel worker dispatched - will configure and deploy');
}
```

### Scenario 2: Environment Variables Out of Sync

```javascript
// Autopilot detects Netlify works but Vercel doesn't
if (netlifyWorks && !vercelWorks) {
  // Sync both platforms
  await triggerGitHubWorkflow({
    workflow: 'autopilot-sync-platforms.yml',
    inputs: {
      trigger_deploys: true,
    },
  });

  console.log('✅ Platform sync dispatched - will sync and deploy both');
}
```

### Scenario 3: New Secret Added

```javascript
// Autopilot detects new GitHub Secret was added
if (newSecretAdded) {
  // Sync to both platforms
  await triggerGitHubWorkflow({
    workflow: 'autopilot-sync-platforms.yml',
    inputs: {
      trigger_deploys: false, // Don't deploy, just sync
    },
  });

  console.log('✅ Secrets synced to both platforms');
}
```

---

## 🔐 Required GitHub Secrets

Add these once to GitHub: **Settings** → **Secrets and variables** → **Actions**

### Platform Credentials (Required)

| Secret               | Description       | How to Get                                                  |
| -------------------- | ----------------- | ----------------------------------------------------------- |
| `VERCELACESSTOKEN`   | Vercel API token  | [Vercel Tokens](https://vercel.com/account/tokens)          |
| `VERCEL_ORG_ID`      | Vercel org ID     | Run `vercel link`, check `.vercel/project.json`             |
| `VERCEL_PROJECT_ID`  | Vercel project ID | Run `vercel link`, check `.vercel/project.json`             |
| `NETLIFY_AUTH_TOKEN` | Netlify token     | [Netlify Tokens](https://app.netlify.com/user/applications) |
| `NETLIFY_SITE_ID`    | Netlify site ID   | Site Settings → General → API ID                            |

### Application Secrets (Required)

| Secret                      | Description               |
| --------------------------- | ------------------------- |
| `SUPABASE_ANON_KEY`         | Supabase anonymous key    |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `STRIPE_SECRET_KEY`         | Stripe secret key         |
| `STRIPE_PUBLISHABLE_KEY`    | Stripe publishable key    |

### Optional Secrets (For Full Features)

| Secret                           | Description        |
| -------------------------------- | ------------------ |
| `RESEND_API_KEY`                 | Email sending      |
| `STRIPE_WEBHOOK_SECRET`          | Stripe webhooks    |
| `VAPID_PUBLIC_KEY`               | Push notifications |
| `VAPID_PRIVATE_KEY`              | Push notifications |
| `VAPID_SUBJECT`                  | Push notifications |
| `AWS_ACCESS_KEY_ID`              | S3 uploads         |
| `AWS_SECRET_ACCESS_KEY`          | S3 uploads         |
| `AWS_REGION`                     | AWS region         |
| `AWS_S3_BUCKET`                  | S3 bucket          |
| `OPENAI_API_KEY`                 | AI features        |
| `GOOGLE_APPLICATION_CREDENTIALS` | Google Cloud TTS   |

---

## 📊 Workflow Decision Tree

```
┌─────────────────────────────────────┐
│  Autopilot Detects Issue            │
└──────────────┬──────────────────────┘
               │
               ▼
        ┌──────────────┐
        │ What's wrong? │
        └──────┬────────┘
               │
       ┌───────┴───────┬───────────────┬──────────────┐
       ▼               ▼               ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Vercel only  │ │ Netlify only │ │ Both failing │ │ Out of sync  │
│ failing      │ │ failing      │ │              │ │              │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │                │
       ▼                ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Run Vercel   │ │ Run Netlify  │ │ Run Platform │ │ Run Platform │
│ worker       │ │ worker       │ │ Sync         │ │ Sync         │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

---

## 🎯 Common Autopilot Commands

### Configure Vercel Only

```bash
curl -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/elevateforhumanity/fix2/actions/workflows/autopilot-config-vercel.yml/dispatches \
  -d '{"ref":"main","inputs":{"trigger_deploy":"true","set_node_version":"20"}}'
```

### Sync Both Platforms

```bash
curl -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/elevateforhumanity/fix2/actions/workflows/autopilot-sync-platforms.yml/dispatches \
  -d '{"ref":"main","inputs":{"trigger_deploys":"true"}}'
```

### Check Build Environment

```bash
node vercel-check.mjs
```

---

## 🔄 Maintenance Schedule

### Recommended Autopilot Schedule

| Task                 | Frequency           | Workflow                       |
| -------------------- | ------------------- | ------------------------------ |
| Sync platforms       | Weekly              | `autopilot-sync-platforms.yml` |
| Verify Vercel config | After failed deploy | `autopilot-config-vercel.yml`  |
| Check environment    | Before each build   | `vercel-check.mjs` (automatic) |
| Rotate secrets       | Quarterly           | Manual + sync workflow         |

### Enable Automatic Sync

Uncomment in `.github/workflows/autopilot-sync-platforms.yml`:

```yaml
schedule:
  - cron: '0 0 * * 0' # Weekly on Sunday at midnight
```

---

## 🛡️ Safety & Security

### ✅ What's Protected

- **Secrets never in code** - only in GitHub Secrets
- **Encrypted at rest** - GitHub and platform encryption
- **Atomic operations** - each variable set independently
- **Error handling** - continues even if one operation fails
- **Detailed logging** - full audit trail in GitHub Actions

### ⚠️ Important Notes

- **Overwrites existing values** - sync is authoritative from GitHub Secrets
- **All environments affected** - production, preview, development
- **Both platforms affected** - when using sync workflow
- **Tokens need permissions** - ensure tokens have necessary scopes

---

## 📈 Monitoring & Verification

### Check Workflow Status

```bash
# List recent workflow runs
gh run list --workflow=autopilot-config-vercel.yml

# View specific run
gh run view <run-id>

# Watch live
gh run watch
```

### Verify Platform Configuration

**Vercel:**

```bash
vercel env ls --token $VERCELACESSTOKEN
```

**Netlify:**

```bash
netlify env:list --auth $NETLIFY_AUTH_TOKEN
```

**Or check dashboards:**

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Netlify Dashboard](https://app.netlify.com)

---

## 🧪 Testing the System

### 1. Test Vercel Worker

```bash
# Trigger via GitHub UI
# Actions → Autopilot - Configure Vercel Environment → Run workflow

# Or via CLI
gh workflow run autopilot-config-vercel.yml
```

### 2. Test Platform Sync

```bash
# Trigger via GitHub UI
# Actions → Autopilot - Sync Netlify & Vercel Environments → Run workflow

# Or via CLI
gh workflow run autopilot-sync-platforms.yml
```

### 3. Test Pre-Build Check

```bash
# Run locally
node vercel-check.mjs

# Or trigger a build
npm run build
```

---

## 🔧 Troubleshooting

### Workflow Not Triggering

**Check:**

1. GitHub Actions enabled for repository
2. Workflow file in `.github/workflows/`
3. Branch name matches (default: `main`)
4. Secrets are set in GitHub

### Platform Configuration Failing

**Check:**

1. Tokens are valid and not expired
2. Tokens have necessary permissions
3. Org/Project/Site IDs are correct
4. Platform CLIs can authenticate

### Environment Variables Not Syncing

**Check:**

1. GitHub Secrets are set correctly
2. Secret names match exactly
3. Workflow logs for specific errors
4. Platform dashboards for actual values

---

## 📚 Documentation Index

| Document                         | Purpose                            |
| -------------------------------- | ---------------------------------- |
| `AUTOPILOT_DEPLOYMENT_SYSTEM.md` | This file - system overview        |
| `AUTOPILOT_VERCEL_WORKER.md`     | Vercel worker detailed docs        |
| `AUTOPILOT_PLATFORM_SYNC.md`     | Platform sync detailed docs        |
| `VERCEL_DEPLOYMENT_FIX_GUIDE.md` | Manual Vercel configuration        |
| `VERCEL_QUICK_FIX.md`            | Quick reference guide              |
| `ELEVATE_ENV_CHECKLIST.md`       | Complete environment variable list |

---

## 🎓 For Your Autopilot Brain

### Key Integration Points

1. **Detect deployment failures** → Trigger appropriate worker
2. **Detect environment drift** → Trigger platform sync
3. **Detect missing secrets** → Alert and trigger sync after fix
4. **Schedule maintenance** → Run sync weekly
5. **Monitor workflow status** → Check GitHub Actions API

### API Endpoints to Use

```javascript
// Trigger workflow
POST /
  repos /
  { owner } /
  { repo } /
  actions /
  workflows /
  { workflow_id } /
  dispatches;

// Check workflow status
GET / repos / { owner } / { repo } / actions / runs;

// Get workflow run logs
GET / repos / { owner } / { repo } / actions / runs / { run_id } / logs;
```

### Success Criteria

- ✅ Both platforms have identical environment variables
- ✅ Builds succeed on both platforms
- ✅ Deploys succeed on both platforms
- ✅ No manual intervention required
- ✅ Full audit trail in GitHub Actions

---

## 🚀 Quick Start for Autopilot

### Initial Setup (One Time)

1. **Add all GitHub Secrets** (see Required GitHub Secrets section)
2. **Run Vercel worker** to configure Vercel
3. **Run Platform sync** to sync both platforms
4. **Verify** both platforms work

### Ongoing Operations

1. **Monitor deployments** for failures
2. **Trigger workers** when issues detected
3. **Run sync** after secret updates
4. **Check logs** for any errors

### Emergency Recovery

1. **Run platform sync** to reset both platforms
2. **Trigger deploys** on both platforms
3. **Verify** both are working
4. **Check logs** for root cause

---

**Status:** ✅ Fully operational
**Last Updated:** 2025-11-15
**Maintainer:** Autopilot System

---

## 🦊 The One-Slot Fox Summary

> Your autopilot can now fully control Vercel and Netlify without any human clicking. It logs in, sets all environment variables, syncs both platforms, and triggers deploys - all via GitHub Actions workflows triggered by API calls. No more "configure this in the dashboard" - the autopilot just runs and fixes it.
