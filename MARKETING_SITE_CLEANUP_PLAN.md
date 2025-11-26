# 🎯 MARKETING SITE CLEANUP PLAN

**Focus:** www.elevateforhumanity.org ONLY (no LMS yet)
**Goal:** Clean, bright, professional marketing site
**Time:** 1-2 days of focused work

---

## 📄 CORE PAGES (8 Total)

These are the ONLY pages we care about right now:

1. `/` - Homepage
2. `/programs` - All programs listing
3. `/programs/ma-101` - Medical Assistant detail
4. `/programs/cna` - CNA detail
5. `/programs/hvac` - HVAC detail
6. `/programs/cdl` - CDL detail
7. `/funding` - Funding & support
8. `/student-portal` - Student portal landing
9. `/staff-portal` - Staff/program holder landing
10. `/about` - About Elevate
11. `/contact` - Contact page

**You already have finished code for ALL of these in this conversation.**

---

## 🚀 STEP-BY-STEP IMPLEMENTATION

### STEP 1: Update Homepage FIRST (This Changes Everything)

**File:** `app/page.tsx`

**What to do:**
1. Open `app/page.tsx`
2. Find the `<main>...</main>` section
3. Replace ENTIRE main content with the HomePage code from this conversation
4. Keep your existing header/footer
5. Save and test

**What you'll get:**
- Clear headline: "Workforce Training. Real Careers. Real Support."
- Hero image (bright, not dark)
- "Who We Serve" 3 cards
- "Featured Programs" 6 cards
- "How Funding Works" 3 steps
- Success Stories
- Final CTA

**Result:** Homepage looks like a real modern training platform

---

### STEP 2: Fix Navigation (Make Everything Reachable)

**File:** `components/layout/MainNav.tsx` (or wherever your nav is)

**Update your nav to have these links:**

```tsx
<nav className="flex items-center gap-4 text-sm font-medium">
  <Link href="/">Home</Link>
  <Link href="/programs">Programs</Link>
  <Link href="/funding">Funding</Link>
  <Link href="/student-portal">Student Portal</Link>
  <Link href="/staff-portal">Staff & Program Holders</Link>
  <Link href="/about">About</Link>
  <Link href="/contact">Contact</Link>
</nav>
```

**Result:** Your site feels like a real site, not a shell

---

### STEP 3: Drop in Main Pages (One by One)

**Create these files and paste the code from this conversation:**

#### Programs Listing
**File:** `app/programs/page.tsx`
**Code:** Use the Programs listing code from conversation
**What it shows:** 6 program cards with images, tags, descriptions

#### Individual Program Pages
**Files:**
- `app/programs/ma-101/page.tsx`
- `app/programs/cna/page.tsx`
- `app/programs/hvac/page.tsx`
- `app/programs/cdl/page.tsx`

**Code:** Use the individual program page code from conversation
**What they show:** Who it's for, what you learn, funding, outcomes

#### Funding Page
**File:** `app/funding/page.tsx`
**Code:** Use the Funding page code from conversation
**What it shows:** WIOA, WRG, JRI, Apprenticeship explained

#### Portal Landing Pages
**Files:**
- `app/student-portal/page.tsx`
- `app/staff-portal/page.tsx`

**Code:** Use the portal landing code from conversation
**What they show:** What the portals do, login buttons

#### About & Contact
**Files:**
- `app/about/page.tsx`
- `app/contact/page.tsx`

**Code:** Use the About and Contact code from conversation
**What they show:** Mission, credentials, contact form

---

### STEP 4: Organize Your Images

**Location:** `public/images/`

**Homepage Images (14 files):**
```
home-hero.jpg
who-adults.jpg
who-families.jpg
who-reentry.jpg
program-healthcare.jpg
program-trades.jpg
program-beauty.jpg
program-cdl.jpg
program-business.jpg
program-reentry.jpg
success-1.jpg
success-2.jpg
success-3.jpg
funding-main.jpg
```

**Program Images (10 files):**
```
program-ma101.jpg
program-cna.jpg
program-hvac.jpg
program-cdl-detail.jpg
program-barber.jpg
program-reentry-detail.jpg
ma101-hero.jpg
cna-hero.jpg
hvac-hero.jpg
cdl-hero.jpg
```

**Other Images (4 files):**
```
student-portal.jpg
staff-portal.jpg
about-hero.jpg
contact-hero.jpg
```

**Total: 28 images**

**Then in your code:**
- Either use the placeholder + script setup
- Or directly set `src="/images/your-filename.jpg"` on each `<Image>`

**Result:** Real bright photos = instant upgrade

---

### STEP 5: Make It Bright (Not Dark & Heavy)

**File:** `app/layout.tsx` or `app/globals.css`

**Set main background to light:**

```tsx
// In layout.tsx
<body className="bg-white text-slate-900">
  {children}
</body>
```

**Color usage:**
- **Orange** → Primary CTA buttons (`bg-orange-500`)
- **Blue** → Tags, accents, links (`bg-blue-600`)
- **White/Light Gray** → Backgrounds (`bg-white`, `bg-slate-50`)

**Avoid:**
- Dark blue full backgrounds
- Heavy gradients
- Dark corporate look

**Result:** Site looks bright, modern, approachable

---

## ✅ "IS MY WEBSITE OK NOW?" CHECKLIST

### On Mobile
- [ ] Can scroll homepage without huge weird gaps
- [ ] Can read every button text clearly
- [ ] Hero image looks clean, not stretched
- [ ] Navigation works (hamburger menu)
- [ ] All pages load correctly

### On Desktop
- [ ] Homepage hero clearly tells what you do in 3 seconds
- [ ] Can click "Programs" and see clean list
- [ ] Can click into a program and see details
- [ ] "Funding" explains how funding works
- [ ] About + Contact feel real and not empty
- [ ] Navigation is clear and works

### Visual Quality
- [ ] No dark, heavy sections
- [ ] Bright, clean design
- [ ] Real photos (not placeholders)
- [ ] Consistent spacing
- [ ] Readable text (good contrast)
- [ ] Professional appearance

**If most checkboxes are ✅, your website is in good shape.**

---

## 🎯 PRIORITY ORDER

### Day 1 Morning
1. ✅ Update homepage (`app/page.tsx`)
2. ✅ Fix navigation links
3. ✅ Test homepage on mobile and desktop

### Day 1 Afternoon
4. ✅ Create programs listing page
5. ✅ Create 4 program detail pages
6. ✅ Test all program pages

### Day 2 Morning
7. ✅ Create funding page
8. ✅ Create portal landing pages
9. ✅ Test all new pages

### Day 2 Afternoon
10. ✅ Create about and contact pages
11. ✅ Add all images
12. ✅ Final QA check

**Total Time: 1-2 days**

---

## 🚨 COMMON ISSUES & FIXES

### Issue: Images not loading
**Fix:** Check file paths and names match exactly
```tsx
// Make sure this matches your actual file
<Image src="/images/home-hero.jpg" ... />
```

### Issue: Dark sections still showing
**Fix:** Check for dark background classes
```tsx
// Change this:
<section className="bg-slate-900">

// To this:
<section className="bg-white">
```

### Issue: Huge gaps between sections
**Fix:** Use consistent spacing
```tsx
// Use these spacing classes:
py-10 md:py-14  // For sections
gap-6           // For grids
space-y-4       // For vertical stacks
```

### Issue: Text hard to read
**Fix:** Check color contrast
```tsx
// Good contrast:
<p className="text-slate-900">  // Dark text on light bg
<p className="text-white">      // White text on dark bg

// Bad contrast:
<p className="text-slate-400">  // Light text on light bg
```

---

## 📊 BEFORE vs AFTER

### Before
- ❌ Dark, corporate look
- ❌ Unclear what you do
- ❌ Missing program details
- ❌ No funding information
- ❌ Incomplete pages
- ❌ Placeholder images
- ❌ Inconsistent design

### After
- ✅ Bright, modern design
- ✅ Clear value proposition
- ✅ Complete program pages
- ✅ Funding clearly explained
- ✅ All pages complete
- ✅ Real professional images
- ✅ Consistent, clean design

---

## 🎯 SUCCESS CRITERIA

Your marketing site is "done" when:

1. ✅ Homepage clearly explains what you do
2. ✅ All 11 pages exist and work
3. ✅ Navigation makes sense
4. ✅ Images are real and professional
5. ✅ Design is bright and clean
6. ✅ Mobile works perfectly
7. ✅ No placeholder text visible
8. ✅ Ready to show funders/partners

---

## 📞 NEXT STEPS AFTER CLEANUP

### Once Marketing Site is Clean
1. Add compliance statements (Week 1)
2. Obtain required logos (Week 1)
3. Professional photography (Week 2-3)
4. Deploy to production
5. Share with partners

### Then Later (Not Now)
- LMS pages
- Course builder
- Assignment system
- Quiz builder
- Discussion forums

**Focus:** Get marketing site perfect FIRST, then worry about LMS.

---

## 💡 QUICK WINS

### If You Only Have 2 Hours
1. Update homepage
2. Fix navigation
3. Add real images to homepage

**Result:** Homepage looks 10x better

### If You Have 1 Day
1. Update homepage
2. Fix navigation
3. Create programs listing
4. Create 2-3 program detail pages
5. Add images

**Result:** Core site looks professional

### If You Have 2 Days
1. All of the above
2. Plus funding page
3. Plus portal landings
4. Plus about/contact
5. Full QA

**Result:** Complete marketing site ready to launch

---

## 🎉 YOU'RE DONE WHEN...

✅ Homepage looks like Coursera/LearnWorlds
✅ Programs are clearly explained
✅ Funding is easy to understand
✅ Navigation makes sense
✅ Design is bright and clean
✅ Mobile works perfectly
✅ Ready to show anyone

**Then you can move on to LMS, compliance, and advanced features.**

---

**Focus:** Marketing site ONLY
**Timeline:** 1-2 days
**Result:** Professional, clean website

**Let's get www.elevateforhumanity.org looking great! 🚀**
