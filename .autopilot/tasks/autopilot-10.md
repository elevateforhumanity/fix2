# Autopilot 10 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/admin/bulk-import.ts:59:16 TS2339 — Property 'lastName' does not exist on type 'unknown'.
- lib/collaboration/yjs-provider.ts:105:31 TS2339 — Property 'getStates' does not exist on type 'unknown'.
- lib/dataExport.ts:293:13 TS2352 — Conversion of type '{ first_name: any; last_name: any; email: any; }[]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/notifications/push-service.ts:56:45 TS2339 — Property 'statusCode' does not exist on type 'unknown'.
- lib/partner-workflows/payments.ts:10:3 TS2322 — Type '"2023-10-16"' is not assignable to type '"2025-10-29.clover"'.
- lib/partners/hsi.ts:164:50 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/jri.ts:30:46 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nds.ts:144:46 TS2339 — Property 'get' does not exist on type 'unknown'.
- lib/partners/nrf.ts:135:65 TS2554 — Expected 1-2 arguments, but got 3.
- lib/video/adaptive-streaming.ts:171:44 TS2339 — Property 'connection' does not exist on type 'string'.
- app/api/cm/dashboard/route.ts:109:69 TS2339 — Property 'title' does not exist on type 'string'.
- app/api/exams/submit/route.ts:29:50 TS2339 — Property 'userId' does not exist on type 'string'.
- app/api/github/file/route.ts:47:22 TS2339 — Property 'encoding' does not exist on type '{ type: "file"; encoding: string; size: number; name: string; path: string; content: string; sha: string; url: string; git_url: string; html_url: string; download_url: string; \_links: { git: string; html: string; self: string; }; target?: string; submodule_git_url?: string; } | { ...; } | { ...; }'.
- app/api/impact/summary/route.ts:82:33 TS2538 — Type 'unknown' cannot be used as an index type.
- app/api/marketing/contacts/route.ts:92:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/payments/route.ts:131:16 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/referrals/route.ts:110:52 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/v1/enrollments/route.ts:159:32 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/webhooks/stripe/route.ts:80:65 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Record<string, any>'.
- app/portal/student/notifications/page.tsx:145:18 TS2786 — 'Image' cannot be used as a JSX component.
- app/portal/student/settings/page.tsx:292:16 TS2304 — Cannot find name 'Link'.
- app/tax-filing/locations/[state]/page.tsx:287:20 TS2304 — Cannot find name 'state'.
- app/tax-filing/locations/[state]/page.tsx:439:29 TS2304 — Cannot find name 'state'.
- app/api/analytics/reports/usage/delegate/route.ts:100:25 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/analytics/reports/wioa-quarterly/route.ts:236:37 TS2339 — Property 'credentialRate' does not exist on type 'unknown'.
- app/api/admin/programs/route.ts:11:3 TS2345 — Argument of type '(req: any, context: any, user: any) => Promise<NextResponse<{ error: string; }> | NextResponse<{ programs: any[]; }>>' is not assignable to parameter of type 'AuthHandler<Record<string, string>>'.
- app/api/courses/[courseId]/reviews/route.ts:29:18 TS2345 — Argument of type 'PostgrestError' is not assignable to parameter of type 'string'.
- app/api/autopilots/optimize-images/route.ts:55:44 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
