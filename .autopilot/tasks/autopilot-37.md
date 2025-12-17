# Autopilot 37 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/autopilot/autopilot.ts:63:23 TS7030 — Not all code paths return a value.
- lib/autopilot/autopilot.ts:131:28 TS2339 — Property 'syncToGitHub' does not exist on type 'unknown'.
- lib/getCurrentProfile.ts:30:30 TS2339 — Property 'get' does not exist on type 'Promise<ReadonlyRequestCookies>'.
- lib/integrations/google-oauth.ts:47:43 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/certiport.ts:54:63 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/certiport.ts:106:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/milady.ts:118:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/milady.ts:170:46 TS2339 — Property 'get' does not exist on type 'unknown'.
- lib/scorm/api.ts:126:24 TS2339 — Property 'API_1484_11' does not exist on type 'string'.
- lib/scorm/scorm-api.ts:25:17 TS2352 — Conversion of type 'Window' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/email/campaigns/route.ts:53:46 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/email/send-welcome/route.ts:112:47 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/grants/match/route.ts:102:13 TS2554 — Expected 1-3 arguments, but got 4.
- app/api/hr/departments/route.ts:28:49 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/notifications/broadcast/route.ts:81:23 TS2339 — Property 'statusCode' does not exist on type 'unknown'.
- app/api/onboarding/route.ts:22:41 TS2339 — Property 'role' does not exist on type 'string'.
- app/api/store/license/validate/route.ts:48:47 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/store/webhook/route.ts:92:47 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Record<string, any>'.
- app/onboarding/employer/orientation/page.tsx:113:16 TS2304 — Cannot find name 'employer'.
- app/pay/PaymentOptionsClient.tsx:157:10 TS2339 — Property 'stripe-buy-button' does not exist on type 'JSX.IntrinsicElements'.
- app/student/courses/[courseId]/external/[moduleId]/ExternalModuleClient.tsx:107:10 TS2339 — Property 'from' does not exist on type 'string | SupabaseClient<any, "public", "public", any, any>'.
- app/student/programs/[slug]/modules/[moduleId]/page.tsx:88:6 TS2339 — Property 'from' does not exist on type 'Promise<SupabaseClient<any, "public", "public", any, any>>'.
- components/programs/ProgramHero.tsx:168:28 TS2339 — Property 'format' does not exist on type 'Program'.
- components/student/ScormPlayer.tsx:57:40 TS7030 — Not all code paths return a value.
- app/api/reports/usage/route.ts:159:25 TS2339 — Property 'title' does not exist on type 'unknown'.
- app/api/reports/wioa-quarterly/route.ts:231:36 TS2339 — Property 'totalEmployed' does not exist on type 'unknown'.
- app/api/cert/bulk-issue/route.ts:150:37 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/certificates/download/route.ts:237:117 TS2339 — Property 'certificate_number' does not exist on type 'unknown'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
