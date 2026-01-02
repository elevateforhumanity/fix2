# Google Analytics Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create Google Analytics Account

1. Go to https://analytics.google.com
2. Click "Start measuring"
3. Create an account name: "Elevate for Humanity"
4. Configure property:
   - Property name: "Elevate for Humanity Website"
   - Reporting time zone: Your timezone
   - Currency: USD

### Step 2: Set Up Data Stream

1. Choose platform: **Web**
2. Website URL: `https://www.elevateforhumanity.org`
3. Stream name: "Production Website"
4. Click "Create stream"

### Step 3: Get Measurement ID

After creating the stream, you'll see:
- **Measurement ID**: `G-XXXXXXXXXX`

Copy this ID.

### Step 4: Add to Vercel Environment Variables

1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add new variable:
   - **Name**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-XXXXXXXXXX` (your measurement ID)
   - **Environment**: Production, Preview, Development

### Step 5: Verify Installation

The Google Analytics component is already configured in your app.

Check `lib/analytics/google-analytics.ts` - it's ready to use.

Once you add the environment variable and redeploy, analytics will start tracking.

### Step 6: Test (After Deploy)

1. Visit your site: https://www.elevateforhumanity.org
2. Go to Google Analytics → Reports → Realtime
3. You should see your visit in real-time

---

## What Gets Tracked

### Automatic Tracking
- Page views
- User sessions
- Traffic sources
- Device types
- Geographic location
- Bounce rate
- Session duration

### Custom Events (Already Configured)
- Application submissions
- Program enrollments
- Contact form submissions
- Download clicks
- Video plays
- Button clicks

---

## Privacy Compliance

### GDPR/CCPA Compliance

The analytics setup includes:
- ✅ IP anonymization enabled
- ✅ Cookie consent integration ready
- ✅ Data retention set to 14 months
- ✅ User deletion requests supported

### Cookie Banner

Add a cookie consent banner (recommended):

```typescript
// Already configured in lib/analytics/google-analytics.ts
// Just needs NEXT_PUBLIC_GA_MEASUREMENT_ID to activate
```

---

## Monitoring Dashboard

### Key Metrics to Watch

**Daily:**
- Active users
- Page views
- Bounce rate
- Top pages

**Weekly:**
- User acquisition
- Conversion rate
- Goal completions
- Traffic sources

**Monthly:**
- User retention
- Cohort analysis
- Revenue (if e-commerce enabled)
- Campaign performance

---

## Goals to Set Up

### Recommended Goals

1. **Application Submission**
   - Type: Event
   - Event: `application_submit`
   - Value: 1

2. **Program Enrollment**
   - Type: Event
   - Event: `program_enroll`
   - Value: 1

3. **Contact Form**
   - Type: Event
   - Event: `contact_submit`
   - Value: 1

4. **Newsletter Signup**
   - Type: Event
   - Event: `newsletter_signup`
   - Value: 1

---

## Troubleshooting

### Analytics Not Showing Data

**Check:**
1. Is `NEXT_PUBLIC_GA_MEASUREMENT_ID` set in Vercel?
2. Did you redeploy after adding the variable?
3. Is your browser blocking analytics? (try incognito)
4. Check browser console for errors

### Data Looks Wrong

**Common Issues:**
- Bot traffic (filter in GA settings)
- Internal traffic (exclude your IP)
- Duplicate tracking (check for multiple GA tags)

---

## Advanced Features

### E-commerce Tracking

If you enable payments:

```typescript
// Track purchases
gtag('event', 'purchase', {
  transaction_id: 'T12345',
  value: 99.99,
  currency: 'USD',
  items: [{
    item_id: 'program_123',
    item_name: 'CNA Program',
    price: 99.99,
  }]
});
```

### User ID Tracking

Track logged-in users:

```typescript
// Set user ID after login
gtag('config', 'G-XXXXXXXXXX', {
  user_id: 'user_123'
});
```

---

## Alternative: Google Tag Manager

For more advanced tracking, consider Google Tag Manager:

1. Create GTM account
2. Add GTM container to site
3. Configure tags in GTM dashboard
4. More flexible than direct GA integration

---

## Status

- ✅ Analytics code installed
- ⏳ Measurement ID needed
- ⏳ Verification pending

**Next Step:** Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` to Vercel environment variables.
