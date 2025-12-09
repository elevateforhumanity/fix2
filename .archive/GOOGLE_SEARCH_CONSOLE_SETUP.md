# Google Search Console Setup Guide

## Current Status
✅ **Site Verification:** Already verified with Google (meta tag present)
- Verification code: `9sXnIdE4X4AoAeRlu16JXWqNxSOIxOCAvbpakSGp3so`

✅ **Sitemap:** Live and accessible
- URL: https://www.elevateforhumanity.org/sitemap.xml
- Last updated: 2025-12-01

✅ **Robots.txt:** Configured and live
- URL: https://www.elevateforhumanity.org/robots.txt

## Steps to Submit Sitemap to Google Search Console

### 1. Access Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Select property: `https://www.elevateforhumanity.org`

### 2. Submit Sitemap
1. In the left sidebar, click **Sitemaps**
2. In the "Add a new sitemap" field, enter: `sitemap.xml`
3. Click **Submit**

### 3. Verify Submission
- Status should show as "Success" within a few minutes
- Google will begin crawling your pages within 24-48 hours
- Check back in 3-7 days to see indexed pages

## What's in the Sitemap

Your sitemap includes:
- Homepage (priority: 1.0)
- All main pages (priority: 0.8)
- Program pages
- Funding pages
- Student portal pages
- About/Contact pages
- Blog posts
- Success stories

Total pages: 400+

## Monitoring & Maintenance

### Weekly Tasks
- Check Search Console for crawl errors
- Monitor indexed pages count
- Review search performance data

### Monthly Tasks
- Update sitemap if new pages added
- Check for broken links
- Review top performing pages

### After Major Updates
- Resubmit sitemap
- Request indexing for important new pages
- Check mobile usability report

## Additional SEO Setup

### Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site: `https://www.elevateforhumanity.org`
3. Verify using meta tag (already in place): `add-your-bing-verification-code-here`
   - **ACTION NEEDED:** Replace placeholder with actual Bing verification code
4. Submit sitemap: `https://www.elevateforhumanity.org/sitemap.xml`

### Google Analytics
✅ Already configured
- Tracking ID: G-SWPG2HVYVH
- Tracking all page views
- Event tracking enabled

## Current Meta Tags

✅ **Google Verification:** Configured
✅ **Open Graph:** Configured for social sharing
✅ **Twitter Cards:** Configured
✅ **Structured Data:** JSON-LD schema present
✅ **Canonical URLs:** Set on all pages
✅ **Meta Descriptions:** Present on all pages

## Performance Optimization

Current setup includes:
- Image optimization with Next.js Image component
- Lazy loading for images
- Responsive images with srcset
- Proper caching headers
- CDN delivery via Vercel

## Next Steps

1. ✅ Submit sitemap to Google Search Console (follow steps above)
2. ⚠️ Get Bing verification code and update meta tag
3. ⚠️ Submit sitemap to Bing Webmaster Tools
4. ✅ Monitor Google Analytics for traffic
5. ✅ Check Search Console weekly for issues

## Support

If you need help:
- Google Search Console Help: https://support.google.com/webmasters
- Bing Webmaster Help: https://www.bing.com/webmasters/help
- Next.js SEO Docs: https://nextjs.org/learn/seo/introduction-to-seo
