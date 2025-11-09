# GitHub Secrets Configuration Guide

## 🔐 Required Secrets for Deployment

To enable automatic deployment to Netlify, configure these secrets in your GitHub repository.

**Location:** https://github.com/elevateforhumanity/fix2/settings/secrets/actions

---

## Essential Secrets (Required for Deployment)

### 1. NETLIFY_AUTH_TOKEN
**Purpose:** Authenticates GitHub Actions to deploy to Netlify

**How to get it:**
1. Go to: https://app.netlify.com/user/applications
2. Click "New access token"
3. Name it: "GitHub Actions - EFH LMS"
4. Click "Generate token"
5. Copy the token (you won't see it again!)

**Add to GitHub:**
1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Click "New repository secret"
3. Name: `NETLIFY_AUTH_TOKEN`
4. Value: (paste the token from Netlify)
5. Click "Add secret"

---

### 2. NETLIFY_SITE_ID
**Purpose:** Identifies which Netlify site to deploy to

**How to get it:**
1. Go to: https://app.netlify.com
2. Select your site: "elevateforhumanityfix"
3. Go to: Site settings → General → Site details
4. Find "API ID" (looks like: `abc123de-f456-7890-gh12-ijk345lmn678`)
5. Copy the API ID

**Add to GitHub:**
1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Click "New repository secret"
3. Name: `NETLIFY_SITE_ID`
4. Value: (paste the API ID)
5. Click "Add secret"

---

### 3. VITE_SUPABASE_URL
**Purpose:** Connects the app to Supabase database (for student portal)

**How to get it:**
1. Go to: https://app.supabase.com/project/_/settings/api
2. Find "Project URL" under "Configuration"
3. Copy the URL (looks like: `https://xxxxx.supabase.co`)

**Add to GitHub:**
1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Click "New repository secret"
3. Name: `VITE_SUPABASE_URL`
4. Value: (paste the Supabase URL)
5. Click "Add secret"

---

### 4. VITE_SUPABASE_ANON_KEY
**Purpose:** Public API key for Supabase authentication

**How to get it:**
1. Go to: https://app.supabase.com/project/_/settings/api
2. Find "anon public" key under "Project API keys"
3. Copy the key (starts with `eyJ...`)

**Add to GitHub:**
1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Click "New repository secret"
3. Name: `VITE_SUPABASE_ANON_KEY`
4. Value: (paste the anon key)
5. Click "Add secret"

---

## Optional Secrets (Recommended)

### 5. VITE_STRIPE_PUBLISHABLE_KEY
**Purpose:** Enable payment processing (if using Stripe)

**How to get it:**
1. Go to: https://dashboard.stripe.com/apikeys
2. Copy "Publishable key" (starts with `pk_test_` or `pk_live_`)

**Add to GitHub:**
- Name: `VITE_STRIPE_PUBLISHABLE_KEY`
- Value: (paste Stripe key)

---

### 6. VITE_GA_MEASUREMENT_ID
**Purpose:** Google Analytics tracking

**How to get it:**
1. Go to: https://analytics.google.com
2. Admin → Data Streams → Select your stream
3. Copy "Measurement ID" (looks like: `G-XXXXXXXXXX`)

**Add to GitHub:**
- Name: `VITE_GA_MEASUREMENT_ID`
- Value: `G-EFHWORKFORCE01` (or your actual ID)

---

## Auto-Generated Secrets (Already Available)

### GITHUB_TOKEN
**Purpose:** Allows GitHub Actions to interact with your repository
**Status:** ✅ Automatically provided by GitHub (no action needed)

---

## Verification Checklist

After adding secrets, verify they're configured:

```bash
# Check which secrets exist (won't show values)
gh secret list --repo elevateforhumanity/fix2
```

**Expected output:**
```
NETLIFY_AUTH_TOKEN       Updated 2025-11-09
NETLIFY_SITE_ID          Updated 2025-11-09
VITE_SUPABASE_ANON_KEY   Updated 2025-11-09
VITE_SUPABASE_URL        Updated 2025-11-09
```

---

## Testing Deployment

After configuring secrets:

1. **Trigger deployment:**
   ```bash
   git commit --allow-empty -m "test: trigger deployment"
   git push origin main
   ```

2. **Watch deployment:**
   - Go to: https://github.com/elevateforhumanity/fix2/actions
   - Click on "Deploy to Netlify" workflow
   - Watch the build logs

3. **Check live site:**
   - Wait 2-3 minutes for deployment
   - Visit: https://elevateforhumanityfix.netlify.app
   - Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`

---

## Troubleshooting

### "Error: Missing NETLIFY_AUTH_TOKEN"
- Secret not configured or misspelled
- Go back and add `NETLIFY_AUTH_TOKEN` exactly as shown

### "Error: Missing NETLIFY_SITE_ID"
- Secret not configured or misspelled
- Go back and add `NETLIFY_SITE_ID` exactly as shown

### "Build failed: Supabase connection error"
- `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` missing
- Verify both secrets are added correctly

### "Deployment succeeded but changes not showing"
- Clear browser cache (hard refresh)
- Check Netlify deploy logs: https://app.netlify.com/sites/elevateforhumanityfix/deploys
- Verify correct branch deployed (should be `main`)

---

## Security Best Practices

✅ **DO:**
- Keep secrets in GitHub Secrets (never commit to code)
- Use different keys for development and production
- Rotate tokens periodically
- Use least-privilege access (read-only where possible)

❌ **DON'T:**
- Commit secrets to `.env` files
- Share secrets in chat/email
- Use production keys in development
- Store secrets in code comments

---

## Quick Setup Script

Run this to check if secrets are configured:

```bash
# Check GitHub secrets (requires gh CLI)
gh secret list --repo elevateforhumanity/fix2

# If missing, add them:
gh secret set NETLIFY_AUTH_TOKEN --repo elevateforhumanity/fix2
gh secret set NETLIFY_SITE_ID --repo elevateforhumanity/fix2
gh secret set VITE_SUPABASE_URL --repo elevateforhumanity/fix2
gh secret set VITE_SUPABASE_ANON_KEY --repo elevateforhumanity/fix2
```

---

## Summary

**Minimum Required (4 secrets):**
1. ✅ `NETLIFY_AUTH_TOKEN` - From Netlify user settings
2. ✅ `NETLIFY_SITE_ID` - From Netlify site settings
3. ✅ `VITE_SUPABASE_URL` - From Supabase project settings
4. ✅ `VITE_SUPABASE_ANON_KEY` - From Supabase project settings

**Optional (2 secrets):**
5. `VITE_STRIPE_PUBLISHABLE_KEY` - For payments
6. `VITE_GA_MEASUREMENT_ID` - For analytics

**Auto-provided (1 secret):**
7. ✅ `GITHUB_TOKEN` - Automatically available

---

**Once configured, every push to `main` will automatically deploy to Netlify!** 🚀
