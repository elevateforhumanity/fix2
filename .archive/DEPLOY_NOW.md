# 🚀 DEPLOYMENT GUIDE - STEP BY STEP

## ⚠️ CURRENT STATUS

**Build Status:** ❌ Failed  
**Reason:** Missing environment variables  
**Action Required:** Set up environment variables first

---

## ✅ STEP 1: SET ENVIRONMENT VARIABLES (REQUIRED)

### Create `.env.local` file:

```bash
# Copy example file
cp .env.example .env.local

# Edit with your values
nano .env.local
```

### Required Variables:

```bash
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site URL (REQUIRED)
NEXT_PUBLIC_SITE_URL=https://elevateforhumanity.org

# Stripe (Optional - for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# OpenAI (Optional - for AI features)
OPENAI_API_KEY=sk-...

# Sentry (Optional - for monitoring)
NEXT_PUBLIC_SENTRY_DSN=https://...

# Indiana Career Connect (Optional)
ICC_API_KEY=your-icc-key
ICC_API_SECRET=your-icc-secret
ICC_API_URL=https://api.indianacareerconnect.com/v2
```

---

## ✅ STEP 2: DEPLOY DATABASE

### Option A: Supabase Dashboard (Recommended)

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click "SQL Editor" in left sidebar
4. Click "New Query"
5. Copy contents of `migrations/wioa-compliance-full.sql`
6. Paste into editor
7. Click "Run"
8. Wait for completion (30-60 seconds)

### Option B: Command Line

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your-project-ref

# Run migration
supabase db push
```

---

## ✅ STEP 3: FIX TYPESCRIPT ERRORS

```bash
# Run automated fixes
chmod +x scripts/fix-all-typescript-errors.sh
./scripts/fix-all-typescript-errors.sh

# Verify
pnpm run typecheck
```

**Expected Output:** `Found 0 errors`

---

## ✅ STEP 4: TEST BUILD LOCALLY

```bash
# Build
pnpm run build

# Test locally
pnpm run start

# Open browser
# http://localhost:3000
```

---

## ✅ STEP 5: DEPLOY TO VERCEL

### Option A: Vercel Dashboard (Easiest)

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Add environment variables (from Step 1)
5. Click "Deploy"
6. Wait 2-5 minutes
7. Visit your live site!

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Follow prompts
# Add environment variables when asked
```

---

## 📊 DEPLOYMENT MONITORING

### Check Deployment Status:

```bash
# Vercel CLI
vercel ls

# Check logs
vercel logs your-deployment-url
```

### Monitor in Real-Time:

1. **Vercel Dashboard:** [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - View build logs
   - Check deployment status
   - Monitor performance

2. **Sentry Dashboard:** [https://sentry.io](https://sentry.io)
   - Monitor errors
   - Track performance
   - View user sessions

---

## ✅ POST-DEPLOYMENT CHECKLIST

### Verify Everything Works:

- [ ] Site loads: `https://your-domain.com`
- [ ] Application form works: `/apply`
- [ ] Dashboard loads: `/workforce-board/dashboard`
- [ ] Database connected (check Supabase logs)
- [ ] No console errors
- [ ] Mobile responsive
- [ ] SSL certificate active

### Test Core Features:

```bash
# Test application submission
curl -X POST https://your-domain.com/api/applications \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Test","last_name":"User","email":"test@example.com"}'

# Expected: 200 OK with application ID
```

---

## 🔧 TROUBLESHOOTING

### Build Fails with "supabaseUrl is required"
**Solution:** Add `NEXT_PUBLIC_SUPABASE_URL` to environment variables

### Build Fails with TypeScript Errors
**Solution:** Run `./scripts/fix-all-typescript-errors.sh`

### Database Connection Fails
**Solution:** 
1. Check Supabase project is active
2. Verify environment variables are correct
3. Check RLS policies are enabled

### Images Not Loading
**Solution:** 
1. Run `./scripts/optimize-all-images.sh`
2. Verify images exist in `public/` directory
3. Check Next.js Image component configuration

---

## 📈 MONITORING AFTER DEPLOYMENT

### Daily Checks:

```bash
# Check error rate
vercel logs --follow

# Check performance
curl -I https://your-domain.com
```

### Weekly Checks:

- [ ] Review Sentry error reports
- [ ] Check Supabase database size
- [ ] Monitor API usage
- [ ] Review user feedback

### Monthly Checks:

- [ ] Security updates
- [ ] Dependency updates
- [ ] Performance optimization
- [ ] Backup verification

---

## 🎯 CURRENT ACTION REQUIRED

**Before you can deploy, you MUST:**

1. ✅ Set up Supabase project
2. ✅ Get Supabase credentials
3. ✅ Add environment variables
4. ✅ Deploy database schema
5. ✅ Fix TypeScript errors
6. ✅ Test build locally
7. ✅ Deploy to Vercel

---

## 📞 NEXT STEPS

### Right Now:

```bash
# 1. Get Supabase credentials
# Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api

# 2. Create .env.local
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=YOUR_URL_HERE
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_KEY_HERE
NEXT_PUBLIC_SITE_URL=https://elevateforhumanity.org
EOF

# 3. Deploy database
# Open Supabase SQL Editor
# Run: migrations/wioa-compliance-full.sql

# 4. Test build
pnpm run build

# 5. Deploy
vercel --prod
```

---

## ✅ DEPLOYMENT COMPLETE WHEN:

- ✅ Build succeeds with 0 errors
- ✅ Site loads at production URL
- ✅ Database queries work
- ✅ Application form submits successfully
- ✅ Dashboard displays data
- ✅ No console errors
- ✅ SSL certificate active
- ✅ Monitoring active

---

## 🚀 YOU'RE READY TO DEPLOY

**Follow the steps above in order. Each step must succeed before moving to the next.**

**Estimated Time:** 2-4 hours  
**Difficulty:** Medium  
**Support:** Check documentation files for detailed guides

**Start with Step 1: Set up environment variables.**
