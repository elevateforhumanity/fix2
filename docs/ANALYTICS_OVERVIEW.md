# Analytics & Reporting Overview

This release introduces the foundation for first-class analytics in the platform.

## Data Model

- `analytics_events` — canonical event log. Each row captures an `event_type`, optional `actor` metadata, arbitrary `properties`, and a timestamp.
- `analytics_daily_activity` — rolling 30-day view of daily event volume and distinct actors.
- `analytics_dashboard_metrics()` — SQL helper that bundles headline KPIs for the React admin dashboard.

All objects live in the `public` schema to keep Supabase policies straightforward. Add RLS policies before exposing events to learners.

## Instrumentation

Use `recordAnalyticsEvent` from `src/analytics/eventLogger.ts` whenever a meaningful product action occurs:

```ts
import { recordAnalyticsEvent } from '../analytics/eventLogger';

await recordAnalyticsEvent({
  eventType: 'course.completed',
  actor: { id: user.id, role: user.role, email: user.email },
  properties: { courseId },
});
```

The helper fails quietly in local development if Supabase credentials are missing. In production it stores the payload in `analytics_events`.

## Dashboard Consumption

`fetchDashboardMetrics` in `src/analytics/dashboard.ts` calls the Supabase function and normalises the JSON so the UI can render it. `AnalyticsPulse` (now visible on the admin dashboard) consumes these metrics and shows:

- Total events
- Event volume in the last 7 days
- Active students over 30 days
- Top events
- Daily activity table (30-day window)

Extend the component as more KPIs and visualisations become available.

## Next Steps

1. Define event naming conventions in product documentation.
2. Add background jobs to generate course-level aggregates or push data to a warehouse.
3. Build CSV export / API endpoints for admins who want raw datasets.
4. Layer in Supabase RLS policies so instructors only see analytics for their cohorts.
