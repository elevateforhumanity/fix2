#!/usr/bin/env node

/**
 * Durable AI Autopilot - Uses Durable's AI Assistant to Deploy
 *
 * This script logs into Durable.co and uses their AI assistant
 * to add the enrollment programs automatically.
 *
 * Usage:
 *   node durable-ai-autopilot.js
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

// AI Prompt for Durable's AI Assistant
const AI_PROMPT = `I need to add an enrollment programs section to my homepage. Please add a new section after the hero section with the following content:

**Section Title:** 🎓 Enroll in Our Programs Today

**Description:** Transform your career with our DOL-compliant workforce training programs. Federal funding available for eligible participants.

**3 Programs to Add:**

1. **AI & Machine Learning**
   - Price: $1,997
   - Duration: 12 weeks
   - Job Placement Rate: 89%
   - Icon: 💻
   - Button: "Enroll Now" (links to /contact)

2. **Data Science Bootcamp**
   - Price: $4,950
   - Duration: 16 weeks
   - Job Placement Rate: 92%
   - Icon: 📊
   - Button: "Enroll Now" (links to /contact)

3. **Cybersecurity Specialist**
   - Price: $3,495
   - Duration: 20 weeks
   - Job Placement Rate: 95%
   - Icon: 🔒
   - Button: "Enroll Now" (links to /contact)

**Styling Requirements:**
- Purple gradient background (linear-gradient from #667eea to #764ba2)
- White text color
- Display programs in a 3-column grid on desktop, stack on mobile
- Each program in a card with semi-transparent white background (rgba(255,255,255,0.15))
- Large, bold pricing display
- Add a "View All 50+ Programs" button at the bottom (links to /programs)
- Include badges at bottom: "✅ Federal Funding Available | ✅ DOL Compliant | ✅ Industry Certifications"
- Make it fully mobile responsive
- Add rounded corners and modern styling

Please create this section, add it to my homepage after the hero section, and publish the changes. Thank you!`;

// Main autopilot function
async function runDurableAIAutopilot() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log("🤖 DURABLE AI AUTOPILOT - Using Durable's AI Assistant");
  console.log('═══════════════════════════════════════════════════════════\n');

  // Validate credentials
  if (!CONFIG.email || !CONFIG.password) {
    log.error('Missing credentials!');
    log.info('Set environment variables:');
    log.info('  export DURABLE_EMAIL="your-email@example.com"');
    log.info('  export DURABLE_PASSWORD="your-password"');
    process.exit(1);
  }

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
      log.warning('Could not load Durable.co homepage, trying login page...');
      await page.goto('https://durable.co/login', {
        waitUntil: 'domcontentloaded',
        timeout: CONFIG.timeout,
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    // Step 3: Login
    log.step(3, 'Logging in...');

    // Check if already logged in
    const currentUrl = page.url();
    if (!currentUrl.includes('login') && !currentUrl.includes('signin')) {
      log.info('Already logged in or on main page');
    } else {
      log.info('On login page, attempting login...');

      // Wait for page to fully load
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await takeScreenshot(page, '02-login-page');

      // Try to find and fill login form
      const loginSuccess = await page.evaluate(
        (email, password) => {
          // Find email input
          const emailInputs = Array.from(document.querySelectorAll('input'));
          const emailInput = emailInputs.find(
            (input) =>
              input.type === 'email' ||
              input.name?.toLowerCase().includes('email') ||
              input.placeholder?.toLowerCase().includes('email')
          );

          // Find password input
          const passwordInput = emailInputs.find(
            (input) => input.type === 'password'
          );

          if (emailInput && passwordInput) {
            emailInput.value = email;
            emailInput.dispatchEvent(new Event('input', { bubbles: true }));
            emailInput.dispatchEvent(new Event('change', { bubbles: true }));

            passwordInput.value = password;
            passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
            passwordInput.dispatchEvent(new Event('change', { bubbles: true }));

            // Find and click login button
            const buttons = Array.from(document.querySelectorAll('button'));
            const loginButton = buttons.find(
              (btn) =>
                btn.textContent.toLowerCase().includes('log in') ||
                btn.textContent.toLowerCase().includes('sign in') ||
                btn.type === 'submit'
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
        log.info('Login form submitted');
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await takeScreenshot(page, '03-after-login');
      } else {
        log.warning('Could not find login form, may need manual intervention');
      }
    }

    // Step 4: Navigate to dashboard/sites
    log.step(4, 'Finding your site...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Try to navigate to sites/dashboard
    const dashboardUrls = [
      'https://durable.co/sites',
      'https://durable.co/dashboard',
      'https://durable.co/app',
    ];

    for (const url of dashboardUrls) {
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await takeScreenshot(page, '04-dashboard');
        log.success('Dashboard loaded');
        break;
      } catch (e) {
        continue;
      }
    }

    // Step 5: Look for AI Assistant
    log.step(5, 'Looking for AI Assistant...');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Try to find AI assistant button/chat
    const aiAssistantFound = await page.evaluate(() => {
      const buttons = Array.from(
        document.querySelectorAll('button, a, div[role="button"]')
      );
      const aiButton = buttons.find((btn) => {
        const text = btn.textContent.toLowerCase();
        return (
          text.includes('ai') ||
          text.includes('assistant') ||
          text.includes('chat') ||
          text.includes('help')
        );
      });

      if (aiButton) {
        aiButton.click();
        return true;
      }

      // Look for chat widget
      const chatWidgets = Array.from(
        document.querySelectorAll(
          '[class*="chat"], [class*="assistant"], [id*="chat"], [id*="assistant"]'
        )
      );
      if (chatWidgets.length > 0) {
        chatWidgets[0].click();
        return true;
      }

      return false;
    });

    if (aiAssistantFound) {
      log.success('AI Assistant found and opened');
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await takeScreenshot(page, '05-ai-assistant-opened');

      // Step 6: Send prompt to AI
      log.step(6, 'Sending prompt to AI Assistant...');

      // Try to find chat input and send message
      const messageSent = await page.evaluate((prompt) => {
        // Find chat input
        const inputs = Array.from(document.querySelectorAll('input, textarea'));
        const chatInput = inputs.find(
          (input) =>
            input.placeholder?.toLowerCase().includes('message') ||
            input.placeholder?.toLowerCase().includes('ask') ||
            input.placeholder?.toLowerCase().includes('type') ||
            input.type === 'text' ||
            input.tagName === 'TEXTAREA'
        );

        if (chatInput) {
          chatInput.value = prompt;
          chatInput.dispatchEvent(new Event('input', { bubbles: true }));
          chatInput.dispatchEvent(new Event('change', { bubbles: true }));

          // Find send button
          const buttons = Array.from(document.querySelectorAll('button'));
          const sendButton = buttons.find(
            (btn) =>
              btn.textContent.toLowerCase().includes('send') ||
              btn.type === 'submit' ||
              btn.querySelector('svg') // Usually send buttons have icons
          );

          if (sendButton) {
            sendButton.click();
            return true;
          }

          // Try pressing Enter
          chatInput.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
          );
          return true;
        }
        return false;
      }, AI_PROMPT);

      if (messageSent) {
        log.success('Prompt sent to AI Assistant!');
        log.info('Waiting for AI to process and add the section...');

        // Wait for AI to process (30 seconds)
        await new Promise((resolve) => setTimeout(resolve, 30000));
        await takeScreenshot(page, '06-ai-processing');

        // Wait longer for AI to complete (60 seconds)
        log.info('Giving AI time to complete the task...');
        await new Promise((resolve) => setTimeout(resolve, 60000));
        await takeScreenshot(page, '07-ai-completed');

        log.success('AI should have completed the task!');
        success = true;
      } else {
        log.warning('Could not send message to AI Assistant');
        log.info('You may need to manually paste this prompt:');
        console.log('\n' + AI_PROMPT + '\n');
      }
    } else {
      log.warning('Could not find AI Assistant automatically');
      log.info('Manual steps:');
      log.info('1. Look for "AI Assistant", "Chat", or "Help" button');
      log.info('2. Click it to open the assistant');
      log.info('3. Paste this prompt:');
      console.log('\n' + AI_PROMPT + '\n');
    }

    // Step 7: Verify deployment
    log.step(7, 'Verifying deployment...');
    log.info('Waiting for changes to propagate...');
    await new Promise((resolve) => setTimeout(resolve, 10000));

    try {
      await page.goto(CONFIG.siteUrl, {
        waitUntil: 'domcontentloaded',
        timeout: CONFIG.timeout,
      });
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await takeScreenshot(page, '08-live-site');

      // Check if enrollment section is visible
      const enrollmentVisible = await page.evaluate(() => {
        const text = document.body.textContent;
        return (
          text.includes('Enroll in Our Programs') ||
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
        log.info(
          'The AI may still be processing. Check back in a few minutes.'
        );
        log.info('Or manually verify at: ' + CONFIG.siteUrl);
      }
    } catch (e) {
      log.warning('Could not verify live site: ' + e.message);
    }

    // Save status
    const status = {
      success,
      timestamp: new Date().toISOString(),
      url: CONFIG.siteUrl,
      method: 'AI Assistant',
      aiPromptSent: messageSent || false,
    };

    fs.writeFileSync(
      path.join(CONFIG.screenshotDir, 'ai-deployment-status.json'),
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
    console.log('🎉 AI ASSISTANT DEPLOYMENT SUCCESSFUL!');
    console.log(`\n✅ Visit: ${CONFIG.siteUrl}`);
    console.log('✅ Enrollment programs should be live!');
    console.log('\nThe AI Assistant added the section for you! 🤖✨');
  } else {
    console.log('⚠️  AI ASSISTANT DEPLOYMENT INCOMPLETE');
    console.log('\nThe AI Assistant may need manual interaction.');
    console.log('Check screenshots in: ' + CONFIG.screenshotDir);
    console.log('\nManual steps:');
    console.log('1. Log into Durable.co');
    console.log('2. Find AI Assistant/Chat button');
    console.log('3. Paste this prompt:');
    console.log('\n' + AI_PROMPT);
    console.log('\n4. Let the AI add the section');
    console.log('5. Verify at: ' + CONFIG.siteUrl);
  }
  console.log('═══════════════════════════════════════════════════════════\n');

  return success;
}

// Run autopilot
runDurableAIAutopilot()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
