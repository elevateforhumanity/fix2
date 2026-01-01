# Deployment Checklist

## Pre-Deployment

### Environment Setup

- [ ] Set all required environment variables in production
- [ ] Verify Supabase connection (URL, anon key, service role key)
- [ ] Configure domain DNS records
- [ ] Setup SSL certificates (automatic with Vercel)

### Code Verification

- [ ] Run `pnpm build` locally - must complete without errors
- [ ] Run `pnpm lint` - must pass
- [ ] Test auth flows (login, logout, session refresh)
- [ ] Test protected routes redirect properly
- [ ] Verify mobile responsiveness (no green wash, clean footer)
- [ ] Check image loading (all using next/image with proper sizing)

### Database

- [ ] Run migrations on production Supabase instance
- [ ] Verify RLS policies are active
- [ ] Test database connection from production
- [ ] Backup production database before deployment

## Deployment Steps

### 1. Deploy to Vercel

```bash
# Connect to Vercel (first time only)
vercel login
vercel link

# Deploy to production
vercel --prod
```

### 2. Post-Deployment Verification

- [ ] Visit production URL - homepage loads
- [ ] Test login flow - redirects work
- [ ] Test protected routes - auth required
- [ ] Check mobile view - no visual issues
- [ ] Verify sitemap.xml accessible
- [ ] Check robots.txt
- [ ] Test error boundaries (trigger 404, 500)
- [ ] Verify loading states timeout properly (10s max)

### 3. Monitoring Setup

- [ ] Install Sentry (see MONITORING.md)
- [ ] Configure uptime monitoring
- [ ] Setup error alerting
- [ ] Test error reporting

### 4. DNS Configuration

- [ ] Point www.elevateforhumanity.org to Vercel
- [ ] Point www.elevateeducationedu.com to Vercel
- [ ] Point www.elevateconnectsdirectory.org to Vercel
- [ ] Verify all domains resolve correctly
- [ ] Test SSL on all domains

## Post-Deployment

### Immediate Actions

- [ ] Monitor error logs for first 24 hours
- [ ] Check performance metrics
- [ ] Verify analytics tracking
- [ ] Test critical user journeys

### Communication

- [ ] Update staff with new URLs
- [ ] Send email signature templates (see EMAIL_SIGNATURES.md)
- [ ] Update social media links
- [ ] Update any external references

## Rollback Plan

If issues occur:

1. Revert to previous Vercel deployment: `vercel rollback`
2. Check error logs: `vercel logs`
3. Fix issues locally and redeploy
4. Monitor closely after rollback

## Environment Variables Required

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Sentry (optional but recommended)
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
```

## Success Criteria

Deployment is successful when:

- ✅ All domains resolve and load correctly
- ✅ Auth flows work without errors
- ✅ No console errors on homepage
- ✅ Mobile view displays correctly
- ✅ Protected routes require authentication
- ✅ Error monitoring is active
- ✅ Performance metrics are acceptable (LCP < 2.5s)
