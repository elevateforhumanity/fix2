# 🚀 Production Deployment Checklist

## Pre-Deployment Tasks

### 1. Database Migration ✅

**Run this SQL migration:**

```bash
# Copy the migration file content
cat supabase/migrations/20241212_complete_production_setup.sql

# Go to Supabase Dashboard → SQL Editor
# Paste and run the migration
# Verify all tables created successfully
```

**Verify tables created:**
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'forum_categories',
  'forum_threads',
  'forum_posts',
  'forum_votes',
  'chat_conversations',
  'chat_messages',
  'ai_chat_context',
  'push_notification_tokens',
  'offline_sync_queue',
  'payment_methods',
  'payment_plans',
  'payment_installments',
  'user_activity_log',
  'course_analytics'
);
```

**Expected:** 14 tables

---

### 2. Environment Variables ✅

**Copy to Vercel Dashboard:**

Go to: **Vercel → Settings → Environment Variables**

```bash
# Required Variables
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
NEXT_PUBLIC_AFFIRM_PUBLIC_KEY=your_affirm_key
AFFIRM_PRIVATE_KEY=your_affirm_private_key
OPENAI_API_KEY=sk-proj-...
SENDGRID_API_KEY=SG.your_key
SENDGRID_FROM_EMAIL=noreply@elevateforhumanity.org
NEXT_PUBLIC_SITE_URL=https://elevateforhumanity.org
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=https://elevateforhumanity.org
SESSION_SECRET=$(openssl rand -base64 32)
```

**Verify all set:**
- [ ] Database variables (3)
- [ ] Stripe variables (3)
- [ ] PayPal variables (2)
- [ ] Affirm variables (2)
- [ ] OpenAI variable (1)
- [ ] Email variables (2)
- [ ] Site variables (2)
- [ ] Security variables (2)

**Total:** 17 required variables

---

### 3. Webhook Configuration ✅

**Stripe Webhook:**
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://elevateforhumanity.org/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook secret
5. Add to Vercel as `STRIPE_WEBHOOK_SECRET`

**PayPal Webhook:**
1. Go to PayPal Developer Dashboard
2. Add webhook: `https://elevateforhumanity.org/api/webhooks/paypal`
3. Select events:
   - `PAYMENT.CAPTURE.COMPLETED`
   - `PAYMENT.CAPTURE.DENIED`
   - `CHECKOUT.ORDER.APPROVED`

---

### 4. Security Fixes ✅

**Run security fix script:**
```bash
cd /workspaces/fix2
bash scripts/fix-security-issues.sh
```

**Verify:**
- [ ] All console.log removed
- [ ] No dangerouslySetInnerHTML (or properly sanitized)
- [ ] No hardcoded secrets
- [ ] CSRF protection enabled
- [ ] Rate limiting configured

---

### 5. Build Test ✅

**Test production build:**
```bash
cd /workspaces/fix2
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (X/X)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    X kB          X kB
├ ○ /programs                            X kB          X kB
├ ○ /programs/[slug]                     X kB          X kB
└ ○ /api/...                             X kB          X kB

○  (Static)  prerendered as static content
```

**If build fails:**
1. Check error message
2. Fix TypeScript errors
3. Fix missing dependencies
4. Retry build

---

## Deployment Steps

### 1. Deploy to Vercel ✅

**Option A: Automatic (Recommended)**
```bash
# Push to main branch
git add -A
git commit -m "Production deployment"
git push origin main

# Vercel auto-deploys
# Watch deployment at vercel.com/dashboard
```

**Option B: Manual**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Follow prompts
```

---

### 2. Verify Deployment ✅

**Check these URLs:**

- [ ] https://elevateforhumanity.org (homepage)
- [ ] https://elevateforhumanity.org/programs (programs page)
- [ ] https://elevateforhumanity.org/programs/hvac-technician (program detail)
- [ ] https://elevateforhumanity.org/forums (discussion forums)
- [ ] https://elevateforhumanity.org/api/health (API health check)

**All should return 200 OK**

---

### 3. Test Critical Flows ✅

**Test enrollment:**
1. Go to any program page
2. Click "Enroll Now"
3. Complete enrollment form
4. Test payment (use test card: 4242 4242 4242 4242)
5. Verify enrollment confirmation
6. Check database for enrollment record

**Test AI chat:**
1. Click chat widget (bottom right)
2. Send message: "I need help with enrollment"
3. Verify AI responds
4. Verify conversation saved to database

**Test forums:**
1. Go to /forums
2. Click a category
3. Create new thread
4. Post reply
5. Verify thread and post saved

---

### 4. Monitor Deployment ✅

**Watch for errors:**
```bash
# View Vercel logs
vercel logs --follow

# Or in dashboard
# Vercel → Deployments → [Latest] → Logs
```

**Check for:**
- [ ] No 500 errors
- [ ] No database connection errors
- [ ] No API errors
- [ ] No missing environment variables

---

## Post-Deployment Tasks

### 1. Verify Analytics ✅

**Google Analytics:**
- [ ] Pageviews tracking
- [ ] Event tracking
- [ ] Conversion tracking

**Facebook Pixel:**
- [ ] PageView events
- [ ] Purchase events
- [ ] Lead events

---

### 2. Test Payment Processing ✅

**Test with real $1 transaction:**
```bash
# Use real card (will be charged $1)
# Card: Your real card
# Amount: $1.00
# Verify charge in Stripe Dashboard
# Refund the $1
```

---

### 3. Set Up Monitoring ✅

**Vercel Monitoring:**
- [ ] Enable Web Analytics
- [ ] Enable Speed Insights
- [ ] Set up error alerts
- [ ] Set up performance alerts

**Supabase Monitoring:**
- [ ] Check database performance
- [ ] Monitor API usage
- [ ] Set up backup schedule
- [ ] Enable point-in-time recovery

**Stripe Monitoring:**
- [ ] Enable email notifications
- [ ] Set up Slack alerts (optional)
- [ ] Monitor payment success rate
- [ ] Track refund rate

---

### 4. Performance Optimization ✅

**Check Core Web Vitals:**
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

**Run Lighthouse audit:**
```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://elevateforhumanity.org --view

# Target scores:
# Performance: >90
# Accessibility: >95
# Best Practices: >95
# SEO: >95
```

---

### 5. Security Verification ✅

**SSL Certificate:**
- [ ] HTTPS enabled
- [ ] Certificate valid
- [ ] No mixed content warnings

**Security Headers:**
- [ ] Content-Security-Policy
- [ ] X-Frame-Options
- [ ] X-Content-Type-Options
- [ ] Strict-Transport-Security

**Test security:**
```bash
# Run security scan
npm audit

# Fix vulnerabilities
npm audit fix

# Check for high/critical issues
npm audit --audit-level=high
```

---

### 6. Backup Verification ✅

**Database Backup:**
- [ ] Automatic daily backups enabled
- [ ] Point-in-time recovery enabled
- [ ] Test restore process

**Code Backup:**
- [ ] Git repository up to date
- [ ] All branches pushed
- [ ] Tags created for releases

---

## Launch Checklist

### Pre-Launch (1 day before)

- [ ] All environment variables set
- [ ] Database migration complete
- [ ] Webhooks configured
- [ ] Build passing
- [ ] All tests passing
- [ ] Security audit complete
- [ ] Performance audit complete
- [ ] Backup systems verified

### Launch Day

- [ ] Deploy to production
- [ ] Verify all URLs working
- [ ] Test critical flows
- [ ] Monitor for errors
- [ ] Check analytics tracking
- [ ] Verify payment processing
- [ ] Test AI chat
- [ ] Test forums

### Post-Launch (1 week)

- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Review user feedback
- [ ] Fix any issues
- [ ] Optimize slow pages
- [ ] Update documentation

---

## Rollback Plan

**If deployment fails:**

```bash
# Option 1: Rollback in Vercel Dashboard
# Vercel → Deployments → Previous → Promote to Production

# Option 2: Rollback via CLI
vercel rollback [previous-deployment-url]

# Option 3: Revert Git commit
git revert HEAD
git push origin main
```

---

## Support Contacts

**Technical Issues:**
- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support
- Stripe Support: https://support.stripe.com

**Emergency Contacts:**
- DevOps: devops@elevateforhumanity.org
- CTO: cto@elevateforhumanity.org
- On-call: +1-XXX-XXX-XXXX

---

## Success Criteria

**Deployment is successful when:**

- [ ] All pages load without errors
- [ ] All critical flows work
- [ ] Payment processing works
- [ ] AI chat responds
- [ ] Forums functional
- [ ] Analytics tracking
- [ ] Performance targets met
- [ ] Security audit passed
- [ ] No critical errors in logs
- [ ] Monitoring alerts configured

---

## Final Verification

**Run this command to verify everything:**

```bash
#!/bin/bash

echo "🔍 Running final verification..."

# Check build
echo "✓ Checking build..."
npm run build

# Check types
echo "✓ Checking types..."
npm run type-check

# Check linting
echo "✓ Checking linting..."
npm run lint

# Check tests
echo "✓ Running tests..."
npm test

# Check security
echo "✓ Checking security..."
npm audit --audit-level=high

echo "✅ All checks passed!"
echo "🚀 Ready for production deployment!"
```

---

## Post-Deployment Monitoring

**First 24 hours:**
- Monitor error rates every hour
- Check performance metrics
- Review user feedback
- Fix critical issues immediately

**First week:**
- Daily error rate review
- Performance optimization
- User feedback analysis
- Feature usage tracking

**First month:**
- Weekly performance review
- Monthly security audit
- User satisfaction survey
- Feature roadmap planning

---

**Last Updated:** December 2024
**Status:** Ready for Production ✅
**Deployment Date:** [To be filled]
**Deployed By:** [To be filled]
