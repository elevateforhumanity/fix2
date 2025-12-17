# Autopilot 20 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/admin/bulk-import.ts:96:14 TS2339 — Property 'email' does not exist on type 'unknown'.
- lib/autopilot/runner.ts:32:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/dataExport.ts:344:58 TS2339 — Property 'category' does not exist on type 'string'.
- lib/native/native-features.ts:56:54 TS2339 — Property 'BarcodeDetector' does not exist on type 'string'.
- lib/partners/careersafe.ts:96:66 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/hsi.ts:72:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/jri.ts:101:47 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nds.ts:65:49 TS2554 — Expected 1-2 arguments, but got 3.
- lib/payments.ts:437:39 TS2352 — Conversion of type 'Response<Subscription>' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/scorm/scorm-api.ts:159:23 TS2339 — Property 'GetErrorString' does not exist on type 'unknown'.
- app/api/cron/end-of-day-summary/route.ts:78:53 TS2339 — Property 'full_name' does not exist on type '{ id: any; email: any; full_name: any; }[]'.
- app/api/events/[id]/register/route.ts:88:54 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/github/file/route.ts:157:47 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/hr/time-entries/[id]/route.ts:76:48 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/milady-rise/enroll/route.ts:21:34 TS2339 — Property 'partner_code' does not exist on type '{ name: string; provider: string; courses: any[]; }'.
- app/api/partner-courses/create-checkout/route.ts:62:7 TS2769 — No overload matches this call.
- app/api/shop/apply/route.ts:101:13 TS2304 — Cannot find name 'resend'.
- app/api/tutorials/route.ts:23:29 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/blog/page.tsx:36:43 TS2304 — Cannot find name 'supabase'.
- app/portal/student/calendar/page.tsx:65:14 TS2304 — Cannot find name 'Link'.
- app/programs/page.tsx:5:10 TS2614 — Module '"@/components/StructuredData"' has no exported member 'StructuredData'. Did you mean to use 'import StructuredData from "@/components/StructuredData"' instead?
- app/tax-filing/locations/[state]/page.tsx:180:20 TS2304 — Cannot find name 'state'.
- components/editor/Terminal.tsx:57:78 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/analytics/dropout-risk/route.ts:79:30 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/analytics/reports/wioa/route.ts:10:28 TS2339 — Property 'isAdmin' does not exist on type 'string'.
- app/api/admin/learner/notes/route.ts:40:29 TS2339 — Property 'title' does not exist on type 'unknown'.
- app/api/courses/metadata/route.ts:44:41 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/affirm/checkout/route.ts:59:34 TS2339 — Property 'email' does not exist on type 'unknown'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
