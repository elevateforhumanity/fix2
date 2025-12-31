# Monitoring Setup for Launch

## Error Monitoring (Sentry)

### Setup Instructions:

1. **Create Sentry Account**
   - Go to https://sentry.io
   - Create new project for Next.js
   - Copy DSN

2. **Install Sentry**
   ```bash
   npm install @sentry/nextjs
   npx @sentry/wizard@latest -i nextjs
   ```

3. **Add Environment Variable**
   ```env
   NEXT_PUBLIC_SENTRY_DSN=your_dsn_here
   SENTRY_AUTH_TOKEN=your_auth_token
   ```

4. **Sentry will auto-configure:**
   - `sentry.client.config.ts`
   - `sentry.server.config.ts`
   - `sentry.edge.config.ts`

### What Gets Tracked:
- ✅ Client-side errors
- ✅ Server-side errors
- ✅ API route errors
- ✅ Unhandled promise rejections
- ✅ Console errors
- ✅ Performance metrics

---

## Uptime Monitoring

### Option 1: UptimeRobot (Free)

1. Go to https://uptimerobot.com
2. Add monitors for:
   - **Homepage**: https://www.elevateforhumanity.org
   - **Login**: https://www.elevateforhumanity.org/login
   - **Dashboard**: https://www.elevateforhumanity.org/dashboard
   - **LMS**: https://www.elevateforhumanity.org/lms
3. Set check interval: 5 minutes
4. Add alert contacts (email, SMS)

### Option 2: Better Uptime (Recommended)

1. Go to https://betteruptime.com
2. Add status page: status.elevateforhumanity.org
3. Monitor endpoints:
   - Homepage (200 OK)
   - Login page (200 OK)
   - API health check (create `/api/health`)
4. Set up incident notifications

---

## Health Check Endpoint

Create `/api/health/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check database connection
    // const { data, error } = await supabase.from('_health').select('count');
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'Service unavailable',
      },
      { status: 503 }
    );
  }
}
```

---

## Analytics (Already Configured)

✅ Google Analytics 4
✅ Facebook Pixel
✅ UTM tracking in email signatures

---

## Logging Strategy

### Production Logs:
- **Vercel Logs**: Automatic (7 days retention)
- **Supabase Logs**: Check auth failures, RLS violations
- **Error Boundaries**: All errors logged to console (Sentry will capture)

### What to Monitor:

1. **Auth Callback Failures**
   - Check `/api/auth/callback` logs
   - Look for redirect_uri mismatches

2. **Loading Timeouts**
   - Monitor LoadingTimeout component triggers
   - Track which routes timeout most

3. **Error Boundary Triggers**
   - Dashboard errors
   - LMS errors
   - Global errors

---

## Alert Thresholds

### Critical (Immediate Action):
- Site down > 2 minutes
- Error rate > 5% of requests
- Auth failure rate > 10%

### Warning (Review within 1 hour):
- Response time > 3 seconds
- Error rate > 1% of requests
- Loading timeout > 5 occurrences/hour

### Info (Review daily):
- New error types
- Performance degradation
- Unusual traffic patterns

---

## Launch Checklist

### Pre-Launch:
- [ ] Sentry installed and configured
- [ ] Uptime monitoring active
- [ ] Health check endpoint created
- [ ] Alert contacts configured
- [ ] Test error reporting (trigger test error)
- [ ] Verify alerts are received

### Post-Launch (First 24 Hours):
- [ ] Monitor error rate every 2 hours
- [ ] Check uptime status
- [ ] Review Sentry issues
- [ ] Verify auth flow works (mobile + desktop)
- [ ] Check loading timeout occurrences

### Post-Launch (First Week):
- [ ] Daily error review
- [ ] Performance metrics review
- [ ] User feedback collection
- [ ] Adjust alert thresholds if needed

---

## Dashboard URLs

Once configured, bookmark these:

- **Sentry Dashboard**: https://sentry.io/organizations/[org]/projects/[project]
- **Uptime Status**: https://uptimerobot.com/dashboard
- **Vercel Analytics**: https://vercel.com/[team]/[project]/analytics
- **Supabase Logs**: https://app.supabase.com/project/[ref]/logs

---

## Quick Commands

```bash
# Check if site is up
curl -I https://www.elevateforhumanity.org

# Check health endpoint
curl https://www.elevateforhumanity.org/api/health

# Test error reporting (after Sentry setup)
# Visit: https://www.elevateforhumanity.org/test-error

# View Vercel logs
vercel logs [deployment-url]
```

---

## Support Contacts

- **Technical Issues**: Elevate4humanityedu@gmail.com
- **Sentry Support**: https://sentry.io/support
- **Vercel Support**: https://vercel.com/support

---

**Status**: Ready for monitoring setup
**Priority**: Complete before full launch
**Estimated Setup Time**: 30 minutes
