# Navigation Implementation Guide

## ✅ Files Created

1. **`config/navigation-clean.ts`** - Clean navigation structure
   - Public navigation (6 items max)
   - Authenticated navigation (dashboard links)
   - Admin navigation (admin-only links)
   - `getNavigation()` function for role-based rendering

## 🔧 Implementation Steps

### Step 1: Update SiteHeader Component

**File:** `components/site/SiteHeader.tsx`

Add at the top:

```typescript
import { getNavigation } from '@/config/navigation-clean';
import { useUser } from '@supabase/auth-helpers-react'; // or your auth hook
```

Replace navigation rendering:

```typescript
export default function SiteHeader() {
  const user = useUser(); // Get current user
  const navigation = getNavigation(user); // Get role-based nav

  return (
    <header>
      {/* Desktop Nav */}
      <nav>
        {navigation.map(section => (
          <NavItem key={section.label} section={section} />
        ))}
      </nav>

      {/* Mobile Nav */}
      <MobileMenu navigation={navigation} />
    </header>
  );
}
```

### Step 2: Update Mobile Navigation

**File:** `components/site/MobileNav.tsx`

Ensure mobile menu uses the same navigation:

```typescript
export default function MobileNav({ isOpen, onClose }) {
  const user = useUser();
  const navigation = getNavigation(user);

  // Mobile shows all 6 items
  return (
    <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
      {navigation.map(section => (
        <MobileNavItem key={section.label} section={section} />
      ))}
    </div>
  );
}
```

### Step 3: Test Authentication Flow

**Logged Out User Sees:**

1. Programs
2. Funding
3. For You
4. Apply
5. Login
6. More

**Logged In User Sees:**

1. Programs
2. Funding
3. For You
4. Apply
5. Dashboard (replaces Login)
6. More

**Admin User Sees:**

1. Programs
2. Funding
3. For You
4. Apply
5. Dashboard
6. Admin
7. More

## 📱 Mobile Optimization

### Touch Targets

All mobile nav links should be ≥ 44px:

```css
.mobile-nav-link {
  min-height: 44px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  font-size: 16px;
}
```

### Menu Overlay

```css
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background: white;
  overflow-y: auto;
}
```

### Body Scroll Lock

```typescript
useEffect(() => {
  if (mobileMenuOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  return () => {
    document.body.style.overflow = '';
  };
}, [mobileMenuOpen]);
```

## 🧪 Testing Checklist

### Desktop

- [ ] 6 nav items visible when logged out
- [ ] "Login" button visible when logged out
- [ ] "Dashboard" replaces "Login" when logged in
- [ ] "Admin" appears for admin users only
- [ ] Dropdowns work on hover
- [ ] All links functional

### Mobile (≤ 768px)

- [ ] Hamburger menu opens/closes
- [ ] 6 items visible when logged out
- [ ] "Dashboard" replaces "Login" when logged in
- [ ] Touch targets ≥ 44px
- [ ] No scroll issues
- [ ] Menu closes on link click

### Authentication

- [ ] Logged-out user cannot see dashboard links
- [ ] Logged-in user sees dashboard dropdown
- [ ] Admin user sees admin dropdown
- [ ] Navigation updates immediately on login/logout

## 🚀 Quick Implementation

If you want to implement this immediately:

1. **Backup current navigation:**

   ```bash
   cp config/navigation.ts config/navigation-old.ts
   ```

2. **Replace navigation import in SiteHeader:**

   ```typescript
   // Old
   import { headerNav } from '@/config/navigation';

   // New
   import { getNavigation } from '@/config/navigation-clean';
   ```

3. **Add user hook:**

   ```typescript
   const user = useUser(); // or your auth method
   const navigation = getNavigation(user);
   ```

4. **Use `navigation` instead of `headerNav`**

5. **Test and deploy**

## 📊 Before vs After

### Before (10 items - TOO MANY)

```
Programs
Funding
For Students
For Employers
For Partners
Dashboards ❌ (exposed to all)
Student Portal ❌ (exposed to all)
LMS ❌ (exposed to all)
Community
Services
Resources
About
```

### After (6 items - PERFECT)

```
Programs
Funding
For You (consolidated)
Apply
Login (or Dashboard if logged in)
More (Community, Services, Resources, About)
```

## ✅ Success Criteria

- [ ] Navigation has ≤ 6 top-level items
- [ ] Dashboard links hidden from logged-out users
- [ ] "For You" consolidates all role paths
- [ ] Mobile menu is smooth and responsive
- [ ] Authentication flow works correctly
- [ ] No security issues (no exposed admin links)

## 🔒 Security Notes

**CRITICAL:** Never expose these to logged-out users:

- `/admin/*`
- `/student/dashboard`
- `/instructor/dashboard`
- `/partner/dashboard`
- Any dashboard or portal links

**Safe for public:**

- `/apply`
- `/programs`
- `/funding`
- `/about`
- `/contact`

## 📝 Next Steps

1. ✅ Clean navigation config created
2. ⏳ Update SiteHeader component
3. ⏳ Update MobileNav component
4. ⏳ Test authentication flow
5. ⏳ Deploy and verify

---

**Status:** Configuration ready, implementation pending  
**Files:** `config/navigation-clean.ts` created  
**Next:** Update SiteHeader.tsx to use new navigation
