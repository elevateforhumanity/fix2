# Autopilot 03 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/actions/enrollments.ts:331:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/data/careers.ts:34:6 TS2339 — Property 'from' does not exist on type 'Promise<SupabaseClient<any, "public", "public", any, any>>'.
- lib/dataExport.ts:40:41 TS2339 — Property 'format' does not exist on type 'string'.
- lib/onboarding-complete-digital.ts:372:7 TS2322 — Type 'string' is not assignable to type 'boolean'.
- lib/partner-workflows/enrollment.ts:94:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/hsi.ts:215:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/hybrid-enrollment.ts:82:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/nrf.ts:30:54 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nrf.ts:67:57 TS2554 — Expected 1-2 arguments, but got 3.
- app/api/alert-scraper/route.ts:21:24 TS2339 — Property 'ip' does not exist on type 'NextRequest'.
- app/api/checkout/create/route.ts:126:37 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/funding/admin/list/route.ts:49:32 TS2339 — Property 'toLowerCase' does not exist on type 'unknown'.
- app/api/github/branches/route.ts:36:44 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/lti/launch/route.ts:28:40 TS2339 — Property 'given_name' does not exist on type 'unknown'.
- app/api/marketing/campaigns/route.ts:36:52 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/phone/call/route.ts:50:38 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/quizzes/[quizId]/route.ts:81:34 TS2538 — Type 'unknown' cannot be used as an index type.
- app/api/webhooks/marketplace/route.ts:105:5 TS2304 — Cannot find name 'logger'.
- app/api/webhooks/partners/[partner]/route.ts:88:68 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/portal/student/notifications/page.tsx:214:14 TS2304 — Cannot find name 'Link'.
- app/portal/student/settings/page.tsx:29:10 TS2786 — 'Image' cannot be used as a JSX component.
- app/tax-filing/locations/[state]/page.tsx:359:21 TS2304 — Cannot find name 'state'.
- app/tax-filing/locations/[state]/page.tsx:391:24 TS2304 — Cannot find name 'state'.
- app/api/analytics/reports/usage/route.ts:159:25 TS2339 — Property 'title' does not exist on type 'unknown'.
- app/api/analytics/reports/wioa-quarterly/route.ts:229:35 TS2339 — Property 'totalDropped' does not exist on type 'unknown'.
- app/api/admin/test-database/route.ts:7:3 TS2345 — Argument of type '(req: any, context: any, user: any) => Promise<NextResponse<{ courses: { count: number; error: string; sample: { id: any; title: any; status: any; }[]; }; programs: { count: number; error: string; sample: { id: any; title: any; status: any; }[]; }; modules: { ...; }; lessons: { ...; }; }> | NextResponse<...>>' is not assignable to parameter of type 'AuthHandler<Record<string, string>>'.
- app/api/admin/vercel-hard-refresh/route.ts:64:41 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/billing/report-usage/route.ts:38:62 TS2339 — Property 'createUsageRecord' does not exist on type 'string'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
