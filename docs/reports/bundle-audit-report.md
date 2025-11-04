# Bundle Audit Report

- Started: 2025-11-03T19:37:29+00:00
- Bundle: deployment-bundle-20251103-193720.tar.gz

✅ Gzip integrity: OK

## 1) File Inventory

```
./BUNDLE_README.md
./DEPLOYMENT_GUIDE.md
./README.md
./admin-pages/AdminLayout.tsx
./admin-pages/Analytics.tsx
./admin-pages/Assessments.tsx
./admin-pages/Audit.tsx
./admin-pages/Billing.tsx
./admin-pages/Community.tsx
./admin-pages/Courses.tsx
./admin-pages/Dashboard.tsx
./admin-pages/Integrations.tsx
./admin-pages/Launchpad.tsx
./admin-pages/Marketing.tsx
./admin-pages/Users.tsx
./edge-functions/ai-course-create/index.ts
./edge-functions/email-dispatch/index.ts
./edge-functions/grade-ai/index.ts
./edge-functions/webhook-dispatch/index.ts
./migrations/20251103_admin_features.sql
./migrations/20251103_admin_features_rls.sql
./migrations/20251103_cron_jobs.sql
./migrations/20251103_missing_tables.sql
./migrations/20251103_missing_tables_rls.sql
./routing/AdminRoutes.tsx
./routing/AllRoutes.tsx
./scripts/configure-env-vars.sh
./scripts/deploy-edge-functions.sh
./scripts/run-migrations.sh
./scripts/test-admin-routes.sh
./scripts/test-edge-functions.sh
./scripts/verify-rls-policies.sh
./utilities/analyticsTracking.ts
./utilities/assessments.ts
```

## 2) Structure Validation

- ✅ Structure: All expected top-level files found.

## 3) Migration Order & RLS Policies

- Found 5 migration file(s).
  - 20251103_admin_features.sql
