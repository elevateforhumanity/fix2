# Autopilot 24 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/authAdapter.ts:119:26 TS2339 — Property 'get' does not exist on type 'Promise<ReadonlyHeaders>'.
- lib/autopilot/course-normalizer.ts:58:45 TS2339 — Property 'length' does not exist on type 'unknown'.
- lib/dataExport.ts:431:57 TS2339 — Property 'email' does not exist on type 'string'.
- lib/invoicing.ts:269:34 TS2339 — Property 'lastAutoTable' does not exist on type 'string'.
- lib/partners/careersafe.ts:138:64 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/hsi.ts:45:46 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/jri.ts:141:50 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nds.ts:33:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/payments.ts:533:43 TS2352 — Conversion of type 'Subscription' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/scorm/scorm-api.ts:131:25 TS2339 — Property 'Terminate' does not exist on type 'unknown'.
- app/api/cron/missed-checkins/route.ts:67:49 TS2339 — Property 'email' does not exist on type '{ id: any; email: any; full_name: any; }[]'.
- app/api/enroll/apply/route.ts:44:43 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/github/repos/route.ts:49:21 TS2339 — Property 'status' does not exist on type 'unknown'.
- app/api/hr/performance-reviews/route.ts:110:56 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/milady-rise/enroll/route.ts:39:36 TS2339 — Property 'enrollment_instructions' does not exist on type '{ name: string; provider: string; courses: any[]; }'.
- app/api/onboarding/submit/route.ts:108:19 TS2339 — Property 'ip' does not exist on type 'NextRequest'.
- app/api/social-media/scheduler/route.ts:95:59 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/track-usage/route.ts:89:50 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Record<string, any>'.
- app/courses/[courseId]/lessons/[lessonId]/quiz/take/page.tsx:39:55 TS7030 — Not all code paths return a value.
- app/portal/student/calendar/page.tsx:41:9 TS2607 — JSX element class does not support attributes because it does not have a 'props' property.
- app/shop/dashboard/page.tsx:48:25 TS2339 — Property 'id' does not exist on type 'any[]'.
- app/tax-filing/locations/[state]/page.tsx:148:66 TS2304 — Cannot find name 'state'.
- components/layout/MainHeader.tsx:22:22 TS7030 — Not all code paths return a value.
- components/ui/Select.tsx:59:15 TS7030 — Not all code paths return a value.
- app/api/reports/caseload/route.ts:128:25 TS2339 — Property 'title' does not exist on type 'unknown'.
- app/api/reports/wioa-quarterly/route.ts:246:37 TS2339 — Property 'disability' does not exist on type 'unknown'.
- app/api/courses/save/route.ts:23:27 TS2339 — Property 'title' does not exist on type 'unknown'.
- app/api/ai/instructor/route.ts:84:9 TS2769 — No overload matches this call.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
