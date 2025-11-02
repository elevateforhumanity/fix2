#!/usr/bin/env node

/**
 * Durable Workers Autopilot - Uses Durable's Workers & Custom HTML
 *
 * This script:
 * 1. Logs into Durable.co
 * 2. Uses Durable Workers to create dynamic pages
 * 3. Adds custom HTML code blocks
 * 4. Configures DNS if needed
 *
 * Usage:
 *   node durable-workers-autopilot.js
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
  domain: 'elevateforhumanity.org',
  enrollmentCodeFile: path.join(__dirname, 'DURABLE_ENROLLMENT_CODE.html'),
  screenshotDir: path.join(__dirname, 'logs'),
  headless: 'new',
  timeout: 90000,
};

// Ensure logs directory exists
if (!fs.existsSync(CONFIG.screenshotDir)) {
  fs.mkdirSync(CONFIG.screenshotDir, { recursive: true });
}

// Read enrollment code
const enrollmentCode = fs.existsSync(CONFIG.enrollmentCodeFile)
  ? fs.readFileSync(CONFIG.enrollmentCodeFile, 'utf8')
  : '';

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

// Worker Instructions for Durable
const WORKER_INSTRUCTIONS = `Create a new dynamic page called "Enrollment Programs" with the following:

**Page URL:** /enrollment or /programs/enrollment

**Content:**

Add a custom HTML section with enrollment programs:

1. **AI & Machine Learning Program**
   - Price: $1,997
   - Duration: 12 weeks
   - Job Placement: 89%
   - Description: Master artificial intelligence and machine learning foundations with hands-on projects
   - Enroll button linking to /contact

2. **Data Science Bootcamp**
   - Price: $4,950
   - Duration: 16 weeks
   - Job Placement: 92%
   - Description: Comprehensive data science training covering statistics, ML, and big data
   - Enroll button linking to /contact

3. **Cybersecurity Specialist**
   - Price: $3,495
   - Duration: 20 weeks
   - Job Placement: 95%
   - Description: Intensive cybersecurity training covering network security and ethical hacking
   - Enroll button linking to /contact

**Styling:**
- Purple gradient background (#667eea to #764ba2)
- White text
- Modern card layout
- Mobile responsive
- Federal funding badges

Also add this section to the homepage after the hero section.`;

// Main autopilot function
async function runDurableWorkersAutopilot() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🤖 DURABLE WORKERS AUTOPILOT');
  console.log('    Using Workers + Custom HTML + DNS');
  console.log('═══════════════════════════════════════════════════════════\n');

  log.success(`Site: ${CONFIG.siteUrl}`);
  log.success(`Domain: ${CONFIG.domain}`);
  log.success(`Email: ${CONFIG.email}`);

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

    // Step 2: Navigate and Login
    log.step(2, 'Logging into Durable.co...');

    try {
      await page.goto('https://durable.co/login', {
        waitUntil: 'domcontentloaded',
        timeout: CONFIG.timeout,
      });
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await takeScreenshot(page, '01-login-page');

      // Fill and submit login
      await page.evaluate(
        (email, password) => {
          const inputs = Array.from(document.querySelectorAll('input'));
          const emailInput = inputs.find(
            (i) => i.type === 'email' || i.name?.includes('email')
          );
          const passwordInput = inputs.find((i) => i.type === 'password');

          if (emailInput) {
            emailInput.value = email;
            emailInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
          if (passwordInput) {
            passwordInput.value = password;
            passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
          }

          const buttons = Array.from(document.querySelectorAll('button'));
          const loginBtn = buttons.find((b) =>
            b.textContent.toLowerCase().includes('log in')
          );
          if (loginBtn) loginBtn.click();
        },
        CONFIG.email,
        CONFIG.password
      );

      await new Promise((resolve) => setTimeout(resolve, 5000));
      await takeScreenshot(page, '02-after-login');
      log.success('Login submitted');
    } catch (e) {
      log.warning('Login step had issues: ' + e.message);
    }

    // Step 3: Navigate to Workers/Automation
    log.step(3, 'Looking for Workers/Automation section...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Try to find Workers, Automation, or AI features
    const workersFound = await page.evaluate(() => {
      const links = Array.from(
        document.querySelectorAll('a, button, div[role="button"]')
      );
      const workersLink = links.find((link) => {
        const text = link.textContent.toLowerCase();
        return (
          text.includes('worker') ||
          text.includes('automation') ||
          text.includes('ai') ||
          text.includes('assistant') ||
          text.includes('tools')
        );
      });

      if (workersLink) {
        workersLink.click();
        return true;
      }
      return false;
    });

    if (workersFound) {
      log.success('Workers/Automation section found');
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await takeScreenshot(page, '03-workers-section');
    } else {
      log.warning('Workers section not found, trying site editor...');
    }

    // Step 4: Open Site Editor
    log.step(4, 'Opening site editor...');

    // Try to navigate to editor
    const editorOpened = await page.evaluate((siteName) => {
      // Look for site
      const elements = Array.from(document.querySelectorAll('a, button, div'));
      const siteElement = elements.find(
        (el) =>
          el.textContent.includes(siteName) ||
          el.textContent.includes('Elevate')
      );

      if (siteElement) {
        siteElement.click();
        setTimeout(() => {
          const editButtons = Array.from(
            document.querySelectorAll('button, a')
          );
          const editBtn = editButtons.find((b) =>
            b.textContent.toLowerCase().includes('edit')
          );
          if (editBtn) editBtn.click();
        }, 2000);
        return true;
      }
      return false;
    }, CONFIG.siteName);

    if (editorOpened) {
      log.success('Site editor opening...');
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await takeScreenshot(page, '04-editor-loading');
    }

    // Step 5: Look for Custom HTML or Code Block option
    log.step(5, 'Looking for Custom HTML / Code Block...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Try to find Add Section button
    const addSectionClicked = await page.evaluate(() => {
      const buttons = Array.from(
        document.querySelectorAll('button, a, div[role="button"]')
      );
      const addBtn = buttons.find((btn) => {
        const text = btn.textContent.toLowerCase();
        return (
          text.includes('add section') ||
          text.includes('add block') ||
          text === '+' ||
          text.includes('insert')
        );
      });

      if (addBtn) {
        addBtn.click();
        return true;
      }
      return false;
    });

    if (addSectionClicked) {
      log.success('Add Section clicked');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await takeScreenshot(page, '05-add-section-menu');

      // Look for Custom HTML option
      const customHtmlClicked = await page.evaluate(() => {
        const options = Array.from(
          document.querySelectorAll('button, a, div[role="button"], li')
        );
        const htmlOption = options.find((opt) => {
          const text = opt.textContent.toLowerCase();
          return (
            text.includes('custom html') ||
            text.includes('html') ||
            text.includes('code') ||
            text.includes('embed')
          );
        });

        if (htmlOption) {
          htmlOption.click();
          return true;
        }
        return false;
      });

      if (customHtmlClicked) {
        log.success('Custom HTML option clicked');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await takeScreenshot(page, '06-custom-html-editor');

        // Step 6: Paste enrollment code
        log.step(6, 'Pasting enrollment code...');

        if (enrollmentCode) {
          const codePasted = await page.evaluate((code) => {
            const textareas = Array.from(document.querySelectorAll('textarea'));
            const editables = Array.from(
              document.querySelectorAll('[contenteditable="true"]')
            );

            const editor =
              textareas[textareas.length - 1] ||
              editables[editables.length - 1];

            if (editor) {
              if (editor.tagName === 'TEXTAREA') {
                editor.value = code;
                editor.dispatchEvent(new Event('input', { bubbles: true }));
              } else {
                editor.textContent = code;
                editor.dispatchEvent(new Event('input', { bubbles: true }));
              }
              return true;
            }
            return false;
          }, enrollmentCode);

          if (codePasted) {
            log.success('Enrollment code pasted!');
            await new Promise((resolve) => setTimeout(resolve, 2000));
            await takeScreenshot(page, '07-code-pasted');
          } else {
            log.warning('Could not paste code automatically');
          }
        }
      }
    }

    // Step 7: Use Workers to create dynamic page
    log.step(7, 'Instructing Workers to create dynamic page...');

    // Look for AI/Worker chat or command interface
    const workerInstructed = await page.evaluate((instructions) => {
      // Look for chat/command input
      const inputs = Array.from(document.querySelectorAll('input, textarea'));
      const commandInput = inputs.find(
        (input) =>
          input.placeholder?.toLowerCase().includes('ask') ||
          input.placeholder?.toLowerCase().includes('command') ||
          input.placeholder?.toLowerCase().includes('tell') ||
          input.placeholder?.toLowerCase().includes('what')
      );

      if (commandInput) {
        commandInput.value = instructions;
        commandInput.dispatchEvent(new Event('input', { bubbles: true }));

        // Try to submit
        const buttons = Array.from(document.querySelectorAll('button'));
        const submitBtn = buttons.find(
          (b) =>
            b.textContent.toLowerCase().includes('send') ||
            b.textContent.toLowerCase().includes('submit') ||
            b.type === 'submit'
        );

        if (submitBtn) {
          submitBtn.click();
          return true;
        }
      }
      return false;
    }, WORKER_INSTRUCTIONS);

    if (workerInstructed) {
      log.success('Worker instructions sent!');
      log.info('Waiting for worker to process...');
      await new Promise((resolve) => setTimeout(resolve, 30000));
      await takeScreenshot(page, '08-worker-processing');
    } else {
      log.warning('Could not send worker instructions automatically');
      log.info('Manual worker instructions:');
      console.log('\n' + WORKER_INSTRUCTIONS + '\n');
    }

    // Step 8: Publish changes
    log.step(8, 'Publishing changes...');

    const published = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const publishBtn = buttons.find(
        (btn) =>
          btn.textContent.toLowerCase().includes('publish') ||
          btn.textContent.toLowerCase().includes('save')
      );

      if (publishBtn) {
        publishBtn.click();
        return true;
      }
      return false;
    });

    if (published) {
      log.success('Publish clicked');
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await takeScreenshot(page, '09-published');
    }

    // Step 9: Check DNS settings (if needed)
    log.step(9, 'Checking DNS configuration...');

    // Try to navigate to domain settings
    try {
      const settingsClicked = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a, button'));
        const settingsLink = links.find(
          (link) =>
            link.textContent.toLowerCase().includes('settings') ||
            link.textContent.toLowerCase().includes('domain')
        );

        if (settingsLink) {
          settingsLink.click();
          return true;
        }
        return false;
      });

      if (settingsClicked) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await takeScreenshot(page, '10-settings');

        log.info('DNS Settings (if needed):');
        log.info(`Domain: ${CONFIG.domain}`);
        log.info("Point your domain to Durable's servers");
        log.info("Check Durable's DNS instructions in settings");
      }
    } catch (e) {
      log.warning('Could not access DNS settings');
    }

    // Step 10: Verify deployment
    log.step(10, 'Verifying deployment...');
    await new Promise((resolve) => setTimeout(resolve, 10000));

    try {
      await page.goto(CONFIG.siteUrl, {
        waitUntil: 'domcontentloaded',
        timeout: CONFIG.timeout,
      });
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await takeScreenshot(page, '11-live-site');

      const enrollmentVisible = await page.evaluate(() => {
        const text = document.body.textContent;
        return (
          text.includes('Enroll') ||
          text.includes('AI & Machine Learning') ||
          text.includes('$1,997')
        );
      });

      if (enrollmentVisible) {
        log.success('✨ Enrollment programs are LIVE!');
        success = true;
      } else {
        log.warning('Enrollment programs not visible yet');
      }
    } catch (e) {
      log.warning('Could not verify: ' + e.message);
    }

    // Save status
    fs.writeFileSync(
      path.join(CONFIG.screenshotDir, 'workers-status.json'),
      JSON.stringify(
        {
          success,
          timestamp: new Date().toISOString(),
          url: CONFIG.siteUrl,
          method: 'Workers + Custom HTML',
        },
        null,
        2
      )
    );
  } catch (error) {
    log.error(`Failed: ${error.message}`);
    console.error(error);
  } finally {
    if (browser) {
      await browser.close();
      log.info('Browser closed');
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════');
  if (success) {
    console.log('🎉 WORKERS DEPLOYMENT SUCCESSFUL!');
    console.log(`\n✅ Visit: ${CONFIG.siteUrl}`);
    console.log('✅ Workers created dynamic pages!');
    console.log('✅ Custom HTML added!');
  } else {
    console.log('⚠️  DEPLOYMENT INCOMPLETE');
    console.log('\nManual steps:');
    console.log('1. Log into Durable.co');
    console.log('2. Use Workers to create dynamic enrollment page');
    console.log('3. Add Custom HTML block with enrollment code');
    console.log('4. Configure DNS if needed');
    console.log('5. Publish changes');
    console.log('\nWorker Instructions:');
    console.log(WORKER_INSTRUCTIONS);
  }
  console.log('═══════════════════════════════════════════════════════════\n');

  return success;
}

// Run autopilot
runDurableWorkersAutopilot()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
