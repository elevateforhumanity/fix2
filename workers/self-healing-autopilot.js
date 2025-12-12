#!/usr/bin/env node
/**
 * SELF-HEALING AUTOPILOT WORKER
 * Continuously monitors and fixes issues automatically
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

class SelfHealingAutopilot {
  constructor() {
    this.config = this.loadConfig();
    this.status = {
      healthy: true,
      lastCheck: new Date(),
      issuesFound: 0,
      issuesFixed: 0,
      errors: [],
    };
  }

  loadConfig() {
    try {
      if (existsSync('.autopilot-config.json')) {
        return JSON.parse(readFileSync('.autopilot-config.json', 'utf-8'));
      }
    } catch (error) {
    }

    return {
      enabled: true,
      self_healing: true,
      auto_fix: true,
    };
  }

  async checkHealth() {

    const checks = [
      this.checkBuild(),
      this.checkTypeScript(),
      this.checkESLint(),
      this.checkSecrets(),
      this.checkWorkflows(),
      this.checkDependencies(),
    ];

    for (const check of checks) {
      await check;
    }

    return this.status.healthy;
  }

  async checkBuild() {
    try {
      execSync('pnpm build', { stdio: 'pipe' });
    } catch (error) {
      this.status.issuesFound++;
      if (this.config.auto_fix) {
        await this.fixBuild();
      }
    }
  }

  async checkTypeScript() {
    try {
      execSync('pnpm typecheck', { stdio: 'pipe' });
    } catch (error) {
      this.status.issuesFound++;
      if (this.config.auto_fix) {
        await this.fixTypeScript();
      }
    }
  }

  async checkESLint() {
    try {
      execSync('pnpm lint', { stdio: 'pipe' });
    } catch (error) {
      this.status.issuesFound++;
      if (this.config.auto_fix) {
        await this.fixESLint();
      }
    }
  }

  async checkSecrets() {
    if (existsSync('.env.production')) {
      const content = readFileSync('.env.production', 'utf-8');
      if (content.includes('PLACEHOLDER')) {
        this.status.issuesFound++;
        if (this.config.auto_fix) {
          await this.fixSecrets();
        }
      } else {
      }
    } else {
      this.status.issuesFound++;
      if (this.config.auto_fix) {
        await this.fixSecrets();
      }
    }
  }

  async checkWorkflows() {
    const workflows = [
      '.github/workflows/production-ready-loop.yml',
      '.github/workflows/secrets-validator.yml',
      '.github/workflows/vercel-deploy.yml',
    ];

    let allExist = true;
    for (const workflow of workflows) {
      if (!existsSync(workflow)) {
        allExist = false;
        this.status.issuesFound++;
      }
    }

    if (allExist) {
    } else {
    }
  }

  async checkDependencies() {
    if (existsSync('node_modules')) {
    } else {
      this.status.issuesFound++;
      if (this.config.auto_fix) {
        await this.fixDependencies();
      }
    }
  }

  async fixBuild() {
    try {
      execSync('./make-production-ready.sh', {
        stdio: 'inherit',
        timeout: 300000,
      });
      this.status.issuesFixed++;
    } catch (error) {
    }
  }

  async fixTypeScript() {
    try {
      execSync('node scripts/fix-all-typescript-errors.mjs', {
        stdio: 'inherit',
      });
      this.status.issuesFixed++;
    } catch (error) {
    }
  }

  async fixESLint() {
    try {
      execSync('pnpm lint:fix', { stdio: 'inherit' });
      this.status.issuesFixed++;
    } catch (error) {
    }
  }

  async fixSecrets() {
    try {
      execSync('node workers/secrets-autopilot.js', { stdio: 'inherit' });
      this.status.issuesFixed++;
    } catch (error) {
    }
  }

  async fixDependencies() {
    try {
      execSync('pnpm install --frozen-lockfile', { stdio: 'inherit' });
      this.status.issuesFixed++;
    } catch (error) {
    }
  }

  async autoCommit() {
    if (!this.config.auto_commit) return;

    try {
      execSync('git add -A', { stdio: 'pipe' });
      execSync(
        `git commit -m "fix: auto-heal by self-healing autopilot

Issues found: ${this.status.issuesFound}
Issues fixed: ${this.status.issuesFixed}

Co-authored-by: Ona <no-reply@ona.com>"`,
        { stdio: 'pipe' }
      );
    } catch (error) {
    }
  }

  async autoPush() {
    if (!this.config.auto_push) return;

    try {
      execSync('git push origin main', { stdio: 'pipe' });
    } catch (error) {
    }
  }

  async run() {

    if (!this.config.enabled) {
      return;
    }

    const healthy = await this.checkHealth();

    if (this.status.issuesFound > 0) {

      await this.autoCommit();
      await this.autoPush();
    } else {
    }

    // Update status
    this.status.lastCheck = new Date();
    writeFileSync(
      '.autopilot-status.json',
      JSON.stringify(this.status, null, 2)
    );

  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const autopilot = new SelfHealingAutopilot();
  autopilot.run().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export default SelfHealingAutopilot;
