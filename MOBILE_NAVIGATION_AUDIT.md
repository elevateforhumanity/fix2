# Mobile Navigation & Menu Audit

## 🔍 Issues Found

### 1. ❌ CRITICAL: Dashboard Links Exposed to Logged-Out Users
**Location:** `config/navigation.ts` - Dashboards section

**Problem:**
- All dashboard links visible in navigation for everyone
- Admin, Student, LMS, Partner dashboards should be auth-gated
- Violates security and UX best practices

**Current State:**
```typescript
{
  label: 'Dashboards',
  items: [
    { label: 'Student Dashboard', href: '/student/dashboard' },
    { label: 'Admin Dashboard', href: '/admin' },
    { label: 'LMS Dashboard', href: '/lms/dashboard' },
    // ... 11 more dashboard links
  ],
}
```

**Required Fix:**
- Remove "Dashboards" from public navigation
- Show dashboard links ONLY after authentication
- Use role-based rendering in header component

---

### 2. ⚠️ Mobile Menu Too Large
**Problem:**
- 10 top-level navigation items
- Spec requires ≤ 6 top-level items on mobile
- Causes scroll fatigue and confusion

**Current Top-Level Items:**
1. Programs ✅
2. Funding ✅
3. For Students ✅
4. For Employers ✅
5. For Partners ✅
6. Dashboards ❌ (should be auth-gated)
7. Community ⚠️ (move to "More")
8. Services ⚠️ (move to "More")
9. Resources ⚠️ (move to "More")
10. About ✅

**Recommended Structure:**
1. Programs
2. Funding
3. For You (role-based dropdown)
4. Apply
5. Login
6. More (Community, Services, Resources, About)

---

### 3. ⚠️ "For You" Section Confusion
**Problem:**
- Split into 3 separate menus: "For Students", "For Employers", "For Partners"
- Spec calls for single "For You" with role-based content
- Takes up 3 navigation slots instead of 1

**Current:**
```
- For Students
- For Employers  
- For Partners
```

**Should Be:**
```
- For You
  - Students (Apply, Career Services, etc.)
  - Employers (Hire, Partner, etc.)
  - Agencies (Demo, Platform, etc.)
```

---

## ✅ Recommended Fixes

### Fix 1: Auth-Gate Dashboard Links

**File:** `components/site/SiteHeader.tsx`

Add authentication check:

```typescript
'use client';

import { useUser } from '@/hooks/useUser'; // or your auth hook

export default function SiteHeader() {
  const { user, isLoading } = useUser();
  
  // Filter navigation based on auth
  const visibleNav = headerNav.filter(section => {
    if (section.label === 'Dashboards') {
      return !!user; // Only show if authenticated
    }
    return true;
  });

  return (
    // Use visibleNav instead of headerNav
  );
}
```

---

### Fix 2: Consolidate Mobile Navigation

**File:** `config/navigation.ts`

```typescript
export const headerNav: NavSection[] = [
  {
    label: 'Programs',
    href: '/programs',
    items: [/* ... */],
  },
  {
    label: 'Funding',
    href: '/funding',
    items: [/* ... */],
  },
  {
    label: 'For You',
    items: [
      // Students Section
      { label: '👨‍🎓 For Students', href: '/learners', isHeader: true },
      { label: 'Apply Now', href: '/apply' },
      { label: 'Career Services', href: '/career-services' },
      { label: 'Mentorship', href: '/mentorship' },
      
      // Employers Section
      { label: '💼 For Employers', href: '/employers', isHeader: true },
      { label: 'Hire Graduates', href: '/hire-graduates' },
      { label: 'Partner With Us', href: '/partners' },
      
      // Agencies Section
      { label: '🏢 For Agencies', href: '/partners', isHeader: true },
      { label: 'Request Demo', href: '/contact' },
      { label: 'Platform License', href: '/platform' },
    ],
  },
  {
    label: 'Apply',
    href: '/apply',
  },
  {
    label: 'Login',
    href: '/login',
  },
  {
    label: 'More',
    items: [
      { label: 'Community', href: '/community' },
      { label: 'Services', href: '/services' },
      { label: 'Resources', href: '/resources' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

// Authenticated-only navigation (shown after login)
export const authenticatedNav: NavSection[] = [
  {
    label: 'Dashboard',
    items: [
      { label: 'My Dashboard', href: '/dashboard' },
      { label: 'My Courses', href: '/student/courses' },
      { label: 'My Applications', href: '/student/applications' },
    ],
  },
];
```

---

### Fix 3: Mobile Menu Component

**File:** `components/site/MobileNav.tsx`

```typescript
export default function MobileNav({ isOpen, onClose, user }) {
  const navItems = user ? [...headerNav, ...authenticatedNav] : headerNav;
  
  // Limit to 6 items on mobile
  const mobileNav = navItems.slice(0, 6);
  
  return (
    <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
      {mobileNav.map(section => (
        <MobileNavItem key={section.label} section={section} />
      ))}
    </div>
  );
}
```

---

## 🧪 Testing Checklist

### Desktop Navigation
- [ ] All 10 sections visible when logged out
- [ ] "Dashboards" section hidden when logged out
- [ ] "Dashboards" section visible when logged in
- [ ] Dropdowns work on hover
- [ ] No broken links

### Mobile Navigation (≤ 768px)
- [ ] ≤ 6 top-level items visible
- [ ] Hamburger menu opens/closes smoothly
- [ ] No scroll issues when menu is open
- [ ] "Dashboards" hidden when logged out
- [ ] "For You" consolidates all role paths
- [ ] "More" menu contains Community, Services, Resources

### Authentication Flow
- [ ] Logged-out user sees: Programs, Funding, For You, Apply, Login, More
- [ ] Logged-in user sees: Programs, Funding, For You, Dashboard, More, Logout
- [ ] Admin sees additional admin links in Dashboard dropdown
- [ ] Student sees student-specific links in Dashboard dropdown

---

## 📱 Mobile-Specific Issues

### Issue 1: Menu Overlay Z-Index
**Problem:** Mobile menu may be behind other elements

**Fix:**
```css
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background: white;
}
```

### Issue 2: Body Scroll Lock
**Problem:** Page scrolls behind open menu

**Fix:** Already implemented in `SiteHeader.tsx`:
```typescript
useEffect(() => {
  if (mobileMenuOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}, [mobileMenuOpen]);
```

### Issue 3: Touch Targets Too Small
**Problem:** Links < 44px touch target

**Fix:**
```css
.mobile-nav-link {
  min-height: 44px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
}
```

---

## 🚀 Implementation Priority

### Phase 1: Security (CRITICAL)
1. ✅ Hide dashboard links for logged-out users
2. ✅ Add authentication check to header component
3. ✅ Test auth flow

### Phase 2: UX (HIGH)
1. ✅ Consolidate "For You" section
2. ✅ Reduce mobile nav to ≤ 6 items
3. ✅ Move Community/Services/Resources to "More"

### Phase 3: Polish (MEDIUM)
1. ✅ Fix touch targets
2. ✅ Improve mobile menu animations
3. ✅ Add role-based dashboard links

---

## 📊 Current vs Recommended

### Current Navigation (10 items)
```
Programs
Funding
For Students
For Employers
For Partners
Dashboards ❌
Community
Services
Resources
About
```

### Recommended Navigation (6 items)
```
Programs
Funding
For You (consolidated)
Apply
Login
More (Community, Services, Resources, About)
```

### After Login (6 items)
```
Programs
Funding
For You
Dashboard (role-based)
More
Logout
```

---

## ✅ Success Criteria

- [ ] No dashboard links visible to logged-out users
- [ ] Mobile navigation has ≤ 6 top-level items
- [ ] "For You" consolidates all role paths
- [ ] Authentication flow works correctly
- [ ] Mobile menu is smooth and responsive
- [ ] All touch targets are ≥ 44px
- [ ] No scroll issues on mobile

---

**Status:** Audit Complete  
**Next Step:** Implement Phase 1 (Security) fixes immediately
