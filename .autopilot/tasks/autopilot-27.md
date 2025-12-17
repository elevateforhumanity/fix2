# Autopilot 27 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/automation/partnerEnrollment.ts:168:18 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/autopilot/course-normalizer.ts:13:6 TS2339 — Property 'toLowerCase' does not exist on type 'unknown'.
- lib/dataExport.ts:433:25 TS2352 — Conversion of type '{ title: any; points: any; course: { title: any; }[]; }[]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/invoicing.ts:152:13 TS2339 — Property 'paid_at' does not exist on type 'unknown'.
- lib/partners/careersafe.ts:153:46 TS2339 — Property 'get' does not exist on type 'unknown'.
- lib/partners/certiport.ts:203:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/jri.ts:164:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/milady.ts:256:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/payments.ts:534:65 TS2339 — Property 'current_period_end' does not exist on type 'string'.
- lib/scorm/scorm-api.ts:114:25 TS2339 — Property 'LMSCommit' does not exist on type 'unknown'.
- app/api/cron/missed-checkins/route.ts:79:55 TS2339 — Property 'full_name' does not exist on type '{ id: any; email: any; full_name: any; }[]'.
- app/api/employee/me/route.ts:38:46 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/github/tree/route.ts:76:21 TS2339 — Property 'status' does not exist on type 'unknown'.
- app/api/hr/payroll/route.ts:64:50 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/milady-rise/enroll/route.ts:51:31 TS2339 — Property 'scholarship_details' does not exist on type '{ name: string; provider: string; courses: any[]; }'.
- app/api/onboarding/route.ts:71:47 TS2339 — Property 'id' does not exist on type 'string'.
- app/api/social-media/scheduler/route.ts:155:42 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Record<string, any>'.
- app/api/text-to-speech/route.ts:92:43 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/courses/partners/CourseSearch.tsx:51:48 TS2339 — Property 'provider_name' does not exist on type 'Course'.
- app/portal/employer/page.tsx:106:28 TS2304 — Cannot find name 'employer'.
- app/shop/onboarding/page.tsx:32:25 TS2339 — Property 'id' does not exist on type 'any[]'.
- app/tax-filing/locations/[state]/page.tsx:142:22 TS2304 — Cannot find name 'state'.
- components/layout/PremiumMobileNav.tsx:197:24 TS2786 — 'Icon' cannot be used as a JSX component.
- components/ui/FundingToast.tsx:11:13 TS7030 — Not all code paths return a value.
- app/api/reports/rapids/route.ts:64:58 TS2339 — Property 'last_name' does not exist on type '{ first_name: any; last_name: any; email: any; }[]'.
- app/api/reports/wioa-quarterly/route.ts:243:31 TS2339 — Property 'male' does not exist on type 'unknown'.
- app/api/courses/sitemap/route.ts:79:45 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/ai/generate-course/route.ts:79:42 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
