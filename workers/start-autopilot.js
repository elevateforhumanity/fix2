#!/usr/bin/env node
/**
 * Start Autopilot Worker
 * 
 * This script starts the autopilot worker as a standalone process.
 * It can run:
 * - As a background service
 * - In development mode
 * - In production mode
 * - Alongside your application
 */

import autopilotWorker from './autopilot-worker.js';

console.log('🤖 Starting Autopilot Worker...');
console.log('================================');
console.log('');
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('Working Directory:', process.cwd());
console.log('');

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('');
  console.log('🛑 Shutting down autopilot worker...');
  autopilotWorker.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('');
  console.log('🛑 Shutting down autopilot worker...');
  autopilotWorker.stop();
  process.exit(0);
});

// Keep process alive
process.stdin.resume();

console.log('✅ Autopilot worker is running');
console.log('Press Ctrl+C to stop');
console.log('');
