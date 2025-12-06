# 🚀 AUTOPILOT QUICK REFERENCE CARD

## 📞 CONTACT INFO (Must be on every page)
- **Phone:** 317-314-3757
- **Email:** elevateforhumanity.edu@gmail.com

---

## 📊 CURRENT STATUS (532 Pages Total)

| Category | Pages | Hero Images | CTAs | Metadata | Issues |
|----------|-------|-------------|------|----------|--------|
| Marketing | 218 | 215/218 (99%) | 216/218 (99%) | 217/218 (99%) | 3 missing hero |
| Programs | 37 | 34/37 (92%) | 37/37 (100%) | 36/37 (97%) | 3 missing hero |
| LMS/Student | 87 | 84/87 (97%) | 83/87 (95%) | 86/87 (99%) | 3 missing hero |
| Admin | 116 | 46/116 (40%) | 113/116 (97%) | 116/116 (100%) | Dashboard style OK |
| Courses | 18 | 9/18 (50%) | 11/18 (61%) | 16/18 (89%) | 9 need hero |
| Portals | 61 | 61/61 (100%) | 60/61 (98%) | 61/61 (100%) | 8 broken links |
| Other | 45 | 45/45 (100%) | 43/45 (96%) | 45/45 (100%) | ✓ |

---

## ⚠️ CRITICAL ISSUES (Fix First!)

### 1. Missing Hero Images (6 pages)
- `/community`
- `/funding`
- `/team`
- `/programs`
- `/programs/[slug]`
- `/programs/barber-apprenticeship`

### 2. Broken Links (15 pages)
**Employer Portal (8 pages):**
- `/employer/*` - All 8 pages have broken links

**Other (7 pages):**
- `/admin`
- `/admin/users`
- `/onboarding/employer/*`
- `/platform/employer-portal`
- `/portal/employer`
- `/videos/employer-pipeline`

### 3. Missing Alt Text (6 pages)
- Check: `/about`, `/courses/*`, `/programs/*`

### 4. Incomplete Metadata (5 pages)
- Various pages missing title or description

### 5. Thin Content (6 pages)
- Pages with < 200 words need expansion

---

## 🎯 10 TASKS OVERVIEW

| Task | Pages | Priority | Time | Status |
|------|-------|----------|------|--------|
| 1. Marketing Pages | 50 | HIGH | 4-6h | Script ready |
| 2. Program Pages | 37 | CRITICAL | 6-8h | Manual review |
| 3. LMS Batch 1 | 50 | HIGH | 6-8h | Manual review |
| 4. LMS Batch 2 | 37 | HIGH | 4-6h | Manual review |
| 5. Admin Batch 1 | 60 | MEDIUM | 6-8h | Manual review |
| 6. Admin Batch 2 | 56 | MEDIUM | 6-8h | Manual review |
| 7. Portal Pages | 41 | MEDIUM | 4-6h | Manual review |
| 8. Courses & Delegate | 25 | MEDIUM | 3-4h | Manual review |
| 9. Auth & Specialty | 50 | LOW | 4-6h | Manual review |
| 10. Final Verification | 532 | CRITICAL | 8-10h | Manual review |

**Total Estimated Time:** 50-70 hours (10 days at 5-7 hours/day)

---

## 🛠️ QUICK COMMANDS

### Run Audits
```bash
# Initial audit
node scripts/comprehensive-audit.mjs

# Task 1 audit
node scripts/task-1-marketing-pages.mjs

# Run all tasks
./scripts/run-all-autopilot-tasks.sh
```

### Check Results
```bash
# View audit results
cat comprehensive-audit-results.json | jq '.summary'

# View specific issues
cat comprehensive-audit-results.json | jq '.issues.noHeroImage'
cat comprehensive-audit-results.json | jq '.issues.brokenLinks'
```

### Find Pages
```bash
# Find all pages
find app -name "page.tsx" | wc -l

# Find pages with TODO
grep -r "TODO" app --include="page.tsx"

# Find pages without hero
grep -rL "hero\|Hero" app --include="page.tsx" | head -20
```

---

## 📋 HERO BANNER TEMPLATE

```tsx
<section className="relative min-h-[800px] flex items-center">
  <div className="absolute inset-0">
    <Image
      src="/images/hero/page-name.jpg"
      alt="Descriptive alt text"
      fill
      className="object-cover"
      quality={85}
      priority
      sizes="100vw"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
  </div>
  <div className="relative container mx-auto px-4 py-20">
    <div className="max-w-4xl mx-auto text-center text-white">
      <h1 className="text-5xl md:text-6xl font-bold mb-6">
        Page Title
      </h1>
      <p className="text-xl md:text-2xl mb-8">
        Compelling description
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link 
          href="/apply" 
          className="bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700"
        >
          Apply Now - Free Training
        </Link>
        <Link 
          href="tel:3173143757" 
          className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100"
        >
          Call: 317-314-3757
        </Link>
      </div>
    </div>
  </div>
</section>
```

---

## 📐 IMAGE SPECIFICATIONS

### Hero Banners
- **Size:** 1920x800px to 1920x1000px
- **Format:** WebP (with JPG fallback)
- **Quality:** 85 (Next.js quality prop)
- **DPI:** 72 (web standard)
- **File Size:** < 200KB
- **Aspect Ratio:** 16:9 or 2.4:1

### Program Cards
- **Size:** 400x300px
- **Quality:** 80
- **File Size:** < 50KB

### Course Thumbnails
- **Size:** 400x225px
- **Quality:** 80
- **Aspect Ratio:** 16:9

### OG Images
- **Size:** 1200x630px
- **Quality:** 85
- **File Size:** < 100KB

---

## ✅ PAGE CHECKLIST

For each page, verify:

- [ ] Hero banner (1920x800px, quality 85)
- [ ] Primary CTA ("Apply Now" or equivalent)
- [ ] Secondary CTA ("Contact Us" or phone)
- [ ] Phone: 317-314-3757 (clickable tel: link)
- [ ] Email: elevateforhumanity.edu@gmail.com (clickable mailto:)
- [ ] Complete metadata (title, description, keywords)
- [ ] All images have alt text
- [ ] All images have quality prop
- [ ] No placeholder content (TODO, FIXME, etc.)
- [ ] All links work (no 404s)
- [ ] Minimum 300 words content
- [ ] Proper heading structure (H1, H2, H3)
- [ ] Mobile responsive
- [ ] Accessible (WCAG 2.1 AA)

---

## 🎯 SUCCESS METRICS

### Target Goals
- ✅ 100% pages with hero banners (where appropriate)
- ✅ 100% pages with CTAs
- ✅ 100% pages with complete metadata
- ✅ 0 placeholder content
- ✅ 0 broken links
- ✅ 100% images with alt text
- ✅ 100% images optimized
- ✅ 90+ Lighthouse score
- ✅ 100% mobile responsive
- ✅ 100% accessibility compliance

### Current Progress
- Hero Images: 425/532 (80%) → Target: 100%
- CTAs: 523/532 (98%) → Target: 100%
- Metadata: 527/532 (99%) → Target: 100%
- Broken Links: 15 → Target: 0
- Missing Alt Text: 6 → Target: 0

---

## 📅 TIMELINE

### Week 1 (Days 1-5)
- **Day 1:** Tasks 1-2 (87 pages)
- **Day 2:** Task 3 (50 pages)
- **Day 3:** Tasks 4-5 (97 pages)
- **Day 4:** Task 6 (56 pages)
- **Day 5:** Task 7 (41 pages)

### Week 2 (Days 6-10)
- **Day 6:** Task 8 (25 pages)
- **Day 7:** Task 9 (50 pages)
- **Day 8:** Task 10 - Sitemap & Routes
- **Day 9:** Task 10 - SEO & Performance
- **Day 10:** Task 10 - Final Report

---

## 📁 FILE LOCATIONS

### Documentation
- Main Plan: `/COMPREHENSIVE_AUTOPILOT_AUDIT_PLAN.md`
- Execution Guide: `/AUTOPILOT_EXECUTION_GUIDE.md`
- This Reference: `/AUTOPILOT_QUICK_REFERENCE.md`

### Scripts
- All Tasks: `/scripts/run-all-autopilot-tasks.sh`
- Task 1: `/scripts/task-1-marketing-pages.mjs`
- Audit: `/scripts/comprehensive-audit.mjs`

### Results
- Audit Results: `/comprehensive-audit-results.json`
- Task Reports: `/task-*-report.json`
- Page List: `/COMPLETE_PAGE_LIST.md`

### Images
- Programs: `/public/images/programs/`
- Hero Images: `/public/images/hero/`
- All Images: `/public/images/`

---

## 🚨 EMERGENCY CONTACTS

**Primary:**
- Phone: 317-314-3757
- Email: elevateforhumanity.edu@gmail.com

**Documentation:**
- `/docs` - Full documentation
- `/COMPLETE_PAGE_LIST.md` - All pages
- `/comprehensive-audit-results.json` - Audit data

---

## 💡 TIPS

1. **Start with critical issues** - Fix broken links and missing hero images first
2. **Use templates** - Copy working pages as templates
3. **Test as you go** - Run audit after each batch
4. **Commit frequently** - Save progress after each task
5. **Document changes** - Note what was fixed in each task
6. **Check mobile** - Test responsive design on all pages
7. **Verify links** - Test all internal and external links
8. **Optimize images** - Compress before uploading
9. **Add alt text** - Describe images for accessibility
10. **Review metadata** - Ensure SEO optimization

---

**Last Updated:** December 2, 2024  
**Version:** 1.0  
**Status:** Ready for Execution
