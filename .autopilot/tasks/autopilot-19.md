# Autopilot 19 Mission

Assigned errors: 28

## Rules

- No @ts-ignore, no any, no masking tsconfig, no disabling lint.
- Fix the type OR add runtime validation (zod/etc) where data is unknown.
- Add/adjust tests when changing logic.

## Error List (file:line:col code)

- lib/admin/bulk-import.ts:91:16 TS2339 — Property 'fundingSource' does not exist on type 'unknown'.
- lib/autopilot/runner.ts:52:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/dataExport.ts:344:23 TS2352 — Conversion of type '{ title: any; category: any; }[]' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/native/native-features.ts:323:30 TS2352 — Conversion of type 'Navigator & Record<"getBattery", unknown>' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- lib/partners/careersafe.ts:85:57 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/hsi.ts:82:49 TS2554 — Expected 1-2 arguments, but got 3.
- lib/partners/jri.ts:92:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/partners/nds.ts:71:46 TS2339 — Property 'post' does not exist on type 'unknown'.
- lib/partners/nrf.ts:196:22 TS2339 — Property 'message' does not exist on type 'unknown'.
- lib/seo.ts:103:7 TS2353 — Object literal may only specify known properties, and 'bing' does not exist in type 'Verification'.
- app/api/cron/end-of-day-summary/route.ts:68:47 TS2339 — Property 'email' does not exist on type '{ id: any; email: any; full_name: any; }[]'.
- app/api/events/[id]/register/route.ts:90:20 TS2339 — Property 'message' does not exist on type 'unknown'.
- app/api/github/file/route.ts:120:24 TS2339 — Property 'status' does not exist on type 'unknown'.
- app/api/hr/time-entries/route.ts:41:50 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/meetings/create/route.ts:111:45 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/partner-courses/create-checkout/route.ts:114:44 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/security/log/route.ts:58:3 TS2304 — Cannot find name 'logger'.
- app/api/tutorials/route.ts:64:29 TS2339 — Property 'id' does not exist on type 'unknown'.
- app/auth/signup/SignUpForm.tsx:276:137 TS2339 — Property 'checked' does not exist on type 'EventTarget & (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)'.
- app/portal/student/calendar/page.tsx:70:15 TS2304 — Cannot find name 'Link'.
- app/programs/page-old-backup.tsx:49:30 TS2339 — Property 'description' does not exist on type 'Program'.
- app/tax-filing/locations/[state]/page.tsx:204:41 TS2304 — Cannot find name 'state'.
- components/DonationForm.tsx:45:53 TS2339 — Property 'redirectToCheckout' does not exist on type 'Stripe'.
- app/api/analytics/dropout-risk/route.ts:121:52 TS2345 — Argument of type 'unknown' is not assignable to parameter of type 'Error'.
- app/api/analytics/reports/wioa/route.ts:10:9 TS2352 — Conversion of type 'Session' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
- app/api/admin/learner/notes/route.ts:41:39 TS2339 — Property 'name' does not exist on type 'unknown'.
- app/api/courses/metadata/route.ts:39:43 TS2339 — Property 'content' does not exist on type '{ type: "file"; encoding: string; size: number; name: string; path: string; content: string; sha: string; url: string; git_url: string; html_url: string; download_url: string; \_links: { git: string; html: string; self: string; }; target?: string; submodule_git_url?: string; } | { ...; } | { ...; }'.
- app/api/affirm/checkout/route.ts:67:34 TS2339 — Property 'email' does not exist on type 'unknown'.

## Proof of Done (paste outputs)

- pnpm -s typecheck
- pnpm -s lint
- pnpm -s test
