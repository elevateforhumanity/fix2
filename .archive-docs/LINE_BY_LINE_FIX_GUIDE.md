# Line-by-Line Fix Guide

**Generated:** $(date)
**Priority:** Fix in order listed (highest risk first)

---

## 🚨 CRITICAL FIXES - DO THESE FIRST

### Fix #1: app/onboarding/start/OnboardingFlow.tsx:194

**Current (BROKEN):**

```tsx
window.location.reload();
```

**Fixed:**

```tsx
if (typeof window !== 'undefined') {
  window.location.reload();
}
```

**Why:** Crashes on server-side rendering

---

### Fix #2: app/verify-email/page.tsx:19

**Current (BROKEN):**

```tsx
const params = new URLSearchParams(window.location.search);
```

**Fixed:**

```tsx
const params =
  typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search)
    : new URLSearchParams();
```

**Why:** Crashes on SSR, breaks email verification

---

### Fix #3: app/apply/track/page.tsx:69

**Current (BROKEN):**

```tsx
const params = new URLSearchParams(window.location.search);
```

**Fixed:**

```tsx
const params =
  typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search)
    : new URLSearchParams();
```

**Why:** Application tracking breaks on SSR

---

### Fix #4: app/apply/QuickApplyFormClient.tsx:125

**Current (BROKEN):**

```tsx
window.location.href = `/apply/success?${params.toString()}`;
```

**Fixed:**

```tsx
if (typeof window !== 'undefined') {
  window.location.href = `/apply/success?${params.toString()}`;
}
```

**Why:** Application submission fails on SSR

---

### Fix #5: app/apply/ApplyFormClient.tsx:27

**Current (BROKEN):**

```tsx
const params = new URLSearchParams(window.location.search);
```

**Fixed:**

```tsx
const params =
  typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search)
    : new URLSearchParams();
```

**Why:** Main application form breaks

---

## 🔴 HIGH PRIORITY FIXES

### Fix #6: app/student/courses/scorm/[courseId]/SCORMPlayer.tsx:52-53

**Current (BROKEN):**

```tsx
window.addEventListener('message', handleMessage);
return () => window.removeEventListener('message', handleMessage);
```

**Fixed:**

```tsx
useEffect(() => {
  if (typeof window === 'undefined') return;

  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}, []);
```

**Why:** SCORM courses crash on load

---

### Fix #7: app/components/FeatureTour.tsx:13

**Current (BROKEN):**

```tsx
const hasSeenTour = localStorage.getItem('hasSeenFeatureTour');
```

**Fixed:**

```tsx
const hasSeenTour =
  typeof window !== 'undefined'
    ? localStorage.getItem('hasSeenFeatureTour')
    : null;
```

**Why:** Feature tour crashes on SSR

---

### Fix #8: app/admin/dev-studio/page.tsx:73

**Current (BROKEN):**

```tsx
const storedToken = localStorage.getItem('gh_token');
```

**Fixed:**

```tsx
const storedToken =
  typeof window !== 'undefined' ? localStorage.getItem('gh_token') : null;
```

**Why:** Dev studio crashes without token

---

### Fix #9: components/compliance/CookieConsentBanner.tsx:28

**Current (BROKEN):**

```tsx
const consent = localStorage.getItem('cookie_consent');
```

**Fixed:**

```tsx
const consent =
  typeof window !== 'undefined'
    ? (() => {
        try {
          return localStorage.getItem('cookie_consent');
        } catch {
          return null; // Safari private mode
        }
      })()
    : null;
```

**Why:** Cookie banner crashes in Safari private mode

---

### Fix #10: app/api/webhooks/partners/[partner]/route.ts:55

**Current (BROKEN):**

```tsx
const payload: WebhookPayload = JSON.parse(rawBody);
```

**Fixed:**

```tsx
let payload: WebhookPayload;
try {
  payload = JSON.parse(rawBody);
} catch (err) {
  console.error('Invalid webhook payload:', err);
  return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
}
```

**Why:** Malicious webhooks can crash server

---

## 🟡 MEDIUM PRIORITY FIXES

### Fix #11-30: Unhandled Promises

**Pattern (BROKEN):**

```tsx
fetch('/api/endpoint')
  .then((res) => res.json())
  .then((data) => setData(data));
```

**Fixed:**

```tsx
fetch('/api/endpoint')
  .then((res) => res.json())
  .then((data) => setData(data))
  .catch((err) => {
    console.error('Failed to load data:', err);
    setData([]);
  });
```

**Files to fix:**

- app/staff-portal/campaigns/page.tsx:26-27
- app/staff-portal/campaigns/page.tsx:31-32
- app/program-holder/campaigns/page.tsx:26-27
- app/program-holder/campaigns/page.tsx:31-32
- app/test-enrollment/page.tsx:19-20
- app/courses/[courseId]/learn/ResourceSection.tsx:26-27
- app/lms/(app)/dashboard/page.tsx:79
- app/lms/(app)/layout.tsx:22
- And 63 more...

---

## 🟢 LOW PRIORITY FIXES

### Fix #31-106: Console.log Usage

**Pattern (WRONG):**

```tsx
console.error('Failed to load:', error);
```

**Fixed:**

```tsx
import { logger } from '@/lib/logger';
logger.error('Failed to load data', { error });
```

**Files to fix:**

- app/booking/page.tsx:63
- app/apply/QuickApplyFormClient.tsx:138
- app/apply/ApplyFormClient.tsx:86
- And 73 more...

---

## 📋 AUTOMATED FIX SCRIPT

Create this file: `scripts/auto-fix-exceptions.sh`

```bash
#!/bin/bash

echo "Fixing unsafe window access..."

# Fix pattern 1: window.location.search
find app/ components/ -name "*.tsx" -type f -exec sed -i \
  's/new URLSearchParams(window\.location\.search)/typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams()/g' {} \;

# Fix pattern 2: window.location.href assignments
find app/ components/ -name "*.tsx" -type f -exec sed -i \
  's/window\.location\.href = /if (typeof window !== "undefined") window.location.href = /g' {} \;

# Fix pattern 3: window.location.reload()
find app/ components/ -name "*.tsx" -type f -exec sed -i \
  's/window\.location\.reload()/if (typeof window !== "undefined") window.location.reload()/g' {} \;

echo "Fixing unsafe localStorage..."

# Fix localStorage.getItem
find app/ components/ -name "*.tsx" -type f -exec sed -i \
  's/localStorage\.getItem(/typeof window !== "undefined" ? localStorage.getItem(/g' {} \;

echo "Done! Review changes with: git diff"
```

**Usage:**

```bash
chmod +x scripts/auto-fix-exceptions.sh
./scripts/auto-fix-exceptions.sh
git diff  # Review changes
git add -A
git commit -m "Auto-fix unsafe window and localStorage access"
```

---

## 🛠️ MANUAL FIX CHECKLIST

### Phase 1: Critical (2 hours)

- [ ] Fix app/onboarding/start/OnboardingFlow.tsx:194
- [ ] Fix app/verify-email/page.tsx:19
- [ ] Fix app/apply/track/page.tsx:69
- [ ] Fix app/apply/QuickApplyFormClient.tsx:125
- [ ] Fix app/apply/ApplyFormClient.tsx:27
- [ ] Fix app/student/courses/scorm/[courseId]/SCORMPlayer.tsx:52-53
- [ ] Fix app/components/FeatureTour.tsx:13
- [ ] Fix app/admin/dev-studio/page.tsx:73
- [ ] Fix components/compliance/CookieConsentBanner.tsx:28
- [ ] Fix app/api/webhooks/partners/[partner]/route.ts:55

### Phase 2: High Priority (4 hours)

- [ ] Fix all localStorage access (42 instances)
- [ ] Fix all JSON.parse calls (17 instances)
- [ ] Add error boundaries to major routes (10 files)

### Phase 3: Medium Priority (8 hours)

- [ ] Fix all unhandled promises (71 instances)
- [ ] Fix remaining window access (310 instances)

### Phase 4: Low Priority (2 hours)

- [ ] Replace console.log with logger (76 instances)

### Phase 5: Long Term (40+ hours)

- [ ] Add null checks (4,293 instances)

---

## 🎯 QUICK WINS (30 minutes)

### 1. Create Safe Wrappers

**File:** `lib/safe-browser.ts`

```typescript
export const safeWindow = <T>(fn: (window: Window) => T, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    return fn(window);
  } catch {
    return fallback;
  }
};

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    return safeWindow((w) => w.localStorage.getItem(key), null);
  },
  setItem: (key: string, value: string): boolean => {
    return safeWindow((w) => {
      w.localStorage.setItem(key, value);
      return true;
    }, false);
  },
};
```

### 2. Use Safe Wrappers

**Before:**

```tsx
const token = localStorage.getItem('auth_token');
```

**After:**

```tsx
import { safeLocalStorage } from '@/lib/safe-browser';
const token = safeLocalStorage.getItem('auth_token');
```

---

## 📊 PROGRESS TRACKER

Track your fixes:

```bash
# Count remaining issues
echo "Window access: $(grep -r 'window\.' app/ components/ --include='*.tsx' | grep -v 'typeof window' | wc -l)"
echo "localStorage: $(grep -r 'localStorage' app/ components/ --include='*.tsx' | grep -v 'typeof window' | wc -l)"
echo "Unhandled promises: $(grep -r '\.then(' app/ components/ --include='*.tsx' | grep -v '\.catch' | wc -l)"
echo "Console.log: $(grep -r 'console\.log\|console\.error' app/ components/ --include='*.tsx' | wc -l)"
```

---

## ✅ VERIFICATION

After fixes, test:

```bash
# Build test
npm run build

# Type check
npm run typecheck

# Lint
npm run lint

# Start dev server
npm run dev
```

**Manual tests:**

1. Visit /apply - should not crash
2. Visit /verify-email - should not crash
3. Visit /student/courses - should not crash
4. Open in Safari private mode - should work
5. Disable JavaScript - should show content

---

**Generated:** $(date)
**Total Fixes Needed:** 4,800+
**Estimated Time:** 60+ hours
**Start with:** Critical fixes (2 hours)
