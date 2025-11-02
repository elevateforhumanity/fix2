# Add Secrets to Netlify - Instructions

**Action Required:** Add environment variables to Netlify

---

## 🎯 Quick Steps

1. **Go to:** https://app.netlify.com/sites/elevateforhumanityfix2/settings/deploys#environment

2. **Click:** "Add a variable" button

3. **Add these three secrets:**

### Secret 1: OPENAI_API_KEY
- **Key:** `OPENAI_API_KEY`
- **Value:** Get from `.env` file (starts with `sk-proj-`)
- **Scopes:** Check all (Production, Deploy Previews, Branch deploys)

### Secret 2: STRIPE_SECRET_KEY
- **Key:** `STRIPE_SECRET_KEY`
- **Value:** Get from `.env` file (starts with `sk_live_`)
- **Scopes:** Check all (Production, Deploy Previews, Branch deploys)

### Secret 3: CLOUDFLARE_API_TOKEN
- **Key:** `CLOUDFLARE_API_TOKEN`
- **Value:** Get from `.env` file
- **Scopes:** Check all (Production, Deploy Previews, Branch deploys)

---

## 📋 Get Values from .env

Run this command to see the values:

```bash
grep -E "^(OPENAI_API_KEY|STRIPE_SECRET_KEY|CLOUDFLARE_API_TOKEN)" .env
```

Copy each value and paste into Netlify.

---

## 🚀 After Adding Secrets

Trigger a new deployment:

### Option 1: Git Push
```bash
git commit --allow-empty -m "chore: trigger deployment with new env vars"
git push origin main
```

### Option 2: Netlify Dashboard
1. Go to: https://app.netlify.com/sites/elevateforhumanityfix2/deploys
2. Click "Trigger deploy" → "Deploy site"

---

## ✅ Verify

After deployment completes:

1. **Check site:** https://elevateforhumanityfix2.netlify.app
2. **Verify:**
   - Homepage loads (Home.jsx)
   - Buy Black badge appears
   - VITA Program page works
   - No console errors

---

## 🔧 Alternative: Use Automation Scripts

If you have Netlify CLI access:

```bash
# Method 1: CLI Script
export NETLIFY_AUTH_TOKEN='your-token'
./scripts/puppet-netlify-cli-secrets.sh

# Method 2: GitHub Actions
gh workflow run puppet-add-netlify-secrets.yml -f confirm=yes
```

See `PUPPET_NETLIFY_SECRETS_GUIDE.md` for details.

---

**Time Required:** ~5 minutes  
**Difficulty:** Easy  
**Status:** Ready to proceed
