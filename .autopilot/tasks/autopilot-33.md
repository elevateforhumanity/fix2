# Autopilot 33 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/autopilot/autopilot.ts:46:34 TS2339 — Property 'config' does not exist on type 'unknown'.
- lib/autopilot/autopilot.ts:162:16 TS2339 — Property 'isRunning' does not exist on type 'unknown'.
- lib/feedback.ts:178:16 TS2339 — Property 'responded_at' does not exist on type 'unknown'.
- lib/integrations/resend.ts:36:7 TS2561 — Object literal may only specify known properties, but 'reply_to' does not exist in type 'CreateEmailOptions'. Did you mean to write 'replyTo'?
- lib/partners/careersafe.ts:201:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/certiport.ts:151:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/milady.ts:91:54 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/milady.ts:212:46 TS2339 — Property 'get' does not exist on type 'unknown'.
- lib/reporting/enterprise-dashboard.ts:601:21 TS2339 — Property 'employment_outcomes' does not exist on type 'unknown'.
- lib/scorm/scorm-api.ts:60:25 TS2339 — Property 'LMSInitialize' does not exist on type 'unknown'.
- app/api/dev/seed-courses/route.ts:118:21 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/email/workflows/processor/route.ts:154:21 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/grants/draft/route.ts:92:30 TS2552 — Cannot find name 'openai'. Did you mean 'open'?
- app/api/hr/employees/[id]/route.ts:152:49 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/moderation/route.ts:109:16 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/onboarding/route.ts:31:69 TS2339 — Property 'id' does not exist on type 'string'.
- app/api/store/clone/route.ts:58:34 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/student/partner-enrollments/route.ts:61:39 TS2339 — Property 'course_name' does not exist on type 'unknown'.
- app/login/LoginForm.tsx:51:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/pay/PayPageClient.tsx:176:10 TS2339 — Property 'stripe-buy-button' does not exist on type 'JSX.IntrinsicElements'.
- app/student/courses/[courseId]/external/[moduleId]/ExternalModuleClient.tsx:60:8 TS2339 — Property 'from' does not exist on type 'string | SupabaseClient<any, "public", "public", any, any>'.
- app/tax-filing/apply/page.tsx:89:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- components/lms/ContentLibrary.tsx:190:153 TS2339 — Property 'files' does not exist on type 'EventTarget & (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)'.
- components/student/ScormPlayer.tsx:105:24 TS2339 — Property 'API_1484_11' does not exist on type 'string'.
- app/api/reports/usage/route.ts:152:19 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'string'.
- app/api/reports/wioa-quarterly/route.ts:235:40 TS2339 — Property 'credentialsEarned' does not exist on type 'unknown'.
- app/api/cert/bulk-issue/route.ts:102:13 TS2339 — Property 'expires_at' does not exist on type 'unknown'.
- app/api/ai-instructor/message/route.ts:57:42 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
