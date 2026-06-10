# Codex Handoff: Finish Elevate Dev Studio and Admin Data Cleanup

## User-reported production symptoms

- Admin login succeeds, but opening the Dev Studio/container flow lands on `/unauthorized?reason=platform_operator`.
- Admin dashboard header/runtime cards show `Runtime: unknown`, `Enrollments: 0`, and `AI: unknown` even while the dashboard body shows real operational data.
- The dashboard includes stale or duplicated operational rows, including repeated recent applications/activity, very old stale leads, and compliance/system-health cards that may be fallback or hard-coded data.
- Publish/deploy controls show `UNAUTHORIZED` and `Northflank API token not configured — set NORTHFLANK_API_TOKEN in production secrets`.
- Program Integrity shows `Could not load program integrity data`.
- Job Board feed cards show `Last import Never` and government feed approvals are not complete.
- Stripe Webhook/System Health reports `Not approved`, stale jobs, missing build env, and `Stripe Issuing unavailable (stripe_400)`.

## Immediate priority order for Codex

1. **Fix Dev Studio access without weakening admin security.**
   - Verify the logged-in owner/admin profile row in Supabase has the expected role.
   - Align every guard that protects `/admin/dev-studio`, its API endpoints, and the deploy/container actions around one server-side platform-operator policy.
   - The minimum accepted roles for Dev Studio should be documented in code. If the product wants only `super_admin` and `platform_operator`, do not silently allow every admin; instead add a clear admin UI explaining how to grant the platform-operator role.
   - Make `/api/auth/check-admin` available and keep it in sync with the page-level guard so the client-side Dev Studio page does not fail on a missing auth endpoint.

2. **Replace hard-coded/fallback dashboard data with database-backed queries.**
   - Trace the rendered Admin OS dashboard components for: top runtime strip, operations cards, priorities, recent activity, recent applications, compliance alerts, program integrity, job board, and system health.
   - Remove static arrays/mock fixtures from the production dashboard path unless they are explicitly labeled demo-only and hidden in production.
   - For each card, return one of these states only: real data, empty state, or actionable configuration error. Do not render fake counts/names/dates as production truth.

3. **Fix duplicate recent applications/activity.**
   - Add deterministic de-duplication by application ID/event ID before rendering.
   - If duplicate rows exist in the database, add an admin-safe cleanup script or migration plan with dry-run output first.
   - Add tests for repeated webhook/form submissions so one person applying once does not create five dashboard events.

4. **Complete deploy/publish secrets and Northflank integration.**
   - Confirm production has `NORTHFLANK_API_TOKEN`, project IDs, service IDs, GitHub workflow tokens, and any ISR revalidation secret used by the publish button.
   - Server-side deploy routes must fail with a specific missing-secret list, not a generic unauthorized state.
   - Add an integration health endpoint consumed by the UI so the deploy card can say exactly which credential/action is missing.

5. **Make runtime/AI/enrollment header health real.**
   - Wire `Runtime` to the live app runtime/build/deployment health endpoint.
   - Wire `Enrollments` to the same active-enrollment query used by the dashboard metrics.
   - Wire `AI` to configured provider status and model availability, with safe degraded states when keys are absent.

6. **Fix Program Integrity and compliance cards.**
   - Identify the failing query/API behind Program Integrity and surface the exact Supabase/PostgREST error in server logs.
   - Ensure compliance alerts come from a governed table with timestamps, severity, status, and owner, not static placeholder cards.

7. **Finish job-board feed setup.**
   - Make USAJobs.gov, CareerOneStop, and Indiana Career Connect approval/config state database-backed.
   - Add last-import timestamps and import error messages.
   - Ensure the public job board never claims an import occurred when feeds are unconfigured.

8. **Stabilize Stripe system-health reporting.**
   - Verify webhook endpoint registration, webhook signing secret, and event delivery from Stripe.
   - If Stripe Issuing is unavailable for the account, show it as `Not enabled for this Stripe account` instead of a production outage unless a feature depends on it.

## Definition of done

- `/admin/dev-studio` opens for the intended platform operator account and denies everyone else with a clear, actionable message.
- No production admin dashboard component renders fake names, fake counts, or fake dates as if they are live data.
- Missing integrations show specific environment variable/configuration names and where to set them.
- Recent applications and recent activity are de-duplicated and covered by tests.
- The deploy/publish control can report GitHub, Northflank, ISR, and admin authorization status independently.
- A smoke test validates login, `/admin`, `/admin/dashboard`, `/admin/dev-studio`, publish health, and program integrity health.

## Suggested verification commands

```bash
pnpm typecheck
pnpm lint
pnpm test -- --runInBand
pnpm build
```

## Production configuration checklist

- `NORTHFLANK_API_TOKEN`
- Northflank project/service IDs for public site, LMS, and admin dashboard
- GitHub workflow dispatch token or GitHub App credentials
- ISR/revalidation secret used by the publish/update website flow
- Stripe secret key and webhook signing secret
- AI provider API keys and selected model names
- Job feed credentials/API keys and approval flags
- Supabase service role key only on server-side routes that truly require it
