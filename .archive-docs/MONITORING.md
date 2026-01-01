# Monitoring Setup Guide

## Error Tracking with Sentry

### 1. Create Sentry Account

1. Go to [sentry.io](https://sentry.io)
2. Sign up or log in
3. Create new project
   - Platform: Next.js
   - Name: elevate-for-humanity
   - Team: Your organization

### 2. Install Sentry

```bash
pnpm add @sentry/nextjs
```

### 3. Initialize Sentry

```bash
npx @sentry/wizard@latest -i nextjs
```

This creates:

- `sentry.client.config.ts` - Client-side error tracking
- `sentry.server.config.ts` - Server-side error tracking
- `sentry.edge.config.ts` - Edge runtime error tracking
- Updates `next.config.js` with Sentry webpack plugin

### 4. Configure Environment Variables

Add to Vercel environment variables:

```bash
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_AUTH_TOKEN=sntrys_xxx
SENTRY_ORG=your-org
SENTRY_PROJECT=elevate-for-humanity
```

### 5. Test Error Tracking

Add a test error button:

```typescript
// In any component
<button onClick={() => {
  throw new Error('Test Sentry Error');
}}>
  Trigger Test Error
</button>
```

Click it and verify error appears in Sentry dashboard.

### 6. Configure Alerts

In Sentry dashboard:

1. Go to Alerts > Create Alert
2. Choose "Issues"
3. Set conditions:
   - When: An issue is first seen
   - Then: Send notification to email/Slack
4. Save alert rule

### 7. Performance Monitoring (Optional)

Enable in `sentry.client.config.ts`:

```typescript
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1, // 10% of transactions
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

## Uptime Monitoring

### Option 1: UptimeRobot (Free)

1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Sign up for free account
3. Add monitors:
   - **Main Site**: https://www.elevateforhumanity.org
     - Type: HTTP(s)
     - Interval: 5 minutes
     - Alert contacts: Your email
   - **LMS Portal**: https://www.elevateeducationedu.com
     - Type: HTTP(s)
     - Interval: 5 minutes
   - **Admin Portal**: https://www.elevateconnectsdirectory.org
     - Type: HTTP(s)
     - Interval: 5 minutes

4. Configure alerts:
   - Email notifications
   - SMS (optional, paid)
   - Slack webhook (optional)

### Option 2: Vercel Analytics (Built-in)

Already included with Vercel deployment:

1. Go to Vercel dashboard
2. Select project
3. Click "Analytics" tab
4. View:
   - Real User Monitoring (RUM)
   - Web Vitals (LCP, FID, CLS)
   - Page views
   - Top pages

### Option 3: Better Uptime (Paid, more features)

1. Go to [betteruptime.com](https://betteruptime.com)
2. Create account
3. Add monitors with advanced features:
   - Status pages
   - Incident management
   - On-call scheduling
   - Multiple alert channels

## Custom Health Check Endpoint

Create API route for monitoring:

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: 'healthy',
    checks: {
      database: false,
      auth: false,
    },
  };

  try {
    // Check database connection
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase.from('profiles').select('count').limit(1);
    checks.checks.database = !error;

    // Check auth service
    const { data } = await supabase.auth.getSession();
    checks.checks.auth = true;

    // Overall status
    const allHealthy = Object.values(checks.checks).every((v) => v);
    checks.status = allHealthy ? 'healthy' : 'degraded';

    return NextResponse.json(checks, {
      status: allHealthy ? 200 : 503,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ...checks,
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}
```

Monitor this endpoint: `https://www.elevateforhumanity.org/api/health`

## Monitoring Dashboard

### Key Metrics to Track

1. **Error Rate**
   - Target: < 1% of requests
   - Alert: > 5% error rate

2. **Response Time**
   - Target: < 1s average
   - Alert: > 3s average

3. **Uptime**
   - Target: 99.9% (43 minutes downtime/month)
   - Alert: Any downtime > 5 minutes

4. **Core Web Vitals**
   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1

### Daily Monitoring Checklist

- [ ] Check Sentry for new errors
- [ ] Review uptime status
- [ ] Check performance metrics
- [ ] Verify no alerts triggered

### Weekly Review

- [ ] Analyze error trends
- [ ] Review performance degradation
- [ ] Check user feedback
- [ ] Update monitoring thresholds if needed

## Alert Configuration

### Critical Alerts (Immediate Response)

- Site down (uptime < 99%)
- Error rate > 10%
- Database connection failures
- Auth service failures

### Warning Alerts (Review within 24h)

- Error rate > 5%
- Response time > 3s
- Performance degradation
- Unusual traffic patterns

### Info Alerts (Review weekly)

- New error types
- Performance improvements
- Usage statistics

## Incident Response

When alert triggers:

1. **Acknowledge**: Confirm you received the alert
2. **Assess**: Check monitoring dashboards
3. **Diagnose**: Review error logs and metrics
4. **Fix**: Apply fix or rollback deployment
5. **Verify**: Confirm issue resolved
6. **Document**: Log incident and resolution
7. **Follow-up**: Prevent recurrence

## Cost Estimates

### Free Tier Options

- Sentry: 5,000 errors/month free
- UptimeRobot: 50 monitors free
- Vercel Analytics: Included with hosting

### Paid Options (if needed)

- Sentry Team: $26/month (50k errors)
- Better Uptime: $18/month (10 monitors)
- PagerDuty: $21/user/month (on-call)

## Quick Setup Commands

```bash
# Install Sentry
pnpm add @sentry/nextjs
npx @sentry/wizard@latest -i nextjs

# Set environment variables
vercel env add NEXT_PUBLIC_SENTRY_DSN production
vercel env add SENTRY_AUTH_TOKEN production

# Deploy with monitoring
vercel --prod

# Test health endpoint
curl https://www.elevateforhumanity.org/api/health
```

## Verification

After setup, verify:

- [ ] Sentry receives test error
- [ ] Uptime monitor pings successfully
- [ ] Health endpoint returns 200
- [ ] Alerts configured and tested
- [ ] Team members receive notifications
