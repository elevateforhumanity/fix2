# Production Deployment Checklist

## Pre-Deployment Verification

### Database Migrations

- [ ] All migrations in `/supabase/migrations/` are ready
- [ ] No conflicting migration timestamps
- [ ] RLS policies are enabled on all tables
- [ ] Test migrations in staging environment

### Environment Variables

- [ ] `NEXT_PUBLIC_SUPABASE_URL` set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set (server-side only)
- [ ] `OPENAI_API_KEY` set (for AI features)
- [ ] `RESEND_API_KEY` set (for emails)
- [ ] `STRIPE_SECRET_KEY` set (for payments)
- [ ] `STRIPE_WEBHOOK_SECRET` set
- [ ] All production URLs updated (no localhost)

### Code Quality

- [ ] No console.log statements in production code
- [ ] No TODO/FIXME comments in critical paths
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] No hardcoded credentials

### Build Verification

```bash
# Run these commands before deploying
npm run build
npm run lint
npx tsx scripts/validate-sitemap.ts
```

### Critical Files

- [ ] `.gitignore` includes node_modules, .env, .next
- [ ] `robots.txt` allows search engines
- [ ] `sitemap.ts` generates valid XML
- [ ] `manifest.ts` configured for PWA
- [ ] All images optimized (< 500KB each)

---

## Deployment Steps

### 1. Supabase Database

```bash
# Apply all migrations
cd supabase
supabase db push

# Verify migrations applied
supabase db diff
```

### 2. Vercel Deployment

```bash
# Deploy to production
vercel --prod

# Or use GitHub integration (recommended)
git push origin main
```

### 3. Post-Deployment Verification

#### Smoke Tests (5 minutes)

- [ ] Homepage loads (/)
- [ ] Programs page loads (/programs)
- [ ] Apply page loads (/apply)
- [ ] Login works (/login)
- [ ] LMS landing page loads (/lms)
- [ ] Dashboards page loads (/dashboards)
- [ ] Contact form submits (/contact)
- [ ] Downloads page loads (/downloads)

#### Authentication Tests

- [ ] User can sign up
- [ ] User can log in
- [ ] User can reset password
- [ ] Session persists on refresh
- [ ] Logout works

#### Mobile Tests

- [ ] Homepage readable on mobile
- [ ] Navigation menu works
- [ ] Forms are usable
- [ ] Text contrast is sufficient
- [ ] No layout overflow

#### Performance Tests

```bash
# Run Lighthouse audit
npx lighthouse https://www.elevateforhumanity.org --view

# Target scores:
# Performance: > 90
# Accessibility: > 95
# Best Practices: > 90
# SEO: > 95
```

---

## Post-Deployment Tasks

### Search Engine Optimization

- [ ] Submit sitemap to Google Search Console
  - URL: https://www.elevateforhumanity.org/sitemap.xml
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify robots.txt accessible
  - URL: https://www.elevateforhumanity.org/robots.txt
- [ ] Test structured data with Google Rich Results Test

### Monitoring Setup

- [ ] Vercel Analytics enabled
- [ ] Error tracking configured (Sentry/LogRocket)
- [ ] Uptime monitoring (UptimeRobot/Pingdom)
- [ ] Performance monitoring (Vercel Speed Insights)

### Security

- [ ] SSL certificate active (HTTPS)
- [ ] Security headers configured
- [ ] CORS policies set
- [ ] Rate limiting enabled on API routes
- [ ] Supabase RLS policies tested

### Compliance

- [ ] Privacy Policy accessible
- [ ] Terms of Service accessible
- [ ] Accessibility statement accessible
- [ ] FERPA compliance verified
- [ ] Cookie banner functional

---

## Rollback Plan

If critical issues are found:

### Immediate Rollback

```bash
# Revert to previous deployment
vercel rollback
```

### Database Rollback

```bash
# Revert last migration
supabase db reset

# Or restore from backup
supabase db restore <backup-id>
```

---

## Launch Announcement

### Internal Communication

- [ ] Notify team of deployment
- [ ] Share deployment notes
- [ ] Document any known issues

### External Communication

- [ ] Update social media
- [ ] Send email to partners
- [ ] Update marketing materials
- [ ] Notify workforce boards

---

## Monitoring (First 24 Hours)

### Metrics to Watch

- [ ] Error rate (target: < 0.1%)
- [ ] Response time (target: < 2s)
- [ ] Uptime (target: 99.9%)
- [ ] User signups
- [ ] Application submissions

### Check Every Hour

- [ ] Vercel deployment logs
- [ ] Supabase database logs
- [ ] Error tracking dashboard
- [ ] User feedback channels

---

## Success Criteria

✅ **Deployment is successful when:**

- All smoke tests pass
- No critical errors in logs
- Performance scores meet targets
- Mobile experience is functional
- Authentication works
- Forms submit successfully
- No user complaints in first 4 hours

---

## Emergency Contacts

- **Technical Lead:** [Name]
- **Database Admin:** [Name]
- **Vercel Support:** support@vercel.com
- **Supabase Support:** support@supabase.com

---

## Notes

**Deployment Date:** ******\_\_\_******
**Deployed By:** ******\_\_\_******
**Deployment Time:** ******\_\_\_******
**Issues Found:** ******\_\_\_******
**Resolution:** ******\_\_\_******

---

## Final Sign-off

- [ ] All checklist items completed
- [ ] No critical issues found
- [ ] Monitoring in place
- [ ] Team notified
- [ ] Documentation updated

**Approved By:** ******\_\_\_******
**Date:** ******\_\_\_******
