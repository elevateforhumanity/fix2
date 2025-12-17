# Autopilot 09 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/admin/bulk-import.ts:55:16 TS2339 — Property 'firstName' does not exist on type 'unknown'.
- lib/communication/forums.ts:280:27 TS2339 — Property 'reply_count' does not exist on type '{ locked: any; }'.
- lib/dataExport.ts:155:55 TS2339 — Property 'format' does not exist on type 'string'.
- lib/offline/service-worker-manager.ts:105:28 TS2352 — Conversion of type 'ServiceWorkerRegistration & Record<"sync", unknown>' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/partner-workflows/enrollment.ts:451:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/hsi.ts:167:46 TS2339 — Property 'get' does not exist on type 'unknown'.
- lib/partners/hybrid-enrollment.ts:273:41 TS2339 — Property 'delivery_mode' does not exist on type '{ delivery_mode: any; }[]'.
- lib/partners/nds.ts:163:60 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/nrf.ts:108:46 TS2339 — Property 'get' does not exist on type 'unknown'.
- lib/video/adaptive-streaming.ts:185:23 TS2352 — Conversion of type 'Navigator' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/cm/dashboard/route.ts:109:29 TS2352 — Conversion of type '{ title: any; }[]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/export/route.ts:98:25 TS2345 — Argument of type 'string' is not assignable to parameter of type 'AuditLogEntry'.
- app/api/github/file/route.ts:35:38 TS2339 — Property 'content' does not exist on type '{ type: "file"; encoding: string; size: number; name: string; path: string; content: string; sha: string; url: string; git_url: string; html_url: string; download_url: string; \_links: { git: string; html: string; self: string; }; target?: string; submodule_git_url?: string; } | { ...; } | { ...; }'.
- app/api/license-request/route.ts:44:11 TS2304 — Cannot find name 'resend'.
- app/api/marketing/contacts/route.ts:90:52 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/payments/route.ts:201:60 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/referrals/route.ts:70:64 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/api/v1/enrollments/route.ts:160:59 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/webhooks/route.ts:98:81 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/portal/student/notifications/page.tsx:171:16 TS2304 — Cannot find name 'Link'.
- app/portal/student/settings/page.tsx:266:18 TS2786 — 'Image' cannot be used as a JSX component.
- app/tax-filing/locations/[state]/page.tsx:290:20 TS2304 — Cannot find name 'state'.
- app/tax-filing/locations/[state]/page.tsx:431:34 TS2304 — Cannot find name 'state'.
- app/api/analytics/reports/usage/delegate/route.ts:101:22 TS2339 — Property 'email' does not exist on type 'unknown'.
- app/api/analytics/reports/wioa-quarterly/route.ts:235:40 TS2339 — Property 'credentialsEarned' does not exist on type 'unknown'.
- app/api/admin/run-migrations/route.ts:45:60 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/courses/[courseId]/check-completion/route.ts:134:18 TS2345 — Argument of type 'PostgrestError' is not assignable to parameter of type 'string'.
- app/api/autopilots/run-tests/route.ts:79:38 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
