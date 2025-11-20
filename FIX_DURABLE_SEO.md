# Fix Durable Site SEO for elevateforhumanity.org

## ⚠️ Issue
The robots.txt and sitemap.xml on www.elevateforhumanity.org are pointing to **elevateforhumanity.org** instead of **elevateforhumanity.org**, preventing Google from indexing the site properly.

## 🎯 Solution
Since www.elevateforhumanity.org is hosted on Durable (durablesites.co), you need to update the SEO files directly in the Durable platform.

---

## 📋 Steps to Fix

### 1. Log in to Durable
Go to: [https://durablesites.co](https://durablesites.co)

### 2. Access SEO Settings
1. Navigate to your site dashboard
2. Look for **Settings** → **SEO** or **Advanced Settings**
3. Find the **robots.txt** and **sitemap.xml** configuration

### 3. Update robots.txt
Replace the content with:

```txt
# Robots.txt for https://elevateforhumanity.org
# Anti-scraping protection enabled

# Allow legitimate search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# Allow social media bots
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Block all other bots and scrapers
User-agent: *
Disallow: /api/
Disallow: /student/
Disallow: /employer/
Disallow: /program-holder/
Disallow: /admin/
Disallow: /_next/
Disallow: /.netlify/
Crawl-delay: 10

# Sitemap
Sitemap: https://elevateforhumanity.org/sitemap.xml
```

### 4. Update sitemap.xml
Replace the content with:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://elevateforhumanity.org/</loc>
    <lastmod>2025-11-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://elevateforhumanity.org/about</loc>
    <lastmod>2025-11-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://elevateforhumanity.org/programs</loc>
    <lastmod>2025-11-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://elevateforhumanity.org/programs/barber</loc>
    <lastmod>2025-11-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://elevateforhumanity.org/programs/building-tech</loc>
    <lastmod>2025-11-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://elevateforhumanity.org/programs/healthcare</loc>
    <lastmod>2025-11-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://elevateforhumanity.org/apply</loc>
    <lastmod>2025-11-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://elevateforhumanity.org/contact</loc>
    <lastmod>2025-11-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://elevateforhumanity.org/lms</loc>
    <lastmod>2025-11-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://elevateforhumanity.org/lms/dashboard</loc>
    <lastmod>2025-11-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://elevateforhumanity.org/lms/courses</loc>
    <lastmod>2025-11-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 5. Save Changes
Click **Save** or **Publish** to apply the changes.

---

## ✅ Verify the Fix

After updating in Durable, verify the changes:

1. Visit: [https://elevateforhumanity.org/robots.txt](https://elevateforhumanity.org/robots.txt)
2. Visit: [https://elevateforhumanity.org/sitemap.xml](https://elevateforhumanity.org/sitemap.xml)
3. Confirm both files show **elevateforhumanity.org** (not elevateforhumanity.org)

---

## 🔍 Submit to Google Search Console

After fixing the files:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property: **elevateforhumanity.org**
3. Go to **Sitemaps** in the left menu
4. Submit: `https://elevateforhumanity.org/sitemap.xml`
5. Go to **URL Inspection**
6. Request indexing for: `https://elevateforhumanity.org/`

Google should start indexing your site within 24-48 hours.

---

## 📝 Alternative: If Durable Doesn't Allow Custom robots.txt/sitemap.xml

If Durable doesn't provide direct access to edit these files:

1. **Contact Durable Support**: Ask them to update the robots.txt and sitemap.xml to use elevateforhumanity.org
2. **Use Durable's SEO Settings**: Look for built-in SEO tools that may auto-generate these files
3. **Check Durable Documentation**: Look for guides on custom SEO configuration

---

## 🎯 Key Changes Made

- Changed domain from `elevateforhumanity.org` → `elevateforhumanity.org`
- Removed `www.` prefix (using apex domain)
- Updated lastmod date to 2025-11-17
- All 11 URLs now point to correct domain
