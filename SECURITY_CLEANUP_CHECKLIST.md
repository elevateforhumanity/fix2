# Security Cleanup Checklist

This document tracks security remediation steps taken and remaining manual actions required.

## Completed Actions ✅

### 1. Hard-Coded Secrets Removal
- [x] Removed hard-coded secrets from `ACTIVATE_ALL_AUTOPILOT.sh`
  - Removed Netlify token (`nfp_ZQh1EUwZgJt939dcD3kb9sEYGk7DDgwPbaae`)
  - Removed Netlify Site ID (`12f120ab-3f63-419b-bc49-430f043415c1`)
  - Removed Supabase URL
  - Removed Supabase anon key
- [x] Script now requires environment variables
- [x] Added environment variable validation

### 2. Environment Configuration
- [x] Updated `.env.example` with placeholder keys
- [x] Added missing Cloudflare optional section
- [x] Added Netlify configuration section
- [x] Added autopilot feature flags:
  - `ENABLE_AUTOPILOT` (default: false)
  - `AUTOPILOT_COOLDOWN_SECONDS`
  - `AUTOPILOT_MODE`

### 3. Secret Detection
- [x] Created custom ESLint rule: `tools/eslint-rules/no-secret-literals.js`
- [x] Rule detects:
  - JWT tokens (eyJ* pattern)
  - Netlify tokens (nfp_* pattern)
  - AWS Access Keys
  - Private keys
  - Slack tokens
  - Bearer tokens
  - Generic API keys
- [x] Integrated rule into `eslint.config.js`
- [x] Set rule severity to 'error'

### 4. Autopilot Stabilization
- [x] Replaced `ACTIVATE_ALL_AUTOPILOT.sh` with secure version
- [x] Added lock file mechanism (`.autopilot-lock`)
- [x] Added required environment variable validation
- [x] Added conditional commit (only when changes exist)
- [x] Generates status JSON at `AUTOPILOT_SYSTEM/status.json`
- [x] Added cooldown/feature flag support
- [x] Created `scripts/autopilot-health.js` for health monitoring

### 5. Script Deprecation
- [x] Deprecated infinite loop scripts:
  - `autopilot-infinite-fix.sh`
  - `autopilot-loop.sh`
  - `autopilot-deploy-loop.sh`
- [x] Moved to `deprecated/` directory
- [x] Added deprecation headers with error messages
- [x] Created `deprecated/README.md` with migration guide

### 6. CI/CD Improvements
- [x] Created `.github/workflows/branch-protection-guard.yml`
  - Verifies required status checks
  - Validates conversation resolution setting
  - Checks strict up-to-date requirement
  - Validates admin enforcement
  - Fails workflow on drift (no issue creation)
- [x] Created `.github/workflows/autopilot-health.yml`
  - Runs every 30 minutes
  - Aggregates health metrics
  - Updates status JSON
  - Uploads artifacts

### 7. Repository Cleanup
- [x] Updated `.gitignore` to exclude:
  - `*.tar.gz` (with specific exceptions)
  - `*.zip` (with specific exceptions)
  - Large bundle files
  - Lock files (`.autopilot-lock`)
- [x] Created `RELEASE_ARTIFACTS.md` guidance
- [x] Documented migration to GitHub Releases

### 8. Documentation
- [x] Created `AUTOPILOT_SYSTEM/README.md`
  - Status JSON field explanations
  - Health workflow documentation
  - Troubleshooting guide
  - Configuration options
- [x] Created `AUTOPILOT_SYSTEM/INCIDENT_GUIDE.md`
  - Bulk issue closure procedures
  - Prevention measures
  - Monitoring guidelines
- [x] Created `.github/CODEOWNERS`
- [x] Created initial `AUTOPILOT_SYSTEM/status.json`
- [x] Created this checklist

### 9. Tooling
- [x] Created `scripts/close-autopilot-issues.sh`
  - Dry-run mode by default
  - Deduplication logic
  - Confirmation prompt in execute mode
  - Rate limiting

## Pending Manual Actions ⏳

### 1. Token Rotation (HIGH PRIORITY)
**Timeline**: Complete within 24-48 hours

The following tokens were exposed in `ACTIVATE_ALL_AUTOPILOT.sh` and should be rotated:

#### Netlify Token
- [ ] Log into Netlify dashboard: https://app.netlify.com/
- [ ] Navigate to User Settings > Applications > Personal Access Tokens
- [ ] Revoke token: `nfp_ZQh1EUwZgJt939dcD3kb9sEYGk7DDgwPbaae`
- [ ] Generate new token with minimal required scopes
- [ ] Update GitHub Secrets with new token: `NETLIFY_AUTH_TOKEN`
- [ ] Update local `.env` file (never commit)
- [ ] Test deployment with new token

#### Supabase Keys (if compromised)
- [ ] Log into Supabase dashboard: https://app.supabase.com/
- [ ] Check "API Keys" for project: `cuxzzpsyufcewtmicszk`
- [ ] Evaluate if anon key needs rotation (assess exposure risk)
- [ ] If rotating: Generate new anon key
- [ ] Update GitHub Secrets: `SUPABASE_ANON_KEY`
- [ ] Update Netlify environment variables
- [ ] Update local `.env` file

**Note**: The Supabase anon key shown was partially masked (dots at end suggest truncation). Verify the actual key and assess compromise risk.

### 2. GitHub Secrets Configuration
- [ ] Navigate to repository Settings > Secrets and variables > Actions
- [ ] Add/update required secrets:
  ```
  NETLIFY_AUTH_TOKEN=<new-token>
  NETLIFY_SITE_ID=<site-id>
  SUPABASE_URL=<url>
  SUPABASE_ANON_KEY=<new-key>
  CLOUDFLARE_API_TOKEN=<token> (if using)
  ```
- [ ] Verify secrets are available to workflows

### 3. Bulk Issue Closure
**Timeline**: Can be done after PR merge

- [ ] Review open issues with autopilot labels
- [ ] Run dry-run: `./scripts/close-autopilot-issues.sh`
- [ ] Review report: `AUTOPILOT_SYSTEM/issue-closure-plan.md`
- [ ] Execute closure: `./scripts/close-autopilot-issues.sh --execute`
- [ ] Monitor for any false positives
- [ ] Reopen any legitimate issues that were closed

### 4. Branch Protection Configuration
- [ ] Navigate to repository Settings > Branches
- [ ] Configure protection rules for `main`:
  - [x] Require pull request reviews (if not already set)
  - [ ] Require status checks to pass:
    - `build-test`
    - `check`
  - [ ] Require conversation resolution
  - [ ] Require branches to be up to date before merging
  - [ ] Do not allow bypassing (enforce for administrators)
- [ ] Run workflow to verify: `.github/workflows/branch-protection-guard.yml`

### 5. Environment Setup Verification
- [ ] Create `.env` file from `.env.example`
- [ ] Set `ENABLE_AUTOPILOT=false` initially
- [ ] Configure all required variables
- [ ] Test autopilot activation:
  ```bash
  export ENABLE_AUTOPILOT=true
  ./ACTIVATE_ALL_AUTOPILOT.sh
  ```
- [ ] Verify `AUTOPILOT_SYSTEM/status.json` is updated
- [ ] Check GitHub Actions for health check execution

### 6. Pre-commit Hook Setup (Optional but Recommended)
- [ ] Install Husky (already in package.json)
- [ ] Configure pre-commit hook:
  ```bash
  npx husky install
  npx husky add .husky/pre-commit "npm run lint"
  ```
- [ ] Test that ESLint secret detection runs on commit
- [ ] Document hook setup in contribution guidelines

### 7. Historical Audit
- [ ] Search repository history for any other exposed secrets:
  ```bash
  git log -p -S "nfp_" --all
  git log -p -S "eyJhbGci" --all
  git log -p -S "AKIA" --all
  ```
- [ ] If found, consider using tools like:
  - `git-filter-repo` to remove from history
  - GitHub's secret scanning alerts
- [ ] Rotate any other discovered secrets

## Security Best Practices Going Forward

### For Developers
1. **Never commit secrets** - Always use environment variables
2. **Review PRs carefully** - Check for accidental secret commits
3. **Use `.env` files** - Keep them in `.gitignore`
4. **Run linting** - ESLint will catch many secret patterns
5. **Test locally** - Verify changes before pushing

### For Maintainers
1. **Rotate secrets regularly** - Every 90 days minimum
2. **Monitor GitHub security alerts** - Enable and review
3. **Review access logs** - Check for unauthorized API usage
4. **Principle of least privilege** - Grant minimal necessary permissions
5. **Document incidents** - Update this checklist as needed

### For CI/CD
1. **Use GitHub Secrets** - Never hardcode in workflows
2. **Limit scope** - Only grant workflows necessary permissions
3. **Audit regularly** - Review workflow runs for anomalies
4. **Separate environments** - Use different secrets for dev/staging/prod

## Validation Steps

After completing manual actions:

### 1. Secret Validation
```bash
# Should find no secrets in code
npm run lint
# or
pnpm lint

# Check for secrets in git history (should return nothing)
git log --all -p -S "nfp_ZQh1" --since="2024-01-01"
```

### 2. Autopilot Functionality
```bash
# Test environment setup
source .env  # or load your .env file
./ACTIVATE_ALL_AUTOPILOT.sh

# Verify status
cat AUTOPILOT_SYSTEM/status.json
```

### 3. Workflow Validation
- [ ] Push a test commit
- [ ] Verify `autopilot-health` workflow runs
- [ ] Verify `branch-protection-guard` workflow passes
- [ ] Check artifacts are uploaded

### 4. Lock Mechanism
```bash
# Start autopilot
./ACTIVATE_ALL_AUTOPILOT.sh &

# Try to start again (should fail with lock error)
./ACTIVATE_ALL_AUTOPILOT.sh

# Wait for first run to complete
wait
```

## Incident Response Plan

If a secret is compromised:

1. **Immediate** (within 1 hour):
   - Revoke/rotate the compromised secret
   - Assess scope of exposure (who, when, how long)
   - Check access logs for unauthorized usage

2. **Short-term** (within 24 hours):
   - Update all systems using the old secret
   - Notify stakeholders if necessary
   - Document the incident

3. **Long-term** (within 1 week):
   - Review how the exposure occurred
   - Update processes to prevent recurrence
   - Consider additional tooling (secret scanning, etc.)

## Contact Information

**Security Issues**: Report to repository maintainers
**Questions**: See `AUTOPILOT_SYSTEM/README.md` or create an issue

## Changelog

- **2024-11-09**: Initial checklist created
  - Documented completed security remediation
  - Listed pending manual actions
  - Added validation steps

---

**Last Updated**: 2024-11-09
**Status**: Remediation complete, manual actions pending
**Priority**: High (token rotation), Medium (other items)
