/**
 * Autopilot Worker - Runs Inside the Application
 * 
 * This worker handles:
 * - Reading secrets from .env.production
 * - Syncing secrets to GitHub
 * - Syncing secrets to Vercel
 * - Self-healing when issues detected
 * - Health monitoring
 * 
 * Runs automatically when the app starts
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

class AutopilotWorker {
  constructor() {
    this.config = {};
    this.isRunning = false;
    this.healthCheckInterval = null;
  }

  /**
   * Load configuration from .env.production
   */
  async loadConfig() {
    try {
      const envPath = path.join(process.cwd(), '.env.production');
      const envContent = await fs.readFile(envPath, 'utf-8');
      
      // Parse .env file
      envContent.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split('=');
          const value = valueParts.join('=').trim();
          this.config[key] = value;
        }
      });

      console.log('✅ Autopilot: Loaded configuration from .env.production');
      return true;
    } catch (error) {
      console.error('❌ Autopilot: Failed to load .env.production:', error.message);
      return false;
    }
  }

  /**
   * Check if Vercel is configured
   */
  async checkVercelConfig() {
    try {
      const vercelPath = path.join(process.cwd(), '.vercel', 'project.json');
      const vercelConfig = JSON.parse(await fs.readFile(vercelPath, 'utf-8'));
      
      this.config.VERCEL_ORG_ID = vercelConfig.orgId;
      this.config.VERCEL_PROJECT_ID = vercelConfig.projectId;
      
      console.log('✅ Autopilot: Vercel project linked');
      return true;
    } catch (error) {
      console.log('⚠️ Autopilot: Vercel not linked yet');
      return false;
    }
  }

  /**
   * Sync secrets to GitHub
   */
  async syncToGitHub() {
    try {
      console.log('🔄 Autopilot: Syncing secrets to GitHub...');

      // Check if gh CLI is available
      try {
        await execAsync('gh auth status');
      } catch (error) {
        console.log('⚠️ Autopilot: GitHub CLI not authenticated');
        return false;
      }

      const secrets = [
        'VERCEL_TOKEN',
        'VERCEL_ORG_ID',
        'VERCEL_PROJECT_ID',
        'VITE_SUPABASE_URL',
        'VITE_SUPABASE_ANON_KEY',
        'VITE_STRIPE_PUBLISHABLE_KEY',
        'VITE_API_URL',
        'VITE_SITE_URL'
      ];

      for (const key of secrets) {
        const value = this.config[key];
        
        if (!value || value.includes('placeholder')) {
          console.log(`⏭️  Skipping ${key} (not set or placeholder)`);
          continue;
        }

        try {
          await execAsync(`echo "${value}" | gh secret set ${key}`);
          console.log(`✅ Set GitHub secret: ${key}`);
        } catch (error) {
          console.error(`❌ Failed to set ${key}:`, error.message);
        }
      }

      console.log('✅ Autopilot: GitHub secrets synced');
      return true;
    } catch (error) {
      console.error('❌ Autopilot: Failed to sync GitHub secrets:', error.message);
      return false;
    }
  }

  /**
   * Sync secrets to Vercel
   */
  async syncToVercel() {
    try {
      console.log('🔄 Autopilot: Syncing secrets to Vercel...');

      if (!this.config.VERCEL_TOKEN) {
        console.log('⚠️ Autopilot: VERCEL_TOKEN not set');
        return false;
      }

      const envVars = [
        'VITE_SUPABASE_URL',
        'VITE_SUPABASE_ANON_KEY',
        'VITE_STRIPE_PUBLISHABLE_KEY',
        'VITE_API_URL',
        'VITE_SITE_URL',
        'VITE_GA_MEASUREMENT_ID'
      ];

      for (const key of envVars) {
        const value = this.config[key] || (key === 'VITE_GA_MEASUREMENT_ID' ? 'G-EFHWORKFORCE01' : '');
        
        if (!value || value.includes('placeholder')) {
          console.log(`⏭️  Skipping ${key}`);
          continue;
        }

        try {
          // Remove existing
          await execAsync(`vercel env rm ${key} production --yes --token="${this.config.VERCEL_TOKEN}" 2>/dev/null || true`);
          
          // Add new
          await execAsync(`echo "${value}" | vercel env add ${key} production --yes --token="${this.config.VERCEL_TOKEN}"`);
          
          console.log(`✅ Set Vercel env: ${key}`);
        } catch (error) {
          console.error(`❌ Failed to set ${key}:`, error.message);
        }
      }

      console.log('✅ Autopilot: Vercel environment variables synced');
      return true;
    } catch (error) {
      console.error('❌ Autopilot: Failed to sync Vercel env vars:', error.message);
      return false;
    }
  }

  /**
   * Check site health
   */
  async checkHealth() {
    try {
      const siteUrl = this.config.VITE_SITE_URL || 'https://fix2.vercel.app';
      
      const response = await fetch(siteUrl, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(10000)
      });

      const healthy = response.ok;
      
      if (healthy) {
        console.log(`✅ Autopilot: Site healthy (${response.status})`);
      } else {
        console.log(`⚠️ Autopilot: Site unhealthy (${response.status})`);
      }

      return {
        healthy,
        status: response.status,
        url: siteUrl
      };
    } catch (error) {
      console.error('❌ Autopilot: Health check failed:', error.message);
      return {
        healthy: false,
        status: 0,
        error: error.message
      };
    }
  }

  /**
   * Self-heal by triggering Vercel redeploy
   */
  async selfHeal() {
    try {
      console.log('🔧 Autopilot: Triggering self-heal...');

      if (!this.config.VERCEL_TOKEN) {
        console.log('⚠️ Autopilot: Cannot self-heal - VERCEL_TOKEN not set');
        return false;
      }

      // Trigger Vercel redeploy
      await execAsync(`vercel --prod --yes --token="${this.config.VERCEL_TOKEN}"`);
      
      console.log('✅ Autopilot: Redeploy triggered');

      // Wait for deployment
      console.log('⏳ Autopilot: Waiting 60s for deployment...');
      await new Promise(resolve => setTimeout(resolve, 60000));

      // Verify recovery
      const health = await this.checkHealth();
      
      if (health.healthy) {
        console.log('✅ Autopilot: Self-heal successful!');
        return true;
      } else {
        console.log('❌ Autopilot: Self-heal failed - site still unhealthy');
        return false;
      }
    } catch (error) {
      console.error('❌ Autopilot: Self-heal failed:', error.message);
      return false;
    }
  }

  /**
   * Create GitHub issue (rate limited)
   */
  async createEscalationIssue(healthStatus) {
    try {
      // Check for recent issues (rate limiting)
      const { stdout } = await execAsync(
        `gh issue list --label "self-heal-failed" --state open --limit 1 --json createdAt`
      );
      
      const issues = JSON.parse(stdout);
      
      if (issues.length > 0) {
        const lastIssue = new Date(issues[0].createdAt);
        const hoursSince = (Date.now() - lastIssue) / (1000 * 60 * 60);
        
        if (hoursSince < 24) {
          console.log('⏭️  Autopilot: Recent escalation issue exists, skipping');
          return false;
        }
      }

      // Create issue
      const title = '🚨 Autopilot Self-Heal Failed - Manual Check Needed';
      const body = `## Self-Heal Failure Report

**Time:** ${new Date().toISOString()}
**Site:** ${healthStatus.url}

### Status

- **Health Check:** HTTP ${healthStatus.status} (unhealthy)
- **Self-Heal Action:** Triggered Vercel redeploy
- **Result:** Site still unhealthy after redeploy

### What Happened

1. ✅ Detected site was unhealthy
2. ✅ Triggered automatic Vercel redeploy
3. ⏳ Waited 60 seconds for recovery
4. ❌ Site still unhealthy after redeploy

### Next Steps

1. Check Vercel deployment logs
2. Review recent commits for breaking changes
3. Verify environment variables
4. Check for infrastructure issues

---

*This issue was created by the internal autopilot worker. Only one issue is created per 24 hours.*`;

      await execAsync(`gh issue create --title "${title}" --body "${body}" --label "autopilot,self-heal-failed,needs-attention"`);
      
      console.log('✅ Autopilot: Created escalation issue');
      return true;
    } catch (error) {
      console.error('❌ Autopilot: Failed to create issue:', error.message);
      return false;
    }
  }

  /**
   * Run health monitoring loop
   */
  async startHealthMonitoring() {
    console.log('🤖 Autopilot: Starting health monitoring (every 30 min)...');

    const runHealthCheck = async () => {
      const health = await this.checkHealth();
      
      if (!health.healthy) {
        console.log('⚠️ Autopilot: Site unhealthy, attempting self-heal...');
        
        const healed = await this.selfHeal();
        
        if (!healed) {
          console.log('❌ Autopilot: Self-heal failed, creating escalation issue...');
          await this.createEscalationIssue(health);
        }
      }
    };

    // Run immediately
    await runHealthCheck();

    // Then every 30 minutes
    this.healthCheckInterval = setInterval(runHealthCheck, 30 * 60 * 1000);
  }

  /**
   * Initialize and start the autopilot worker
   */
  async start() {
    if (this.isRunning) {
      console.log('⚠️ Autopilot: Already running');
      return;
    }

    console.log('🤖 AUTOPILOT WORKER STARTING');
    console.log('============================');

    // Load configuration
    const configLoaded = await this.loadConfig();
    if (!configLoaded) {
      console.error('❌ Autopilot: Cannot start without configuration');
      return;
    }

    // Check Vercel configuration
    await this.checkVercelConfig();

    // Sync secrets (if configured)
    if (this.config.VERCEL_TOKEN) {
      await this.syncToVercel();
    }

    // Sync to GitHub (if gh CLI available)
    await this.syncToGitHub();

    // Start health monitoring
    await this.startHealthMonitoring();

    this.isRunning = true;
    console.log('✅ Autopilot: Worker started successfully');
  }

  /**
   * Stop the autopilot worker
   */
  stop() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
    
    this.isRunning = false;
    console.log('🛑 Autopilot: Worker stopped');
  }
}

// Create singleton instance
const autopilotWorker = new AutopilotWorker();

// Auto-start in ALL environments (development, production, etc.)
autopilotWorker.start().catch(error => {
  console.error('❌ Autopilot: Failed to start:', error);
});

// Also start on module load
if (typeof window === 'undefined') {
  // Running in Node.js (server-side)
  console.log('🤖 Autopilot: Starting in server environment');
} else {
  // Running in browser
  console.log('🤖 Autopilot: Starting in browser environment');
}

export default autopilotWorker;
