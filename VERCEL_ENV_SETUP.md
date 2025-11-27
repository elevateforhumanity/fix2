# 🔧 Vercel Environment Variables Setup

## ⚠️ CRITICAL: Add These Environment Variables to Vercel

Your deployment needs these environment variables to work properly.

---

## 📋 Required Environment Variables

### 1. Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Where to get these:**
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy the values

### 2. Site Configuration
```
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
```

### 3. Analytics (Optional but Recommended)
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=XXXXXXXXXXXXXXX
```

**Where to get these:**
- Google Analytics: https://analytics.google.com
- Facebook Pixel: https://business.facebook.com/events_manager

### 4. Stripe (Optional - for payments)
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_XXXXXXXXXX
STRIPE_SECRET_KEY=sk_live_XXXXXXXXXX
```

**Where to get these:**
- Stripe Dashboard: https://dashboard.stripe.com/apikeys

---

## 🚀 How to Add Environment Variables to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Find project: `fix2-gpql`

2. **Navigate to Settings**
   - Click on the project
   - Click "Settings" tab
   - Click "Environment Variables" in sidebar

3. **Add Each Variable**
   - Click "Add New"
   - Enter variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Enter variable value
   - Select environments: Production, Preview, Development
   - Click "Save"

4. **Repeat for All Variables**
   - Add all required variables from the list above

5. **Redeploy**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"
   - Check "Use existing Build Cache"
   - Click "Redeploy"

### Method 2: Vercel CLI (If you have access)

```bash
# Login to Vercel
vercel login

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_SITE_URL production

# Redeploy
vercel --prod
```

---

## 🔍 Check Current Deployment Status

### View Deployment Logs

1. Go to: https://vercel.com/dashboard
2. Find project: `fix2-gpql`
3. Click on latest deployment
4. View build logs
5. Look for errors

### Common Error Messages

#### "supabaseUrl is required"
**Solution**: Add `NEXT_PUBLIC_SUPABASE_URL` environment variable

#### "Failed to collect page data"
**Solution**: Add all Supabase environment variables

#### "STRIPE_SECRET_KEY not set"
**Solution**: Add Stripe environment variables (or ignore if not using payments)

---

## 🔄 Trigger Redeployment

### After Adding Environment Variables

**Option 1: Redeploy from Dashboard**
1. Go to Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Confirm

**Option 2: Push Empty Commit**
```bash
git commit --allow-empty -m "Trigger redeployment"
git push origin main
```

**Option 3: Use Vercel CLI**
```bash
vercel --prod
```

---

## ✅ Verify Deployment Success

### After Redeployment Completes

1. **Check Build Logs**
   - Should show "✓ Compiled successfully"
   - Should show "✓ Generating static pages"
   - Should show "Build Completed"

2. **Visit Your Site**
   - Go to: https://www.elevateforhumanity.org
   - Homepage should load
   - Footer should show all 3 entities
   - No console errors

3. **Test Key Pages**
   - Homepage: /
   - Programs: /programs
   - About: /about
   - Apply: /apply

---

## 🐛 Troubleshooting

### Deployment Still Failing?

#### Check Build Logs
Look for specific error messages in Vercel dashboard

#### Common Issues

**1. TypeScript Errors**
- Already fixed: TypeScript strict mode is disabled
- Should not be an issue

**2. Missing Environment Variables**
- Add all required variables
- Make sure they're set for "Production" environment

**3. Build Timeout**
- Increase timeout in Vercel settings
- Or optimize build (already done)

**4. Memory Issues**
- Already configured: NODE_OPTIONS=--max-old-space-size=4096
- Should not be an issue

---

## 📊 Expected Build Output

### Successful Build Should Show:

```
✓ Compiled successfully in ~12s
✓ Collecting page data
✓ Generating static pages (467/467)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    7.82 kB        102 kB
├ ○ /about                               1.42 kB        95.5 kB
├ ○ /programs                            1.89 kB        96 kB
└ ... (467 routes total)

Build Completed in X seconds
```

---

## 🎯 Quick Start Checklist

- [ ] Go to Vercel dashboard
- [ ] Find project: fix2-gpql
- [ ] Add environment variables:
  - [ ] NEXT_PUBLIC_SUPABASE_URL
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
  - [ ] SUPABASE_SERVICE_ROLE_KEY
  - [ ] NEXT_PUBLIC_SITE_URL
  - [ ] NEXT_PUBLIC_GA_MEASUREMENT_ID (optional)
  - [ ] NEXT_PUBLIC_FACEBOOK_PIXEL_ID (optional)
- [ ] Trigger redeployment
- [ ] Wait 1-2 minutes
- [ ] Check deployment logs
- [ ] Visit site to verify

---

## 📞 Need Help?

### Resources
- Vercel Docs: https://vercel.com/docs/environment-variables
- Supabase Docs: https://supabase.com/docs/guides/api
- Project Docs: See DEPLOYMENT_READY.md

### Check These Files
- BUILD_SUCCESS.md - Build details
- DEPLOYMENT_STATUS.md - Deployment tracking
- START_HERE.md - Quick start guide

---

**Status**: Waiting for environment variables  
**Next Action**: Add environment variables in Vercel dashboard  
**Expected Time**: 5 minutes to add vars + 2 minutes to redeploy
