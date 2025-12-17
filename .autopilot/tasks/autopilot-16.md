# Autopilot 16 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/admin/bulk-import.ts:80:16 TS2339 — Property 'programId' does not exist on type 'unknown'.
- lib/billing/licenseAllows.ts:12:16 TS2339 — Property 'license' does not exist on type 'OrgConfig'.
- lib/dataExport.ts:342:40 TS2339 — Property 'email' does not exist on type '{ first_name: any; last_name: any; email: any; }[]'.
- lib/native/native-features.ts:346:44 TS2339 — Property 'connection' does not exist on type 'string'.
- lib/partners/careersafe.ts:59:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/hsi.ts:114:59 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/jri.ts:71:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/nds.ts:92:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/nrf.ts:181:63 TS2554 — Expected 1-2 arguments, but got 3.
- lib/store/github-clone.ts:94:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/cm/learners/[id]/route.ts:103:56 TS2339 — Property 'slug' does not exist on type 'string'.
- app/api/events/route.ts:93:40 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/github/file/route.ts:102:63 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'RequestParameters & { owner: string; repo: string; path: string; message: string; content: string; sha?: string; branch?: string; committer?: { name: string; email: string; date?: string; }; author?: { ...; }; }'.
- app/api/hsi/create-checkout/route.ts:46:7 TS2769 — No overload matches this call.
- app/api/media/enhance-video/route.ts:87:41 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/partner-launch/[enrollmentId]/route.ts:15:30 TS2339 — Property 'get' does not exist on type 'Promise<ReadonlyRequestCookies>'.
- app/api/scorm/attempts/[attemptId]/data/route.ts:52:24 TS2352 — Conversion of type 'Session' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/v1/courses/route.ts:111:17 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/webhooks/stripe/route.ts:260:38 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Record<string, any>'.
- app/portal/student/calendar/page.tsx:277:16 TS2304 — Cannot find name 'Link'.
- app/program-holder/sign-mou/SignMOUForm.tsx:110:126 TS2339 — Property 'checked' does not exist on type 'EventTarget & (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)'.
- app/tax-filing/locations/[state]/page.tsx:232:52 TS2304 — Cannot find name 'params'.
- components/CopyrightProtection.tsx:10:31 TS7030 — Not all code paths return a value.
- app/api/analytics/reports/caseload/route.ts:121:19 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'string'.
- app/api/analytics/reports/wioa-quarterly/route.ts:244:35 TS2339 — Property 'veteran' does not exist on type 'unknown'.
- app/api/admin/program-holder-acknowledgements/route.ts:7:3 TS2345 — Argument of type '(req: any, context: any, user: any) => Promise<NextResponse<{ error: string; }> | NextResponse<{ acknowledgements: any[]; }>>' is not assignable to parameter of type 'AuthHandler<Record<string, string>>'.
- app/api/courses/create/route.ts:94:44 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/affirm/transactions/route.ts:58:25 TS2339 — Property 'id' does not exist on type 'unknown'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
