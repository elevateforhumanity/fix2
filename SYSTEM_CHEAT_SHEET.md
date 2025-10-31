# System Cheat Sheet - Elevate for Humanity

**Quick reference for all system operations, checks, and maintenance**

---

## 🚀 Quick Start Commands

### Development

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Type check
pnpm typecheck

# Lint code
pnpm lint

# Format code
pnpm format
```

### Deployment

```bash
# Deploy to Netlify (auto via git push)
git add .
git commit -m "Your message"
git push origin main

# Manual Netlify deploy
netlify deploy --prod

# Check deployment status
netlify status
```

---

## 🏥 Health Checks

### System Health Check

```bash
# Full system health check
./scripts/durable-bridge-health-check.sh

# Test bridge functionality
./scripts/test-durable-bridge.sh

# Check Netlify status
netlify status

# Check Supabase connection
curl https://cuxzzpsyufcewtmicszk.supabase.co/rest/v1/
```

### Quick Verification

```bash
# Verify bridge script
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js

# Verify configuration
curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json | jq .

# Check response time
curl -o /dev/null -s -w "Response time: %{time_total}s\n" https://elevateforhumanityfix2.netlify.app/efh-bridge.js
```

---

## 🔧 Durable Bridge Operations

### Deploy Bridge

```bash
# Automated deployment
./scripts/deploy-durable-bridge.sh

# Or manual steps:
cp -r bridge/public/* public/
cp -r bridge/api public/
pnpm build
git add . && git commit -m "Update bridge" && git push
```

### Update Content

```bash
# Edit configuration
nano bridge/api/efh-config.json

# Deploy changes
./scripts/deploy-durable-bridge.sh

# Verify changes
curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json | jq .
```

### Health Monitoring

```bash
# Run health check
./scripts/durable-bridge-health-check.sh

# View health logs
cat logs/durable-bridge-health.log

# View status
cat logs/durable-bridge-status.json | jq .
```

---

## 🤖 Autopilot Operations

### Autopilot Status

```bash
# Check autopilot configuration
cat .autopilot-config.json | jq .

# View autopilot logs
ls -lh logs/

# Check GitHub Actions
open https://github.com/elevateforhumanity/fix2/actions
```

### Manual Triggers

```bash
# Trigger health check workflow
gh workflow run durable-bridge-autopilot.yml

# Trigger deployment workflow
gh workflow run durable-bridge-auto-deploy.yml

# View workflow status
gh run list --limit 5
```

---

## 📊 Monitoring & Logs

### View Logs

```bash
# Durable bridge health log
tail -f logs/durable-bridge-health.log

# Autopilot logs
ls -lh logs/

# Netlify logs
netlify logs

# Build logs
cat build.log
```

### Check Status Files

```bash
# Bridge status
cat logs/durable-bridge-status.json | jq .

# Test report
cat logs/durable-bridge-test-report.json | jq .
```

---

## 🔄 Common Workflows

### Update Durable Content

```bash
# 1. Edit config
nano bridge/api/efh-config.json

# 2. Validate JSON
cat bridge/api/efh-config.json | jq .

# 3. Deploy
./scripts/deploy-durable-bridge.sh

# 4. Verify
curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json | jq .
```

### Fix Broken Bridge

```bash
# 1. Run health check
./scripts/durable-bridge-health-check.sh

# 2. If issues found, redeploy
./scripts/deploy-durable-bridge.sh

# 3. Verify recovery
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js

# 4. Test functionality
./scripts/test-durable-bridge.sh
```

### Emergency Recovery

```bash
# 1. Check what's broken
./scripts/durable-bridge-health-check.sh

# 2. Restore from git
git checkout HEAD -- bridge/

# 3. Rebuild and deploy
pnpm build
netlify deploy --prod

# 4. Verify
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js
```

---

## 🗄️ Database Operations

### Supabase

```bash
# Check connection
curl https://cuxzzpsyufcewtmicszk.supabase.co/rest/v1/

# Run migrations (if needed)
supabase db push

# View tables
supabase db dump
```

---

## 🌐 URLs & Endpoints

### Production URLs

```
Main Site: https://elevateforhumanityfix2.netlify.app
Bridge Script: https://elevateforhumanityfix2.netlify.app/efh-bridge.js
Configuration: https://elevateforhumanityfix2.netlify.app/api/efh-config.json
Supabase: https://cuxzzpsyufcewtmicszk.supabase.co
```

### GitHub

```
Repository: https://github.com/elevateforhumanity/fix2
Actions: https://github.com/elevateforhumanity/fix2/actions
Issues: https://github.com/elevateforhumanity/fix2/issues
```

### Netlify

```
Dashboard: https://app.netlify.com/sites/elevateforhumanityfix2
Deploys: https://app.netlify.com/sites/elevateforhumanityfix2/deploys
```

---

## 🔍 Troubleshooting

### Bridge Not Loading

```bash
# 1. Check if file exists
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js

# 2. Check Netlify deployment
netlify status

# 3. Redeploy
./scripts/deploy-durable-bridge.sh

# 4. Clear cache
curl -X PURGE https://elevateforhumanityfix2.netlify.app/efh-bridge.js
```

### Configuration Issues

```bash
# 1. Validate JSON locally
cat bridge/api/efh-config.json | jq .

# 2. Check deployed version
curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json | jq .

# 3. If different, redeploy
./scripts/deploy-durable-bridge.sh
```

### Build Failures

```bash
# 1. Check build log
cat build.log

# 2. Clean and rebuild
pnpm clean
pnpm install
pnpm build

# 3. Check for errors
pnpm typecheck
pnpm lint
```

### Deployment Failures

```bash
# 1. Check Netlify logs
netlify logs

# 2. Check GitHub Actions
gh run list --limit 5

# 3. Manual deploy
netlify deploy --prod

# 4. Check status
netlify status
```

---

## 📝 File Locations

### Important Files

```
Bridge Script: bridge/public/efh-bridge.js
Configuration: bridge/api/efh-config.json
Health Check: scripts/durable-bridge-health-check.sh
Deploy Script: scripts/deploy-durable-bridge.sh
Test Script: scripts/test-durable-bridge.sh
Autopilot Config: .autopilot-config.json
```

### Logs

```
Health Log: logs/durable-bridge-health.log
Status File: logs/durable-bridge-status.json
Test Report: logs/durable-bridge-test-report.json
Build Log: build.log
```

### Documentation

```
Setup Guide: DURABLE_SETUP_INSTRUCTIONS.md
Zero Manual: ZERO_MANUAL_DURABLE_SETUP.md
Quick Start: DURABLE_GITPOD_QUICKSTART.md
Integration Plan: GITPOD_AUTOPILOT_INTEGRATION_PLAN.md
Compatibility: DURABLE_COMPATIBILITY_REPORT.md
This Cheat Sheet: SYSTEM_CHEAT_SHEET.md
```

---

## 🎯 Daily Operations

### Morning Check

```bash
# 1. Check system health
./scripts/durable-bridge-health-check.sh

# 2. View recent logs
tail -20 logs/durable-bridge-health.log

# 3. Check GitHub Actions
gh run list --limit 5

# 4. Verify URLs
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js
```

### Before Making Changes

```bash
# 1. Pull latest
git pull origin main

# 2. Check current status
./scripts/durable-bridge-health-check.sh

# 3. Create backup
cp bridge/api/efh-config.json bridge/api/efh-config.json.backup
```

### After Making Changes

```bash
# 1. Validate changes
cat bridge/api/efh-config.json | jq .

# 2. Test locally
./scripts/test-durable-bridge.sh

# 3. Deploy
./scripts/deploy-durable-bridge.sh

# 4. Verify
curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json | jq .
```

---

## 🚨 Emergency Procedures

### Site Down

```bash
# 1. Check Netlify status
netlify status

# 2. Check GitHub Actions
gh run list --limit 5

# 3. Manual redeploy
pnpm build
netlify deploy --prod

# 4. Verify
curl -I https://elevateforhumanityfix2.netlify.app
```

### Bridge Broken

```bash
# 1. Run health check
./scripts/durable-bridge-health-check.sh

# 2. Restore from backup
git checkout HEAD -- bridge/

# 3. Redeploy
./scripts/deploy-durable-bridge.sh

# 4. Test
./scripts/test-durable-bridge.sh
```

### Data Loss

```bash
# 1. Check git history
git log --oneline bridge/api/efh-config.json

# 2. Restore from commit
git checkout <commit-hash> -- bridge/api/efh-config.json

# 3. Redeploy
./scripts/deploy-durable-bridge.sh
```

---

## 📞 Support Resources

### Documentation

- Setup: `DURABLE_SETUP_INSTRUCTIONS.md`
- Zero Manual: `ZERO_MANUAL_DURABLE_SETUP.md`
- Quick Start: `DURABLE_GITPOD_QUICKSTART.md`
- This Cheat Sheet: `SYSTEM_CHEAT_SHEET.md`

### External Resources

- Netlify Docs: https://docs.netlify.com
- Supabase Docs: https://supabase.com/docs
- GitHub Actions: https://docs.github.com/actions

### Monitoring

- GitHub Actions: https://github.com/elevateforhumanity/fix2/actions
- Netlify Dashboard: https://app.netlify.com/sites/elevateforhumanityfix2

---

## 🔐 Environment Variables

### Required Variables

```bash
# Supabase
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=<your-key>

# Netlify (for CLI)
NETLIFY_AUTH_TOKEN=<your-token>
NETLIFY_SITE_ID=<your-site-id>

# GitHub (for CLI)
GITHUB_TOKEN=<your-token>
```

### Check Variables

```bash
# View .env (local)
cat .env

# Check Netlify env vars
netlify env:list

# Check GitHub secrets
gh secret list
```

---

## 🎓 Best Practices

### Before Deploying

1. ✅ Validate JSON: `cat bridge/api/efh-config.json | jq .`
2. ✅ Run tests: `./scripts/test-durable-bridge.sh`
3. ✅ Check health: `./scripts/durable-bridge-health-check.sh`
4. ✅ Review changes: `git diff`

### After Deploying

1. ✅ Verify URLs work
2. ✅ Check logs for errors
3. ✅ Test in browser
4. ✅ Monitor for 5 minutes

### Regular Maintenance

1. ✅ Run health check daily
2. ✅ Review logs weekly
3. ✅ Update dependencies monthly
4. ✅ Backup configuration regularly

---

## 📊 Metrics to Monitor

### Performance

- Response time < 2 seconds
- Bridge script size < 10KB
- Config file size < 5KB

### Health

- HTTP 200 status codes
- Valid JSON configuration
- All required fields present

### Content

- Programs count ≥ 6
- Features count ≥ 6
- Testimonials count ≥ 4

---

## 🔄 Automation Status

### Active Workflows

- ✅ Durable Bridge Auto-Deploy (on push)
- ✅ Durable Bridge Autopilot (every 30 min)
- ✅ Health Check (every 30 min)
- ✅ Auto-Heal (on failure)

### Manual Workflows

- Deploy: `./scripts/deploy-durable-bridge.sh`
- Health Check: `./scripts/durable-bridge-health-check.sh`
- Test: `./scripts/test-durable-bridge.sh`

---

## 💡 Quick Tips

### Speed Up Deployment

```bash
# Skip tests for quick deploy
git add . && git commit -m "Quick fix" && git push
```

### View Real-Time Logs

```bash
# Follow health log
tail -f logs/durable-bridge-health.log

# Follow Netlify deploy
netlify watch
```

### Validate Before Commit

```bash
# Pre-commit checks
cat bridge/api/efh-config.json | jq .
./scripts/test-durable-bridge.sh
pnpm typecheck
```

### Quick Status Check

```bash
# One-liner status
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js && echo "✅ Bridge OK"
```

---

## 🎯 Common Tasks

### Add New Program

```bash
# 1. Edit config
nano bridge/api/efh-config.json
# Add to "programs" array

# 2. Validate
cat bridge/api/efh-config.json | jq .

# 3. Deploy
./scripts/deploy-durable-bridge.sh
```

### Update Hero Section

```bash
# 1. Edit config
nano bridge/api/efh-config.json
# Update "hero" object

# 2. Deploy
./scripts/deploy-durable-bridge.sh
```

### Add Testimonial

```bash
# 1. Edit config
nano bridge/api/efh-config.json
# Add to "testimonials" array

# 2. Deploy
./scripts/deploy-durable-bridge.sh
```

---

**Last Updated:** October 31, 2025  
**Version:** 1.0  
**Maintained By:** Autopilot System

---

**🚀 Remember:** Most operations are automated. Just push to git and let the autopilot handle it!
