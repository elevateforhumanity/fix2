# Autopilot 39 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/autopilot/autopilot.ts:82:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/autopilot/autopilot.ts:111:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/gradebook/calculator.ts:139:11 TS2362 — The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
- lib/integrations/cloudinary.ts:88:29 TS2769 — No overload matches this call.
- lib/partners/certiport.ts:65:53 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/certiport.ts:93:56 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/milady.ts:134:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/milady.ts:156:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/scorm/scorm-api.ts:20:37 TS2339 — Property 'API' does not exist on type 'string'.
- lib/scorm/scorm-api.ts:24:12 TS2352 — Conversion of type 'Window' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/email/campaigns/send/route.ts:77:62 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/email/scheduler/route.ts:114:38 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/grants/sync/route.ts:101:47 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Error'.
- app/api/hr/benefits/enrollments/route.ts:35:58 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/notifications/broadcast/route.ts:114:51 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/onboarding/learner/route.ts:57:47 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/store/publish/route.ts:46:48 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/store/publish/route.ts:74:20 TS2339 — Property 'name' does not exist on type 'string'.
- app/onboarding/employer/orientation/page.tsx:115:20 TS2304 — Cannot find name 'employer'.
- app/partner/dashboard/page.tsx:207:48 TS2339 — Property 'title' does not exist on type '{ title: any; }[]'.
- app/student/courses/[courseId]/page.tsx:133:67 TS2322 — Type '{ courseId: string; userId: string; }' is not assignable to type 'IntrinsicAttributes & CourseProgressTrackerProps'.
- app/student/programs/[slug]/modules/[moduleId]/page.tsx:46:6 TS2339 — Property 'from' does not exist on type 'Promise<SupabaseClient<any, "public", "public", any, any>>'.
- components/reels/ReelsFeed.tsx:21:21 TS7030 — Not all code paths return a value.
- components/student/ExternalModuleLauncher.tsx:63:35 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/reports/usage/route.ts:164:30 TS2538 — Type 'unknown' cannot be used as an index type.
- app/api/reports/wioa-quarterly/route.ts:229:35 TS2339 — Property 'totalDropped' does not exist on type 'unknown'.
- app/api/certificates/download/route.ts:82:33 TS2339 — Property 'course_id' does not exist on type 'unknown'.
- app/api/certificates/download/route.ts:180:48 TS2339 — Property 'completion_date' does not exist on type 'unknown'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
