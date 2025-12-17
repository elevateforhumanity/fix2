# Autopilot 01 Mission

Assigned errors: 27

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/actions/enrollments.ts:193:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/data/careers.ts:81:6 TS2339 — Property 'from' does not exist on type 'Promise<SupabaseClient<any, "public", "public", any, any>>'.
- lib/data/careers.ts:105:6 TS2339 — Property 'from' does not exist on type 'Promise<SupabaseClient<any, "public", "public", any, any>>'.
- lib/partner-workflows/certificates.ts:208:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partner-workflows/certificates.ts:265:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/http-client.ts:96:9 TS2322 — Type 'unknown' is not assignable to type 'T'.
- lib/partners/http-client.ts:103:17 TS2339 — Property 'name' does not exist on type 'unknown'.
- lib/partners/nrf.ts:46:55 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nrf.ts:56:65 TS2554 — Expected 1-2 arguments, but got 3.
- app/api/apply/route.ts:133:13 TS2304 — Cannot find name 'resend'.
- app/api/chat/ai-response/route.ts:86:54 TS2769 — No overload matches this call.
- app/api/funding/create-checkout/route.ts:10:3 TS2322 — Type '"2024-11-20.acacia"' is not assignable to type '"2025-10-29.clover"'.
- app/api/funding/create-checkout/route.ts:40:9 TS2353 — Object literal may only specify known properties, and 'studentId' does not exist in type 'Error'.
- app/api/lti/launch/route.ts:35:28 TS2339 — Property 'aud' does not exist on type 'unknown'.
- app/api/marketing/campaigns/[id]/send/route.ts:78:63 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/preview/render/route.ts:261:43 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/program-holders/acknowledgement/route.ts:38:32 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/webhooks/partners/[partner]/route.ts:39:28 TS2339 — Property 'verifyWebhookSignature' does not exist on type 'BasePartnerAPI'.
- app/api/webhooks/partners/[partner]/route.ts:56:17 TS2345 — Argument of type '{ event: any; timestamp: any; }' is not assignable to parameter of type 'string'.
- app/portal/student/notifications/page.tsx:220:14 TS2304 — Cannot find name 'Link'.
- app/portal/student/notifications/page.tsx:225:15 TS2304 — Cannot find name 'Link'.
- app/tax-filing/locations/[state]/page.tsx:371:41 TS2304 — Cannot find name 'state'.
- app/tax-filing/locations/[state]/page.tsx:377:41 TS2304 — Cannot find name 'state'.
- app/api/analytics/reports/usage/route.ts:164:30 TS2538 — Type 'unknown' cannot be used as an index type.
- app/api/analytics/reports/wioa-quarterly/route.ts:227:36 TS2339 — Property 'totalEnrolled' does not exist on type 'unknown'.
- app/api/admin/test-email/route.ts:51:24 TS2304 — Cannot find name 'resend'.
- app/api/admin/test-email/route.ts:71:24 TS2304 — Cannot find name 'resend'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
