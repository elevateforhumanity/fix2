#!/usr/bin/env node

/**
 * Puppeteer Autopilot - Durable.co Integration Worker
 * Automatically adds bridge integration code to Durable.co site
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const DURABLE_EMAIL = process.env.DURABLE_EMAIL;
const DURABLE_PASSWORD = process.env.DURABLE_PASSWORD;
const DURABLE_SITE_URL = 'https://www.elevateforhumanity.org';
const BRIDGE_SCRIPT_URL = 'https://elevateforhumanityfix2.netlify.app/efh-bridge.js';

// Bridge integration code
const BRIDGE_SCRIPT = `<script
  src="${BRIDGE_SCRIPT_URL}"
  data-efh-org="elevate-for-humanity"
  data-env="prod"
  defer
></script>`;

const CONTENT_SLOTS = `<!-- EFH Bridge Content Slots -->
<div data-efh-slot="hero"></div>
<div data-efh-slot="programs"></div>
<div data-efh-slot="features"></div>
<div data-efh-slot="testimonials"></div>
<div data-efh-slot="cta"></div>`;

async function integrateDurableBridge() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🤖 Puppeteer Autopilot - Durable.co Integration');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  // Validate credentials
  if (!DURABLE_EMAIL || !DURABLE_PASSWORD) {
    console.error('❌ Missing Durable credentials');
    console.log('');
    console.log('Please set environment variables:');
    console.log('  export DURABLE_EMAIL=your-email@example.com');
    console.log('  export DURABLE_PASSWORD=your-password');
    console.log('');
    console.log('Or add to GitHub Secrets:');
    console.log('  DURABLE_EMAIL');
    console.log('  DURABLE_PASSWORD');
    console.log('');
    process.exit(1);
  }

  console.log('✅ Credentials loaded');
  console.log(`   Email: ${DURABLE_EMAIL}`);
  console.log('');

  let browser;
  let success = false;

  try {
    console.log('🚀 Launching browser...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('✅ Browser launched');
    console.log('');

    // Step 1: Navigate to Durable login
    console.log('📍 Step 1: Navigating to Durable.co...');
    await page.goto('https://durable.co/login', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    console.log('✅ Loaded Durable login page');
    console.log('');

    // Step 2: Login
    console.log('🔐 Step 2: Logging in...');
    
    // Wait for email input
    await page.waitForSelector('input[type="email"], input[name="email"]', { timeout: 10000 });
    await page.type('input[type="email"], input[name="email"]', DURABLE_EMAIL);
    
    // Wait for password input
    await page.waitForSelector('input[type="password"], input[name="password"]', { timeout: 10000 });
    await page.type('input[type="password"], input[name="password"]', DURABLE_PASSWORD);
    
    // Click login button
    await page.click('button[type="submit"]');
    
    // Wait for navigation
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 });
    
    console.log('✅ Logged in successfully');
    console.log('');

    // Step 3: Navigate to site settings
    console.log('⚙️  Step 3: Opening site settings...');
    
    // Try to find and click settings
    const settingsSelectors = [
      'a[href*="settings"]',
      'button:has-text("Settings")',
      '[data-testid="settings"]',
      '.settings-link'
    ];

    let settingsFound = false;
    for (const selector of settingsSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 5000 });
        await page.click(selector);
        settingsFound = true;
        break;
      } catch (e) {
        continue;
      }
    }

    if (!settingsFound) {
      console.log('⚠️  Could not find settings link automatically');
      console.log('   Trying direct URL...');
      await page.goto('https://durable.co/sites/settings', { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
    }

    console.log('✅ Opened settings');
    console.log('');

    // Step 4: Find Custom Code section
    console.log('📝 Step 4: Finding Custom Code section...');
    
    const customCodeSelectors = [
      'button:has-text("Custom Code")',
      'a:has-text("Custom Code")',
      '[data-testid="custom-code"]',
      '.custom-code-section'
    ];

    let customCodeFound = false;
    for (const selector of customCodeSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 5000 });
        await page.click(selector);
        customCodeFound = true;
        break;
      } catch (e) {
        continue;
      }
    }

    if (!customCodeFound) {
      console.log('⚠️  Could not find Custom Code section automatically');
      console.log('   This may require manual intervention');
    } else {
      console.log('✅ Found Custom Code section');
    }
    console.log('');

    // Step 5: Add bridge script to head
    console.log('🔧 Step 5: Adding bridge script to head section...');
    
    const headCodeSelectors = [
      'textarea[name="head"]',
      'textarea[placeholder*="head"]',
      '[data-testid="head-code"]',
      '.head-code-editor'
    ];

    let headCodeFound = false;
    for (const selector of headCodeSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 5000 });
        
        // Get existing content
        const existingCode = await page.$eval(selector, el => el.value);
        
        // Check if bridge script already exists
        if (existingCode.includes(BRIDGE_SCRIPT_URL)) {
          console.log('✅ Bridge script already exists in head section');
          headCodeFound = true;
          break;
        }
        
        // Add bridge script
        const newCode = existingCode + '\n\n' + BRIDGE_SCRIPT;
        await page.$eval(selector, (el, code) => { el.value = code; }, newCode);
        
        console.log('✅ Added bridge script to head section');
        headCodeFound = true;
        break;
      } catch (e) {
        continue;
      }
    }

    if (!headCodeFound) {
      console.log('⚠️  Could not add bridge script automatically');
      console.log('   Manual intervention may be required');
    }
    console.log('');

    // Step 6: Save changes
    console.log('💾 Step 6: Saving changes...');
    
    const saveSelectors = [
      'button:has-text("Save")',
      'button[type="submit"]',
      '[data-testid="save-button"]',
      '.save-button'
    ];

    let saved = false;
    for (const selector of saveSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 5000 });
        await page.click(selector);
        
        // Wait for save confirmation
        await page.waitForTimeout(2000);
        
        console.log('✅ Changes saved');
        saved = true;
        break;
      } catch (e) {
        continue;
      }
    }

    if (!saved) {
      console.log('⚠️  Could not save automatically');
      console.log('   Please save manually in Durable dashboard');
    }
    console.log('');

    // Step 7: Verify integration
    console.log('🔍 Step 7: Verifying integration...');
    
    await page.goto(DURABLE_SITE_URL, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    // Check if bridge script is loaded
    const bridgeLoaded = await page.evaluate((url) => {
      const scripts = Array.from(document.querySelectorAll('script'));
      return scripts.some(script => script.src.includes(url));
    }, BRIDGE_SCRIPT_URL);

    if (bridgeLoaded) {
      console.log('✅ Bridge script is loaded on site');
      success = true;
    } else {
      console.log('⚠️  Bridge script not detected on site');
      console.log('   It may take a few minutes to propagate');
    }
    console.log('');

    // Take screenshot
    const screenshotPath = path.join(__dirname, '../logs/durable-integration-screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot saved: ${screenshotPath}`);
    console.log('');

  } catch (error) {
    console.error('❌ Error during integration:', error.message);
    console.log('');
    console.log('Stack trace:');
    console.log(error.stack);
    console.log('');
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 Browser closed');
      console.log('');
    }
  }

  // Summary
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  if (success) {
    console.log('✅ INTEGRATION SUCCESSFUL');
    console.log('');
    console.log('Bridge is now integrated with Durable.co!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Add content slots to your Durable pages');
    console.log('2. Verify content appears on site');
    console.log('3. Enjoy automatic updates!');
  } else {
    console.log('⚠️  INTEGRATION INCOMPLETE');
    console.log('');
    console.log('Some steps may require manual intervention.');
    console.log('');
    console.log('Manual steps:');
    console.log('1. Log into Durable.co');
    console.log('2. Go to Settings → Custom Code');
    console.log('3. Add bridge script to head section:');
    console.log('');
    console.log(BRIDGE_SCRIPT);
    console.log('');
    console.log('4. Add content slots to pages:');
    console.log('');
    console.log(CONTENT_SLOTS);
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  // Create status file
  const status = {
    timestamp: new Date().toISOString(),
    success: success,
    bridge_url: BRIDGE_SCRIPT_URL,
    site_url: DURABLE_SITE_URL,
    email: DURABLE_EMAIL
  };

  const statusPath = path.join(__dirname, '../logs/durable-integration-status.json');
  fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
  console.log(`📝 Status saved: ${statusPath}`);
  console.log('');

  process.exit(success ? 0 : 1);
}

// Run the integration
integrateDurableBridge().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
