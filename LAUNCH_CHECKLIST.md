# 🚀 Launch Checklist - Quick Reference

**Status:** Ready to launch with critical fixes  
**Estimated Time:** 3-4 hours  
**Priority:** Complete items 1-5 before deployment

---

## 🔴 CRITICAL (Must Complete)

### 1. Environment Configuration (30 min)

```bash
# Option A: Automatic setup
./setup-env.sh

# Option B: Manual setup
cp .env.example .env.local
# Then fill in these REQUIRED values:
```

**Required Variables:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=https://www.elevateforhumanity.org
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Status:** [ ] Complete

---

### 2. Fix TypeScript Errors (15 min)

```bash
# Clear cache
rm -rf .next tsconfig.tsbuildinfo

# Run type check
npm run typecheck

# If errors persist in lib/social/social-integration.ts:
# Open file and check line 253 for syntax issues
```

**Status:** [ ] Complete

---

### 3. Optimize Images (2 hours)

```bash
# Find large images
find public/images -type f \( -name "*.jpg" -o -name "*.png" \) -size +500k

# Install optimizer
npm install -g sharp-cli

# Convert to WebP (example)
sharp -i public/images/large-image.jpg -o public/images/large-image.webp --webp

# OR use online tools:
# - https://squoosh.app/
# - https://tinypng.com/
```

**Target:** All images under 500KB  
**Status:** [ ] Complete

---

### 4. Add Analytics IDs (15 min)

```bash
# Add to .env.local:
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_APP_ID=your-app-id
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your-pixel-id
```

**Get IDs from:**

- Google Analytics: https://analytics.google.com/
- Facebook Business: https://business.facebook.com/

**Status:** [ ] Complete

---

### 5. Update Sitemap (5 min)

```bash
npm run sitemap:gen
```

**Status:** [ ] Complete

---

## 🟡 HIGH PRIORITY (Within 24 Hours)

### 6. Test Build Locally

```bash
# Build
npm run build

# Test
npm run start

# Visit http://localhost:3000
# Test these pages:
# - Homepage
# - /programs
# - /apply
# - /admin (login)
```

**Status:** [ ] Complete

---

### 7. Verify Vercel Environment Variables

```bash
# Pull current env vars
vercel env pull

# Compare with .env.local
# Ensure all production values are set in Vercel dashboard
```

**Status:** [ ] Complete

---

### 8. Run Full Test Suite

```bash
# Lint
npm run lint

# Type check
npm run typecheck

# Build
npm run build

# All should pass with no errors
```

**Status:** [ ] Complete

---

## 🟢 NICE TO HAVE (Post-Launch)

### 9. Add Skip-to-Content Link

```css
/* Add to app/globals.css */
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-to-content:focus {
  top: 0;
}
```

**Status:** [ ] Complete

---

### 10. Create Dedicated OG Image

```bash
# Create 1200x630px image
# Save as public/og-image.jpg
# Update app/layout.tsx to use it
```

**Status:** [ ] Complete

---

## 📋 Pre-Deployment Verification

Run this automated check:

```bash
./fix-critical-issues.sh
```

**Manual Checks:**

- [ ] .env.local exists and is filled out
- [ ] TypeScript check passes
- [ ] Build completes successfully
- [ ] No console errors in browser
- [ ] Images load quickly
- [ ] Forms submit correctly
- [ ] Mobile view looks good
- [ ] Analytics tracking works

---

## 🚀 Deployment Commands

```bash
# 1. Final build test
npm run build

# 2. Deploy to Vercel
vercel --prod

# 3. Monitor deployment
# Check Vercel dashboard for build logs
```

---

## 📊 Post-Deployment Checks (First 24 Hours)

### Immediate (0-1 hour):

- [ ] Site loads at https://www.elevateforhumanity.org
- [ ] SSL certificate is valid
- [ ] Homepage renders correctly
- [ ] Navigation works
- [ ] Forms submit
- [ ] Admin login works

### Within 24 Hours:

- [ ] Google Analytics shows traffic
- [ ] No errors in Vercel logs
- [ ] Search Console shows no errors
- [ ] Core Web Vitals are green
- [ ] Mobile performance is good

### Within 1 Week:

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Monitor error rates
- [ ] Check conversion tracking
- [ ] Review user feedback

---

## 🆘 Emergency Rollback

If something goes wrong:

```bash
# Rollback to previous deployment
vercel rollback

# OR redeploy previous version
vercel --prod [previous-deployment-url]
```

---

## 📞 Support Contacts

**Technical Issues:**

- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support

**Domain/DNS:**

- Domain registrar support

**Analytics:**

- Google Analytics: https://support.google.com/analytics

---

## 📈 Success Metrics

**Week 1 Targets:**

- Uptime: 99.9%
- Performance Score: 90+
- Error Rate: <0.1%
- Page Load Time: <3s

**Month 1 Targets:**

- 1,000+ visitors
- 100+ applications
- 50+ program enrollments
- 95+ Lighthouse score

---

## ✅ Final Sign-Off

Before deploying, confirm:

- [ ] All critical items (1-5) complete
- [ ] Build passes locally
- [ ] Environment variables set in Vercel
- [ ] Team notified of deployment
- [ ] Monitoring tools ready
- [ ] Rollback plan understood

**Deployed By:** ******\_\_\_******  
**Date:** ******\_\_\_******  
**Time:** ******\_\_\_******  
**Deployment URL:** ******\_\_\_******

---

**For detailed audit report, see:** `PRE_LAUNCH_AUDIT_COMPLETE.md`  
**For automated fixes, run:** `./fix-critical-issues.sh`
