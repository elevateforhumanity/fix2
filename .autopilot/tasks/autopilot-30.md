# Autopilot 30 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/autopilot/autopilot.ts:31:23 TS7030 — Not all code paths return a value.
- lib/autopilot/autopilot.ts:187:23 TS7030 — Not all code paths return a value.
- lib/dataExport.ts:434:54 TS2339 — Property 'course' does not exist on type 'string'.
- lib/integrations/sso-microsoft.ts:373:23 TS7030 — Not all code paths return a value.
- lib/partners/careersafe.ts:186:62 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/certiport.ts:188:66 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/jri.ts:189:59 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/milady.ts:241:63 TS2554 — Expected 1-2 arguments, but got 3.
- lib/rateLimiter.ts:78:21 TS2339 — Property 'ip' does not exist on type 'string'.
- lib/scorm/scorm-api.ts:83:25 TS2339 — Property 'GetValue' does not exist on type 'unknown'.
- app/api/cron/missed-checkins/route.ts:89:45 TS2339 — Property 'full_name' does not exist on type '{ id: any; email: any; full_name: any; }[]'.
- app/api/email/workflows/route.ts:19:47 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/grade/upsert/route.ts:55:52 TS2339 — Property 'instructor_id' does not exist on type 'string'.
- app/api/hr/leave-requests/[id]/route.ts:73:51 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/milady/auto-enroll/route.ts:72:43 TS2339 — Property 'id' does not exist on type 'PartnerAccount'.
- app/api/onboarding/route.ts:67:35 TS2352 — Conversion of type 'Session' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/social-media/scheduler/route.ts:289:45 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/supersonic-fast-cash/upload/route.ts:7:36 TS2551 — Property 'FormData' does not exist on type 'Request'. Did you mean 'formData'?
- app/delegate/dashboard/page.tsx:247:49 TS2339 — Property 'full_name' does not exist on type '{ full_name: any; email: any; }[]'.
- app/portal/employer/page.tsx:87:20 TS2304 — Cannot find name 'employer'.
- app/signup/SignupForm.tsx:79:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/tax-filing/locations/[state]/page.tsx:72:62 TS2304 — Cannot find name 'state'.
- components/lms/AdvancedQuizBuilder.tsx:514:15 TS2322 — Type 'unknown' is not assignable to type 'string | number | readonly string[]'.
- components/student/ScormPlayer.tsx:108:15 TS2352 — Conversion of type 'Window & typeof globalThis' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/reports/usage/delegate/route.ts:100:25 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/reports/wioa-quarterly/route.ts:238:38 TS2339 — Property 'retained90Days' does not exist on type 'unknown'.
- app/api/cert/bulk-issue/route.ts:62:23 TS2339 — Property 'course_id' does not exist on type 'unknown'.
- app/api/ai/chat/route.ts:117:39 TS2339 — Property 'system_prompt' does not exist on type '{ system_prompt: any; name: any; }[]'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
