# Autopilot 17 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/admin/bulk-import.ts:83:16 TS2339 — Property 'cohort' does not exist on type 'unknown'.
- lib/billing/enforceLimit.ts:37:23 TS2339 — Property 'license' does not exist on type 'OrgConfig'.
- lib/dataExport.ts:343:20 TS2352 — Conversion of type '{ title: any; category: any; }[]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/native/native-features.ts:346:23 TS2352 — Conversion of type 'Navigator' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/partners/careersafe.ts:69:56 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/hsi.ts:103:50 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/jri.ts:80:50 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nds.ts:91:59 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nrf.ts:184:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/seo/structured-data.ts:173:5 TS2353 — Object literal may only specify known properties, and 'timeToComplete' does not exist in type 'CourseLeaf'.
- app/api/create-checkout-session/route.ts:53:9 TS2698 — Spread types may only be created from object types.
- app/api/events/route.ts:35:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/github/file/route.ts:115:46 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/hsi/create-checkout/route.ts:9:7 TS2322 — Type '"2024-11-20.acacia"' is not assignable to type '"2025-10-29.clover"'.
- app/api/media/list/route.ts:9:17 TS2353 — Object literal may only specify known properties, and 'recursive' does not exist in type 'SearchOptions'.
- app/api/partner-inquiry/route.ts:50:13 TS2304 — Cannot find name 'resend'.
- app/api/scorm/attempts/[attemptId]/data/route.ts:52:43 TS2339 — Property 'userId' does not exist on type 'string'.
- app/api/tutorials/route.ts:93:29 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/auth/forgot-password/ForgotPasswordForm.tsx:32:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/portal/student/calendar/page.tsx:251:18 TS2786 — 'Image' cannot be used as a JSX component.
- app/programs/page-old-backup.tsx:5:10 TS2614 — Module '"@/components/StructuredData"' has no exported member 'StructuredData'. Did you mean to use 'import StructuredData from "@/components/StructuredData"' instead?
- app/tax-filing/locations/[state]/page.tsx:214:35 TS2304 — Cannot find name 'state'.
- components/dashboard/RightSidebar.tsx:100:23 TS2352 — Conversion of type '{ title: any; }[]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/analytics/performance/slow-resources/route.ts:28:47 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/analytics/reports/wioa-quarterly/route.ts:245:37 TS2339 — Property 'lowIncome' does not exist on type 'unknown'.
- app/api/admin/learner/notes/route.ts:51:29 TS2345 — Argument of type '(req: Request, context: Record<string, unknown>, user: Record<string, unknown>) => Promise<Response>' is not assignable to parameter of type 'AuthHandler<Record<string, string>>'.
- app/api/courses/index/route.ts:22:40 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/affirm/checkout/route.ts:108:21 TS2339 — Property 'id' does not exist on type 'unknown'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
