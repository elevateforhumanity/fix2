# Autopilot 36 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/autopilot/autopilot.ts:54:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/autopilot/autopilot.ts:132:28 TS2339 — Property 'syncToVercel' does not exist on type 'unknown'.
- lib/fs-virtual.ts:45:50 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'RequestParameters & { owner: string; repo: string; path: string; message: string; content: string; sha?: string; branch?: string; committer?: { name: string; email: string; date?: string; }; author?: { ...; }; }'.
- lib/integrations/mixpanel.ts:62:7 TS2353 — Object literal may only specify known properties, and '$token' does not exist in type 'MixpanelUserProfile'.
- lib/partners/certiport.ts:44:53 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/certiport.ts:115:53 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/milady.ts:117:65 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/milady.ts:197:65 TS2554 — Expected 1-2 arguments, but got 3.
- lib/scorm/api.ts:126:6 TS2352 — Conversion of type 'Window & typeof globalThis' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/scorm/scorm-api.ts:25:42 TS2339 — Property 'API_1484_11' does not exist on type 'string'.
- app/api/email/campaigns/route.ts:19:47 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/email/workflows/processor/route.ts:57:67 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/grants/match/route.ts:65:20 TS2345 — Argument of type 'PostgrestError' is not assignable to parameter of type 'string'.
- app/api/hr/departments/route.ts:83:48 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/notifications/broadcast/route.ts:77:79 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/onboarding/route.ts:24:10 TS2352 — Conversion of type 'Session' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/store/license/generate/route.ts:53:47 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/store/webhook/route.ts:103:36 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/onboarding/employer/orientation/page.tsx:100:20 TS2304 — Cannot find name 'employer'.
- app/pay/PaymentOptionsClient.tsx:255:9 TS2339 — Property 'stripe-buy-button' does not exist on type 'JSX.IntrinsicElements'.
- app/student/courses/[courseId]/external/[moduleId]/ExternalModuleClient.tsx:102:34 TS2339 — Property 'storage' does not exist on type 'string | SupabaseClient<any, "public", "public", any, any>'.
- app/student/programs/[slug]/modules/[moduleId]/page.tsx:97:8 TS2339 — Property 'from' does not exist on type 'Promise<SupabaseClient<any, "public", "public", any, any>>'.
- components/MOUStatusBadge.tsx:80:21 TS2786 — 'Icon' cannot be used as a JSX component.
- components/student/ScormPlayer.tsx:104:6 TS2352 — Conversion of type 'Window & typeof globalThis' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/reports/usage/route.ts:158:22 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/reports/wioa-quarterly/route.ts:232:39 TS2339 — Property 'employedInField' does not exist on type 'unknown'.
- app/api/cert/bulk-issue/route.ts:111:22 TS2339 — Property 'issued_at' does not exist on type 'unknown'.
- app/api/certificates/download/route.ts:250:29 TS2345 — Argument of type 'Uint8Array<ArrayBufferLike>' is not assignable to parameter of type 'BodyInit'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
