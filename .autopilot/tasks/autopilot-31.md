# Autopilot 31 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/autopilot/autopilot.ts:43:23 TS2339 — Property 'isRunning' does not exist on type 'unknown'.
- lib/autopilot/autopilot.ts:178:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/email-templates.ts:685:92 TS18004 — No value exists in scope for the shorthand property 'avgWage'. Either declare one or provide an initializer.
- lib/integrations/sso-google.ts:401:23 TS7030 — Not all code paths return a value.
- lib/partners/careersafe.ts:189:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/certiport.ts:165:46 TS2339 — Property 'get' does not exist on type 'unknown'.
- lib/partners/jri.ts:190:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/milady.ts:230:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/reporting/enterprise-dashboard.ts:587:7 TS2339 — Property 'enrollments' does not exist on type 'unknown'.
- lib/scorm/scorm-api.ts:82:25 TS2339 — Property 'LMSGetValue' does not exist on type 'unknown'.
- app/api/dev/seed-courses/route.ts:115:46 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Error'.
- app/api/email/workflows/processor/route.ts:272:69 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/grants/draft/route.ts:31:20 TS2345 — Argument of type 'PostgrestError' is not assignable to parameter of type 'string'.
- app/api/hr/employees/route.ts:172:46 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/milady/auto-enroll/route.ts:122:54 TS2339 — Property 'id' does not exist on type 'CourseEnrollment'.
- app/api/onboarding/route.ts:63:48 TS2339 — Property 'id' does not exist on type 'string'.
- app/api/store/checkout/route.ts:39:37 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/supersonic-cash/apply/route.ts:112:53 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/delegate/dashboard/page.tsx:248:50 TS2339 — Property 'email' does not exist on type '{ full_name: any; email: any; }[]'.
- app/pay/StripePayButton.tsx:54:8 TS2339 — Property 'stripe-buy-button' does not exist on type 'JSX.IntrinsicElements'.
- app/signup/SignupForm.tsx:100:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/tax-filing/locations/[state]/page.tsx:71:35 TS2304 — Cannot find name 'state'.
- components/lms/AdvancedQuizBuilder.tsx:607:15 TS2322 — Type 'unknown' is not assignable to type 'string | number | readonly string[]'.
- components/student/ScormPlayer.tsx:107:33 TS2339 — Property 'API' does not exist on type 'string'.
- app/api/reports/usage/delegate/route.ts:101:22 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/reports/wioa-quarterly/route.ts:237:38 TS2339 — Property 'retained30Days' does not exist on type 'unknown'.
- app/api/cert/bulk-issue/route.ts:65:20 TS2339 — Property 'course_slug' does not exist on type 'unknown'.
- app/api/ai-tutor/chat/route.ts:124:37 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
