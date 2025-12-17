# Autopilot 04 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/actions/enrollments.ts:359:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/credentials/credential-system.ts:215:5 TS2322 — Type '"National Registry of Emergency Medical Technicians"' is not assignable to type 'CredentialProvider'.
- lib/dataExport.ts:40:51 TS2352 — Conversion of type '{ key: string; label: string; }' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/offline/sync.ts:19:40 TS2339 — Property 'sync' does not exist on type 'string'.
- lib/partner-workflows/enrollment.ts:154:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/hsi.ts:214:59 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/hybrid-enrollment.ts:224:13 TS2339 — Property 'completed_at' does not exist on type 'unknown'.
- lib/partners/nds.ts:190:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/nrf.ts:73:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/xapi/video.ts:70:32 TS2345 — Argument of type '{ actor: XAPIActor; verb: { id: string; display: { "en-US": "completed" | "paused" | "seeked" | "initialized" | "played"; }; }; object: { id: string; objectType: "Activity"; definition: { ...; }; }; context: { ...; }; result: string; }' is not assignable to parameter of type 'XAPIStatement'.
- app/api/checkout/marketplace/route.ts:36:5 TS2322 — Type '"2024-12-18.acacia"' is not assignable to type '"2025-10-29.clover"'.
- app/api/funding/admin/list/route.ts:48:33 TS2339 — Property 'toLowerCase' does not exist on type 'unknown'.
- app/api/github/branches/route.ts:40:21 TS2339 — Property 'status' does not exist on type 'unknown'.
- app/api/lti/launch/route.ts:28:24 TS2339 — Property 'name' does not exist on type 'unknown'.
- app/api/marketing/campaigns/route.ts:38:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/payroll/export/route.ts:67:14 TS2769 — No overload matches this call.
- app/api/quizzes/[quizId]/route.ts:87:16 TS2538 — Type 'unknown' cannot be used as an index type.
- app/api/webhooks/marketplace/route.ts:12:3 TS2322 — Type '"2024-12-18.acacia"' is not assignable to type '"2025-10-29.clover"'.
- app/api/webhooks/partners/[partner]/route.ts:102:27 TS2304 — Cannot find name 'supabase'.
- app/portal/student/notifications/page.tsx:196:10 TS2786 — 'Image' cannot be used as a JSX component.
- app/portal/student/settings/page.tsx:47:14 TS2304 — Cannot find name 'Link'.
- app/tax-filing/locations/[state]/page.tsx:336:30 TS2304 — Cannot find name 'state'.
- app/tax-filing/locations/[state]/page.tsx:391:48 TS2304 — Cannot find name 'state'.
- app/api/analytics/reports/usage/route.ts:158:22 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/analytics/reports/wioa-quarterly/route.ts:230:37 TS2339 — Property 'completionRate' does not exist on type 'unknown'.
- app/api/admin/sso/route.ts:95:47 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/admin/vercel-hard-refresh/route.ts:66:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/billing/report-usage/route.ts:38:26 TS2352 — Conversion of type 'SubscriptionItemsResource' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
