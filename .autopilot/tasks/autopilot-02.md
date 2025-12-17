# Autopilot 02 Mission

Assigned errors: 27

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/actions/enrollments.ts:247:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/data/careers.ts:57:6 TS2339 — Property 'from' does not exist on type 'Promise<SupabaseClient<any, "public", "public", any, any>>'.
- lib/dataExport.ts:40:26 TS2352 — Conversion of type '{ key: string; label: string; }' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/partner-workflows/certificates.ts:129:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partner-workflows/certificates.ts:324:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/http-client.ts:89:45 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/http-client.ts:122:33 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/nrf.ts:35:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/nrf.ts:57:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/alert-scraper/route.ts:117:32 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Record<string, any>'.
- app/api/checkout/career/route.ts:14:5 TS2322 — Type '"2024-12-18.acacia"' is not assignable to type '"2025-10-29.clover"'.
- app/api/funding/admin/report/route.ts:57:69 TS2339 — Property 'toLowerCase' does not exist on type 'unknown'.
- app/api/gdpr/export/route.ts:27:7 TS2345 — Argument of type 'string | { profile: any; enrollments: any[]; certificates: any[]; assignments: any[]; grades: any[]; notes: any[]; messages: any[]; exportDate: string; dataSubject: string; }' is not assignable to parameter of type 'BodyInit'.
- app/api/lti/launch/route.ts:28:62 TS2339 — Property 'family_name' does not exist on type 'unknown'.
- app/api/marketing/campaigns/[id]/send/route.ts:80:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/preview/render/route.ts:107:43 TS2339 — Property 'content' does not exist on type '{ type: "file"; encoding: string; size: number; name: string; path: string; content: string; sha: string; url: string; git_url: string; html_url: string; download_url: string; \_links: { git: string; html: string; self: string; }; target?: string; submodule_git_url?: string; } | { ...; } | { ...; }'.
- app/api/programs/checkout/route.ts:8:7 TS2322 — Type '"2024-11-20.acacia"' is not assignable to type '"2025-10-29.clover"'.
- app/api/webhooks/partners/[partner]/route.ts:6:41 TS2305 — Module '"@/lib/partners"' has no exported member 'WebhookPayload'.
- app/api/webhooks/partners/[partner]/route.ts:84:18 TS2339 — Property 'processWebhook' does not exist on type 'BasePartnerAPI'.
- app/portal/student/notifications/page.tsx:219:15 TS2304 — Cannot find name 'Link'.
- app/portal/student/settings/page.tsx:29:9 TS2607 — JSX element class does not support attributes because it does not have a 'props' property.
- app/tax-filing/locations/[state]/page.tsx:371:24 TS2304 — Cannot find name 'state'.
- app/tax-filing/locations/[state]/page.tsx:378:46 TS2304 — Cannot find name 'state'.
- app/api/analytics/reports/usage/route.ts:160:33 TS2339 — Property 'slice' does not exist on type 'unknown'.
- app/api/analytics/reports/wioa-quarterly/route.ts:228:37 TS2339 — Property 'totalCompleted' does not exist on type 'unknown'.
- app/api/admin/test-email/route.ts:34:24 TS2304 — Cannot find name 'resend'.
- app/api/admin/vercel-hard-refresh/route.ts:48:48 TS2345 — Argument of type 'string' is not assignable to parameter of type 'Error'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
