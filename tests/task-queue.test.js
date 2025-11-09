/**
 * Simple tests for task queue system
 * Run with: node tests/task-queue.test.js
 */

import taskQueue from '../scripts/utilities/task-queue.js';
import fs from 'fs/promises';
import path from 'path';

const TASKS_DIR = path.join(process.cwd(), 'AUTOPILOT_SYSTEM/tasks');

// Simple test runner
let testsPassed = 0;
let testsFailed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`✅ ${name}`);
    testsPassed++;
  } catch (error) {
    console.error(`❌ ${name}`);
    console.error(`   Error: ${error.message}`);
    testsFailed++;
  }
}

function assertEquals(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
  }
}

function assertExists(value, message) {
  if (!value) {
    throw new Error(message || 'Value should exist');
  }
}

function assertIncludes(array, value, message) {
  if (!array.includes(value)) {
    throw new Error(message || `Array should include ${value}`);
  }
}

// Clean up test tasks before running
async function cleanup() {
  try {
    const files = await fs.readdir(TASKS_DIR);
    for (const file of files) {
      if (file.endsWith('.json') && file !== 'task-schema.json') {
        await fs.unlink(path.join(TASKS_DIR, file));
      }
    }
  } catch (error) {
    // Directory might not exist yet
  }
}

// Run tests
async function runTests() {
  console.log('Running Task Queue Tests...\n');

  await cleanup();

  // Test 1: Create a task
  await test('Create a basic task', async () => {
    const task = await taskQueue.createTask('health-check', {
      priority: 'high',
      payload: { target: 'test' },
    });

    assertExists(task.id, 'Task should have an ID');
    assertEquals(task.type, 'health-check', 'Task type should match');
    assertEquals(task.status, 'pending', 'Task status should be pending');
    assertEquals(task.priority, 'high', 'Task priority should match');
  });

  // Test 2: Read a task
  await test('Read a task', async () => {
    const created = await taskQueue.createTask('lint-fix', {
      priority: 'medium',
    });

    const read = await taskQueue.readTask(created.id);
    assertEquals(read.id, created.id, 'Task IDs should match');
    assertEquals(read.type, 'lint-fix', 'Task type should match');
  });

  // Test 3: Update a task
  await test('Update a task', async () => {
    const created = await taskQueue.createTask('test-fix', {
      priority: 'low',
    });

    const updated = await taskQueue.updateTask(created.id, {
      status: 'running',
      startedAt: new Date().toISOString(),
    });

    assertEquals(updated.status, 'running', 'Status should be updated');
    assertExists(updated.startedAt, 'StartedAt should be set');
  });

  // Test 4: List tasks with filters
  await test('List tasks with filters', async () => {
    await cleanup();

    await taskQueue.createTask('health-check', { priority: 'high', keyFields: { test: 'hc1' } });
    await taskQueue.createTask('health-check', { priority: 'low', keyFields: { test: 'hc2' } });
    await taskQueue.createTask('deploy', { priority: 'critical', keyFields: { test: 'dep1' } });

    const allTasks = await taskQueue.listTasks();
    assertEquals(allTasks.length, 3, 'Should have 3 tasks');

    const healthChecks = await taskQueue.listTasks({ type: 'health-check' });
    assertEquals(healthChecks.length, 2, 'Should have 2 health-check tasks');

    const highPriority = await taskQueue.listTasks({ priority: 'high' });
    assertEquals(highPriority.length, 1, 'Should have 1 high priority task');
  });

  // Test 5: Task deduplication
  await test('Task deduplication', async () => {
    await cleanup();

    const task1 = await taskQueue.createTask('deploy', {
      keyFields: { env: 'prod', service: 'api' },
    });

    const task2 = await taskQueue.createTask('deploy', {
      keyFields: { env: 'prod', service: 'api' },
    });

    assertEquals(task1.id, task2.id, 'Tasks with same key should have same ID');

    const allTasks = await taskQueue.listTasks();
    assertEquals(allTasks.length, 1, 'Only one task should exist (deduplicated)');
  });

  // Test 6: Priority ordering
  await test('Priority ordering', async () => {
    await cleanup();

    await taskQueue.createTask('test-1', { type: 'custom', priority: 'low' });
    await taskQueue.createTask('test-2', { type: 'custom', priority: 'critical' });
    await taskQueue.createTask('test-3', { type: 'custom', priority: 'high' });
    await taskQueue.createTask('test-4', { type: 'custom', priority: 'medium' });

    const tasks = await taskQueue.listTasks();
    
    // Should be ordered: critical, high, medium, low
    const priorities = tasks.map(t => t.priority);
    assertEquals(priorities[0], 'critical', 'First should be critical');
    assertEquals(priorities[1], 'high', 'Second should be high');
    assertEquals(priorities[2], 'medium', 'Third should be medium');
    assertEquals(priorities[3], 'low', 'Fourth should be low');
  });

  // Test 7: Get next task (respects cooldown)
  await test('Get next task', async () => {
    await cleanup();

    await taskQueue.createTask('health-check', {
      priority: 'high',
      keyFields: { test: '1' },
    });

    const next = await taskQueue.getNextTask();
    assertExists(next, 'Should get a next task');
    assertEquals(next.priority, 'high', 'Should get the high priority task');
  });

  // Test 8: Start task
  await test('Start task', async () => {
    const created = await taskQueue.createTask('build-fix', {
      keyFields: { test: 'start' },
    });

    const started = await taskQueue.startTask(created.id);
    assertEquals(started.status, 'running', 'Status should be running');
    assertExists(started.startedAt, 'StartedAt should be set');
    assertExists(started.lastAttemptAt, 'LastAttemptAt should be set');
  });

  // Test 9: Complete task
  await test('Complete task', async () => {
    const created = await taskQueue.createTask('secrets-update', {
      keyFields: { test: 'complete' },
    });

    await taskQueue.startTask(created.id);
    const completed = await taskQueue.completeTask(created.id, { success: true });

    assertEquals(completed.status, 'completed', 'Status should be completed');
    assertExists(completed.completedAt, 'CompletedAt should be set');
    assertEquals(completed.result.success, true, 'Result should be set');
  });

  // Test 10: Fail task with retry
  await test('Fail task with retry', async () => {
    const created = await taskQueue.createTask('auto-heal', {
      keyFields: { test: 'fail' },
      maxRetries: 3,
    });

    await taskQueue.startTask(created.id);
    const failed = await taskQueue.failTask(created.id, new Error('Test error'));

    assertEquals(failed.status, 'pending', 'Status should be pending for retry');
    assertEquals(failed.retryCount, 1, 'Retry count should be 1');
    assertExists(failed.cooldownUntil, 'CooldownUntil should be set');
    assertExists(failed.error, 'Error should be recorded');
  });

  // Test 11: Fail task after max retries
  await test('Fail task after max retries', async () => {
    const created = await taskQueue.createTask('dependency-update', {
      keyFields: { test: 'max-fail' },
      maxRetries: 2,
    });

    await taskQueue.startTask(created.id);
    await taskQueue.failTask(created.id, new Error('Fail 1'));

    await taskQueue.startTask(created.id);
    const finalFail = await taskQueue.failTask(created.id, new Error('Fail 2'));

    assertEquals(finalFail.status, 'failed', 'Status should be failed');
    assertEquals(finalFail.retryCount, 2, 'Retry count should be 2');
  });

  // Test 12: Task statistics
  await test('Task statistics', async () => {
    await cleanup();

    await taskQueue.createTask('health-check', { priority: 'high' });
    await taskQueue.createTask('deploy', { priority: 'critical' });
    const task = await taskQueue.createTask('lint-fix', { priority: 'medium' });
    await taskQueue.completeTask(task.id);

    const stats = await taskQueue.getTaskStats();

    assertEquals(stats.total, 3, 'Should have 3 total tasks');
    assertEquals(stats.byStatus.pending, 2, 'Should have 2 pending');
    assertEquals(stats.byStatus.completed, 1, 'Should have 1 completed');
  });

  // Test 13: Cleanup old tasks
  await test('Cleanup old tasks', async () => {
    await cleanup();

    // Create an old task by manually setting completedAt
    const task = await taskQueue.createTask('custom', {
      keyFields: { test: 'old' },
    });
    
    await taskQueue.updateTask(task.id, {
      status: 'completed',
      completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    });

    const cleaned = await taskQueue.cleanupOldTasks(7);
    assertEquals(cleaned, 1, 'Should clean up 1 old task');

    const remaining = await taskQueue.listTasks();
    assertEquals(remaining.length, 0, 'Should have no remaining tasks');
  });

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log(`Tests Passed: ${testsPassed}`);
  console.log(`Tests Failed: ${testsFailed}`);
  console.log('='.repeat(60));

  if (testsFailed > 0) {
    process.exit(1);
  }

  // Clean up after tests
  await cleanup();
}

// Run tests
runTests().catch(error => {
  console.error('Test suite error:', error);
  process.exit(1);
});
