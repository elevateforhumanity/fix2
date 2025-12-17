# Autopilot 13 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/admin/bulk-import.ts:68:16 TS2339 — Property 'phone' does not exist on type 'unknown'.
- lib/collaboration/yjs-provider.ts:79:35 TS2339 — Property 'getStates' does not exist on type 'unknown'.
- lib/dataExport.ts:293:86 TS2339 — Property 'last_name' does not exist on type 'string'.
- lib/native/native-features.ts:346:98 TS2352 — Conversion of type 'Navigator' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/partners/careersafe.ts:35:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/hsi.ts:127:46 TS2339 — Property 'get' does not exist on type 'unknown'.
- lib/partners/jri.ts:54:57 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nds.ts:131:57 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nrf.ts:150:46 TS2339 — Property 'get' does not exist on type 'unknown'.
- lib/validateRequest.ts:20:28 TS2339 — Property 'errors' does not exist on type 'ZodError<unknown>'.
- app/api/cm/learners/[id]/route.ts:102:25 TS2352 — Conversion of type '{ title: any; slug: any; }[]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/exams/start/route.ts:28:41 TS2339 — Property 'userId' does not exist on type 'string'.
- app/api/github/file/route.ts:59:24 TS2339 — Property 'status' does not exist on type 'unknown'.
- app/api/impact/summary/route.ts:64:18 TS2538 — Type 'unknown' cannot be used as an index type.
- app/api/media/enhance-video-full/route.ts:152:29 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Record<string, any>'.
- app/api/payments/create-session/route.ts:14:7 TS2322 — Type '"2024-11-20.acacia"' is not assignable to type '"2025-10-29.clover"'.
- app/api/referrals/route.ts:146:43 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/v1/courses/route.ts:181:32 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/webhooks/stripe/route.ts:137:53 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Record<string, any>'.
- app/portal/student/calendar/page.tsx:288:17 TS2304 — Cannot find name 'Link'.
- app/portal/student/settings/page.tsx:303:17 TS2304 — Cannot find name 'Link'.
- app/tax-filing/locations/[state]/page.tsx:267:24 TS2304 — Cannot find name 'state'.
- app/workforce-board/dashboard/page.tsx:262:48 TS2339 — Property 'title' does not exist on type '{ title: any; }[]'.
- app/api/analytics/reports/caseload/route.ts:128:25 TS2339 — Property 'title' does not exist on type 'unknown'.
- app/api/analytics/reports/wioa-quarterly/route.ts:239:46 TS2339 — Property 'retentionRate90' does not exist on type 'unknown'.
- app/api/admin/program-holders/update/route.ts:20:15 TS2339 — Property 'status' does not exist on type 'unknown'.
- app/api/courses/[courseId]/route.ts:145:42 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/affirm/transactions/route.ts:187:25 TS2339 — Property 'id' does not exist on type 'unknown'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
