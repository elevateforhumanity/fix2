# 🎯 PROGRAM PAGE IMPLEMENTATION GUIDE
## Gold Standard Template for All Programs

---

## ✅ COMPLETED GOLD STANDARD PAGES

1. **Barber Apprenticeship** - `app/programs/barber-apprenticeship/page.tsx`
2. **Medical Assistant** - `app/programs/medical-assistant/page.tsx`
3. **HVAC Technician** - `app/programs/hvac-technician/page.tsx`
4. **Building Maintenance** - `app/programs/building-maintenance/page.tsx`

---

## 📋 REQUIRED NEXT STEPS

### Immediate Priority (Build These Next)

1. **CDL / Commercial Driver Training**
   - File: `app/programs/cdl/page.tsx`
   - Focus: DOT certification, Class A/B licenses, employer partnerships
   - Duration: 4-8 weeks
   - Funding: WRG, WIOA, employer sponsorship

2. **Workforce Readiness / Digital Skills**
   - File: `app/programs/workforce-readiness/page.tsx`
   - Focus: Re-entry, soft skills, digital literacy, job search
   - Duration: 4-12 weeks
   - Funding: Support services, community partners

3. **Truck Driving / CDL-A**
   - File: `app/programs/truck-driving/page.tsx`
   - Focus: Long-haul, regional driving, CDL-A certification
   - Duration: 4-6 weeks
   - Funding: Employer tuition reimbursement, WIOA

---

## 🏗️ TEMPLATE STRUCTURE (MANDATORY FOR ALL PROGRAMS)

### Section 1: Hero
```tsx
<section className="border-b border-slate-100 bg-white">
  <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:items-center md:py-16">
    {/* Left: Program intro */}
    {/* Right: Snapshot card (dark bg) */}
  </div>
</section>
```

**Required Elements:**
- Program category badge (uppercase, tracking-[0.2em])
- H1 title (text-3xl sm:text-4xl)
- Description paragraph
- Two CTAs: Apply + Contact
- Snapshot card with program details

### Section 2: What You'll Learn + Who It Serves
```tsx
<section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
  <div className="grid gap-10 md:grid-cols-2 md:gap-12">
    {/* Left: What you'll learn */}
    {/* Right: Who this program is for */}
  </div>
</section>
```

**Required Elements:**
- Bullet lists with colored dots
- Orange dots (bg-orange-500) for highlights
- Slate dots (bg-slate-700) for audience

### Section 3: Curriculum Overview
```tsx
<section className="border-y border-slate-100 bg-white">
  <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
    <div className="grid gap-10 md:grid-cols-[1.2fr,1fr] md:gap-12">
      {/* Left: Curriculum list */}
      {/* Right: Dark info card */}
    </div>
  </div>
</section>
```

**Required Elements:**
- 6+ curriculum items with indigo dots (bg-indigo-500)
- Dark card (bg-slate-900/95) with expectations

### Section 4: Funding & Case Management
```tsx
<section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
  <div className="grid gap-10 md:grid-cols-[1.3fr,1fr] md:gap-12">
    {/* Left: Funding options */}
    {/* Right: Case manager info card */}
  </div>
</section>
```

**Required Elements:**
- Funding list with emerald dots (bg-emerald-500)
- White card for case managers with documentation list

### Section 5: Outcomes
```tsx
<section className="border-y border-slate-100 bg-slate-900/95">
  <div className="mx-auto max-w-6xl px-4 py-10 text-slate-50 md:py-14">
    <div className="grid gap-10 md:grid-cols-[1.1fr,1fr] md:items-center md:gap-12">
      {/* Left: Outcomes list */}
      {/* Right: Next steps card */}
    </div>
  </div>
</section>
```

**Required Elements:**
- Dark background (bg-slate-900/95)
- Outcomes with orange dots (bg-orange-400)
- Dark card with career pathway info

### Section 6: FAQ
```tsx
<section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
  <h2 className="text-lg font-semibold text-slate-900">
    Frequently asked questions
  </h2>
  <div className="mt-4 space-y-4">
    {/* FAQ cards */}
  </div>
</section>
```

**Required Elements:**
- 4-6 Q&A pairs minimum
- White cards with rounded-2xl borders

### Section 7: Final CTA
```tsx
<section className="border-t border-slate-100 bg-slate-900">
  <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
    {/* Heading + description */}
    {/* Two CTAs: Apply + View All Programs */}
  </div>
</section>
```

**Required Elements:**
- Dark background
- Two CTAs with proper links
- Small text for case managers

---

## 🎨 STYLING RULES (NON-NEGOTIABLE)

### Colors
- **Light sections:** `bg-white` or `bg-slate-50`
- **Dark sections:** `bg-slate-900` or `bg-slate-900/95`
- **Primary CTA:** `bg-orange-500 hover:bg-orange-600`
- **Borders:** `border-slate-100` or `border-slate-700` (dark)

### Spacing
- **Container:** `max-w-6xl mx-auto px-4`
- **Section padding:** `py-10 md:py-14`
- **Grid gaps:** `gap-10 md:gap-12`

### Typography
- **H1:** `text-3xl sm:text-4xl font-semibold`
- **H2:** `text-lg font-semibold`
- **Body:** `text-sm md:text-base`
- **Small text:** `text-xs`

### Cards
- **Rounded:** `rounded-2xl`
- **Borders:** `border border-slate-100`
- **Shadows:** `shadow-sm` or `shadow-lg` (hero)
- **Dark cards:** `bg-slate-900 text-slate-50`

---

## 📝 METADATA TEMPLATE

```tsx
export const metadata = {
  title: "PROGRAM NAME | Elevate for Humanity",
  description:
    "Brief description of program, who it serves, and workforce outcomes.",
};
```

---

## 🔗 CTA BUTTON TEMPLATE

```tsx
<Link
  href="/apply?program=PROGRAM-SLUG"
  className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
>
  Apply for PROGRAM NAME
</Link>
```

**Important:** `PROGRAM-SLUG` must match the folder name exactly.

---

## 📊 CONTENT ARRAYS (REQUIRED FOR EACH PROGRAM)

```tsx
const HIGHLIGHTS = [
  "Highlight 1",
  "Highlight 2",
  "Highlight 3",
  "Highlight 4",
  "Highlight 5",
];

const WHO_IT_SERVES = [
  "Audience group 1",
  "Audience group 2",
  "Audience group 3",
  "Audience group 4",
];

const CURRICULUM = [
  "Curriculum item 1",
  "Curriculum item 2",
  "Curriculum item 3",
  "Curriculum item 4",
  "Curriculum item 5",
  "Curriculum item 6",
];

const FUNDING = [
  "Funding option 1",
  "Funding option 2",
  "Funding option 3",
  "Funding option 4",
  "Funding option 5",
];

const OUTCOMES = [
  "Outcome 1",
  "Outcome 2",
  "Outcome 3",
  "Outcome 4",
  "Outcome 5",
];

const FAQ = [
  {
    q: "Question 1?",
    a: "Answer 1.",
  },
  {
    q: "Question 2?",
    a: "Answer 2.",
  },
  {
    q: "Question 3?",
    a: "Answer 3.",
  },
  {
    q: "Question 4?",
    a: "Answer 4.",
  },
];
```

---

## 🚨 CRITICAL ISSUES TO FIX

### 1. Route Inconsistencies
**Problem:** Multiple program pages exist with different naming conventions.

**Current duplicates:**
- `/programs/hvac` vs `/programs/hvac-tech` vs `/programs/hvac-technician`
- `/programs/barber` vs `/programs/barber-apprenticeship`
- `/programs/building-tech` vs `/programs/building-maintenance`

**Solution:** 
1. Choose ONE canonical URL per program
2. Delete duplicate pages
3. Update all navigation links
4. Add redirects for old URLs

**Recommended canonical URLs:**
- `/programs/barber-apprenticeship` ✅
- `/programs/medical-assistant` ✅
- `/programs/hvac-technician` ✅
- `/programs/building-maintenance` ✅
- `/programs/cdl` (new)
- `/programs/workforce-readiness` (new)
- `/programs/truck-driving` (new)

### 2. Missing Pages
- `/accessibility` - Linked in footer but doesn't exist
- `/terms` - Linked in some pages (should redirect to `/terms-of-service`)
- `/privacy` - Linked in some pages (should redirect to `/privacy-policy`)

### 3. Placeholder Links
- Mobile app badges in footer link to `#`
- Social media icons link to `#`
- Either add real URLs or remove these elements

---

## ✅ DEPLOYMENT CHECKLIST

Before deploying:
- [ ] All program pages follow gold standard template
- [ ] No duplicate program routes exist
- [ ] All navigation links updated to canonical URLs
- [ ] Missing pages created or redirects added
- [ ] Placeholder links removed or updated
- [ ] Build succeeds without errors
- [ ] All images load correctly
- [ ] All CTAs link to correct destinations

---

## 🎯 SUCCESS CRITERIA

A program page is "gold standard" when:
1. ✅ Follows exact section structure from Barber/MA/HVAC
2. ✅ Uses identical Tailwind classes and spacing
3. ✅ Has all 7 required sections
4. ✅ Includes 4-6 FAQ items
5. ✅ Has proper metadata
6. ✅ CTAs link to `/apply?program=SLUG`
7. ✅ Responsive on mobile and desktop
8. ✅ Dark/light sections alternate correctly
9. ✅ Snapshot card displays program details
10. ✅ Case manager section included

---

## 📞 NEXT ACTIONS

1. **Build remaining program pages** using this template
2. **Delete duplicate program pages**
3. **Update navigation links** to canonical URLs
4. **Create missing pages** (/accessibility)
5. **Add redirects** for old program URLs
6. **Remove placeholder links** from footer
7. **Test all routes** and CTAs
8. **Deploy to production**

---

**Last Updated:** 2024-11-19
**Template Version:** 2.0 (Gold Standard)
**Status:** Ready for implementation
