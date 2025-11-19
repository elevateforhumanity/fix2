# Logo and Asset Audit Report

**Generated:** 2025-11-19  
**Repository:** elevateforhumanity/fix2

---

## Executive Summary

This audit identifies all generic logos, placeholder images, and missing assets across the Elevate for Humanity platform. The report includes:

- ✅ **33 pages** using generic "elevate-logo" CSS class (text-based logo)
- ❌ **Missing partner logos** (8 organizations)
- ❌ **Missing certification partner logos** (12 organizations)
- ⚠️ **Placeholder images** in programs and courses
- 📋 **Required environment variables** for logo/asset management

---

## 1. Generic Logo Usage

### Current Implementation

The platform uses a **CSS-based text logo** instead of actual logo images:

**Location:** 33+ pages across the application  
**CSS Class:** `.elevate-logo` and `.elevate-logo-mark`  
**Display:** Text "E" in a styled div

### Files Using Generic Logo (Sample):

```
app/faq/page.tsx
app/about/page-old.tsx
app/pricing/page.tsx
app/program-holder/dashboard/page.tsx
app/programs/truck-driving/page.tsx
app/admin/dashboard/page.tsx
app/lms/courses/[id]/page.tsx
... (30+ more files)
```

### ✅ **SOLUTION: Replace with Real Logo**

**Current Logo File:** `/public/logo.svg`  
**Status:** ✅ Exists (SVG with gradient and "Elevate for Humanity" text)

**Action Required:**

1. Replace CSS-based logo with `<img>` or `<Image>` component
2. Use `/public/logo.svg` or create new branded logo
3. Update all 33+ pages to use actual logo image

**Example Replacement:**

```tsx
// OLD (Generic CSS Logo)
<div className="elevate-logo">
  <div className="elevate-logo-mark">E</div>
</div>

// NEW (Real Logo)
<Image
  src="/logo.svg"
  alt="Elevate for Humanity"
  width={220}
  height={64}
  priority
/>
```

---

## 2. Missing Partner Logos

### Government & Workforce Partners

#### ❌ **1. Department of Workforce Development (DWD)**

- **Current:** Generic text placeholder (`/public/logos/dwd.svg`)
- **Required:** Official DWD logo
- **Source:** https://www.in.gov/dwd/
- **Contact:** DWD Communications Team
- **File:** `/public/logos/dwd.svg` or `dwd.png`
- **Specs:** SVG preferred, transparent background, 32-64px height

#### ❌ **2. U.S. Department of Labor (DOL)**

- **Current:** Generic text placeholder (`/public/logos/dol.svg`)
- **Required:** Official DOL seal
- **Source:** https://www.dol.gov/general/aboutdol/logo
- **Download:** Direct from DOL website
- **File:** `/public/logos/dol.svg` or `dol.png`
- **Specs:** Official seal, transparent background

#### ❌ **3. WorkOne Indiana**

- **Current:** Generic text placeholder (`/public/logos/workone.svg`)
- **Required:** Official WorkOne logo
- **Source:** https://www.in.gov/dwd/workone/
- **Contact:** WorkOne Indiana
- **File:** `/public/logos/workone.svg` or `workone.png`
- **Specs:** SVG preferred, transparent background

#### ❌ **4. EmployIndy**

- **Current:** Missing
- **Required:** Official EmployIndy logo
- **Source:** https://employindy.org/
- **Contact:** info@employindy.org
- **File:** `/public/logos/employindy.svg` or `employindy.png`
- **Specs:** SVG preferred, transparent background

#### ❌ **5. WIOA (Workforce Innovation and Opportunity Act)**

- **Current:** Missing
- **Required:** WIOA branding/logo
- **Source:** Official WIOA branding guidelines
- **Note:** May need to create text-based logo
- **File:** `/public/logos/wioa.svg` or `wioa.png`
- **Specs:** Simple text logo, transparent background

#### ❌ **6. Indiana Department of Education**

- **Current:** Missing
- **Required:** Official IDOE logo
- **Source:** https://www.in.gov/doe/
- **Contact:** IDOE Communications
- **File:** `/public/logos/idoe.svg` or `idoe.png`
- **Specs:** SVG preferred, transparent background

#### ❌ **7. Goodwill Industries**

- **Current:** Missing
- **Required:** Official Goodwill logo
- **Source:** https://www.goodwill.org/press-room/media-resources/
- **Download:** Available from press room
- **File:** `/public/logos/goodwill.svg` or `goodwill.png`
- **Specs:** Official logo, transparent background

#### ❌ **8. Ivy Tech Community College**

- **Current:** Missing
- **Required:** Official Ivy Tech logo
- **Source:** https://www.ivytech.edu/
- **Contact:** Ivy Tech Marketing Department
- **File:** `/public/logos/ivytech.svg` or `ivytech.png`
- **Specs:** Official logo, transparent background

---

## 3. Missing Certification Partner Logos

### Location: `/lib/new-ecosystem-services/ContentAutomation.ts`

### Component: Partner logos section (lines 353-430)

#### ❌ **1. CompTIA**

- **Path:** `/public/images/partners/comptia-logo.png`
- **Status:** Missing
- **Source:** https://www.comptia.org/
- **Download:** https://www.comptia.org/about-us/media-resources

#### ❌ **2. Microsoft**

- **Path:** `/public/images/partners/microsoft-logo.png`
- **Status:** ✅ **EXISTS** (4KB PNG file)
- **Action:** Verify quality and update if needed

#### ❌ **3. AWS (Amazon Web Services)**

- **Path:** `/public/images/partners/aws-logo.png`
- **Status:** Missing
- **Source:** https://aws.amazon.com/
- **Download:** https://aws.amazon.com/architecture/icons/

#### ❌ **4. Cisco**

- **Path:** `/public/images/partners/cisco-logo.png`
- **Status:** Missing
- **Source:** https://www.cisco.com/
- **Download:** Request from Cisco partner portal

#### ❌ **5. AHIMA (American Health Information Management Association)**

- **Path:** `/public/images/partners/ahima-logo.png`
- **Status:** Missing
- **Source:** https://www.ahima.org/
- **Contact:** AHIMA Communications

#### ❌ **6. HIMSS (Healthcare Information and Management Systems Society)**

- **Path:** `/public/images/partners/himss-logo.png`
- **Status:** Missing
- **Source:** https://www.himss.org/
- **Contact:** HIMSS Marketing

#### ❌ **7. Epic Systems**

- **Path:** `/public/images/partners/epic-logo.png`
- **Status:** Missing
- **Source:** https://www.epic.com/
- **Note:** May require partnership agreement

#### ❌ **8. Cerner (Oracle Health)**

- **Path:** `/public/images/partners/cerner-logo.png`
- **Status:** Missing
- **Source:** https://www.cerner.com/
- **Note:** Now Oracle Health, update branding

#### ❌ **9. PMI (Project Management Institute)**

- **Path:** `/public/images/partners/pmi-logo.png`
- **Status:** Missing
- **Source:** https://www.pmi.org/
- **Download:** PMI brand center

#### ❌ **10. HRCI (HR Certification Institute)**

- **Path:** `/public/images/partners/hrci-logo.png`
- **Status:** Missing
- **Source:** https://www.hrci.org/
- **Contact:** HRCI Marketing

#### ❌ **11. ACT WorkKeys**

- **Path:** `/public/images/partners/workkeys-logo.png`
- **Status:** Missing
- **Source:** https://www.act.org/workkeys
- **Download:** ACT brand resources

#### ❌ **12. Certiport (Pearson VUE)**

- **Path:** `/public/images/partners/certiport-logo.png`
- **Status:** Missing
- **Source:** https://certiport.pearsonvue.com/
- **Download:** Certiport partner resources

---

## 4. Placeholder Images

### Program Images

**Location:** `/public/programs/`

#### ❌ **Generic Placeholder**

- **File:** `/public/programs/placeholder.svg`
- **Usage:** Fallback for missing program images
- **Content:** Gray box with "Program Image 1600 x 900px" text

#### ⚠️ **Low-Quality Program Images**

All program images are **451 bytes** (likely placeholders):

- `cdl.jpg` (451 bytes)
- `cna.jpg` (451 bytes)
- `nails.jpg` (451 bytes)
- `office.jpg` (451 bytes)
- `osha.jpg` (451 bytes)
- `welding.jpg` (451 bytes)

**Action Required:**

1. Replace with high-quality program images (1600x900px)
2. Use real photos from training programs
3. Ensure proper licensing/permissions

### Course Cover Images

**Location:** `/public/generated-images/ecd-courses/`

**Status:** ✅ Some generated covers exist

- `welding-fabrication-cover.png`
- `electrical-apprenticeship-cover.png`

**Fallback:** `/placeholder-course-cover.svg` (used in `app/programs/[slug]/page.tsx`)

---

## 5. Affected Components & APIs

### Components Using Logos

#### **TrustStrip.tsx**

**Location:** `/components/TrustStrip.tsx`  
**Purpose:** Display partner logos and statistics  
**Current Logos:**

- `/logos/dwd.svg` ❌ (placeholder)
- `/logos/dol.svg` ❌ (placeholder)
- `/logos/workone.svg` ❌ (placeholder)
- `/logos/supabase.svg` ✅ (exists)

**Action:** Replace placeholder SVGs with real partner logos

#### **IndustryPartnershipPortal.tsx**

**Location:** `/components/IndustryPartnershipPortal.tsx`  
**Purpose:** Partner management interface  
**Logo Usage:** Partner logo uploads and display

#### **JobPlacementTracking.tsx**

**Location:** `/components/JobPlacementTracking.tsx`  
**Purpose:** Track job placements with employer logos  
**Logo Usage:** Employer logo display

### API Endpoints (No Direct Logo APIs)

**Note:** No dedicated logo upload/management APIs found. Logos are static assets.

**Potential API Needs:**

1. **Logo Upload API** - For partner/employer logo uploads
2. **Asset Management API** - For managing program images
3. **CDN Integration** - For optimized image delivery

---

## 6. Environment Variables

### Current Logo-Related Variables

**File:** `.env.example`

```bash
# Branding & Assets
DEFAULT_LOGO_URL=
NEXT_PUBLIC_CDN_URL=

# Multi-Tenancy Branding
DEFAULT_PRIMARY_COLOR=#0F766E
DEFAULT_SECONDARY_COLOR=#F97316
```

### ❌ **Missing Variables**

```bash
# Logo & Asset Management
NEXT_PUBLIC_LOGO_URL=https://cdn.elevateforhumanity.org/logo.svg
NEXT_PUBLIC_LOGO_DARK_URL=https://cdn.elevateforhumanity.org/logo-dark.svg
NEXT_PUBLIC_FAVICON_URL=https://cdn.elevateforhumanity.org/favicon.png

# Partner Logos CDN
NEXT_PUBLIC_PARTNER_LOGOS_CDN=https://cdn.elevateforhumanity.org/partners/

# Program Images CDN
NEXT_PUBLIC_PROGRAM_IMAGES_CDN=https://cdn.elevateforhumanity.org/programs/

# Course Covers CDN
NEXT_PUBLIC_COURSE_COVERS_CDN=https://cdn.elevateforhumanity.org/courses/

# Asset Generation (AI)
OPENAI_API_KEY=sk-...
DALLE_API_KEY=sk-...
```

---

## 7. Broken Links & Routes

### ✅ **Route Structure: HEALTHY**

- **178 pages** found (page.tsx and layout.tsx files)
- All internal links use Next.js `<Link>` component
- 404 page exists (`app/not-found.tsx`)

### ⚠️ **Potential Issues**

#### **1. Missing Pages Referenced in Links**

- `/wioa-eligibility` (referenced in 404 page)
- `/apply` (referenced in multiple pages)
- `/enroll` (referenced in multiple pages)
- `/partners` (referenced in about page)
- `/terms` (referenced in about page)
- `/privacy` (referenced in about page)

**Action:** Verify these routes exist or update links

#### **2. External Links (No Issues Found)**

All external links properly use:

- `target="_blank"`
- `rel="noopener noreferrer"`

---

## 8. Implementation Checklist

### Phase 1: Replace Generic Logos (Priority: HIGH)

- [ ] Update 33+ pages to use `/public/logo.svg` instead of CSS logo
- [ ] Create logo component for consistent usage
- [ ] Add dark mode logo variant (`/public/logo-dark.svg`)
- [ ] Update Header.jsx and Footer.jsx components

### Phase 2: Obtain Partner Logos (Priority: HIGH)

- [ ] Contact DWD for official logo
- [ ] Download DOL seal from official website
- [ ] Request WorkOne Indiana logo
- [ ] Contact EmployIndy for logo
- [ ] Create/obtain WIOA branding
- [ ] Request Indiana DOE logo
- [ ] Download Goodwill logo from press room
- [ ] Contact Ivy Tech for logo

### Phase 3: Obtain Certification Partner Logos (Priority: MEDIUM)

- [ ] Download CompTIA logo
- [ ] Verify/update Microsoft logo
- [ ] Download AWS logo
- [ ] Request Cisco logo
- [ ] Contact AHIMA for logo
- [ ] Contact HIMSS for logo
- [ ] Request Epic Systems logo (if partnership exists)
- [ ] Update Cerner to Oracle Health branding
- [ ] Download PMI logo
- [ ] Contact HRCI for logo
- [ ] Download ACT WorkKeys logo
- [ ] Download Certiport logo

### Phase 4: Replace Placeholder Images (Priority: MEDIUM)

- [ ] Source high-quality program images (1600x900px)
- [ ] Replace 451-byte placeholder JPGs
- [ ] Generate/source course cover images
- [ ] Update placeholder.svg fallback

### Phase 5: Add Environment Variables (Priority: LOW)

- [ ] Add logo URL variables
- [ ] Configure CDN URLs for assets
- [ ] Add AI API keys for asset generation (optional)

### Phase 6: Verify Routes & Links (Priority: MEDIUM)

- [ ] Create missing pages or update links
- [ ] Test all internal navigation
- [ ] Verify external links

---

## 9. Quick Start: Get Logos Now

### Email Template for Partner Logo Requests

```
Subject: Logo Request for Partnership Recognition

Dear [Partner Name] Team,

Elevate for Humanity is a workforce development platform that partners
with [Partner Name] to provide training programs for WIOA-eligible
participants.

We would like to feature your logo on our website to recognize our
partnership. Could you please provide:

1. Official logo file (SVG or high-resolution PNG)
2. Brand guidelines for logo usage
3. Any specific requirements for display

Our website: https://elevateconnectsdirectory.org

Thank you for your partnership!

Best regards,
Elevate for Humanity Team
elevateforhumanity@gmail.com
```

### Direct Download Links

| Partner  | Download Link                                        |
| -------- | ---------------------------------------------------- |
| DOL      | https://www.dol.gov/general/aboutdol/logo            |
| Goodwill | https://www.goodwill.org/press-room/media-resources/ |
| CompTIA  | https://www.comptia.org/about-us/media-resources     |
| AWS      | https://aws.amazon.com/architecture/icons/           |
| PMI      | https://www.pmi.org/ (brand center)                  |

---

## 10. Summary Statistics

| Category                | Total | Missing | Exists | Placeholder |
| ----------------------- | ----- | ------- | ------ | ----------- |
| **Main Logo**           | 1     | 0       | 1 ✅   | 0           |
| **Generic CSS Logos**   | 33+   | -       | -      | 33+ ❌      |
| **Partner Logos**       | 8     | 7 ❌    | 1 ✅   | 3 ⚠️        |
| **Certification Logos** | 12    | 11 ❌   | 1 ✅   | 0           |
| **Program Images**      | 7     | 0       | 7      | 6 ⚠️        |
| **Course Covers**       | Many  | Unknown | 2+ ✅  | 1 ⚠️        |

**Total Assets Needed:** ~30-40 logos and images

---

## 11. Estimated Timeline

| Phase                      | Duration  | Effort                |
| -------------------------- | --------- | --------------------- |
| Replace generic logos      | 2-4 hours | Developer             |
| Obtain partner logos       | 1-2 weeks | Outreach/waiting      |
| Obtain cert logos          | 1-2 weeks | Outreach/waiting      |
| Replace placeholder images | 1-3 days  | Designer/photographer |
| Add environment variables  | 1 hour    | Developer             |
| Verify routes              | 2-4 hours | Developer/QA          |

**Total Estimated Time:** 2-3 weeks (mostly waiting for partner responses)

---

## 12. Next Steps

1. **Immediate (Today):**
   - Start contacting partners for logos
   - Replace CSS logos with actual logo image
   - Identify missing routes

2. **This Week:**
   - Download publicly available logos (DOL, Goodwill, CompTIA, AWS)
   - Source high-quality program images
   - Update TrustStrip component with real logos

3. **Next 2 Weeks:**
   - Follow up with partners for logo requests
   - Replace all placeholder images
   - Test all routes and links

4. **Ongoing:**
   - Maintain logo library
   - Update logos when partners rebrand
   - Add new partner logos as partnerships form

---

**Report Generated By:** Ona AI Assistant  
**Date:** 2025-11-19  
**Repository:** https://github.com/elevateforhumanity/fix2
