# Quick Start Guide: File-Based Task Queue

This guide will help you get started with the file-based task queue system in 5 minutes.

## What Problem Does This Solve?

The Autopilot system was creating 934+ GitHub issues for every health check failure, deployment issue, and auto-heal attempt. This "issue spam" made it impossible to track real issues and cluttered the repository.

**Solution**: Instead of creating GitHub issues, we now create **tasks** that are:
- ✅ Deduplicated (same issue = same task)
- ✅ Cooldown-aware (prevents spam)
- ✅ Prioritized (critical issues first)
- ✅ Retryable (automatic retry with backoff)
- ✅ File-based (durable, git-tracked)

## Installation

The task queue system is already installed! All files are in:
- `AUTOPILOT_SYSTEM/tasks/` - Task storage directory
- `scripts/create-task.js` - CLI to create tasks
- `scripts/task-worker.js` - Worker to process tasks
- `scripts/utilities/task-queue.js` - Core library

## Quick Examples

### 1. Create Your First Task

```bash
# Create a simple health check task
node scripts/create-task.js health-check

# Output:
# ✅ Task created successfully!
# Task ID: 94fb9b793cf77052
# Status: pending
```

### 2. Check Task Queue Status

```bash
node scripts/task-worker.js status

# Output:
# 📊 Task Queue Status
# Total tasks: 1
# By Status:
#   pending: 1
# 📋 Pending Tasks:
#   94fb9b793cf77052 - health-check (medium)
```

### 3. Process a Task

```bash
# Process one task and exit
node scripts/task-worker.js once

# Or process tasks continuously (Ctrl+C to stop)
node scripts/task-worker.js run
```

### 4. Create a Task with Options

```bash
# High priority deploy task
node scripts/create-task.js deploy \
  --priority high \
  --payload '{"env":"production","service":"api"}' \
  --cooldown 120 \
  --retries 5
```

## Common Use Cases

### Use Case 1: Health Check Failed

**Before (creates issue spam):**
```yaml
- name: Health Check
  run: ./health-check.sh
- name: Create Issue on Failure
  if: failure()
  run: gh issue create --title "Health Check Failed" ...
```

**After (creates task):**
```yaml
- name: Health Check
  id: health
  run: ./health-check.sh
- name: Create Healing Task
  if: failure()
  run: |
    node scripts/create-task.js auto-heal \
      --priority high \
      --payload '{"error":"${{ steps.health.outputs.error }}"}' \
      --key '{"type":"health-check"}'
```

### Use Case 2: Build Failed

**Before:**
```yaml
- name: Build
  run: npm run build
- name: Create Issue
  if: failure()
  run: gh issue create --title "Build Failed" ...
```

**After:**
```yaml
- name: Build
  run: npm run build
- name: Create Build Fix Task
  if: failure()
  run: |
    node scripts/create-task.js build-fix \
      --priority high \
      --key '{"type":"build-failure"}'
```

### Use Case 3: Scheduled Tasks

```yaml
name: Daily Health Check

on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      
      - name: Create Health Check Task
        run: |
          node scripts/create-task.js health-check \
            --priority medium \
            --cooldown 1440 \
            --key '{"type":"daily-health-check"}'
```

## Task Processing Workflow

Add this workflow to process tasks automatically:

```yaml
# .github/workflows/process-tasks.yml
name: Process Autopilot Tasks

on:
  schedule:
    - cron: '*/15 * * * *' # Every 15 minutes
  workflow_dispatch:

jobs:
  process:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      
      - name: Process Tasks
        run: node scripts/task-worker.js run 5
      
      - name: Show Status
        run: node scripts/task-worker.js status
```

## Understanding Task Deduplication

Tasks with the same `type` and `keyFields` will be deduplicated:

```bash
# These create the SAME task (deduplicated)
node scripts/create-task.js deploy --key '{"env":"prod"}'
node scripts/create-task.js deploy --key '{"env":"prod"}'

# These create DIFFERENT tasks
node scripts/create-task.js deploy --key '{"env":"prod"}'
node scripts/create-task.js deploy --key '{"env":"staging"}'
```

**Key Fields Best Practices:**
- Include fields that make the task unique
- For health checks: `{"type":"health-check"}`
- For deployments: `{"env":"production","service":"api"}`
- For fixes: `{"issue":"typescript-errors"}`

## Understanding Cooldown

Cooldown prevents task spam by enforcing wait periods:

```bash
# Create a task with 60-minute cooldown (default)
node scripts/create-task.js health-check

# Try to create the same task again
node scripts/create-task.js health-check

# Output:
# Task 94fb9b793cf77052 is already pending
# (No duplicate created!)
```

After a task completes, it enters cooldown. During cooldown:
- ✅ New identical tasks are prevented
- ✅ Existing task is returned instead
- ✅ No spam!

After cooldown expires:
- ✅ New task can be created
- ✅ Fresh execution

## Priority Levels

Tasks are processed by priority:

1. **critical** - Production down, security issues
   ```bash
   node scripts/create-task.js deploy --priority critical
   ```

2. **high** - Build failures, test failures
   ```bash
   node scripts/create-task.js build-fix --priority high
   ```

3. **medium** - Health checks, routine operations (default)
   ```bash
   node scripts/create-task.js health-check --priority medium
   ```

4. **low** - Cleanup, optimizations
   ```bash
   node scripts/create-task.js cleanup --priority low
   ```

## Task Types

Available task types:

- `health-check` - System health monitoring
- `auto-heal` - Automatic issue remediation
- `auto-push` - Automatic git operations
- `deploy` - Deployment tasks
- `build-fix` - Build error fixes
- `lint-fix` - Linting issue fixes
- `test-fix` - Test failure fixes
- `secrets-update` - Secrets management
- `dependency-update` - Dependency updates
- `custom` - Custom tasks

## Cleanup

Clean up old completed/failed tasks:

```bash
# Clean up tasks older than 7 days (default)
node scripts/task-worker.js cleanup

# Clean up tasks older than 30 days
node scripts/task-worker.js cleanup 30
```

## Monitoring

Check task queue health:

```bash
# Show detailed status
node scripts/task-worker.js status

# Count pending tasks
ls AUTOPILOT_SYSTEM/tasks/*.json 2>/dev/null | wc -l
```

## From JavaScript/Node.js

Use the task queue from your own scripts:

```javascript
import taskQueue from './scripts/utilities/task-queue.js';

// Create a task
const task = await taskQueue.createTask('health-check', {
  priority: 'high',
  payload: { target: 'api' },
  cooldownMinutes: 30,
  keyFields: { target: 'api' }
});

// List pending tasks
const pending = await taskQueue.listTasks({ status: 'pending' });

// Process a task
const next = await taskQueue.getNextTask();
if (next) {
  await taskQueue.startTask(next.id);
  try {
    // Do work...
    await taskQueue.completeTask(next.id, { success: true });
  } catch (error) {
    await taskQueue.failTask(next.id, error);
  }
}
```

## Troubleshooting

### No tasks being processed?

1. Check if tasks exist: `ls AUTOPILOT_SYSTEM/tasks/`
2. Check task status: `node scripts/task-worker.js status`
3. Check for cooldowns
4. Run worker manually: `node scripts/task-worker.js once`

### Tasks are duplicated?

1. Make sure you're using `--key` parameter for deduplication
2. Use consistent key fields
3. Check cooldown periods

### Need help?

1. Read the full documentation: `AUTOPILOT_SYSTEM/tasks/README.md`
2. Check workflow examples: `AUTOPILOT_SYSTEM/tasks/WORKFLOW_EXAMPLES.yml`
3. Review test cases: `tests/task-queue.test.js`

## Migration Checklist

To migrate from issue-based to task-based system:

- [ ] Identify all workflows that create GitHub issues
- [ ] Replace `gh issue create` with `node scripts/create-task.js`
- [ ] Add appropriate `--key` parameters for deduplication
- [ ] Set appropriate `--cooldown` values
- [ ] Add task processing workflow
- [ ] Test in development
- [ ] Monitor task queue
- [ ] Clean up old autopilot issues

## Next Steps

1. **Test the system**: Create a few tasks and process them
2. **Update one workflow**: Convert one issue-creating workflow to tasks
3. **Monitor results**: Check that tasks are created and processed
4. **Roll out gradually**: Convert more workflows
5. **Celebrate**: No more issue spam! 🎉

## Resources

- Full Documentation: [README.md](README.md)
- Workflow Examples: [WORKFLOW_EXAMPLES.yml](WORKFLOW_EXAMPLES.yml)
- Test Suite: [../../tests/task-queue.test.js](../../tests/task-queue.test.js)
- Task Queue Library: [../../scripts/utilities/task-queue.js](../../scripts/utilities/task-queue.js)

---

**Questions?** Check the full documentation in `README.md` or review the test cases for more examples.
