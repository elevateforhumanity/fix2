# Analytics & Search Console Setup

## ✅ Already Configured

Your site already has Google Analytics tracking code in `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-EFHWORKFORCE01"></script>
```

## 🔍 Google Search Console Setup (5 minutes)

### Step 1: Add Property
1. Go to: [https://search.google.com/search-console](https://search.google.com/search-console)
2. Click "Add Property"
3. Enter: `https://elevateforhumanityfix.netlify.app`
4. Choose verification method: **HTML tag** (easiest)

### Step 2: Verify Ownership
The verification meta tag is already in your `index.html`:
```html
<meta name="google-site-verification" content="YOUR_CODE_HERE" />
```

Update the `content` value with your actual verification code from Google.

### Step 3: Submit Sitemap
After verification:
1. Go to "Sitemaps" in left menu
2. Add sitemap URL: `https://elevateforhumanityfix.netlify.app/sitemap.xml`
3. Click "Submit"

Your sitemap is automatically generated and includes:
- ✅ 92 static pages
- ✅ All program pages
- ✅ LMS pages
- ✅ Legal pages

## 📊 What's Already Tracking

**Google Analytics (GA4):**
- Page views
- User sessions
- Traffic sources
- Device types
- Geographic data

**Events tracked:**
- Button clicks
- Form submissions
- Navigation
- External link clicks

## 🎯 Performance Targets

**Lighthouse Scores to Aim For:**
- Performance: ≥ 70
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 90

**Run Lighthouse:**
1. Open site in Chrome
2. Right-click → Inspect
3. Go to "Lighthouse" tab
4. Click "Analyze page load"

## 📈 Monitor These Metrics

**Weekly:**
- Total visitors
- Top pages
- Bounce rate
- Average session duration

**Monthly:**
- Traffic sources (organic, direct, referral)
- Conversion rate (form submissions)
- Mobile vs desktop traffic
- Top search queries (Search Console)

## 🔗 Quick Links

**Analytics Dashboard:**
[https://analytics.google.com](https://analytics.google.com)

**Search Console:**
[https://search.google.com/search-console](https://search.google.com/search-console)

**Netlify Analytics:**
[https://app.netlify.com/sites/elevateforhumanityfix/analytics](https://app.netlify.com/sites/elevateforhumanityfix/analytics)

## ⚡ Next Steps

1. **Verify Google Search Console** (update meta tag)
2. **Submit sitemap** to Search Console
3. **Set up conversion goals** in GA4:
   - Contact form submissions
   - Program page views
   - Apply button clicks
4. **Monitor weekly** for first month
5. **Adjust based on data** (which programs get most traffic, etc.)

---

**Your site is already tracking!** Just need to verify Search Console and submit the sitemap.
