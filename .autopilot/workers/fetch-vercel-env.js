#!/usr/bin/env node

/**
 * Elevate Dev Studio - Vercel Environment Fetcher
 * Uses Puppeteer to automatically fetch environment variables from Vercel
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const VERCEL_PROJECT = 'fix2'; // Your Vercel project name
const ENV_FILE = path.join(process.cwd(), '.env.local');

async function fetchVercelEnv() {
  console.log('🚀 Starting Vercel Environment Fetcher...\n');

  const browser = await puppeteer.launch({
    headless: false, // Show browser so you can log in
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Go to Vercel login
    console.log('📱 Opening Vercel login page...');
    await page.goto('https://vercel.com/login', { waitUntil: 'networkidle2' });
    
    console.log('⏳ Please log in to Vercel in the browser window...');
    console.log('   (Waiting for you to complete login...)\n');
    
    // Wait for login to complete (user will be redirected to dashboard)
    await page.waitForNavigation({ 
      waitUntil: 'networkidle2',
      timeout: 120000 // 2 minutes for user to log in
    });
    
    console.log('✅ Login successful!\n');
    
    // Navigate to project environment variables
    console.log(`📂 Navigating to project: ${VERCEL_PROJECT}...`);
    const projectUrl = `https://vercel.com/elevateforhumanity/${VERCEL_PROJECT}/settings/environment-variables`;
    await page.goto(projectUrl, { waitUntil: 'networkidle2' });
    
    console.log('📋 Fetching environment variables...\n');
    
    // Extract environment variables from the page
    const envVars = await page.evaluate(() => {
      const vars = {};
      
      // Vercel's environment variable rows
      const rows = document.querySelectorAll('[data-testid="env-var-row"]');
      
      rows.forEach(row => {
        const nameEl = row.querySelector('[data-testid="env-var-name"]');
        const valueEl = row.querySelector('[data-testid="env-var-value"]');
        
        if (nameEl && valueEl) {
          const name = nameEl.textContent.trim();
          const value = valueEl.textContent.trim();
          
          // Only get non-sensitive preview (Vercel hides full values)
          if (value && value !== '•••••••••') {
            vars[name] = value;
          }
        }
      });
      
      return vars;
    });
    
    console.log(`Found ${Object.keys(envVars).length} environment variables\n`);
    
    // Read existing .env.local
    let existingEnv = {};
    if (fs.existsSync(ENV_FILE)) {
      const content = fs.readFileSync(ENV_FILE, 'utf8');
      content.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          existingEnv[match[1]] = match[2];
        }
      });
    }
    
    // Merge with existing
    const mergedEnv = { ...existingEnv, ...envVars };
    
    // Write back to .env.local
    const envContent = Object.entries(mergedEnv)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    
    fs.writeFileSync(ENV_FILE, envContent + '\n');
    
    console.log('✅ Environment variables updated in .env.local\n');
    console.log('Variables fetched:');
    Object.keys(envVars).forEach(key => {
      console.log(`  ✓ ${key}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

async function createGitHubOAuthApp() {
  console.log('\n🔧 Creating GitHub OAuth App...\n');

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Go to GitHub OAuth Apps
    console.log('📱 Opening GitHub Developer Settings...');
    await page.goto('https://github.com/settings/developers', { waitUntil: 'networkidle2' });
    
    console.log('⏳ Please log in to GitHub if needed...\n');
    
    // Wait for page to load
    await page.waitForSelector('a[href="/settings/applications/new"]', { timeout: 60000 });
    
    console.log('✅ Logged in to GitHub\n');
    
    // Click "New OAuth App"
    console.log('🆕 Creating new OAuth App...');
    await page.click('a[href="/settings/applications/new"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    
    // Fill in the form
    console.log('📝 Filling in OAuth App details...');
    
    await page.type('#oauth_application_name', 'Elevate Dev Studio');
    await page.type('#oauth_application_url', 'https://elevateforhumanity.org');
    await page.type('#oauth_application_callback_url', 'https://elevateforhumanity.org/api/auth/github/callback');
    
    // Submit form
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    
    console.log('✅ OAuth App created!\n');
    
    // Extract Client ID and Secret
    const credentials = await page.evaluate(() => {
      const clientIdEl = document.querySelector('[data-testid="client-id"]');
      const clientSecretEl = document.querySelector('[data-testid="client-secret"]');
      
      return {
        clientId: clientIdEl ? clientIdEl.textContent.trim() : null,
        clientSecret: clientSecretEl ? clientSecretEl.textContent.trim() : null
      };
    });
    
    if (credentials.clientId) {
      console.log('📋 OAuth Credentials:');
      console.log(`   Client ID: ${credentials.clientId}`);
      
      // Update .env.local
      let envContent = fs.readFileSync(ENV_FILE, 'utf8');
      
      if (!envContent.includes('GITHUB_OAUTH_CLIENT_ID=')) {
        envContent += `\nGITHUB_OAUTH_CLIENT_ID=${credentials.clientId}\n`;
      } else {
        envContent = envContent.replace(
          /GITHUB_OAUTH_CLIENT_ID=.*/,
          `GITHUB_OAUTH_CLIENT_ID=${credentials.clientId}`
        );
      }
      
      if (credentials.clientSecret && !envContent.includes('GITHUB_OAUTH_CLIENT_SECRET=')) {
        envContent += `GITHUB_OAUTH_CLIENT_SECRET=${credentials.clientSecret}\n`;
      }
      
      fs.writeFileSync(ENV_FILE, envContent);
      
      console.log('\n✅ GitHub OAuth credentials saved to .env.local\n');
    }
    
  } catch (error) {
    console.error('❌ Error creating OAuth App:', error.message);
    console.log('\n💡 You can create it manually at: https://github.com/settings/developers\n');
  } finally {
    await browser.close();
  }
}

async function syncToVercel() {
  console.log('\n🔄 Syncing environment variables to Vercel...\n');
  
  const { execSync } = require('child_process');
  
  try {
    // Check if vercel CLI is installed
    execSync('vercel --version', { stdio: 'ignore' });
    
    // Read .env.local
    const envContent = fs.readFileSync(ENV_FILE, 'utf8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        envVars[match[1]] = match[2];
      }
    });
    
    // Push GitHub OAuth vars to Vercel
    const githubVars = [
      'GITHUB_OAUTH_CLIENT_ID',
      'GITHUB_OAUTH_CLIENT_SECRET',
      'GITHUB_APP_ID',
      'GITHUB_APP_PRIVATE_KEY'
    ];
    
    for (const varName of githubVars) {
      if (envVars[varName]) {
        console.log(`📤 Pushing ${varName} to Vercel...`);
        
        try {
          execSync(
            `echo "${envVars[varName]}" | vercel env add ${varName} production`,
            { stdio: 'inherit' }
          );
          console.log(`   ✅ ${varName} synced\n`);
        } catch (err) {
          console.log(`   ⚠️  ${varName} may already exist or failed to sync\n`);
        }
      }
    }
    
    console.log('✅ Sync to Vercel complete!\n');
    
  } catch (error) {
    console.log('⚠️  Vercel CLI not found. Install with: npm i -g vercel\n');
    console.log('   Or manually add variables at: https://vercel.com/elevateforhumanity/fix2/settings/environment-variables\n');
  }
}

// Main execution
async function main() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║   Elevate Dev Studio - Environment Setup Autopilot    ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');
  
  try {
    // Step 1: Fetch from Vercel
    await fetchVercelEnv();
    
    // Step 2: Create GitHub OAuth App
    await createGitHubOAuthApp();
    
    // Step 3: Sync back to Vercel
    await syncToVercel();
    
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║              ✅ Setup Complete!                        ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');
    
    console.log('Next steps:');
    console.log('1. Restart your dev server: npm run dev');
    console.log('2. Access Dev Studio at: /admin/dev-studio');
    console.log('3. Log in with GitHub to start coding!\n');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.log('\n💡 You can set up manually by running:');
    console.log('   ./.autopilot/setup-dev-studio-env.sh\n');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { fetchVercelEnv, createGitHubOAuthApp, syncToVercel };
