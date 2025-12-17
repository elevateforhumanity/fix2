# Autopilot 05 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/actions/enrollments.ts:403:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/course-validation.ts:7:36 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/dataExport.ts:40:66 TS2339 — Property 'format' does not exist on type 'string'.
- lib/offline/sync.ts:19:16 TS2352 — Conversion of type 'ServiceWorkerRegistration' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/partner-workflows/enrollment.ts:214:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/hsi.ts:203:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/hybrid-enrollment.ts:225:13 TS2339 — Property 'approved_at' does not exist on type 'unknown'.
- lib/partners/nds.ts:189:59 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nrf.ts:82:58 TS2554 — Expected 1-2 arguments, but got 3.
- lib/xapi/video.ts:61:12 TS2352 — Conversion of type '{ extensions: { "https://w3id.org/xapi/video/extensions/time": number; "https://w3id.org/xapi/video/extensions/length": number; }; }' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/checkout/product/route.ts:16:5 TS2322 — Type '"2024-12-18.acacia"' is not assignable to type '"2025-10-29.clover"'.
- app/api/export/route.ts:199:22 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/github/branches/route.ts:41:24 TS2339 — Property 'status' does not exist on type 'unknown'.
- app/api/lti/launch/route.ts:27:25 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/marketing/campaigns/route.ts:92:53 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/payroll/export/route.ts:66:42 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/quizzes/save/route.ts:74:40 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/v1/users/route.ts:154:59 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/webhooks/partners/[partner]/route.ts:124:27 TS2304 — Cannot find name 'supabase'.
- app/portal/student/notifications/page.tsx:196:9 TS2607 — JSX element class does not support attributes because it does not have a 'props' property.
- app/portal/student/settings/page.tsx:52:15 TS2304 — Cannot find name 'Link'.
- app/tax-filing/locations/[state]/page.tsx:325:55 TS2304 — Cannot find name 'state'.
- app/tax-filing/locations/[state]/page.tsx:410:24 TS2304 — Cannot find name 'state'.
- app/api/analytics/reports/usage/route.ts:157:25 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/analytics/reports/wioa-quarterly/route.ts:231:36 TS2339 — Property 'totalEmployed' does not exist on type 'unknown'.
- app/api/admin/sso/route.ts:23:47 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/courses/[courseId]/announcements/route.ts:57:18 TS2345 — Argument of type 'PostgrestError' is not assignable to parameter of type 'string'.
- app/api/stripe/webhook/route.ts:241:29 TS2339 — Property 'current_period_end' does not exist on type 'Subscription'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
