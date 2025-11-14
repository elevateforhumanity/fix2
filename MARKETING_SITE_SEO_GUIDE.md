# Marketing Site SEO Setup Guide
## www.elevateforhumanity.org (Durablesites.co)

## Overview

This guide covers setting up SEO, sitemaps, and search engine optimization for your **marketing site** hosted on Durablesites.co.

---

## Current Setup

**Marketing Site**: www.elevateforhumanity.org
- **Hosted on**: Durablesites.co
- **Purpose**: Public-facing marketing, lead generation
- **Content**: Program information, about, contact, enrollment links

**LMS Site**: elevateconnectsdirectory.org
- **Hosted on**: Netlify (this repository)
- **Purpose**: Student portal, courses, learning management
- **SEO**: Already configured ✅

---

## Part 1: Sitemap for Marketing Site

### Option A: Use Durablesites.co Built-in Sitemap

Most website builders like Durablesites.co automatically generate sitemaps.

**Check if sitemap exists**:
1. Visit: https://www.elevateforhumanity.org/sitemap.xml
2. If it loads, you already have a sitemap! ✅
3. If 404 error, proceed to Option B

**If sitemap exists**:
1. Go to Google Search Console
2. Submit: `https://www.elevateforhumanity.org/sitemap.xml`
3. Go to Bing Webmaster Tools
4. Submit: `https://www.elevateforhumanity.org/sitemap.xml`
5. Done! ✅

### Option B: Create Manual Sitemap

If Durablesites.co doesn't auto-generate, create one manually:

**Create `sitemap.xml`**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Homepage -->
  <url>
    <loc>https://www.elevateforhumanity.org/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- About Page -->
  <url>
    <loc>https://www.elevateforhumanity.org/about</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Programs Page -->
  <url>
    <loc>https://www.elevateforhumanity.org/programs</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Individual Program Pages -->
  <url>
    <loc>https://www.elevateforhumanity.org/programs/workforce-readiness</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.elevateforhumanity.org/programs/hvac</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.elevateforhumanity.org/programs/cna</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.elevateforhumanity.org/programs/barber</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Contact Page -->
  <url>
    <loc>https://www.elevateforhumanity.org/contact</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Enrollment Page -->
  <url>
    <loc>https://www.elevateforhumanity.org/enroll</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Blog (if exists) -->
  <url>
    <loc>https://www.elevateforhumanity.org/blog</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

</urlset>
```

**Upload to Durablesites.co**:
1. Log in to Durablesites.co dashboard
2. Go to File Manager or Settings
3. Upload `sitemap.xml` to root directory
4. Verify: https://www.elevateforhumanity.org/sitemap.xml

---

## Part 2: Robots.txt for Marketing Site

### Create `robots.txt`

```
User-agent: *
Allow: /

# Block admin areas (if any)
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /dashboard/

# Sitemap location
Sitemap: https://www.elevateforhumanity.org/sitemap.xml
```

**Upload to Durablesites.co**:
1. Create file named `robots.txt`
2. Upload to root directory
3. Verify: https://www.elevateforhumanity.org/robots.txt

---

## Part 3: Google Search Console Setup

### Already Verified! ✅

Your DNS records show Google verification is complete:
```
TXT @ google-site-verification=9sXnIdE4X4AoAeRlu16JXWqNxSOIxOCAvbpakSGp3so
TXT @ google-site-verification=e05R0DWw4zbryQeir_hCg57NUx47Ul_TVJcgpsiegA4
```

### Submit Sitemap

1. Go to Google Search Console: https://search.google.com/search-console
2. Select property: **www.elevateforhumanity.org**
3. Click **Sitemaps** in left sidebar
4. Enter: `sitemap.xml`
5. Click **Submit**
6. Wait 24-48 hours for indexing

### Monitor Performance

In Google Search Console, check:
- **Performance**: Clicks, impressions, CTR
- **Coverage**: Indexed pages
- **Enhancements**: Mobile usability, Core Web Vitals
- **Links**: Backlinks to your site

---

## Part 4: Bing Webmaster Tools Setup

### Step 1: Add Site

1. Go to Bing Webmaster Tools: https://www.bing.com/webmasters
2. Sign in with Microsoft account
3. Click **Add a site**
4. Enter: `https://www.elevateforhumanity.org`

### Step 2: Verify Ownership

**Option A: Meta Tag (Recommended)**

1. Bing will provide a meta tag:
   ```html
   <meta name="msvalidate.01" content="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />
   ```

2. In Durablesites.co:
   - Go to Settings → SEO or Header Code
   - Add the meta tag to `<head>` section
   - Save changes

3. Return to Bing and click **Verify**

**Option B: XML File**

1. Download verification file from Bing
2. Upload to root directory in Durablesites.co
3. Click **Verify**

### Step 3: Submit Sitemap

1. In Bing Webmaster Tools
2. Go to **Sitemaps**
3. Submit: `https://www.elevateforhumanity.org/sitemap.xml`
4. Click **Submit**

---

## Part 5: Google Analytics for Marketing Site

### Step 1: Create GA Property

1. Go to Google Analytics: https://analytics.google.com/
2. Create account: **Elevate for Humanity**
3. Create property: **Marketing Site**
4. Get Measurement ID: `G-XXXXXXXXXX`

### Step 2: Add to Durablesites.co

1. Log in to Durablesites.co
2. Go to Settings → Analytics or Integrations
3. Look for "Google Analytics" field
4. Paste your Measurement ID: `G-XXXXXXXXXX`
5. Save changes

**Or add manually**:

If Durablesites.co has a "Custom Code" or "Header Code" section:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Step 3: Verify Tracking

1. Visit your site: www.elevateforhumanity.org
2. Open Google Analytics
3. Go to **Realtime** report
4. You should see yourself as an active user ✅

---

## Part 6: Meta Tags & SEO

### Essential Meta Tags

Add these to your marketing site's `<head>` section:

```html
<!-- Primary Meta Tags -->
<title>Elevate for Humanity | Workforce Training & Career Development</title>
<meta name="title" content="Elevate for Humanity | Workforce Training & Career Development">
<meta name="description" content="Career & Technical training that elevates communities. FREE workforce development programs through WIOA funding in Indianapolis, Indiana.">
<meta name="keywords" content="workforce training, career development, WIOA, job training, technical education, Indianapolis, Indiana">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.elevateforhumanity.org/">
<meta property="og:title" content="Elevate for Humanity | Workforce Training & Career Development">
<meta property="og:description" content="Career & Technical training that elevates communities. FREE workforce development programs through WIOA funding.">
<meta property="og:image" content="https://www.elevateforhumanity.org/images/og-image.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://www.elevateforhumanity.org/">
<meta property="twitter:title" content="Elevate for Humanity | Workforce Training & Career Development">
<meta property="twitter:description" content="Career & Technical training that elevates communities. FREE workforce development programs through WIOA funding.">
<meta property="twitter:image" content="https://www.elevateforhumanity.org/images/twitter-image.jpg">

<!-- Verification -->
<meta name="google-site-verification" content="9sXnIdE4X4AoAeRlu16JXWqNxSOIxOCAvbpakSGp3so">
<meta name="msvalidate.01" content="YOUR_BING_CODE_HERE">
```

### How to Add in Durablesites.co

1. Log in to Durablesites.co
2. Go to Settings → SEO or Page Settings
3. Look for fields like:
   - Page Title
   - Meta Description
   - Custom Header Code
4. Fill in the information
5. Save changes

---

## Part 7: Structured Data (Schema.org)

### Add Organization Schema

Add this JSON-LD to your homepage:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Elevate for Humanity",
  "url": "https://www.elevateforhumanity.org",
  "logo": "https://www.elevateforhumanity.org/images/logo.png",
  "description": "Career & Technical training that elevates communities. FREE workforce development programs through WIOA funding.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Indianapolis",
    "addressRegion": "IN",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "info@elevateforhumanity.org"
  },
  "sameAs": [
    "https://www.facebook.com/elevateforhumanity",
    "https://www.linkedin.com/company/elevateforhumanity",
    "https://twitter.com/elevate4humanity"
  ]
}
</script>
```

**Where to add**:
- Durablesites.co → Settings → Custom Code (Footer)
- Or in page-specific settings

### Test Structured Data

1. Go to: https://search.google.com/test/rich-results
2. Enter: `https://www.elevateforhumanity.org`
3. Click **Test URL**
4. Verify schema is detected ✅

---

## Part 8: Create Social Media Images

### Open Graph Image (Facebook, LinkedIn)

**Dimensions**: 1200 x 630 pixels

**Content**:
- Elevate for Humanity logo
- Tagline: "Career & Technical Training"
- Background: Brand colors (#2563EB blue)
- Call to action: "Free Workforce Development Programs"

**Tools**:
- Canva: https://www.canva.com/
- Figma: https://www.figma.com/
- Adobe Express: https://www.adobe.com/express/

**Save as**: `og-image.jpg`

### Twitter Image

**Dimensions**: 1200 x 600 pixels

**Content**: Same as Open Graph but different aspect ratio

**Save as**: `twitter-image.jpg`

### Upload to Durablesites.co

1. Upload images to your site
2. Update meta tags with image URLs:
   ```html
   <meta property="og:image" content="https://www.elevateforhumanity.org/images/og-image.jpg">
   <meta property="twitter:image" content="https://www.elevateforhumanity.org/images/twitter-image.jpg">
   ```

---

## Part 9: Link Marketing Site to LMS

### Add CTA Buttons

On your marketing site, add clear calls-to-action:

**Homepage**:
```html
<a href="https://www.elevateconnectsdirectory.org/signup" class="btn-primary">
  Enroll Now
</a>

<a href="https://www.elevateconnectsdirectory.org/login" class="btn-secondary">
  Student Login
</a>
```

**Programs Page**:
```html
<a href="https://www.elevateconnectsdirectory.org/programs/workforce-readiness">
  View Course Details
</a>
```

**Navigation Menu**:
```
- Home
- About
- Programs
- Contact
- Student Portal → https://www.elevateconnectsdirectory.org/login
```

---

## Part 10: SEO Best Practices

### Content Optimization

1. **Title Tags**: 50-60 characters, include keywords
2. **Meta Descriptions**: 150-160 characters, compelling CTA
3. **Headings**: Use H1, H2, H3 hierarchy
4. **Alt Text**: Describe all images
5. **Internal Links**: Link related pages
6. **Mobile-Friendly**: Responsive design
7. **Page Speed**: Optimize images, minimize code

### Keywords to Target

**Primary Keywords**:
- Workforce training Indianapolis
- Career development programs Indiana
- WIOA training programs
- Free job training Indianapolis
- Technical education Marion County

**Long-tail Keywords**:
- Free HVAC training Indianapolis
- CNA certification programs Indiana
- Barber school Indianapolis WIOA
- Workforce readiness training near me

### Content Ideas

1. **Blog Posts**:
   - "How to Apply for WIOA Funding"
   - "Top 5 In-Demand Careers in Indianapolis"
   - "Success Stories: Our Graduates"

2. **Program Pages**:
   - Detailed course descriptions
   - Career outcomes
   - Enrollment requirements
   - FAQs

3. **Resources**:
   - Downloadable guides
   - Video testimonials
   - Program brochures

---

## Part 11: Checklist

### Immediate Setup (30 minutes)

- [ ] Check if sitemap exists: www.elevateforhumanity.org/sitemap.xml
- [ ] If not, create and upload sitemap.xml
- [ ] Create and upload robots.txt
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Bing Webmaster Tools
- [ ] Get Bing verification code
- [ ] Add Bing verification to site
- [ ] Submit sitemap to Bing
- [ ] Create Google Analytics property
- [ ] Add GA tracking code to site
- [ ] Verify GA is tracking

### Content Optimization (1-2 hours)

- [ ] Add meta tags to all pages
- [ ] Add structured data (Schema.org)
- [ ] Create Open Graph image
- [ ] Create Twitter image
- [ ] Upload social images
- [ ] Add alt text to all images
- [ ] Optimize page titles
- [ ] Write compelling meta descriptions
- [ ] Add internal links between pages

### Ongoing Maintenance

- [ ] Monitor Google Search Console weekly
- [ ] Review Google Analytics monthly
- [ ] Update sitemap when adding pages
- [ ] Create new blog content monthly
- [ ] Check for broken links quarterly
- [ ] Update meta descriptions seasonally
- [ ] Review keyword rankings monthly

---

## Part 12: Testing After Setup

### Test These URLs

- ✅ https://www.elevateforhumanity.org/sitemap.xml
- ✅ https://www.elevateforhumanity.org/robots.txt
- ✅ https://www.elevateforhumanity.org/ (homepage loads)

### Use These Tools

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **PageSpeed Insights**: https://pagespeed.web.dev/
3. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
4. **SSL Test**: https://www.ssllabs.com/ssltest/
5. **Meta Tags Checker**: https://metatags.io/

---

## Summary

### What You Need to Do on Durablesites.co

1. **Check/Create Sitemap** (5 min)
2. **Create robots.txt** (2 min)
3. **Add Bing verification** (5 min)
4. **Add Google Analytics** (5 min)
5. **Add meta tags** (15 min)
6. **Add structured data** (10 min)
7. **Create social images** (30 min)
8. **Submit sitemaps** (5 min)

**Total Time**: ~1.5 hours

### What's Already Done

- ✅ Google Search Console verified (DNS records)
- ✅ Domain configured correctly
- ✅ SSL certificate active

### Support

If you need help accessing Durablesites.co settings:
1. Contact Durable Technologies support
2. Ask for: "How to add custom code to header"
3. Ask for: "How to upload files to root directory"
4. Ask for: "How to add Google Analytics"

---

**Status**: Ready to implement on marketing site
**Priority**: High - Important for lead generation
**Estimated Time**: 1.5 hours total
