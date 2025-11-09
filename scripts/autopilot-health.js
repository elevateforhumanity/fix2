#!/usr/bin/env node

/**
 * Autopilot Health Monitor
 * 
 * Aggregates health information from GitHub Actions and local markers
 * Updates AUTOPILOT_SYSTEM/status.json without creating issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STATUS_DIR = path.join(process.cwd(), 'AUTOPILOT_SYSTEM');
const STATUS_FILE = path.join(STATUS_DIR, 'status.json');
const LOCK_FILE = path.join(process.cwd(), '.autopilot-lock');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(level, message) {
  const timestamp = new Date().toISOString();
  const prefix = {
    info: `${colors.blue}ℹ${colors.reset}`,
    success: `${colors.green}✅${colors.reset}`,
    warning: `${colors.yellow}⚠️${colors.reset}`,
    error: `${colors.red}❌${colors.reset}`,
  }[level] || '';
  
  console.log(`${prefix} [${timestamp}] ${message}`);
}

// Check if autopilot is currently running
function checkLockFile() {
  if (fs.existsSync(LOCK_FILE)) {
    try {
      const pid = fs.readFileSync(LOCK_FILE, 'utf-8').trim();
      log('info', `Autopilot lock detected (PID: ${pid})`);
      return { locked: true, pid };
    } catch (error) {
      log('warning', `Could not read lock file: ${error.message}`);
      return { locked: false, pid: null };
    }
  }
  return { locked: false, pid: null };
}

// Check GitHub Actions status from environment or local markers
function checkGitHubActions() {
  const markers = {
    buildTest: path.join(process.cwd(), '.github', 'markers', 'build-test-passed'),
    check: path.join(process.cwd(), '.github', 'markers', 'check-passed'),
    autopilot: path.join(process.cwd(), '.autopilot-active'),
  };

  const status = {
    buildTest: fs.existsSync(markers.buildTest) ? 'passed' : 'unknown',
    check: fs.existsSync(markers.check) ? 'passed' : 'unknown',
    autopilotActive: fs.existsSync(markers.autopilot),
  };

  // Check GitHub Actions from environment (if running in CI)
  if (process.env.GITHUB_ACTIONS === 'true') {
    status.runId = process.env.GITHUB_RUN_ID || null;
    status.workflow = process.env.GITHUB_WORKFLOW || null;
    status.ref = process.env.GITHUB_REF || null;
  }

  return status;
}

// Read existing status or create default
function readStatus() {
  if (fs.existsSync(STATUS_FILE)) {
    try {
      const content = fs.readFileSync(STATUS_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      log('warning', `Could not parse status file: ${error.message}`);
      return createDefaultStatus();
    }
  }
  return createDefaultStatus();
}

function createDefaultStatus() {
  return {
    lastRun: null,
    status: 'unknown',
    steps: {},
    errors: [],
  };
}

// Aggregate health information
function aggregateHealth() {
  log('info', 'Aggregating autopilot health information...');

  const lockStatus = checkLockFile();
  const ghStatus = checkGitHubActions();
  const existingStatus = readStatus();

  const health = {
    ...existingStatus,
    lastHealthCheck: new Date().toISOString(),
    locked: lockStatus.locked,
    lockPid: lockStatus.pid,
    githubActions: ghStatus,
    systemChecks: {
      statusFileExists: fs.existsSync(STATUS_FILE),
      lockFileExists: lockStatus.locked,
      autopilotActive: ghStatus.autopilotActive,
    },
  };

  // Calculate overall health score
  let healthScore = 0;
  let totalChecks = 0;

  if (ghStatus.buildTest === 'passed') healthScore++;
  totalChecks++;

  if (ghStatus.check === 'passed') healthScore++;
  totalChecks++;

  if (!lockStatus.locked || existingStatus.status === 'completed') healthScore++;
  totalChecks++;

  health.healthScore = totalChecks > 0 ? (healthScore / totalChecks) * 100 : 0;
  health.healthStatus = health.healthScore >= 75 ? 'healthy' : 
                        health.healthScore >= 50 ? 'degraded' : 'unhealthy';

  return health;
}

// Write status to file
function writeStatus(status) {
  try {
    // Ensure directory exists
    if (!fs.existsSync(STATUS_DIR)) {
      fs.mkdirSync(STATUS_DIR, { recursive: true });
      log('info', `Created status directory: ${STATUS_DIR}`);
    }

    // Write status with pretty formatting
    fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2));
    log('success', `Status updated: ${STATUS_FILE}`);
    
    return true;
  } catch (error) {
    log('error', `Failed to write status: ${error.message}`);
    return false;
  }
}

// Main execution
async function main() {
  log('info', 'Starting autopilot health check...');

  try {
    const health = aggregateHealth();
    const written = writeStatus(health);

    if (written) {
      log('success', `Health status: ${health.healthStatus} (${health.healthScore.toFixed(1)}%)`);
      
      // Log summary
      console.log('\n📊 Health Summary:');
      console.log(`   Status: ${health.healthStatus}`);
      console.log(`   Score: ${health.healthScore.toFixed(1)}%`);
      console.log(`   Locked: ${health.locked ? 'Yes' : 'No'}`);
      console.log(`   GitHub Actions:`);
      console.log(`     - Build/Test: ${health.githubActions.buildTest}`);
      console.log(`     - Check: ${health.githubActions.check}`);
      console.log(`     - Autopilot Active: ${health.githubActions.autopilotActive ? 'Yes' : 'No'}`);
      
      if (health.errors && health.errors.length > 0) {
        console.log(`\n⚠️  Recent Errors (${health.errors.length}):`);
        health.errors.slice(-3).forEach((error, idx) => {
          console.log(`   ${idx + 1}. ${error}`);
        });
      }
      
      console.log('');
      process.exit(0);
    } else {
      log('error', 'Failed to write health status');
      process.exit(1);
    }
  } catch (error) {
    log('error', `Health check failed: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { aggregateHealth, writeStatus, checkGitHubActions };
