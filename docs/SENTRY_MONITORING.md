# Sentry Monitoring & Alerts

Comprehensive error tracking and performance monitoring with Slack integration.

## Overview

Sentry monitors:
- ✅ Frontend errors (React)
- ✅ Backend errors (Netlify Functions)
- ✅ Performance issues
- ✅ User sessions (with replay)
- ✅ API failures
- ✅ Database connectivity
- ✅ System health

**Alerts sent to Slack for:**
- Critical errors
- High error rates
- System health issues
- Performance degradation

## Setup

### 1. Create Sentry Account

1. Go to [Sentry.io](https://sentry.io/)
2. Sign up or log in
3. Create new organization: "Elevate for Humanity"

### 2. Create Projects

Create separate projects for better organization:

**Frontend Project:**
1. Click **Projects** → **Create Project**
2. Platform: **React**
3. Name: "EFH Frontend"
4. Click **Create Project**
5. Copy the **DSN** (starts with `https://`)

**Backend Project:**
1. Click **Projects** → **Create Project**
2. Platform: **Node.js**
3. Name: "EFH Backend"
4. Click **Create Project**
5. Copy the **DSN**

### 3. Configure Environment Variables

Add to Netlify Dashboard → Site settings → Environment variables:

```bash
# Frontend Sentry
VITE_SENTRY_DSN=https://your-frontend-dsn@sentry.io/project-id
VITE_SENTRY_ENABLED=true
VITE_ENVIRONMENT=production

# Backend Sentry (for Netlify Functions)
SENTRY_DSN=https://your-backend-dsn@sentry.io/project-id

# Slack Webhook (for alerts)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### 4. Set Up Slack Webhook

1. Go to [Slack API](https://api.slack.com/apps)
2. Click **Create New App** → **From scratch**
3. App name: "EFH Monitoring"
4. Select your workspace
5. Click **Incoming Webhooks**
6. Toggle **Activate Incoming Webhooks** to On
7. Click **Add New Webhook to Workspace**
8. Select channel: `#alerts` or `#monitoring`
9. Copy the webhook URL

### 5. Configure Sentry Webhooks

**For each Sentry project:**

1. Go to **Settings** → **Integrations**
2. Search for "Webhooks"
3. Click **Add to Project**
4. Webhook URL: `https://elevateforhumanity.org/.netlify/functions/sentry-webhook`
5. Select events:
   - Issue Created
   - Issue Resolved
   - Issue Assigned
6. Click **Save Changes**

## Frontend Monitoring

### Already Configured

Frontend monitoring is already set up in `frontend/src/config/sentry.ts`:

```typescript
import { initSentry } from './config/sentry';

// In main.tsx
initSentry();
```

### Features

- **Error Tracking:** Automatic capture of unhandled errors
- **Performance Monitoring:** Track page load times, API calls
- **Session Replay:** Watch user sessions with errors
- **Breadcrumbs:** Track user actions leading to errors
- **User Context:** Associate errors with specific users

### Manual Error Capture

```typescript
import { captureException, captureMessage } from './config/sentry';

try {
  // Your code
} catch (error) {
  captureException(error, {
    extra: {
      userId: user.id,
      action: 'enrollment-submit',
    },
  });
}

// Log important events
captureMessage('Payment processed successfully', 'info');
```

## Backend Monitoring

### Netlify Functions

Add Sentry to each function:

```javascript
const Sentry = require('@sentry/node');

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.CONTEXT || 'production',
  tracesSampleRate: 0.1,
});

exports.handler = async (event, context) => {
  try {
    // Your function code
  } catch (error) {
    // Capture error
    Sentry.captureException(error, {
      extra: {
        event,
        context,
      },
    });
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```

### Automatic Error Capture

Wrap handler with Sentry:

```javascript
const Sentry = require('@sentry/node');

Sentry.init({ dsn: process.env.SENTRY_DSN });

exports.handler = Sentry.AWSLambda.wrapHandler(async (event, context) => {
  // Your code - errors automatically captured
});
```

## Health Monitoring

### Automated Health Checks

GitHub Actions runs health checks every hour:

```yaml
# .github/workflows/health-check.yml
on:
  schedule:
    - cron: '0 * * * *'  # Every hour
```

**Checks:**
- Database connectivity
- Stripe API
- OpenAI API
- Error rate (last hour)

### Manual Health Check

```bash
curl https://elevateforhumanity.org/.netlify/functions/health-check
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-27T12:00:00Z",
  "checks": {
    "database": {
      "status": "healthy",
      "message": "Connected",
      "responseTime": 45
    },
    "stripe": {
      "status": "healthy",
      "message": "Connected",
      "responseTime": 120
    },
    "openai": {
      "status": "healthy",
      "message": "Connected",
      "responseTime": 200
    },
    "errorRate": {
      "status": "healthy",
      "message": "Normal",
      "count": 5
    }
  }
}
```

## Slack Alerts

### Alert Types

**🚨 Critical Errors:**
- Unhandled exceptions
- Database failures
- Payment processing errors
- API failures

**⚠️ Warnings:**
- High error rate (>50/hour)
- Slow response times (>5s)
- Failed scheduled jobs

**✅ Resolutions:**
- Issues marked as resolved
- System health restored

### Alert Format

```
🚨 Sentry Alert: New Error

Title: TypeError: Cannot read property 'id' of undefined
Level: ERROR
Environment: production
Culprit: src/pages/ApplyScholarship.tsx
Occurrences: 15 events, 8 users affected

[View in Sentry]
```

### Custom Alerts

Send custom alerts to Slack:

```javascript
const sendSlackAlert = async (message) => {
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: '🚨 Custom Alert',
      attachments: [{
        color: '#ff0000',
        title: 'Alert Title',
        text: message,
        footer: 'EFH Monitoring',
        ts: Math.floor(Date.now() / 1000),
      }],
    }),
  });
};
```

## Performance Monitoring

### Track Performance

```typescript
import * as Sentry from '@sentry/react';

// Track custom transaction
const transaction = Sentry.startTransaction({
  name: 'Scholarship Application Submit',
  op: 'form.submit',
});

try {
  // Your code
  await submitApplication(data);
  transaction.setStatus('ok');
} catch (error) {
  transaction.setStatus('internal_error');
  throw error;
} finally {
  transaction.finish();
}
```

### Automatic Performance Tracking

Sentry automatically tracks:
- Page load times
- API call durations
- Database query times
- Component render times

## Error Filtering

### Ignore Errors

Already configured to ignore:
- Browser extension errors
- Network errors (transient)
- ResizeObserver errors (harmless)
- Third-party script errors

### Sensitive Data

Automatically redacted:
- Passwords
- API keys
- Tokens
- Authorization headers
- Cookies

## Monitoring Dashboard

### Sentry Dashboard

View in Sentry:
1. **Issues:** All errors grouped by type
2. **Performance:** Transaction times, slow queries
3. **Releases:** Track errors by deployment
4. **Alerts:** Configure custom alert rules

### Key Metrics

**Error Rate:**
- Target: <10 errors/hour
- Alert: >50 errors/hour

**Response Time:**
- Target: <500ms average
- Alert: >2s average

**Uptime:**
- Target: 99.9%
- Alert: <99%

## Troubleshooting

### Sentry Not Capturing Errors

**Check:**
1. `VITE_SENTRY_DSN` is set in Netlify env vars
2. DSN is correct (starts with `https://`)
3. Sentry is initialized in `main.tsx`
4. Error is not in ignore list

**Test:**
```typescript
import { captureMessage } from './config/sentry';

captureMessage('Test error from frontend', 'error');
```

### Slack Alerts Not Working

**Check:**
1. `SLACK_WEBHOOK_URL` is set in Netlify env vars
2. Webhook URL is correct
3. Sentry webhook is configured
4. Channel exists and bot has access

**Test:**
```bash
curl -X POST https://elevateforhumanity.org/.netlify/functions/sentry-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "action": "created",
    "data": {
      "issue": {
        "title": "Test Error",
        "level": "error",
        "web_url": "https://sentry.io/test"
      }
    }
  }'
```

### Health Check Failing

**Check:**
1. Database is accessible
2. API keys are valid
3. Network connectivity
4. Rate limits not exceeded

**Debug:**
```bash
curl -v https://elevateforhumanity.org/.netlify/functions/health-check
```

## Best Practices

### Error Handling

1. **Catch and log** - Don't let errors go unhandled
2. **Add context** - Include user ID, action, data
3. **Set severity** - Use appropriate levels (error, warning, info)
4. **Group errors** - Use fingerprints for similar errors
5. **Fix quickly** - Resolve critical errors within 24 hours

### Performance

1. **Sample rates** - Use 10% in production to reduce costs
2. **Filter noise** - Ignore non-actionable errors
3. **Track key transactions** - Focus on critical user flows
4. **Set budgets** - Alert on performance regressions
5. **Optimize slow queries** - Fix queries >1s

### Alerts

1. **Reduce noise** - Only alert on actionable issues
2. **Set thresholds** - Don't alert on single errors
3. **Escalate** - Page on-call for critical issues
4. **Document** - Add runbooks for common alerts
5. **Review** - Weekly review of error trends

## Cost Management

### Sentry Pricing

**Free Tier:**
- 5,000 errors/month
- 10,000 performance transactions/month
- 1 project

**Team Plan ($26/month):**
- 50,000 errors/month
- 100,000 performance transactions/month
- Unlimited projects

### Optimize Costs

1. **Sample rates** - Use 10% for performance monitoring
2. **Filter errors** - Ignore non-actionable errors
3. **Quota management** - Set monthly limits
4. **Archive old issues** - Clean up resolved issues
5. **Review usage** - Monthly cost review

## Resources

- [Sentry Documentation](https://docs.sentry.io/)
- [Sentry React SDK](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Sentry Node SDK](https://docs.sentry.io/platforms/node/)
- [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)

## Support

For issues:
1. Check Sentry dashboard for errors
2. Review Netlify function logs
3. Test Slack webhook manually
4. Contact Sentry support (if needed)

---

**Monitoring is now active! Track errors, performance, and system health with real-time Slack alerts. 📊**
