# Google Ads Integration Guide

## Overview

Elevate for Humanity has been approved for Google Ad Grants, providing $10,000/month in free Google Ads to promote our workforce training programs.

---

## Technical Integration

### 1. Google Ads Conversion Tracking

Add the Google Ads conversion tracking code to track application submissions.

**Location**: `app/apply/page.tsx`

```typescript
// After successful form submission
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'conversion', {
    'send_to': 'AW-XXXXXXXXX/XXXXXXXXXXXXX', // Replace with your conversion ID
    'value': 1.0,
    'currency': 'USD'
  });
}
```

### 2. Google Analytics 4 Integration

**File**: `app/layout.tsx`

Add Google Analytics tracking:

```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### 3. Google Tag Manager (Recommended)

**Benefits:**
- Easier to manage multiple tracking codes
- No code changes needed for new tags
- Better debugging tools

**Setup:**
1. Create Google Tag Manager account
2. Add GTM container code to `app/layout.tsx`
3. Configure tags in GTM dashboard

---

## Conversion Tracking Setup

### Primary Conversions

1. **Application Submission** (Most Important)
   - Page: `/apply`
   - Event: Form submission success
   - Value: High priority

2. **Contact Form Submission**
   - Page: `/contact`
   - Event: Form submission success
   - Value: Medium priority

3. **Program Page Views**
   - Pages: `/programs/*`
   - Event: Page view
   - Value: Low priority (engagement metric)

4. **Phone Calls** (If call tracking enabled)
   - Track clicks on phone number
   - Use Google forwarding number

---

## Landing Page Optimization

### Requirements for Ad Grants
- Mobile-friendly (responsive design) ✅
- Fast loading times ✅
- Clear call-to-action ✅
- Relevant content to ad keywords ✅
- SSL certificate (HTTPS) ✅

### Recommended Landing Pages

| Campaign | Landing Page | CTA |
|----------|--------------|-----|
| Career Training | `/programs` | Browse Programs |
| CNA Training | `/programs/cna` | Apply Now |
| HVAC Training | `/programs/hvac-tech` | Apply Now |
| Barber Training | `/programs/barber-apprenticeship` | Apply Now |
| RISE Up | `/programs/rise-up` | Learn More |
| Funding Info | `/funding` | See If You Qualify |
| General Application | `/apply` | Submit Application |

---

## Campaign Structure

### Campaign 1: Healthcare Programs
**Ad Groups:**
- CNA Training
- Medical Assistant
- Patient Care

**Sample Ad:**
```
Headline 1: Free CNA Training in Indianapolis
Headline 2: Get Certified in 4-6 Weeks
Headline 3: WIOA Funding Available
Description 1: Start your healthcare career with free CNA training. WIOA funding covers tuition for eligible students.
Description 2: Apply today and begin training next month. Job placement assistance included.
```

### Campaign 2: Skilled Trades
**Ad Groups:**
- HVAC Training
- Building Maintenance
- CDL Training

### Campaign 3: Retail & Customer Service
**Ad Groups:**
- RISE Up Program
- Customer Service Training
- Retail Careers

---

## Keyword Strategy

### High-Intent Keywords (Priority)
- "free CNA training Indianapolis"
- "WIOA funded programs near me"
- "career training with job placement"
- "workforce development programs Indiana"

### Informational Keywords
- "how to become a CNA"
- "HVAC certification requirements"
- "barber apprenticeship programs"

### Avoid
- Single-word keywords (against policy)
- Overly broad terms
- Keywords with Quality Score < 3

---

## Ad Extensions

### Required Extensions
1. **Sitelink Extensions** (Required for Ad Grants)
   - Programs
   - Apply Now
   - Funding Options
   - Contact Us

2. **Callout Extensions**
   - "100% Free Training"
   - "WIOA Funded"
   - "Job Placement Assistance"
   - "No Tuition Required"

3. **Structured Snippets**
   - Programs: CNA, HVAC, Barber, CDL, Tax Prep
   - Services: Training, Funding, Job Placement

4. **Call Extensions**
   - Phone: (317) 314-3757
   - Track calls for conversions

5. **Location Extensions**
   - Indianapolis, IN
   - Marion County service area

---

## Performance Monitoring

### Weekly Checks
- [ ] CTR is above 5%
- [ ] Quality Score is 3+ for all keywords
- [ ] Conversion tracking is working
- [ ] Budget is being utilized

### Monthly Tasks
- [ ] Log into Google Ads account
- [ ] Review campaign performance
- [ ] Pause low-performing keywords
- [ ] Add negative keywords
- [ ] Test new ad copy

### Quarterly Reviews
- [ ] Analyze conversion data
- [ ] Adjust bidding strategy
- [ ] Expand successful campaigns
- [ ] Update landing pages

---

## Compliance Checklist

### Ad Grants Requirements
- ✅ At least 2 ad groups per campaign
- ✅ At least 2 ads per ad group
- ✅ Sitelink extensions on all campaigns
- ✅ No single-word keywords
- ✅ Quality Score 3+ for all keywords
- ✅ Maintain 5% CTR for 2 consecutive months
- ✅ Log in at least once per month
- ✅ Geo-targeting to service area
- ✅ Relevant landing pages

### Policy Compliance
- ✅ No commercial activity
- ✅ Mission-focused content
- ✅ Accurate information
- ✅ No misleading claims
- ✅ Proper use of grant funds

---

## Technical Implementation Checklist

### Phase 1: Setup (Week 1)
- [ ] Accept Google Ads account invitation
- [ ] Accept Google Payments invitation
- [ ] Accept terms and conditions
- [ ] Link Google Analytics
- [ ] Set up conversion tracking

### Phase 2: Campaign Creation (Week 2)
- [ ] Create first campaign
- [ ] Set up ad groups
- [ ] Write ad copy
- [ ] Add keywords
- [ ] Configure extensions

### Phase 3: Optimization (Ongoing)
- [ ] Monitor CTR daily
- [ ] Add negative keywords
- [ ] Test ad variations
- [ ] Optimize landing pages
- [ ] Track conversions

---

## Environment Variables

Add to `.env.local`:

```bash
# Google Ads
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=XXXXXXXXXXXXX

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager (Optional)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

---

## Support Resources

- **Google Ads Help**: https://support.google.com/google-ads
- **Ad Grants Help**: https://support.google.com/grants
- **Google Analytics Help**: https://support.google.com/analytics
- **Tag Manager Help**: https://support.google.com/tagmanager

---

## Contact

**Account Admin**: curvaturebodysculpting@gmail.com
**Organization**: SELFISH INC / Elevate for Humanity
**Charity ID**: 99-3483511

For technical questions, contact the development team.
For policy questions, visit the Google Ad Grants Help Center.
