#!/usr/bin/env node
/**
 * VERCEL TOKEN FETCHER - Puppeteer Worker
 * Automatically fetches Vercel tokens and project IDs using browser automation
 * No manual work required - fully automated
 */

import puppeteer from 'puppeteer';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

class VercelTokenFetcher {
  constructor() {
    this.browser = null;
    this.page = null;
    this.tokens = {};
    this.credentials = this.loadCredentials();
  }

  loadCredentials() {
    // Try to load from environment or config
    const creds = {
      email: process.env.VERCEL_EMAIL || process.env.GITHUB_EMAIL || '',
      password: process.env.VERCEL_PASSWORD || '',
      // Alternative: Use GitHub OAuth if available
      githubToken: process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '',
    };

    console.log('📧 Credentials status:');
    console.log(`   Email: ${creds.email ? '✅ Found' : '❌ Not set'}`);
    console.log(`   Password: ${creds.password ? '✅ Found' : '❌ Not set'}`);
    console.log(
      `   GitHub Token: ${creds.githubToken ? '✅ Found' : '❌ Not set'}`
    );

    return creds;
  }

  async init() {
    console.log('🚀 Initializing Vercel Token Fetcher...\n');

    // Check if we can use Vercel CLI instead
    if (await this.tryVercelCLI()) {
      return true;
    }

    // Otherwise use Puppeteer
    try {
      this.browser = await puppeteer.launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-software-rasterizer',
          '--disable-extensions',
        ],
        executablePath:
          process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
      });

      this.page = await this.browser.newPage();
      await this.page.setViewport({ width: 1920, height: 1080 });

      console.log('✅ Browser initialized\n');
      return true;
    } catch (error) {
      console.log('⚠️  Browser initialization failed:', error.message);
      console.log('   Falling back to alternative methods...\n');
      return false;
    }
  }

  async tryVercelCLI() {
    console.log('🔍 Checking for Vercel CLI...');

    try {
      // Check if vercel CLI is installed and authenticated
      const whoami = execSync('vercel whoami 2>&1', { encoding: 'utf-8' });

      if (!whoami.includes('Error') && !whoami.includes('not logged in')) {
        console.log('✅ Vercel CLI is authenticated\n');

        // Get token from CLI config
        const configPath = `${process.env.HOME}/.vercel/auth.json`;
        if (existsSync(configPath)) {
          const config = JSON.parse(readFileSync(configPath, 'utf-8'));
          if (config.token) {
            this.tokens.VERCEL_TOKEN = config.token;
            console.log('✅ Token extracted from Vercel CLI\n');

            // Get project info
            await this.getProjectInfoFromCLI();
            return true;
          }
        }
      }
    } catch (error) {
      console.log('⚠️  Vercel CLI not available or not authenticated\n');
    }

    return false;
  }

  async getProjectInfoFromCLI() {
    console.log('📦 Getting project information from Vercel CLI...');

    try {
      // Try to get project info from .vercel directory
      if (existsSync('.vercel/project.json')) {
        const project = JSON.parse(
          readFileSync('.vercel/project.json', 'utf-8')
        );
        this.tokens.VERCEL_PROJECT_ID = project.projectId;
        this.tokens.VERCEL_ORG_ID = project.orgId;

        console.log('✅ Project ID:', this.tokens.VERCEL_PROJECT_ID);
        console.log('✅ Org ID:', this.tokens.VERCEL_ORG_ID);
      } else {
        // Link project
        console.log('🔗 Linking project...');
        execSync('vercel link --yes', { stdio: 'inherit' });

        if (existsSync('.vercel/project.json')) {
          const project = JSON.parse(
            readFileSync('.vercel/project.json', 'utf-8')
          );
          this.tokens.VERCEL_PROJECT_ID = project.projectId;
          this.tokens.VERCEL_ORG_ID = project.orgId;

          console.log('✅ Project linked successfully');
          console.log('✅ Project ID:', this.tokens.VERCEL_PROJECT_ID);
          console.log('✅ Org ID:', this.tokens.VERCEL_ORG_ID);
        }
      }
    } catch (error) {
      console.log('⚠️  Could not get project info:', error.message);
    }
  }

  async loginWithGitHub() {
    if (!this.credentials.githubToken) {
      console.log('⚠️  No GitHub token available for OAuth login\n');
      return false;
    }

    console.log('🔐 Attempting GitHub OAuth login...');

    try {
      await this.page.goto('https://vercel.com/login', {
        waitUntil: 'networkidle2',
      });

      // Click GitHub login button
      await this.page.waitForSelector(
        'button[data-testid="login-with-github"]',
        { timeout: 5000 }
      );
      await this.page.click('button[data-testid="login-with-github"]');

      // Wait for GitHub OAuth
      await this.page.waitForNavigation({ waitUntil: 'networkidle2' });

      // If we're on GitHub, authorize
      if (this.page.url().includes('github.com')) {
        // Handle GitHub authorization
        await this.page.waitForSelector('button[name="authorize"]', {
          timeout: 5000,
        });
        await this.page.click('button[name="authorize"]');
        await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
      }

      // Check if we're logged in
      if (this.page.url().includes('vercel.com/dashboard')) {
        console.log('✅ Successfully logged in via GitHub\n');
        return true;
      }
    } catch (error) {
      console.log('⚠️  GitHub OAuth login failed:', error.message);
    }

    return false;
  }

  async loginWithEmail() {
    if (!this.credentials.email) {
      console.log('⚠️  No email credentials available\n');
      return false;
    }

    console.log('🔐 Attempting email login...');

    try {
      await this.page.goto('https://vercel.com/login', {
        waitUntil: 'networkidle2',
      });

      // Enter email
      await this.page.waitForSelector('input[name="email"]', { timeout: 5000 });
      await this.page.type('input[name="email"]', this.credentials.email);

      // Click continue
      await this.page.click('button[type="submit"]');

      console.log('📧 Email sent. Check your inbox for login link.');
      console.log('   This method requires manual email verification.\n');

      return false; // Can't fully automate email verification
    } catch (error) {
      console.log('⚠️  Email login failed:', error.message);
    }

    return false;
  }

  async fetchTokenFromDashboard() {
    if (!this.page) {
      console.log('⚠️  Browser not available\n');
      return false;
    }

    console.log('🔑 Fetching token from dashboard...');

    try {
      // Navigate to tokens page
      await this.page.goto('https://vercel.com/account/tokens', {
        waitUntil: 'networkidle2',
      });

      // Check if we need to login
      if (this.page.url().includes('/login')) {
        console.log('⚠️  Not logged in. Attempting login...\n');

        // Try GitHub OAuth first
        if (await this.loginWithGitHub()) {
          await this.page.goto('https://vercel.com/account/tokens', {
            waitUntil: 'networkidle2',
          });
        } else {
          await this.loginWithEmail();
          return false;
        }
      }

      // Create new token
      console.log('🔨 Creating new token...');

      await this.page.waitForSelector('button:has-text("Create")', {
        timeout: 5000,
      });
      await this.page.click('button:has-text("Create")');

      // Fill token details
      await this.page.waitForSelector('input[name="name"]', { timeout: 5000 });
      await this.page.type(
        'input[name="name"]',
        `Autopilot Token ${Date.now()}`
      );

      // Select scope
      await this.page.click('button:has-text("Full Account")');

      // Create token
      await this.page.click('button:has-text("Create Token")');

      // Get token value
      await this.page.waitForSelector('[data-testid="token-value"]', {
        timeout: 5000,
      });
      const tokenElement = await this.page.$('[data-testid="token-value"]');
      const token = await tokenElement.evaluate((el) => el.textContent);

      if (token) {
        this.tokens.VERCEL_TOKEN = token;
        console.log('✅ Token created successfully\n');
        return true;
      }
    } catch (error) {
      console.log('⚠️  Could not fetch token from dashboard:', error.message);
    }

    return false;
  }

  async fetchProjectInfo() {
    if (!this.page) {
      console.log('⚠️  Browser not available\n');
      return false;
    }

    console.log('📦 Fetching project information...');

    try {
      // Navigate to projects
      await this.page.goto('https://vercel.com/dashboard', {
        waitUntil: 'networkidle2',
      });

      // Look for fix2 project or create it
      const projectExists = await this.page.$('a:has-text("fix2")');

      if (projectExists) {
        await projectExists.click();
        await this.page.waitForNavigation({ waitUntil: 'networkidle2' });

        // Get project ID from URL or settings
        const url = this.page.url();
        const match = url.match(/\/([^\/]+)\/([^\/]+)/);

        if (match) {
          this.tokens.VERCEL_ORG_ID = match[1];
          this.tokens.VERCEL_PROJECT_ID = match[2];

          console.log('✅ Project ID:', this.tokens.VERCEL_PROJECT_ID);
          console.log('✅ Org ID:', this.tokens.VERCEL_ORG_ID);
          return true;
        }
      } else {
        console.log('⚠️  Project not found. Create it manually or use CLI.\n');
      }
    } catch (error) {
      console.log('⚠️  Could not fetch project info:', error.message);
    }

    return false;
  }

  async useVercelAPI() {
    console.log('🌐 Attempting to use Vercel API...');

    // If we have a token, use API to get project info
    if (this.tokens.VERCEL_TOKEN) {
      try {
        const response = await fetch('https://api.vercel.com/v9/projects', {
          headers: {
            Authorization: `Bearer ${this.tokens.VERCEL_TOKEN}`,
          },
        });

        const data = await response.json();

        // Find fix2 project
        const project = data.projects?.find(
          (p) =>
            p.name === 'fix2' ||
            p.name.includes('elevate') ||
            p.name.includes('fix')
        );

        if (project) {
          this.tokens.VERCEL_PROJECT_ID = project.id;
          this.tokens.VERCEL_ORG_ID = project.accountId;

          console.log('✅ Project found via API');
          console.log('✅ Project ID:', this.tokens.VERCEL_PROJECT_ID);
          console.log('✅ Org ID:', this.tokens.VERCEL_ORG_ID);
          return true;
        }
      } catch (error) {
        console.log('⚠️  API request failed:', error.message);
      }
    }

    return false;
  }

  async saveTokens() {
    console.log('\n💾 Saving tokens...');

    // Update .env.production
    let envContent = '';
    if (existsSync('.env.production')) {
      envContent = readFileSync('.env.production', 'utf-8');
    }

    // Update or add tokens
    const tokens = {
      VERCEL_TOKEN: this.tokens.VERCEL_TOKEN,
      VERCEL_ORG_ID: this.tokens.VERCEL_ORG_ID,
      VERCEL_PROJECT_ID: this.tokens.VERCEL_PROJECT_ID,
    };

    for (const [key, value] of Object.entries(tokens)) {
      if (value) {
        const regex = new RegExp(`^${key}=.*$`, 'm');
        if (envContent.match(regex)) {
          envContent = envContent.replace(regex, `${key}=${value}`);
        } else {
          envContent += `\n${key}=${value}`;
        }
        console.log(`  ✅ Saved ${key}`);
      }
    }

    writeFileSync('.env.production', envContent.trim() + '\n');
    writeFileSync('.env.local', envContent.trim() + '\n');

    console.log('✅ Tokens saved to .env.production and .env.local\n');
  }

  async uploadToGitHub() {
    console.log('🔐 Uploading to GitHub Secrets...');

    const secrets = {
      VERCEL_TOKEN: this.tokens.VERCEL_TOKEN,
      VERCEL_ORG_ID: this.tokens.VERCEL_ORG_ID,
      VERCEL_PROJECT_ID: this.tokens.VERCEL_PROJECT_ID,
    };

    for (const [key, value] of Object.entries(secrets)) {
      if (value && !value.includes('PLACEHOLDER')) {
        try {
          execSync(`echo "${value}" | gh secret set ${key}`, {
            stdio: 'pipe',
            encoding: 'utf-8',
          });
          console.log(`  ✅ Uploaded ${key}`);
        } catch (error) {
          console.log(
            `  ⚠️  Could not upload ${key} - gh CLI not authenticated`
          );
        }
      }
    }

    console.log('');
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async run() {
    try {
      const initialized = await this.init();

      if (!initialized) {
        console.log('⚠️  Could not initialize browser automation');
        console.log('   Using alternative methods...\n');
      }

      // Try multiple methods in order of preference
      let success = false;

      // Method 1: Vercel CLI (best)
      if (!this.tokens.VERCEL_TOKEN) {
        success = await this.tryVercelCLI();
      }

      // Method 2: Vercel API (if we have token)
      if (!success && this.tokens.VERCEL_TOKEN) {
        success = await this.useVercelAPI();
      }

      // Method 3: Browser automation (if available)
      if (!success && this.browser) {
        await this.fetchTokenFromDashboard();
        await this.fetchProjectInfo();
      }

      // Save what we have
      if (this.tokens.VERCEL_TOKEN || this.tokens.VERCEL_PROJECT_ID) {
        await this.saveTokens();
        await this.uploadToGitHub();

        console.log('✅ Vercel token fetcher completed!\n');
        console.log('📊 Results:');
        console.log(
          `   VERCEL_TOKEN: ${this.tokens.VERCEL_TOKEN ? '✅ Found' : '❌ Not found'}`
        );
        console.log(
          `   VERCEL_ORG_ID: ${this.tokens.VERCEL_ORG_ID ? '✅ Found' : '❌ Not found'}`
        );
        console.log(
          `   VERCEL_PROJECT_ID: ${this.tokens.VERCEL_PROJECT_ID ? '✅ Found' : '❌ Not found'}`
        );
      } else {
        console.log('⚠️  Could not fetch Vercel tokens automatically\n');
        console.log('📋 Manual steps required:');
        console.log('   1. Run: vercel login');
        console.log('   2. Run: vercel link');
        console.log('   3. Re-run this script\n');
        console.log('   OR');
        console.log('   1. Visit: https://vercel.com/account/tokens');
        console.log('   2. Create token manually');
        console.log('   3. Update .env.production\n');
      }
    } catch (error) {
      console.error('\n❌ Error:', error.message);
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const fetcher = new VercelTokenFetcher();
  fetcher.run().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export default VercelTokenFetcher;
