# Application Form Diagnostic Report

## Issue: Application form not submitting + pages being blocked

### Step 1: Application Form Check ✅

**Form Location:** `/app/apply/page.tsx` → `ApplyFormClient.tsx`

**API Endpoint:** `/app/api/inquiries/route.ts`

**Form Flow:**

1. User fills form → submits to `/api/inquiries`
2. API uses `createAdminClient()` (bypasses RLS)
3. Inserts into `applications` table
4. Sends confirmation emails

**Code Status:** ✅ Form code looks correct

### Step 2: RLS Policies Check ✅

**Latest Migration:** `20241219_secure_applications_policies.sql`

**Policies in place:**

1. ✅ `anon_can_insert_applications` - Allows anonymous form submissions
2. ✅ `authenticated_admins_can_select_applications` - Admins can view
3. ✅ `authenticated_admins_can_update_applications` - Admins can edit
4. ✅ `authenticated_admins_can_delete_applications` - Admins can delete

**RLS Status:** ✅ Enabled with correct policies

### Step 3: Admin Client Check ✅

**File:** `lib/supabase/admin.ts`

**Uses:** `SUPABASE_SERVICE_ROLE_KEY` (bypasses RLS)

**Status:** ✅ Admin client configured correctly

### Step 4: Blocking Overlay Check ⚠️

**Potential Issues Found:**

1. **Mobile menu overlay** (`components/site/SimpleHeader.tsx`):
   - Uses `fixed inset-0 z-[100]` when open
   - Sets `document.body.style.overflow = 'hidden'` when open
   - **Potential issue:** If menu state gets stuck, overlay stays mounted

2. **Body overflow in globals.css:**
   - Multiple `overflow: hidden` rules found
   - Could be conflicting with mobile menu

### Step 5: Likely Root Causes

**Most Likely:**

1. **Mobile menu state stuck** - If `mobileMenuOpen` is true but menu appears closed, the overlay is blocking clicks
2. **Body overflow stuck** - If `document.body.style.overflow = 'hidden'` wasn't cleaned up, page is locked

**Less Likely:** 3. API endpoint failing silently 4. RLS policy blocking (but admin client should bypass) 5. Rate limiting (but should show error)

## Diagnostic Steps to Run

### Test 1: Check if body overflow is stuck

```javascript
// In browser console:
console.log(document.body.style.overflow);
// Should be empty or 'auto', NOT 'hidden'
```

### Test 2: Check for blocking overlays

```javascript
// In browser console:
document.querySelectorAll('.fixed.inset-0').forEach((el) => {
  console.log('Found overlay:', el);
  console.log('Z-index:', window.getComputedStyle(el).zIndex);
});
```

### Test 3: Force reset body overflow

```javascript
// In browser console:
document.body.style.overflow = '';
document.documentElement.style.overflow = '';
```

### Test 4: Check mobile menu state

```javascript
// In browser console (React DevTools):
// Find SimpleHeader component and check mobileMenuOpen state
```

### Test 5: Test API directly

```bash
curl -X POST https://www.elevateforhumanity.org/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"555-1234","program":"test"}'
```

## Immediate Fixes to Try

### Fix 1: Force cleanup body overflow (Quick)

Add to `components/site/SimpleHeader.tsx`:

```tsx
useEffect(() => {
  // Cleanup on unmount
  return () => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  };
}, []);
```

### Fix 2: Remove stuck overlays (Quick)

Add defensive check in SimpleHeader:

```tsx
useEffect(() => {
  if (!mobileMenuOpen) {
    // Force cleanup when menu closes
    document.body.style.overflow = '';
  }
}, [mobileMenuOpen]);
```

### Fix 3: Add z-index fix to form page (Quick)

In `app/apply/page.tsx`, add:

```tsx
<div className="relative z-[101]">{/* Form content */}</div>
```

## Next Steps

1. **Check browser console** for JavaScript errors
2. **Inspect element** on the form page - look for invisible overlays
3. **Test form submission** with browser DevTools Network tab open
4. **Check if body overflow is stuck** using Test 1 above
5. **Try Fix 1 or Fix 2** to force cleanup

## Questions to Answer

1. **When did this start?** After the navigation changes?
2. **Which pages are blocked?** Just /apply or all pages?
3. **Mobile or desktop?** Or both?
4. **Can you click anything?** Or is entire page unresponsive?
5. **Browser console errors?** Any red errors showing?

## Status

- ✅ Form code is correct
- ✅ API endpoint is correct
- ✅ RLS policies are correct
- ⚠️ Possible overlay/scroll lock issue
- ❓ Need to test in browser to confirm

**Most likely fix:** Force cleanup body overflow in SimpleHeader component
