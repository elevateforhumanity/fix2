# Autopilot 11 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/admin/bulk-import.ts:62:16 TS2339 — Property 'email' does not exist on type 'unknown'.
- lib/collaboration/yjs-provider.ts:104:20 TS2339 — Property 'on' does not exist on type 'unknown'.
- lib/dataExport.ts:293:42 TS2339 — Property 'first_name' does not exist on type 'string'.
- lib/notifications/push-service.ts:56:17 TS2339 — Property 'statusCode' does not exist on type 'unknown'.
- lib/partner-workflows/payments.ts:130:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/hsi.ts:155:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/jri.ts:33:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/nds.ts:141:50 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nrf.ts:136:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/video/adaptive-streaming.ts:171:23 TS2352 — Conversion of type 'Navigator' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/cm/learners/[id]/route.ts:97:28 TS2352 — Conversion of type '{ title: any; slug: any; }[]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/exams/submit/route.ts:29:31 TS2352 — Conversion of type 'Session' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/github/file/route.ts:54:45 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/impact/summary/route.ts:82:15 TS2538 — Type 'unknown' cannot be used as an index type.
- app/api/marketing/send-welcome/route.ts:29:50 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/payments/route.ts:114:16 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/referrals/route.ts:125:65 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/v1/enrollments/route.ts:92:59 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/webhooks/stripe/route.ts:97:71 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/portal/student/notifications/page.tsx:145:17 TS2607 — JSX element class does not support attributes because it does not have a 'props' property.
- app/portal/student/settings/page.tsx:297:17 TS2304 — Cannot find name 'Link'.
- app/tax-filing/locations/[state]/page.tsx:279:24 TS2304 — Cannot find name 'state'.
- app/workforce-board/dashboard/page.tsx:257:49 TS2339 — Property 'full_name' does not exist on type '{ full_name: any; email: any; }[]'.
- app/api/analytics/reports/usage/delegate/route.ts:94:19 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'string'.
- app/api/analytics/reports/wioa-quarterly/route.ts:237:38 TS2339 — Property 'retained30Days' does not exist on type 'unknown'.
- app/api/admin/program-holders/update/route.ts:26:17 TS2339 — Property 'mou_signed_at' does not exist on type 'unknown'.
- app/api/courses/[courseId]/route.ts:51:41 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/autopilots/build-courses/route.ts:111:41 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
