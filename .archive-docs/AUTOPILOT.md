# Autopilot: Dashboard Execution Gate (Builder Mode)

This repository is in **BUILDER MODE** for dashboard work.

## Locked Truth (Do Not Re-Audit)

The following docs are accepted as baseline truth:

- docs/dashboard-inventory.md
- docs/dashboard-canonical-architecture.md
- docs/dashboard-crossed-analysis.md
- scripts/verify-dashboard-database.sql

## Non-Negotiables

1. No placeholder UI ("coming soon"), no mock data.
2. No broken links: legacy routes must redirect to canonical routes.
3. No crossed dashboards: role guards + role-safe queries for every dashboard surface.
4. Schema truth is required: if a column/table is missing, implement migration (if supported) OR refactor to match actual schema.
5. Deliver in small logical commits.

## Canonical Dashboards

- Student: /lms/dashboard
- Admin: /admin/dashboard
- Program Holder: /program-holder/dashboard
- Employer: /employer/dashboard
- Staff: /staff-portal/dashboard
- Instructor: /instructor/dashboard

## Required Evidence

- docs/dashboard-schema-verification.md
- docs/dashboard-orphans-disposition.md
- docs/dashboard-consolidation-verification.md
- docs/autopilot-run-log.md
