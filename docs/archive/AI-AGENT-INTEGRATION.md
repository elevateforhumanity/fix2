# 🤖 AI Agent Integration Guide

## Overview

Your Elevate For Humanity app now has AI agents integrated into the autopilot system, following your existing infrastructure patterns from the cheat sheet.

## ✅ What's Integrated

### 1. AI Code Review Agent

- **Triggers**: Automatically on every PR
- **What it does**: Reviews code changes, checks patterns, suggests improvements
- **Results**: Posted as PR comments
- **Storage**: Sent to Durable Objects for historical tracking

### 2. AI Security Scan Agent

- **Triggers**: Manual or on-demand
- **What it does**: Scans for secrets, SQL injection, XSS vulnerabilities
- **Results**: Security report generated
- **Storage**: Stored in Durable Objects

### 3. AI Performance Audit Agent

- **Triggers**: Manual or on-demand
- **What it does**: Analyzes bundle size, checks for anti-patterns
- **Results**: Performance recommendations
- **Storage**: Tracked over time in Durable Objects

### 4. AI Documentation Check Agent

- **Triggers**: Manual or on-demand
- **What it does**: Verifies README files, JSDoc comments, TODOs
- **Results**: Documentation coverage report
- **Storage**: Historical documentation metrics

## 🚀 Quick Start (From Your Cheat Sheet)

### Automatic (No Action Needed)

```bash
# AI code review runs automatically on every PR
# Just create a PR and the agent reviews it
git checkout -b feature/my-feature
git add .
git commit -m "Add new feature"
git push origin feature/my-feature
gh pr create
```

### Manual Triggers

```bash
# Run security scan
gh workflow run ai-agent-autopilot.yml -f agent_task=security_scan

# Run performance audit
gh workflow run ai-agent-autopilot.yml -f agent_task=performance_audit

# Run documentation check
gh workflow run ai-agent-autopilot.yml -f agent_task=documentation_check

# View results
gh run list --workflow=ai-agent-autopilot.yml --limit 5
```

## 📊 View AI Agent Results

### Via Durable Objects API

```bash
# Get AI agent summary
curl https://efh-autopilot-metrics.workers.dev/ai-summary | jq .

# Get recent AI results
curl https://efh-autopilot-metrics.workers.dev/ai-summary | jq '.recentResults'
```

### Via GitHub

```bash
# View workflow runs
gh run list --workflow=ai-agent-autopilot.yml

# View specific run
gh run view <run-id>

# View PR comments (for code reviews)
gh pr view <pr-number>
```

## 🔄 Integration with Existing Autopilot

### Follows Your Patterns

✅ Uses existing GitHub workflows structure
✅ Integrates with Durable Objects (like your health checks)
✅ Follows your cheat sheet command patterns
✅ No duplicate workflows created
✅ Uses existing secrets (AUTOPILOT_TOKEN)

### Data Flow

```
PR Created → AI Code Review → Comment on PR → Store in Durable Objects
Manual Trigger → AI Agent Task → Generate Report → Store in Durable Objects
```

### Storage Pattern (Same as Health Checks)

```
Durable Object
├── /store              (health check results)
├── /store-ai-results   (AI agent results)  ← NEW
├── /summary            (health metrics)
├── /ai-summary         (AI metrics)        ← NEW
└── /recent             (recent checks)
```

## 🎯 Use Cases

### 1. Before Merging PR

```bash
# AI automatically reviews code
# Check the PR for AI comments
gh pr view <pr-number>

# If issues found, fix and push
git add .
git commit -m "Fix AI review suggestions"
git push
```

### 2. Security Audit

```bash
# Run security scan
gh workflow run ai-agent-autopilot.yml -f agent_task=security_scan

# Wait for completion
gh run watch

# View results
gh run view --log
```

### 3. Performance Check

```bash
# Run performance audit
gh workflow run ai-agent-autopilot.yml -f agent_task=performance_audit

# Check bundle sizes
gh run view --log | grep "bundle size"
```

### 4. Documentation Review

```bash
# Run documentation check
gh workflow run ai-agent-autopilot.yml -f agent_task=documentation_check

# View missing docs
gh run view --log | grep "TODO"
```

## 📈 Metrics Tracked

### AI Agent Metrics (Stored in Durable Objects)

- Total AI reviews performed
- Code review results (per PR)
- Security scan findings
- Performance audit scores
- Documentation coverage
- Historical trends

### Access Metrics

```bash
# Get summary
curl https://efh-autopilot-metrics.workers.dev/ai-summary | jq .

# Example response:
{
  "totalResults": 42,
  "recentResults": [
    {
      "timestamp": "2025-10-31T14:00:00Z",
      "runId": "12345",
      "event": "pull_request",
      "results": {
        "codeReview": "success",
        "securityScan": "skipped",
        "performanceAudit": "skipped",
        "documentationCheck": "skipped"
      }
    }
  ]
}
```

## 🔧 Configuration

### Environment Variables (Already Set)

```bash
# From your .env (already configured)
AUTOPILOT_TOKEN=<your-token>  # Used for Durable Objects auth
GITHUB_TOKEN=<your-token>     # Used for PR comments
```

### Workflow Configuration

```yaml
# Location: .github/workflows/ai-agent-autopilot.yml
# Triggers:
#   - pull_request (automatic)
#   - workflow_dispatch (manual)
# Jobs:
#   - ai-code-review
#   - ai-security-scan
#   - ai-performance-audit
#   - ai-documentation-check
#   - integrate-with-durable
```

## 🎨 Customization

### Add More AI Agents

Edit `.github/workflows/ai-agent-autopilot.yml`:

```yaml
# Add new job
ai-custom-check:
  runs-on: ubuntu-latest
  name: AI Custom Check
  steps:
    - name: Your custom AI task
      run: |
        echo "Running custom AI check..."
        # Your custom logic here
```

### Modify Review Criteria

Edit the workflow file to change what the AI checks:

```yaml
# In ai-code-review job
- name: AI Code Review
  run: |
    # Add your custom checks
    grep -r "your-pattern" src/
```

## 📊 Dashboard Integration

### View in GitHub Actions

1. Go to https://github.com/elevateforhumanity/fix2/actions
2. Click "AI Agent Autopilot"
3. View recent runs and results

### View in Durable Objects

```bash
# Get AI metrics
curl https://efh-autopilot-metrics.workers.dev/ai-summary

# Get combined metrics (health + AI)
curl https://efh-autopilot-metrics.workers.dev/summary
```

## 🔄 Workflow Examples

### Example 1: PR with AI Review

```bash
# 1. Create feature branch
git checkout -b feature/new-api

# 2. Make changes
echo "new code" > src/api.ts

# 3. Commit and push
git add .
git commit -m "Add new API endpoint"
git push origin feature/new-api

# 4. Create PR (AI review triggers automatically)
gh pr create --title "Add new API" --body "New API endpoint"

# 5. Wait for AI review (30-60 seconds)
gh pr checks

# 6. View AI comments
gh pr view

# 7. Fix issues if any
git add .
git commit -m "Fix AI review suggestions"
git push

# 8. Merge when approved
gh pr merge
```

### Example 2: Security Audit

```bash
# 1. Trigger security scan
gh workflow run ai-agent-autopilot.yml -f agent_task=security_scan

# 2. Wait for completion
sleep 60

# 3. View results
gh run list --workflow=ai-agent-autopilot.yml --limit 1
gh run view --log

# 4. Check Durable Objects
curl https://efh-autopilot-metrics.workers.dev/ai-summary | jq '.recentResults[0]'
```

### Example 3: Performance Audit

```bash
# 1. Build project
pnpm build

# 2. Run performance audit
gh workflow run ai-agent-autopilot.yml -f agent_task=performance_audit

# 3. View bundle analysis
gh run view --log | grep "bundle"

# 4. Check historical performance
curl https://efh-autopilot-metrics.workers.dev/ai-summary | jq '.recentResults[] | select(.results.performanceAudit == "success")'
```

## 🚨 Troubleshooting

### AI Review Not Posting Comments

```bash
# Check if GITHUB_TOKEN is set
gh secret list | grep GITHUB_TOKEN

# Check workflow permissions
# Go to: Settings → Actions → General → Workflow permissions
# Ensure "Read and write permissions" is enabled
```

### Durable Objects Not Storing Results

```bash
# Check if AUTOPILOT_TOKEN is set
gh secret list | grep AUTOPILOT_TOKEN

# Test Durable Objects endpoint
curl https://efh-autopilot-metrics.workers.dev/summary

# If 404, deploy Durable Objects:
./scripts/auto-configure-autopilot.sh
```

### Workflow Not Triggering

```bash
# Check workflow file syntax
gh workflow view ai-agent-autopilot.yml

# Manually trigger
gh workflow run ai-agent-autopilot.yml

# Check workflow runs
gh run list --workflow=ai-agent-autopilot.yml
```

## 📚 Integration with GitHub Agent HQ

### Future Enhancement

When GitHub Agent HQ becomes available:

```yaml
# Add to workflow
- name: Use GitHub Agent HQ
  uses: github/agent-hq@v1
  with:
    agent: 'openai-codex'
    task: 'code-review'
```

### Current Implementation

- Uses GitHub Actions for orchestration
- Stores results in Durable Objects
- Integrates with existing autopilot
- Ready for Agent HQ migration

## 🎯 Best Practices

### 1. Use AI Review on Every PR

```bash
# Always create PRs (triggers AI review)
git checkout -b feature/my-feature
# ... make changes ...
gh pr create  # AI review runs automatically
```

### 2. Run Security Scans Weekly

```bash
# Add to your weekly routine
gh workflow run ai-agent-autopilot.yml -f agent_task=security_scan
```

### 3. Performance Audits Before Release

```bash
# Before deploying to production
pnpm build
gh workflow run ai-agent-autopilot.yml -f agent_task=performance_audit
```

### 4. Documentation Checks Monthly

```bash
# Keep docs up to date
gh workflow run ai-agent-autopilot.yml -f agent_task=documentation_check
```

## 📊 Success Metrics

Track your AI agent effectiveness:

```bash
# Total AI reviews
curl https://efh-autopilot-metrics.workers.dev/ai-summary | jq '.totalResults'

# Recent success rate
curl https://efh-autopilot-metrics.workers.dev/ai-summary | jq '.recentResults[] | .results'

# Security issues found
gh run list --workflow=ai-agent-autopilot.yml | grep "security_scan"
```

## 🔗 Related Documentation

- **Cheat Sheet**: `SYSTEM_CHEAT_SHEET.md` (updated with AI commands)
- **Autopilot Setup**: `AUTOPILOT-COMPLETE.md`
- **Durable Objects**: `workers/autopilot-metrics-durable.ts`
- **Workflow File**: `.github/workflows/ai-agent-autopilot.yml`

## 🎉 Summary

✅ AI agents integrated with existing autopilot
✅ Follows your cheat sheet patterns
✅ No duplicate workflows created
✅ Uses existing Durable Objects infrastructure
✅ Automatic code reviews on PRs
✅ Manual security, performance, and documentation checks
✅ Results stored for historical tracking
✅ Ready for GitHub Agent HQ migration

**Start using it now:**

```bash
# Create a PR and watch AI review it
gh pr create

# Or run a manual check
gh workflow run ai-agent-autopilot.yml -f agent_task=security_scan
```

---

**Last Updated:** October 31, 2025  
**Version:** 1.0  
**Integrated With:** Existing Autopilot System
