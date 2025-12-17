# Autopilot 26 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/automation/partnerEnrollment.ts:163:26 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/autopilot/course-normalizer.ts:18:41 TS2339 — Property 'map' does not exist on type 'unknown'.
- lib/dataExport.ts:432:63 TS2339 — Property 'title' does not exist on type 'string'.
- lib/invoicing.ts:154:15 TS2339 — Property 'payment_id' does not exist on type 'unknown'.
- lib/partners/careersafe.ts:148:57 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/certiport.ts:214:65 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/jri.ts:163:60 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/monitoring.ts:220:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/payments.ts:534:41 TS2352 — Conversion of type 'Subscription' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/scorm/scorm-api.ts:115:25 TS2339 — Property 'Commit' does not exist on type 'unknown'.
- app/api/cron/missed-checkins/route.ts:78:56 TS2339 — Property 'email' does not exist on type '{ id: any; email: any; full_name: any; }[]'.
- app/api/employee/payroll/route.ts:46:45 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/github/tree/route.ts:72:40 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/hr/payroll/route.ts:288:49 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/milady-rise/enroll/route.ts:50:33 TS2339 — Property 'certification' does not exist on type '{ name: string; provider: string; courses: any[]; }'.
- app/api/onboarding/route.ts:75:32 TS2352 — Conversion of type 'Session' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/social-media/scheduler/route.ts:142:38 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/track-usage/route.ts:55:31 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Error'.
- app/courses/partners/CourseSearch.tsx:45:18 TS2339 — Property 'provider_name' does not exist on type 'Course'.
- app/portal/employer/page.tsx:108:20 TS2304 — Cannot find name 'employer'.
- app/shop/onboarding/documents/page.tsx:36:43 TS2339 — Property 'id' does not exist on type 'any[]'.
- app/tax-filing/locations/[state]/page.tsx:145:30 TS2304 — Cannot find name 'state'.
- components/layout/PremiumMobileNav.tsx:197:24 TS2604 — JSX element type 'Icon' does not have any construct or call signatures.
- components/ui/FundingToast.tsx:12:40 TS7030 — Not all code paths return a value.
- app/api/reports/rapids/route.ts:64:27 TS2339 — Property 'first_name' does not exist on type '{ first_name: any; last_name: any; email: any; }[]'.
- app/api/reports/wioa-quarterly/route.ts:244:35 TS2339 — Property 'veteran' does not exist on type 'unknown'.
- app/api/courses/scan/route.ts:46:41 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/ai/generate-course/route.ts:85:24 TS2339 — Property 'response' does not exist on type 'unknown'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
