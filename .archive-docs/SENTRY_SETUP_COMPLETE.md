# Sentry Setup - Complete Guide

**Date:** December 29, 2025  
**Status:** ⚠️ CODE READY - NEEDS DSN  
**Time Required:** 10 minutes

---

## Quick Setup (10 Minutes)

### Step 1: Create Sentry Account (3 minutes)

1. **Go to Sentry**
   - Visit: [https://sentry.io/signup](https://sentry.io/signup)
   - Sign up with email or GitHub

2. **Create Organization**
   - Organization name: `Elevate for Humanity`
   - Click "Create Organization"

3. **Create Project**
   - Platform: **Next.js**
   - Project name: `elevate-production`
   - Alert frequency: **On every new issue**
   - Click "Create Project"

---

### Step 2: Get Your DSN (1 minute)

After creating the project, you'll see:

```
Client Keys (DSN)
https://abc123def456@o123456.ingest.sentry.io/789012
```

**Copy this entire URL** - this is your DSN.

---

### Step 3: Add to Local Environment (1 minute)

```bash
# Add to .env.local
echo "NEXT_PUBLIC_SENTRY_DSN=https://abc123def456@o123456.ingest.sentry.io/789012" >> .env.local

# Verify it was added
cat .env.local | grep SENTRY
```

---

### Step 4: Add to Vercel (3 minutes)

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Select your project: **elevate-for-humanity**
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Fill in:
   - **Name:** `NEXT_PUBLIC_SENTRY_DSN`
   - **Value:** `https://abc123def456@o123456.ingest.sentry.io/789012`
   - **Environments:** ✅ Production ✅ Preview ✅ Development
6. Click **Save**

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login
vercel login

# Add DSN
vercel env add NEXT_PUBLIC_SENTRY_DSN
# When prompted, paste your DSN
# Select: Production, Preview, Development
```

---

### Step 5: Get Auth Token (Optional - 2 minutes)

For source maps and releases:

1. In Sentry, go to **Settings** → **Auth Tokens**
2. Click **Create New Token**
3. Name: `Vercel Deployment`
4. Scopes:
   - ✅ `project:read`
   - ✅ `project:releases`
   - ✅ `org:read`
5. Click **Create Token**
6. Copy the token

**Add to Vercel:**

```bash
# Via CLI
vercel env add SENTRY_AUTH_TOKEN
# Paste token when prompted

# OR via Dashboard
# Settings → Environment Variables → Add New
# Name: SENTRY_AUTH_TOKEN
# Value: your-token-here
```

---

### Step 6: Deploy and Test (3 minutes)

```bash
# Redeploy to apply new environment variables
vercel --prod

# Wait for deployment to complete (~2 minutes)

# Test error tracking
curl https://www.elevateforhumanity.org/api/test-error

# Check Sentry dashboard
# You should see the error appear within seconds
```

---

## Verification Checklist

### ✅ Local Development

```bash
# 1. Check .env.local
cat .env.local | grep SENTRY_DSN
# Should show: NEXT_PUBLIC_SENTRY_DSN=https://...

# 2. Start dev server
npm run dev

# 3. Check browser console
# Should see: [Sentry] Initialized

# 4. Trigger test error
# Visit: http://localhost:3000/api/test-error

# 5. Check Sentry dashboard
# Error should appear
```

### ✅ Vercel Production

```bash
# 1. Check environment variables
vercel env ls
# Should show: NEXT_PUBLIC_SENTRY_DSN

# 2. Check deployment
curl https://www.elevateforhumanity.org/api/health
# Should return 200

# 3. Trigger test error
curl https://www.elevateforhumanity.org/api/test-error

# 4. Check Sentry dashboard
# Error should appear with production context
```

---

## What Sentry Tracks

### Automatically Tracked ✅

1. **JavaScript Errors**
   - Uncaught exceptions
   - Promise rejections
   - React errors

2. **API Errors**
   - 500 errors
   - Database errors
   - Third-party API failures

3. **Performance**
   - Page load times
   - API response times
   - Database query times

4. **User Context**
   - User ID (if authenticated)
   - Browser info
   - Device info
   - URL and route

---

## Sentry Configuration Files

### Already Configured ✅

1. **`sentry.client.config.ts`**
   - Client-side error tracking
   - Browser errors
   - React errors

2. **`sentry.server.config.ts`**
   - Server-side error tracking
   - API errors
   - Database errors

3. **`sentry.edge.config.ts`**
   - Edge runtime errors
   - Middleware errors

4. **`lib/monitoring/sentry.ts`**
   - Helper functions
   - Custom error tracking
   - Performance monitoring

---

## Testing Sentry

### Create Test Error Endpoint

```typescript
// app/api/test-error/route.ts
import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';

export async function GET() {
  try {
    // Trigger test error
    throw new Error('Test error for Sentry - everything is working!');
  } catch (error) {
    // Capture in Sentry
    Sentry.captureException(error);

    return NextResponse.json(
      {
        message: 'Test error sent to Sentry',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
```

### Test Commands

```bash
# Test locally
curl http://localhost:3000/api/test-error

# Test production
curl https://www.elevateforhumanity.org/api/test-error

# Check Sentry dashboard
# Should see error with full stack trace
```

---

## Sentry Dashboard

### What You'll See

1. **Issues Tab**
   - All errors grouped by type
   - Error frequency
   - Affected users
   - Stack traces

2. **Performance Tab**
   - Transaction times
   - Slow queries
   - API response times
   - Page load times

3. **Releases Tab**
   - Deployment tracking
   - Error rates per release
   - Regression detection

4. **Alerts Tab**
   - Alert rules
   - Notification settings
   - Slack integration

---

## Alert Configuration

### Recommended Alerts

1. **New Issue Alert**
   - When: A new issue is seen
   - Action: Send email
   - Frequency: Immediately

2. **High Error Rate Alert**
   - When: Error rate > 10 errors/minute
   - Action: Send email + Slack
   - Frequency: Every 5 minutes

3. **Performance Degradation**
   - When: Response time > 3 seconds
   - Action: Send email
   - Frequency: Every 15 minutes

### Setup Alerts

1. Go to **Alerts** → **Create Alert Rule**
2. Choose alert type
3. Configure conditions
4. Set notification channels
5. Save alert

---

## Slack Integration (Optional)

### Setup Slack Notifications

1. In Sentry, go to **Settings** → **Integrations**
2. Find **Slack** → Click **Add to Slack**
3. Authorize Sentry
4. Choose channel: `#production-alerts`
5. Configure alert rules to use Slack

### Test Slack Integration

```bash
# Trigger test error
curl https://www.elevateforhumanity.org/api/test-error

# Check Slack channel
# Should receive notification within seconds
```

---

## Troubleshooting

### Sentry Not Receiving Errors

**Check 1: DSN is set**

```bash
# Local
echo $NEXT_PUBLIC_SENTRY_DSN

# Vercel
vercel env ls | grep SENTRY
```

**Check 2: DSN has correct prefix**

```bash
# ✅ Correct
NEXT_PUBLIC_SENTRY_DSN=https://...

# ❌ Wrong (missing NEXT_PUBLIC_)
SENTRY_DSN=https://...
```

**Check 3: Redeploy after adding DSN**

```bash
vercel --prod
```

**Check 4: Check browser console**

```javascript
// Should see in console:
[Sentry] Initialized
```

---

### Errors Not Showing in Dashboard

**Possible causes:**

1. DSN not set correctly
2. Sentry not initialized
3. Errors filtered out
4. Wrong project selected

**Debug:**

```typescript
// Add to app/layout.tsx
console.log('Sentry DSN:', process.env.NEXT_PUBLIC_SENTRY_DSN);

// Should show your DSN
```

---

### Performance Data Not Showing

**Check sample rate:**

```typescript
// sentry.server.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0, // 100% of transactions
});
```

**For high traffic, reduce sample rate:**

```typescript
tracesSampleRate: 0.1, // 10% of transactions
```

---

## Cost Management

### Free Tier

- **5,000 errors/month**
- **10,000 performance units/month**
- **1 project**
- **30 days data retention**

### When to Upgrade

- More than 5,000 errors/month
- Need longer data retention
- Need more projects
- Need advanced features

### Paid Plans

- **Team:** $26/month (50,000 errors)
- **Business:** $80/month (150,000 errors)
- **Enterprise:** Custom pricing

---

## Best Practices

### DO ✅

- Set up alerts immediately
- Review errors daily
- Fix high-frequency errors first
- Use releases to track deployments
- Add user context to errors
- Monitor performance metrics

### DON'T ❌

- Ignore error alerts
- Let errors accumulate
- Use production DSN in development
- Expose DSN in client code (it's okay, it's public)
- Skip testing Sentry setup

---

## Advanced Features

### Source Maps (Optional)

Already configured in `next.config.mjs`:

```javascript
sentry: {
  hideSourceMaps: true,
  widenClientFileUpload: true,
}
```

### Custom Context

```typescript
import * as Sentry from '@sentry/nextjs';

// Add user context
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.name,
});

// Add custom tags
Sentry.setTag('page', 'checkout');
Sentry.setTag('feature', 'payment');

// Add breadcrumbs
Sentry.addBreadcrumb({
  message: 'User clicked checkout',
  level: 'info',
});
```

### Performance Monitoring

```typescript
import * as Sentry from '@sentry/nextjs';

// Start transaction
const transaction = Sentry.startTransaction({
  name: 'Checkout Process',
  op: 'checkout',
});

// Add spans
const span = transaction.startChild({
  op: 'payment',
  description: 'Process payment',
});

// ... do work ...

span.finish();
transaction.finish();
```

---

## Quick Reference

### Environment Variables

```bash
# Required
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...

# Optional
SENTRY_AUTH_TOKEN=your-token-here
SENTRY_ORG=elevate-for-humanity
SENTRY_PROJECT=elevate-production
```

### Test Commands

```bash
# Test locally
curl http://localhost:3000/api/test-error

# Test production
curl https://www.elevateforhumanity.org/api/test-error

# Check Sentry
open https://sentry.io
```

### Useful Links

- Dashboard: [https://sentry.io](https://sentry.io)
- Docs: [https://docs.sentry.io](https://docs.sentry.io)
- Next.js Guide: [https://docs.sentry.io/platforms/javascript/guides/nextjs](https://docs.sentry.io/platforms/javascript/guides/nextjs)

---

## Success Checklist

- [ ] Sentry account created
- [ ] Project created
- [ ] DSN copied
- [ ] DSN added to .env.local
- [ ] DSN added to Vercel
- [ ] Redeployed to Vercel
- [ ] Test error sent
- [ ] Error appears in Sentry
- [ ] Alerts configured
- [ ] Slack integrated (optional)
- [ ] Team members invited

---

## Summary

**Status:** ⚠️ NEEDS 10 MINUTES OF SETUP

**What's Ready:**

- ✅ All Sentry code implemented
- ✅ Configuration files ready
- ✅ Error tracking configured
- ✅ Performance monitoring configured

**What's Needed:**

- ❌ Create Sentry account (3 min)
- ❌ Get DSN (1 min)
- ❌ Add to .env.local (1 min)
- ❌ Add to Vercel (3 min)
- ❌ Test (2 min)

**Total Time:** 10 minutes

**Next Step:** Go to [https://sentry.io/signup](https://sentry.io/signup)

---

**Once configured, you'll have complete error tracking and monitoring! 🎉**
