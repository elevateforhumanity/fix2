/**
 * Auto-Sync Jobs for Google Classroom
 *
 * Automated tasks that run on schedule:
 * - Nightly roster sync
 * - Missing assignment checks
 * - Grade export to Supabase
 * - Course activity monitoring
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface AutoSyncJob {
  name: string;
  description: string;
  schedule: string; // cron expression
  taskKind: string;
  priority: number;
  enabled: boolean;
}

export const AUTO_SYNC_JOBS: AutoSyncJob[] = [
  {
    name: 'Nightly Roster Sync',
    description: 'Sync all course rosters with Supabase',
    schedule: '0 2 * * *', // 2 AM daily
    taskKind: 'gc_sync_all_rosters',
    priority: 6,
    enabled: true,
  },
  {
    name: 'Missing Assignment Check',
    description: 'Check for students with missing assignments',
    schedule: '0 8 * * 1-5', // 8 AM weekdays
    taskKind: 'gc_check_missing_assignments',
    priority: 5,
    enabled: true,
  },
  {
    name: 'Grade Export',
    description: 'Export all grades to Supabase',
    schedule: '0 3 * * *', // 3 AM daily
    taskKind: 'gc_export_all_grades',
    priority: 6,
    enabled: true,
  },
  {
    name: 'Course Activity Monitor',
    description: 'Monitor course activity and engagement',
    schedule: '0 */6 * * *', // Every 6 hours
    taskKind: 'gc_monitor_activity',
    priority: 4,
    enabled: true,
  },
  {
    name: 'Upcoming Deadlines Reminder',
    description: 'Send reminders for upcoming assignment deadlines',
    schedule: '0 9 * * *', // 9 AM daily
    taskKind: 'gc_send_deadline_reminders',
    priority: 7,
    enabled: true,
  },
  {
    name: 'Weekly Progress Report',
    description: 'Generate weekly progress reports for instructors',
    schedule: '0 10 * * 1', // 10 AM every Monday
    taskKind: 'gc_generate_progress_report',
    priority: 5,
    enabled: true,
  },
];

/**
 * Queue auto-sync jobs based on schedule
 */
export async function queueAutoSyncJobs() {

  const now = new Date();
  const results = [];

  for (const job of AUTO_SYNC_JOBS) {
    if (!job.enabled) {
      continue;
    }

    try {
      // Check if job should run based on schedule
      if (shouldRunJob(job.schedule, now)) {

        const { data, error } = await supabase
          .from('tasks')
          .insert({
            kind: job.taskKind,
            payload: {
              jobName: job.name,
              scheduledAt: now.toISOString(),
            },
            priority: job.priority,
            status: 'pending',
          })
          .select()
          .single();

        if (error) throw error;

        results.push({
          job: job.name,
          status: 'queued',
          taskId: data.id,
        });
      } else {
      }
    } catch (error: any) {
      console.error(`❌ Failed to queue job ${job.name}:`, error.message);
      results.push({
        job: job.name,
        status: 'error',
        error: error.message,
      });
    }
  }

  return results;
}

/**
 * Simple cron schedule checker
 * Format: minute hour day month dayOfWeek
 * Example: "0 2 * * *" = 2 AM daily
 */
function shouldRunJob(schedule: string, now: Date): boolean {
  const [minute, hour, day, month, dayOfWeek] = schedule.split(' ');

  const nowMinute = now.getMinutes();
  const nowHour = now.getHours();
  const nowDay = now.getDate();
  const nowMonth = now.getMonth() + 1;
  const nowDayOfWeek = now.getDay();

  // Check minute
  if (minute !== '*' && parseInt(minute) !== nowMinute) return false;

  // Check hour
  if (hour !== '*' && parseInt(hour) !== nowHour) return false;

  // Check day
  if (day !== '*' && parseInt(day) !== nowDay) return false;

  // Check month
  if (month !== '*' && parseInt(month) !== nowMonth) return false;

  // Check day of week (0 = Sunday, 6 = Saturday)
  if (dayOfWeek !== '*') {
    // Handle ranges like "1-5" (Monday-Friday)
    if (dayOfWeek.includes('-')) {
      const [start, end] = dayOfWeek.split('-').map(Number);
      if (nowDayOfWeek < start || nowDayOfWeek > end) return false;
    } else if (parseInt(dayOfWeek) !== nowDayOfWeek) {
      return false;
    }
  }

  return true;
}

/**
 * Get next run time for a job
 */
export function getNextRunTime(schedule: string): Date {
  // Simple implementation - just add 1 day for daily jobs
  // For production, use a proper cron parser library
  const now = new Date();
  const [minute, hour] = schedule
    .split(' ')
    .map((s) => (s === '*' ? 0 : parseInt(s)));

  const next = new Date(now);
  next.setHours(hour, minute, 0, 0);

  if (next <= now) {
    next.setDate(next.getDate() + 1);
  }

  return next;
}

/**
 * List all auto-sync jobs with their status
 */
export function listAutoSyncJobs() {
  return AUTO_SYNC_JOBS.map((job) => ({
    ...job,
    nextRun: getNextRunTime(job.schedule),
  }));
}

// CLI command
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];

  switch (command) {
    case 'list':
      listAutoSyncJobs().forEach((job) => {
      });
      break;

    case 'queue':
      queueAutoSyncJobs()
        .then((results) => {
          results.forEach((r) => {
          });
        })
        .catch((error) => {
          console.error('❌ Error:', error.message);
          process.exit(1);
        });
      break;

    default:
        '  npx tsx src/auto-sync-jobs.ts queue  - Queue jobs that should run now'
      );
  }
}
