# Deprecated Scripts

This directory contains scripts that have been deprecated and should not be used.
They are kept here for historical reference only.

## Deprecated Scripts

### autopilot-infinite-fix.sh
**Reason**: Infinite loop design causes excessive resource usage and issue spam
**Replacement**: Use `ACTIVATE_ALL_AUTOPILOT.sh` with proper lock file mechanism

### autopilot-loop.sh
**Reason**: Uncontrolled looping without proper safeguards
**Replacement**: Use scheduled GitHub Actions workflows instead

### autopilot-deploy-loop.sh
**Reason**: Continuous deployment loop without cooldown period
**Replacement**: Use event-driven deployments via GitHub Actions

## Migration Guide

If you were using any of these scripts:

1. **Stop all running instances** of deprecated scripts
2. **Set up environment variables** as documented in `.env.example`
3. **Enable GitHub Actions workflows**:
   - `.github/workflows/autopilot-health.yml` for monitoring
   - `.github/workflows/branch-protection-guard.yml` for CI health
4. **Use the new secure script**: `./ACTIVATE_ALL_AUTOPILOT.sh`

## Notes

These scripts have been replaced with more robust alternatives that include:
- Lock file mechanism to prevent concurrent runs
- Environment variable validation
- Status monitoring and reporting
- Proper error handling
- Cooldown periods between runs
