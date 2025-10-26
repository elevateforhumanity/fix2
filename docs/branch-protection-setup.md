# Branch Protection Setup - Mobile Performance Gates

## Overview

This document describes how to configure GitHub branch protection rules to gate merges on mobile performance. Both desktop and mobile Lighthouse CI jobs must pass before PRs can be merged to `main`.

**Autopilot Mode:** This repository includes automated scripts and workflows to apply and monitor branch protection rules. See [Autopilot Setup](#autopilot-setup) for the fastest path.

## Required Status Checks

The Performance CI workflow runs two jobs in a matrix:

- `lhci (desktop)` - Desktop performance testing
- `lhci (mobile)` - Mobile performance testing (stricter thresholds)

Both jobs must pass for the PR to be mergeable.

## Autopilot Setup

### Quick Start (Recommended)

The repository includes automated tools to apply and monitor branch protection:

1. **One-time setup:** Add `REPO_ADMIN_TOKEN` secret to your repository
   - Go to Settings → Secrets and variables → Actions → New repository secret
   - Name: `REPO_ADMIN_TOKEN`
   - Value: Personal Access Token (classic) with `repo` + `admin:repo_hook` scope
   - Or: Fine-grained token with "Repository administration: Read and write"

2. **Apply protection:** Run the workflow
   - Go to Actions → "Apply Branch Protection" → Run workflow
   - Uses defaults: `main` branch, `elevateforhumanity/fix2` repo
   - Or run locally: `bash autopilot/branch-protection/setup-branch-protection.sh`

3. **Continuous monitoring:** Automatic
   - "Branch Protection Guard" runs on every push to `main` + nightly at 3:19 AM UTC
   - Auto-detects drift (missing checks, disabled settings)
   - Opens/updates GitHub issue if protection is weakened
   - No action needed unless issue is created

### Files

- `autopilot/branch-protection/setup-branch-protection.sh` - Apply protection via gh CLI
- `autopilot/branch-protection/audit-branch-protection.mjs` - Verify protection settings
- `.github/workflows/branch-protection-apply.yml` - Manual workflow to apply protection
- `.github/workflows/branch-protection-guard.yml` - Continuous monitoring + auto-issue

## Manual Setup Instructions

### Option 1: GitHub Web UI

1. Navigate to your repository: `https://github.com/elevateforhumanity/fix2`

2. Go to **Settings** → **Branches** → **Branch protection rules**

3. Click **Add rule** (or edit existing rule for `main`)

4. Configure the following settings:

   **Branch name pattern:**

   ```
   main
   ```

   **Protect matching branches:**
   - ✅ Require a pull request before merging
     - ✅ Require approvals: `1` (recommended)
     - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
     - ✅ Require branches to be up to date before merging
     - **Add required status checks:**
       - `lhci (desktop)` ← Type this and select from dropdown
       - `lhci (mobile)` ← Type this and select from dropdown
   - ✅ Require conversation resolution before merging (optional but recommended)
   - ✅ Do not allow bypassing the above settings (recommended for production)

5. Click **Create** or **Save changes**

### Option 2: GitHub CLI (Autopilot Script)

Use the included setup script:

```bash
# With defaults (elevateforhumanity/fix2, main branch)
bash autopilot/branch-protection/setup-branch-protection.sh

# Or customize
REPO_SLUG=owner/repo BRANCH=main REQUIRED_CHECKS="lhci (desktop),lhci (mobile)" \
bash autopilot/branch-protection/setup-branch-protection.sh
```

Requires: `gh` CLI authenticated with repo admin permissions

### Option 3: Terraform (Infrastructure as Code)

```hcl
resource "github_branch_protection" "main" {
  repository_id = "elevateforhumanity/fix2"
  pattern       = "main"

  required_status_checks {
    strict   = true
    contexts = [
      "lhci (desktop)",
      "lhci (mobile)"
    ]
  }

  required_pull_request_reviews {
    required_approving_review_count = 1
    dismiss_stale_reviews          = true
  }

  enforce_admins                = true
  require_conversation_resolution = true
}
```

## Performance Thresholds

### Mobile (Stricter)

- **Performance Score:** ≥92%
- **FCP:** ≤1800ms (median)
- **LCP:** ≤2200ms (median)
- **TBT:** ≤150ms (median)
- **CLS:** ≤0.08 (median)

### Desktop

- **Performance Score:** ≥90%
- **FCP:** ≤2000ms (median)
- **LCP:** ≤2500ms (median)
- **TBT:** ≤200ms (median)
- **CLS:** ≤0.1 (median)

### Route-Specific Budgets

Both presets enforce route-specific budgets:

- **Homepage:** Strictest targets (primary user entry point)
- **Programs:** Slightly relaxed (media-heavy content)
- **Blog:** Balanced targets

See `autopilot/performance/budgets.json` and `autopilot/performance/budgets.mobile.json` for full details.

## Workflow Behavior

### On Pull Request

- Triggers `perf-ci.yml` workflow
- Runs both desktop and mobile jobs in parallel
- Auto-syncs URLs from production sitemap
- Tests all critical paths (homepage, programs, blog, etc.)
- Fails PR if either job fails

### Nightly

- Triggers `nightly-lhci.yml` at 2:27 AM UTC
- Same matrix strategy (desktop + mobile)
- Monitors production performance trends
- Alerts on regressions

## Troubleshooting

### Status checks not appearing

1. Merge at least one PR to `main` that triggers the workflow
2. GitHub needs to see the check run once before it appears in the dropdown
3. After first run, the status checks will be available for selection

### Mobile job failing but desktop passing

This is expected behavior. Mobile has stricter thresholds because:

- Mobile users have slower devices and networks
- Mobile-first indexing means Google prioritizes mobile performance
- 60%+ of traffic is mobile

**Quick wins for mobile:**

- Compress hero images to ≤150KB
- Preconnect fonts: `<link rel="preconnect" href="https://fonts.googleapis.com">`
- Inline critical CSS (above-the-fold styles)
- Defer non-critical JS: `<script defer>`
- Remove unused third-party embeds
- Use CSS animations instead of JS where possible

### Bypassing checks (emergency only)

If you need to bypass checks temporarily:

1. Go to Settings → Branches → Edit rule
2. Uncheck "Do not allow bypassing the above settings"
3. Admins can then force-merge
4. **Re-enable immediately after emergency**

## Monitoring

### Autopilot Guard

The "Branch Protection Guard" workflow continuously monitors protection settings:

- **Triggers:** Every push to `main`, nightly at 3:19 AM UTC, manual dispatch
- **Checks:** Required status checks present, strict mode enabled, conversation resolution, enforce admins
- **On drift:** Opens GitHub issue "Branch protection drift: Mobile/desktop performance gates"
- **Auto-updates:** Adds comment to existing issue if already open

**Manual audit:**

```bash
REPO_SLUG=elevateforhumanity/fix2 BRANCH=main GITHUB_TOKEN=$GH_TOKEN \
node autopilot/branch-protection/audit-branch-protection.mjs
```

### Local Testing

```bash
# Test desktop performance locally
pnpm perf:desktop

# Test mobile performance locally
pnpm perf:mobile
```

### CI Logs

- View workflow runs: `https://github.com/elevateforhumanity/fix2/actions`
- Filter by workflow: "Performance CI" or "Nightly Lighthouse"
- Check individual job logs for detailed Lighthouse reports

### Lighthouse Reports

- Each run uploads reports to temporary public storage
- Links appear in CI logs
- Reports expire after 7 days

## Best Practices

1. **Run locally before pushing:** Use `pnpm perf:mobile` to catch issues early
2. **Optimize images first:** Biggest impact on LCP
3. **Monitor bundle size:** Use `rollup-plugin-visualizer` to identify bloat
4. **Test on real devices:** Lighthouse simulates mobile, but real devices reveal more
5. **Track trends:** Review nightly reports weekly to catch gradual regressions

## Slack/Teams Notifications

The performance CI includes optional webhook notifications for regressions.

### Setup

1. **Create webhook URL:**
   - **Slack:** [Create Incoming Webhook](https://api.slack.com/messaging/webhooks)
   - **Teams:** [Create Incoming Webhook](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook)

2. **Add secrets to repository:**
   - Go to Settings → Secrets and variables → Actions
   - Add `SLACK_PERF_WEBHOOK` (optional)
   - Add `TEAMS_PERF_WEBHOOK` (optional)

3. **Notification triggers:**
   - PR fails mobile (score <92%, LCP >2200ms, TBT >150ms, CLS >0.08)
   - PR fails desktop (score <90%, LCP >2500ms, TBT >200ms, CLS >0.1)
   - Nightly run detects regression

### Notification Format

**Slack:**

- Header: "⚠️ Performance Regression Detected"
- Context: Repository, PR number (if applicable)
- Failures: List of threshold violations per preset
- Deltas: Score and LCP changes vs baseline (if available)
- Actions: "View Run" and "View PR" buttons

**Teams:**

- Adaptive card with same information
- Red theme color for visibility
- Action buttons for run and PR links

### Testing

Trigger a notification by temporarily lowering a threshold in `lighthouseci.js`:

```javascript
'categories:performance': ['error', { minScore: 0.99 }], // Will fail
```

Push to PR and check your Slack/Teams channel.

## Related Files

- `autopilot/performance/lighthouseci.js` - Lighthouse CI configuration
- `autopilot/performance/budgets.json` - Desktop performance budgets
- `autopilot/performance/budgets.mobile.json` - Mobile performance budgets
- `autopilot/performance/urls.txt` - Critical path URLs
- `autopilot/performance/fetch-sitemap.mjs` - Auto-sync script
- `autopilot/performance/summarize-lh.mjs` - Metric extractor
- `autopilot/performance/policy-report.mjs` - PR comment generator
- `autopilot/performance/notify-regression.mjs` - Slack/Teams notifier
- `.github/workflows/perf-ci.yml` - PR performance checks
- `.github/workflows/nightly-lhci.yml` - Nightly performance monitoring
