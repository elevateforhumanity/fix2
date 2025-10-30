# 🤖 Autopilot Deployment Setup

## ✅ What I've Done

1. ✅ Created GitHub Actions workflow for automatic deployment
2. ✅ Built your React app (dist/ folder ready)
3. ✅ Fixed homepage route (Home.jsx instead of Durable)
4. ✅ All API keys configured

## 🎯 Enable Autopilot Deployment (5 minutes)

### Step 1: Get Netlify Auth Token

1. Go to: [https://app.netlify.com/user/applications#personal-access-tokens](https://app.netlify.com/user/applications#personal-access-tokens)
2. Click **"New access token"**
3. Name it: `GitHub Actions Deploy`
4. Click **"Generate token"**
5. **Copy the token** (you won't see it again)

### Step 2: Get Netlify Site ID

1. Go to your Netlify site dashboard
2. Go to **Site settings** → **General**
3. Find **Site information** section
4. Copy the **API ID** (this is your Site ID)

### Step 3: Add Secrets to GitHub

1. Go to: [https://github.com/elevateforhumanity/fix2/settings/secrets/actions](https://github.com/elevateforhumanity/fix2/settings/secrets/actions)
2. Click **"New repository secret"** for each:

**Add these secrets:**

```
Name: NETLIFY_AUTH_TOKEN
Value: [paste your token from Step 1]

Name: NETLIFY_SITE_ID
Value: [paste your site ID from Step 2]

Name: VITE_SUPABASE_URL
Value: https://cuxzzpsyufcewtmicszk.supabase.co

Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA

Name: VITE_STRIPE_PUBLISHABLE_KEY
Value: pk_live_51RvqjzIRNf5vPH3ABuHQofarfuWw0PW5ww9eTwkj21A6VLJaLopuYbPdpAFCTU10O5uLgGHeCTBEcu9xeM8ErbFy004j2KPoSx
```

### Step 4: Trigger Deployment

Once secrets are added, the autopilot will deploy automatically when you:

**Option A: Push to main branch**
```bash
git commit --allow-empty -m "Trigger autopilot deployment"
git push origin main
```

**Option B: Manual trigger**
1. Go to: [https://github.com/elevateforhumanity/fix2/actions](https://github.com/elevateforhumanity/fix2/actions)
2. Click **"Deploy to Netlify"** workflow
3. Click **"Run workflow"** → **"Run workflow"**

## 🎉 What Happens Next

1. GitHub Actions will build your React app
2. Deploy to Netlify automatically
3. Your site goes live at https://elevateforhumanity.org
4. Home.jsx replaces the Durable landing page

## 🔄 Future Deployments

Every time you push to main branch, the autopilot will:
- ✅ Build your app
- ✅ Run tests
- ✅ Deploy to Netlify
- ✅ Update your live site

**No manual steps needed!**

---

## 🚀 Quick Deploy (Right Now)

If you want to deploy immediately without waiting for autopilot setup:

1. Go to: [https://app.netlify.com/](https://app.netlify.com/)
2. Find your site
3. Drag the `dist/` folder to deploy

**The `dist/` folder is already built and ready!**
