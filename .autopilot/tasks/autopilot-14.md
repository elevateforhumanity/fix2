# Autopilot 14 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/admin/bulk-import.ts:72:16 TS2339 — Property 'dateOfBirth' does not exist on type 'unknown'.
- lib/collaboration/yjs-provider.ts:33:20 TS2339 — Property 'setLocalStateField' does not exist on type 'unknown'.
- lib/dataExport.ts:295:24 TS2352 — Conversion of type '{ first_name: any; last_name: any; email: any; }[]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/native/native-features.ts:346:80 TS2339 — Property 'mozConnection' does not exist on type 'string'.
- lib/partners/careersafe.ts:47:54 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/hsi.ts:124:47 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/jri.ts:55:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/nds.ts:104:46 TS2339 — Property 'get' does not exist on type 'unknown'.
- lib/partners/nrf.ts:169:68 TS2554 — Expected 1-2 arguments, but got 3.
- lib/stripe/client.ts:8:3 TS2322 — Type '"2024-12-18.acacia"' is not assignable to type '"2025-10-29.clover"'.
- app/api/cm/learners/[id]/route.ts:102:57 TS2339 — Property 'title' does not exist on type 'string'.
- app/api/exams/start/route.ts:28:22 TS2352 — Conversion of type 'Session' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/github/file/route.ts:94:19 TS2339 — Property 'sha' does not exist on type 'unknown'.
- app/api/hubspot/submit/route.ts:73:51 TS2353 — Object literal may only specify known properties, and 'data' does not exist in type 'Error'.
- app/api/media/enhance-video-full/route.ts:160:37 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Record<string, any>'.
- app/api/partners/mou/route.ts:60:32 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/scorm/attempts/[attemptId]/data/route.ts:19:24 TS2352 — Conversion of type 'Session' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/v1/courses/route.ts:179:17 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/webhooks/stripe/route.ts:176:60 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/portal/student/calendar/page.tsx:283:16 TS2304 — Cannot find name 'Link'.
- app/program-holder/apply/page.tsx:113:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/tax-filing/locations/[state]/page.tsx:261:24 TS2304 — Cannot find name 'state'.
- components/admin/VideoUploader.tsx:66:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/analytics/reports/caseload/route.ts:127:22 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/analytics/reports/wioa-quarterly/route.ts:242:33 TS2339 — Property 'female' does not exist on type 'unknown'.
- app/api/admin/program-holders/route.ts:42:29 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/courses/authoring/save/route.ts:83:42 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/affirm/transactions/route.ts:146:25 TS2339 — Property 'id' does not exist on type 'unknown'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
