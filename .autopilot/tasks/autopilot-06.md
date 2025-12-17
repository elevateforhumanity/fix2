# Autopilot 06 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/actions/enrollments.ts:438:32 TS2339 — Property 'transfer_hours' does not exist on type 'ParserError<"Unable to parse renamed field at `order: created_at.desc\n        ),\n        module_progress:enrollment_module_progress(\n          *,\n          module:course_modules(\n            *,\n            scorm_packages(*)\n          )\n        ),\n        apprenticeship:apprenticeship_enrollments(*)\n      `">'.
- lib/course-completion.ts:90:7 TS2345 — Argument of type 'PostgrestFilterBuilder<any, any, any, { id: any; }[], "lessons", unknown, "GET">' is not assignable to parameter of type 'readonly any[]'.
- lib/dataExport.ts:155:15 TS2352 — Conversion of type '{ key: string; label: string; }' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/offline/service-worker-manager.ts:181:16 TS2352 — Conversion of type '{ syncedCount: number; }' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/partner-workflows/enrollment.ts:275:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/hsi.ts:200:55 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/hybrid-enrollment.ts:235:17 TS2339 — Property 'certificate_url' does not exist on type 'unknown'.
- lib/partners/nds.ts:178:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/nrf.ts:93:67 TS2554 — Expected 1-2 arguments, but got 3.
- lib/withAuth.ts:5:15 TS2305 — Module '"@/types/database"' has no exported member 'Database'.
- app/api/checkout/route.ts:71:76 TS2881 — This expression is never nullish.
- app/api/export/route.ts:197:25 TS2352 — Conversion of type '{ action: any; actor_id: any; metadata: { tables: any[]; format: any; total_records: any; }; }' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/github/commit/route.ts:44:42 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/lti/launch/route.ts:26:27 TS2339 — Property 'sub' does not exist on type 'unknown'.
- app/api/marketing/campaigns/route.ts:94:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/payroll/export/route.ts:66:17 TS2339 — Property 'full_name' does not exist on type 'unknown'.
- app/api/receptionist/route.ts:78:45 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/v1/users/route.ts:153:32 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/webhooks/partners/[partner]/route.ts:147:27 TS2304 — Cannot find name 'supabase'.
- app/portal/student/notifications/page.tsx:182:17 TS2304 — Cannot find name 'Link'.
- app/portal/student/settings/page.tsx:53:14 TS2304 — Cannot find name 'Link'.
- app/tax-filing/locations/[state]/page.tsx:322:26 TS2304 — Cannot find name 'state'.
- app/tax-filing/locations/[state]/page.tsx:410:48 TS2304 — Cannot find name 'state'.
- app/api/analytics/reports/usage/route.ts:154:30 TS2538 — Type 'unknown' cannot be used as an index type.
- app/api/analytics/reports/wioa-quarterly/route.ts:232:39 TS2339 — Property 'employedInField' does not exist on type 'unknown'.
- app/api/admin/sso/route.ts:8:3 TS2345 — Argument of type '(req: any, context: any, user: any) => Promise<NextResponse<{ connections: any[]; }> | NextResponse<{ error: string; }>>' is not assignable to parameter of type 'AuthHandler<Record<string, string>>'.
- app/api/courses/[courseId]/check-completion/route.ts:30:18 TS2345 — Argument of type 'PostgrestError' is not assignable to parameter of type 'string'.
- app/api/stripe/webhook/route.ts:213:15 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Record<string, any>'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
