# Autopilot 35 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/autopilot/autopilot.ts:48:25 TS2339 — Property 'config' does not exist on type 'unknown'.
- lib/autopilot/autopilot.ts:143:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/fs-virtual.ts:42:12 TS2339 — Property 'sha' does not exist on type 'unknown'.
- lib/integrations/mixpanel.ts:82:7 TS2353 — Object literal may only specify known properties, and '$token' does not exist in type 'MixpanelUserProfile'.
- lib/partners/certiport.ts:33:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/certiport.ts:118:46 TS2339 — Property 'get' does not exist on type 'unknown'.
- lib/partners/milady.ts:107:55 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/milady.ts:198:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/scorm/api.ts:124:24 TS2339 — Property 'API' does not exist on type 'string'.
- lib/scorm/scorm-api.ts:42:21 TS2339 — Property 'LMSInitialize' does not exist on type 'unknown'.
- app/api/email/analytics/route.ts:131:38 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/email/workflows/processor/route.ts:72:47 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/grants/match/route.ts:52:20 TS2345 — Argument of type 'PostgrestError' is not assignable to parameter of type 'string'.
- app/api/hr/employees/[id]/route.ts:58:46 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/moderation/route.ts:145:16 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/onboarding/route.ts:24:26 TS2339 — Property 'id' does not exist on type 'string'.
- app/api/store/create-product/route.ts:56:43 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/student/log-hours/route.ts:50:7 TS2304 — Cannot find name 'logger'.
- app/onboarding/employer/orientation/page.tsx:92:20 TS2304 — Cannot find name 'employer'.
- app/pay/PaymentOptionsClient.tsx:258:10 TS2339 — Property 'stripe-buy-button' does not exist on type 'JSX.IntrinsicElements'.
- app/student/courses/[courseId]/external/[moduleId]/ExternalModuleClient.tsx:96:53 TS2339 — Property 'storage' does not exist on type 'string | SupabaseClient<any, "public", "public", any, any>'.
- app/student/programs/[slug]/modules/[moduleId]/page.tsx:110:8 TS2339 — Property 'from' does not exist on type 'Promise<SupabaseClient<any, "public", "public", any, any>>'.
- components/MOUStatusBadge.tsx:80:21 TS2604 — JSX element type 'Icon' does not have any construct or call signatures.
- components/student/ScormPlayer.tsx:104:24 TS2339 — Property 'API' does not exist on type 'string'.
- app/api/reports/usage/route.ts:157:25 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/reports/wioa-quarterly/route.ts:233:37 TS2339 — Property 'employmentRate' does not exist on type 'unknown'.
- app/api/cert/bulk-issue/route.ts:110:27 TS2339 — Property 'issued_at' does not exist on type 'unknown'.
- app/api/certificates/download/route.ts:253:81 TS2339 — Property 'certificate_number' does not exist on type 'unknown'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
