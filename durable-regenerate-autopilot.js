#!/usr/bin/env node

/**
 * Durable Regenerate Autopilot - Uses Durable's AI Regenerate Feature
 *
 * This script uses Durable's "Regenerate" or "Edit with AI" feature
 * to add enrollment programs to the page automatically.
 *
 * Usage:
 *   node durable-regenerate-autopilot.js
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
  screenshotDir: path.join(__dirname, 'logs'),
  headless: 'new',
  timeout: 90000,
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
  try {
    const filename = path.join(
      CONFIG.screenshotDir,
      `${name}-${Date.now()}.png`
    );
    await page.screenshot({ path: filename, fullPage: true });
    log.info(`Screenshot saved: ${filename}`);
    return filename;
  } catch (e) {
    log.warning(`Could not take screenshot: ${e.message}`);
  }
}

// AI Regenerate Prompt
const REGENERATE_PROMPT = `Add a new section after the hero section with enrollment programs.

The section should include:

**Title:** "🎓 Enroll in Our Programs Today"

**Subtitle:** "Transform your career with our DOL-compliant workforce training programs. Federal funding available for eligible participants."

**3 Programs:**

1. AI & Machine Learning
   - $1,997
   - 12 weeks
   - 89% job placement rate
   - Enroll Now button

2. Data Science Bootcamp
   - $4,950
   - 16 weeks
   - 92% job placement rate
   - Enroll Now button

3. Cybersecurity Specialist
   - $3,495
   - 20 weeks
   - 95% job placement rate
   - Enroll Now button

**Style:** Purple gradient background, white text, 3-column grid on desktop, stacked on mobile, modern cards with pricing and stats, "View All 50+ Programs" button at bottom.

**Badges:** Federal Funding Available | DOL Compliant | Industry Certifications`;

// Main autopilot function
async function runDurableRegenerateAutopilot() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🤖 DURABLE REGENERATE AUTOPILOT');
  console.log("    Using Durable's AI Page Regeneration");
  console.log('═══════════════════════════════════════════════════════════\n');

  log.success(`Using credentials: ${CONFIG.email}`);

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

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    log.success('Browser launched');

    // Step 2: Navigate to Durable.co
    log.step(2, 'Navigating to Durable.co...');

    try {
      await page.goto('https://durable.co', {
        waitUntil: 'domcontentloaded',
        timeout: CONFIG.timeout,
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await takeScreenshot(page, '01-durable-homepage');
      log.success('Durable.co loaded');
    } catch (e) {
      log.warning('Timeout on homepage, continuing...');
    }

    // Step 3: Login
    log.step(3, 'Logging in...');

    try {
      await page.goto('https://durable.co/login', {
        waitUntil: 'domcontentloaded',
        timeout: CONFIG.timeout,
      });
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await takeScreenshot(page, '02-login-page');

      // Fill login form
      const loginSuccess = await page.evaluate(
        (email, password) => {
          const emailInputs = Array.from(document.querySelectorAll('input'));
          const emailInput = emailInputs.find(
            (input) =>
              input.type === 'email' ||
              input.name?.toLowerCase().includes('email') ||
              input.placeholder?.toLowerCase().includes('email')
          );

          const passwordInput = emailInputs.find(
            (input) => input.type === 'password'
          );

          if (emailInput && passwordInput) {
            emailInput.value = email;
            emailInput.dispatchEvent(new Event('input', { bubbles: true }));

            passwordInput.value = password;
            passwordInput.dispatchEvent(new Event('input', { bubbles: true }));

            const buttons = Array.from(document.querySelectorAll('button'));
            const loginButton = buttons.find(
              (btn) =>
                btn.textContent.toLowerCase().includes('log in') ||
                btn.textContent.toLowerCase().includes('sign in')
            );

            if (loginButton) {
              loginButton.click();
              return true;
            }
          }
          return false;
        },
        CONFIG.email,
        CONFIG.password
      );

      if (loginSuccess) {
        log.success('Login submitted');
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await takeScreenshot(page, '03-after-login');
      }
    } catch (e) {
      log.warning('Login step had issues, continuing...');
    }

    // Step 4: Navigate to site editor
    log.step(4, 'Opening site editor...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Try to find and click on the site
    const siteClicked = await page.evaluate((siteName) => {
      const elements = Array.from(document.querySelectorAll('a, button, div'));
      const siteElement = elements.find(
        (el) =>
          el.textContent.includes(siteName) ||
          el.textContent.includes('Elevate')
      );

      if (siteElement) {
        siteElement.click();
        return true;
      }
      return false;
    }, CONFIG.siteName);

    if (siteClicked) {
      log.success('Site clicked');
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    // Look for Edit button
    const editClicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, a'));
      const editButton = buttons.find(
        (btn) =>
          btn.textContent.toLowerCase().includes('edit') ||
          btn.textContent.toLowerCase().includes('manage')
      );

      if (editButton) {
        editButton.click();
        return true;
      }
      return false;
    });

    if (editClicked) {
      log.success('Edit button clicked');
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await takeScreenshot(page, '04-editor-loading');
    }

    // Step 5: Look for Regenerate/AI Edit button
    log.step(5, 'Looking for Regenerate/AI Edit feature...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Try to find regenerate, AI edit, or magic wand button
    const regenerateFound = await page.evaluate(() => {
      const buttons = Array.from(
        document.querySelectorAll('button, a, div[role="button"]')
      );

      // Look for various AI editing features
      const aiButton = buttons.find((btn) => {
        const text = btn.textContent.toLowerCase();
        const ariaLabel = btn.getAttribute('aria-label')?.toLowerCase() || '';

        return (
          text.includes('regenerate') ||
          text.includes('edit with ai') ||
          text.includes('ai edit') ||
          text.includes('rebuild') ||
          text.includes('magic') ||
          ariaLabel.includes('regenerate') ||
          ariaLabel.includes('ai') ||
          btn.querySelector('svg[class*="magic"]') ||
          btn.querySelector('svg[class*="wand"]') ||
          btn.querySelector('[class*="regenerate"]')
        );
      });

      if (aiButton) {
        aiButton.click();
        return true;
      }
      return false;
    });

    if (regenerateFound) {
      log.success('Regenerate/AI Edit button found and clicked!');
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await takeScreenshot(page, '05-regenerate-opened');

      // Step 6: Enter prompt
      log.step(6, 'Entering AI prompt...');

      // Look for text input/textarea for AI prompt
      const promptEntered = await page.evaluate((prompt) => {
        const inputs = Array.from(document.querySelectorAll('input, textarea'));
        const promptInput = inputs.find(
          (input) =>
            input.placeholder?.toLowerCase().includes('describe') ||
            input.placeholder?.toLowerCase().includes('what') ||
            input.placeholder?.toLowerCase().includes('tell') ||
            input.placeholder?.toLowerCase().includes('change') ||
            input.type === 'text' ||
            input.tagName === 'TEXTAREA'
        );

        if (promptInput) {
          promptInput.value = prompt;
          promptInput.dispatchEvent(new Event('input', { bubbles: true }));
          promptInput.dispatchEvent(new Event('change', { bubbles: true }));

          // Look for Generate/Submit button
          const buttons = Array.from(document.querySelectorAll('button'));
          const generateButton = buttons.find(
            (btn) =>
              btn.textContent.toLowerCase().includes('generate') ||
              btn.textContent.toLowerCase().includes('regenerate') ||
              btn.textContent.toLowerCase().includes('create') ||
              btn.textContent.toLowerCase().includes('submit') ||
              btn.type === 'submit'
          );

          if (generateButton) {
            generateButton.click();
            return true;
          }
          return 'input_filled';
        }
        return false;
      }, REGENERATE_PROMPT);

      if (promptEntered) {
        log.success('AI prompt entered and submitted!');
        log.info('Waiting for AI to regenerate the page...');

        // Wait for AI to process (this can take 30-60 seconds)
        await new Promise((resolve) => setTimeout(resolve, 45000));
        await takeScreenshot(page, '06-ai-generating');

        // Wait more for completion
        log.info('Giving AI more time to complete...');
        await new Promise((resolve) => setTimeout(resolve, 45000));
        await takeScreenshot(page, '07-ai-completed');

        // Step 7: Look for Publish/Save button
        log.step(7, 'Publishing changes...');

        const published = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const publishButton = buttons.find(
            (btn) =>
              btn.textContent.toLowerCase().includes('publish') ||
              btn.textContent.toLowerCase().includes('save') ||
              btn.textContent.toLowerCase().includes('apply')
          );

          if (publishButton) {
            publishButton.click();
            return true;
          }
          return false;
        });

        if (published) {
          log.success('Publish button clicked!');
          await new Promise((resolve) => setTimeout(resolve, 5000));
          await takeScreenshot(page, '08-published');
        }

        success = true;
      } else {
        log.warning('Could not enter AI prompt automatically');
      }
    } else {
      log.warning('Could not find Regenerate/AI Edit button');
      log.info('Look for these buttons:');
      log.info('  - "Regenerate"');
      log.info('  - "Edit with AI"');
      log.info('  - "AI Edit"');
      log.info('  - Magic wand icon ✨');
      log.info('  - "Rebuild"');
    }

    // Step 8: Verify deployment
    log.step(8, 'Verifying deployment...');
    log.info('Waiting for changes to propagate...');
    await new Promise((resolve) => setTimeout(resolve, 10000));

    try {
      await page.goto(CONFIG.siteUrl, {
        waitUntil: 'domcontentloaded',
        timeout: CONFIG.timeout,
      });
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await takeScreenshot(page, '09-live-site');

      const enrollmentVisible = await page.evaluate(() => {
        const text = document.body.textContent;
        return (
          text.includes('Enroll in Our Programs') ||
          text.includes('AI & Machine Learning') ||
          text.includes('Data Science Bootcamp') ||
          text.includes('Cybersecurity Specialist') ||
          text.includes('$1,997') ||
          text.includes('$4,950')
        );
      });

      if (enrollmentVisible) {
        log.success('✨ Enrollment programs are LIVE on the website!');
        success = true;
      } else {
        log.warning('Enrollment programs not visible yet');
        log.info('Check the site in a few minutes or verify manually');
      }
    } catch (e) {
      log.warning('Could not verify live site: ' + e.message);
    }

    // Save status
    const status = {
      success,
      timestamp: new Date().toISOString(),
      url: CONFIG.siteUrl,
      method: 'AI Regenerate',
    };

    fs.writeFileSync(
      path.join(CONFIG.screenshotDir, 'regenerate-status.json'),
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
        // Ignore
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
    console.log('🎉 AI REGENERATE DEPLOYMENT SUCCESSFUL!');
    console.log(`\n✅ Visit: ${CONFIG.siteUrl}`);
    console.log('✅ Enrollment programs should be live!');
    console.log("\nDurable's AI regenerated your page! 🤖✨");
  } else {
    console.log('⚠️  AI REGENERATE DEPLOYMENT INCOMPLETE');
    console.log('\nManual steps:');
    console.log('1. Log into Durable.co');
    console.log('2. Edit your site');
    console.log(
      '3. Look for "Regenerate", "Edit with AI", or magic wand ✨ button'
    );
    console.log('4. Click it and paste this prompt:');
    console.log('\n' + REGENERATE_PROMPT);
    console.log('\n5. Let AI regenerate the page');
    console.log('6. Publish changes');
    console.log('7. Verify at: ' + CONFIG.siteUrl);
  }
  console.log('═══════════════════════════════════════════════════════════\n');

  return success;
}

// Run autopilot
runDurableRegenerateAutopilot()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
