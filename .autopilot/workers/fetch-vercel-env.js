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

  const browser = await puppeteer.launch({
    headless: false, // Show browser so you can log in
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Go to Vercel login
    await page.goto('https://vercel.com/login', { waitUntil: 'networkidle2' });
    
    
    // Wait for login to complete (user will be redirected to dashboard)
    await page.waitForNavigation({ 
      waitUntil: 'networkidle2',
      timeout: 120000 // 2 minutes for user to log in
    });
    
    
    // Navigate to project environment variables
    const projectUrl = `https://vercel.com/elevateforhumanity/${VERCEL_PROJECT}/settings/environment-variables`;
    await page.goto(projectUrl, { waitUntil: 'networkidle2' });
    
    
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
    
    Object.keys(envVars).forEach(key => {
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

async function createGitHubOAuthApp() {

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Go to GitHub OAuth Apps
    await page.goto('https://github.com/settings/developers', { waitUntil: 'networkidle2' });
    
    
    // Wait for page to load
    await page.waitForSelector('a[href="/settings/applications/new"]', { timeout: 60000 });
    
    
    // Click "New OAuth App"
    await page.click('a[href="/settings/applications/new"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    
    // Fill in the form
    
    await page.type('#oauth_application_name', 'Elevate Dev Studio');
    await page.type('#oauth_application_url', 'https://elevateforhumanity.org');
    await page.type('#oauth_application_callback_url', 'https://elevateforhumanity.org/api/auth/github/callback');
    
    // Submit form
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    
    
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
      
    }
    
  } catch (error) {
    console.error('❌ Error creating OAuth App:', error.message);
  } finally {
    await browser.close();
  }
}

async function syncToVercel() {
  
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
        
        try {
          execSync(
            `echo "${envVars[varName]}" | vercel env add ${varName} production`,
            { stdio: 'inherit' }
          );
        } catch (err) {
        }
      }
    }
    
    
  } catch (error) {
  }
}

// Main execution
async function main() {
  
  try {
    // Step 1: Fetch from Vercel
    await fetchVercelEnv();
    
    // Step 2: Create GitHub OAuth App
    await createGitHubOAuthApp();
    
    // Step 3: Sync back to Vercel
    await syncToVercel();
    
    
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { fetchVercelEnv, createGitHubOAuthApp, syncToVercel };
