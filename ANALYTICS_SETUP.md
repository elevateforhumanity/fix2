# Analytics & Monitoring Setup

## Google Analytics 4 (GA4)

### Step 1: Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com)
2. Click **Admin** (gear icon)
3. Click **Create Property**
4. Enter property name: "Elevate for Humanity"
5. Select timezone and currency
6. Click **Next** → **Create**

### Step 2: Get Measurement ID
1. In Property settings, go to **Data Streams**
2. Click **Add stream** → **Web**
3. Enter website URL: `https://www.elevateforhumanity.org`
4. Enter stream name: "Main Website"
5. Click **Create stream**
6. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Add to Website

Add this code to `index.html` before the closing `</head>` tag:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Replace `G-XXXXXXXXXX` with your actual Measurement ID**

### Step 4: Verify Installation
1. Visit your website
2. In GA4, go to **Reports** → **Realtime**
3. You should see your visit appear within 30 seconds

### Optional: Enhanced Tracking

Add event tracking for key actions:

```html
<script>
  // Track button clicks
  document.querySelectorAll('a[href="/programs"]').forEach(btn => {
    btn.addEventListener('click', () => {
      gtag('event', 'view_programs', {
        'event_category': 'engagement',
        'event_label': 'Programs Page'
      });
    });
  });

  // Track apply button clicks
  document.querySelectorAll('a[href*="indianacareerconnect"]').forEach(btn => {
    btn.addEventListener('click', () => {
      gtag('event', 'apply_click', {
        'event_category': 'conversion',
        'event_label': 'Indiana Connect'
      });
    });
  });
</script>
```

---

## Sentry Error Monitoring

### Step 1: Create Sentry Project
1. Go to [sentry.io](https://sentry.io) and sign up
2. Click **Create Project**
3. Select platform: **React**
4. Enter project name: "elevate-for-humanity"
5. Click **Create Project**

### Step 2: Get DSN
1. After project creation, copy your **DSN** (Data Source Name)
2. Format: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`

### Step 3: Install Sentry SDK

```bash
npm install @sentry/react
```

### Step 4: Initialize Sentry

Update `src/main.tsx`:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from './App';
import './index.css';

// Initialize Sentry
Sentry.init({
  dsn: 'https://xxxxx@xxxxx.ingest.sentry.io/xxxxx',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 0.1, // 10% of transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // 10% of sessions
  replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
  // Environment
  environment: import.meta.env.MODE,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Step 5: Test Error Tracking

Add a test button temporarily:

```tsx
<button onClick={() => {
  throw new Error('Test Sentry error');
}}>
  Test Error
</button>
```

Click it and check Sentry dashboard for the error.

### Optional: User Context

Track which users encounter errors:

```typescript
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.name,
});
```

---

## Alternative: Simple Script-Based Sentry

If you don't want to install the SDK, use the CDN version:

Add to `index.html` before `</head>`:

```html
<!-- Sentry Error Monitoring -->
<script
  src="https://js.sentry-cdn.com/YOUR_PUBLIC_DSN.min.js"
  crossorigin="anonymous"
></script>
<script>
  Sentry.init({
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
</script>
```

---

## Uptime Monitoring

### UptimeRobot (Free)

1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Sign up for free account
3. Click **Add New Monitor**
4. Settings:
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** Elevate for Humanity
   - **URL:** `https://www.elevateforhumanity.org`
   - **Monitoring Interval:** 5 minutes
5. Add alert contacts (email, SMS, Slack)
6. Click **Create Monitor**

### What You Get
- ✅ Checks site every 5 minutes
- ✅ Email alerts if site goes down
- ✅ Public status page (optional)
- ✅ 50 monitors free

---

## Netlify Analytics (Built-in)

### Enable Netlify Analytics
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Go to **Analytics** tab
4. Click **Enable Analytics** ($9/month)

### What You Get
- ✅ Server-side tracking (no cookies, no GDPR issues)
- ✅ Page views and unique visitors
- ✅ Top pages and referrers
- ✅ Bandwidth usage
- ✅ 404 errors

**Advantage:** No JavaScript required, works even with ad blockers.

---

## Privacy Considerations

### GA4 Without Cookie Banner

GA4 can run in "cookieless" mode for basic analytics:

```javascript
gtag('config', 'G-XXXXXXXXXX', {
  'anonymize_ip': true,
  'client_storage': 'none'
});
```

This disables cookies but still tracks page views.

### GDPR Compliance

If you need full compliance:
1. Add cookie consent banner (use [CookieYes](https://www.cookieyes.com))
2. Only load GA4 after user consent
3. Add Privacy Policy page

---

## Testing Checklist

After setup:

- [ ] GA4 shows real-time visitors
- [ ] Sentry captures test error
- [ ] UptimeRobot sends test alert
- [ ] No console errors on site
- [ ] Analytics loads on all pages
- [ ] Deep links work (test /programs)

---

## Environment Variables (Optional)

Store IDs in `.env`:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

Use in code:

```typescript
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
```

**Don't commit `.env` to git!** Add to `.gitignore`.

---

## Quick Start Commands

```bash
# Install Sentry
npm install @sentry/react

# Build and test
npm run build
npm run preview

# Deploy
git add .
git commit -m "Add analytics and monitoring"
git push
```

---

## Support Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/9304153)
- [Sentry React Docs](https://docs.sentry.io/platforms/javascript/guides/react/)
- [UptimeRobot Docs](https://uptimerobot.com/help/)
- [Netlify Analytics](https://docs.netlify.com/monitor-sites/analytics/)
