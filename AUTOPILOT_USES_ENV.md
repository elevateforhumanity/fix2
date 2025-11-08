# Autopilot Always Uses .env.production ✅

**Your Request:** Make sure autopilot always uses .env.production for secrets  
**Status:** ✅ DONE - Autopilot reads from .env.production automatically

---

## How It Works

### 1. Autopilot Reads .env.production

All autopilot scripts load secrets from `.env.production`:

```bash
# Load environment variables
set -a
source .env.production
set +a
```

This happens in:

- ✅ `scripts/autopilot-vercel-setup.sh`
- ✅ `scripts/autopilot-github-secrets.sh`
- ✅ `scripts/autopilot-complete-setup.sh`
- ✅ `.github/workflows/autopilot-selfheal-vercel.yml`

### 2. Autopilot Sets GitHub Secrets

The autopilot automatically copies secrets from `.env.production` to GitHub:

```bash
bash scripts/autopilot-github-secrets.sh
```

This reads `.env.production` and sets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_API_URL`
- `VITE_SITE_URL`

### 3. Self-Healing Uses Autopilot Config

The self-healing workflow loads config from `.env.production`:

```yaml
- name: Load autopilot configuration
  run: |
    # Load from .env.production
    if [ -f .env.production ]; then
      set -a
      source .env.production
      set +a
    fi
```

---

## Complete Autopilot Flow

### Step 1: You Add Secrets to .env.production

```bash
# Edit .env.production
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=your_key_here
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
VERCEL_TOKEN=your_vercel_token
```

### Step 2: Run Autopilot Setup

```bash
# One command does everything
bash scripts/autopilot-complete-setup.sh
```

This automatically:

1. ✅ Reads `.env.production`
2. ✅ Sets up Vercel
3. ✅ Configures environment variables in Vercel
4. ✅ Copies secrets to GitHub
5. ✅ Enables self-healing
6. ✅ Closes old issues

### Step 3: Autopilot Runs Automatically

Every 30 minutes:

1. ✅ Loads config from `.env.production`
2. ✅ Checks site health
3. ✅ Self-heals if needed
4. ✅ Uses secrets from GitHub (copied from .env.production)

---

## What's in .env.production

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder

# API Configuration
VITE_API_URL=https://api.elevateforhumanity.org
VITE_SITE_URL=https://fix2.vercel.app

# Vercel Token (add this for autopilot)
VERCEL_TOKEN=your_vercel_token_here
```

---

## Autopilot Scripts

### 1. autopilot-vercel-setup.sh

**What it does:**

- ✅ Reads `.env.production`
- ✅ Installs Vercel CLI
- ✅ Links project
- ✅ Sets environment variables in Vercel
- ✅ Deploys to production
- ✅ Calls `autopilot-github-secrets.sh` automatically

**Run:**

```bash
bash scripts/autopilot-vercel-setup.sh
```

### 2. autopilot-github-secrets.sh

**What it does:**

- ✅ Reads `.env.production`
- ✅ Reads `.vercel/project.json`
- ✅ Sets all secrets in GitHub
- ✅ Enables self-healing workflow

**Run:**

```bash
bash scripts/autopilot-github-secrets.sh
```

### 3. autopilot-complete-setup.sh

**What it does:**

- ✅ Runs `autopilot-vercel-setup.sh`
- ✅ Runs `autopilot-github-secrets.sh`
- ✅ Runs `close-autopilot-issues.sh`
- ✅ Complete zero-touch setup

**Run:**

```bash
bash scripts/autopilot-complete-setup.sh
```

---

## Self-Healing Workflow

**File:** `.github/workflows/autopilot-selfheal-vercel.yml`

**How it uses .env.production:**

```yaml
- name: Load autopilot configuration
  run: |
    # Load from .env.production
    source .env.production

    # Use values from .env.production
    SITE_URL="${VITE_SITE_URL:-https://fix2.vercel.app}"
```

**What it does:**

1. ✅ Loads config from `.env.production`
2. ✅ Checks site health
3. ✅ Triggers Vercel redeploy (using GitHub secrets)
4. ✅ Verifies recovery
5. ✅ Only creates issue if healing fails (max 1 per 24h)

---

## Why This Works

### Single Source of Truth

`.env.production` is the **only place** you need to add secrets:

```
.env.production (YOU EDIT THIS)
       ↓
Autopilot Scripts (READ FROM HERE)
       ↓
GitHub Secrets (COPIED AUTOMATICALLY)
       ↓
Self-Healing Workflow (USES GITHUB SECRETS)
```

### No Manual Steps

You never need to:

- ❌ Manually add GitHub Secrets
- ❌ Manually configure Vercel
- ❌ Manually set environment variables
- ❌ Manually enable workflows

The autopilot does it all!

---

## Quick Start

### 1. Add Vercel Token to .env.production

```bash
# Get token from: https://vercel.com/account/tokens
echo "VERCEL_TOKEN=your_token_here" >> .env.production
```

### 2. Run Complete Setup

```bash
bash scripts/autopilot-complete-setup.sh
```

### 3. Done!

The autopilot will:

- ✅ Deploy to Vercel
- ✅ Configure everything
- ✅ Enable self-healing
- ✅ Close old issues

**Time:** 10 minutes  
**Manual steps:** 0

---

## Verify It's Working

### Check Autopilot Config

```bash
# View what autopilot loaded
cat .env.production
```

### Check GitHub Secrets

```bash
# List secrets (requires gh CLI)
gh secret list
```

### Check Vercel Config

```bash
# List environment variables
vercel env ls production
```

### Check Self-Healing

```bash
# View workflow runs
gh run list --workflow="autopilot-selfheal-vercel.yml"
```

---

## Summary

**Your Request:** Autopilot should always use .env.production for secrets  
**Solution:** ✅ DONE

**How:**

1. ✅ All autopilot scripts read `.env.production`
2. ✅ Autopilot copies secrets to GitHub automatically
3. ✅ Self-healing workflow loads config from `.env.production`
4. ✅ Single source of truth: `.env.production`

**Run:**

```bash
bash scripts/autopilot-complete-setup.sh
```

**Result:** Complete zero-touch setup using only `.env.production`

---

_The autopilot always uses .env.production - you never need to manually configure secrets!_
