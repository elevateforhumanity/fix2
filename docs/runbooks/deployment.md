# Deployment Runbook

## Environments

- **Staging** – `staging.elevateforhumanity.org`
- **Production** – `elevateforhumanity.org`

## CI/CD Overview

- GitHub Actions workflow: `.github/workflows/ci-cd.yml`
- On `main` branch:
  - Lint + type-check + tests
  - Supabase migrations
  - Vercel build and deploy

## Standard Deploy Process

1. Create feature branch from `main`.
2. Implement changes and add tests.
3. Open Pull Request.
4. Ensure CI passes.
5. Request code review.
6. Merge to `main`.
7. Verify:
   - Health checks
   - Critical flows (login, enrollment, course launch).

## Rollback

If a release is broken:

1. In Vercel, select previous deployment and **Promote to Production**.
2. Create GitHub issue tagged `rollback` with:
   - Reason
   - Logs / screenshots
3. Fix in new branch and repeat standard process.
