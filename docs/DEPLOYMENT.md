# Deployment Documentation

## Overview

The EFH Autopilot platform is deployed automatically via GitHub Actions CI/CD pipeline to Vercel when changes are pushed to the `main` branch.

## Deployment Architecture

### Hosting Platform
- **Provider**: Vercel
- **Framework**: Next.js 16.0.1 with Turbopack
- **Runtime**: Node.js 20.x
- **Database**: Supabase (PostgreSQL)

### Automatic Deployment Flow

1. **Push to Main Branch**
   ```bash
   git push origin main
   ```

2. **GitHub Actions Workflow** (`.github/workflows/ci-cd.yml`)
   - **CI Job**: Lint, type check, test, and build
   - **Deploy Job**: Run Supabase migrations and deploy to Vercel

3. **Vercel Deployment**
   - Automatic deployment triggered by GitHub integration
   - Production URL: [Your Vercel URL]
   - Preview deployments for pull requests

## Environment Variables

### Required Environment Variables

#### Supabase Configuration
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### Stripe Payment Processing
```bash
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

#### Optional Services
```bash
# Email notifications
SENDGRID_API_KEY=your-sendgrid-key
EMAIL_FROM=noreply@elevateforhumanity.org

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Monitoring
SENTRY_DSN=your-sentry-dsn
SENTRY_AUTH_TOKEN=your-sentry-auth-token
```

### Setting Environment Variables

#### In Vercel Dashboard
1. Go to Project Settings → Environment Variables
2. Add each variable for Production, Preview, and Development
3. Redeploy to apply changes

#### Via Vercel CLI
```bash
vercel env add VARIABLE_NAME production
```

## Manual Deployment

If you need to deploy manually:

### Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Using GitHub Actions

Trigger the workflow manually:
```bash
gh workflow run ci-cd.yml
```

## Database Migrations

### Automatic Migrations

Migrations in `supabase/migrations/` are automatically applied during deployment via the CI/CD pipeline.

### Manual Migration

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

### Migration Files

Recent migrations include:
- `20240115_onboarding_tutorials.sql` - Onboarding and tutorial system
- `20240116_content_moderation.sql` - Content moderation tools
- `20240117_webhooks.sql` - Webhook integrations
- `20240118_referrals.sql` - Referral and affiliate program
- `20240119_payments.sql` - Payment processing tables
- `20240120_invoicing.sql` - Invoicing and billing system

## Build Configuration

### Next.js Configuration (`next.config.mjs`)

```javascript
{
  compiler: {
    turbopack: true
  },
  images: {
    domains: ['your-supabase-project.supabase.co'],
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    optimizeCss: true,
    serverActions: true
  }
}
```

### Build Command

```bash
pnpm build
```

### Build Output
- Static pages: Pre-rendered at build time
- Dynamic pages: Server-side rendered
- API routes: Edge functions
- Total pages: 280+

## Monitoring and Logging

### Production Monitoring

1. **Vercel Analytics**
   - Real-time performance metrics
   - Web Vitals tracking
   - Error monitoring

2. **Supabase Dashboard**
   - Database performance
   - Query analytics
   - Connection pooling

3. **Custom Monitoring** (`lib/performance.ts`)
   - Performance tracking
   - Error logging
   - User analytics

### Accessing Logs

#### Vercel Logs
```bash
vercel logs [deployment-url]
```

#### Supabase Logs
Access via Supabase Dashboard → Logs

## Rollback Procedure

### Rollback to Previous Deployment

1. **Via Vercel Dashboard**
   - Go to Deployments
   - Find the previous successful deployment
   - Click "Promote to Production"

2. **Via Git**
   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Via Vercel CLI**
   ```bash
   vercel rollback [deployment-url]
   ```

## Performance Optimization

### Implemented Optimizations

1. **Image Optimization**
   - All images upgraded to HD quality
   - Next.js Image component with automatic optimization
   - AVIF and WebP format support

2. **Video Optimization**
   - All videos upgraded to 1080p HD
   - Lazy loading for video content
   - Adaptive bitrate streaming

3. **Code Splitting**
   - Automatic code splitting per route
   - Dynamic imports for heavy components
   - Tree shaking for unused code

4. **Caching Strategy**
   - Static assets cached at CDN edge
   - API responses cached with appropriate headers
   - Database query caching via Supabase

## Security Considerations

### Implemented Security Features

1. **Authentication Guards** (`lib/authGuards.ts`)
   - Protected routes with middleware
   - Role-based access control
   - Session management

2. **Rate Limiting** (`middleware.ts`)
   - API endpoint rate limiting
   - DDoS protection
   - Abuse prevention

3. **Security Headers**
   - CSP (Content Security Policy)
   - HSTS (HTTP Strict Transport Security)
   - X-Frame-Options
   - X-Content-Type-Options

4. **Data Protection**
   - GDPR compliance features
   - Data export functionality
   - Right to deletion
   - Audit logging

## Troubleshooting

### Common Issues

#### Build Failures

**Issue**: TypeScript compilation errors
```bash
# Solution: Run type check locally
pnpm type-check
```

**Issue**: Missing environment variables
```bash
# Solution: Verify all required env vars are set in Vercel
vercel env ls
```

#### Runtime Errors

**Issue**: Stripe not configured
```bash
# Error: "Stripe is not configured. Please set STRIPE_SECRET_KEY"
# Solution: Add STRIPE_SECRET_KEY to Vercel environment variables
```

**Issue**: Supabase connection errors
```bash
# Error: "Failed to connect to Supabase"
# Solution: Verify NEXT_PUBLIC_SUPABASE_URL and keys are correct
```

### Debug Mode

Enable debug logging:
```bash
# In Vercel environment variables
DEBUG=true
NODE_ENV=development
```

## Production Checklist

Before deploying to production:

- [x] All tests passing locally
- [x] Environment variables configured in Vercel
- [x] Database migrations tested
- [x] Stripe webhooks configured
- [x] Analytics tracking verified
- [x] Error monitoring active
- [x] Performance benchmarks met
- [x] Security headers configured
- [x] SSL certificate active
- [x] Domain DNS configured
- [x] Backup procedures tested
- [x] Rollback plan documented

## Support and Maintenance

### Regular Maintenance Tasks

1. **Weekly**
   - Review error logs
   - Check performance metrics
   - Monitor database size

2. **Monthly**
   - Update dependencies
   - Review security advisories
   - Optimize database queries
   - Clean up old deployments

3. **Quarterly**
   - Full security audit
   - Performance optimization review
   - Backup restoration test
   - Disaster recovery drill

### Getting Help

- **Technical Issues**: Check Vercel and Supabase documentation
- **Build Errors**: Review GitHub Actions logs
- **Runtime Errors**: Check Vercel function logs
- **Database Issues**: Review Supabase dashboard

## Latest Deployment

**Commit**: `ba36fd48`
**Date**: January 2024
**Changes**: Complete enterprise platform features (52 major features)
**Status**: ✅ Successfully deployed
**Build Time**: ~9.7s
**Pages Built**: 282

## Next Steps

1. Monitor deployment in Vercel dashboard
2. Verify all 280+ pages are accessible
3. Test payment processing in production
4. Verify webhook integrations
5. Monitor error rates and performance
6. Set up alerts for critical issues

---

**Last Updated**: January 2024
**Maintained By**: Development Team
**Documentation Version**: 1.0
