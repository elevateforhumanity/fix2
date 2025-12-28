# Specific Issues - Detailed Breakdown

**Date:** December 28, 2025  
**Total Issues:** 4,800+

---

## 🔴 1. UNSAFE WINDOW ACCESS (320 instances)

### Critical Files:

#### `app/onboarding/start/OnboardingFlow.tsx:194`
```tsx
// ❌ WRONG - Crashes on SSR
window.location.reload();

// ✅ FIX
if (typeof window !== 'undefined') {
  window.location.reload();
}
```

#### `app/verify-email/page.tsx:19`
```tsx
// ❌ WRONG - Crashes on SSR
const params = new URLSearchParams(window.location.search);

// ✅ FIX
const params = typeof window !== 'undefined' 
  ? new URLSearchParams(window.location.search)
  : new URLSearchParams();
```

#### `app/diagnostic/page.tsx:20-22`
```tsx
// ❌ WRONG - Crashes on SSR
windowSize: `${window.innerWidth}x${window.innerHeight}`,
url: window.location.href,

// ✅ FIX
windowSize: typeof window !== 'undefined' 
  ? `${window.innerWidth}x${window.innerHeight}`
  : 'N/A',
url: typeof window !== 'undefined' ? window.location.href : '',
```

#### `app/student/courses/scorm/[courseId]/SCORMPlayer.tsx:52-53`
```tsx
// ❌ WRONG - No SSR check
window.addEventListener('message', handleMessage);
return () => window.removeEventListener('message', handleMessage);

// ✅ FIX
useEffect(() => {
  if (typeof window === 'undefined') return;
  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}, []);
```

### All 320 Instances:

**Top 20 Files:**
1. `app/onboarding/start/OnboardingFlow.tsx` - window.location.reload()
2. `app/shop/reports/page.tsx` - window.URL.createObjectURL()
3. `app/enroll/PayNowSection.tsx` - window.location.href
4. `app/verify-email/page.tsx` - window.location.search
5. `app/student/courses/scorm/[courseId]/SCORMPlayer.tsx` - window.addEventListener
6. `app/student/dashboard/PartnerEnrollmentsSection.tsx` - window.open()
7. `app/diagnostic/page.tsx` - window.innerWidth/innerHeight
8. `app/apply/track/page.tsx` - window.location.search
9. `app/apply/QuickApplyFormClient.tsx` - window.location.href
10. `app/apply/ApplyFormClient.tsx` - window.location.search
11. `app/apply/full/WIOAApplicationForm.tsx` - window.scrollTo()
12. And 309 more...

---

## 🔴 2. UNHANDLED PROMISES (71 instances)

### Critical Files:

#### `app/staff-portal/campaigns/page.tsx:26-27`
```tsx
// ❌ WRONG - No error handling
fetch('/api/email/templates')
  .then((res) => res.json())
  .then((data) => setTemplates(data.templates || []));

// ✅ FIX
fetch('/api/email/templates')
  .then((res) => res.json())
  .then((data) => setTemplates(data.templates || []))
  .catch((err) => {
    console.error('Failed to load templates:', err);
    setTemplates([]);
  });
```

#### `app/verify-email/page.tsx:26`
```tsx
// ❌ WRONG - No error handling
supabase.auth.getUser().then(({ data }) => {
  if (data.user) setUser(data.user);
});

// ✅ FIX
supabase.auth.getUser()
  .then(({ data }) => {
    if (data.user) setUser(data.user);
  })
  .catch((err) => {
    console.error('Failed to get user:', err);
  });
```

#### `app/student/dashboard/PartnerEnrollmentsSection.tsx:15`
```tsx
// ❌ WRONG - No error handling
const fetcher = (url: string) => fetch(url).then((r) => r.json());

// ✅ FIX
const fetcher = (url: string) => 
  fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .catch((err) => {
      console.error('Fetch failed:', err);
      throw err;
    });
```

### All 71 Instances:

**Top 20 Files:**
1. `app/staff-portal/campaigns/page.tsx` - 4 unhandled promises
2. `app/program-holder/campaigns/page.tsx` - 4 unhandled promises
3. `app/verify-email/page.tsx` - 1 unhandled promise
4. `app/student/dashboard/PartnerEnrollmentsSection.tsx` - 1 unhandled promise
5. `app/test-enrollment/page.tsx` - 2 unhandled promises
6. `app/courses/[courseId]/learn/ResourceSection.tsx` - 2 unhandled promises
7. `app/courses/[courseId]/lessons/[lessonId]/quiz/take/page.tsx` - 2 unhandled promises
8. `app/lms/(app)/dashboard/page.tsx` - 2 unhandled promises
9. `app/lms/(app)/layout.tsx` - 2 unhandled promises
10. And 51 more...

---

## 🔴 3. UNSAFE LOCALSTORAGE (42 instances)

### Critical Files:

#### `app/components/FeatureTour.tsx:13`
```tsx
// ❌ WRONG - Crashes on SSR
const hasSeenTour = localStorage.getItem('hasSeenFeatureTour');

// ✅ FIX
const hasSeenTour = typeof window !== 'undefined'
  ? localStorage.getItem('hasSeenFeatureTour')
  : null;
```

#### `app/admin/dev-studio/page.tsx:73`
```tsx
// ❌ WRONG - Crashes on SSR
const storedToken = localStorage.getItem('gh_token');

// ✅ FIX
const storedToken = typeof window !== 'undefined'
  ? localStorage.getItem('gh_token')
  : null;
```

#### `components/onboarding/OnboardingTour.tsx:27`
```tsx
// ❌ WRONG - Crashes on SSR
const hasSeenTour = localStorage.getItem(`tour_${tourKey}_completed`);

// ✅ FIX
const hasSeenTour = typeof window !== 'undefined'
  ? localStorage.getItem(`tour_${tourKey}_completed`)
  : null;
```

#### `components/compliance/CookieConsentBanner.tsx:28`
```tsx
// ❌ WRONG - Crashes on SSR, no try-catch
const consent = localStorage.getItem('cookie_consent');

// ✅ FIX
const consent = typeof window !== 'undefined'
  ? (() => {
      try {
        return localStorage.getItem('cookie_consent');
      } catch {
        return null; // Safari private mode
      }
    })()
  : null;
```

### All 42 Instances:

**Files with localStorage:**
1. `app/components/FeatureTour.tsx` - 2 instances
2. `app/admin/dev-studio/page.tsx` - 3 instances
3. `components/onboarding/OnboardingTour.tsx` - 3 instances
4. `components/compliance/CookieConsentBanner.tsx` - 6 instances
5. `components/NotificationPrompt.tsx` - 2 instances
6. `components/InvisibleWatermark.tsx` - 5 instances
7. `components/programs/ProgramBanner.tsx` - 2 instances
8. `components/CookieConsent.tsx` - 7 instances
9. `components/PWAInstallPrompt.tsx` - 2 instances
10. `components/enrollment/ComprehensiveEnrollmentWizard.tsx` - 2 instances
11. And 8 more files...

---

## 🔴 4. UNSAFE JSON.PARSE (17 instances)

### Critical Files:

#### `app/api/preview/render/route.ts:128`
```tsx
// ❌ WRONG - Can throw exception
const parsed = JSON.parse(raw);

// ✅ FIX
try {
  const parsed = JSON.parse(raw);
} catch (err) {
  console.error('Invalid JSON:', err);
  return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
}
```

#### `app/api/webhooks/partners/[partner]/route.ts:55`
```tsx
// ❌ WRONG - Malicious webhook can crash server
const payload: WebhookPayload = JSON.parse(rawBody);

// ✅ FIX
let payload: WebhookPayload;
try {
  payload = JSON.parse(rawBody);
} catch (err) {
  console.error('Invalid webhook payload:', err);
  return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
}
```

#### `app/api/courses/metadata/route.ts:42`
```tsx
// ❌ WRONG - Can crash API
const metadata = JSON.parse(raw);

// ✅ FIX
try {
  const metadata = JSON.parse(raw);
} catch (err) {
  return NextResponse.json({ error: 'Invalid metadata' }, { status: 400 });
}
```

#### `components/compliance/CookieConsentBanner.tsx:35`
```tsx
// ❌ WRONG - Corrupted localStorage crashes component
const saved = JSON.parse(consent);

// ✅ FIX
try {
  const saved = JSON.parse(consent);
} catch {
  // Reset corrupted data
  localStorage.removeItem('cookie_consent');
  return null;
}
```

### All 17 Instances:

**API Routes (10):**
1. `app/api/preview/render/route.ts:128`
2. `app/api/webhooks/partners/[partner]/route.ts:55`
3. `app/api/courses/metadata/route.ts:42`
4. `app/api/autopilot/route.ts:38`
5. `app/api/media/enhance-video/route.ts:125`
6. `app/api/autopilots/build-courses/route.ts:24`
7. `app/api/social-media/generate/route.ts:124`
8. `app/api/recaps/generate/route.ts:93`
9. `app/api/ai/generate-course/route.ts:74`
10. `app/api/analytics/dropout-risk/route.ts:108,113`

**Components (7):**
11. `app/api/export/route.ts:55`
12. `components/compliance/CookieConsentBanner.tsx:35`
13. `components/upload/AdvancedFileUpload.tsx:134`
14. `components/programs/ProgramBanner.tsx:67`
15. `components/enrollment/ComprehensiveEnrollmentWizard.tsx:201`
16. `components/apprenticeship/HourTracker.tsx:29`

---

## 🟡 5. CONSOLE.LOG USAGE (76 instances)

### Should Use Logger Instead:

#### `app/booking/page.tsx:63`
```tsx
// ❌ WRONG - Should use logger
console.error('Failed to load instructors:', error);

// ✅ FIX
import { logger } from '@/lib/logger';
logger.error('Failed to load instructors', { error });
```

#### `app/apply/QuickApplyFormClient.tsx:138`
```tsx
// ❌ WRONG - Leaks sensitive data
console.error('Application submission error:', err);

// ✅ FIX
logger.error('Application submission failed', { 
  errorMessage: err.message,
  // Don't log full error (may contain PII)
});
```

### All 76 Instances:

**Top 30 Files:**
1. `app/booking/page.tsx` - 1 instance
2. `app/diagnostic/page.tsx` - 4 instances (intentional for diagnostics)
3. `app/apply/QuickApplyFormClient.tsx` - 1 instance
4. `app/apply/ApplyFormClient.tsx` - 1 instance
5. `app/program-holder/onboarding/setup/page.tsx` - 1 instance
6. `app/program-holder/documents/page.tsx` - 3 instances
7. `app/program-holder/settings/notifications/NotificationPreferencesForm.tsx` - 1 instance
8. `app/program-holder/error.tsx` - 1 instance
9. `app/(dashboard)/org/invites/page.tsx` - 4 instances
10. `app/(dashboard)/org/create/page.tsx` - 1 instance
11. `app/api/staff/campaigns/send/route.ts` - 1 instance
12. `app/api/program-holder/apply/route.ts` - 5 instances
13. `app/api/program-holder/students/decline/route.ts` - 3 instances
14. `app/api/program-holder/students/accept/route.ts` - 3 instances
15. `app/api/applications/route.ts` - 2 instances
16. And 46 more...

---

## 🔴 6. MISSING NULL CHECKS (4,293 instances)

### Common Patterns:

#### Pattern 1: Event Handler Access
```tsx
// ❌ WRONG - e.target can be null
onChange={(e) => setSearchId(e.target.value)}

// ✅ FIX
onChange={(e) => setSearchId(e.target?.value || '')}
```

#### Pattern 2: Nested Object Access
```tsx
// ❌ WRONG - user or profile can be undefined
const name = user.profile.name;

// ✅ FIX
const name = user?.profile?.name;
```

#### Pattern 3: Array Access
```tsx
// ❌ WRONG - array can be empty
const first = items[0].name;

// ✅ FIX
const first = items[0]?.name;
```

#### Pattern 4: API Response
```tsx
// ❌ WRONG - response.data can be null
const users = response.data.users;

// ✅ FIX
const users = response?.data?.users || [];
```

### Sample Files:

**Most Critical:**
1. `app/page.tsx` - 100+ instances (SVG paths, event handlers)
2. `app/apply/program-holder/page.tsx` - 50+ instances (form handlers)
3. `app/apply/track/page.tsx` - 20+ instances
4. All form components - 1000+ instances
5. All API routes - 500+ instances
6. All dashboard pages - 800+ instances

---

## 🔴 7. MISSING ERROR BOUNDARIES

### Current Coverage (Only 5):

1. `app/error.tsx` - Root error boundary
2. `app/not-found.tsx` - 404 handler
3. `app/program-holder/error.tsx` - Program holder portal
4. `app/(dashboard)/error.tsx` - Dashboard (if exists)
5. `app/lms/error.tsx` - LMS (if exists)

### Missing Error Boundaries:

**Critical Routes Without Protection:**
- `app/apply/*` - Application forms (HIGH RISK)
- `app/student/*` - Student portal (HIGH RISK)
- `app/staff-portal/*` - Staff portal (HIGH RISK)
- `app/admin/*` - Admin panel (HIGH RISK)
- `app/courses/*` - Course pages (MEDIUM RISK)
- `app/programs/*` - Program pages (MEDIUM RISK)
- `app/onboarding/*` - Onboarding flows (HIGH RISK)
- `app/booking/*` - Booking system (MEDIUM RISK)
- `app/shop/*` - Shop/payments (HIGH RISK)
- `app/enroll/*` - Enrollment (HIGH RISK)

**Recommendation:** Add error.tsx to each major route segment

---

## 📊 Priority Matrix

| Issue | Count | Files | Severity | Fix Time |
|-------|-------|-------|----------|----------|
| Missing null checks | 4,293 | 500+ | 🔴 HIGH | 40+ hours |
| Unsafe window | 320 | 50+ | 🔴 HIGH | 8 hours |
| Console.log | 76 | 30+ | 🟡 MEDIUM | 2 hours |
| Unhandled promises | 71 | 20+ | 🔴 HIGH | 4 hours |
| Unsafe localStorage | 42 | 10+ | 🔴 HIGH | 2 hours |
| Unsafe JSON.parse | 17 | 15+ | 🔴 HIGH | 1 hour |
| Missing error boundaries | Many | 10+ | 🔴 HIGH | 3 hours |

---

## 🛠️ Quick Fix Script

### Create Safe Wrappers (15 minutes)

**File:** `lib/safe.ts`
```typescript
// Safe window access
export const safeWindow = <T>(
  fn: (window: Window) => T,
  fallback: T
): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    return fn(window);
  } catch {
    return fallback;
  }
};

// Safe localStorage
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

// Safe JSON.parse
export const safeJSONParse = <T>(
  json: string,
  fallback: T
): T => {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
};

// Safe fetch
export const safeFetch = async <T>(
  url: string,
  options?: RequestInit
): Promise<{ data: T | null; error: Error | null }> => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
};
```

---

## ✅ Immediate Actions

### 1. Add Global Error Handler (5 min)
```tsx
// app/layout.tsx
useEffect(() => {
  if (typeof window === 'undefined') return;
  
  window.addEventListener('unhandledrejection', (e) => {
    logger.error('Unhandled promise rejection', { reason: e.reason });
  });
  
  window.addEventListener('error', (e) => {
    logger.error('Global error', { error: e.error });
  });
}, []);
```

### 2. Add Error Boundaries (30 min)
Create `error.tsx` in:
- `app/apply/error.tsx`
- `app/student/error.tsx`
- `app/staff-portal/error.tsx`
- `app/admin/error.tsx`
- `app/enroll/error.tsx`

### 3. Replace Critical localStorage (1 hour)
Use safe wrapper in:
- Cookie consent components
- Feature tour components
- Auth token storage

### 4. Fix Critical JSON.parse (30 min)
Add try-catch to:
- All webhook handlers
- All API routes
- Cookie consent parsing

---

**Generated:** December 28, 2025  
**Total Issues:** 4,800+  
**Estimated Fix Time:** 60+ hours  
**Priority:** Start with error boundaries and safe wrappers
