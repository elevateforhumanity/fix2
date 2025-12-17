# Autopilot 12 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/admin/bulk-import.ts:65:16 TS2339 — Property 'role' does not exist on type 'unknown'.
- lib/collaboration/yjs-provider.ts:96:22 TS2339 — Property 'setLocalStateField' does not exist on type 'unknown'.
- lib/dataExport.ts:293:57 TS2352 — Conversion of type '{ first_name: any; last_name: any; email: any; }[]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/native/native-features.ts:346:119 TS2339 — Property 'webkitConnection' does not exist on type 'string'.
- lib/partners/careersafe.ts:30:53 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/hsi.ts:154:57 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/jri.ts:44:47 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nds.ts:132:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/nrf.ts:145:58 TS2554 — Expected 1-2 arguments, but got 3.
- lib/vendors/milady-payment.ts:10:3 TS2322 — Type '"2023-10-16"' is not assignable to type '"2025-10-29.clover"'.
- app/api/cm/learners/[id]/route.ts:97:60 TS2339 — Property 'id' does not exist on type 'string'.
- app/api/exams/start/route.ts:94:11 TS2322 — Type 'string' is not assignable to type 'ProctoringProvider'.
- app/api/github/file/route.ts:58:21 TS2339 — Property 'status' does not exist on type 'unknown'.
- app/api/impact/summary/route.ts:64:42 TS2538 — Type 'unknown' cannot be used as an index type.
- app/api/marketing/send-welcome/route.ts:31:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/payments/route.ts:38:54 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/referrals/route.ts:130:38 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/v1/enrollments/route.ts:91:32 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/webhooks/stripe/route.ts:113:51 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Error'.
- app/portal/student/courses/[courseId]/page.tsx:138:67 TS2322 — Type '{ courseId: string; userId: string; }' is not assignable to type 'IntrinsicAttributes & CourseProgressTrackerProps'.
- app/portal/student/settings/page.tsx:298:16 TS2304 — Cannot find name 'Link'.
- app/tax-filing/locations/[state]/page.tsx:273:24 TS2304 — Cannot find name 'state'.
- app/workforce-board/dashboard/page.tsx:258:50 TS2339 — Property 'email' does not exist on type '{ full_name: any; email: any; }[]'.
- app/api/analytics/reports/caseload/route.ts:129:40 TS2339 — Property 'code' does not exist on type 'unknown'.
- app/api/analytics/reports/wioa-quarterly/route.ts:238:38 TS2339 — Property 'retained90Days' does not exist on type 'unknown'.
- app/api/admin/program-holders/update/route.ts:24:15 TS2339 — Property 'mou_status' does not exist on type 'unknown'.
- app/api/courses/[courseId]/route.ts:100:42 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/autopilots/build-courses/route.ts:53:49 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
