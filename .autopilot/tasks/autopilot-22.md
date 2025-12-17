# Autopilot 22 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/apiAdapter.ts:1:10 TS2724 — '"./supabaseServer"' has no exported member named 'createSupabaseServerClient'. Did you mean 'getSupabaseServerClient'?
- lib/autopilot/link-checker.ts:9:21 TS2339 — Property 'forEach' does not exist on type 'unknown'.
- lib/dataExport.ts:386:55 TS2339 — Property 'title' does not exist on type 'string'.
- lib/invoicing.ts:433:34 TS2339 — Property 'lastAutoTable' does not exist on type 'string'.
- lib/partners/careersafe.ts:106:54 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/hsi.ts:61:47 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/jri.ts:131:57 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nds.ts:54:57 TS2554 — Expected 1-2 arguments, but got 3.
- lib/payments.ts:438:37 TS2352 — Conversion of type 'Response<Subscription>' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/scorm/scorm-api.ts:148:23 TS2339 — Property 'GetLastError' does not exist on type 'unknown'.
- app/api/cron/end-of-day-summary/route.ts:80:54 TS2339 — Property 'name' does not exist on type '{ id: any; name: any; }[]'.
- app/api/enroll/route.ts:131:47 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/github/file/route.ts:162:24 TS2339 — Property 'status' does not exist on type 'unknown'.
- app/api/hr/time-entries/[id]/route.ts:38:14 TS2339 — Property 'total_hours' does not exist on type 'unknown'.
- app/api/milady-rise/enroll/route.ts:37:27 TS2339 — Property 'certification' does not exist on type '{ name: string; provider: string; courses: any[]; }'.
- app/api/onboarding/submit/route.ts:265:45 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/social-media/campaigns/route.ts:52:46 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/track-usage/route.ts:204:24 TS2304 — Cannot find name 'OFFICIAL_DOMAINS'.
- app/board/dashboard/page.tsx:204:83 TS2339 — Property 'email' does not exist on type '{ full_name: any; email: any; }[]'.
- app/portal/student/calendar/page.tsx:59:14 TS2304 — Cannot find name 'Link'.
- app/programs/page.tsx:48:30 TS2339 — Property 'description' does not exist on type 'Program'.
- app/tax-filing/locations/[state]/page.tsx:162:43 TS2304 — Cannot find name 'state'.
- components/home/HeroVideo.tsx:79:22 TS7030 — Not all code paths return a value.
- app/api/analytics/dropout-risk/route.ts:68:30 TS2769 — No overload matches this call.
- app/api/reports/caseload/route.ts:126:25 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/reports/wioa/route.ts:10:28 TS2339 — Property 'isAdmin' does not exist on type 'string'.
- app/api/courses/save/route.ts:21:30 TS2339 — Property 'metadata' does not exist on type 'unknown'.
- app/api/ai/job-match/route.ts:76:38 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
