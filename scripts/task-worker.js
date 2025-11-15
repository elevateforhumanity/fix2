#!/usr/bin/env node

/**
 * Task Worker Runner for Autopilot
 * 
 * Processes tasks from the file-based queue in a resilient, deduplicated manner.
 * Prevents issue spam by executing tasks with cooldown periods.
 */

import taskQueue from './utilities/task-queue.js';

// Task handlers for different task types
const taskHandlers = {
  'health-check': async (task) => {
    console.log('Running health check...');
    // Placeholder: implement actual health check logic
    return { healthy: true, checks: [] };
  },

  'auto-heal': async (task) => {
    console.log('Running auto-heal...');
    // Placeholder: implement actual healing logic
    return { healed: true, fixes: [] };
  },

  'auto-push': async (task) => {
    console.log('Running auto-push...');
    // Placeholder: implement actual push logic
    return { pushed: false, reason: 'Not implemented' };
  },

  'deploy': async (task) => {
    console.log('Running deployment...');
    // Placeholder: implement actual deployment logic
    return { deployed: false, reason: 'Not implemented' };
  },

  'build-fix': async (task) => {
    console.log('Running build fix...');
    // Placeholder: implement actual build fix logic
    return { fixed: false, reason: 'Not implemented' };
  },

  'lint-fix': async (task) => {
    console.log('Running lint fix...');
    // Placeholder: implement actual lint fix logic
    return { fixed: false, reason: 'Not implemented' };
  },

  'test-fix': async (task) => {
    console.log('Running test fix...');
    // Placeholder: implement actual test fix logic
    return { fixed: false, reason: 'Not implemented' };
  },

  'secrets-update': async (task) => {
    console.log('Running secrets update...');
    // Placeholder: implement actual secrets update logic
    return { updated: false, reason: 'Not implemented' };
  },

  'dependency-update': async (task) => {
    console.log('Running dependency update...');
    // Placeholder: implement actual dependency update logic
    return { updated: false, reason: 'Not implemented' };
  },

  'custom': async (task) => {
    console.log('Running custom task...');
    // Placeholder: implement custom task logic
    return { executed: true };
  },
};

/**
 * Execute a single task
 */
async function executeTask(task) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Executing task: ${task.id}`);
  console.log(`Type: ${task.type}`);
  console.log(`Priority: ${task.priority}`);
  console.log(`Created: ${task.createdAt}`);
  console.log(`Retry: ${task.retryCount}/${task.maxRetries}`);
  console.log(`${'='.repeat(60)}\n`);

  try {
    // Mark task as started
    await taskQueue.startTask(task.id);

    // Get the handler for this task type
    const handler = taskHandlers[task.type];
    if (!handler) {
      throw new Error(`No handler found for task type: ${task.type}`);
    }

    // Execute the task
    const result = await handler(task);

    // Mark task as completed
    await taskQueue.completeTask(task.id, result);

    console.log(`\n✅ Task ${task.id} completed successfully`);
    return { success: true, result };
  } catch (error) {
    console.error(`\n❌ Task ${task.id} failed:`, error.message);

    // Mark task as failed with cooldown
    await taskQueue.failTask(task.id, error);

    return { success: false, error: error.message };
  }
}

/**
 * Process tasks continuously
 */
async function processTasksContinuously(options = {}) {
  const {
    maxTasks = null, // Process unlimited tasks by default
    intervalMs = 5000, // Check for new tasks every 5 seconds
  } = options;

  let processedCount = 0;
  let running = true;

  console.log('🚀 Task Worker Runner started');
  console.log(`Checking for tasks every ${intervalMs}ms`);
  if (maxTasks) {
    console.log(`Will process up to ${maxTasks} tasks`);
  }

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down gracefully...');
    running = false;
  });

  process.on('SIGTERM', () => {
    console.log('\n\n🛑 Shutting down gracefully...');
    running = false;
  });

  while (running) {
    try {
      // Get next available task
      const task = await taskQueue.getNextTask();

      if (task) {
        await executeTask(task);
        processedCount++;

        // Check if we've reached the max tasks limit
        if (maxTasks && processedCount >= maxTasks) {
          console.log(`\n✅ Processed ${processedCount} tasks (max reached)`);
          break;
        }
      } else {
        // No tasks available
        console.log('No tasks available, waiting...');
      }

      // Wait before checking for next task
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    } catch (error) {
      console.error('Error in task processing loop:', error);
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }
  }

  console.log(`\n🏁 Task Worker Runner stopped (processed ${processedCount} tasks)`);
}

/**
 * Process a single task (one-shot mode)
 */
async function processOneTask() {
  console.log('🚀 Task Worker Runner (one-shot mode)');

  try {
    const task = await taskQueue.getNextTask();

    if (!task) {
      console.log('No tasks available');
      return;
    }

    await executeTask(task);
    console.log('\n✅ Done');
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

/**
 * Show task queue status
 */
async function showStatus() {
  console.log('📊 Task Queue Status\n');

  const stats = await taskQueue.getTaskStats();
  console.log('Total tasks:', stats.total);
  console.log('\nBy Status:');
  Object.entries(stats.byStatus).forEach(([status, count]) => {
    console.log(`  ${status}: ${count}`);
  });
  console.log('\nBy Type:');
  Object.entries(stats.byType).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
  console.log('\nBy Priority:');
  Object.entries(stats.byPriority).forEach(([priority, count]) => {
    console.log(`  ${priority}: ${count}`);
  });
  console.log(`\nIn Cooldown: ${stats.inCooldown}`);

  console.log('\n📋 Pending Tasks:\n');
  const pendingTasks = await taskQueue.listTasks({ status: 'pending' });
  
  if (pendingTasks.length === 0) {
    console.log('  No pending tasks');
  } else {
    pendingTasks.forEach(task => {
      const cooldown = task.cooldownUntil ? 
        (new Date(task.cooldownUntil) > new Date() ? ' [COOLDOWN]' : '') : '';
      console.log(`  ${task.id} - ${task.type} (${task.priority})${cooldown}`);
    });
  }
}

/**
 * Clean up old tasks
 */
async function cleanup(daysOld = 7) {
  console.log(`🧹 Cleaning up tasks older than ${daysOld} days...`);
  const cleaned = await taskQueue.cleanupOldTasks(daysOld);
  console.log(`✅ Cleaned up ${cleaned} tasks`);
}

// CLI interface
const command = process.argv[2] || 'help';
const args = process.argv.slice(3);

switch (command) {
  case 'run':
    // Continuous processing
    processTasksContinuously({
      maxTasks: args[0] ? parseInt(args[0]) : null,
    });
    break;

  case 'once':
    // Process one task and exit
    processOneTask();
    break;

  case 'status':
    // Show queue status
    showStatus();
    break;

  case 'cleanup':
    // Clean up old tasks
    cleanup(args[0] ? parseInt(args[0]) : 7);
    break;

  case 'help':
  default:
    console.log(`
Task Worker Runner for Autopilot

Usage:
  node task-worker.js <command> [options]

Commands:
  run [maxTasks]    - Process tasks continuously (Ctrl+C to stop)
                      Optional: specify max number of tasks to process
  
  once              - Process one task and exit
  
  status            - Show current queue status
  
  cleanup [days]    - Clean up completed/failed tasks older than [days] (default: 7)
  
  help              - Show this help message

Examples:
  node task-worker.js run          # Process tasks continuously
  node task-worker.js run 10       # Process up to 10 tasks
  node task-worker.js once         # Process one task
  node task-worker.js status       # Show queue status
  node task-worker.js cleanup 30   # Clean up tasks older than 30 days
`);
    break;
}
