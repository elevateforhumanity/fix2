# Enable GitHub Actions Deployment

## Current Status

✅ **Workflow exists:** `.github/workflows/deploy-to-netlify.yml`
✅ **Triggers on:** Push to main + manual dispatch
✅ **Builds with:** pnpm + Vite
✅ **Deploys to:** Netlify

❌ **Not running because:** Missing GitHub Secrets

---

## Quick Fix (5 Minutes)

### Step 1: Add GitHub Secrets

Go to: **https://github.com/elevateforhumanity/fix2/settings/secrets/actions**

Click **"New repository secret"** for each:

#### Required Secrets:

1. **NETLIFY_AUTH_TOKEN**
   - Get from: https://app.netlify.com/user/applications#personal-access-tokens
   - Click "New access token"
   - Name: "GitHub Actions"
   - Copy the token
   - Paste in GitHub secret

2. **NETLIFY_SITE_ID**
   - Get from: https://app.netlify.com/sites/elevateforhumanityfix/settings/general
   - Look for "API ID" under "Site information"
   - Copy the ID (format: `12345678-1234-1234-1234-123456789012`)
   - Paste in GitHub secret

3. **VITE_SUPABASE_URL**
   - Value: `https://cuxzzpsyufcewtmicszk.supabase.co`

4. **VITE_SUPABASE_ANON_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ`

#### Optional Secrets:

5. **VITE_STRIPE_PUBLISHABLE_KEY** (if using Stripe)

### Step 2: Enable GitHub Actions

1. Go to: **https://github.com/elevateforhumanity/fix2/settings/actions**
2. Under "Actions permissions":
   - Select **"Allow all actions and reusable workflows"**
3. Click **"Save"**

### Step 3: Trigger Deployment

**Option A: Push a commit**
```bash
git commit --allow-empty -m "trigger: Enable GitHub Actions deployment"
git push origin main
```

**Option B: Manual trigger**
1. Go to: https://github.com/elevateforhumanity/fix2/actions
2. Click "Deploy to Netlify" workflow
3. Click "Run workflow"
4. Select branch: main
5. Click "Run workflow"

### Step 4: Monitor

Watch the deployment:
- **GitHub Actions:** https://github.com/elevateforhumanity/fix2/actions
- **Netlify:** https://app.netlify.com/sites/elevateforhumanityfix/deploys

---

## Alternative: Netlify GitHub Integration (No Secrets Needed)

If you don't want to use GitHub Actions, use Netlify's built-in GitHub integration:

### Setup:

1. **Go to Netlify**
   https://app.netlify.com/sites/elevateforhumanityfix/settings/deploys

2. **Link Repository**
   - Click "Link repository"
   - Choose GitHub
   - Select: `elevateforhumanity/fix2`
   - Branch: `main`

3. **Build Settings**
   - Build command: `pnpm install && pnpm build`
   - Publish directory: `dist`
   - Node version: `20`

4. **Environment Variables**
   https://app.netlify.com/sites/elevateforhumanityfix/settings/env
   
   Add:
   ```
   VITE_API_URL=https://api.elevateforhumanity.org
   VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

5. **Deploy**
   - Netlify will auto-deploy on every push
   - No GitHub Actions needed
   - No secrets needed

---

## Diagnostic Checklist

If deployment still doesn't work:

### Check GitHub Actions:
- [ ] Actions enabled in repo settings
- [ ] Workflow file exists (`.github/workflows/deploy-to-netlify.yml`)
- [ ] All 4 required secrets added
- [ ] Workflow triggered (check Actions tab)
- [ ] No errors in workflow logs

### Check Netlify:
- [ ] Site exists (elevateforhumanityfix)
- [ ] Auth token is valid
- [ ] Site ID is correct
- [ ] Environment variables set (if using Netlify integration)

### Check Build:
- [ ] `pnpm install` works locally
- [ ] `pnpm build` works locally
- [ ] `dist/` directory created
- [ ] No TypeScript errors
- [ ] No ESLint errors

---

## Current Workflow Details

**File:** `.github/workflows/deploy-to-netlify.yml`

**Triggers:**
- Push to `main` branch
- Manual dispatch

**Steps:**
1. Checkout code
2. Setup Node.js 20.11.1
3. Setup pnpm 9.7.0
4. Install dependencies
5. Build project (creates `dist/`)
6. Deploy to Netlify

**Required Secrets:**
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## Expected Results

After enabling:

✅ **Push to main** → Automatic deployment
✅ **Build time:** 3-5 minutes
✅ **Deploy time:** 1-2 minutes
✅ **Total:** 5-7 minutes from push to live

✅ **No skeleton pages**
✅ **Content loads immediately**
✅ **API calls work**
✅ **Supabase connected**

---

## Troubleshooting

### "Workflow not found"
- Check if Actions are enabled
- Refresh the Actions page
- Push a new commit to trigger

### "Secret not found"
- Verify secret names match exactly
- Check for typos
- Re-add the secret

### "Build failed"
- Check workflow logs for errors
- Verify dependencies install
- Test build locally first

### "Deploy failed"
- Verify Netlify token is valid
- Check Site ID is correct
- Ensure Netlify site exists

---

## Summary

**Problem:** GitHub Actions not running
**Cause:** Missing secrets
**Solution:** Add 4 secrets to GitHub
**Time:** 5 minutes
**Result:** Automatic deployments on every push

**Alternative:** Use Netlify GitHub integration (no secrets needed)

---

**Choose one approach and your deploys will be active!** 🚀

*Generated: $(date -Is)*
