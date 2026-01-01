# Monitoring Setup Guide - Complete Configuration

**Date:** December 29, 2025  
**Status:** ✅ CODE READY - NEEDS CONFIGURATION

---

## Current State

### ✅ What's Already Implemented

1. **Sentry Integration** - Complete code, needs DSN
   - `sentry.client.config.ts` ✅
   - `sentry.server.config.ts` ✅
   - `sentry.edge.config.ts` ✅
   - `lib/monitoring/sentry.ts` ✅
   - `components/sentry-init.tsx` ✅

2. **Error Tracking** - Complete code
   - `lib/monitoring.ts` ✅
   - `lib/errorHandler.ts` ✅
   - `lib/api/error-handler.ts` ✅
   - `lib/logging/logger.ts` ✅

3. **Performance Monitoring** - Complete code
   - `lib/performance.ts` ✅
   - `lib/monitoring/` directory ✅
   - Web vitals tracking ✅

4. **Health Checks** - Complete and working
   - `/api/health` endpoint ✅
   - Database checks ✅
   - Service checks ✅

### ❌ What Needs Configuration

1. **Sentry DSN** - Environment variable not set
2. **Error alerting** - Needs Sentry project
3. **Uptime monitoring** - Needs external service
4. **Log aggregation** - Optional enhancement

---

## Step-by-Step Setup

### 1. Configure Sentry (15 minutes)

#### A. Create Sentry Account

1. Go to [sentry.io](https://sentry.io)
2. Sign up or log in
3. Create new project:
   - Platform: **Next.js**
   - Project name: **elevate-for-humanity**
   - Alert frequency: **On every new issue**

#### B. Get Your DSN

After creating project, copy the DSN:

```
https://abc123def456@o123456.ingest.sentry.io/789012
```

#### C. Add to Environment Variables

**Local Development:**

```bash
# .env.local
NEXT_PUBLIC_SENTRY_DSN=https://abc123def456@o123456.ingest.sentry.io/789012
SENTRY_AUTH_TOKEN=your_auth_token_here
```

**Vercel Production:**

```bash
# Via Vercel Dashboard or CLI
vercel env add NEXT_PUBLIC_SENTRY_DSN
# Paste your DSN when prompted

vercel env add SENTRY_AUTH_TOKEN
# Paste your auth token when prompted
```

**Via Vercel Dashboard:**

1. Go to Project Settings → Environment Variables
2. Add `NEXT_PUBLIC_SENTRY_DSN` = `your-dsn-here`
3. Add `SENTRY_AUTH_TOKEN` = `your-token-here`
4. Select: Production, Preview, Development
5. Save

#### D. Verify Sentry is Working

```bash
# Test error capture
curl -X POST https://your-domain.com/api/test-sentry

# Check Sentry dashboard
# You should see the test error appear
```

---

### 2. Configure Error Alerting (10 minutes)

#### A. Sentry Alert Rules

1. Go to Sentry → Alerts → Create Alert Rule
2. Configure:
   - **When:** An event is seen
   - **If:** All events
   - **Then:** Send notification to email
   - **Frequency:** Immediately

#### B. Slack Integration (Optional)

1. Sentry → Settings → Integrations
2. Add Slack integration
3. Configure channel: `#production-alerts`
4. Test notification

#### C. Email Notifications

Already configured in Sentry by default. Customize:

1. Sentry → Settings → Notifications
2. Set email preferences
3. Add team members

---

### 3. Configure Performance Monitoring (5 minutes)

#### A. Enable in Sentry

Already enabled in code:

```typescript
// sentry.server.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0, // 100% of transactions
});
```

#### B. Adjust Sample Rate (Optional)

For high-traffic sites, reduce sample rate:

```typescript
// sentry.server.config.ts
tracesSampleRate: 0.1, // 10% of transactions
```

#### C. Monitor Key Metrics

Sentry automatically tracks:

- Page load times
- API response times
- Database query times
- Error rates
- User sessions

---

### 4. Configure Uptime Monitoring (15 minutes)

#### Option A: UptimeRobot (Free)

1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Sign up (free plan: 50 monitors)
3. Add monitor:
   - **Type:** HTTP(s)
   - **URL:** `https://www.elevateforhumanity.org/api/health`
   - **Interval:** 5 minutes
   - **Alert contacts:** Your email

4. Add more monitors:
   - Homepage: `https://www.elevateforhumanity.org`
   - Programs: `https://www.elevateforhumanity.org/programs`
   - Enroll: `https://www.elevateforhumanity.org/enroll`

#### Option B: Better Uptime (Paid)

1. Go to [betteruptime.com](https://betteruptime.com)
2. Sign up ($20/month)
3. Add monitors with advanced features:
   - Status page
   - Incident management
   - On-call scheduling

#### Option C: Pingdom (Paid)

1. Go to [pingdom.com](https://pingdom.com)
2. Sign up ($10/month)
3. Add uptime checks
4. Configure alerts

---

### 5. Configure Log Aggregation (Optional - 20 minutes)

#### Option A: Vercel Logs (Built-in)

Already available in Vercel dashboard:

1. Go to Vercel → Your Project → Logs
2. Filter by:
   - Error logs
   - API routes
   - Build logs

#### Option B: LogRocket (Paid)

For session replay and advanced debugging:

1. Go to [logrocket.com](https://logrocket.com)
2. Sign up ($99/month)
3. Add to your app:

```bash
npm install logrocket
```

```typescript
// app/layout.tsx
import LogRocket from 'logrocket';

if (process.env.NODE_ENV === 'production') {
  LogRocket.init('your-app-id');
}
```

---

## Environment Variables Summary

### Required for Monitoring

```bash
# Sentry (Error Tracking)
NEXT_PUBLIC_SENTRY_DSN=https://abc123@o123.ingest.sentry.io/456
SENTRY_AUTH_TOKEN=your_auth_token

# Optional: LogRocket (Session Replay)
NEXT_PUBLIC_LOGROCKET_ID=your_app_id
```

### Add to All Environments

**Local (.env.local):**

```bash
NEXT_PUBLIC_SENTRY_DSN=https://...
SENTRY_AUTH_TOKEN=...
```

**Vercel (Production):**

```bash
vercel env add NEXT_PUBLIC_SENTRY_DSN production
vercel env add SENTRY_AUTH_TOKEN production
```

**Vercel (Preview):**

```bash
vercel env add NEXT_PUBLIC_SENTRY_DSN preview
vercel env add SENTRY_AUTH_TOKEN preview
```

---

## Testing Monitoring

### 1. Test Sentry Error Tracking

```bash
# Create test error endpoint
# app/api/test-sentry/route.ts
export async function GET() {
  throw new Error('Test error for Sentry');
}

# Trigger error
curl https://your-domain.com/api/test-sentry

# Check Sentry dashboard - error should appear
```

### 2. Test Performance Monitoring

```bash
# Visit your site
open https://your-domain.com

# Check Sentry → Performance
# Should see transaction data
```

### 3. Test Health Endpoint

```bash
# Check health
curl https://your-domain.com/api/health

# Should return JSON with status
```

### 4. Test Uptime Monitoring

```bash
# Trigger downtime (temporarily)
# Stop your server or deploy broken code

# Check UptimeRobot dashboard
# Should receive alert email
```

---

## Monitoring Dashboard Setup

### Create Custom Dashboard

1. **Sentry Dashboard**
   - Go to Sentry → Dashboards → Create Dashboard
   - Add widgets:
     - Error rate (last 24h)
     - Response time (p95)
     - User sessions
     - Top errors

2. **Vercel Analytics**
   - Already enabled by default
   - View in Vercel → Analytics
   - Shows:
     - Page views
     - Unique visitors
     - Top pages
     - Performance metrics

3. **Custom Status Page**
   - Use UptimeRobot status page
   - Or create custom: `app/status/page.tsx`

---

## Alert Configuration

### Critical Alerts (Immediate)

- Site down (5xx errors)
- Database connection lost
- Payment processing failures
- Authentication failures

### High Priority (15 minutes)

- Error rate spike (>10 errors/minute)
- Slow response times (>3 seconds)
- High memory usage (>80%)

### Medium Priority (1 hour)

- Increased error rate (>5 errors/minute)
- Slow queries (>1 second)
- Failed background jobs

### Low Priority (Daily digest)

- New error types
- Performance degradation
- Usage statistics

---

## Monitoring Checklist

### Initial Setup

- [ ] Create Sentry account
- [ ] Get Sentry DSN
- [ ] Add DSN to .env.local
- [ ] Add DSN to Vercel
- [ ] Test error tracking
- [ ] Configure alert rules
- [ ] Set up Slack integration (optional)

### Uptime Monitoring

- [ ] Create UptimeRobot account
- [ ] Add health endpoint monitor
- [ ] Add homepage monitor
- [ ] Add critical page monitors
- [ ] Configure email alerts
- [ ] Test alert delivery

### Performance Monitoring

- [ ] Verify Sentry performance tracking
- [ ] Set appropriate sample rate
- [ ] Monitor key transactions
- [ ] Set performance budgets

### Ongoing

- [ ] Review errors daily
- [ ] Check performance weekly
- [ ] Update alert rules monthly
- [ ] Review monitoring costs quarterly

---

## Cost Breakdown

### Free Tier (Recommended for Start)

- **Sentry:** Free (5,000 errors/month)
- **UptimeRobot:** Free (50 monitors, 5-min checks)
- **Vercel Analytics:** Free (included)
- **Total:** $0/month

### Paid Tier (For Scale)

- **Sentry Team:** $26/month (50,000 errors)
- **Better Uptime:** $20/month (unlimited monitors)
- **LogRocket:** $99/month (session replay)
- **Total:** $145/month

---

## Quick Start Commands

```bash
# 1. Add Sentry DSN to environment
echo "NEXT_PUBLIC_SENTRY_DSN=your-dsn-here" >> .env.local

# 2. Test locally
npm run dev
# Visit http://localhost:3000
# Trigger an error
# Check Sentry dashboard

# 3. Deploy to Vercel
vercel env add NEXT_PUBLIC_SENTRY_DSN
# Paste your DSN
vercel --prod

# 4. Verify in production
curl https://your-domain.com/api/health
# Check Sentry for any errors
```

---

## Troubleshooting

### Sentry Not Receiving Errors

**Check:**

1. DSN is correct in environment variables
2. `NEXT_PUBLIC_` prefix is present
3. Sentry is initialized in production
4. Errors are actually occurring

**Debug:**

```typescript
// Add to app/layout.tsx
console.log('Sentry DSN:', process.env.NEXT_PUBLIC_SENTRY_DSN);
```

### Performance Data Not Showing

**Check:**

1. `tracesSampleRate` is > 0
2. Transactions are being created
3. Sentry performance is enabled in project settings

### Health Endpoint Returns 503

**This is normal in development!**

- 503 = degraded (some services not configured)
- 200 = healthy (all services working)

In production with all services configured, should return 200.

---

## Next Steps

1. **Immediate (Today)**
   - [ ] Create Sentry account
   - [ ] Add DSN to Vercel
   - [ ] Test error tracking

2. **This Week**
   - [ ] Set up uptime monitoring
   - [ ] Configure alert rules
   - [ ] Add team members

3. **This Month**
   - [ ] Review error patterns
   - [ ] Optimize performance
   - [ ] Set up custom dashboards

---

## Support Resources

- **Sentry Docs:** [docs.sentry.io](https://docs.sentry.io)
- **Next.js + Sentry:** [docs.sentry.io/platforms/javascript/guides/nextjs](https://docs.sentry.io/platforms/javascript/guides/nextjs)
- **UptimeRobot Docs:** [uptimerobot.com/help](https://uptimerobot.com/help)
- **Vercel Monitoring:** [vercel.com/docs/concepts/analytics](https://vercel.com/docs/concepts/analytics)

---

## Conclusion

**Status:** ✅ CODE COMPLETE - NEEDS 30 MINUTES OF CONFIGURATION

All monitoring code is implemented and ready. You just need to:

1. Create Sentry account (5 min)
2. Add DSN to environment variables (5 min)
3. Set up uptime monitoring (10 min)
4. Configure alerts (10 min)

**Total time:** 30 minutes to full production monitoring

Once configured, you'll have:

- ✅ Real-time error tracking
- ✅ Performance monitoring
- ✅ Uptime alerts
- ✅ Health checks
- ✅ Complete visibility into production

**The hard work (coding) is done. Just needs the configuration!**
