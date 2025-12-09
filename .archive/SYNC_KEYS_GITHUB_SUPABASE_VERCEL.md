# SYNC KEYS: GitHub → Supabase → Vercel

**Goal:** Configure GitHub Actions to automatically read from Supabase and sync to Vercel  
**Time:** 15 minutes  
**Benefit:** One source of truth for all environment variables

---

## 🎯 THE PROBLEM

Right now you have keys in 3 places:
- 🔵 Supabase (database credentials)
- 🟢 Vercel (deployment environment)
- ⚫ GitHub (CI/CD secrets)

**Solution:** Make Supabase the single source of truth, auto-sync to Vercel via GitHub Actions.

---

## 🔧 ARCHITECTURE

```
Supabase (Source of Truth)
    ↓
GitHub Actions (Reads from Supabase)
    ↓
Vercel (Auto-synced on deploy)
```

---

## 📋 STEP-BY-STEP SETUP

### Step 1: Get Supabase API Keys (2 minutes)

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Go to: **Settings → API**
4. Copy these values:

```bash
Project URL: https://xxxxx.supabase.co
anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. Go to: **Settings → Database → Connection string**
6. Copy the connection string

---

### Step 2: Add Supabase Keys to GitHub Secrets (3 minutes)

1. Go to your GitHub repo: [github.com/elevateforhumanity/fix2](https://github.com/elevateforhumanity/fix2)
2. Click: **Settings → Secrets and variables → Actions**
3. Click: **New repository secret**
4. Add these secrets:

```bash
# Supabase Core
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_DB_URL=postgresql://postgres:xxxxx@db.xxxxx.supabase.co:5432/postgres

# Vercel (for auto-deploy)
VERCEL_TOKEN=xxxxx  # Get from vercel.com/account/tokens
VERCEL_ORG_ID=xxxxx  # Get from vercel.com/[team]/settings
VERCEL_PROJECT_ID=xxxxx  # Get from vercel.com/[team]/[project]/settings
```

---

### Step 3: Get Vercel Tokens (3 minutes)

1. **Get Vercel Token:**
   - Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Click "Create Token"
   - Name: `GitHub Actions Sync`
   - Scope: Full Account
   - Copy token (starts with `vercel_`)

2. **Get Vercel Org ID:**
   - Go to [vercel.com/teams/settings](https://vercel.com/teams/settings)
   - Copy "Team ID" (or use your username if personal account)

3. **Get Vercel Project ID:**
   - Go to your project: [vercel.com/elevateforhumanity/fix2/settings](https://vercel.com/elevateforhumanity/fix2/settings)
   - Scroll to "Project ID"
   - Copy the ID

4. Add all 3 to GitHub Secrets (from Step 2)

---

### Step 4: Create GitHub Action Workflow (5 minutes)

Create file: `.github/workflows/sync-env-vars.yml`

```yaml
name: Sync Environment Variables

on:
  workflow_dispatch: # Manual trigger
  push:
    branches:
      - main
    paths:
      - '.env.example'
      - '.github/workflows/sync-env-vars.yml'

jobs:
  sync-to-vercel:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install -g vercel

      - name: Sync Supabase keys to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        run: |
          # Supabase keys
          vercel env add NEXT_PUBLIC_SUPABASE_URL production --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID --yes <<< "${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}"
          vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID --yes <<< "${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}"
          vercel env add SUPABASE_SERVICE_ROLE_KEY production --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID --yes <<< "${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}"
          
          # Also add to preview and development
          vercel env add NEXT_PUBLIC_SUPABASE_URL preview --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID --yes <<< "${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}"
          vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID --yes <<< "${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}"
          vercel env add SUPABASE_SERVICE_ROLE_KEY preview --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID --yes <<< "${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}"

      - name: Trigger Vercel deployment
        run: |
          vercel deploy --prod --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID

      - name: Notify success
        run: echo "✅ Environment variables synced to Vercel successfully!"
```

---

### Step 5: Add All Other Keys to GitHub Secrets (2 minutes)

Add these to GitHub Secrets (same place as Step 2):

```bash
# Email (choose one)
RESEND_API_KEY=re_xxxxx
# OR
SENDGRID_API_KEY=SG.xxxxx

# Stripe
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Sentry
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# Analytics (if not already in Vercel)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-xxxxx
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=xxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
```

---

### Step 6: Update Workflow to Sync All Keys

Update `.github/workflows/sync-env-vars.yml`:

```yaml
name: Sync All Environment Variables

on:
  workflow_dispatch:
  push:
    branches:
      - main
    paths:
      - '.env.example'
      - '.github/workflows/sync-env-vars.yml'

jobs:
  sync-to-vercel:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install -g vercel

      - name: Sync all environment variables to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        run: |
          # Function to add env var to all environments
          add_env() {
            local key=$1
            local value=$2
            echo "Adding $key..."
            echo "$value" | vercel env add "$key" production --token=$VERCEL_TOKEN --yes
            echo "$value" | vercel env add "$key" preview --token=$VERCEL_TOKEN --yes
            echo "$value" | vercel env add "$key" development --token=$VERCEL_TOKEN --yes
          }

          # Supabase
          add_env "NEXT_PUBLIC_SUPABASE_URL" "${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}"
          add_env "NEXT_PUBLIC_SUPABASE_ANON_KEY" "${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}"
          add_env "SUPABASE_SERVICE_ROLE_KEY" "${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}"

          # Email (if set)
          if [ -n "${{ secrets.RESEND_API_KEY }}" ]; then
            add_env "RESEND_API_KEY" "${{ secrets.RESEND_API_KEY }}"
          fi

          # Stripe (if set)
          if [ -n "${{ secrets.STRIPE_SECRET_KEY }}" ]; then
            add_env "STRIPE_SECRET_KEY" "${{ secrets.STRIPE_SECRET_KEY }}"
            add_env "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" "${{ secrets.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY }}"
            add_env "STRIPE_WEBHOOK_SECRET" "${{ secrets.STRIPE_WEBHOOK_SECRET }}"
          fi

          # Sentry (if set)
          if [ -n "${{ secrets.SENTRY_DSN }}" ]; then
            add_env "SENTRY_DSN" "${{ secrets.SENTRY_DSN }}"
          fi

          # Analytics
          if [ -n "${{ secrets.NEXT_PUBLIC_GA_MEASUREMENT_ID }}" ]; then
            add_env "NEXT_PUBLIC_GA_MEASUREMENT_ID" "${{ secrets.NEXT_PUBLIC_GA_MEASUREMENT_ID }}"
          fi

          # Site URL
          add_env "NEXT_PUBLIC_SITE_URL" "${{ secrets.NEXT_PUBLIC_SITE_URL }}"

      - name: Trigger Vercel deployment
        run: |
          vercel deploy --prod --token=$VERCEL_TOKEN

      - name: Success notification
        run: |
          echo "✅ All environment variables synced successfully!"
          echo "🚀 Vercel deployment triggered"
```

---

## 🎯 HOW IT WORKS

### Automatic Sync
1. You update a key in GitHub Secrets
2. Push to `main` branch
3. GitHub Action runs automatically
4. Keys sync to Vercel
5. Vercel redeploys with new keys

### Manual Sync
1. Go to: **Actions** tab in GitHub
2. Click: **Sync All Environment Variables**
3. Click: **Run workflow**
4. Keys sync immediately

---

## 🔄 WORKFLOW

```
┌─────────────────────────────────────────────────┐
│  1. Store Keys in GitHub Secrets                │
│     (Single source of truth)                    │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  2. GitHub Action Reads Secrets                 │
│     (Triggered on push or manual)               │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  3. Vercel CLI Syncs to Vercel                  │
│     (All environments: prod, preview, dev)      │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  4. Vercel Auto-Deploys                         │
│     (Site updates with new keys)                │
└─────────────────────────────────────────────────┘
```

---

## ✅ BENEFITS

1. **Single Source of Truth**
   - All keys in GitHub Secrets
   - No manual copying between platforms
   - Consistent across all environments

2. **Automatic Sync**
   - Push to main = auto-sync
   - No manual Vercel updates
   - Always in sync

3. **Version Control**
   - Track when keys change
   - Audit trail in GitHub
   - Rollback if needed

4. **Security**
   - Keys never in code
   - Encrypted in GitHub
   - Encrypted in Vercel

---

## 🧪 TESTING

### Test the Sync
1. Add a test secret to GitHub:
   ```bash
   TEST_KEY=test_value_123
   ```

2. Update workflow to include it:
   ```yaml
   add_env "TEST_KEY" "${{ secrets.TEST_KEY }}"
   ```

3. Push to main or run workflow manually

4. Check Vercel:
   - Go to: Settings → Environment Variables
   - Look for `TEST_KEY`
   - Should show `test_value_123`

5. Remove test key after verification

---

## 🚨 TROUBLESHOOTING

### "Vercel CLI not authenticated"
**Solution:**
```bash
# Make sure VERCEL_TOKEN is set correctly in GitHub Secrets
# Token should start with: vercel_
```

### "Environment variable already exists"
**Solution:**
```bash
# Workflow will update existing variables
# Or delete from Vercel first, then re-run
```

### "Workflow not triggering"
**Solution:**
```bash
# Check workflow file is in: .github/workflows/
# Check branch is 'main'
# Try manual trigger: Actions → Run workflow
```

---

## 📋 COMPLETE CHECKLIST

### Setup (One-time)
- [ ] Get Supabase keys
- [ ] Add Supabase keys to GitHub Secrets
- [ ] Get Vercel token, org ID, project ID
- [ ] Add Vercel credentials to GitHub Secrets
- [ ] Create workflow file
- [ ] Add all other keys to GitHub Secrets
- [ ] Test workflow manually
- [ ] Verify keys in Vercel

### Ongoing (When updating keys)
- [ ] Update key in GitHub Secrets
- [ ] Push to main (auto-sync)
- [ ] OR run workflow manually
- [ ] Verify in Vercel
- [ ] Test on live site

---

## 🎉 RESULT

**Before:**
- 😫 Manually copy keys to 3 places
- 😫 Keys get out of sync
- 😫 Forget which keys are where

**After:**
- ✅ Update once in GitHub Secrets
- ✅ Auto-sync to Vercel
- ✅ Always in sync
- ✅ One source of truth

---

## 💡 PRO TIPS

1. **Use GitHub Secrets for everything**
   - Never put keys in code
   - Never commit `.env` files
   - Always use secrets

2. **Document your keys**
   - Keep a list of what each key is for
   - Note where to get new keys
   - Track expiration dates

3. **Rotate keys regularly**
   - Update in GitHub Secrets
   - Workflow auto-syncs to Vercel
   - No manual work needed

4. **Test in preview first**
   - Use preview environment
   - Verify keys work
   - Then promote to production

---

## 🚀 NEXT STEPS

1. **Now:** Set up GitHub Secrets (10 min)
2. **Now:** Create workflow file (5 min)
3. **Now:** Test sync manually
4. **Later:** Add remaining keys as you get them
5. **Ongoing:** Update keys in GitHub Secrets only

**You're done!** Keys will auto-sync from now on. 🎊
