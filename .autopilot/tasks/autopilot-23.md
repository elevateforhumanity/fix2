# Autopilot 23 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/authAdapter.ts:2:10 TS2724 — '"./supabaseServer"' has no exported member named 'createSupabaseServerClient'. Did you mean 'getSupabaseServerClient'?
- lib/autopilot/course-normalizer.ts:62:21 TS2339 — Property 'forEach' does not exist on type 'unknown'.
- lib/dataExport.ts:431:21 TS2352 — Conversion of type '{ first_name: any; last_name: any; email: any; }[]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/invoicing.ts:433:19 TS2352 — Conversion of type 'jsPDF' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/partners/careersafe.ts:111:46 TS2339 — Property 'get' does not exist on type 'unknown'.
- lib/partners/hsi.ts:48:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/jri.ts:132:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/nds.ts:44:47 TS2554 — Expected 1-2 arguments, but got 3.
- lib/payments.ts:438:61 TS2339 — Property 'current_period_end' does not exist on type 'string'.
- lib/scorm/scorm-api.ts:147:23 TS2339 — Property 'LMSGetLastError' does not exist on type 'unknown'.
- app/api/cron/end-of-day-summary/route.ts:94:43 TS2339 — Property 'full_name' does not exist on type '{ id: any; email: any; full_name: any; }[]'.
- app/api/enroll/route.ts:76:40 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/github/repos/route.ts:45:41 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/hr/time-entries/[id]/route.ts:37:14 TS2339 — Property 'regular_hours' does not exist on type 'unknown'.
- app/api/milady-rise/enroll/route.ts:38:34 TS2339 — Property 'partner_code' does not exist on type '{ name: string; provider: string; courses: any[]; }'.
- app/api/onboarding/submit/route.ts:222:50 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/social-media/generate/route.ts:128:52 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/track-usage/route.ts:144:32 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Record<string, any>'.
- app/board/dashboard/page.tsx:207:48 TS2339 — Property 'title' does not exist on type '{ title: any; }[]'.
- app/portal/student/calendar/page.tsx:41:10 TS2786 — 'Image' cannot be used as a JSX component.
- app/shop/dashboard/page.tsx:41:25 TS2339 — Property 'id' does not exist on type 'any[]'.
- app/tax-filing/locations/[state]/page.tsx:156:28 TS2304 — Cannot find name 'state'.
- components/home/HeroVideo.tsx:82:19 TS7030 — Not all code paths return a value.
- components/ui/Toast.tsx:21:13 TS7030 — Not all code paths return a value.
- app/api/reports/caseload/route.ts:127:22 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/reports/wioa/route.ts:10:9 TS2352 — Conversion of type 'Session' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/courses/save/route.ts:22:26 TS2339 — Property 'slug' does not exist on type 'unknown'.
- app/api/ai/instructor/route.ts:100:48 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
