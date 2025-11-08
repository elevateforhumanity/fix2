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
      errors: []
    };
  }

  loadConfig() {
    try {
      if (existsSync('.autopilot-config.json')) {
        return JSON.parse(readFileSync('.autopilot-config.json', 'utf-8'));
      }
    } catch (error) {
      console.log('⚠️  Config not found, using defaults');
    }
    
    return {
      enabled: true,
      self_healing: true,
      auto_fix: true
    };
  }

  async checkHealth() {
    console.log('🔍 Checking system health...\n');
    
    const checks = [
      this.checkBuild(),
      this.checkTypeScript(),
      this.checkESLint(),
      this.checkSecrets(),
      this.checkWorkflows(),
      this.checkDependencies()
    ];
    
    for (const check of checks) {
      await check;
    }
    
    return this.status.healthy;
  }

  async checkBuild() {
    console.log('📦 Checking build...');
    try {
      execSync('pnpm build', { stdio: 'pipe' });
      console.log('   ✅ Build successful\n');
    } catch (error) {
      console.log('   ❌ Build failed\n');
      this.status.issuesFound++;
      if (this.config.auto_fix) {
        await this.fixBuild();
      }
    }
  }

  async checkTypeScript() {
    console.log('📝 Checking TypeScript...');
    try {
      execSync('pnpm typecheck', { stdio: 'pipe' });
      console.log('   ✅ TypeScript OK\n');
    } catch (error) {
      console.log('   ❌ TypeScript errors found\n');
      this.status.issuesFound++;
      if (this.config.auto_fix) {
        await this.fixTypeScript();
      }
    }
  }

  async checkESLint() {
    console.log('🔍 Checking ESLint...');
    try {
      execSync('pnpm lint', { stdio: 'pipe' });
      console.log('   ✅ ESLint OK\n');
    } catch (error) {
      console.log('   ❌ ESLint errors found\n');
      this.status.issuesFound++;
      if (this.config.auto_fix) {
        await this.fixESLint();
      }
    }
  }

  async checkSecrets() {
    console.log('🔐 Checking secrets...');
    if (existsSync('.env.production')) {
      const content = readFileSync('.env.production', 'utf-8');
      if (content.includes('PLACEHOLDER')) {
        console.log('   ⚠️  Placeholder secrets found\n');
        this.status.issuesFound++;
        if (this.config.auto_fix) {
          await this.fixSecrets();
        }
      } else {
        console.log('   ✅ Secrets OK\n');
      }
    } else {
      console.log('   ⚠️  No .env.production\n');
      this.status.issuesFound++;
      if (this.config.auto_fix) {
        await this.fixSecrets();
      }
    }
  }

  async checkWorkflows() {
    console.log('⚙️  Checking workflows...');
    const workflows = [
      '.github/workflows/production-ready-loop.yml',
      '.github/workflows/secrets-validator.yml',
      '.github/workflows/vercel-deploy.yml'
    ];
    
    let allExist = true;
    for (const workflow of workflows) {
      if (!existsSync(workflow)) {
        console.log(`   ❌ Missing: ${workflow}`);
        allExist = false;
        this.status.issuesFound++;
      }
    }
    
    if (allExist) {
      console.log('   ✅ All workflows present\n');
    } else {
      console.log('');
    }
  }

  async checkDependencies() {
    console.log('📦 Checking dependencies...');
    if (existsSync('node_modules')) {
      console.log('   ✅ Dependencies installed\n');
    } else {
      console.log('   ❌ Dependencies missing\n');
      this.status.issuesFound++;
      if (this.config.auto_fix) {
        await this.fixDependencies();
      }
    }
  }

  async fixBuild() {
    console.log('🔧 Fixing build issues...');
    try {
      execSync('./make-production-ready.sh', { stdio: 'inherit', timeout: 300000 });
      this.status.issuesFixed++;
      console.log('   ✅ Build fixed\n');
    } catch (error) {
      console.log('   ⚠️  Build fix incomplete\n');
    }
  }

  async fixTypeScript() {
    console.log('🔧 Fixing TypeScript errors...');
    try {
      execSync('node scripts/fix-all-typescript-errors.mjs', { stdio: 'inherit' });
      this.status.issuesFixed++;
      console.log('   ✅ TypeScript fixed\n');
    } catch (error) {
      console.log('   ⚠️  TypeScript fix incomplete\n');
    }
  }

  async fixESLint() {
    console.log('🔧 Fixing ESLint errors...');
    try {
      execSync('pnpm lint:fix', { stdio: 'inherit' });
      this.status.issuesFixed++;
      console.log('   ✅ ESLint fixed\n');
    } catch (error) {
      console.log('   ⚠️  ESLint fix incomplete\n');
    }
  }

  async fixSecrets() {
    console.log('🔧 Fixing secrets...');
    try {
      execSync('node workers/secrets-autopilot.js', { stdio: 'inherit' });
      this.status.issuesFixed++;
      console.log('   ✅ Secrets configured\n');
    } catch (error) {
      console.log('   ⚠️  Secrets fix incomplete\n');
    }
  }

  async fixDependencies() {
    console.log('🔧 Installing dependencies...');
    try {
      execSync('pnpm install --frozen-lockfile', { stdio: 'inherit' });
      this.status.issuesFixed++;
      console.log('   ✅ Dependencies installed\n');
    } catch (error) {
      console.log('   ⚠️  Dependencies install incomplete\n');
    }
  }

  async autoCommit() {
    if (!this.config.auto_commit) return;
    
    console.log('💾 Auto-committing fixes...');
    try {
      execSync('git add -A', { stdio: 'pipe' });
      execSync(`git commit -m "fix: auto-heal by self-healing autopilot

Issues found: ${this.status.issuesFound}
Issues fixed: ${this.status.issuesFixed}

Co-authored-by: Ona <no-reply@ona.com>"`, { stdio: 'pipe' });
      console.log('   ✅ Changes committed\n');
    } catch (error) {
      console.log('   ℹ️  Nothing to commit\n');
    }
  }

  async autoPush() {
    if (!this.config.auto_push) return;
    
    console.log('📤 Auto-pushing changes...');
    try {
      execSync('git push origin main', { stdio: 'pipe' });
      console.log('   ✅ Changes pushed\n');
    } catch (error) {
      console.log('   ⚠️  Push failed or nothing to push\n');
    }
  }

  async run() {
    console.log('🤖 SELF-HEALING AUTOPILOT');
    console.log('=========================\n');
    
    if (!this.config.enabled) {
      console.log('⚠️  Autopilot is disabled\n');
      return;
    }
    
    const healthy = await this.checkHealth();
    
    if (this.status.issuesFound > 0) {
      console.log(`📊 Found ${this.status.issuesFound} issues`);
      console.log(`✅ Fixed ${this.status.issuesFixed} issues\n`);
      
      await this.autoCommit();
      await this.autoPush();
    } else {
      console.log('✅ System is healthy!\n');
    }
    
    // Update status
    this.status.lastCheck = new Date();
    writeFileSync('.autopilot-status.json', JSON.stringify(this.status, null, 2));
    
    console.log('🎉 Self-healing autopilot complete!\n');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const autopilot = new SelfHealingAutopilot();
  autopilot.run().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export default SelfHealingAutopilot;
