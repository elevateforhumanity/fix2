# Autopilot 29 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/autopilot/autopilot-runner.ts:10:32 TS2345 — Argument of type 'unknown' is not assignable to parameter of type '{ title: string; objectives: string[]; }'.
- lib/autopilot/autopilot.ts:197:12 TS2339 — Property 'stop' does not exist on type 'unknown'.
- lib/dataExport.ts:434:20 TS2352 — Conversion of type '{ title: any; points: any; course: { title: any; }[]; }[]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/integrations/zoom-integration.ts:249:19 TS7030 — Not all code paths return a value.
- lib/partners/careersafe.ts:175:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/certiport.ts:189:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/jri.ts:178:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/milady.ts:244:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/rateLimiter.ts:78:6 TS2352 — Conversion of type 'NextRequest' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/scorm/scorm-api.ts:98:25 TS2339 — Property 'LMSSetValue' does not exist on type 'unknown'.
- app/api/cron/missed-checkins/route.ts:88:44 TS2339 — Property 'full_name' does not exist on type '{ id: any; email: any; full_name: any; }[]'.
- app/api/email/workflows/route.ts:48:46 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/grade/upsert/route.ts:55:22 TS2352 — Conversion of type '{ instructor_id: any; }[]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/hr/leave-requests/route.ts:38:52 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/milady/auto-enroll/route.ts:57:11 TS2345 — Argument of type '{ email: any; firstName: any; lastName: any; phone: any; }' is not assignable to parameter of type 'StudentData'.
- app/api/onboarding/route.ts:67:51 TS2339 — Property 'id' does not exist on type 'string'.
- app/api/social-media/scheduler/route.ts:242:44 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/tenants/provision/route.ts:11:9 TS2352 — Conversion of type 'Session' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/courses/partners/page.tsx:37:22 TS2339 — Property 'push' does not exist on type 'unknown'.
- app/portal/employer/page.tsx:93:20 TS2304 — Cannot find name 'employer'.
- app/shop/reports/new/page.tsx:34:26 TS2322 — Type '{ id: any; profiles: { id: any; full_name: any; }[]; }[]' is not assignable to type 'Placement[]'.
- app/tax-filing/locations/[state]/page.tsx:75:13 TS2304 — Cannot find name 'state'.
- components/lms/AdvancedQuizBuilder.tsx:284:20 TS2786 — 'Icon' cannot be used as a JSX component.
- components/student/ScormPlayer.tsx:108:33 TS2339 — Property 'API_1484_11' does not exist on type 'string'.
- app/api/reports/usage/delegate/route.ts:94:19 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'string'.
- app/api/reports/wioa-quarterly/route.ts:239:46 TS2339 — Property 'retentionRate90' does not exist on type 'unknown'.
- app/api/cert/bulk-issue/route.ts:58:13 TS2339 — Property 'course_id' does not exist on type 'unknown'.
- app/api/ai/course-builder/route.ts:96:46 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
