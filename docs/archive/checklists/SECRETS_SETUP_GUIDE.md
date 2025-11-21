# Secrets Setup Guide - Complete Links

This guide provides direct links to obtain all required secrets for Vercel deployment.

---

## 🔐 Required Secrets Checklist

You need to configure **8 secrets** in your GitHub repository:

**Where to add them:**  
[https://github.com/elevateforhumanity/fix2/settings/secrets/actions](https://github.com/elevateforhumanity/fix2/settings/secrets/actions)

---

## 1️⃣ Vercel Secrets (3 required)

### VERCEL_TOKEN
**What it is:** Authentication token for Vercel CLI  
**Where to get it:**
1. Go to [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name it: `GitHub Actions - fix2`
4. Set scope: `Full Account`
5. Click "Create"
6. Copy the token immediately (shown only once)

### VERCEL_ORG_ID
**What it is:** Your Vercel organization/team ID  
**Where to get it:**

**Option A - From Project Settings:**
1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project (or create one if needed)
3. Go to Settings → General
4. Scroll to "Project ID" section
5. Copy the **Team ID** or **Organization ID**

**Option B - From CLI:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login and link project
vercel login
vercel link

# Your org ID will be in .vercel/project.json
cat .vercel/project.json
```

**Option C - From URL:**
- Your org ID is in the URL: `https://vercel.com/[ORGID]/[project-name]

### VERCEL_PROJECT_ID
**What it is:** Your specific project ID in Vercel  
**Where to get it:**

**Option A - From Project Settings:**
1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → General
4. Find "Project ID" at the top
5. Copy the ID

**Option B - From CLI:**
```bash
vercel link
cat .vercel/project.json
# Look for "projectId"
```

**Option C - Create New Project:**
1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository: `elevateforhumanity/fix2`
3. Configure project settings
4. After creation, go to Settings → General to get Project ID

---

## 2️⃣ Supabase Secrets (2 required)

### VITE_SUPABASE_URL
**What it is:** Your Supabase project URL  
**Where to get it:**
1. Go to [https://supabase.com/dashboard/projects](https://supabase.com/dashboard/projects)
2. Select your project (or create one)
3. Go to Settings → API
4. Copy the **Project URL** (looks like: `https://xxxxx.supabase.co)

**Don't have a project?**
- Create one: [https://supabase.com/dashboard/new](https://supabase.com/dashboard/new)

### VITE_SUPABASE_ANON_KEY
**What it is:** Public anonymous key for Supabase client  
**Where to get it:**
1. Go to [https://supabase.com/dashboard/projects](https://supabase.com/dashboard/projects)
2. Select your project
3. Go to Settings → API
4. Copy the **anon public** key (under "Project API keys")

---

## 3️⃣ Stripe Secrets (1 required)

### VITE_STRIPE_PUBLISHABLE_KEY
**What it is:** Public key for Stripe.js client  
**Where to get it:**

**For Testing (Recommended First):**
1. Go to [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. Copy the **Publishable key** (starts with `pk_test_`)

**For Production:**
1. Go to [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
2. Copy the **Publishable key** (starts with `pk_live_`)
3. ⚠️ Make sure your account is activated for live mode

**Don't have a Stripe account?**
- Sign up: [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)

---

## 4️⃣ Application URLs (2 required)

### VITE_API_URL
**What it is:** Your backend API URL  
**Options:**

**If you have a backend deployed:**
- Use your backend URL (e.g., `https://api.yourdomain.com)

**If using Supabase Functions:**
- Use: `https://[your-project-ref].supabase.co/functions/v1
- Get project ref from Supabase dashboard URL

**For development/testing:**
- Use: `https://[your-project-ref].supabase.co

### VITE_SITE_URL
**What it is:** Your frontend site URL  
**Options:**

**Before first deployment:**
- Use a placeholder: `https://fix2.vercel.app (will update after deployment)

**After Vercel deployment:**
- Use your actual Vercel URL (e.g., `https://your-project.vercel.app)
- Or your custom domain if configured

**Note:** You can update this secret after the first deployment with the actual URL.

---

## 📝 How to Add Secrets to GitHub

1. Go to: [https://github.com/elevateforhumanity/fix2/settings/secrets/actions](https://github.com/elevateforhumanity/fix2/settings/secrets/actions)

2. Click **"New repository secret"**

3. For each secret:
   - **Name:** Enter the exact secret name (e.g., `VERCEL_TOKEN`)
   - **Value:** Paste the value you obtained
   - Click **"Add secret"**

4. Repeat for all 8 secrets

---

## ✅ Verification Checklist

After adding all secrets, verify you have:

- [ ] `VERCEL_TOKEN` - From Vercel account tokens
- [ ] `VERCEL_ORG_ID` - From Vercel project settings
- [ ] `VERCEL_PROJECT_ID` - From Vercel project settings
- [ ] `VITE_SUPABASE_URL` - From Supabase project API settings
- [ ] `VITE_SUPABASE_ANON_KEY` - From Supabase project API settings
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` - From Stripe dashboard
- [ ] `VITE_API_URL` - Your backend/Supabase URL
- [ ] `VITE_SITE_URL` - Your frontend URL (can be placeholder initially)

---

## 🚀 After Adding Secrets

Once all secrets are configured:

1. **Trigger Deployment:**
   - Push to main branch, OR
   - Go to [Actions](https://github.com/elevateforhumanity/fix2/actions/workflows/vercel-deploy.yml) → "Run workflow"

2. **Monitor Progress:**
   - Watch the workflow run in [GitHub Actions](https://github.com/elevateforhumanity/fix2/actions)
   - Check deployment in [Vercel Dashboard](https://vercel.com/dashboard)

3. **Update VITE_SITE_URL:**
   - After first successful deployment, get your Vercel URL
   - Update the `VITE_SITE_URL` secret with the actual URL
   - Redeploy to apply the change

---

## 🆘 Troubleshooting

### Can't find Vercel project?
- Create new project: [https://vercel.com/new](https://vercel.com/new)
- Import from GitHub: `elevateforhumanity/fix2`

### Don't have Supabase project?
- Create new project: [https://supabase.com/dashboard/new](https://supabase.com/dashboard/new)
- Choose a region close to your users
- Free tier is sufficient for testing

### Stripe key not working?
- Make sure you're using the **Publishable** key (not Secret key)
- Use **Test mode** keys first (pk_test_...)
- Verify your Stripe account is activated

### Need help with API URL?
- If unsure, use your Supabase project URL as the API URL
- Format: `https://[project-ref].supabase.co

---

## 📚 Additional Resources

- **Vercel Docs:** [https://vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs:** [https://supabase.com/docs](https://supabase.com/docs)
- **Stripe Docs:** [https://stripe.com/docs](https://stripe.com/docs)
- **GitHub Secrets:** [https://docs.github.com/en/actions/security-guides/encrypted-secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

*Generated for fix2 deployment - Last updated: 2025-11-08*
