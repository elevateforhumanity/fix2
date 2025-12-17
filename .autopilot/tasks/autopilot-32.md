# Autopilot 32 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/autopilot/autopilot.ts:45:34 TS2339 — Property 'config' does not exist on type 'unknown'.
- lib/autopilot/autopilot.ts:169:18 TS2339 — Property 'start' does not exist on type 'unknown'.
- lib/feedback.ts:177:16 TS2339 — Property 'admin_response' does not exist on type 'unknown'.
- lib/integrations/slack.ts:31:43 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/careersafe.ts:200:66 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/certiport.ts:160:56 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/milady.ts:25:5 TS2353 — Object literal may only specify known properties, and 'enabled' does not exist in type 'PartnerConfig'.
- lib/partners/milady.ts:229:68 TS2554 — Expected 1-2 arguments, but got 3.
- lib/reporting/enterprise-dashboard.ts:594:7 TS2339 — Property 'employment_outcomes' does not exist on type 'unknown'.
- lib/scorm/scorm-api.ts:61:25 TS2339 — Property 'Initialize' does not exist on type 'unknown'.
- app/api/dev/seed-courses/route.ts:115:62 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/email/workflows/processor/route.ts:155:24 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/grants/draft/route.ts:45:20 TS2345 — Argument of type 'PostgrestError' is not assignable to parameter of type 'string'.
- app/api/hr/employees/route.ts:64:47 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/moderation/route.ts:59:69 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/onboarding/route.ts:63:32 TS2352 — Conversion of type 'Session' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/store/clone-codebase/route.ts:55:43 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/student/partner-enrollments/route.ts:62:47 TS2339 — Property 'provider_name' does not exist on type 'unknown'.
- app/delegate/dashboard/page.tsx:252:48 TS2339 — Property 'title' does not exist on type '{ title: any; }[]'.
- app/pay/StripePayButton.tsx:51:7 TS2339 — Property 'stripe-buy-button' does not exist on type 'JSX.IntrinsicElements'.
- app/student/courses/[courseId]/CourseCompletionClient.tsx:98:23 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/tax-filing/locations/[state]/page.tsx:64:8 TS2304 — Cannot find name 'state'.
- components/lms/ContentLibrary.tsx:190:122 TS2339 — Property 'files' does not exist on type 'EventTarget & (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)'.
- components/student/ScormPlayer.tsx:107:15 TS2352 — Conversion of type 'Window & typeof globalThis' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/reports/usage/delegate/route.ts:102:25 TS2339 — Property 'title' does not exist on type 'unknown'.
- app/api/reports/wioa-quarterly/route.ts:236:37 TS2339 — Property 'credentialRate' does not exist on type 'unknown'.
- app/api/cert/bulk-issue/route.ts:69:25 TS2339 — Property 'course_slug' does not exist on type 'unknown'.
- app/api/ai-tutor-basic/route.ts:70:37 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Error'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
