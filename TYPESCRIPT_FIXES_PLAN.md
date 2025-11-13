# TypeScript Fixes Plan

## Summary
- **Total Errors:** 196
- **Primary Issue:** `createServerSupabaseClient()` returns Promise but used without await
- **Secondary Issue:** `cookies()` returns Promise but used without await

## Files to Fix

### Category 1: Missing await on createServerSupabaseClient()
1. app/admin/certificates/page.tsx
2. app/admin/dashboard/page.tsx (11 instances)
3. app/delegate/dashboard/page.tsx (4 instances)
4. app/lms/attendance/page.tsx (2 instances)
5. app/lms/certificates/page.tsx (2 instances)
6. app/lms/courses/[id]/page.tsx (3 instances)
7. app/lms/dashboard/page.tsx (1 instance)
8. app/lms/quizzes/[quizId]/results/[attemptId]/page.tsx

### Category 2: Missing await on cookies()
1. app/api/certificates/generate/route.ts
2. app/api/emails/certificate/route.ts
3. app/api/emails/welcome/route.ts
4. app/cert/verify/[code]/page.tsx

### Category 3: Array access issues (data is array, accessing as object)
1. app/api/certificates/generate/route.ts
2. app/api/cron/inactivity-reminders/route.ts
3. app/api/emails/certificate/route.ts
4. app/api/emails/welcome/route.ts
5. app/lms/courses/[id]/lessons/[lessonId]/page.tsx

### Category 4: Other type issues
1. app/admin/dashboard/page.tsx (arithmetic operation)
2. app/api/admin/program-holders/mou/route.ts (missing property)
3. app/api/cert/pdf/route.tsx (ReadableStream type)
4. app/api/program-holder/mou-pdf/route.ts (Uint8Array type)

## Fix Strategy

1. **Backup:** Create git branch before changes
2. **Fix Category 1:** Add await to all createServerSupabaseClient() calls
3. **Fix Category 2:** Add await to all cookies() calls
4. **Fix Category 3:** Add proper array indexing (.single() or [0])
5. **Fix Category 4:** Handle edge cases individually
6. **Verify:** Run typecheck after each category
7. **Test:** Run build to ensure no runtime issues
