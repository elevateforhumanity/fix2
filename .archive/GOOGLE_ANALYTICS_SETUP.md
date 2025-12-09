# 📊 Google Analytics Setup - Complete

## ✅ Google Analytics ID: G-SWPG2HVYVH

Your Google Analytics tracking is now configured and ready to deploy.

---

## 🎯 What Pages Are Tracked

### ✅ TRACKED (Marketing & Public Pages)

**Homepage & Marketing**:
- `/` - Homepage
- `/about` - About page
- `/programs` - Programs listing
- `/programs/*` - Individual program pages
- `/funding` - Funding information
- `/apply` - Application page
- `/contact` - Contact page
- `/faq` - FAQ page
- `/blog` - Blog posts
- `/success-stories` - Success stories

**Public Information**:
- `/wioa-eligibility` - WIOA eligibility
- `/financial-aid` - Financial aid info
- `/workforce-partners` - Partner information
- `/employer/*` - Employer pages (public)
- `/webinars` - Webinars page

**Legal Pages**:
- `/privacy-policy` - Privacy policy
- `/terms-of-service` - Terms of service
- `/refund-policy` - Refund policy

**LMS Public Pages**:
- `/lms/courses` - Course catalog (public view)

---

### ❌ NOT TRACKED (Private/Admin Pages)

**Admin Areas**:
- `/admin/*` - All admin pages
- `/delegate/*` - Delegate portal

**Student Portal**:
- `/student/*` - Student dashboard and pages
- `/portal/*` - Student portal

**Private LMS**:
- `/lms/profile` - Student profile
- `/lms/messages` - Student messages
- `/lms/notifications` - Student notifications
- `/course/*` - Enrolled course content

**API Routes**:
- `/api/*` - All API endpoints

---

## 🔧 Implementation Details

### Main Component: `GoogleAnalytics.tsx`

**Location**: `/components/GoogleAnalytics.tsx`

**Features**:
- Automatically excludes private pages
- Uses Next.js Script component for optimal loading
- Loads after page is interactive (strategy="afterInteractive")
- Tracks page views automatically
- Respects user privacy on admin/student pages

**Excluded Paths**:
```javascript
- /admin/*
- /student/*
- /portal/*
- /delegate/*
- /course/*
- /lms/profile
- /lms/messages
- /lms/notifications
```

### LMS Component: `GoogleAnalyticsLMS.tsx`

**Location**: `/components/GoogleAnalyticsLMS.tsx`

**Purpose**: Tracks only public LMS course catalog pages

**Tracked**:
- `/lms/courses` - Public course listings

**Not Tracked**:
- Student-specific LMS pages
- Private course content
- Student profiles/messages

---

## 📋 Configuration

### Environment Variable

**Name**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`  
**Value**: `G-SWPG2HVYVH`  
**Where to Add**: Vercel Dashboard → Settings → Environment Variables

### Fallback Value

If environment variable is not set, the code uses the hardcoded ID:
```javascript
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-SWPG2HVYVH';
```

This ensures tracking works even if the environment variable isn't set.

---

## 🚀 Deployment Steps

### 1. Add Environment Variable to Vercel

```
Name: NEXT_PUBLIC_GA_MEASUREMENT_ID
Value: G-SWPG2HVYVH
Environments: ✅ Production ✅ Preview ✅ Development
```

### 2. Redeploy

The code is already committed and pushed. Just redeploy from Vercel dashboard.

### 3. Verify Tracking

After deployment:
1. Visit: https://www.elevateforhumanity.org
2. Open browser console (F12)
3. Check for gtag.js loading
4. Go to Google Analytics dashboard
5. Check Real-Time reports

---

## 🔍 Testing Analytics

### Test in Real-Time

1. Go to: https://analytics.google.com
2. Select property: G-SWPG2HVYVH
3. Go to: Reports → Real-time
4. Visit your site in another tab
5. Should see your visit in real-time report

### Test Different Pages

**Should Track**:
- Visit homepage → Should appear in analytics
- Visit /programs → Should track
- Visit /about → Should track

**Should NOT Track**:
- Visit /admin → Should NOT appear
- Visit /student → Should NOT appear
- Visit /portal → Should NOT appear

---

## 📊 What Data Is Collected

### Automatic Tracking

- **Page Views**: Every page visit on public pages
- **Page Path**: URL of the page visited
- **Referrer**: Where visitors came from
- **Device Type**: Desktop, mobile, tablet
- **Location**: Country, city (approximate)
- **Browser**: Chrome, Safari, Firefox, etc.
- **Screen Resolution**: Display size

### NOT Collected

- Personal information from forms
- Student data from portal
- Admin activity
- Private course content views
- Student messages or profiles

---

## 🎯 Privacy Compliance

### GDPR/Privacy Considerations

**Compliant Features**:
- No tracking on private/student pages
- No personal data collection
- Respects user privacy
- Anonymous analytics only

**Privacy Policy**:
- Already mentions Google Analytics
- Located at: `/privacy-policy`
- Explains data collection

### Cookie Consent

If you need cookie consent banner:
- Component exists: `CookieBanner.tsx`
- Already included in layout
- Users can opt-out

---

## 🔧 Customization

### Track Additional Events

To track custom events (button clicks, form submissions):

```javascript
// In any component
'use client';

const handleClick = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'button_click', {
      event_category: 'engagement',
      event_label: 'Apply Now Button',
    });
  }
};
```

### Track Conversions

For application submissions:

```javascript
window.gtag('event', 'conversion', {
  send_to: 'G-SWPG2HVYVH/APPLICATION_CONVERSION_ID',
  value: 1.0,
  currency: 'USD',
});
```

---

## 📈 Recommended Goals to Set Up

### In Google Analytics Dashboard

1. **Application Started**
   - Event: Visit to /apply page
   - Goal: Conversion

2. **Application Completed**
   - Event: Form submission
   - Goal: Conversion

3. **Program Page Views**
   - Event: Visit to /programs/* pages
   - Goal: Engagement

4. **Contact Form Submission**
   - Event: Contact form submit
   - Goal: Lead generation

---

## ✅ Verification Checklist

After deployment:

- [ ] Visit homepage - check if gtag.js loads
- [ ] Check Google Analytics Real-Time reports
- [ ] Verify public pages are tracked
- [ ] Verify admin pages are NOT tracked
- [ ] Verify student pages are NOT tracked
- [ ] Check mobile tracking works
- [ ] Verify referrer data is captured

---

## 🆘 Troubleshooting

### Analytics Not Showing Data

**Check**:
1. Environment variable is set in Vercel
2. Site is deployed with latest code
3. Ad blockers are disabled (for testing)
4. Correct property ID in Google Analytics
5. Real-Time reports (data can take 24-48 hours for full reports)

### Tracking Private Pages

**Solution**: Check the excluded paths in `GoogleAnalytics.tsx`

### Double Tracking

**Issue**: If you see duplicate page views
**Solution**: Make sure GoogleAnalytics component is only in main layout, not in individual pages

---

## 📞 Support

### Google Analytics Help
- Dashboard: https://analytics.google.com
- Help Center: https://support.google.com/analytics

### Your Setup
- **Property ID**: G-SWPG2HVYVH
- **Component**: `/components/GoogleAnalytics.tsx`
- **Layout**: `/app/layout.tsx`

---

## 🎉 Summary

✅ Google Analytics ID configured: **G-SWPG2HVYVH**  
✅ Tracking code added to all public pages  
✅ Private pages excluded from tracking  
✅ Privacy-compliant implementation  
✅ Ready to deploy  

**Next Step**: Add environment variable to Vercel and redeploy!

---

**Last Updated**: November 27, 2024  
**Status**: ✅ Ready for Deployment
