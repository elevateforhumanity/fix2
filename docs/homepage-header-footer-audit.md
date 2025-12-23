# Header/Footer Audit & Homepage Plan

**Date:** 2025-12-23  
**Purpose:** Audit existing header/footer components before building new homepage

---

## 🔍 Current State Analysis

### Header/Footer Component Chaos

**Found 24 different header/footer components:**

```
components/site/SiteHeader.tsx
components/site/SiteHeader-new.tsx
components/site/SiteFooter.tsx
components/site/SiteFooter-enterprise.tsx
components/site/SimpleHeader.tsx
components/layout/MainHeader.tsx
components/layout/MainFooter.tsx
components/layout/CompliantHeader.tsx
components/layout/CompliantFooter.tsx
components/layout/ModernFooter.tsx
components/layout/SiteFooter.tsx (alias for Footer.tsx)
components/layout/Footer.tsx
components/AdminHeader.tsx
components/CourseraStyleHeader.tsx
components/CourseraStyleFooter.tsx
components/DoceboHeader.tsx
components/SimpleHeader.tsx
components/SimpleFooter.tsx
components/Header.jsx (legacy)
components/Footer.jsx (legacy)
components/ui/Header.tsx
components/ui/Header-broken.tsx
components/ui/Footer.tsx
components/FooterPageTemplate.tsx
```

**Problem:** Massive duplication, inconsistency, and confusion about which to use.

---

## 📍 Current Usage by Layout

### Root Layout (`app/layout.tsx`)

**Currently imports:**

- `MainHeader` from `@/components/layout/MainHeader`
- `MainFooter` from `@/components/layout/MainFooter`
- `SiteHeader` from `@/components/site/SiteHeader`
- `NewSiteFooter` from `@/components/site/SiteFooter`
- `SiteFooter` from `@/components/layout/Footer`

**Actually renders:**

```tsx
<SiteHeader />;
{
  children;
}
<NewSiteFooter />;
```

**Issue:** Imports 5 different header/footer components but only uses 2.

### Marketing Layout (`app/(marketing)/layout.tsx`)

**Uses:**

```tsx
<MainHeader />;
{
  children;
}
<MainFooter />;
```

**Status:** ✅ Clean, uses dedicated marketing components

### Public Layout (`app/(public)/layout.tsx`)

**Uses:**

```tsx
<SiteHeader />;
{
  children;
}
<NewSiteFooter />;
```

**Status:** ✅ Same as root layout

### LMS Layout (`app/lms/(app)/layout.tsx`)

**Uses:**

```tsx
<LMSNavigation user={user} profile={profile} />;
{
  children;
}
{
  /* No footer */
}
```

**Status:** ⚠️ Different navigation, no footer

### Admin Layout (`app/admin/layout.tsx`)

**Uses:**

```tsx
<AdminNav /> {/* Sidebar */}
<AdminHeader /> {/* Top bar */}
{children}
{/* No footer */}
```

**Status:** ✅ Appropriate for admin portal

---

## 🎯 Recommended Architecture

### Consolidate to 3 Base Components

#### 1. **MarketingHeader** (Public-facing)

**File:** `components/layout/MarketingHeader.tsx`  
**Used by:** Marketing site, homepage, public pages  
**Features:**

- Full navigation with dropdowns
- CTA buttons (Apply, Login, Partner)
- Mobile menu
- Search (optional)
- Utility bar (phone, language)

#### 2. **AppHeader** (Authenticated apps)

**File:** `components/layout/AppHeader.tsx`  
**Used by:** LMS, dashboards  
**Features:**

- Simplified navigation
- User menu
- Notifications
- Role-specific links

#### 3. **AdminHeader** (Admin portal)

**File:** `components/AdminHeader.tsx` (keep existing)  
**Used by:** Admin portal  
**Features:**

- Top bar with user info
- Quick actions
- Sign out

### Consolidate to 2 Footer Components

#### 1. **MarketingFooter**

**File:** `components/layout/MarketingFooter.tsx`  
**Used by:** Marketing site, homepage, public pages  
**Features:**

- Full link structure
- Social media
- Newsletter signup
- Legal links
- Contact info

#### 2. **AppFooter** (Optional)

**File:** `components/layout/AppFooter.tsx`  
**Used by:** LMS, dashboards (if needed)  
**Features:**

- Minimal footer
- Legal links only
- Help/support link

---

## 📋 Implementation Plan

### Phase 1: Audit & Document (Current)

- [x] Identify all header/footer components
- [x] Document current usage
- [ ] Review MainHeader and SiteHeader code
- [ ] Identify best patterns to keep

### Phase 2: Create Shared Base Components

1. **Create `components/layout/MarketingHeader.tsx`**
   - Based on best of MainHeader + SiteHeader
   - Add Regus-inspired utility bar
   - Ensure mobile-responsive
   - Add search/program finder

2. **Create `components/layout/MarketingFooter.tsx`**
   - Based on best of MainFooter + NewSiteFooter
   - Full link structure
   - Mobile-friendly (accordion on mobile)

3. **Keep `components/lms/LMSNavigation.tsx`**
   - Already good for LMS
   - Add footer if needed

4. **Keep `components/AdminNav.tsx` and `components/AdminHeader.tsx`**
   - Already appropriate for admin

### Phase 3: Update Layouts

1. Update `app/layout.tsx` to use MarketingHeader/Footer
2. Update `app/(marketing)/layout.tsx` to use MarketingHeader/Footer
3. Update `app/(public)/layout.tsx` to use MarketingHeader/Footer
4. Keep LMS and Admin layouts as-is

### Phase 4: Build Homepage

1. Create `app/page.tsx` (or update existing)
2. Create homepage sections in `app/_components/home/`
3. Follow Regus structure with EFH content

### Phase 5: Cleanup

1. Mark old header/footer components as deprecated
2. Remove unused imports from layouts
3. Document which components to use

---

## 🎨 Design Requirements (Regus-Inspired)

### Header Structure

```
┌─────────────────────────────────────────────────────────┐
│ Utility Bar: Phone | Help | Language | Login            │
├─────────────────────────────────────────────────────────┤
│ Logo | Programs ▼ | Employers | Partners | About | 🔍  │
│                                    [Apply Now] [Partner] │
└─────────────────────────────────────────────────────────┘
```

### Hero Structure (Regus Pattern)

```
┌─────────────────────────────────────────────────────────┐
│                                                           │
│  [Background Image/Video]                                │
│                                                           │
│  Headline: Transform Your Career                         │
│  Subhead: Free training, funding, and job placement      │
│                                                           │
│  [Apply Now]  [Partner With Us]                          │
│                                                           │
│  ┌──────────────────────────────────────────────┐       │
│  │ Find a Program: [Search/Dropdown]  [Go] │       │
│  └──────────────────────────────────────────────┘       │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Offerings Grid (Regus "Flexible workspace" Pattern)

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│   Students   │   Employers  │   Partners   │  Government  │
│              │              │              │              │
│ • Training   │ • Hire       │ • License    │ • WIOA       │
│ • Funding    │ • Post Jobs  │ • Enroll     │ • Reporting  │
│              │              │              │              │
│ [Explore]    │ [Post Job]   │ [Partner]    │ [Learn More] │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

---

## 📱 Responsive Requirements

### Mobile (<768px)

- Hamburger menu
- Stacked hero content
- Single-column cards
- Larger tap targets (min 44x44px)
- Reduced vertical padding
- Footer accordion sections

### Tablet (768-1024px)

- 2-column cards
- Condensed navigation
- Optimized images

### Desktop (>1024px)

- Full navigation
- Multi-column layouts
- Larger images/videos

---

## 🚀 Performance Requirements

### Images

- Use `next/image` with proper `sizes`
- Hero image: `priority={true}`
- Below fold: lazy loading
- Aspect ratio containers (no CLS)

### Videos

- Lazy load
- Poster image required
- Muted autoplay only on desktop
- Conditional loading on mobile

### Fonts

- Already using Inter (good choice)
- Ensure font-display: swap

### Metrics

- LCP < 2.5s
- CLS < 0.1
- FID < 100ms

---

## 📂 Files to Create/Modify

### Create

```
components/layout/MarketingHeader.tsx
components/layout/MarketingFooter.tsx
app/_components/home/Hero.tsx
app/_components/home/OfferingsGrid.tsx
app/_components/home/ProofMetrics.tsx
app/_components/home/FeaturedPrograms.tsx
app/_components/home/HowItWorks.tsx
app/_components/home/Testimonials.tsx
app/_components/home/FinalCTA.tsx
docs/homepage-verification.md
```

### Modify

```
app/layout.tsx (update imports)
app/(marketing)/layout.tsx (update imports)
app/(public)/layout.tsx (update imports)
app/page.tsx (new homepage)
```

### Deprecate (mark but don't delete yet)

```
components/site/SiteHeader-new.tsx
components/site/SiteFooter-enterprise.tsx
components/site/SimpleHeader.tsx
components/layout/CompliantHeader.tsx
components/layout/CompliantFooter.tsx
components/layout/ModernFooter.tsx
components/CourseraStyleHeader.tsx
components/CourseraStyleFooter.tsx
components/DoceboHeader.tsx
components/SimpleHeader.tsx
components/SimpleFooter.tsx
components/Header.jsx
components/Footer.jsx
components/ui/Header-broken.tsx
components/FooterPageTemplate.tsx
```

---

## ⚠️ Risks & Mitigation

### Risk 1: Breaking Existing Pages

**Mitigation:**

- Test all major routes after header/footer changes
- Keep old components temporarily
- Gradual rollout

### Risk 2: Mobile Performance

**Mitigation:**

- Lazy load everything below fold
- Optimize images aggressively
- Test on real devices

### Risk 3: Navigation Complexity

**Mitigation:**

- Keep navigation simple
- Max 2 levels deep
- Clear labels

---

## ✅ Next Steps

1. **Review this audit** - Confirm approach
2. **Examine MainHeader and SiteHeader** - Pick best patterns
3. **Create MarketingHeader/Footer** - Shared base components
4. **Build homepage sections** - Following Regus structure
5. **Test responsive** - Mobile, tablet, desktop
6. **Optimize performance** - Images, videos, fonts
7. **Document** - Create verification doc

---

**Status:** 📋 AUDIT COMPLETE - Ready for implementation planning  
**Next:** Review MainHeader and SiteHeader code to determine best base
