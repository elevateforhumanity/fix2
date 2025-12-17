# Autopilot 40 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/autopilot/autopilot.ts:91:23 TS7030 — Not all code paths return a value.
- lib/autopilot/autopilot.ts:101:34 TS2339 — Property 'selfHeal' does not exist on type 'unknown'.
- lib/integrations/auth0-sso.ts:176:35 TS1064 — The return type of an async function or method must be the global Promise<T> type. Did you mean to write 'Promise<string>'?
- lib/integrations/aws-s3.ts:74:7 TS2769 — No overload matches this call.
- lib/partners/certiport.ts:72:53 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/certiport.ts:84:56 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/milady.ts:144:58 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/milady.ts:155:67 TS2554 — Expected 1-2 arguments, but got 3.
- lib/scorm/scorm-api.ts:21:17 TS2352 — Conversion of type 'Window' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/scorm/scorm-api.ts:21:42 TS2339 — Property 'API' does not exist on type 'string'.
- app/api/email/campaigns/send/route.ts:114:45 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/email/scheduler/route.ts:87:67 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/hr/benefits-plans/route.ts:19:52 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/hr/benefits-plans/route.ts:57:51 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/offline/sync/route.ts:59:33 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/onboarding/complete/route.ts:54:50 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/store/publish/route.ts:67:29 TS2352 — Conversion of type '[string, any][]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/store/publish/route.ts:70:25 TS2339 — Property 'price' does not exist on type 'string'.
- app/partner/dashboard/page.tsx:204:49 TS2339 — Property 'full_name' does not exist on type '{ full_name: any; email: any; }[]'.
- app/partner/dashboard/page.tsx:204:83 TS2339 — Property 'email' does not exist on type '{ full_name: any; email: any; }[]'.
- app/student/programs/[slug]/modules/[moduleId]/page.tsx:28:45 TS2339 — Property 'auth' does not exist on type 'Promise<SupabaseClient<any, "public", "public", any, any>>'.
- app/student/programs/[slug]/modules/[moduleId]/page.tsx:35:6 TS2339 — Property 'from' does not exist on type 'Promise<SupabaseClient<any, "public", "public", any, any>>'.
- components/SecurityMonitor.tsx:94:11 TS2322 — Type 'Location' is not assignable to type 'string'.
- components/SignaturePad.tsx:24:13 TS7030 — Not all code paths return a value.
- app/api/reports/wioa-quarterly/route.ts:227:36 TS2339 — Property 'totalEnrolled' does not exist on type 'unknown'.
- app/api/reports/wioa-quarterly/route.ts:228:37 TS2339 — Property 'totalCompleted' does not exist on type 'unknown'.
- app/api/certificates/download/route.ts:147:31 TS2339 — Property 'student_name' does not exist on type 'unknown'.
- app/api/certificates/download/route.ts:148:35 TS2339 — Property 'student_name' does not exist on type 'unknown'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
