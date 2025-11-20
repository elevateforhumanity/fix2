# Autopilot Vercel Worker

## 🤖 What This Does

Your advanced autopilot can now **fully configure Vercel** without any manual clicking or dashboard navigation. This worker:

1. **Logs into Vercel** using a token
2. **Links to your project** automatically
3. **Sets all required environment variables** (Supabase, Stripe, VAPID, AWS, etc.)
4. **Optionally triggers a production deploy**
5. **Runs from GitHub Actions** or any CI/CD environment

No more "configure this in the dashboard" - the autopilot just runs and fixes it.

---

## 📁 Files Created

### 1. `scripts/autopilot-config-vercel.sh`

The main worker script that:

- Validates required secrets are present
- Installs Vercel CLI if needed
- Links to your Vercel project
- Sets environment variables for production, preview, and development
- Handles optional integrations (Stripe, AWS, VAPID, etc.)

### 2. `.github/workflows/autopilot-config-vercel.yml`

GitHub Actions workflow that:

- Can be triggered manually or via API
- Runs the autopilot script with all secrets
- Optionally triggers a Vercel deployment
- Provides a summary of what was configured

---

## 🔐 Required GitHub Secrets

Add these to your GitHub repository: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

### Critical (Required)

| Secret Name                 | Description                 | How to Get                                                                    |
| --------------------------- | --------------------------- | ----------------------------------------------------------------------------- |
| `VERCELACESSTOKEN`          | Vercel API token            | [Vercel Dashboard](https://vercel.com/account/tokens) → Create Token          |
| `VERCEL_ORG_ID`             | Your Vercel organization ID | Run `vercel link` locally, check `.vercel/project.json`                       |
| `VERCEL_PROJECT_ID`         | Your Vercel project ID      | Run `vercel link` locally, check `.vercel/project.json`                       |
| `SUPABASE_ANON_KEY`         | Supabase anonymous key      | [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key   | [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API |

### Optional (For Full Functionality)

| Secret Name                      | Description                               |
| -------------------------------- | ----------------------------------------- |
| `RESEND_API_KEY`                 | Email sending via Resend                  |
| `STRIPE_SECRET_KEY`              | Stripe payments (secret key)              |
| `STRIPE_PUBLISHABLE_KEY`         | Stripe payments (public key)              |
| `STRIPE_WEBHOOK_SECRET`          | Stripe webhook signature                  |
| `VAPID_PUBLIC_KEY`               | Push notifications (public)               |
| `VAPID_PRIVATE_KEY`              | Push notifications (private)              |
| `VAPID_SUBJECT`                  | Push notifications subject (email or URL) |
| `AWS_ACCESS_KEY_ID`              | AWS S3 uploads                            |
| `AWS_SECRET_ACCESS_KEY`          | AWS S3 uploads                            |
| `AWS_REGION`                     | AWS region (e.g., us-east-1)              |
| `AWS_S3_BUCKET`                  | S3 bucket name                            |
| `OPENAI_API_KEY`                 | OpenAI API for AI features                |
| `GOOGLE_APPLICATION_CREDENTIALS` | Google Cloud TTS                          |

---

## 🚀 How to Use

### Option 1: Manual Trigger (GitHub UI)

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **Autopilot - Configure Vercel Environment**
4. Click **Run workflow**
5. Choose options:
   - **trigger_deploy**: Check to also deploy to production
   - **set_node_version**: Choose 20 or 22
6. Click **Run workflow**

### Option 2: Programmatic Trigger (Autopilot API)

Your advanced autopilot can trigger this via GitHub API:

```bash
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/elevateforhumanity/fix2/actions/workflows/autopilot-config-vercel.yml/dispatches \
  -d '{"ref":"main","inputs":{"trigger_deploy":"true","set_node_version":"20"}}'
```

### Option 3: Run Locally (Testing)

```bash
# Export required secrets
export VERCELACESSTOKEN="your_token"
export VERCEL_ORG_ID="your_org_id"
export VERCEL_PROJECT_ID="your_project_id"
export SUPABASE_ANON_KEY="your_anon_key"
export SUPABASE_SERVICE_ROLE_KEY="your_service_role_key"

# Run the script
./scripts/autopilot-config-vercel.sh
```

---

## 🔍 How to Get Vercel IDs

If you don't have `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`:

### Method 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Link your project
vercel link

# Check the generated file
cat .vercel/project.json
```

You'll see:

```json
{
  "orgId": "team_xxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxx"
}
```

### Method 2: From Vercel Dashboard URL

When viewing your project in Vercel, the URL looks like:

```
https://vercel.com/your-team/your-project/settings
```

- **Team ID** = `VERCEL_ORG_ID`
- **Project ID** = visible in Settings → General

### Method 3: Using Vercel API

```bash
# List your projects
curl -H "Authorization: Bearer $VERCELACESSTOKEN" \
  https://api.vercel.com/v9/projects

# Find your project in the response
```

---

## 📊 What Gets Configured

### Environment Variables Set

The worker sets these for **all three environments** (production, preview, development):

#### Core Application

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_BASE_URL`
- `NODE_ENV`

#### Payments (if secrets provided)

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`

#### Email (if secrets provided)

- `RESEND_API_KEY`

#### Push Notifications (if secrets provided)

- `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
- `VAPID_PRIVATE_KEY`
- `VAPID_SUBJECT`

#### AWS/S3 (if secrets provided)

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_S3_BUCKET`

#### AI Features (if secrets provided)

- `OPENAI_API_KEY`
- `GOOGLE_APPLICATION_CREDENTIALS`

---

## 🔄 Workflow Integration

### Autopilot Control Flow

```
┌─────────────────────────────────────┐
│  Advanced Autopilot Brain           │
│  (Detects: Vercel env misconfigured)│
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  GitHub API Call                    │
│  POST /actions/workflows/.../       │
│       dispatches                    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  GitHub Actions Runner              │
│  - Checks out code                  │
│  - Runs autopilot-config-vercel.sh  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Vercel CLI                         │
│  - Logs in with token               │
│  - Links to project                 │
│  - Sets all env vars                │
│  - (Optional) Triggers deploy       │
└─────────────────────────────────────┘
```

### Example: Autopilot Detects Issue

```javascript
// In your autopilot brain
if (vercelEnvMissing || vercelDeployFailing) {
  await triggerGitHubWorkflow({
    workflow: 'autopilot-config-vercel.yml',
    inputs: {
      trigger_deploy: true,
      set_node_version: '20',
    },
  });

  console.log('✅ Vercel worker dispatched');
}
```

---

## 🛡️ Security Notes

### ✅ Good Practices

- **Never commit secrets** to the repository
- **Use GitHub Secrets** for all sensitive values
- **Rotate tokens** periodically
- **Use least-privilege tokens** (only grant necessary permissions)

### ⚠️ Token Permissions

Your `VERCELACESSTOKEN` needs these permissions:

- Read/Write access to projects
- Read/Write access to environment variables
- (Optional) Deploy permissions if using `trigger_deploy`

### 🔒 Secret Storage

Secrets are stored in:

- **GitHub Secrets** (encrypted at rest)
- **Vercel Environment Variables** (encrypted at rest)
- **Never in code** or logs

---

## 🧪 Testing the Worker

### 1. Dry Run (Local)

```bash
# Set test values
export VERCELACESSTOKEN="test_token"
export VERCEL_ORG_ID="test_org"
export VERCEL_PROJECT_ID="test_project"
export SUPABASE_ANON_KEY="test_anon"
export SUPABASE_SERVICE_ROLE_KEY="test_service"

# Run script (will fail at Vercel login, but validates structure)
./scripts/autopilot-config-vercel.sh
```

### 2. GitHub Actions Test

1. Add all required secrets to GitHub
2. Trigger workflow manually
3. Check Actions tab for logs
4. Verify environment variables in Vercel dashboard

### 3. Verify Configuration

After running the worker:

```bash
# List Vercel env vars
vercel env ls --token $VERCELACESSTOKEN

# Or check Vercel dashboard
# Settings → Environment Variables
```

---

## 🔧 Troubleshooting

### Error: "VERCELACESSTOKEN is missing"

**Solution:** Add `VERCELACESSTOKEN` to GitHub Secrets

### Error: "Project not found"

**Solution:** Verify `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are correct

### Error: "Permission denied"

**Solution:** Check that your Vercel token has the necessary permissions

### Error: "vercel: command not found"

**Solution:** The script installs Vercel CLI automatically. If it fails, check npm/node installation.

### Workflow doesn't trigger

**Solution:**

1. Check GitHub Actions are enabled for the repository
2. Verify the workflow file is in `.github/workflows/`
3. Check branch name matches (default is `main`)

---

## 📈 Monitoring

### GitHub Actions Logs

View detailed logs:

1. Go to **Actions** tab
2. Click on the workflow run
3. Expand each step to see output

### Vercel Deployment Logs

If `trigger_deploy` is enabled:

1. Go to Vercel dashboard
2. Click on your project
3. View **Deployments** tab
4. Check latest deployment logs

---

## 🔄 Syncing with Netlify

Want to keep Vercel and Netlify in sync? See the companion workflow:

- `AUTOPILOT_NETLIFY_VERCEL_SYNC.md` (created separately)

---

## 📚 Related Documentation

- `VERCEL_DEPLOYMENT_FIX_GUIDE.md` - Manual Vercel configuration guide
- `VERCEL_QUICK_FIX.md` - Quick reference for Vercel issues
- `ELEVATE_ENV_CHECKLIST.md` - Complete environment variable list

---

## 🎯 Quick Reference

### Run Worker from GitHub UI

```
Actions → Autopilot - Configure Vercel Environment → Run workflow
```

### Run Worker via API

```bash
curl -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/elevateforhumanity/fix2/actions/workflows/autopilot-config-vercel.yml/dispatches \
  -d '{"ref":"main"}'
```

### Check Configuration

```bash
vercel env ls --token $VERCELACESSTOKEN
```

### Trigger Deploy

```bash
vercel --prod --token $VERCELACESSTOKEN
```

---

**Status:** ✅ Ready for autopilot integration
**Last Updated:** 2025-11-15
**Maintainer:** Autopilot System
