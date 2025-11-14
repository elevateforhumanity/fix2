# Deployment Guide
## Elevate for Humanity LMS Platform

**Last Updated:** November 12, 2025  
**Version:** 2.0.0

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Build Process](#build-process)
4. [Deployment to Netlify](#deployment-to-netlify)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Troubleshooting](#troubleshooting)
7. [Rollback Procedures](#rollback-procedures)

---

## Prerequisites

### Required Software
- Node.js >= 20.11.1 < 23
- pnpm 9.7.0 or higher
- Git
- Netlify CLI (optional, for local testing)

### Required Accounts
- GitHub account with repository access
- Netlify account
- Supabase project
- Google Analytics account
- Stripe account (for payments)

---

## Environment Setup

### 1. Clone Repository

```bash
git clone https://github.com/elevateforhumanity/fix2.git
cd fix2
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create `.env` file in project root:

```env
# Site Configuration
PUBLIC_SITE_URL=https://www.elevateconnectsdirectory.org
VITE_APP_ENV=production

# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Google Analytics
VITE_GA_MEASUREMENT_ID=G-EFHWORKFORCE01

# Stripe (optional)
VITE_STRIPE_PUBLIC_KEY=pk_live_your_key

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_CHAT=true
```

### 4. Verify Configuration

```bash
pnpm typecheck
pnpm test
```

---

## Build Process

### Development Build

```bash
pnpm dev
```

Access at: http://localhost:5173

### Production Build

```bash
pnpm build
```

Build output: `dist/` directory

### Preview Production Build

```bash
pnpm preview
```

---

## Deployment to Netlify

### Automatic Deployment (Recommended)

1. **Push to Main Branch**
   ```bash
   git push origin main
   ```

2. **Netlify Auto-Deploys**
   - Triggered automatically on push
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Build time: ~8-10 seconds

3. **Monitor Deployment**
   - Visit: https://app.netlify.com/sites/your-site/deploys
   - Check build logs for errors
   - Verify deployment status

### Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod
```

### Deployment Configuration

File: `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20.19.0"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
```

---

## Post-Deployment Verification

### 1. Smoke Tests

```bash
# Check homepage loads
curl -I https://www.elevateconnectsdirectory.org

# Verify SSL certificate
curl -vI https://www.elevateconnectsdirectory.org 2>&1 | grep -i ssl

# Check sitemap
curl https://www.elevateconnectsdirectory.org/sitemap.xml

# Check robots.txt
curl https://www.elevateconnectsdirectory.org/robots.txt
```

### 2. Functional Tests

- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Course pages display
- [ ] Login/signup functional
- [ ] Forms submit correctly
- [ ] Images load
- [ ] Videos play
- [ ] Mobile responsive
- [ ] Accessibility widget works

### 3. Performance Tests

```bash
# Run Lighthouse audit
npx lighthouse https://www.elevateconnectsdirectory.org --view

# Check Core Web Vitals
# Visit: https://pagespeed.web.dev/
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### 4. Security Tests

- [ ] HTTPS enabled
- [ ] Security headers present
- [ ] CSP configured
- [ ] No mixed content
- [ ] Cookies secure
- [ ] XSS protection active

### 5. SEO Verification

- [ ] Meta tags present
- [ ] Open Graph tags
- [ ] Twitter Cards
- [ ] Structured data
- [ ] Sitemap accessible
- [ ] Robots.txt correct
- [ ] Canonical URLs

### 6. Analytics Verification

- [ ] Google Analytics tracking
- [ ] Page views recorded
- [ ] Events firing
- [ ] User flows tracked

---

## Troubleshooting

### Build Failures

**Problem:** TypeScript errors

```bash
# Check for type errors
pnpm typecheck

# Fix common issues
pnpm install
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Problem:** Build timeout

```bash
# Increase build timeout in netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
  
[build.processing]
  skip_processing = false
```

### Deployment Failures

**Problem:** Environment variables missing

1. Go to Netlify Dashboard
2. Site Settings > Environment Variables
3. Add all required variables
4. Redeploy

**Problem:** 404 errors on routes

- Verify `_redirects` file in `public/`
- Check netlify.toml redirects configuration
- Ensure SPA routing configured

### Runtime Errors

**Problem:** Supabase connection fails

```javascript
// Check environment variables
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);

// Verify credentials in Netlify dashboard
```

**Problem:** Analytics not tracking

```javascript
// Verify GA measurement ID
console.log('GA ID:', import.meta.env.VITE_GA_MEASUREMENT_ID);

// Check Google Analytics dashboard
```

---

## Rollback Procedures

### Quick Rollback (Netlify)

1. Go to Netlify Dashboard
2. Navigate to Deploys
3. Find last working deployment
4. Click "Publish deploy"

### Git Rollback

```bash
# Find last working commit
git log --oneline -10

# Revert to specific commit
git revert <commit-hash>
git push origin main

# Or reset to previous commit (use with caution)
git reset --hard <commit-hash>
git push origin main --force
```

### Emergency Rollback

```bash
# Deploy previous version immediately
netlify rollback
```

---

## Monitoring

### Uptime Monitoring

**Tools:**
- Netlify Analytics (built-in)
- UptimeRobot (external)
- Pingdom (external)

**Setup:**
1. Create account at uptimerobot.com
2. Add monitor for https://www.elevateconnectsdirectory.org
3. Set check interval: 5 minutes
4. Configure alerts (email, SMS)

### Error Tracking

**Recommended:** Sentry

```bash
# Install Sentry
pnpm add @sentry/react @sentry/vite-plugin

# Configure in main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

### Performance Monitoring

**Tools:**
- Google Analytics (Core Web Vitals)
- Netlify Analytics
- Lighthouse CI

**Setup Lighthouse CI:**

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://www.elevateconnectsdirectory.org
          uploadArtifacts: true
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] TypeScript check clean
- [ ] Build successful locally
- [ ] Environment variables configured
- [ ] Security headers verified
- [ ] Performance optimized
- [ ] Accessibility tested
- [ ] SEO tags complete
- [ ] Analytics configured
- [ ] Error tracking setup

### During Deployment

- [ ] Monitor build logs
- [ ] Check for warnings
- [ ] Verify build time (< 10 seconds)
- [ ] Confirm deployment success

### Post-Deployment

- [ ] Run smoke tests
- [ ] Verify all pages load
- [ ] Test critical user flows
- [ ] Check analytics tracking
- [ ] Monitor error rates
- [ ] Review performance metrics
- [ ] Verify SSL certificate
- [ ] Test mobile responsiveness

---

## Support

**Issues:** https://github.com/elevateforhumanity/fix2/issues  
**Email:** support@elevateforhumanity.org  
**Phone:** (317) 314-3757

---

**Document Version:** 1.0.0  
**Last Updated:** November 12, 2025  
**Next Review:** After major deployment
