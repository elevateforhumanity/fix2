# 🚀 DEPLOY NOW - Step by Step

**Status:** Ready to deploy  
**Time Required:** 10 minutes  
**Date:** December 29, 2025

---

## 🎯 PRE-DEPLOYMENT CHECKLIST

Before deploying, let's verify everything is ready:

### ✅ Quick Verification

```bash
# 1. Check if you're in the right directory
pwd
# Should show: /workspaces/fix2

# 2. Check git status
git status
# Commit any changes if needed

# 3. Check if Vercel CLI is installed
vercel --version
# If not installed: npm i -g vercel
```

---

## 🚀 DEPLOYMENT OPTIONS

### Option 1: Automated Deployment (Recommended)

```bash
# Run the automated deployment script
./scripts/deploy-production.sh
```

**This script will:**
1. ✅ Check git status
2. ✅ Verify environment variables
3. ✅ Run tests
4. ✅ Build the application
5. ✅ Deploy to Vercel
6. ✅ Verify health endpoint
7. ✅ Run smoke tests
8. ✅ Show deployment summary

---

### Option 2: Manual Deployment

If you prefer manual control:

```bash
# Step 1: Install Vercel CLI (if not installed)
npm i -g vercel

# Step 2: Login to Vercel
vercel login

# Step 3: Link project (if not linked)
vercel link

# Step 4: Deploy to production
vercel --prod
```

---

### Option 3: Quick Deploy (Fastest)

```bash
# Just deploy (assumes everything is configured)
vercel --prod
```

---

## ⚙️ ENVIRONMENT VARIABLES

### Critical Variables Needed in Vercel

Before deploying, ensure these are in Vercel:

```bash
# Check what's in Vercel
vercel env ls

# Add missing variables
vercel env add NEXT_PUBLIC_SENTRY_DSN
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# ... etc
```

### Quick Add All Variables

```bash
# If you have .env.local configured
cat .env.local | grep -v '^#' | grep -v '^$' | while read line; do
  var_name=$(echo $line | cut -d'=' -f1)
  echo "Add $var_name to Vercel manually"
done
```

---

## 🎬 DEPLOYMENT STEPS

### Step-by-Step Manual Deployment

#### 1. Prepare for Deployment

```bash
# Ensure you're on main branch
git checkout main

# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Run tests
npm run lint
npm test
```

#### 2. Build Test

```bash
# Test build locally
npm run build

# If successful, you'll see:
# ✓ Compiled successfully
```

#### 3. Deploy

```bash
# Deploy to production
vercel --prod

# You'll see:
# 🔍 Inspect: https://vercel.com/...
# ✅ Production: https://www.elevateforhumanity.org
```

#### 4. Verify Deployment

```bash
# Wait 30 seconds for deployment to complete
sleep 30

# Check health endpoint
curl https://www.elevateforhumanity.org/api/health

# Should return:
# {"status":"healthy","timestamp":"..."}
```

#### 5. Run Smoke Tests

```bash
# Run smoke tests on production
./scripts/smoke-test-portal.sh https://www.elevateforhumanity.org
```

---

## 🔍 POST-DEPLOYMENT VERIFICATION

### 1. Check Health Endpoint

```bash
curl https://www.elevateforhumanity.org/api/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-29T...",
  "version": "build-...",
  "checks": {
    "database": { "status": "pass" },
    "stripe": { "status": "pass" },
    "resend": { "status": "pass" }
  }
}
```

### 2. Check Homepage

```bash
# Check if homepage loads
curl -I https://www.elevateforhumanity.org

# Should return: HTTP/2 200
```

### 3. Check Sentry

1. Go to https://sentry.io
2. Select your project
3. Check for any errors
4. Verify events are being received

### 4. Test Key Features

**In Browser:**
1. Visit https://www.elevateforhumanity.org
2. Check homepage loads
3. Test navigation
4. Check console for errors (F12)
5. Test a form submission
6. Verify no console errors

---

## 🐛 TROUBLESHOOTING

### Deployment Fails

**Error: "No token found"**
```bash
# Login to Vercel
vercel login
```

**Error: "Project not linked"**
```bash
# Link project
vercel link
```

**Error: "Build failed"**
```bash
# Check build locally
npm run build

# Fix any errors shown
# Then deploy again
```

### Health Check Returns 503

**This is normal if:**
- Some services not configured
- Environment variables missing

**Fix:**
```bash
# Add missing environment variables
vercel env add VARIABLE_NAME

# Redeploy
vercel --prod
```

### Site Not Loading

**Check:**
1. Deployment completed successfully
2. DNS is configured correctly
3. No errors in Vercel logs

```bash
# Check logs
vercel logs

# Check deployment status
vercel ls
```

---

## 📊 MONITORING AFTER DEPLOYMENT

### Immediate Monitoring (First Hour)

```bash
# Watch logs in real-time
vercel logs --follow

# Check health every minute
watch -n 60 'curl https://www.elevateforhumanity.org/api/health'
```

### Sentry Dashboard

1. Go to https://sentry.io
2. Watch for errors
3. Check performance metrics
4. Review user sessions

### Vercel Dashboard

1. Go to https://vercel.com
2. Select your project
3. Check Analytics
4. Review deployment logs

---

## ✅ SUCCESS CHECKLIST

After deployment, verify:

- [ ] Deployment completed successfully
- [ ] Health endpoint returns 200
- [ ] Homepage loads without errors
- [ ] No console errors in browser
- [ ] Sentry receiving events
- [ ] All environment variables set
- [ ] DNS resolving correctly
- [ ] SSL certificate active
- [ ] Forms working
- [ ] Authentication working
- [ ] Payments working (if applicable)

---

## 🎉 DEPLOYMENT COMPLETE!

### What to Do Next

**Immediate (First 24 Hours):**
1. Monitor error rates in Sentry
2. Check performance metrics
3. Test all critical features
4. Watch for user feedback
5. Fix any issues immediately

**This Week:**
1. Review analytics
2. Check performance
3. Gather user feedback
4. Plan improvements
5. Optimize based on data

**This Month:**
1. Review metrics
2. Implement improvements
3. Scale as needed
4. Add new features
5. Iterate based on feedback

---

## 🆘 NEED HELP?

### Quick Commands

```bash
# Check deployment status
vercel ls

# View logs
vercel logs

# Rollback to previous deployment
vercel rollback

# Check environment variables
vercel env ls

# Redeploy
vercel --prod
```

### Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Sentry Docs:** https://docs.sentry.io
- **Project Docs:** See all .md files in repository

---

## 🚀 READY TO DEPLOY?

### Quick Deploy Command

```bash
# Option 1: Automated (Recommended)
./scripts/deploy-production.sh

# Option 2: Manual
vercel --prod

# Option 3: With setup
./scripts/complete-setup.sh
```

---

## 📞 EMERGENCY ROLLBACK

If something goes wrong:

```bash
# Rollback to previous deployment
vercel rollback

# Or specify a deployment
vercel rollback [deployment-url]

# Check previous deployments
vercel ls
```

---

**🎊 YOU'RE READY TO DEPLOY! 🚀**

**Run this command now:**
```bash
./scripts/deploy-production.sh
```

**Or:**
```bash
vercel --prod
```

**Good luck! 🍀**
