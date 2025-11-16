# Site Audit Report - Elevate for Humanity

**Date:** November 16, 2024  
**Status:** Issues Found - Action Required

---

## 🔴 CRITICAL ISSUES

### 1. Missing Pages (404 Errors)

#### A. `/programs/truck-driving` - DOES NOT EXIST

**Referenced on:** Homepage (line 234)

```tsx
<Link href="/programs/truck-driving">CDL Truck Driving</Link>
```

**Fix:** Create `/app/programs/truck-driving/page.tsx` OR change link to use slug system

#### B. `/programs/hvac-tech` - DOES NOT EXIST

**Referenced on:** Homepage (line 237)

```tsx
<Link href="/programs/hvac-tech">HVAC Technician</Link>
```

**Fix:** Create `/app/programs/hvac-tech/page.tsx` OR change to `/programs/hvac`

#### C. `/faq` - DOES NOT EXIST

**Referenced on:** Homepage footer
**Fix:** Create `/app/faq/page.tsx`

#### D. `/terms-of-service` - DOES NOT EXIST

**Referenced on:** Homepage footer
**Fix:** Create `/app/terms-of-service/page.tsx` OR rename from `/terms`

---

### 2. Favicon Issues

#### Current Status:

✅ Favicon files exist in `/public/`:

- `favicon.svg`
- `favicon.png`
- `icon-192.png`
- `icon-512.png`
- `apple-touch-icon.png`

❌ **Not configured in layout.tsx**

#### Fix Required:

Add to `/app/layout.tsx` metadata:

```tsx
export const metadata: Metadata = {
  // ... existing metadata
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};
```

---

### 3. Course Cover Images - All Placeholders

#### Current State:

All course covers are SVG placeholders:

```
/course-covers/barber-apprenticeship/cover.svg
/course-covers/truck-driving/cover.svg
/course-covers/hvac-tech/cover.svg
/course-covers/cna-training/cover.svg
/course-covers/medical-assistant/cover.svg
/course-covers/tax-prep/cover.svg
/course-covers/life-coach/cover.svg
/course-covers/peer-recovery/cover.svg
/course-covers/building-tech/cover.svg
/course-covers/workforce-readiness/cover.svg
```

#### Impact:

- Unprofessional appearance
- Low engagement
- Poor SEO (no alt text on real images)

#### Fix:

Replace with real JPG/PNG images (see CONTENT_UPLOAD_GUIDE.md)

---

## 🟡 HIGH PRIORITY ISSUES

### 4. Broken Navigation Links

#### Homepage Navigation Issues:

```tsx
// These pages exist but may have issues:
/about          ✅ EXISTS
/contact        ✅ EXISTS
/blog           ✅ EXISTS (but likely empty)
/apply          ✅ EXISTS
/privacy-policy ✅ EXISTS
```

#### Missing from navigation but referenced:

- `/faq` - Does not exist
- `/terms-of-service` - Does not exist

---

### 5. Program Slug Inconsistencies

#### Issue:

Homepage uses hardcoded paths that don't match slug system:

- `/programs/truck-driving` → Should be `/programs/[slug]` with slug="truck-driving"
- `/programs/hvac-tech` → Should be `/programs/hvac` (existing) or slug="hvac-tech"

#### Current Working Programs:

- `/programs/barber` ✅
- `/programs/cna` ✅
- `/programs/hvac` ✅
- `/programs/[slug]` ✅ (dynamic)

#### Fix Options:

**Option A:** Create static pages for truck-driving and hvac-tech
**Option B:** Update homepage links to match existing slugs
**Option C:** Add slugs to database and use dynamic routing

---

### 6. Button Functionality Issues

#### Potential Issues Found:

**A. Enrollment Buttons**

```tsx
<Link href="/enroll">Check Your Eligibility</Link>
```

- Page exists at `/app/enroll/page.tsx` ✅
- May need testing for form submission

**B. Program Holder Apply Button**

```tsx
<Link href="/program-holder/apply">List Your Program</Link>
```

- Page exists at `/app/program-holder/apply/page.tsx` ✅
- Needs testing

**C. Sign In / Sign Up Buttons**

```tsx
<Link href="/login">Sign In</Link>
<Link href="/signup">Get Started Free</Link>
```

- `/login` exists ✅
- `/signup` exists ✅
- Auth functionality needs testing

---

## 🟢 MEDIUM PRIORITY ISSUES

### 7. Missing Content Templates

#### A. Video Placeholders

**Locations:**

- Homepage hero video (line 105)
- Student portal video (line ~400)
- Partner video (line ~450)

**Status:** Placeholders with instructions
**Fix:** Upload real videos (see CONTENT_UPLOAD_GUIDE.md)

#### B. Testimonial Placeholders

**Location:** Homepage testimonials section
**Status:** Hardcoded placeholder testimonials
**Fix:** Replace with real testimonials or connect to database

---

### 8. External Link Issues

#### Links to External Sites:

```tsx
// These should open in new tabs with rel="noopener noreferrer"
https://www.in.gov/dwd/apprenticeship-indiana/home/
https://www.dol.gov/agencies/eta/wioa/programs
https://employindy.org/modern-apprenticeship/
```

**Status:** ✅ Already have `target="_blank"` and `rel="noopener noreferrer"`

---

## 🔵 LOW PRIORITY ISSUES

### 9. SEO & Metadata

#### Issues:

- OG image path may not exist: `/assets/og-image.jpg`
- Some pages missing individual metadata
- Sitemap may need updating

#### Check:

```bash
ls -la public/assets/og-image.jpg
```

---

### 10. Accessibility Issues

#### Potential Issues:

- Video placeholders need proper ARIA labels
- Some buttons may need better focus states
- Color contrast needs verification

---

## 📋 COMPLETE FIX CHECKLIST

### Immediate Fixes (Do Now):

- [ ] **Fix 404 Links:**
  - [ ] Create `/app/programs/truck-driving/page.tsx`
  - [ ] Create `/app/programs/hvac-tech/page.tsx` OR update links
  - [ ] Create `/app/faq/page.tsx`
  - [ ] Create `/app/terms-of-service/page.tsx`

- [ ] **Add Favicon to Layout:**
  - [ ] Update `/app/layout.tsx` with icons metadata

- [ ] **Test All Buttons:**
  - [ ] Test enrollment form submission
  - [ ] Test login/signup flow
  - [ ] Test program holder application
  - [ ] Test all navigation links

### High Priority (This Week):

- [ ] **Replace Course Covers:**
  - [ ] Upload 10 real course cover images
  - [ ] Update image paths in code

- [ ] **Fix Program Slugs:**
  - [ ] Verify all program slugs in database
  - [ ] Update homepage links to match

- [ ] **Add Missing Content:**
  - [ ] Upload homepage hero video
  - [ ] Add at least 3 real testimonials

### Medium Priority (This Month):

- [ ] **Complete Video Content:**
  - [ ] Student portal video
  - [ ] Partner video
  - [ ] Lesson videos for top 3 programs

- [ ] **SEO Improvements:**
  - [ ] Verify OG image exists
  - [ ] Add metadata to all pages
  - [ ] Update sitemap

---

## 🛠️ QUICK FIXES (Copy/Paste Ready)

### Fix 1: Add Favicon to Layout

**File:** `/app/layout.tsx`

**Add after line 45:**

```tsx
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
```

---

### Fix 2: Create FAQ Page

**File:** `/app/faq/page.tsx`

```tsx
import Link from 'next/link';

export const metadata = {
  title: 'FAQ | Elevate for Humanity',
  description: 'Frequently asked questions about WIOA training programs',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <Link href="/" className="text-gray-700 hover:text-red-600">
          Back to Home
        </Link>
      </header>

      <main className="elevate-container py-16">
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

        <div className="space-y-6 max-w-3xl">
          <div className="elevate-card">
            <h2 className="text-xl font-bold mb-2">What is WIOA?</h2>
            <p className="text-gray-700">
              The Workforce Innovation and Opportunity Act (WIOA) provides FREE
              training to help Americans get high-quality jobs in high-demand
              industries.
            </p>
          </div>

          <div className="elevate-card">
            <h2 className="text-xl font-bold mb-2">
              Who qualifies for WIOA funding?
            </h2>
            <p className="text-gray-700">
              Adults seeking career advancement, dislocated workers needing
              retraining, youth ages 16-24, and individuals with barriers to
              employment may qualify.
            </p>
          </div>

          <div className="elevate-card">
            <h2 className="text-xl font-bold mb-2">How do I enroll?</h2>
            <p className="text-gray-700">
              Click "Check Your Eligibility" on our homepage to start the
              enrollment process.
            </p>
          </div>

          <div className="elevate-card">
            <h2 className="text-xl font-bold mb-2">
              Are the programs really free?
            </h2>
            <p className="text-gray-700">
              Yes! WIOA covers 100% of tuition and training materials for
              eligible participants.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
```

---

### Fix 3: Create Terms of Service Page

**File:** `/app/terms-of-service/page.tsx`

```tsx
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Elevate for Humanity',
  description: 'Terms and conditions for using Elevate for Humanity services',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <Link href="/" className="text-gray-700 hover:text-red-600">
          Back to Home
        </Link>
      </header>

      <main className="elevate-container py-16">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose max-w-3xl">
          <p className="text-gray-600 mb-6">Last updated: November 2024</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Elevate for Humanity services, you accept and
            agree to be bound by these Terms of Service.
          </p>

          <h2>2. Use of Services</h2>
          <p>
            Our services are provided for educational and workforce development
            purposes. You agree to use them responsibly and in accordance with
            all applicable laws.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities under your account.
          </p>

          <h2>4. WIOA Eligibility</h2>
          <p>
            Participation in WIOA-funded programs requires meeting eligibility
            criteria as determined by local workforce boards.
          </p>

          <h2>5. Contact</h2>
          <p>
            For questions about these terms, please contact us through our
            website.
          </p>
        </div>
      </main>
    </div>
  );
}
```

---

### Fix 4: Update Homepage Links

**File:** `/app/page.tsx`

**Find and replace:**

```tsx
// OLD:
<Link href="/programs/truck-driving">

// NEW:
<Link href="/programs/cdl-truck-driving">
```

```tsx
// OLD:
<Link href="/programs/hvac-tech">

// NEW:
<Link href="/programs/hvac">
```

---

## 📊 SUMMARY

### Total Issues Found: 10

- 🔴 Critical: 3
- 🟡 High Priority: 3
- 🟢 Medium Priority: 2
- 🔵 Low Priority: 2

### Estimated Fix Time:

- **Immediate fixes:** 2 hours
- **High priority:** 8 hours
- **Medium priority:** 16 hours
- **Total:** 26 hours (3-4 days)

### Next Steps:

1. Fix 404 errors (create missing pages)
2. Add favicon configuration
3. Test all buttons and forms
4. Replace course cover placeholders
5. Upload video content

---

## ✅ READY TO FIX?

I can implement all the immediate fixes right now. Just say:

- "Fix all 404 errors"
- "Add favicon configuration"
- "Create missing pages"
- "Fix all broken links"
- "Do all immediate fixes"
