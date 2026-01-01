# 🚀 EXECUTE DEPLOYMENT - Copy & Paste Commands

**Status:** Ready to deploy  
**Environment:** Run from your local machine or terminal with Node.js  
**Time:** 10-15 minutes

---

## ⚠️ IMPORTANT: Run These Commands From Your Local Machine

The Gitpod environment doesn't have Node.js/npm installed. You need to run these from:

- Your local development machine
- A terminal with Node.js installed
- GitHub Codespaces (if configured)

---

## 📋 STEP-BY-STEP DEPLOYMENT

### Step 1: Install Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Verify installation
vercel --version
```

---

### Step 2: Clone Repository (if not already on local machine)

```bash
# Clone the repository
git clone https://github.com/elevateforhumanity/fix2.git

# Navigate to directory
cd fix2

# Install dependencies
npm install
```

---

### Step 3: Login to Vercel

```bash
# Login to Vercel
vercel login

# This will open a browser for authentication
# Follow the prompts
```

---

### Step 4: Link Project to Vercel

```bash
# Link to existing Vercel project
vercel link

# Answer the prompts:
# ? Set up and deploy "~/fix2"? [Y/n] Y
# ? Which scope? [Your account/org]
# ? Link to existing project? [Y/n] Y
# ? What's the name of your existing project? elevate-for-humanity
```

---

### Step 5: Add Environment Variables

**Option A: Via Vercel CLI (Recommended)**

```bash
# Add Sentry DSN (REQUIRED)
vercel env add NEXT_PUBLIC_SENTRY_DSN production
# Paste: https://your-sentry-dsn@sentry.io/project-id
# Press Enter

# Add Supabase URL (REQUIRED)
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste: https://your-project.supabase.co
# Press Enter

# Add Supabase Anon Key (REQUIRED)
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste: your-anon-key
# Press Enter

# Add Supabase Service Role Key (REQUIRED)
vercel env add SUPABASE_SERVICE_ROLE_KEY production
# Paste: your-service-role-key
# Press Enter

# Add Stripe Keys (REQUIRED)
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production

# Add Email Service (REQUIRED)
vercel env add RESEND_API_KEY production
vercel env add EMAIL_FROM production
# Enter: noreply@elevateforhumanity.org

# Add AI Service (REQUIRED)
vercel env add OPENAI_API_KEY production

# Add Site Configuration (REQUIRED)
vercel env add NEXT_PUBLIC_SITE_URL production
# Enter: https://www.elevateforhumanity.org

vercel env add NEXTAUTH_SECRET production
# Generate with: openssl rand -base64 32
# Paste the generated secret

vercel env add NEXTAUTH_URL production
# Enter: https://www.elevateforhumanity.org

vercel env add NODE_ENV production
# Enter: production
```

**Option B: Via Vercel Dashboard**

1. Go to https://vercel.com
2. Select your project: **elevate-for-humanity**
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - Click **Add New**
   - Enter name and value
   - Select **Production**
   - Click **Save**

**Required Variables:**

```
NEXT_PUBLIC_SENTRY_DSN
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
RESEND_API_KEY
EMAIL_FROM
OPENAI_API_KEY
NEXT_PUBLIC_SITE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
NODE_ENV
```

---

### Step 6: Verify Environment Variables

```bash
# List all environment variables
vercel env ls

# You should see all the variables you added
```

---

### Step 7: Deploy to Production

```bash
# Deploy to production
vercel --prod

# This will:
# 1. Build your application
# 2. Upload to Vercel
# 3. Deploy to production
# 4. Show you the deployment URL

# Expected output:
# 🔍 Inspect: https://vercel.com/...
# ✅ Production: https://www.elevateforhumanity.org [2m]
```

---

### Step 8: Verify Deployment

```bash
# Wait 30 seconds for deployment to complete
sleep 30

# Check health endpoint
curl https://www.elevateforhumanity.org/api/health

# Expected response (200 OK):
# {"status":"healthy","timestamp":"2025-12-29T...","version":"build-..."}

# OR (503 Service Unavailable - still OK):
# {"status":"degraded","timestamp":"..."}
# This means site is running but some optional services aren't configured
```

---

### Step 9: Test in Browser

1. Open browser
2. Go to https://www.elevateforhumanity.org
3. Verify homepage loads
4. Open Developer Console (F12)
5. Check for errors
6. Navigate to a few pages
7. Test a form (if applicable)

---

## 🎯 QUICK DEPLOYMENT (If Already Configured)

If you've already done the setup once:

```bash
# Just deploy
vercel --prod
```

That's it! 🚀

---

## 📊 MONITORING AFTER DEPLOYMENT

### Check Deployment Status

```bash
# View recent deployments
vercel ls

# View logs
vercel logs

# View logs in real-time
vercel logs --follow
```

### Check Sentry

1. Go to https://sentry.io
2. Select your project
3. Check for errors
4. Monitor performance

### Check Vercel Dashboard

1. Go to https://vercel.com
2. Select your project
3. View Analytics
4. Check deployment logs

---

## 🐛 TROUBLESHOOTING

### "npm: command not found"

**Solution:** Install Node.js

```bash
# macOS
brew install node

# Ubuntu/Debian
sudo apt-get install nodejs npm

# Windows
# Download from https://nodejs.org
```

### "vercel: command not found"

**Solution:** Install Vercel CLI

```bash
npm install -g vercel
```

### "No token found"

**Solution:** Login to Vercel

```bash
vercel login
```

### "Project not linked"

**Solution:** Link project

```bash
vercel link
```

### Build Fails

**Solution:** Test build locally

```bash
# Run build locally
npm run build

# Fix any errors shown
# Then deploy again
vercel --prod
```

### Health Check Returns 503

**This is OK!** It means:

- ✅ Site is deployed and running
- ⚠️ Some optional services not configured
- ✅ Core functionality works

**To get 200 (fully healthy):**

- Add all environment variables
- Configure all services (Stripe, Resend, etc.)
- Redeploy

---

## 🔄 REDEPLOYMENT

If you need to redeploy:

```bash
# Redeploy to production
vercel --prod

# Or force redeploy
vercel --prod --force
```

---

## ↩️ ROLLBACK

If something goes wrong:

```bash
# View previous deployments
vercel ls

# Rollback to previous deployment
vercel rollback

# Or rollback to specific deployment
vercel rollback [deployment-url]
```

---

## 📝 DEPLOYMENT CHECKLIST

Before deploying:

- [ ] Node.js installed
- [ ] Vercel CLI installed
- [ ] Logged into Vercel
- [ ] Project linked
- [ ] Environment variables added
- [ ] Build tested locally

After deploying:

- [ ] Health endpoint returns 200 or 503
- [ ] Homepage loads
- [ ] No console errors
- [ ] Sentry receiving events
- [ ] Navigation works
- [ ] Forms work

---

## 🎊 SUCCESS INDICATORS

You'll know deployment succeeded when:

1. **Vercel CLI shows:**

   ```
   ✅ Production: https://www.elevateforhumanity.org
   ```

2. **Health endpoint responds:**

   ```bash
   curl https://www.elevateforhumanity.org/api/health
   # Returns JSON with status
   ```

3. **Browser shows:**
   - Homepage loads
   - No console errors
   - Navigation works

4. **Sentry shows:**
   - Project receiving events
   - No critical errors

---

## 🚀 FINAL DEPLOYMENT COMMAND

**Copy and paste this:**

```bash
# Full deployment sequence
cd fix2 && \
npm install && \
vercel login && \
vercel link && \
vercel --prod
```

**Or if already configured:**

```bash
cd fix2 && vercel --prod
```

---

## 📞 NEED HELP?

### Quick Reference

```bash
# Check status
vercel ls

# View logs
vercel logs

# Check env vars
vercel env ls

# Redeploy
vercel --prod

# Rollback
vercel rollback
```

### Documentation

- **Vercel Docs:** https://vercel.com/docs
- **Deployment Guide:** See `DEPLOY_NOW.md`
- **Environment Variables:** See `VERCEL_ENV_VARS_COMPLETE.md`
- **Sentry Setup:** See `SENTRY_SETUP_COMPLETE.md`

---

## ✅ YOU'RE READY!

**Run this command to deploy:**

```bash
vercel --prod
```

**Time to production:** 2-3 minutes (after setup)

**Good luck! 🍀**

---

**🎉 DEPLOY NOW AND GO LIVE! 🚀**
