# Autopilot 38 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/autopilot/autopilot.ts:73:33 TS2339 — Property 'checkHealth' does not exist on type 'unknown'.
- lib/autopilot/autopilot.ts:120:23 TS7030 — Not all code paths return a value.
- lib/gradebook/calculator.ts:138:72 TS2339 — Property 'points' does not exist on type 'unknown'.
- lib/integrations/eps-financial.ts:291:20 TS1308 — 'await' expressions are only allowed within async functions and at the top levels of modules.
- lib/partners/certiport.ts:55:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/certiport.ts:105:63 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/milady.ts:128:57 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/milady.ts:165:55 TS2554 — Expected 1-2 arguments, but got 3.
- lib/scorm/scorm-api.ts:20:12 TS2352 — Conversion of type 'Window' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/scorm/scorm-api.ts:24:37 TS2339 — Property 'API_1484_11' does not exist on type 'string'.
- app/api/email/campaigns/send/route.ts:62:11 TS2561 — Object literal may only specify known properties, but 'reply_to' does not exist in type 'CreateEmailOptions'. Did you mean to write 'replyTo'?
- app/api/email/send-welcome/route.ts:101:31 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Record<string, any>'.
- app/api/grants/sync/route.ts:70:20 TS2345 — Argument of type 'PostgrestError' is not assignable to parameter of type 'string'.
- app/api/hr/benefits/enrollments/route.ts:78:57 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/notifications/broadcast/route.ts:100:59 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/onboarding/route.ts:22:25 TS2352 — Conversion of type 'Session' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/store/products/route.ts:26:41 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/store/webhook/route.ts:45:44 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Error'.
- app/onboarding/employer/orientation/page.tsx:113:28 TS2304 — Cannot find name 'employer'.
- app/pay/PaymentOptionsClient.tsx:154:9 TS2339 — Property 'stripe-buy-button' does not exist on type 'JSX.IntrinsicElements'.
- app/student/courses/[courseId]/external/[moduleId]/ExternalModuleClient.tsx:124:23 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/student/programs/[slug]/modules/[moduleId]/page.tsx:61:6 TS2339 — Property 'from' does not exist on type 'Promise<SupabaseClient<any, "public", "public", any, any>>'.
- components/programs/ProgramHero.tsx:174:28 TS2339 — Property 'level' does not exist on type 'Program'.
- components/student/ScormPlayer.tsx:51:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/reports/usage/route.ts:160:33 TS2339 — Property 'slice' does not exist on type 'unknown'.
- app/api/reports/wioa-quarterly/route.ts:230:37 TS2339 — Property 'completionRate' does not exist on type 'unknown'.
- app/api/cert/pdf/route.tsx:96:68 TS2769 — No overload matches this call.
- app/api/certificates/download/route.ts:195:50 TS2339 — Property 'certificate_number' does not exist on type 'unknown'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
