# Autopilot 34 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/autopilot/autopilot.ts:47:32 TS2339 — Property 'config' does not exist on type 'unknown'.
- lib/autopilot/autopilot.ts:152:23 TS7030 — Not all code paths return a value.
- lib/fs-virtual.ts:19:32 TS2339 — Property 'content' does not exist on type '{ type: "file"; encoding: string; size: number; name: string; path: string; content: string; sha: string; url: string; git_url: string; html_url: string; download_url: string; \_links: { git: string; html: string; self: string; }; target?: string; submodule_git_url?: string; } | { ...; } | { ...; }'.
- lib/integrations/mixpanel.ts:102:7 TS2353 — Object literal may only specify known properties, and '$token' does not exist in type 'MixpanelUserProfile'.
- lib/partners/certiport.ts:30:52 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/certiport.ts:150:63 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/milady.ts:96:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/milady.ts:207:58 TS2554 — Expected 1-2 arguments, but got 3.
- lib/scorm/api.ts:124:6 TS2352 — Conversion of type 'Window & typeof globalThis' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/scorm/scorm-api.ts:44:28 TS2339 — Property 'Initialize' does not exist on type 'unknown'.
- app/api/donate/create-checkout/route.ts:6:7 TS2322 — Type '"2024-11-20.acacia"' is not assignable to type '"2025-10-29.clover"'.
- app/api/email/workflows/processor/route.ts:146:27 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/grants/draft/route.ts:119:20 TS2345 — Argument of type 'PostgrestError' is not assignable to parameter of type 'string'.
- app/api/hr/employees/[id]/route.ts:103:46 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/moderation/route.ts:126:16 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/onboarding/route.ts:31:53 TS2352 — Conversion of type 'Session' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/store/create-payment-intent/route.ts:7:7 TS2322 — Type '"2024-11-20.acacia"' is not assignable to type '"2025-10-29.clover"'.
- app/api/student/partner-enrollments/route.ts:15:30 TS2339 — Property 'get' does not exist on type 'Promise<ReadonlyRequestCookies>'.
- app/login/LoginForm.tsx:72:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/pay/PayPageClient.tsx:173:9 TS2339 — Property 'stripe-buy-button' does not exist on type 'JSX.IntrinsicElements'.
- app/student/courses/[courseId]/external/[moduleId]/ExternalModuleClient.tsx:83:23 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/student/programs/[slug]/modules/[moduleId]/page.tsx:119:8 TS2339 — Property 'from' does not exist on type 'Promise<SupabaseClient<any, "public", "public", any, any>>'.
- components/lms/EnrollButton.tsx:46:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- components/student/ScormPlayer.tsx:105:6 TS2352 — Conversion of type 'Window & typeof globalThis' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/reports/usage/route.ts:154:30 TS2538 — Type 'unknown' cannot be used as an index type.
- app/api/reports/wioa-quarterly/route.ts:234:34 TS2339 — Property 'medianWage' does not exist on type 'unknown'.
- app/api/cert/bulk-issue/route.ts:103:33 TS2339 — Property 'expires_at' does not exist on type 'unknown'.
- app/api/certificates/download/route.ts:257:49 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
