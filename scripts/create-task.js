#!/usr/bin/env node

/**
 * Task Creator CLI for Autopilot
 * 
 * Create tasks from command line or scripts instead of creating GitHub issues.
 */

import taskQueue from './utilities/task-queue.js';

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    type: null,
    priority: 'medium',
    payload: {},
    cooldownMinutes: 60,
    maxRetries: 3,
    metadata: {},
    keyFields: {},
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--type':
      case '-t':
        options.type = args[++i];
        break;
      
      case '--priority':
      case '-p':
        options.priority = args[++i];
        break;
      
      case '--cooldown':
      case '-c':
        options.cooldownMinutes = parseInt(args[++i]);
        break;
      
      case '--retries':
      case '-r':
        options.maxRetries = parseInt(args[++i]);
        break;
      
      case '--payload':
        try {
          options.payload = JSON.parse(args[++i]);
        } catch (e) {
          console.error('Invalid JSON payload:', e.message);
          process.exit(1);
        }
        break;
      
      case '--metadata':
        try {
          options.metadata = JSON.parse(args[++i]);
        } catch (e) {
          console.error('Invalid JSON metadata:', e.message);
          process.exit(1);
        }
        break;
      
      case '--key':
        try {
          options.keyFields = JSON.parse(args[++i]);
        } catch (e) {
          console.error('Invalid JSON key fields:', e.message);
          process.exit(1);
        }
        break;
      
      case '--help':
      case '-h':
        showHelp();
        process.exit(0);
        break;
      
      default:
        // If it doesn't start with -, treat as type if type is not set
        if (!arg.startsWith('-') && !options.type) {
          options.type = arg;
        } else {
          console.error(`Unknown option: ${arg}`);
          showHelp();
          process.exit(1);
        }
    }
  }

  return options;
}

/**
 * Show help message
 */
function showHelp() {
  console.log(`
Task Creator CLI for Autopilot

Usage:
  node create-task.js <type> [options]

Task Types:
  health-check       - System health check
  auto-heal          - Automatic healing/fixing
  auto-push          - Automatic git push
  deploy             - Deployment task
  build-fix          - Fix build issues
  lint-fix           - Fix linting issues
  test-fix           - Fix test issues
  secrets-update     - Update secrets
  dependency-update  - Update dependencies
  custom             - Custom task

Options:
  -t, --type <type>           Task type (required if not first argument)
  -p, --priority <priority>   Priority: low, medium, high, critical (default: medium)
  -c, --cooldown <minutes>    Cooldown period in minutes (default: 60)
  -r, --retries <count>       Max retry attempts (default: 3)
  --payload <json>            Task payload as JSON string
  --metadata <json>           Task metadata as JSON string
  --key <json>                Key fields for deduplication as JSON string
  -h, --help                  Show this help message

Examples:
  # Create a health check task
  node create-task.js health-check

  # Create a high-priority deploy task
  node create-task.js deploy --priority high

  # Create a build-fix task with payload
  node create-task.js build-fix --payload '{"target":"frontend"}'

  # Create a task with custom key for deduplication
  node create-task.js auto-heal --key '{"issue":"typescript-errors"}'

  # Create a task with all options
  node create-task.js deploy \\
    --priority critical \\
    --cooldown 30 \\
    --retries 5 \\
    --payload '{"env":"production","service":"api"}' \\
    --metadata '{"runId":"12345","workflow":"deploy"}' \\
    --key '{"env":"production"}'

Deduplication:
  Tasks with the same type and key fields will be deduplicated.
  If a task with the same ID exists and is:
    - In cooldown: existing task is returned
    - Pending/running: existing task is returned
    - Completed recently: existing task is returned (within cooldown period)
    - Completed long ago: new task is created
`);
}

/**
 * Validate task options
 */
function validateOptions(options) {
  if (!options.type) {
    console.error('Error: Task type is required');
    showHelp();
    return false;
  }

  const validTypes = [
    'health-check',
    'auto-heal',
    'auto-push',
    'deploy',
    'build-fix',
    'lint-fix',
    'test-fix',
    'secrets-update',
    'dependency-update',
    'custom',
  ];

  if (!validTypes.includes(options.type)) {
    console.error(`Error: Invalid task type: ${options.type}`);
    console.error(`Valid types: ${validTypes.join(', ')}`);
    return false;
  }

  const validPriorities = ['low', 'medium', 'high', 'critical'];
  if (!validPriorities.includes(options.priority)) {
    console.error(`Error: Invalid priority: ${options.priority}`);
    console.error(`Valid priorities: ${validPriorities.join(', ')}`);
    return false;
  }

  if (options.cooldownMinutes < 0) {
    console.error('Error: Cooldown minutes must be >= 0');
    return false;
  }

  if (options.maxRetries < 0) {
    console.error('Error: Max retries must be >= 0');
    return false;
  }

  return true;
}

/**
 * Main function
 */
async function main() {
  try {
    const options = parseArgs();

    if (!validateOptions(options)) {
      process.exit(1);
    }

    console.log('Creating task...');
    console.log('Type:', options.type);
    console.log('Priority:', options.priority);
    console.log('Cooldown:', options.cooldownMinutes, 'minutes');
    console.log('Max Retries:', options.maxRetries);

    if (Object.keys(options.payload).length > 0) {
      console.log('Payload:', JSON.stringify(options.payload));
    }

    if (Object.keys(options.metadata).length > 0) {
      console.log('Metadata:', JSON.stringify(options.metadata));
    }

    if (Object.keys(options.keyFields).length > 0) {
      console.log('Key Fields:', JSON.stringify(options.keyFields));
    }

    const task = await taskQueue.createTask(options.type, options);

    console.log('\n✅ Task created successfully!');
    console.log('Task ID:', task.id);
    console.log('Status:', task.status);
    console.log('Created At:', task.createdAt);

    if (task.cooldownUntil) {
      console.log('⚠️  Note: This task was deduplicated and is in cooldown until', task.cooldownUntil);
    }

    // Show task file location
    console.log('\nTask file: AUTOPILOT_SYSTEM/tasks/' + task.id + '.json');
  } catch (error) {
    console.error('\n❌ Error creating task:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { parseArgs, validateOptions };
