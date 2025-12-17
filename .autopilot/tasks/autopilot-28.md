# Autopilot 28 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/automation/progressSync.ts:14:30 TS2339 — Property 'get' does not exist on type 'Promise<ReadonlyRequestCookies>'.
- lib/autopilot/autopilot.ts:206:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/dataExport.ts:433:59 TS2339 — Property 'points' does not exist on type 'string'.
- lib/integrations/zoom-integration.ts:293:19 TS7030 — Not all code paths return a value.
- lib/partners/careersafe.ts:174:67 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/certiport.ts:200:61 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/jri.ts:175:55 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/milady.ts:255:67 TS2554 — Expected 1-2 arguments, but got 3.
- lib/performance/cache.ts:40:5 TS2322 — Type 'unknown' is not assignable to type 'T'.
- lib/scorm/scorm-api.ts:99:25 TS2339 — Property 'SetValue' does not exist on type 'unknown'.
- app/api/cron/missed-checkins/route.ts:80:54 TS2339 — Property 'name' does not exist on type '{ id: any; name: any; }[]'.
- app/api/emails/certificate-delivery/route.ts:142:43 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/github/tree/route.ts:77:24 TS2339 — Property 'status' does not exist on type 'unknown'.
- app/api/hr/leave-requests/route.ts:96:51 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/milady-rise/enroll/route.ts:52:32 TS2339 — Property 'partner_code' does not exist on type '{ name: string; provider: string; courses: any[]; }'.
- app/api/onboarding/route.ts:71:31 TS2352 — Conversion of type 'Session' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/social-media/scheduler/route.ts:204:45 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/tenants/provision/route.ts:11:28 TS2339 — Property 'isAdmin' does not exist on type 'string'.
- app/courses/partners/page.tsx:33:55 TS2339 — Property 'provider_name' does not exist on type 'unknown'.
- app/portal/employer/page.tsx:106:16 TS2304 — Cannot find name 'employer'.
- app/shop/onboarding/page.tsx:39:25 TS2339 — Property 'id' does not exist on type 'any[]'.
- app/tax-filing/locations/[state]/page.tsx:82:20 TS2304 — Cannot find name 'state'.
- components/lms/AdvancedQuizBuilder.tsx:284:20 TS2604 — JSX element type 'Icon' does not have any construct or call signatures.
- components/ui/Button.tsx:55:43 TS2352 — Conversion of type '{ form?: string | undefined; formAction?: string | ((formData: FormData) => void | Promise<void>) | React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS[keyof React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS] | undefined; ... 284 more ...; className: string; }' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/reports/rapids/route.ts:64:88 TS2339 — Property 'email' does not exist on type '{ first_name: any; last_name: any; email: any; }[]'.
- app/api/reports/wioa-quarterly/route.ts:242:33 TS2339 — Property 'female' does not exist on type 'unknown'.
- app/api/cert/bulk-issue/route.ts:43:23 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/ai/generate-asset/route.ts:111:47 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
