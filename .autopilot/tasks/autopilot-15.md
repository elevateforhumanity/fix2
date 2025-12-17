# Autopilot 15 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/admin/bulk-import.ts:76:16 TS2339 — Property 'studentNumber' does not exist on type 'unknown'.
- lib/billing/licenseAllows.ts:16:17 TS2339 — Property 'license' does not exist on type 'OrgConfig'.
- lib/dataExport.ts:295:54 TS2339 — Property 'email' does not exist on type 'string'.
- lib/native/native-features.ts:346:59 TS2352 — Conversion of type 'Navigator' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/partners/careersafe.ts:58:64 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/hsi.ts:115:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/jri.ts:65:49 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nds.ts:101:47 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nrf.ts:170:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/stripe-config.ts:21:5 TS2322 — Type '"2024-11-20.acacia"' is not assignable to type '"2025-10-29.clover"'.
- app/api/cm/learners/[id]/route.ts:103:24 TS2352 — Conversion of type '{ title: any; slug: any; }[]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/events/route.ts:95:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/github/file/route.ts:99:19 TS2339 — Property 'committer' does not exist on type 'unknown'.
- app/api/hsi/create-checkout/route.ts:87:44 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/media/enhance-video-full/route.ts:190:45 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/partners/enroll/route.ts:93:32 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/scorm/attempts/[attemptId]/data/route.ts:19:43 TS2339 — Property 'userId' does not exist on type 'string'.
- app/api/v1/courses/route.ts:113:32 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/webhooks/stripe/route.ts:254:47 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Record<string, any>'.
- app/portal/student/calendar/page.tsx:282:17 TS2304 — Cannot find name 'Link'.
- app/program-holder/sign-mou/SignMOUForm.tsx:52:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/tax-filing/locations/[state]/page.tsx:247:16 TS2304 — Cannot find name 'state'.
- components/animations/CountUp.tsx:28:20 TS2554 — Expected 1 arguments, but got 0.
- app/api/analytics/reports/caseload/route.ts:126:25 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/analytics/reports/wioa-quarterly/route.ts:243:31 TS2339 — Property 'male' does not exist on type 'unknown'.
- app/api/admin/program-holder-acknowledgements/route.ts:33:32 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/courses/complete/route.ts:58:46 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/affirm/transactions/route.ts:108:25 TS2339 — Property 'id' does not exist on type 'unknown'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
