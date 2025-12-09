# VERCEL ANALYTICS & MONITORING SETUP

**Last Updated:** December 8, 2024  
**Status:** Google Analytics & Facebook Pixel working, Sentry needs setup

---

## ✅ ALREADY CONFIGURED (Working)

### Google Analytics
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=✅ Already set in Vercel
```

**Status:** ACTIVE ✅  
**Tracking:** Page views, events, conversions  
**Dashboard:** [analytics.google.com](https://analytics.google.com)

### Facebook Pixel
```bash
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=✅ Already set in Vercel
```

**Status:** ACTIVE ✅  
**Tracking:** Page views, conversions, custom events  
**Dashboard:** [business.facebook.com/events_manager](https://business.facebook.com/events_manager)

---

## ❌ NEEDS CONFIGURATION

### Sentry (Error Tracking)

**Priority:** HIGH (Recommended for production)

**Environment Variables Needed:**
```bash
SENTRY_DSN=https://xxxxx@o123456.ingest.sentry.io/123456
SENTRY_ORG=elevate-for-humanity
SENTRY_PROJECT=fix2
SENTRY_AUTH_TOKEN=sntrys_xxxxx (for source maps)
```

---

## 🚀 SENTRY SETUP GUIDE (5 Minutes)

### Step 1: Create Sentry Account
1. Go to [sentry.io](https://sentry.io)
2. Click "Get Started" (free tier: 5,000 errors/month)
3. Sign up with GitHub or email

### Step 2: Create Project
1. Click "Create Project"
2. Select platform: **Next.js**
3. Set alert frequency: **On every new issue**
4. Project name: `fix2` or `elevate-for-humanity`
5. Click "Create Project"

### Step 3: Get DSN
1. After project creation, you'll see the DSN
2. Copy the DSN (looks like: `https://xxxxx@o123456.ingest.sentry.io/123456`)
3. Save it for next step

### Step 4: Add to Vercel
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select project: `fix2`
3. Go to: **Settings → Environment Variables**
4. Add these variables:

```bash
# Required
SENTRY_DSN=https://xxxxx@o123456.ingest.sentry.io/123456

# Optional (for better error tracking)
SENTRY_ORG=elevate-for-humanity
SENTRY_PROJECT=fix2
SENTRY_ENVIRONMENT=production
```

5. Check all environments: Production, Preview, Development
6. Click "Save"

### Step 5: Redeploy
1. Go to **Deployments** tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Wait for deployment to complete

### Step 6: Test Error Tracking
1. Visit your site
2. Trigger a test error (or wait for real errors)
3. Check Sentry dashboard: [sentry.io/organizations/your-org/issues](https://sentry.io/organizations/your-org/issues)

---

## 📊 WHAT EACH SERVICE TRACKS

### Google Analytics
**Tracks:**
- ✅ Page views
- ✅ User sessions
- ✅ Traffic sources
- ✅ User demographics
- ✅ Conversion goals
- ✅ Custom events

**Use for:**
- Understanding user behavior
- Measuring marketing effectiveness
- Tracking conversion funnels
- Identifying popular pages

### Facebook Pixel
**Tracks:**
- ✅ Page views
- ✅ Custom conversions
- ✅ Add to cart events
- ✅ Purchase events
- ✅ Lead generation

**Use for:**
- Facebook ad optimization
- Retargeting campaigns
- Conversion tracking
- Audience building

### Sentry (When Configured)
**Tracks:**
- ❌ JavaScript errors (not yet)
- ❌ API errors (not yet)
- ❌ Performance issues (not yet)
- ❌ User sessions (not yet)
- ❌ Stack traces (not yet)

**Use for:**
- Catching bugs in production
- Monitoring error rates
- Debugging user issues
- Performance monitoring

---

## 🔧 VERCEL ANALYTICS (Built-in)

Vercel provides built-in analytics (no setup needed):

### Web Analytics
**Already Active:** ✅  
**Dashboard:** Vercel Dashboard → Analytics tab

**Tracks:**
- Page views
- Unique visitors
- Top pages
- Top referrers
- Devices & browsers

### Speed Insights
**Already Active:** ✅  
**Dashboard:** Vercel Dashboard → Speed Insights tab

**Tracks:**
- Core Web Vitals
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Time to First Byte (TTFB)

---

## 📈 CURRENT ANALYTICS STATUS

| Service | Status | Setup Required | Priority |
|---------|--------|----------------|----------|
| Google Analytics | ✅ Active | None | - |
| Facebook Pixel | ✅ Active | None | - |
| Vercel Analytics | ✅ Active | None | - |
| Vercel Speed Insights | ✅ Active | None | - |
| Sentry Error Tracking | ❌ Not Active | 5 minutes | HIGH |
| Performance Monitoring | ⚠️ Partial | Optional | MEDIUM |

---

## 🎯 RECOMMENDED SETUP

### For Production Launch (Minimum)
```bash
# Already Set ✅
NEXT_PUBLIC_GA_MEASUREMENT_ID=✅
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=✅

# Add This ❌
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

**Time Required:** 5 minutes  
**Cost:** Free (Sentry free tier)

### For Advanced Monitoring (Optional)
```bash
# Performance Monitoring
SENTRY_TRACES_SAMPLE_RATE=0.1  # 10% of transactions

# Session Replay
SENTRY_REPLAYS_SESSION_SAMPLE_RATE=0.1
SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE=1.0
```

---

## 🔍 HOW TO VERIFY ANALYTICS ARE WORKING

### Google Analytics
1. Go to [analytics.google.com](https://analytics.google.com)
2. Select your property
3. Go to: **Reports → Realtime**
4. Visit your site in another tab
5. You should see yourself in realtime view

### Facebook Pixel
1. Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) Chrome extension
2. Visit your site
3. Click the extension icon
4. Should show: "PageView event found"

### Sentry (After Setup)
1. Go to [sentry.io](https://sentry.io)
2. Select your project
3. Go to: **Issues**
4. Trigger a test error on your site
5. Error should appear in Sentry within seconds

---

## 🚨 COMMON ISSUES

### Google Analytics Not Tracking
**Problem:** No data in GA dashboard  
**Solution:**
1. Check `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in Vercel
2. Verify format: `G-XXXXXXXXXX`
3. Check browser ad blockers aren't blocking GA
4. Wait 24-48 hours for data to appear

### Facebook Pixel Not Firing
**Problem:** Pixel Helper shows no events  
**Solution:**
1. Check `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` is set
2. Verify format: `123456789012345` (15 digits)
3. Check browser privacy settings
4. Disable ad blockers for testing

### Sentry Not Catching Errors
**Problem:** Errors not appearing in Sentry  
**Solution:**
1. Verify `SENTRY_DSN` is set correctly
2. Check DSN format: `https://xxxxx@sentry.io/xxxxx`
3. Redeploy after adding DSN
4. Trigger a test error to verify

---

## 📞 SUPPORT CONTACTS

### Google Analytics
- Help Center: [support.google.com/analytics](https://support.google.com/analytics)
- Community: [support.google.com/analytics/community](https://support.google.com/analytics/community)

### Facebook Pixel
- Help Center: [facebook.com/business/help](https://facebook.com/business/help)
- Pixel Helper: [facebook.com/business/help/742478679120153](https://facebook.com/business/help/742478679120153)

### Sentry
- Docs: [docs.sentry.io](https://docs.sentry.io)
- Support: [sentry.io/support](https://sentry.io/support)
- Discord: [discord.gg/sentry](https://discord.gg/sentry)

---

## ✅ QUICK SETUP CHECKLIST

- [x] Google Analytics configured
- [x] Facebook Pixel configured
- [x] Vercel Analytics active
- [x] Vercel Speed Insights active
- [ ] Sentry DSN added to Vercel
- [ ] Sentry error tracking tested
- [ ] All analytics verified working

---

## 🎉 AFTER SENTRY SETUP

Once Sentry is configured, you'll get:

1. **Real-time Error Alerts**
   - Email notifications for new errors
   - Slack integration (optional)
   - Discord integration (optional)

2. **Detailed Error Reports**
   - Full stack traces
   - User context (browser, OS, etc.)
   - Breadcrumbs (user actions before error)
   - Source maps (exact line of code)

3. **Performance Monitoring**
   - Slow API calls
   - Database query performance
   - Page load times
   - Transaction traces

4. **Release Tracking**
   - Errors by deployment
   - Regression detection
   - Release health scores

---

## 💡 PRO TIPS

1. **Set up Sentry alerts** to get notified of critical errors immediately
2. **Use custom events** in GA to track specific user actions
3. **Create conversion funnels** to optimize user flow
4. **Monitor Core Web Vitals** in Vercel Speed Insights
5. **Set up Sentry releases** to track errors by deployment

---

## 🚀 NEXT STEPS

1. **Now:** Add Sentry DSN to Vercel (5 minutes)
2. **This Week:** Set up Sentry alerts and integrations
3. **This Month:** Review analytics data and optimize
4. **Ongoing:** Monitor errors and performance

**Total Setup Time:** 5 minutes  
**Total Cost:** $0 (all free tiers)  
**Impact:** HIGH (catch bugs before users report them)
