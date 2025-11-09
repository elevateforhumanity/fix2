/**
 * Task Queue Manager for Autopilot
 * 
 * File-based task queue with deduplication, cooldown, and resilient processing.
 * Prevents issue spam by storing tasks as durable JSON files in the repository.
 */

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Task storage directory
const TASKS_DIR = path.join(__dirname, '../../AUTOPILOT_SYSTEM/tasks');

/**
 * Generate a unique task ID based on type and key fields
 */
function generateTaskId(type, keyFields = {}) {
  const data = JSON.stringify({ type, ...keyFields });
  return crypto.createHash('md5').update(data).digest('hex').substring(0, 16);
}

/**
 * Get task filename from task ID
 */
function getTaskFilename(taskId) {
  return path.join(TASKS_DIR, `${taskId}.json`);
}

/**
 * Ensure tasks directory exists
 */
async function ensureTasksDir() {
  try {
    await fs.access(TASKS_DIR);
  } catch {
    await fs.mkdir(TASKS_DIR, { recursive: true });
  }
}

/**
 * Create a new task
 * 
 * @param {string} type - Task type
 * @param {object} options - Task options
 * @returns {Promise<object>} Created task
 */
export async function createTask(type, options = {}) {
  await ensureTasksDir();

  const {
    priority = 'medium',
    payload = {},
    cooldownMinutes = 60,
    maxRetries = 3,
    metadata = {},
    keyFields = {},
  } = options;

  // Generate task ID for deduplication
  const id = generateTaskId(type, keyFields);
  const filename = getTaskFilename(id);

  // Check if task already exists (deduplication)
  try {
    const existing = await readTask(id);
    
    // If task is in cooldown, return it without creating a new one
    if (existing.cooldownUntil && new Date(existing.cooldownUntil) > new Date()) {
      console.log(`Task ${id} is in cooldown until ${existing.cooldownUntil}`);
      return existing;
    }
    
    // If task is pending or running, return it without creating a new one
    if (existing.status === 'pending' || existing.status === 'running') {
      console.log(`Task ${id} is already ${existing.status}`);
      return existing;
    }
    
    // If task is completed recently, skip it
    if (existing.status === 'completed' && existing.completedAt) {
      const completedAt = new Date(existing.completedAt);
      const cooldownEnd = new Date(completedAt.getTime() + cooldownMinutes * 60000);
      if (cooldownEnd > new Date()) {
        console.log(`Task ${id} was completed recently, still in cooldown`);
        return existing;
      }
    }
  } catch (error) {
    // Task doesn't exist, which is fine for new tasks
  }

  const task = {
    id,
    type,
    status: 'pending',
    priority,
    createdAt: new Date().toISOString(),
    retryCount: 0,
    maxRetries,
    cooldownMinutes,
    payload,
    metadata,
  };

  await fs.writeFile(filename, JSON.stringify(task, null, 2));
  console.log(`Created task ${id} (${type})`);
  
  return task;
}

/**
 * Read a task by ID
 */
export async function readTask(taskId) {
  const filename = getTaskFilename(taskId);
  const data = await fs.readFile(filename, 'utf-8');
  return JSON.parse(data);
}

/**
 * Update a task
 */
export async function updateTask(taskId, updates) {
  const task = await readTask(taskId);
  const updatedTask = { ...task, ...updates };
  const filename = getTaskFilename(taskId);
  await fs.writeFile(filename, JSON.stringify(updatedTask, null, 2));
  return updatedTask;
}

/**
 * Delete a task
 */
export async function deleteTask(taskId) {
  const filename = getTaskFilename(taskId);
  await fs.unlink(filename);
  console.log(`Deleted task ${taskId}`);
}

/**
 * List all tasks with optional filters
 */
export async function listTasks(filters = {}) {
  await ensureTasksDir();
  
  const files = await fs.readdir(TASKS_DIR);
  const taskFiles = files.filter(f => f.endsWith('.json') && f !== 'task-schema.json');
  
  const tasks = await Promise.all(
    taskFiles.map(async (file) => {
      try {
        const data = await fs.readFile(path.join(TASKS_DIR, file), 'utf-8');
        return JSON.parse(data);
      } catch (error) {
        console.error(`Error reading task file ${file}:`, error.message);
        return null;
      }
    })
  );

  let filteredTasks = tasks.filter(t => t !== null);

  // Apply filters
  if (filters.type) {
    filteredTasks = filteredTasks.filter(t => t.type === filters.type);
  }
  if (filters.status) {
    filteredTasks = filteredTasks.filter(t => t.status === filters.status);
  }
  if (filters.priority) {
    filteredTasks = filteredTasks.filter(t => t.priority === filters.priority);
  }

  // Sort by priority and creation time
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  filteredTasks.sort((a, b) => {
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  return filteredTasks;
}

/**
 * Get next task to process (respects cooldowns and priorities)
 */
export async function getNextTask() {
  const tasks = await listTasks({ status: 'pending' });
  const now = new Date();

  // Filter out tasks in cooldown
  const availableTasks = tasks.filter(task => {
    if (task.cooldownUntil) {
      return new Date(task.cooldownUntil) <= now;
    }
    return true;
  });

  return availableTasks[0] || null;
}

/**
 * Mark task as started
 */
export async function startTask(taskId) {
  return await updateTask(taskId, {
    status: 'running',
    startedAt: new Date().toISOString(),
    lastAttemptAt: new Date().toISOString(),
  });
}

/**
 * Mark task as completed
 */
export async function completeTask(taskId, result = {}) {
  return await updateTask(taskId, {
    status: 'completed',
    completedAt: new Date().toISOString(),
    result,
  });
}

/**
 * Mark task as failed with cooldown
 */
export async function failTask(taskId, error = {}) {
  const task = await readTask(taskId);
  const retryCount = (task.retryCount || 0) + 1;
  const cooldownUntil = new Date(Date.now() + task.cooldownMinutes * 60000).toISOString();

  const updates = {
    status: retryCount >= task.maxRetries ? 'failed' : 'pending',
    retryCount,
    cooldownUntil,
    error: {
      message: error.message || String(error),
      stack: error.stack,
      code: error.code,
      timestamp: new Date().toISOString(),
    },
  };

  if (retryCount >= task.maxRetries) {
    updates.completedAt = new Date().toISOString();
  }

  return await updateTask(taskId, updates);
}

/**
 * Clean up old completed/failed tasks
 */
export async function cleanupOldTasks(daysOld = 7) {
  const tasks = await listTasks();
  const cutoffDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);
  let cleaned = 0;

  for (const task of tasks) {
    if ((task.status === 'completed' || task.status === 'failed') && task.completedAt) {
      const completedAt = new Date(task.completedAt);
      if (completedAt < cutoffDate) {
        await deleteTask(task.id);
        cleaned++;
      }
    }
  }

  console.log(`Cleaned up ${cleaned} old tasks`);
  return cleaned;
}

/**
 * Get task statistics
 */
export async function getTaskStats() {
  const tasks = await listTasks();
  const stats = {
    total: tasks.length,
    byStatus: {},
    byType: {},
    byPriority: {},
    inCooldown: 0,
  };

  const now = new Date();

  for (const task of tasks) {
    // Count by status
    stats.byStatus[task.status] = (stats.byStatus[task.status] || 0) + 1;
    
    // Count by type
    stats.byType[task.type] = (stats.byType[task.type] || 0) + 1;
    
    // Count by priority
    stats.byPriority[task.priority] = (stats.byPriority[task.priority] || 0) + 1;
    
    // Count cooldowns
    if (task.cooldownUntil && new Date(task.cooldownUntil) > now) {
      stats.inCooldown++;
    }
  }

  return stats;
}

export default {
  createTask,
  readTask,
  updateTask,
  deleteTask,
  listTasks,
  getNextTask,
  startTask,
  completeTask,
  failTask,
  cleanupOldTasks,
  getTaskStats,
};
