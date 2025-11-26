# 🎨 UNIFIED LAYOUT SYSTEM

**One header, one footer, one clean design for marketing + LMS**

---

## 📁 FILES TO CREATE

### 1. Global Layout
**File:** `app/layout.tsx`
**Purpose:** Wraps every page with header and footer
**Status:** Replace or update existing

### 2. Main Header
**File:** `components/layout/MainHeader.tsx`
**Purpose:** Navigation for marketing + LMS
**Status:** Create new file

### 3. Main Footer
**File:** `components/layout/MainFooter.tsx`
**Purpose:** Footer with links and legal
**Status:** Create new file

---

## 🚀 IMPLEMENTATION STEPS

### Step 1: Create Header Component
1. Create `components/layout/MainHeader.tsx`
2. Copy the MainHeader code from conversation
3. Save file

### Step 2: Create Footer Component
1. Create `components/layout/MainFooter.tsx`
2. Copy the MainFooter code from conversation
3. Save file

### Step 3: Update Global Layout
1. Open `app/layout.tsx`
2. Import MainHeader and MainFooter
3. Wrap children with the new structure
4. Save file

### Step 4: Test Everything
1. Start dev server: `pnpm dev`
2. Visit homepage: `/`
3. Visit LMS: `/lms`
4. Check mobile menu works
5. Verify footer displays

---

## ✅ WHAT THIS FIXES

### Before
- ❌ Different headers on different pages
- ❌ Inconsistent navigation
- ❌ Dark, heavy design
- ❌ Messy footer
- ❌ Marketing and LMS feel separate

### After
- ✅ Same header everywhere
- ✅ Consistent navigation
- ✅ Bright, clean design
- ✅ Professional footer
- ✅ Marketing and LMS feel unified

---

## 🎯 KEY FEATURES

### Header
- Logo/brand on left
- Navigation links in center
- "Go to LMS" button on right
- Mobile hamburger menu
- Active link highlighting
- Sticky/backdrop blur effect

### Footer
- Company description
- Navigation links
- Legal links
- Contact info
- Copyright notice
- Clean 3-column layout

### Layout
- Consistent max-width (6xl = 1152px)
- Proper spacing (py-10 md:py-14)
- Light backgrounds (bg-white, bg-slate-50)
- No huge gaps
- Mobile-responsive

---

## 📱 MOBILE BEHAVIOR

### Header on Mobile
- Logo visible
- "Menu" button appears
- Dropdown menu with all links
- "Go to LMS" button at bottom
- Closes when link clicked

### Footer on Mobile
- Stacks vertically
- All sections readable
- Links still work
- No horizontal scroll

---

## 🎨 DESIGN SYSTEM

### Colors Used
- **Orange** (`bg-orange-500`) - Brand accent, EFH badge
- **Blue** (`bg-blue-600`) - Primary CTA, "Go to LMS" button
- **Slate** (`text-slate-900`, `bg-slate-50`) - Text and backgrounds
- **White** (`bg-white`) - Main backgrounds

### Spacing
- **Sections:** `py-10 md:py-14` (consistent vertical spacing)
- **Content:** `max-w-6xl mx-auto px-4` (centered, padded)
- **Gaps:** `gap-4`, `gap-6`, `gap-8` (consistent spacing)

### Typography
- **Headers:** `text-2xl md:text-3xl font-bold`
- **Body:** `text-sm md:text-base`
- **Small:** `text-xs`
- **Font:** System default (or Inter if configured)

---

## 🔗 NAVIGATION STRUCTURE

### Main Links (Header)
1. Home → `/`
2. Programs → `/programs`
3. Funding → `/funding`
4. Student Portal → `/student-portal`
5. Staff & Program Holders → `/staff-portal`
6. About → `/about`
7. Contact → `/contact`
8. Go to LMS → `/lms` (button)

### Footer Links
**Navigation Column:**
- Programs
- Funding
- Student Portal
- Staff & Program Holders
- About
- Contact

**Legal Column:**
- Privacy Policy → `/privacy`
- Terms of Use → `/terms`
- Refund Policy → `/refunds`
- Contact email

---

## 🚨 COMMON ISSUES & FIXES

### Issue: Header too tall on mobile
**Fix:** Already optimized with `py-3 md:py-4`

### Issue: Menu doesn't close after clicking
**Fix:** Already handled with `onClick={() => setOpen(false)}`

### Issue: Footer looks cramped
**Fix:** Already using proper spacing with `py-8 md:py-10`

### Issue: Active link not highlighting
**Fix:** Already using `usePathname()` to detect active route

### Issue: "Go to LMS" button not visible
**Fix:** Already styled with `bg-blue-600` to stand out

---

## 📊 BEFORE vs AFTER

### Before
```
[Different header on each page]
[Inconsistent navigation]
[Dark sections]
[Messy footer]
[Marketing ≠ LMS]
```

### After
```
┌─────────────────────────────────────┐
│ [Logo] Home Programs ... [Go to LMS]│ ← Same everywhere
├─────────────────────────────────────┤
│                                     │
│         Page Content                │
│         (Marketing or LMS)          │
│                                     │
├─────────────────────────────────────┤
│ Footer: Links, Legal, Contact      │ ← Same everywhere
└─────────────────────────────────────┘
```

---

## ✅ VERIFICATION CHECKLIST

### Header
- [ ] Logo/brand visible
- [ ] All navigation links work
- [ ] "Go to LMS" button works
- [ ] Mobile menu opens/closes
- [ ] Active link highlighted
- [ ] Looks good on mobile and desktop

### Footer
- [ ] Company description visible
- [ ] Navigation links work
- [ ] Legal links present
- [ ] Contact info displayed
- [ ] Copyright year correct
- [ ] Looks good on mobile and desktop

### Layout
- [ ] No dark sections (unless intentional)
- [ ] Consistent spacing
- [ ] No huge gaps
- [ ] Content centered
- [ ] Mobile responsive
- [ ] Fast loading

---

## 🎯 SUCCESS CRITERIA

Your unified layout is working when:

1. ✅ Same header on every page (marketing + LMS)
2. ✅ Same footer on every page
3. ✅ Navigation makes sense
4. ✅ Mobile menu works
5. ✅ Design is bright and clean
6. ✅ No visual inconsistencies
7. ✅ Feels like one platform

---

## 📞 NEXT STEPS

### After Layout is Unified
1. Add all page content (already have code)
2. Add images (see image naming map)
3. Test on real devices
4. Deploy to production

### Optional Enhancements
- Add logo image to header
- Add social media icons to footer
- Add search functionality
- Add breadcrumbs
- Add loading states

---

**Status:** Ready to implement
**Time:** 30 minutes to 1 hour
**Result:** Unified, professional layout system

---

**END OF UNIFIED LAYOUT SYSTEM**
