# Autopilot 21 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/admin/bulk-import.ts:287:24 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/autopilot/runner.ts:19:36 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'string'.
- lib/dataExport.ts:386:20 TS2352 — Conversion of type '{ title: any; }[]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/native/native-features.ts:56:36 TS2352 — Conversion of type 'Window & typeof globalThis & Record<"BarcodeDetector", unknown>' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/partners/careersafe.ts:97:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/hsi.ts:71:57 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/jri.ts:104:46 TS2339 — Property 'get' does not exist on type 'unknown'.
- lib/partners/nds.ts:55:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/payments.ts:437:63 TS2339 — Property 'current_period_start' does not exist on type 'string'.
- lib/scorm/scorm-api.ts:158:23 TS2339 — Property 'LMSGetErrorString' does not exist on type 'unknown'.
- app/api/cron/end-of-day-summary/route.ts:79:54 TS2339 — Property 'email' does not exist on type '{ id: any; email: any; full_name: any; }[]'.
- app/api/enroll/route.ts:136:16 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/github/file/route.ts:161:21 TS2339 — Property 'status' does not exist on type 'unknown'.
- app/api/hr/time-entries/[id]/route.ts:52:48 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/milady-rise/enroll/route.ts:22:38 TS2339 — Property 'certification' does not exist on type '{ name: string; provider: string; courses: any[]; }'.
- app/api/partner-courses/create-checkout/route.ts:9:7 TS2322 — Type '"2024-11-20.acacia"' is not assignable to type '"2025-10-29.clover"'.
- app/api/social-media/campaigns/route.ts:19:47 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/track-usage/route.ts:216:23 TS2304 — Cannot find name 'OFFICIAL_DOMAINS'.
- app/board/dashboard/page.tsx:204:49 TS2339 — Property 'full_name' does not exist on type '{ full_name: any; email: any; }[]'.
- app/portal/student/calendar/page.tsx:64:15 TS2304 — Cannot find name 'Link'.
- app/programs/page.tsx:47:23 TS2339 — Property 'title' does not exist on type 'Program'.
- app/tax-filing/locations/[state]/page.tsx:174:20 TS2304 — Cannot find name 'state'.
- components/home/HeroVideo.tsx:27:20 TS7030 — Not all code paths return a value.
- app/api/analytics/dropout-risk/route.ts:71:30 TS2769 — No overload matches this call.
- app/api/reports/caseload/route.ts:121:19 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'string'.
- app/api/admin/learner/info/route.ts:33:29 TS2345 — Argument of type '(req: Request, context: Record<string, unknown>, user: Record<string, unknown>) => Promise<Response>' is not assignable to parameter of type 'AuthHandler<Record<string, string>>'.
- app/api/courses/metadata/route.ts:46:15 TS2339 — Property 'status' does not exist on type 'unknown'.
- app/api/ai/tutor/route.ts:81:37 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
