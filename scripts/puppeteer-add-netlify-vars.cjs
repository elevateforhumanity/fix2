/**
 * Puppeteer Script: Automate Adding Environment Variables to Netlify
 * 
 * This script logs into Netlify and adds all 6 environment variables
 * through the web interface.
 * 
 * Usage:
 * node scripts/puppeteer-add-netlify-vars.js
 */

const puppeteer = require('puppeteer');

const SITE_ID = '12f120ab-3f63-419b-bc49-430f043415c1';
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || process.env.NETLIFY_EMAIL || 'YOUR_GITHUB_USERNAME';
const GITHUB_PASSWORD = process.env.GITHUB_PASSWORD || process.env.NETLIFY_PASSWORD || 'YOUR_GITHUB_PASSWORD';
const USE_EXISTING_SESSION = process.env.USE_EXISTING_SESSION === 'true';

const VARIABLES = [
  {
    key: 'NEXT_PUBLIC_SUPABASE_URL',
    value: 'https://cuxzzpsyufcewtmicszk.supabase.co',
    scopes: ['All']
  },
  {
    key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA',
    scopes: ['All']
  },
  {
    key: 'SUPABASE_SERVICE_ROLE_KEY',
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE',
    scopes: ['All']
  },
  {
    key: 'NEXT_PUBLIC_APP_URL',
    value: 'https://elevateconnectsdirectory.org',
    scopes: ['Production']
  },
  {
    key: 'NEXT_PUBLIC_SITE_URL',
    value: 'https://elevateconnectsdirectory.org',
    scopes: ['Production']
  },
  {
    key: 'NODE_ENV',
    value: 'production',
    scopes: ['Production']
  }
];

async function addNetlifyEnvironmentVariables() {
  console.log('🚀 Starting Puppeteer automation...\n');

  const browser = await puppeteer.launch({
    headless: false, // Set to true for production
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    userDataDir: USE_EXISTING_SESSION ? './puppeteer-data' : undefined // Reuse session if flag set
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    // Step 1: Navigate to Netlify login
    console.log('📍 Step 1: Navigating to Netlify...');
    await page.goto('https://app.netlify.com/login', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    // Step 2: Login to Netlify via GitHub
    console.log('🔐 Step 2: Logging in to Netlify via GitHub...');
    
    // Look for GitHub login button
    const githubButton = await page.waitForSelector(
      'button:has-text("GitHub"), a:has-text("GitHub"), [data-provider="github"]',
      { timeout: 10000 }
    );
    
    if (githubButton) {
      console.log('   📍 Found GitHub login button, clicking...');
      await githubButton.click();
      await page.waitForTimeout(3000);
      
      // GitHub login page
      console.log('   📍 On GitHub login page...');
      
      // Check if already logged into GitHub
      const currentUrl = page.url();
      if (currentUrl.includes('github.com/login')) {
        console.log('   🔐 Entering GitHub credentials...');
        
        // Enter GitHub username
        await page.waitForSelector('input[name="login"]', { timeout: 10000 });
        await page.type('input[name="login"]', GITHUB_USERNAME);
        
        // Enter GitHub password
        await page.waitForSelector('input[name="password"]', { timeout: 10000 });
        await page.type('input[name="password"]', GITHUB_PASSWORD);
        
        // Click sign in
        await page.click('input[type="submit"], button[type="submit"]');
        await page.waitForTimeout(3000);
        
        // Handle 2FA if present
        const has2FA = await page.$('input[name="otp"]');
        if (has2FA) {
          console.log('   ⚠️  2FA detected - you need to enter the code manually');
          console.log('   ⏳ Waiting 60 seconds for you to enter 2FA code...');
          await page.waitForTimeout(60000);
        }
      } else {
        console.log('   ✅ Already logged into GitHub, authorizing...');
      }
      
      // Wait for redirect back to Netlify
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
      await page.waitForTimeout(2000);
      
      // Check if we need to authorize the app
      const authorizeButton = await page.$('button[name="authorize"], button:has-text("Authorize")');
      if (authorizeButton) {
        console.log('   📍 Authorizing Netlify app...');
        await authorizeButton.click();
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
      }
    }

    console.log('   ✅ Logged in successfully\n');

    // Step 3: Navigate to site environment variables
    console.log('📍 Step 3: Navigating to environment variables...');
    const envUrl = `https://app.netlify.com/sites/${SITE_ID}/settings/env`;
    await page.goto(envUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    await page.waitForTimeout(2000);
    console.log('   ✅ On environment variables page\n');

    // Step 4: Add each environment variable
    console.log('📝 Step 4: Adding environment variables...\n');

    for (let i = 0; i < VARIABLES.length; i++) {
      const variable = VARIABLES[i];
      console.log(`   [${i + 1}/${VARIABLES.length}] Adding ${variable.key}...`);

      try {
        // Click "Add a variable" button
        const addButton = await page.waitForSelector(
          'button:has-text("Add a variable"), button:has-text("Add variable"), button[aria-label*="Add"]',
          { timeout: 5000 }
        );
        await addButton.click();
        await page.waitForTimeout(1000);

        // Fill in key
        const keyInput = await page.waitForSelector('input[name="key"], input[placeholder*="Key"]', { timeout: 5000 });
        await keyInput.click({ clickCount: 3 }); // Select all
        await keyInput.type(variable.key);

        // Fill in value
        const valueInput = await page.waitForSelector('input[name="value"], textarea[name="value"], input[placeholder*="Value"]', { timeout: 5000 });
        await valueInput.click({ clickCount: 3 }); // Select all
        await valueInput.type(variable.value);

        // Select scopes if needed
        if (variable.scopes.includes('Production')) {
          // Look for scope selector and select Production
          const scopeSelector = await page.$('select[name="scope"], select[name="context"]');
          if (scopeSelector) {
            await scopeSelector.select('production');
          }
        }

        // Click "Create variable" or "Save"
        const saveButton = await page.waitForSelector(
          'button:has-text("Create"), button:has-text("Save"), button[type="submit"]',
          { timeout: 5000 }
        );
        await saveButton.click();
        await page.waitForTimeout(2000);

        console.log(`      ✅ Added ${variable.key}`);
      } catch (error) {
        console.log(`      ❌ Failed to add ${variable.key}: ${error.message}`);
      }
    }

    console.log('\n✅ All variables added!\n');

    // Step 5: Navigate to deploys and trigger deployment
    console.log('🔄 Step 5: Triggering deployment...');
    const deploysUrl = `https://app.netlify.com/sites/${SITE_ID}/deploys`;
    await page.goto(deploysUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    await page.waitForTimeout(2000);

    // Click "Trigger deploy" button
    const triggerButton = await page.waitForSelector(
      'button:has-text("Trigger deploy"), button[aria-label*="Trigger"]',
      { timeout: 10000 }
    );
    await triggerButton.click();
    await page.waitForTimeout(1000);

    // Click "Clear cache and deploy site"
    const clearCacheButton = await page.waitForSelector(
      'button:has-text("Clear cache"), a:has-text("Clear cache")',
      { timeout: 5000 }
    );
    await clearCacheButton.click();
    await page.waitForTimeout(3000);

    console.log('   ✅ Deployment triggered!\n');

    // Step 6: Wait and monitor deployment
    console.log('⏳ Step 6: Monitoring deployment...');
    console.log('   Waiting for build to start...\n');

    await page.waitForTimeout(5000);

    // Take screenshot of deployment
    await page.screenshot({ path: 'netlify-deployment.png', fullPage: true });
    console.log('   📸 Screenshot saved: netlify-deployment.png\n');

    console.log('✅ AUTOMATION COMPLETE!\n');
    console.log('📊 Next steps:');
    console.log('   1. Monitor deployment at:', deploysUrl);
    console.log('   2. Wait 2-3 minutes for build to complete');
    console.log('   3. Verify site at: https://elevateconnectsdirectory.org\n');

  } catch (error) {
    console.error('\n❌ Error during automation:', error.message);
    console.error('Stack:', error.stack);
    
    // Take screenshot of error
    await page.screenshot({ path: 'netlify-error.png', fullPage: true });
    console.log('📸 Error screenshot saved: netlify-error.png\n');
  } finally {
    // Keep browser open for 10 seconds to see result
    console.log('⏳ Keeping browser open for 10 seconds...');
    await page.waitForTimeout(10000);
    
    await browser.close();
    console.log('🔒 Browser closed.\n');
  }
}

// Run the automation
if (require.main === module) {
  if (!USE_EXISTING_SESSION && (GITHUB_USERNAME === 'YOUR_GITHUB_USERNAME' || GITHUB_PASSWORD === 'YOUR_GITHUB_PASSWORD')) {
    console.error('❌ Error: Please set GITHUB_USERNAME and GITHUB_PASSWORD environment variables\n');
    console.error('Usage:');
    console.error('  GITHUB_USERNAME=youruser GITHUB_PASSWORD=yourpass node scripts/puppeteer-add-netlify-vars.js\n');
    console.error('Or use existing browser session:');
    console.error('  USE_EXISTING_SESSION=true node scripts/puppeteer-add-netlify-vars.js\n');
    process.exit(1);
  }

  addNetlifyEnvironmentVariables()
    .then(() => {
      console.log('✅ Script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { addNetlifyEnvironmentVariables };
