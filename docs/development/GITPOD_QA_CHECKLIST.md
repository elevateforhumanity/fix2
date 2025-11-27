# ✅ GITPOD QA CHECKLIST

Complete testing checklist for Elevate For Humanity marketing site + LMS

---

## 🚀 SETUP (First Time)

### 1. Open in Gitpod
```bash
# Your .gitpod.yml should automatically:
# 1. Install dependencies (pnpm install)
# 2. Run auto-wire-images.sh
# 3. Start dev server (pnpm dev)
```

### 2. Verify Auto-Wire Script Ran
Look for output like:
```
🖼  Auto-wiring images into your components...
✅ Mapping /images/PLACEHOLDER_HOME_HERO.jpg → /images/home-hero.jpg
   • Updating app/page.tsx
✨ Image auto-wiring complete.
```

### 3. Check Dev Server Started
```
🚀 Starting dev server...
- Local: http://localhost:3000
- Ready in XXXms
```

---

## 📄 PAGE-BY-PAGE TESTING

### ✅ Homepage (/)

**URL:** `http://localhost:3000/`

**Check:**
- [ ] Hero image loads (adult learners in training)
- [ ] "Who We Serve" 3 cards with images
- [ ] "Featured Programs" 6 cards with images
- [ ] "How Funding Works" section with image
- [ ] "Success Stories" with 3 images
- [ ] All buttons are clickable
- [ ] Text is readable (good contrast)
- [ ] Mobile responsive (resize browser)

**Expected Images:**
- Hero: `home-hero.jpg`
- Who We Serve: `who-adults.jpg`, `who-families.jpg`, `who-reentry.jpg`
- Programs: `program-healthcare.jpg`, `program-trades.jpg`, `program-beauty.jpg`, `program-cdl.jpg`, `program-business.jpg`, `program-reentry.jpg`
- Success: `success-1.jpg`, `success-2.jpg`, `success-3.jpg`
- Funding: `funding-main.jpg`

---

### ✅ Programs Listing (/programs)

**URL:** `http://localhost:3000/programs`

**Check:**
- [ ] Page title: "Programs & Career Pathways"
- [ ] 6 program cards display
- [ ] Each card has image, title, description, tag
- [ ] "View program →" links work
- [ ] Layout is clean (2-column grid on desktop)
- [ ] Mobile responsive (1 column on mobile)

**Expected Images:**
- `program-ma101.jpg`
- `program-cna.jpg`
- `program-hvac.jpg`
- `program-cdl-detail.jpg`
- `program-barber.jpg`
- `program-reentry-detail.jpg`

---

### ✅ MA-101 Program Detail (/programs/ma-101)

**URL:** `http://localhost:3000/programs/ma-101`

**Check:**
- [ ] Hero section with title and image
- [ ] Tags: "ETPL Approved", "WIOA / WRG Eligible", "High-Demand Healthcare"
- [ ] "Who This Is For" section
- [ ] "What You Will Learn" list
- [ ] Program length and funding info
- [ ] "Next Steps" section
- [ ] CTAs: "Check My Funding Eligibility", "Start My Enrollment"
- [ ] Sidebar: "Career Outcomes"

**Expected Image:**
- `ma101-hero.jpg`

---

### ✅ CNA Program Detail (/programs/cna)

**URL:** `http://localhost:3000/programs/cna`

**Check:**
- [ ] Hero section loads
- [ ] Tags display correctly
- [ ] Content sections present
- [ ] CTAs work
- [ ] Image loads

**Expected Image:**
- `cna-hero.jpg`

---

### ✅ HVAC Program Detail (/programs/hvac)

**URL:** `http://localhost:3000/programs/hvac`

**Check:**
- [ ] Hero section loads
- [ ] Tags display correctly
- [ ] Content sections present
- [ ] CTAs work
- [ ] Image loads

**Expected Image:**
- `hvac-hero.jpg`

---

### ✅ CDL Program Detail (/programs/cdl)

**URL:** `http://localhost:3000/programs/cdl`

**Check:**
- [ ] Hero section loads
- [ ] Tags display correctly
- [ ] Content sections present
- [ ] CTAs work
- [ ] Image loads

**Expected Image:**
- `cdl-hero.jpg`

---

### ✅ Funding Page (/funding)

**URL:** `http://localhost:3000/funding`

**Check:**
- [ ] Hero section with title and image
- [ ] 4 funding cards display:
  - WIOA
  - Workforce Ready Grant (WRG)
  - Reentry & JRI Funding
  - Apprenticeship & OJT Support
- [ ] Each card has image and description
- [ ] Layout is 2-column grid
- [ ] Mobile responsive

**Expected Images:**
- `funding-main.jpg` (hero)
- `funding-wioa.jpg`
- `funding-wrg.jpg`
- `funding-jri.jpg`
- `funding-apprenticeship.jpg`

---

### ✅ Student Portal Landing (/student-portal)

**URL:** `http://localhost:3000/student-portal`

**Check:**
- [ ] Hero section with title and image
- [ ] CTAs: "Go to LMS Login", "New Student? Start Here"
- [ ] 6 feature cards display
- [ ] Clean layout
- [ ] Mobile responsive

**Expected Image:**
- `student-portal.jpg`

---

### ✅ Staff Portal Landing (/staff-portal)

**URL:** `http://localhost:3000/staff-portal`

**Check:**
- [ ] Hero section with title and image
- [ ] CTAs: "Staff / Admin Login", "Request Program Holder Access"
- [ ] 6 feature cards display
- [ ] Clean layout
- [ ] Mobile responsive

**Expected Image:**
- `staff-portal.jpg`

---

### ✅ About Page (/about)

**URL:** `http://localhost:3000/about`

**Check:**
- [ ] Hero section with title and image
- [ ] "Our Mission" section
- [ ] "What Makes Us Different" list
- [ ] "Our Credentials" section with 3 cards
- [ ] Clean layout
- [ ] Mobile responsive

**Expected Image:**
- `about-hero.jpg`

---

### ✅ Contact Page (/contact)

**URL:** `http://localhost:3000/contact`

**Check:**
- [ ] Hero section with title and image
- [ ] Contact info (email, phone, hours)
- [ ] Contact form displays
- [ ] Form fields: Name, Email, Phone, Message
- [ ] Submit button present
- [ ] Clean layout
- [ ] Mobile responsive

**Expected Image:**
- `contact-hero.jpg`

---

## 🖼️ IMAGE TROUBLESHOOTING

### If You See Broken Images (🖼️ icon):

**Problem:** Placeholder wasn't replaced or file doesn't exist

**Solution:**
1. Check if file exists in `public/images/`
2. Verify filename matches script mapping
3. Re-run auto-wire script:
   ```bash
   ./scripts/auto-wire-images.sh
   ```
4. Refresh browser

### If Image Loads But Looks Wrong:

**Problem:** Wrong image file

**Solution:**
1. Replace file in `public/images/` with correct image
2. Keep same filename
3. Refresh browser (hard refresh: Cmd+Shift+R or Ctrl+Shift+R)

### If Script Didn't Run:

**Problem:** Gitpod didn't execute auto-wire script

**Solution:**
1. Manually run:
   ```bash
   cd /workspaces/fix2
   ./scripts/auto-wire-images.sh
   ```
2. Check for errors
3. Restart dev server:
   ```bash
   pnpm dev
   ```

---

## 📱 MOBILE TESTING

### Resize Browser to Test Responsive Design

**Breakpoints to Test:**
- 375px (Mobile - iPhone SE)
- 768px (Tablet - iPad)
- 1024px (Desktop - Small)
- 1920px (Desktop - Large)

**What to Check:**
- [ ] Navigation collapses to hamburger on mobile
- [ ] Images scale properly
- [ ] Text is readable (not too small)
- [ ] Buttons are tap-friendly (44px minimum)
- [ ] No horizontal scrolling
- [ ] Cards stack vertically on mobile
- [ ] Spacing looks good

---

## 🎨 DESIGN QUALITY CHECK

### Visual Consistency
- [ ] Consistent spacing between sections
- [ ] Consistent button styles (orange primary, blue secondary)
- [ ] Consistent card styles (rounded corners, shadows)
- [ ] Consistent typography (Inter font)
- [ ] Consistent color scheme (orange, blue, slate)

### Readability
- [ ] Text has good contrast (4.5:1 minimum)
- [ ] Headings are clear hierarchy (H1 > H2 > H3)
- [ ] Body text is 16px minimum
- [ ] Line height is comfortable (1.5-1.7)

### Professional Appearance
- [ ] No placeholder text visible
- [ ] No "Lorem ipsum" anywhere
- [ ] All images are high quality
- [ ] No pixelated or stretched images
- [ ] Consistent image aspect ratios

---

## 🔗 LINK TESTING

### Navigation Links
- [ ] Logo links to homepage
- [ ] "Programs" dropdown works
- [ ] "Funding" link works
- [ ] "Student Portal" link works
- [ ] "Staff Portal" link works
- [ ] "About" link works
- [ ] "Contact" link works

### CTA Buttons
- [ ] "Explore Programs" → `/programs`
- [ ] "See If I Qualify for Funding" → `/funding`
- [ ] "Check My Funding Eligibility" → `/funding`
- [ ] "Start My Enrollment" → `/enroll`
- [ ] "Talk to a Program Advisor" → `/contact`
- [ ] "Go to LMS Login" → `/lms`

### Program Links
- [ ] All "View program →" links work
- [ ] Program detail pages load correctly

---

## ⚡ PERFORMANCE CHECK

### Page Load Speed
- [ ] Homepage loads in < 3 seconds
- [ ] Images load progressively (not all at once)
- [ ] No layout shift (images have proper dimensions)
- [ ] Smooth scrolling

### Browser Console
- [ ] No JavaScript errors (open DevTools → Console)
- [ ] No 404 errors for images
- [ ] No CSS warnings

---

## ♿ ACCESSIBILITY CHECK

### Keyboard Navigation
- [ ] Tab through all links and buttons
- [ ] Focus indicators are visible
- [ ] No keyboard traps
- [ ] Skip to main content link works

### Screen Reader
- [ ] All images have alt text
- [ ] Headings are in logical order
- [ ] Links have descriptive text (not "click here")

### Color Contrast
- [ ] Text on backgrounds meets 4.5:1 ratio
- [ ] Button text is readable
- [ ] Links are distinguishable

---

## 📊 FINAL CHECKLIST

### All Pages Load
- [ ] Homepage (/)
- [ ] Programs (/programs)
- [ ] MA-101 (/programs/ma-101)
- [ ] CNA (/programs/cna)
- [ ] HVAC (/programs/hvac)
- [ ] CDL (/programs/cdl)
- [ ] Funding (/funding)
- [ ] Student Portal (/student-portal)
- [ ] Staff Portal (/staff-portal)
- [ ] About (/about)
- [ ] Contact (/contact)

### All Images Load
- [ ] 32 total images display correctly
- [ ] No broken image icons
- [ ] Images are optimized (< 500KB each)

### All Links Work
- [ ] Navigation links
- [ ] CTA buttons
- [ ] Program links
- [ ] Footer links

### Mobile Responsive
- [ ] All pages work on mobile
- [ ] No horizontal scrolling
- [ ] Touch-friendly buttons

### Professional Quality
- [ ] Clean, modern design
- [ ] Consistent styling
- [ ] Good readability
- [ ] No placeholder text

---

## 🎉 READY TO COMMIT

Once everything passes:

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Complete marketing site: homepage, programs, funding, portals, about, contact with auto-wire images"

# Push to repository
git push
```

---

## 🚨 COMMON ISSUES & FIXES

### Issue: "Module not found" error
**Fix:** Run `pnpm install` again

### Issue: Port 3000 already in use
**Fix:** Kill existing process or use different port:
```bash
pnpm dev -- -p 3001
```

### Issue: Images not loading after script runs
**Fix:** Check file permissions:
```bash
chmod 644 public/images/*.jpg
```

### Issue: Gitpod preview not updating
**Fix:** Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)

### Issue: Script says "file not found"
**Fix:** Verify image files exist:
```bash
ls -la public/images/
```

---

## 📈 NEXT STEPS AFTER QA

### If Everything Passes ✅
1. Commit and push changes
2. Deploy to Vercel
3. Test on production URL
4. Share with team

### If Issues Found ❌
1. Document issues in checklist
2. Fix one page at a time
3. Re-test after each fix
4. Repeat until all pass

### Optional Enhancements
1. Add real contact form handler
2. Connect to CRM
3. Add analytics tracking
4. Optimize images further
5. Add more program pages

---

**Status:** Ready to QA in Gitpod
**Total Pages:** 11 marketing pages
**Total Images:** 32 images
**Estimated QA Time:** 30-45 minutes

---

**END OF QA CHECKLIST**
