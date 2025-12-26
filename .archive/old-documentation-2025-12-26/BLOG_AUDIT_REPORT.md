# Blog Audit Report - Elevate for Humanity

## Blog Routes Inventory

### Existing Routes:

1. `/blog` - Blog index/listing page
2. `/blog/[slug]` - Individual blog post
3. `/blog/category/[category]` - Category archive
4. `/blog/author/[author]` - Author archive
5. `/blog/search` - Search results

### Status: ✅ Routes exist, ❌ Using mock data

---

## SEO Audit (Per Page)

### `/blog` (Index Page)

- ✅ Title: "Blog | Success Stories & Updates | Elevate for Humanity"
- ✅ Meta description: Present
- ❌ Canonical URL: Not set
- ❌ OG tags: Not present
- ❌ Schema markup: Not present
- ❌ Internal links: Limited (no program links)
- **Status: NEEDS WORK**

### `/blog/[slug]` (Individual Posts)

- ❓ Title: Unknown (mock data)
- ❓ Meta description: Unknown
- ❌ Canonical URL: Not set
- ❌ OG tags: Not present
- ❌ Schema markup (Article): Not present
- ❌ Internal links: Not implemented
- ❌ Share buttons: Not present
- **Status: NEEDS WORK**

### `/blog/category/[category]`

- ❓ SEO: Unknown
- **Status: NEEDS AUDIT**

### `/blog/author/[author]`

- ❓ SEO: Unknown
- **Status: NEEDS AUDIT**

---

## Content Status

### Current State:

- **Content Source:** Mock data in component
- **Real Posts:** 0
- **Mock Posts:** 6
- **CMS Integration:** None
- **Database Integration:** None

### Mock Posts:

1. "From Unemployed to HVAC Technician: Marcus's Journey"
2. "New Partnership with Indiana Career Connect"
3. "Understanding WIOA Funding: A Complete Guide"
4. "Meet Sarah: CNA to Nursing School"
5. (2 more mock posts)

---

## Missing Features

### Critical (P0):

- ❌ **RSS Feed** - No `/blog/rss.xml` or `/feed.xml`
- ❌ **Sitemap entries** - Blog posts not in sitemap
- ❌ **Real content** - Using mock data
- ❌ **Schema markup** - No Article schema
- ❌ **OG tags** - No social sharing metadata
- ❌ **Canonical URLs** - Not set

### Important (P1):

- ❌ **Share buttons** - No social sharing
- ❌ **Internal links** - No links to programs/enrollment
- ❌ **Related posts** - No recommendations
- ❌ **Author pages** - Exist but not populated
- ❌ **Category pages** - Exist but not populated
- ❌ **Search functionality** - Exists but needs testing

### Nice to Have (P2):

- ❌ **Comments** - No comment system
- ❌ **Newsletter signup** - No email capture
- ❌ **Reading time** - Not displayed
- ❌ **Table of contents** - Not present
- ❌ **Print styles** - Not optimized

---

## Social Media Integration

### Current State:

- ❌ No share buttons on blog posts
- ❌ No social follow CTAs
- ❌ No click tracking
- ❌ Twitter/X still referenced in code

### Required:

- ✅ Facebook share button
- ✅ LinkedIn share button
- ✅ Copy link button
- ✅ Email share button
- ❌ YouTube subscribe CTA
- ❌ Instagram follow CTA
- ❌ Remove Twitter/X completely

---

## Internal Linking Audit

### Current State:

Blog posts do NOT link to:

- Programs pages
- Enrollment/application pages
- Contact/inquiry pages
- Other blog posts (related)

### Required:

Each blog post should link to 2-5 relevant pages:

- Related program (e.g., HVAC post → HVAC program page)
- Application page
- Contact page
- Related blog posts
- Category/tag pages

---

## Discoverability Issues

### Search Engines:

- ❌ Blog posts not in sitemap
- ❌ No RSS feed for syndication
- ❌ Missing schema markup
- ❌ No canonical URLs
- ❌ Limited internal linking

### Social Media:

- ❌ No OG tags (Facebook/LinkedIn preview broken)
- ❌ No Twitter cards (but removing Twitter anyway)
- ❌ No share buttons
- ❌ No social follow CTAs

### Internal:

- ❌ Blog not prominently linked from homepage
- ❌ No blog widget in sidebar/footer
- ❌ No "Latest Posts" section on other pages

---

## Content Strategy Gaps

### Missing Content Types:

1. **Program Spotlights** - Detailed program overviews
2. **Success Stories** - Student testimonials (have 2 mock)
3. **Funding Guides** - WIOA, WRG, JRI explainers (have 1 mock)
4. **Career Pathways** - Industry insights
5. **Partner Highlights** - Employer/provider features
6. **Tax Tips** - VITA program content
7. **How-To Guides** - Enrollment, application process
8. **News/Updates** - Partnership announcements (have 1 mock)

### Recommended 30-Day Content Calendar:

- **Week 1:** Program spotlights (Barber, HVAC, CNA, CDL)
- **Week 2:** Success stories (4 student testimonials)
- **Week 3:** Funding guides (WIOA, WRG, JRI, OJT)
- **Week 4:** Career pathways (Healthcare, Trades, Beauty)
- **Ongoing:** Tax tips (weekly during tax season)

---

## Technical Issues

### Performance:

- ✅ Using Next.js Image component
- ✅ Static generation possible
- ❓ Image optimization needs verification

### Mobile:

- ❓ Responsive design needs testing
- ❓ Touch targets need verification
- ❓ Reading experience needs optimization

### Accessibility:

- ❓ Heading hierarchy needs audit
- ❓ Alt text needs verification
- ❓ Color contrast needs testing
- ❓ Keyboard navigation needs testing

---

## Monetization Opportunities

### Current CTAs:

- ❌ No above-fold CTA
- ❌ No mid-article CTA
- ❌ No end-of-post CTA
- ❌ No sidebar CTAs

### Recommended CTAs:

1. **Above-fold:** "Start Enrollment" or "Request Info"
2. **Mid-article:** "Book an Appointment" or "Learn More About [Program]"
3. **End-of-post:** "Apply Now" or "Talk to an Advisor"
4. **Sidebar:** "Latest Programs" or "Success Stories"

---

## Tracking & Analytics

### Current State:

- ❓ Google Analytics integration unknown
- ❌ No social share tracking
- ❌ No CTA click tracking
- ❌ No scroll depth tracking
- ❌ No reading time tracking

### Required Events:

- `blog_post_view` - Page view
- `blog_share_click` - Share button click
- `blog_cta_click` - CTA button click
- `blog_internal_link_click` - Internal link click
- `blog_external_link_click` - External link click

---

## Priority Fixes

### Phase 1 (Immediate):

1. Add OG tags to blog posts
2. Add schema markup (Article)
3. Add canonical URLs
4. Add blog posts to sitemap
5. Remove Twitter/X references

### Phase 2 (This Week):

6. Add share buttons (FB, LinkedIn, Email, Copy)
7. Add internal links to programs/enrollment
8. Add CTAs (above-fold, mid-article, end)
9. Add social follow CTAs
10. Implement click tracking

### Phase 3 (Next Week):

11. Create RSS feed
12. Add related posts section
13. Implement real content (replace mock data)
14. Add reading time
15. Optimize mobile experience

### Phase 4 (Ongoing):

16. Create 30-day content calendar
17. Implement 3x/day posting schedule
18. Set up automated content generation
19. Configure scheduler/queue system
20. Monitor analytics and optimize

---

## Recommendations

### Content Management:

**Option A:** Use database (Supabase)

- Create `blog_posts` table
- Store posts in database
- Use admin panel for editing

**Option B:** Use MDX files

- Store posts as `.mdx` files in `/content/blog/`
- Use frontmatter for metadata
- Git-based workflow

**Option C:** Use headless CMS

- Contentful, Sanity, or Strapi
- API-based content delivery
- Non-technical editor-friendly

**Recommendation:** Option A (Database) - Already have Supabase, fits existing architecture

### Distribution:

**Option A:** Direct API posting

- Requires platform API keys
- Full automation possible
- Complex setup

**Option B:** Scheduler integration (Buffer/Later)

- Webhook/API integration
- Semi-automated
- Easier setup

**Option C:** Queue + manual approval

- Generate content automatically
- Review before posting
- Safest for compliance

**Recommendation:** Option C initially, migrate to B once proven

---

## Next Steps

1. ✅ Complete this audit
2. ⏭️ Implement Phase 1 fixes (SEO basics)
3. ⏭️ Add social integration (Phase 2)
4. ⏭️ Remove Twitter/X (Phase 6)
5. ⏭️ Set up content pipeline (Phase 4)
6. ⏭️ Create real content (replace mock data)
7. ⏭️ Launch 30-day content calendar
8. ⏭️ Monitor and optimize

---

## Success Metrics

### Launch Ready When:

- ✅ All blog posts have proper SEO (title, description, OG, schema)
- ✅ Blog posts in sitemap
- ✅ RSS feed exists
- ✅ Share buttons work (no Twitter)
- ✅ Internal links present (2-5 per post)
- ✅ CTAs present (above-fold, mid, end)
- ✅ Social follow CTAs visible
- ✅ Click tracking implemented
- ✅ At least 10 real blog posts published
- ✅ 3x/day posting schedule active

### 30-Day Goals:

- 30+ blog posts published
- 90+ social posts distributed
- 1000+ blog page views
- 100+ social shares
- 50+ CTA clicks
- 10+ enrollments from blog traffic
