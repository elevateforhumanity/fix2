# Autopilot System

The Autopilot System provides automated deployment, monitoring, and health checking capabilities for the Elevate for Humanity platform.

## Overview

The autopilot system consists of:
- **Activation Script**: `ACTIVATE_ALL_AUTOPILOT.sh` - Securely activates all autopilot features
- **Health Monitor**: `scripts/autopilot-health.js` - Aggregates system health metrics
- **Status File**: `AUTOPILOT_SYSTEM/status.json` - Central status tracking
- **GitHub Workflows**: Automated health checks and branch protection verification

## Status File Structure

The `status.json` file contains real-time information about the autopilot system:

```json
{
  "lastRun": "2024-11-09T01:00:00.000Z",          // Last activation timestamp
  "status": "completed",                           // Current status: initialized|running|completed|failed
  "version": "2.0.0",                             // Autopilot version
  "steps": {                                       // Individual step statuses
    "envValidation": "success",
    "netlifyDeploy": "success",
    "envVarsSet": "success",
    "workflowsActivated": "success",
    "workersDeployed": "skipped",
    "siteVerified": "success"
  },
  "errors": [],                                    // Array of error messages
  "healthScore": 85.5,                            // Overall health percentage (0-100)
  "healthStatus": "healthy",                      // healthy|degraded|unhealthy
  "systemChecks": {                               // System-level checks
    "statusFileExists": true,
    "lockFileExists": false,
    "autopilotActive": true
  },
  "githubActions": {                              // GitHub Actions status
    "buildTest": "passed",
    "check": "passed",
    "autopilotActive": true
  },
  "lastHealthCheck": "2024-11-09T01:30:00.000Z", // Last health check timestamp
  "locked": false,                                // Whether autopilot is currently running
  "lockPid": null                                 // Process ID if locked
}
```

## Status Values

### Main Status
- `initialized` - System is ready but not yet run
- `running` - Autopilot is currently executing
- `completed` - Last run completed successfully
- `failed` - Last run encountered errors

### Step Status
- `pending` - Step has not started
- `in_progress` - Step is currently running
- `success` - Step completed successfully
- `failed` - Step encountered an error
- `skipped` - Step was skipped (e.g., optional dependencies not available)
- `warning` - Step completed with warnings

### Health Status
- `healthy` - Score >= 75%: System is functioning normally
- `degraded` - Score >= 50%: Some issues detected but system is operational
- `unhealthy` - Score < 50%: Significant issues require attention

## Health Monitoring Workflow

The autopilot health check workflow (`.github/workflows/autopilot-health.yml`) runs automatically:
- **Schedule**: Every 30 minutes
- **Trigger**: On push to main (when autopilot files change)
- **Manual**: Via workflow_dispatch

### What the Health Check Does

1. Reads current status from `status.json`
2. Checks for lock files (concurrent runs)
3. Examines GitHub Actions markers
4. Calculates health score based on:
   - Build/test status
   - Code quality checks
   - System availability
   - Error frequency
5. Updates `status.json` with latest metrics
6. Uploads status as workflow artifact

## Using the Autopilot System

### Prerequisites

Before running autopilot, ensure you have:

```bash
# Required environment variables
export ENABLE_AUTOPILOT=true
export NETLIFY_AUTH_TOKEN=your-token
export NETLIFY_SITE_ID=your-site-id
export SUPABASE_URL=your-url
export SUPABASE_ANON_KEY=your-key
```

See `.env.example` for all available variables.

### Running the Autopilot

```bash
# Activate all systems
./ACTIVATE_ALL_AUTOPILOT.sh
```

The script will:
1. Validate environment variables
2. Acquire a lock file (prevents concurrent runs)
3. Trigger Netlify deployment
4. Set environment variables
5. Activate GitHub workflows
6. Deploy Cloudflare workers (if configured)
7. Verify site availability
8. Update status.json
9. Release the lock

### Manual Health Check

```bash
# Run health check manually
node scripts/autopilot-health.js
```

View the results in `AUTOPILOT_SYSTEM/status.json`.

### Lock File Mechanism

The autopilot uses `.autopilot-lock` to prevent concurrent runs:
- Created when autopilot starts (contains process ID)
- Checked before each run
- Automatically removed on completion or error
- Stale locks (dead process) are automatically cleaned up

## Troubleshooting

### Autopilot Won't Start

Check:
1. Is `ENABLE_AUTOPILOT=true`?
2. Are all required env vars set?
3. Is there a stale lock file? Remove `.autopilot-lock` if process is dead
4. Check `status.json` for recent errors

### Health Score is Low

Common causes:
- Build or test failures in CI
- Netlify deployment issues
- Missing environment variables
- Network connectivity problems

Check the `errors` array in `status.json` for specific issues.

### Lock File Stuck

If autopilot won't run due to a lock:

```bash
# Check if process is running
cat .autopilot-lock  # Shows PID
ps -p <PID>          # Check if process exists

# If process is dead, remove lock
rm .autopilot-lock
```

## Advanced Configuration

### Cooldown Period

Control how often autopilot can run:

```bash
export AUTOPILOT_COOLDOWN_SECONDS=3600  # 1 hour between runs
```

### Feature Flags

```bash
export ENABLE_AUTOPILOT=false           # Disable completely
export AUTOPILOT_MODE=development       # Set mode
```

### Custom Health Checks

Extend `scripts/autopilot-health.js` to add custom checks:

```javascript
function customCheck() {
  // Your custom logic
  return { status: 'passed', message: 'Custom check OK' };
}
```

## Monitoring & Alerts

### GitHub Actions Artifacts

Each health check uploads `status.json` as an artifact:
- Retention: 7 days
- Name: `autopilot-status-<run-id>`
- Access via: Actions > Workflow Run > Artifacts

### Integrations

Status file can be consumed by:
- Monitoring dashboards
- Slack/Discord bots
- PagerDuty/Opsgenie
- Custom alerting scripts

Example:
```bash
# Alert if health score drops below 50%
SCORE=$(jq -r '.healthScore' AUTOPILOT_SYSTEM/status.json)
if (( $(echo "$SCORE < 50" | bc -l) )); then
  echo "ALERT: Health score is $SCORE%"
fi
```

## Security Considerations

- **Never commit secrets** to `status.json`
- Lock file contains only PID (safe to commit)
- Status file may contain error messages - review before sharing
- Health workflow has read-only permissions by default

## Migration from Old System

If migrating from the old autopilot:

1. **Stop old scripts**: Kill any running `autopilot-infinite-fix.sh` or `autopilot-loop.sh`
2. **Set environment variables**: Follow `.env.example`
3. **Remove old status files**: Clean up legacy `.autopilot-status.json` if different
4. **Run new system**: `./ACTIVATE_ALL_AUTOPILOT.sh`

## Further Reading

- `../SECURITY_CLEANUP_CHECKLIST.md` - Security best practices
- `../deprecated/README.md` - Information about deprecated scripts
- `.github/workflows/` - Workflow definitions
- `.env.example` - Environment variable reference
