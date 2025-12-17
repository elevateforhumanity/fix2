# Autopilot 07 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/actions/enrollments.ts:455:9 TS2698 — Spread types may only be created from object types.
- lib/course-completion.ts:60:50 TS2339 — Property 'partner_name' does not exist on type 'unknown'.
- lib/dataExport.ts:155:30 TS2339 — Property 'format' does not exist on type 'string'.
- lib/offline/service-worker-manager.ts:181:16 TS2345 — Argument of type 'string' is not assignable to parameter of type 'SyncEvent'.
- lib/partner-workflows/enrollment.ts:336:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/hsi.ts:189:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/hybrid-enrollment.ts:236:17 TS2339 — Property 'certificate_number' does not exist on type 'unknown'.
- lib/partners/nds.ts:175:55 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nrf.ts:94:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/with-auth.ts:21:30 TS2339 — Property 'get' does not exist on type 'Promise<ReadonlyRequestCookies>'.
- app/api/checkout/route.ts:99:55 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/export/route.ts:197:25 TS2345 — Argument of type 'string' is not assignable to parameter of type 'AuditLogEntry'.
- app/api/github/commit/route.ts:48:21 TS2339 — Property 'status' does not exist on type 'unknown'.
- app/api/lti/launch/route.ts:25:26 TS2339 — Property 'iss' does not exist on type 'unknown'.
- app/api/marketing/contacts/route.ts:45:51 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/payroll/export/route.ts:65:52 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/referrals/route.ts:47:66 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/v1/users/route.ts:78:59 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/webhooks/partners/[partner]/route.ts:165:9 TS2304 — Cannot find name 'supabase'.
- app/portal/student/notifications/page.tsx:177:16 TS2304 — Cannot find name 'Link'.
- app/portal/student/settings/page.tsx:58:15 TS2304 — Cannot find name 'Link'.
- app/tax-filing/locations/[state]/page.tsx:313:34 TS2304 — Cannot find name 'state'.
- app/tax-filing/locations/[state]/page.tsx:416:30 TS2304 — Cannot find name 'state'.
- app/api/analytics/reports/usage/route.ts:152:19 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'string'.
- app/api/analytics/reports/wioa-quarterly/route.ts:233:37 TS2339 — Property 'employmentRate' does not exist on type 'unknown'.
- app/api/admin/setup-contacts/route.ts:242:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/courses/[courseId]/check-completion/route.ts:59:18 TS2345 — Argument of type 'PostgrestError' is not assignable to parameter of type 'string'.
- app/api/stripe/webhook/route.ts:185:15 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Record<string, any>'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
