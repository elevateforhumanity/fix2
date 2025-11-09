# File-Based Task Queue System

## Overview

The Autopilot File-Based Task Queue System provides a resilient, deduplicated, and spam-free approach to managing automation tasks. Instead of creating GitHub issues for every automation event (which led to 934+ open issues), tasks are stored as durable JSON files in the repository.

## Key Features

- **Durable Storage**: Tasks stored as JSON files, git-tracked for resilience
- **Deduplication**: Prevents duplicate tasks using content-based IDs
- **Cooldown Periods**: Prevents spam by enforcing time gaps between task attempts
- **Priority System**: Tasks processed in order of priority and creation time
- **Retry Logic**: Configurable retry attempts with exponential backoff
- **No Issue Spam**: Tasks don't create GitHub issues unless critical

## Architecture

```
AUTOPILOT_SYSTEM/tasks/
├── .keep                    # Directory marker
├── task-schema.json         # JSON schema for tasks
├── <taskId>.json           # Individual task files
└── ...

scripts/
├── create-task.js          # CLI to create tasks
├── task-worker.js          # Worker that processes tasks
└── utilities/
    └── task-queue.js       # Task queue management library
```

## Task Structure

Each task is a JSON file with the following structure:

```json
{
  "id": "a1b2c3d4e5f6g7h8",
  "type": "health-check",
  "status": "pending",
  "priority": "medium",
  "createdAt": "2025-11-09T01:30:00.000Z",
  "startedAt": "2025-11-09T01:31:00.000Z",
  "completedAt": "2025-11-09T01:32:00.000Z",
  "lastAttemptAt": "2025-11-09T01:31:00.000Z",
  "cooldownUntil": "2025-11-09T02:31:00.000Z",
  "retryCount": 0,
  "maxRetries": 3,
  "cooldownMinutes": 60,
  "payload": {
    "target": "frontend"
  },
  "result": {
    "success": true
  },
  "error": null,
  "metadata": {
    "createdBy": "workflow",
    "workflow": "autopilot-health",
    "runId": "12345"
  }
}
```

## Task Types

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

## Task Status Flow

```
pending → running → completed
   ↓          ↓
   └─────→ failed
```

- **pending**: Task is waiting to be processed
- **running**: Task is currently being executed
- **completed**: Task finished successfully
- **failed**: Task failed after max retries

## Creating Tasks

### From Command Line

```bash
# Create a simple task
node scripts/create-task.js health-check

# Create a high-priority task
node scripts/create-task.js deploy --priority high

# Create a task with payload
node scripts/create-task.js build-fix --payload '{"target":"frontend"}'

# Create a task with custom cooldown
node scripts/create-task.js auto-heal --cooldown 30 --retries 5
```

### From JavaScript/Node.js

```javascript
import taskQueue from './scripts/utilities/task-queue.js';

// Create a task
const task = await taskQueue.createTask('health-check', {
  priority: 'high',
  payload: { target: 'api' },
  cooldownMinutes: 30,
  maxRetries: 5,
  metadata: {
    createdBy: 'monitoring',
    source: 'health-check-cron'
  },
  keyFields: { target: 'api' } // For deduplication
});

console.log('Task created:', task.id);
```

### From GitHub Workflows

```yaml
- name: Create Health Check Task
  run: |
    node scripts/create-task.js health-check \
      --priority high \
      --payload '{"workflow":"${{ github.workflow }}"}' \
      --metadata '{"runId":"${{ github.run_id }}"}'
```

## Processing Tasks

### Run Worker Continuously

```bash
# Process tasks continuously (Ctrl+C to stop)
node scripts/task-worker.js run

# Process up to 10 tasks then stop
node scripts/task-worker.js run 10
```

### Process One Task

```bash
# Process one task and exit
node scripts/task-worker.js once
```

### Check Queue Status

```bash
# Show current queue status
node scripts/task-worker.js status
```

Output:
```
📊 Task Queue Status

Total tasks: 15

By Status:
  pending: 8
  running: 1
  completed: 5
  failed: 1

By Type:
  health-check: 10
  auto-heal: 3
  deploy: 2

By Priority:
  high: 3
  medium: 10
  low: 2

In Cooldown: 2

📋 Pending Tasks:

  a1b2c3d4e5f6g7h8 - health-check (high)
  b2c3d4e5f6g7h8i9 - auto-heal (medium) [COOLDOWN]
  ...
```

### Clean Up Old Tasks

```bash
# Clean up tasks older than 7 days
node scripts/task-worker.js cleanup

# Clean up tasks older than 30 days
node scripts/task-worker.js cleanup 30
```

## Deduplication

Tasks are deduplicated using a hash of the task type and key fields:

```javascript
// These two tasks will have the same ID (deduplicated)
await taskQueue.createTask('deploy', {
  keyFields: { env: 'production', service: 'api' }
});

await taskQueue.createTask('deploy', {
  keyFields: { env: 'production', service: 'api' }
});
```

### Deduplication Rules

1. If a task with the same ID exists and is **in cooldown** → Return existing task
2. If a task with the same ID exists and is **pending/running** → Return existing task
3. If a task with the same ID exists and was **completed recently** (within cooldown period) → Return existing task
4. Otherwise → Create new task

## Cooldown System

The cooldown system prevents task spam:

1. After a task completes, it enters a cooldown period (default: 60 minutes)
2. During cooldown, attempts to create the same task will return the existing task
3. After cooldown expires, a new task can be created
4. Failed tasks also enter cooldown before retrying

This ensures that:
- The same issue isn't processed repeatedly
- GitHub isn't spammed with duplicate issues
- System resources aren't wasted on redundant tasks

## Priority System

Tasks are processed in priority order:

1. **critical** - Immediate attention (security, production down)
2. **high** - Important but not critical (build failures, test failures)
3. **medium** - Normal operations (health checks, deployments)
4. **low** - Housekeeping (cleanup, updates)

Within the same priority, tasks are processed in FIFO order (oldest first).

## Integration Examples

### Replace GitHub Issue Creation

**Before (creates issue spam):**
```yaml
- name: Create Issue on Failure
  if: failure()
  uses: actions/github-script@v7
  with:
    script: |
      github.rest.issues.create({
        owner: context.repo.owner,
        repo: context.repo.repo,
        title: '🚨 Autopilot Failure',
        body: 'Something failed...'
      })
```

**After (creates task):**
```yaml
- name: Create Task on Failure
  if: failure()
  run: |
    node scripts/create-task.js auto-heal \
      --priority high \
      --payload '{"error":"${{ steps.check.outputs.error }}"}' \
      --metadata '{"runId":"${{ github.run_id }}"}'
```

### Scheduled Health Checks

```yaml
name: Scheduled Health Check

on:
  schedule:
    - cron: '0 */6 * * *' # Every 6 hours

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Create Health Check Task
        run: |
          node scripts/create-task.js health-check \
            --priority medium \
            --cooldown 360 \
            --key '{"type":"scheduled"}'
```

### Process Tasks in Workflow

```yaml
name: Process Autopilot Tasks

on:
  schedule:
    - cron: '*/15 * * * *' # Every 15 minutes

jobs:
  process-tasks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      
      - name: Process Tasks
        run: |
          # Process up to 5 tasks
          node scripts/task-worker.js run 5
      
      - name: Commit Task Updates
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add AUTOPILOT_SYSTEM/tasks/
          git commit -m "chore: update task queue" || true
          git push || true
```

## API Reference

### Task Queue Library

```javascript
import taskQueue from './scripts/utilities/task-queue.js';

// Create a task
const task = await taskQueue.createTask(type, options);

// Read a task
const task = await taskQueue.readTask(taskId);

// Update a task
const updated = await taskQueue.updateTask(taskId, updates);

// Delete a task
await taskQueue.deleteTask(taskId);

// List tasks
const tasks = await taskQueue.listTasks({ status: 'pending', type: 'health-check' });

// Get next task to process
const next = await taskQueue.getNextTask();

// Start task execution
await taskQueue.startTask(taskId);

// Complete task
await taskQueue.completeTask(taskId, result);

// Fail task
await taskQueue.failTask(taskId, error);

// Clean up old tasks
const cleaned = await taskQueue.cleanupOldTasks(daysOld);

// Get statistics
const stats = await taskQueue.getTaskStats();
```

## Best Practices

1. **Use Meaningful Key Fields**: For deduplication, include fields that uniquely identify the task's purpose
   ```javascript
   keyFields: { workflow: 'deploy', env: 'production', service: 'api' }
   ```

2. **Set Appropriate Cooldowns**: 
   - Quick tasks (health checks): 30-60 minutes
   - Slow tasks (deployments): 2-4 hours
   - Expensive tasks (full rebuilds): 12-24 hours

3. **Use Priority Correctly**:
   - critical: Production issues, security vulnerabilities
   - high: Build/test failures blocking development
   - medium: Routine operations
   - low: Cleanup, optimizations

4. **Include Context in Metadata**: Store workflow information for debugging
   ```javascript
   metadata: {
     workflow: github.workflow,
     runId: github.run_id,
     branch: github.ref,
     actor: github.actor
   }
   ```

5. **Clean Up Regularly**: Schedule cleanup tasks to remove old completed/failed tasks

6. **Monitor the Queue**: Check queue status regularly to ensure tasks are being processed

## Migration Guide

### From GitHub Issues to Tasks

1. **Identify Issue-Creating Workflows**: Find all workflows that create issues
2. **Replace with Task Creation**: Use `create-task.js` instead of `github.rest.issues.create`
3. **Set Up Task Worker**: Add a workflow to process tasks periodically
4. **Test Thoroughly**: Ensure tasks are created and processed correctly
5. **Clean Up Old Issues**: Use the existing cleanup scripts to close old autopilot issues

### Example Migration

**Before:**
```javascript
// In workflow or script
await octokit.rest.issues.create({
  title: '🚨 Health Check Failed',
  body: 'Health check detected issues...',
  labels: ['autopilot', 'health-check']
});
```

**After:**
```javascript
// In workflow or script
import { execSync } from 'child_process';

execSync(`node scripts/create-task.js health-check \
  --priority high \
  --payload '${JSON.stringify({ issue: 'health-check-failed' })}' \
  --key '${JSON.stringify({ type: 'health-check' })}'`);
```

## Troubleshooting

### Tasks Not Being Processed

1. Check if task worker is running: `ps aux | grep task-worker`
2. Check task status: `node scripts/task-worker.js status`
3. Look for tasks in cooldown
4. Check for errors in worker logs

### Duplicate Tasks Being Created

1. Ensure you're using `keyFields` for deduplication
2. Check that key fields are consistent across task creations
3. Verify cooldown periods are appropriate

### Tasks Stuck in Running State

1. Task worker may have crashed - restart it
2. Task handler may be hanging - check logs
3. Manually update task status if needed:
   ```javascript
   await taskQueue.updateTask(taskId, { status: 'failed', error: { message: 'Timeout' } });
   ```

## Future Enhancements

- [ ] Web UI for task queue monitoring
- [ ] Task scheduling with cron-like syntax
- [ ] Task dependencies (task A must complete before task B)
- [ ] Task hooks (webhooks on task completion)
- [ ] Performance metrics and analytics
- [ ] Multi-worker coordination with locking
- [ ] Task logs stored with tasks
- [ ] Integration with notification systems (Slack, Discord)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review task logs in `AUTOPILOT_SYSTEM/tasks/`
3. Check worker logs
4. Create a GitHub issue (ironically!) for bugs in the task system itself
