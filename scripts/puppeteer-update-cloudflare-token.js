#!/usr/bin/env node

/**
 * Puppeteer Autopilot - Update Cloudflare API Token
 * Automatically updates/creates Cloudflare API token with correct permissions
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const CLOUDFLARE_EMAIL = process.env.CLOUDFLARE_EMAIL;
const CLOUDFLARE_PASSWORD = process.env.CLOUDFLARE_PASSWORD;
const EXISTING_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const TOKEN_NAME = 'EFH Autopilot Durable Objects';

// Required permissions
const REQUIRED_PERMISSIONS = {
  Account: {
    'Account Settings': 'Read',
  },
  User: {
    'User Details': 'Read',
  },
  Zone: {
    'Workers Routes': 'Edit',
  },
  Account: {
    'Workers Scripts': 'Edit',
    'Workers KV Storage': 'Edit',
  },
};

async function updateCloudflareToken() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🤖 Puppeteer Autopilot - Update Cloudflare Token');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  // Validate credentials
  if (!CLOUDFLARE_EMAIL || !CLOUDFLARE_PASSWORD) {
    console.error('❌ Missing Cloudflare credentials');
    console.log('');
    console.log('Please set environment variables:');
    console.log('  export CLOUDFLARE_EMAIL=your-email@example.com');
    console.log('  export CLOUDFLARE_PASSWORD=your-password');
    console.log('');
    process.exit(1);
  }

  console.log('✅ Credentials loaded');
  console.log(`   Email: ${CLOUDFLARE_EMAIL}`);
  if (EXISTING_TOKEN) {
    console.log(`   Existing token: ${EXISTING_TOKEN.substring(0, 10)}...`);
  }
  console.log('');

  let browser;
  let token = null;

  try {
    // Launch browser
    console.log('[1/10] Launching browser...');
    browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1400,900',
      ],
      defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });

    // Enable request interception for better debugging
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        request.resourceType() === 'image' ||
        request.resourceType() === 'font'
      ) {
        request.abort(); // Speed up by blocking images/fonts
      } else {
        request.continue();
      }
    });

    // Log console messages from the page
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.log('   Browser error:', msg.text());
      }
    });

    console.log('✅ Browser launched');
    console.log('');

    // Navigate to Cloudflare login
    console.log('[2/10] Navigating to Cloudflare login...');
    await page.goto('https://dash.cloudflare.com/login', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    console.log('✅ Login page loaded');
    console.log('');

    // Fill in login form
    console.log('[3/10] Logging in...');
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });

    // Clear and type email
    const emailInput = await page.$('input[type="email"]');
    await emailInput.click({ clickCount: 3 });
    await emailInput.type(CLOUDFLARE_EMAIL, { delay: 50 });
    console.log('   ✓ Email entered');
    await page.waitForTimeout(500);

    // Clear and type password
    const passwordInput = await page.$('input[type="password"]');
    await passwordInput.click({ clickCount: 3 });
    await passwordInput.type(CLOUDFLARE_PASSWORD, { delay: 50 });
    console.log('   ✓ Password entered');
    await page.waitForTimeout(500);

    // Take screenshot before login
    await page.screenshot({ path: 'cloudflare-login.png' });
    console.log('   📸 Screenshot: cloudflare-login.png');

    // Click login button
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }),
        page.click('button[type="submit"]'),
      ]);
      console.log('✅ Logged in successfully');
    } catch (error) {
      console.log('⚠️  Login navigation timeout, checking if logged in...');
      await page.waitForTimeout(3000);
      const currentUrl = page.url();
      if (!currentUrl.includes('login')) {
        console.log('✅ Login successful (detected by URL change)');
      } else {
        throw new Error('Login failed - still on login page');
      }
    }
    console.log('');

    // Check for 2FA
    console.log('[4/10] Checking for 2FA...');
    await page.waitForTimeout(3000);

    let url = page.url();
    let waitTime = 0;
    const maxWaitTime = 120; // 2 minutes max

    while (
      (url.includes('2fa') ||
        url.includes('verify') ||
        url.includes('challenge') ||
        url.includes('turnstile')) &&
      waitTime < maxWaitTime
    ) {
      if (waitTime === 0) {
        console.log('⚠️  2FA/Challenge detected');
        console.log('   Please complete verification manually in the browser');
        await page.screenshot({ path: 'cloudflare-2fa.png' });
        console.log('   📸 Screenshot: cloudflare-2fa.png');
        console.log('');
        console.log('   Waiting for you to complete 2FA...');
      }

      await page.waitForTimeout(5000);
      waitTime += 5;
      url = page.url();

      if (waitTime % 15 === 0) {
        console.log(`   ⏳ Still waiting... (${waitTime}s elapsed)`);
      }
    }

    if (
      url.includes('2fa') ||
      url.includes('verify') ||
      url.includes('challenge')
    ) {
      throw new Error('2FA timeout - please complete verification faster');
    }

    console.log('✅ Authentication complete');
    console.log('');

    // Navigate to API tokens page
    console.log('[5/10] Navigating to API tokens page...');
    await page.goto('https://dash.cloudflare.com/profile/api-tokens', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    await page.waitForTimeout(2000);
    console.log('✅ API tokens page loaded');
    console.log('');

    // Check if token already exists
    console.log('[6/10] Checking for existing token...');
    await page.screenshot({ path: 'cloudflare-tokens-list.png' });
    console.log('   📸 Screenshot: cloudflare-tokens-list.png');

    const existingTokens = await page.evaluate((tokenName) => {
      const rows = Array.from(
        document.querySelectorAll('tr, [role="row"], div[class*="token"]')
      );
      const found = [];
      rows.forEach((row, index) => {
        if (row.textContent.includes(tokenName)) {
          found.push({ index, text: row.textContent.substring(0, 100) });
        }
      });
      return found;
    }, TOKEN_NAME);

    if (existingTokens.length > 0) {
      console.log(
        `⚠️  Found ${existingTokens.length} existing token(s) with name "${TOKEN_NAME}"`
      );
      console.log('   Deleting old token(s)...');

      for (const token of existingTokens) {
        console.log(`   Deleting token #${token.index}...`);

        // Find and click delete button
        const deleted = await page.evaluate((tokenName) => {
          const rows = Array.from(
            document.querySelectorAll('tr, [role="row"]')
          );
          const tokenRow = rows.find((row) =>
            row.textContent.includes(tokenName)
          );
          if (tokenRow) {
            // Try multiple selectors for delete button
            const deleteSelectors = [
              'button[aria-label*="Delete"]',
              'button[aria-label*="delete"]',
              'button[title*="Delete"]',
              'button[title*="delete"]',
              'button:has-text("Delete")',
              '[role="button"]:has-text("Delete")',
            ];

            for (const selector of deleteSelectors) {
              const deleteButton = tokenRow.querySelector(selector);
              if (deleteButton) {
                deleteButton.click();
                return true;
              }
            }

            // Try finding by icon or class
            const buttons = tokenRow.querySelectorAll('button');
            for (const btn of buttons) {
              if (
                btn.innerHTML.includes('trash') ||
                btn.innerHTML.includes('delete')
              ) {
                btn.click();
                return true;
              }
            }
          }
          return false;
        }, TOKEN_NAME);

        if (deleted) {
          await page.waitForTimeout(1500);

          // Confirm deletion
          const confirmed = await page.evaluate(() => {
            const confirmSelectors = [
              'button:has-text("Delete")',
              'button:has-text("Confirm")',
              'button:has-text("Yes")',
              'button[class*="danger"]',
              'button[class*="destructive"]',
            ];

            for (const selector of confirmSelectors) {
              const buttons = Array.from(document.querySelectorAll('button'));
              const confirmBtn = buttons.find(
                (btn) =>
                  btn.textContent.includes('Delete') ||
                  btn.textContent.includes('Confirm') ||
                  btn.textContent.includes('Yes')
              );
              if (confirmBtn) {
                confirmBtn.click();
                return true;
              }
            }
            return false;
          });

          if (confirmed) {
            await page.waitForTimeout(2000);
            console.log('   ✓ Token deleted');
          } else {
            console.log('   ⚠️  Could not confirm deletion');
          }
        } else {
          console.log('   ⚠️  Could not find delete button');
        }
      }

      console.log('✅ Old token(s) removed');
    } else {
      console.log('✅ No existing token found');
    }
    console.log('');

    // Click "Create Token" button
    console.log('[7/10] Creating new token...');
    await page.waitForTimeout(2000);

    // Reload page to ensure clean state
    await page.reload({ waitUntil: 'networkidle2' });
    await page.waitForTimeout(2000);

    await page.screenshot({ path: 'cloudflare-before-create.png' });
    console.log('   📸 Screenshot: cloudflare-before-create.png');

    // Try multiple methods to click Create Token
    let createTokenClicked = false;

    // Method 1: Direct selector
    try {
      const createBtn = await page.$(
        'button:has-text("Create Token"), a:has-text("Create Token")'
      );
      if (createBtn) {
        await createBtn.click();
        createTokenClicked = true;
        console.log('   ✓ Clicked via selector');
      }
    } catch (e) {}

    // Method 2: Evaluate and click
    if (!createTokenClicked) {
      createTokenClicked = await page.evaluate(() => {
        const buttons = Array.from(
          document.querySelectorAll('button, a, [role="button"]')
        );
        const createBtn = buttons.find((btn) => {
          const text = btn.textContent.toLowerCase();
          return (
            text.includes('create token') || text.includes('create api token')
          );
        });
        if (createBtn) {
          createBtn.click();
          return true;
        }
        return false;
      });
      if (createTokenClicked) {
        console.log('   ✓ Clicked via evaluate');
      }
    }

    // Method 3: XPath
    if (!createTokenClicked) {
      try {
        const [button] = await page.$x(
          "//button[contains(text(), 'Create Token')] | //a[contains(text(), 'Create Token')]"
        );
        if (button) {
          await button.click();
          createTokenClicked = true;
          console.log('   ✓ Clicked via XPath');
        }
      } catch (e) {}
    }

    if (!createTokenClicked) {
      await page.screenshot({ path: 'cloudflare-create-token-error.png' });
      throw new Error(
        'Could not find Create Token button - check cloudflare-create-token-error.png'
      );
    }

    await page.waitForTimeout(4000);
    await page.screenshot({ path: 'cloudflare-token-templates.png' });
    console.log('   📸 Screenshot: cloudflare-token-templates.png');
    console.log('✅ Token creation page loaded');
    console.log('');

    // Look for "Edit Cloudflare Workers" template
    console.log('[8/10] Selecting Workers template...');

    let templateClicked = false;

    // Method 1: Look for Workers template button
    templateClicked = await page.evaluate(() => {
      const elements = Array.from(
        document.querySelectorAll(
          'button, a, div[role="button"], [class*="template"]'
        )
      );
      const workerTemplate = elements.find((el) => {
        const text = el.textContent.toLowerCase();
        return (
          text.includes('edit cloudflare workers') ||
          (text.includes('workers') && text.includes('edit'))
        );
      });
      if (workerTemplate) {
        // Find the actual clickable button within or near this element
        const clickable =
          workerTemplate.querySelector('button, a') || workerTemplate;
        clickable.click();
        return true;
      }
      return false;
    });

    if (templateClicked) {
      await page.waitForTimeout(3000);
      console.log('✅ Workers template selected');
      await page.screenshot({ path: 'cloudflare-workers-template.png' });
      console.log('   📸 Screenshot: cloudflare-workers-template.png');
    } else {
      console.log('⚠️  Workers template not found, using custom token');

      // Try to find and click "Use template" or "Get started" on Workers template
      const useTemplateClicked = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, a'));

        // First, find any element mentioning Workers
        const workerSection = Array.from(
          document.querySelectorAll('div, section')
        ).find(
          (el) =>
            el.textContent.includes('Edit Cloudflare Workers') ||
            el.textContent.includes('Workers Scripts')
        );

        if (workerSection) {
          // Look for "Use template" or similar button within that section
          const useBtn = workerSection.querySelector('button, a');
          if (useBtn) {
            useBtn.click();
            return true;
          }
        }

        // Fallback: Click custom token
        const customBtn = buttons.find((btn) => {
          const text = btn.textContent.toLowerCase();
          return (
            text.includes('custom token') || text.includes('create custom')
          );
        });
        if (customBtn) {
          customBtn.click();
          return true;
        }

        return false;
      });

      await page.waitForTimeout(3000);

      if (useTemplateClicked) {
        console.log('✅ Template/Custom token selected');
      } else {
        console.log('⚠️  Proceeding with manual configuration');
      }

      await page.screenshot({ path: 'cloudflare-custom-token.png' });
      console.log('   📸 Screenshot: cloudflare-custom-token.png');
    }
    console.log('');

    // Fill in token name
    console.log('[9/10] Configuring token...');

    // Wait for form to load
    await page.waitForTimeout(2000);

    // Find and fill token name
    const nameInputFilled = await page.evaluate((tokenName) => {
      const inputs = Array.from(document.querySelectorAll('input'));
      const nameInput = inputs.find((input) => {
        const placeholder = (input.placeholder || '').toLowerCase();
        const name = (input.name || '').toLowerCase();
        const label = input.labels?.[0]?.textContent?.toLowerCase() || '';
        return (
          placeholder.includes('token name') ||
          placeholder.includes('name') ||
          name.includes('name') ||
          label.includes('token name')
        );
      });

      if (nameInput) {
        nameInput.value = '';
        nameInput.focus();
        nameInput.value = tokenName;
        nameInput.dispatchEvent(new Event('input', { bubbles: true }));
        nameInput.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
      return false;
    }, TOKEN_NAME);

    if (nameInputFilled) {
      console.log(`   ✓ Token name set: ${TOKEN_NAME}`);
    } else {
      console.log(
        '   ⚠️  Could not auto-fill token name, please enter manually'
      );
    }

    await page.waitForTimeout(2000);

    // Screenshot for debugging
    await page.screenshot({
      path: 'cloudflare-token-config.png',
      fullPage: true,
    });
    console.log('   📸 Screenshot: cloudflare-token-config.png');
    console.log('');

    // Check if permissions are already set (from template)
    const permissionsSet = await page.evaluate(() => {
      const text = document.body.textContent.toLowerCase();
      return text.includes('workers scripts') && text.includes('edit');
    });

    if (permissionsSet) {
      console.log('✅ Permissions appear to be set from template');
      console.log('   Verifying in browser for 15 seconds...');
      await page.waitForTimeout(15000);
    } else {
      console.log('⚠️  Please configure permissions manually in the browser:');
      console.log('');
      console.log('   Required permissions:');
      console.log('   ┌─────────────────────────────────────┐');
      console.log('   │ Account Settings: Read              │');
      console.log('   │ Workers Scripts: Edit               │');
      console.log('   │ Workers KV Storage: Edit            │');
      console.log('   │ Workers Routes: Edit                │');
      console.log('   └─────────────────────────────────────┘');
      console.log('');
      console.log('   Waiting 60 seconds for manual configuration...');

      // Check every 10 seconds if user has progressed
      for (let i = 0; i < 6; i++) {
        await page.waitForTimeout(10000);
        const url = page.url();
        if (url.includes('summary') || url.includes('review')) {
          console.log('   ✓ Detected progress to summary page');
          break;
        }
        if (i < 5) {
          console.log(`   ⏳ ${(i + 1) * 10}s elapsed...`);
        }
      }
    }

    console.log('');
    console.log('[9.5/10] Proceeding to create token...');

    // Continue to summary
    let continueClicked = false;

    // Try multiple times to find continue button
    for (let attempt = 0; attempt < 3; attempt++) {
      continueClicked = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const continueBtn = buttons.find((btn) => {
          const text = btn.textContent.toLowerCase();
          return (
            text.includes('continue') ||
            text.includes('summary') ||
            text.includes('next') ||
            text.includes('review')
          );
        });
        if (continueBtn && !continueBtn.disabled) {
          continueBtn.click();
          return true;
        }
        return false;
      });

      if (continueClicked) {
        console.log('   ✓ Clicked continue button');
        await page.waitForTimeout(3000);
        break;
      }

      if (attempt < 2) {
        console.log(
          `   ⏳ Attempt ${attempt + 1}/3 - Continue button not ready, waiting...`
        );
        await page.waitForTimeout(2000);
      }
    }

    if (!continueClicked) {
      console.log(
        '   ⚠️  Could not find continue button, checking if already on summary...'
      );
      const url = page.url();
      if (!url.includes('summary') && !url.includes('review')) {
        console.log('   ⚠️  Please click Continue/Next button manually');
        await page.waitForTimeout(15000);
      }
    }

    await page.screenshot({
      path: 'cloudflare-token-summary.png',
      fullPage: true,
    });
    console.log('   📸 Screenshot: cloudflare-token-summary.png');

    // Create token
    console.log('   Looking for Create Token button...');
    let createClicked = false;

    for (let attempt = 0; attempt < 3; attempt++) {
      createClicked = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const createBtn = buttons.find((btn) => {
          const text = btn.textContent.toLowerCase();
          return (
            text.includes('create token') || text.includes('create api token')
          );
        });
        if (createBtn && !createBtn.disabled) {
          createBtn.click();
          return true;
        }
        return false;
      });

      if (createClicked) {
        console.log('   ✓ Clicked Create Token button');
        await page.waitForTimeout(5000);
        break;
      }

      if (attempt < 2) {
        console.log(
          `   ⏳ Attempt ${attempt + 1}/3 - Create button not ready, waiting...`
        );
        await page.waitForTimeout(2000);
      }
    }

    if (!createClicked) {
      console.log('   ⚠️  Could not find Create Token button');
      console.log('   Please click it manually in the browser');
      await page.waitForTimeout(20000);
    } else {
      console.log('✅ Token creation initiated');
    }
    console.log('');

    // Extract the token
    console.log('[10/10] Extracting token...');
    await page.waitForTimeout(3000);

    // Take screenshot of token page
    await page.screenshot({
      path: 'cloudflare-token-result.png',
      fullPage: true,
    });
    console.log('   📸 Screenshot: cloudflare-token-result.png');

    // Try multiple methods to extract token
    console.log('   Attempting to extract token...');

    token = await page.evaluate(() => {
      // Method 1: Look for code/pre tags
      const codeElements = document.querySelectorAll('code, pre, samp');
      for (const el of codeElements) {
        const text = el.textContent.trim();
        // Cloudflare tokens are typically 40+ characters, alphanumeric with dashes/underscores
        if (
          text.length > 35 &&
          text.length < 200 &&
          !text.includes(' ') &&
          !text.includes('\n')
        ) {
          return text;
        }
      }

      // Method 2: Look for readonly/disabled inputs
      const inputs = document.querySelectorAll(
        'input[readonly], input[disabled], input[type="text"]'
      );
      for (const input of inputs) {
        const value = input.value.trim();
        if (value.length > 35 && value.length < 200 && !value.includes(' ')) {
          return value;
        }
      }

      // Method 3: Look for textarea
      const textareas = document.querySelectorAll('textarea');
      for (const textarea of textareas) {
        const value = textarea.value.trim();
        if (
          value.length > 35 &&
          value.length < 200 &&
          !value.includes(' ') &&
          !value.includes('\n')
        ) {
          return value;
        }
      }

      // Method 4: Look for specific classes/attributes
      const tokenElements = document.querySelectorAll(
        '[class*="token"], [class*="api-key"], [class*="secret"], ' +
          '[data-token], [data-api-key], [id*="token"], [id*="api-key"]'
      );
      for (const el of tokenElements) {
        const text = el.textContent.trim();
        if (
          text.length > 35 &&
          text.length < 200 &&
          !text.includes(' ') &&
          !text.includes('\n')
        ) {
          return text;
        }

        // Check data attributes
        const dataToken =
          el.getAttribute('data-token') || el.getAttribute('data-api-key');
        if (dataToken && dataToken.length > 35) {
          return dataToken;
        }
      }

      // Method 5: Look for any long alphanumeric string in the page
      const allText = document.body.innerText;
      const matches = allText.match(/[A-Za-z0-9_-]{40,}/g);
      if (matches && matches.length > 0) {
        // Return the longest match (likely the token)
        return matches.reduce((a, b) => (a.length > b.length ? a : b));
      }

      return null;
    });

    if (token) {
      console.log('   ✓ Token extracted via automated method');
    } else {
      console.log('   ⚠️  Automated extraction failed');
      console.log('   Trying manual copy detection...');

      // Wait and check clipboard
      await page.evaluate(() => {
        // Try to find and click copy button
        const buttons = Array.from(document.querySelectorAll('button'));
        const copyBtn = buttons.find((btn) => {
          const text = btn.textContent.toLowerCase();
          return text.includes('copy') || btn.innerHTML.includes('copy');
        });
        if (copyBtn) {
          copyBtn.click();
        }
      });

      await page.waitForTimeout(2000);

      // Try to read from clipboard (may not work due to permissions)
      try {
        token = await page.evaluate(() => navigator.clipboard.readText());
        if (token && token.length > 35) {
          console.log('   ✓ Token extracted from clipboard');
        } else {
          token = null;
        }
      } catch (e) {
        console.log('   ⚠️  Clipboard access denied');
      }
    }

    if (token) {
      console.log('✅ Token extracted successfully');
      console.log('');
      console.log(
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      );
      console.log('🎉 Token Created Successfully!');
      console.log(
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      );
      console.log('');
      console.log('Your new Cloudflare API token:');
      console.log(token);
      console.log('');

      // Update .env file
      const envPath = path.join(__dirname, '..', '.env');
      let envContent = fs.readFileSync(envPath, 'utf8');

      if (envContent.includes('CLOUDFLARE_API_TOKEN=')) {
        envContent = envContent.replace(
          /CLOUDFLARE_API_TOKEN=.*/,
          `CLOUDFLARE_API_TOKEN=${token}`
        );
      } else {
        envContent += `\nCLOUDFLARE_API_TOKEN=${token}\n`;
      }

      fs.writeFileSync(envPath, envContent);
      console.log('✅ Updated .env file with new token');
      console.log('');

      // Save token to separate file for backup
      const tokenPath = path.join(__dirname, '..', 'cloudflare-token.txt');
      fs.writeFileSync(
        tokenPath,
        `Cloudflare API Token (${new Date().toISOString()})\n\n${token}\n`
      );
      console.log('✅ Token saved to: cloudflare-token.txt');
      console.log('');

      console.log(
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      );
      console.log('📋 Next Steps');
      console.log(
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      );
      console.log('');
      console.log('1. Deploy Durable Object worker:');
      console.log('   ./scripts/auto-configure-autopilot.sh');
      console.log('');
      console.log('2. Set GitHub secret:');
      console.log(
        '   gh secret set AUTOPILOT_TOKEN --body "$(grep AUTOPILOT_TOKEN .env | cut -d= -f2)"'
      );
      console.log('');
      console.log('3. Test the deployment:');
      console.log('   curl https://efh-autopilot-metrics.workers.dev/summary');
      console.log('');
      console.log('4. Trigger a workflow:');
      console.log(
        '   git commit --allow-empty -m "Test autopilot" && git push'
      );
      console.log('');
      console.log(
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      );
      console.log('');

      // Close browser after short delay
      console.log('Closing browser in 10 seconds...');
      await page.waitForTimeout(10000);
    } else {
      console.log('⚠️  Could not automatically extract token');
      console.log('');
      console.log(
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      );
      console.log('📋 Manual Token Extraction Required');
      console.log(
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      );
      console.log('');
      console.log('The token should be visible in the browser window.');
      console.log('');
      console.log('Steps:');
      console.log('1. Copy the token from the browser');
      console.log('2. Update .env file:');
      console.log('   CLOUDFLARE_API_TOKEN=your-token-here');
      console.log('3. Run: ./scripts/auto-configure-autopilot.sh');
      console.log('');
      console.log('Screenshots saved for reference:');
      console.log('  • cloudflare-token-result.png');
      console.log('  • cloudflare-token-summary.png');
      console.log('  • cloudflare-token-config.png');
      console.log('');
      console.log('Browser will stay open for 3 minutes...');
      console.log('(Press Ctrl+C to close early)');
      console.log('');
      await page.waitForTimeout(180000);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('');
    console.log('Troubleshooting:');
    console.log('1. Check your Cloudflare credentials');
    console.log('2. Ensure you have access to create API tokens');
    console.log(
      '3. Check screenshots: cloudflare-token-config.png, cloudflare-token-result.png'
    );
    console.log('4. Try creating the token manually at:');
    console.log('   https://dash.cloudflare.com/profile/api-tokens');
    console.log('');

    if (browser) {
      console.log('Browser will stay open for 30 seconds for debugging...');
      await new Promise((resolve) => setTimeout(resolve, 30000));
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return token;
}

// Run the script
if (require.main === module) {
  updateCloudflareToken()
    .then((token) => {
      if (token) {
        console.log('✅ Autopilot configuration complete!');
        console.log('');
        console.log('Run this next:');
        console.log('  ./scripts/auto-configure-autopilot.sh');
        console.log('');
        process.exit(0);
      } else {
        console.log('⚠️  Manual configuration required');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { updateCloudflareToken };
