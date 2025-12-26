# SEO QUICK ACTIONS - DO THESE NOW

## Platform: Next.js 15 + Vercel + Supabase

---

## ✅ COMPLETED (Just Now)

1. **SEO Master Plan** - 10-phase strategy documented
2. **URL Canonicalization Plan** - Duplicate elimination strategy
3. **robots.txt** - Optimized for search engines
4. **Vercel Redirects** - WWW → non-WWW, trailing slash removal
5. **Documentation** - Complete SEO foundation documented

---

## 🎯 DO THESE NEXT (In Order)

### Week 1: Analytics & Search Console (CRITICAL)

**1. Google Analytics 4 (30 minutes)**

```
1. Go to: https://analytics.google.com
2. Create property: "Elevate for Humanity"
3. Get Measurement ID (G-XXXXXXXXXX)
4. Add to Vercel environment variables:
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
5. Install tracking code (see SEO_MASTER_PLAN.md Phase 6)
```

**2. Google Search Console (15 minutes)**

```
1. Go to: https://search.google.com/search-console
2. Add property: elevateforhumanity.org
3. Verify via DNS TXT record or HTML file
4. Submit sitemaps:
   - https://elevateforhumanity.org/sitemap.xml
   - https://elevateforhumanity.org/sitemap-pages.xml
   - https://elevateforhumanity.org/sitemap-programs.xml
   - https://elevateforhumanity.org/sitemap-blog.xml
5. Set preferred domain: non-www
```

**3. Bing Webmaster Tools (15 minutes)**

```
1. Go to: https://www.bing.com/webmasters
2. Add site: elevateforhumanity.org
3. Verify via XML file or meta tag
4. Submit same sitemaps as Google
5. Import data from Google Search Console (optional)
```

---

### Week 2: Schema & Meta Optimization

**4. Implement Schema.org Structured Data**

- Organization schema (global)
- Course schema (program pages)
- Article schema (blog posts)
- FAQPage schema (program pages)
- BreadcrumbList (all pages)

See: SEO_MASTER_PLAN.md Phase 5

**5. Optimize All Meta Tags**

- Verify every page has unique title
- Verify every page has unique description
- Ensure no truncation (titles <60 chars, descriptions <160 chars)
- Add Open Graph images

See: SEO_MASTER_PLAN.md Phase 2

---

### Week 3: Content & Internal Linking

**6. Create Cornerstone Content**

- "Complete Guide to Workforce Development in Indiana"
- "How to Choose the Right Career Training Program"
- "Complete Guide to Free Job Training Funding"

See: SEO_MASTER_PLAN.md Phase 8

**7. Internal Linking Audit**

- Scan all internal links
- Fix any non-canonical URLs
- Add keyword-rich anchor text
- Link blog posts to programs

See: SEO_URL_CANONICALIZATION.md Step 6

---

### Week 4: Local SEO & Monitoring

**8. Google Business Profile**

- Create/claim listing
- Add all locations
- Post weekly updates
- Collect reviews

**9. Set Up Monitoring**

- Weekly Search Console checks
- Monthly keyword ranking tracking
- Core Web Vitals monitoring
- Competitor analysis

---

## 🚨 CRITICAL ISSUES TO FIX IMMEDIATELY

### 1. Canonical Tags (High Priority)

**Problem:** Some pages may be missing canonical tags  
**Fix:** Verify every page has `<link rel="canonical">`  
**File:** Check all page.tsx files in app/ directory

### 2. Parameter Handling (High Priority)

**Problem:** UTM parameters may create duplicate content  
**Fix:** Canonical tags must strip parameters  
**File:** Update metadata generation in page.tsx files

### 3. Internal Links (Medium Priority)

**Problem:** Some links may have trailing slashes or uppercase  
**Fix:** Audit and fix all internal links  
**Command:**

```bash
grep -r "href=" app/ components/ --include="*.tsx" | \
  grep -E "(href=\"/[^\"]*/$|href=\"/[^\"]*[A-Z])"
```

---

## 📊 VERIFICATION CHECKLIST

After completing Week 1 actions:

### Google Search Console:

- [ ] Property verified
- [ ] Sitemaps submitted
- [ ] No coverage errors
- [ ] No duplicate content warnings
- [ ] Preferred domain set

### Bing Webmaster Tools:

- [ ] Site verified
- [ ] Sitemaps submitted
- [ ] No errors reported

### Analytics:

- [ ] GA4 tracking working
- [ ] Events firing correctly
- [ ] Conversions tracked

### Technical:

- [ ] All redirects working (test with curl)
- [ ] Canonical tags on every page
- [ ] No duplicate URLs in sitemap
- [ ] robots.txt accessible

---

## 🎯 WEEKLY SEO ACTION (Do Every Week)

**Monday Morning Routine:**

1. Check Google Search Console for errors
2. Review last week's traffic and rankings
3. Identify one high-impact SEO action
4. Execute that action
5. Document results

**Example Actions:**

- Fix one technical issue
- Optimize one underperforming page
- Create one piece of cornerstone content
- Build one quality backlink
- Improve one conversion path

---

## 📈 SUCCESS METRICS (Track These)

### Month 1:

- [ ] Google Search Console verified
- [ ] 100% of pages indexed
- [ ] 0 critical errors
- [ ] Baseline traffic established

### Month 2:

- [ ] 10% increase in organic traffic
- [ ] 5 target keywords ranking
- [ ] Core Web Vitals all green
- [ ] 3 cornerstone pages published

### Month 3:

- [ ] 25% increase in organic traffic
- [ ] 10 target keywords ranking
- [ ] 5 quality backlinks earned
- [ ] Local SEO optimized

### Month 6:

- [ ] 100% increase in organic traffic
- [ ] 20+ keywords ranking
- [ ] Authority domain status
- [ ] Consistent lead generation

---

## 🔧 TOOLS YOU NEED

### Free Tools:

- Google Search Console (required)
- Google Analytics 4 (required)
- Bing Webmaster Tools (required)
- Google PageSpeed Insights
- Google Rich Results Test
- Screaming Frog (free up to 500 URLs)

### Paid Tools (Optional):

- Ahrefs or SEMrush (keyword research)
- Moz (domain authority tracking)
- Surfer SEO (content optimization)

---

## 📚 DOCUMENTATION REFERENCE

**For detailed instructions, see:**

1. **SEO_MASTER_PLAN.md** - Complete 10-phase strategy
2. **SEO_URL_CANONICALIZATION.md** - Duplicate URL elimination
3. **PRODUCTION_SETUP.md** - API configuration
4. **QUICK_START.md** - 35-minute production setup

---

## 🚀 BOTTOM LINE

**What's Done:**

- ✅ SEO foundation documented
- ✅ URL canonicalization configured
- ✅ Redirects implemented
- ✅ robots.txt optimized

**What You Need To Do:**

1. Install Google Analytics 4 (30 min)
2. Verify Google Search Console (15 min)
3. Set up Bing Webmaster Tools (15 min)
4. Submit sitemaps (5 min)

**Total Time:** 65 minutes to complete Week 1

**Then:** Follow the weekly plan in SEO_MASTER_PLAN.md

---

**Status:** FOUNDATION COMPLETE | READY FOR ANALYTICS  
**Next Action:** Install GA4 and verify Search Console  
**Timeline:** Week 1 actions = 65 minutes

**This is how you build #1 rankings. One systematic step at a time.**
