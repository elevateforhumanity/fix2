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
  siteName: 'Elevate for Humanity',
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

  // Validate enrollment code file
  if (!fs.existsSync(CONFIG.enrollmentCodeFile)) {
    log.error(`Enrollment code file not found: ${CONFIG.enrollmentCodeFile}`);
    process.exit(1);
  }

  const enrollmentCode = fs.readFileSync(CONFIG.enrollmentCodeFile, 'utf8');
  log.success(`Loaded enrollment code (${enrollmentCode.length} characters)`);

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

    // Step 4: Find and select site
    log.step(4, 'Finding site...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Try to find site by name or URL
    const siteFound = await page.evaluate(
      (siteName, siteUrl) => {
        const links = Array.from(document.querySelectorAll('a, div, span'));
        const siteElement = links.find(
          (el) =>
            el.textContent.includes(siteName) ||
            el.textContent.includes('elevateforhumanity') ||
            (el.href && el.href.includes('elevateforhumanity'))
        );

        if (siteElement) {
          // Find edit button near this element
          const parent = siteElement.closest(
            '[class*="card"], [class*="site"], [class*="item"]'
          );
          if (parent) {
            const editBtn = parent.querySelector('button, a');
            if (editBtn) {
              editBtn.click();
              return true;
            }
          }
          siteElement.click();
          return true;
        }
        return false;
      },
      CONFIG.siteName,
      CONFIG.siteUrl
    );

    if (!siteFound) {
      log.warning(
        'Could not find site automatically, trying alternative methods...'
      );

      // Try clicking first site/edit button
      try {
        await page.evaluate(() => {
          const editButtons = Array.from(
            document.querySelectorAll('button, a')
          );
          const editBtn = editButtons.find(
            (btn) =>
              btn.textContent.toLowerCase().includes('edit') ||
              btn.textContent.toLowerCase().includes('manage')
          );
          if (editBtn) editBtn.click();
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        log.error('Could not find site to edit');
        await takeScreenshot(page, '08-site-not-found');
        throw new Error('Site not found');
      }
    }

    log.success('Site selected');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await takeScreenshot(page, '09-site-editor');

    // Step 5: Wait for editor to load
    log.step(5, 'Waiting for editor to load...');
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const editorLoaded = await page.evaluate(() => {
      return (
        document.querySelector(
          '[class*="editor"], [class*="canvas"], iframe'
        ) !== null
      );
    });

    if (!editorLoaded) {
      log.warning('Editor may not be loaded, continuing anyway...');
    } else {
      log.success('Editor loaded');
    }

    await takeScreenshot(page, '10-editor-ready');

    // Step 6: Add Custom HTML block
    log.step(6, 'Adding Custom HTML block...');

    // Try to find "Add Section" or "+" button
    const addButtonFound = await page.evaluate(() => {
      const buttons = Array.from(
        document.querySelectorAll('button, a, div[role="button"]')
      );
      const addBtn = buttons.find(
        (btn) =>
          btn.textContent.toLowerCase().includes('add section') ||
          btn.textContent.toLowerCase().includes('add block') ||
          btn.textContent === '+' ||
          btn.getAttribute('aria-label')?.toLowerCase().includes('add')
      );

      if (addBtn) {
        addBtn.click();
        return true;
      }
      return false;
    });

    if (!addButtonFound) {
      log.warning('Could not find "Add Section" button automatically');
      log.info('You may need to add the Custom HTML block manually');
      log.info('The code is ready in: ' + CONFIG.enrollmentCodeFile);
      await takeScreenshot(page, '11-add-button-not-found');
    } else {
      log.success('Clicked "Add Section" button');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await takeScreenshot(page, '12-add-menu-open');

      // Try to find Custom HTML option
      const htmlBlockFound = await page.evaluate(() => {
        const options = Array.from(
          document.querySelectorAll('button, a, div[role="button"], li')
        );
        const htmlOption = options.find(
          (opt) =>
            opt.textContent.toLowerCase().includes('custom html') ||
            opt.textContent.toLowerCase().includes('html') ||
            opt.textContent.toLowerCase().includes('code') ||
            opt.textContent.toLowerCase().includes('embed')
        );

        if (htmlOption) {
          htmlOption.click();
          return true;
        }
        return false;
      });

      if (!htmlBlockFound) {
        log.warning('Could not find Custom HTML option');
        log.info('Look for: Custom HTML, Code Block, or Embed option');
        await takeScreenshot(page, '13-html-option-not-found');
      } else {
        log.success('Selected Custom HTML block');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await takeScreenshot(page, '14-html-block-added');
      }
    }

    // Step 7: Paste enrollment code
    log.step(7, 'Pasting enrollment code...');

    // Try to find code editor/textarea
    const codeEditorSelectors = [
      'textarea',
      '[contenteditable="true"]',
      '.code-editor',
      '[class*="editor"]',
      'iframe',
    ];

    let codePasted = false;
    for (const selector of codeEditorSelectors) {
      try {
        const elements = await page.$$(selector);
        if (elements.length > 0) {
          // Try to paste into the last textarea/editor (usually the new one)
          const editor = elements[elements.length - 1];

          await editor.click();
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Clear existing content
          await page.keyboard.down('Control');
          await page.keyboard.press('A');
          await page.keyboard.up('Control');
          await page.keyboard.press('Backspace');

          // Paste code
          await editor.type(enrollmentCode, { delay: 10 });

          codePasted = true;
          log.success('Enrollment code pasted successfully');
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!codePasted) {
      log.warning('Could not paste code automatically');
      log.info('Manual step required:');
      log.info('1. Find the code editor/textarea');
      log.info('2. Paste the contents of: ' + CONFIG.enrollmentCodeFile);
      await takeScreenshot(page, '15-code-editor-not-found');
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    await takeScreenshot(page, '16-code-pasted');

    // Step 8: Publish changes
    log.step(8, 'Publishing changes...');

    const publishButtonFound = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, a'));
      const publishBtn = buttons.find(
        (btn) =>
          btn.textContent.toLowerCase().includes('publish') ||
          btn.textContent.toLowerCase().includes('save') ||
          btn.textContent.toLowerCase().includes('update')
      );

      if (publishBtn) {
        publishBtn.click();
        return true;
      }
      return false;
    });

    if (!publishButtonFound) {
      log.warning('Could not find Publish button');
      log.info('Look for: Publish, Save, or Update button (usually top-right)');
      await takeScreenshot(page, '17-publish-button-not-found');
    } else {
      log.success('Clicked Publish button');
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
              btn.textContent.toLowerCase().includes('publish')
          );
          if (confirmBtn) confirmBtn.click();
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        // No confirmation modal
      }

      await takeScreenshot(page, '18-published');
    }

    // Step 9: Verify deployment
    log.step(9, 'Verifying deployment...');
    log.info('Waiting 10 seconds for CDN propagation...');
    await new Promise((resolve) => setTimeout(resolve, 10000));

    await page.goto(CONFIG.siteUrl, {
      waitUntil: 'networkidle2',
      timeout: CONFIG.timeout,
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));
    await takeScreenshot(page, '19-live-site');

    // Check if enrollment section is visible
    const enrollmentVisible = await page.evaluate(() => {
      const text = document.body.textContent;
      return (
        text.includes('Enroll in Our Programs Today') ||
        text.includes('AI & Machine Learning') ||
        text.includes('Data Science Bootcamp') ||
        text.includes('Cybersecurity Specialist')
      );
    });

    if (enrollmentVisible) {
      log.success('✨ Enrollment programs are LIVE on the website!');
      success = true;
    } else {
      log.warning('Enrollment programs not visible yet');
      log.info('This may be due to CDN caching. Wait 60 seconds and refresh.');
      log.info('Or check if the code was pasted correctly.');
    }

    await takeScreenshot(page, '20-verification');

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
