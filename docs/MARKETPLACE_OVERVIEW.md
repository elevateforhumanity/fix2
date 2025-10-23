# Marketplace Connector Architecture

This document outlines how we manage third-party integrations (LTI, HRIS, CRM, content packs) through a plugin-style marketplace.

## Goals

- Allow admins to enable connectors without redeploying the app.
- Encapsulate partner-specific logic (auth, data mapping, sync schedules).
- Emit consistent telemetry so we can troubleshoot integrations.
- Provide a foundation for offering prebuilt content packages.

## Key Concepts

| Concept                  | Description                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `Connector`              | Implementation of the integration contract. Lives under `src/integrations/connectors`.    |
| `ConnectorRegistry`      | In-memory registry (backed by Supabase in production). Available via `connectorRegistry`. |
| `ConnectorConfiguration` | Admin-provided metadata and flags for a connector instance.                               |
| `ConnectorRuntime`       | Helpers (Supabase client, fetch, logging, secret resolution). Injected at runtime.        |
| `ConnectorEvent`         | Telemetry payload emitted by connectors for observability.                                |

## First-party Connectors

Two starter connectors are included:

- `LtiDeepLinkConnector` – Validates required secrets for LTI 1.3 deep linking and emits sync events.
- `WorkdayHrisConnector` – Demonstrates how to validate API credentials and prepare roster syncs.

Register additional connectors within `src/integrations/index.ts` or create a dynamic loader that fetches metadata from Supabase.

## Usage Flow

1. Load connector metadata for the tenant from Supabase (e.g. `integrations` table).
2. For each entry, create a `ConnectorContext` with the configuration and runtime helpers.
3. Call `connectorRegistry.verify(config, context)` during setup.
4. Trigger `connector.sync?(context)` on a schedule or in response to an event queue.
5. Route inbound partner webhooks to `connector.handleWebhook?.(payload, context)`.

## Next Steps

- Persist enabled connectors and secrets in Supabase (`integrations`, `integration_secrets` tables).
- Build an admin UI (React) to enable/disable connectors and view telemetry.
- Add background workers (Cloudflare or Supabase cron) to schedule `sync()` operations.
- Publish partner onboarding docs that map to this interface.
