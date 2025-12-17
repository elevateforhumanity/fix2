# Autopilot 18 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/admin/bulk-import.ts:87:16 TS2339 — Property 'startDate' does not exist on type 'unknown'.
- lib/billing/enforceLimit.ts:15:23 TS2339 — Property 'license' does not exist on type 'OrgConfig'.
- lib/dataExport.ts:343:55 TS2339 — Property 'title' does not exist on type 'string'.
- lib/native/native-features.ts:323:51 TS2339 — Property 'getBattery' does not exist on type 'string'.
- lib/partners/careersafe.ts:75:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/hsi.ts:93:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/jri.ts:91:59 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nds.ts:80:50 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nrf.ts:195:67 TS2554 — Expected 1-2 arguments, but got 3.
- lib/seo/structured-data.ts:117:7 TS2353 — Object literal may only specify known properties, and ''query-input'' does not exist in type 'SearchActionLeaf'.
- app/api/create-checkout-session/route.ts:84:9 TS2698 — Spread types may only be created from object types.
- app/api/events/route.ts:33:39 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/github/file/route.ts:119:21 TS2339 — Property 'status' does not exist on type 'unknown'.
- app/api/hr/time-entries/route.ts:107:48 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/media/upload/route.ts:63:35 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/partner-inquiry/route.ts:32:13 TS2304 — Cannot find name 'resend'.
- app/api/security/log/route.ts:15:27 TS2339 — Property 'ip' does not exist on type 'NextRequest'.
- app/api/tutorials/route.ts:76:25 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/auth/reset-password/ResetPasswordForm.tsx:50:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/portal/student/calendar/page.tsx:251:17 TS2607 — JSX element class does not support attributes because it does not have a 'props' property.
- app/programs/page-old-backup.tsx:48:23 TS2339 — Property 'title' does not exist on type 'Program'.
- app/tax-filing/locations/[state]/page.tsx:208:16 TS2304 — Cannot find name 'state'.
- components/dashboard/RightSidebar.tsx:100:45 TS2339 — Property 'title' does not exist on type 'string'.
- app/api/analytics/performance/alert/route.ts:71:50 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/analytics/reports/wioa-quarterly/route.ts:246:37 TS2339 — Property 'disability' does not exist on type 'unknown'.
- app/api/admin/learner/notes/route.ts:45:34 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/courses/list/route.ts:57:41 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/affirm/checkout/route.ts:72:23 TS2339 — Property 'id' does not exist on type 'unknown'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
