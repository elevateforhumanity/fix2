#!/usr/bin/env node
/**
 * DEPLOYMENT AUTOPILOT STARTER
 * Monitors and manages Vercel/Netlify deployments
 */







// Check if workflows exist
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cwd = path.resolve(__dirname, '..');

const workflows = [
  '.github/workflows/autopilot-config-vercel.yml',
  '.github/workflows/autopilot-sync-platforms.yml',
];

workflows.forEach((workflow) => {
  const exists = fs.existsSync(path.join(cwd, workflow));
  const status = exists ? '✅' : '❌';
});

// Check if scripts exist

const scripts = [
  'scripts/autopilot-config-vercel.sh',
  'scripts/autopilot-sync-platforms.sh',
  'vercel-check.mjs',
];

scripts.forEach((script) => {
  const exists = fs.existsSync(path.join(cwd, script));
  const status = exists ? '✅' : '❌';
});

// Check for GitHub Secrets documentation

const docs = [
  'AUTOPILOT_DEPLOYMENT_SYSTEM.md',
  'AUTOPILOT_VERCEL_WORKER.md',
  'AUTOPILOT_PLATFORM_SYNC.md',
  'DEPLOYMENT_AUTOMATION_COMPLETE.md',
];

docs.forEach((doc) => {
  const exists = fs.existsSync(path.join(cwd, doc));
  const status = exists ? '✅' : '❌';
});


  '  https://api.github.com/repos/elevateforhumanity/fix2/actions/workflows/autopilot-config-vercel.yml/dispatches \\'
);

  '- GitHub Actions: https://github.com/elevateforhumanity/fix2/actions'
);

  '💡 Tip: Run "node vercel-check.mjs" to validate your environment\n'
);
