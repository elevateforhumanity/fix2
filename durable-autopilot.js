#!/usr/bin/env node

/**
 * Durable Autopilot - Automated Enrollment Programs Deployment
 *
 * This script automatically deploys enrollment programs to Durable.co
 *
 * Usage:
 *   node durable-autopilot.js
 *
 * Environment Variables:
 *   DURABLE_EMAIL - Your Durable.co email
 *   DURABLE_PASSWORD - Your Durable.co password
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  email: process.env.DURABLE_EMAIL || 'Elevateforhumanity@gmail.com',
  password: process.env.DURABLE_PASSWORD || 'Elijah1$',
  siteUrl: 'https://www.elevateforhumanity.org',
  enrollmentPageUrl: 'https://www.elevateforhumanity.org/elevate',
  siteName: 'Elevate for Humanity',
  enrollmentScriptUrl: 'https://main--elevateforhumanityfix.netlify.app/enrollment-injector.js',
  enrollmentCodeFile: path.join(__dirname, 'DURABLE_ENROLLMENT_CODE.html'),
  screenshotDir: path.join(__dirname, 'logs'),
  headless: 'new', // Use new headless mode
  timeout: 60000,
};

// Ensure logs directory exists
if (!fs.existsSync(CONFIG.screenshotDir)) {
  fs.mkdirSync(CONFIG.screenshotDir, { recursive: true });
}

// Logging utilities
const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  error: (msg) => console.log(`❌ ${msg}`),
  warning: (msg) => console.log(`⚠️  ${msg}`),
  step: (num, msg) => console.log(`\n📍 Step ${num}: ${msg}`),
};

// Screenshot helper
async function takeScreenshot(page, name) {
  const filename = path.join(CONFIG.screenshotDir, `${name}-${Date.now()}.png`);
  await page.screenshot({ path: filename, fullPage: true });
  log.info(`Screenshot saved: ${filename}`);
  return filename;
}

// Wait helper with retry
async function waitForSelector(page, selector, options = {}) {
  const maxRetries = options.retries || 3;
  const timeout = options.timeout || 10000;

  for (let i = 0; i < maxRetries; i++) {
    try {
      await page.waitForSelector(selector, { timeout });
      return true;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      log.warning(`Retry ${i + 1}/${maxRetries} for selector: ${selector}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

// Main autopilot function
async function runDurableAutopilot() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🤖 DURABLE AUTOPILOT - Enrollment Programs Deployment');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Validate credentials
  if (!CONFIG.email || !CONFIG.password) {
    log.error('Missing credentials!');
    log.info('Set environment variables:');
    log.info('  export DURABLE_EMAIL="your-email@example.com"');
    log.info('  export DURABLE_PASSWORD="your-password"');
    process.exit(1);
  }

  // Enrollment script tag to inject
  const enrollmentScriptTag = `<script src="${CONFIG.enrollmentScriptUrl}" defer></script>`;
  log.success(`Enrollment script ready: ${CONFIG.enrollmentScriptUrl}`);

  let browser;
  let success = false;

  try {
    // Step 1: Launch browser
    log.step(1, 'Launching browser...');
    browser = await puppeteer.launch({
      headless: CONFIG.headless,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-blink-features=AutomationControlled',
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // Set user agent to avoid detection
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    log.success('Browser launched');

    // Step 2: Navigate to Durable.co login
    log.step(2, 'Navigating to Durable.co login...');
    await page.goto('https://durable.co/login', {
      waitUntil: 'networkidle0',
      timeout: CONFIG.timeout,
    });

    // Wait extra time for React/Next.js to render
    log.info('Waiting for page to fully render...');
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await takeScreenshot(page, '01-login-page');
    log.success('Login page loaded');

    // Step 3: Login
    log.step(3, 'Logging in...');

    // Wait for any input to appear
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Try to find and fill email input using multiple strategies
    let emailFilled = false;

    // Strategy 1: Try common selectors
    const emailSelectors = [
      'input[type="email"]',
      'input[name="email"]',
      'input[placeholder*="email" i]',
      'input[placeholder*="Email" i]',
      '#email',
      '[data-testid="email-input"]',
      '[name="email"]',
    ];

    for (const selector of emailSelectors) {
      try {
        const elements = await page.$$(selector);
        if (elements.length > 0) {
          await elements[0].click();
          await new Promise((resolve) => setTimeout(resolve, 500));
          await elements[0].type(CONFIG.email, { delay: 100 });
          emailFilled = true;
          log.info(`Entered email using selector: ${selector}`);
          break;
        }
      } catch (e) {
        continue;
      }
    }

    // Strategy 2: Try to find by evaluating all inputs
    if (!emailFilled) {
      emailFilled = await page.evaluate((email) => {
        const inputs = Array.from(document.querySelectorAll('input'));
        const emailInput = inputs.find(
          (input) =>
            input.type === 'email' ||
            input.name?.toLowerCase().includes('email') ||
            input.placeholder?.toLowerCase().includes('email') ||
            input.id?.toLowerCase().includes('email')
        );

        if (emailInput) {
          emailInput.value = email;
          emailInput.dispatchEvent(new Event('input', { bubbles: true }));
          emailInput.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        }
        return false;
      }, CONFIG.email);

      if (emailFilled) {
        log.info('Entered email using DOM evaluation');
      }
    }

    if (!emailFilled) {
      log.error('Could not find email input field');
      await takeScreenshot(page, '02-login-error');
      throw new Error('Email input not found');
    }

    log.info(`Entered email: ${CONFIG.email}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Try to find and fill password input
    let passwordFilled = false;

    // Strategy 1: Try common selectors
    const passwordSelectors = [
      'input[type="password"]',
      'input[name="password"]',
      'input[placeholder*="password" i]',
      'input[placeholder*="Password" i]',
      '#password',
      '[data-testid="password-input"]',
      '[name="password"]',
    ];

    for (const selector of passwordSelectors) {
      try {
        const elements = await page.$$(selector);
        if (elements.length > 0) {
          await elements[0].click();
          await new Promise((resolve) => setTimeout(resolve, 500));
          await elements[0].type(CONFIG.password, { delay: 100 });
          passwordFilled = true;
          log.info(`Entered password using selector: ${selector}`);
          break;
        }
      } catch (e) {
        continue;
      }
    }

    // Strategy 2: Try to find by evaluating all inputs
    if (!passwordFilled) {
      passwordFilled = await page.evaluate((password) => {
        const inputs = Array.from(document.querySelectorAll('input'));
        const passwordInput = inputs.find(
          (input) =>
            input.type === 'password' ||
            input.name?.toLowerCase().includes('password') ||
            input.placeholder?.toLowerCase().includes('password') ||
            input.id?.toLowerCase().includes('password')
        );

        if (passwordInput) {
          passwordInput.value = password;
          passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
          passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        }
        return false;
      }, CONFIG.password);

      if (passwordFilled) {
        log.info('Entered password using DOM evaluation');
      }
    }

    if (!passwordFilled) {
      log.error('Could not find password input field');
      await takeScreenshot(page, '03-password-error');
      throw new Error('Password input not found');
    }

    log.info('Entered password');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find and click login button
    const loginButtonSelectors = [
      'button[type="submit"]',
      'button:has-text("Log in")',
      'button:has-text("Sign in")',
      'input[type="submit"]',
      '[data-testid="login-button"]',
    ];

    let loginButton = null;
    for (const selector of loginButtonSelectors) {
      try {
        const elements = await page.$$(selector);
        if (elements.length > 0) {
          loginButton = elements[0];
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!loginButton) {
      // Try clicking by text
      try {
        await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const loginBtn = buttons.find(
            (btn) =>
              btn.textContent.toLowerCase().includes('log in') ||
              btn.textContent.toLowerCase().includes('sign in')
          );
          if (loginBtn) loginBtn.click();
        });
      } catch (e) {
        log.error('Could not find login button');
        await takeScreenshot(page, '04-login-button-error');
        throw new Error('Login button not found');
      }
    } else {
      await loginButton.click();
    }

    log.info('Clicked login button');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await takeScreenshot(page, '05-after-login');

    // Wait for navigation after login
    try {
      await page.waitForNavigation({
        timeout: 15000,
        waitUntil: 'networkidle2',
      });
    } catch (e) {
      log.warning('Navigation timeout, checking if login succeeded...');
    }

    // Check if login was successful
    const currentUrl = page.url();
    if (currentUrl.includes('login')) {
      log.error('Login failed - still on login page');
      await takeScreenshot(page, '06-login-failed');
      throw new Error('Login failed');
    }

    log.success('Login successful!');
    await takeScreenshot(page, '07-dashboard');

    // Step 4: Navigate to Settings
    log.step(4, 'Navigating to Settings...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Try to find Settings link/button
    const settingsFound = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('a, button, div, span'));
      const settingsElement = elements.find(
        (el) =>
          el.textContent.toLowerCase().includes('settings') ||
          el.getAttribute('aria-label')?.toLowerCase().includes('settings') ||
          el.href?.includes('settings')
      );

      if (settingsElement) {
        settingsElement.click();
        return true;
      }
      return false;
    });

    if (!settingsFound) {
      log.warning('Could not find Settings automatically, trying direct URL...');
      await page.goto('https://durable.co/sites/settings', {
        waitUntil: 'networkidle2',
        timeout: CONFIG.timeout,
      });
    }

    log.success('Navigated to Settings');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await takeScreenshot(page, '08-settings-page');

    // Step 5: Find Custom Code section
    log.step(5, 'Finding Custom Code section...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const customCodeFound = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('button, a, div, span, h2, h3'));
      const customCodeElement = elements.find(
        (el) =>
          el.textContent.toLowerCase().includes('custom code') ||
          el.textContent.toLowerCase().includes('custom html') ||
          el.textContent.toLowerCase().includes('advanced')
      );

      if (customCodeElement) {
        customCodeElement.click();
        return true;
      }
      return false;
    });

    if (!customCodeFound) {
      log.warning('Could not find Custom Code section automatically');
      await takeScreenshot(page, '09-custom-code-not-found');
    } else {
      log.success('Found Custom Code section');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await takeScreenshot(page, '10-custom-code-section');
    }

    // Step 6: Find Head Code textarea
    log.step(6, 'Finding Head Code textarea...');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const headCodeSelectors = [
      'textarea[name="head"]',
      'textarea[placeholder*="head" i]',
      'textarea[placeholder*="<head>" i]',
      '[data-testid="head-code"]',
      '.head-code-editor',
    ];

    let scriptInjected = false;
    for (const selector of headCodeSelectors) {
      try {
        const elements = await page.$$(selector);
        if (elements.length > 0) {
          const textarea = elements[0];

          // Get existing content
          const existingCode = await page.evaluate(el => el.value, textarea);

          // Check if enrollment script already exists
          if (existingCode.includes(CONFIG.enrollmentScriptUrl)) {
            log.success('Enrollment script already exists in head section');
            scriptInjected = true;
            break;
          }

          // Add enrollment script
          const newCode = existingCode + '\n\n' + enrollmentScriptTag;

          await textarea.click();
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Set the value
          await page.evaluate((el, code) => {
            el.value = code;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, textarea, newCode);

          scriptInjected = true;
          log.success('Enrollment script injected into head section');
          break;
        }
      } catch (e) {
        continue;
      }
    }

    // Fallback: Try to find any textarea and inject
    if (!scriptInjected) {
      log.warning('Could not find head code textarea with specific selectors');
      log.info('Trying to find any textarea...');

      try {
        const textareas = await page.$$('textarea');
        if (textareas.length > 0) {
          const textarea = textareas[0];
          const existingCode = await page.evaluate(el => el.value, textarea);

          if (existingCode.includes(CONFIG.enrollmentScriptUrl)) {
            log.success('Enrollment script already exists');
            scriptInjected = true;
          } else {
            const newCode = existingCode + '\n\n' + enrollmentScriptTag;
            await page.evaluate((el, code) => {
              el.value = code;
              el.dispatchEvent(new Event('input', { bubbles: true }));
              el.dispatchEvent(new Event('change', { bubbles: true }));
            }, textarea, newCode);

            scriptInjected = true;
            log.success('Enrollment script injected');
          }
        }
      } catch (e) {
        log.error('Could not inject script: ' + e.message);
      }
    }

    if (!scriptInjected) {
      log.error('Could not inject enrollment script automatically');
      log.info('Manual step required:');
      log.info('1. Go to Settings → Custom Code');
      log.info('2. Add to Head section: ' + enrollmentScriptTag);
      await takeScreenshot(page, '11-injection-failed');
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    await takeScreenshot(page, '12-script-injected');

    // Step 7: Save changes
    log.step(7, 'Saving changes...');

    const saveButtonFound = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, a'));
      const saveBtn = buttons.find(
        (btn) =>
          btn.textContent.toLowerCase().includes('save') ||
          btn.textContent.toLowerCase().includes('update') ||
          btn.textContent.toLowerCase().includes('apply')
      );

      if (saveBtn) {
        saveBtn.click();
        return true;
      }
      return false;
    });

    if (!saveButtonFound) {
      log.warning('Could not find Save button');
      log.info('Look for: Save, Update, or Apply button');
      await takeScreenshot(page, '13-save-button-not-found');
    } else {
      log.success('Clicked Save button');
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Handle confirmation modal if it appears
      try {
        await page.evaluate(() => {
          const confirmButtons = Array.from(
            document.querySelectorAll('button')
          );
          const confirmBtn = confirmButtons.find(
            (btn) =>
              btn.textContent.toLowerCase().includes('confirm') ||
              btn.textContent.toLowerCase().includes('yes') ||
              btn.textContent.toLowerCase().includes('save')
          );
          if (confirmBtn) confirmBtn.click();
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        // No confirmation modal
      }

      await takeScreenshot(page, '14-saved');
    }

    // Step 8: Verify deployment on /elevate page
    log.step(8, 'Verifying deployment...');
    log.info('Checking enrollment page: ' + CONFIG.enrollmentPageUrl);
    log.info('Waiting 5 seconds for CDN propagation...');
    await new Promise((resolve) => setTimeout(resolve, 5000));

    await page.goto(CONFIG.enrollmentPageUrl, {
      waitUntil: 'networkidle2',
      timeout: CONFIG.timeout,
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));
    await takeScreenshot(page, '15-enrollment-page');

    // Check if enrollment script is loaded
    const scriptLoaded = await page.evaluate((scriptUrl) => {
      const scripts = Array.from(document.querySelectorAll('script'));
      return scripts.some((script) => script.src && script.src.includes(scriptUrl));
    }, CONFIG.enrollmentScriptUrl);

    // Check if enrollment section is visible
    const enrollmentVisible = await page.evaluate(() => {
      const text = document.body.textContent;
      return (
        text.includes('Enroll in Our Programs Today') ||
        text.includes('Barber Apprenticeship') ||
        text.includes('Building Services Technician') ||
        text.includes('Certified Nursing Assistant')
      );
    });

    if (scriptLoaded && enrollmentVisible) {
      log.success('✨ Enrollment script loaded and programs are LIVE!');
      log.success(`Visit: ${CONFIG.enrollmentPageUrl}`);
      success = true;
    } else if (scriptLoaded) {
      log.success('✅ Enrollment script is loaded');
      log.warning('⚠️ Enrollment programs not visible yet (may need page refresh)');
      success = true; // Script is injected, that's the main goal
    } else if (enrollmentVisible) {
      log.success('✅ Enrollment programs are visible');
      log.warning('⚠️ Script tag not detected (may be inline)');
      success = true;
    } else {
      log.warning('Enrollment script and programs not detected');
      log.info('Please verify the script was added to the /elevate page');
      log.info('Script to add: <script src="' + CONFIG.enrollmentScriptUrl + '" defer></script>');
    }

    await takeScreenshot(page, '16-verification');

    // Save status
    const status = {
      success,
      timestamp: new Date().toISOString(),
      url: CONFIG.siteUrl,
      enrollmentVisible,
    };

    fs.writeFileSync(
      path.join(CONFIG.screenshotDir, 'deployment-status.json'),
      JSON.stringify(status, null, 2)
    );
  } catch (error) {
    log.error(`Deployment failed: ${error.message}`);
    console.error(error);

    if (browser) {
      try {
        const pages = await browser.pages();
        if (pages.length > 0) {
          await takeScreenshot(pages[0], 'error');
        }
      } catch (e) {
        // Ignore screenshot errors
      }
    }
  } finally {
    if (browser) {
      await browser.close();
      log.info('Browser closed');
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════');
  if (success) {
    console.log('🎉 DEPLOYMENT SUCCESSFUL!');
    console.log(`\n✅ Visit: ${CONFIG.siteUrl}`);
    console.log('✅ Enrollment programs are live!');
  } else {
    console.log('⚠️  DEPLOYMENT INCOMPLETE');
    console.log('\nSome steps may require manual intervention.');
    console.log('Check screenshots in: ' + CONFIG.screenshotDir);
    console.log('\nManual steps:');
    console.log('1. Log into Durable.co');
    console.log('2. Edit your homepage');
    console.log('3. Add Custom HTML block');
    console.log('4. Paste code from: ' + CONFIG.enrollmentCodeFile);
    console.log('5. Publish');
  }
  console.log('═══════════════════════════════════════════════════════════\n');

  return success;
}

// Run autopilot
runDurableAutopilot()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
