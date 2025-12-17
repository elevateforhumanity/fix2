# Autopilot 08 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/actions/enrollments.ts:470:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/course-completion.ts:60:38 TS2339 — Property 'title' does not exist on type 'unknown'.
- lib/dataExport.ts:155:40 TS2352 — Conversion of type '{ key: string; label: string; }' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/offline/service-worker-manager.ts:105:57 TS2339 — Property 'sync' does not exist on type 'string'.
- lib/partner-workflows/enrollment.ts:408:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/hsi.ts:188:60 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/hybrid-enrollment.ts:272:41 TS2339 — Property 'delivery_mode' does not exist on type '{ delivery_mode: any; }[]'.
- lib/partners/nds.ts:164:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/nrf.ts:103:55 TS2554 — Expected 1-2 arguments, but got 3.
- lib/video/adaptive-streaming.ts:185:44 TS2339 — Property 'connection' does not exist on type 'string'.
- app/api/checkout/student/route.ts:14:5 TS2322 — Type '"2024-12-18.acacia"' is not assignable to type '"2025-10-29.clover"'.
- app/api/export/route.ts:98:25 TS2352 — Conversion of type '{ action: any; actor_id: any; resource_type: "enrollments" | "courses" | "assignments" | "grades" | "students" | "analytics"; metadata: { format: string; record_count: number; filters: Record<...>; }; }' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/github/commit/route.ts:49:24 TS2339 — Property 'status' does not exist on type 'unknown'.
- app/api/license-request/route.ts:60:11 TS2304 — Cannot find name 'resend'.
- app/api/marketing/contacts/route.ts:47:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/payroll/export/route.ts:65:17 TS2339 — Property 'external_payroll_id' does not exist on type 'unknown'.
- app/api/referrals/route.ts:59:67 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/v1/users/route.ts:77:32 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/webhooks/partners/[partner]/route.ts:179:27 TS2304 — Cannot find name 'supabase'.
- app/portal/student/notifications/page.tsx:176:17 TS2304 — Cannot find name 'Link'.
- app/portal/student/settings/page.tsx:266:17 TS2607 — JSX element class does not support attributes because it does not have a 'props' property.
- app/tax-filing/locations/[state]/page.tsx:299:34 TS2304 — Cannot find name 'state'.
- app/tax-filing/locations/[state]/page.tsx:428:35 TS2304 — Cannot find name 'state'.
- app/api/analytics/reports/usage/delegate/route.ts:102:25 TS2339 — Property 'title' does not exist on type 'unknown'.
- app/api/analytics/reports/wioa-quarterly/route.ts:234:34 TS2339 — Property 'medianWage' does not exist on type 'unknown'.
- app/api/admin/setup-contacts/route.ts:239:34 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/courses/[courseId]/check-completion/route.ts:98:18 TS2345 — Argument of type 'PostgrestError' is not assignable to parameter of type 'string'.
- app/api/stripe/webhook/route.ts:62:5 TS2322 — Type '"2024-12-18.acacia"' is not assignable to type '"2025-10-29.clover"'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
