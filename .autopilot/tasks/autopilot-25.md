# Autopilot 25 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/automation/partnerEnrollment.ts:35:30 TS2339 — Property 'get' does not exist on type 'Promise<ReadonlyRequestCookies>'.
- lib/autopilot/course-normalizer.ts:54:41 TS2339 — Property 'trim' does not exist on type 'unknown'.
- lib/dataExport.ts:432:24 TS2352 — Conversion of type '{ title: any; points: any; course: { title: any; }[]; }[]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/invoicing.ts:269:19 TS2352 — Conversion of type 'jsPDF' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/partners/careersafe.ts:139:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/certiport.ts:215:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/jri.ts:144:46 TS2339 — Property 'get' does not exist on type 'unknown'.
- lib/partners/nds.ts:30:46 TS2554 — Expected 1-2 arguments, but got 3.
- lib/payments.ts:533:67 TS2339 — Property 'current_period_start' does not exist on type 'string'.
- lib/scorm/scorm-api.ts:130:25 TS2339 — Property 'LMSFinish' does not exist on type 'unknown'.
- app/api/cron/missed-checkins/route.ts:77:54 TS2339 — Property 'full_name' does not exist on type '{ id: any; email: any; full_name: any; }[]'.
- app/api/employer/hours/approve/route.ts:50:38 TS2339 — Property 'employer_id' does not exist on type '{ employer_id: any; }[]'.
- app/api/github/repos/route.ts:50:24 TS2339 — Property 'status' does not exist on type 'unknown'.
- app/api/hr/performance-reviews/route.ts:35:57 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/milady-rise/enroll/route.ts:49:27 TS2339 — Property 'program' does not exist on type '{ name: string; provider: string; courses: any[]; }'.
- app/api/onboarding/route.ts:75:48 TS2339 — Property 'id' does not exist on type 'string'.
- app/api/social-media/scheduler/route.ts:125:67 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/track-usage/route.ts:77:21 TS2339 — Property 'ip' does not exist on type 'NextRequest'.
- app/courses/partners/CourseSearch.tsx:29:45 TS2339 — Property 'provider_name' does not exist on type 'Course'.
- app/portal/instructor/skills-tracking/page.tsx:363:47 TS2448 — Block-scoped variable 'skillLogs' used before its declaration.
- app/shop/dashboard/page.tsx:75:71 TS2339 — Property 'name' does not exist on type 'any[]'.
- app/tax-filing/locations/[state]/page.tsx:148:16 TS2304 — Cannot find name 'state'.
- components/layout/MainHeader.tsx:32:20 TS7030 — Not all code paths return a value.
- components/ui/Modal.tsx:23:13 TS7030 — Not all code paths return a value.
- app/api/reports/caseload/route.ts:129:40 TS2339 — Property 'code' does not exist on type 'unknown'.
- app/api/reports/wioa-quarterly/route.ts:245:37 TS2339 — Property 'lowIncome' does not exist on type 'unknown'.
- app/api/courses/save/route.ts:39:40 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/ai/generate-page/route.ts:77:44 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
