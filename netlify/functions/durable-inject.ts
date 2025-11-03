import type { Handler, HandlerEvent } from '@netlify/functions';
import puppeteer from 'puppeteer';

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email, password } = JSON.parse(event.body || '{}');

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email and password required' }),
      };
    }

    const scriptUrl =
      'https://main--elevateforhumanityfix.netlify.app/enrollment-injector.js';
    const scriptTag = `<script src="${scriptUrl}" defer></script>`;

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // Login to Durable
    await page.goto('https://durable.co/login', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    // Try multiple selectors for email field
    const emailSelectors = [
      'input[type="email"]',
      'input[name="email"]',
      'input[placeholder*="email" i]',
      '#email',
    ];

    let emailField = null;
    for (const selector of emailSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 3000 });
        emailField = selector;
        break;
      } catch (e) {
        continue;
      }
    }

    if (!emailField) {
      await browser.close();
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Could not find email field on Durable login page',
        }),
      };
    }

    await page.type(emailField, email);

    // Find password field
    const passwordSelectors = [
      'input[type="password"]',
      'input[name="password"]',
      '#password',
    ];

    let passwordField = null;
    for (const selector of passwordSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 3000 });
        passwordField = selector;
        break;
      } catch (e) {
        continue;
      }
    }

    if (!passwordField) {
      await browser.close();
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Could not find password field on Durable login page',
        }),
      };
    }

    await page.type(passwordField, password);

    // Submit login
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }),
      page.click('button[type="submit"]'),
    ]);

    // Wait for dashboard
    await page.waitForTimeout(5000);

    // Look for editor or website link
    const editorLink = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const editor = links.find(
        (a) =>
          a.href.includes('editor') ||
          a.textContent?.toLowerCase().includes('edit') ||
          a.textContent?.toLowerCase().includes('website')
      );
      return editor ? editor.href : null;
    });

    if (editorLink) {
      await page.goto(editorLink, { waitUntil: 'networkidle2' });
      await page.waitForTimeout(5000);
    }

    // Try to find and click settings/custom code
    const settingsClicked = await page.evaluate(() => {
      const buttons = Array.from(
        document.querySelectorAll('button, a, [role="button"]')
      );
      const settings = buttons.find(
        (b) =>
          b.textContent?.toLowerCase().includes('settings') ||
          b.textContent?.toLowerCase().includes('custom') ||
          b.textContent?.toLowerCase().includes('code')
      );
      if (settings) {
        (settings as HTMLElement).click();
        return true;
      }
      return false;
    });

    if (settingsClicked) {
      await page.waitForTimeout(3000);
    }

    // Try to inject script into any textarea or contenteditable
    const injected = await page.evaluate((script) => {
      const textareas = Array.from(document.querySelectorAll('textarea'));
      const editables = Array.from(
        document.querySelectorAll('[contenteditable="true"]')
      );

      const allFields = [...textareas, ...editables];

      for (const field of allFields) {
        const currentValue =
          field instanceof HTMLTextAreaElement
            ? field.value
            : field.textContent || '';

        if (!currentValue.includes('enrollment-injector.js')) {
          if (field instanceof HTMLTextAreaElement) {
            field.value = currentValue + '\n' + script;
          } else {
            field.textContent = currentValue + '\n' + script;
          }

          // Trigger change event
          field.dispatchEvent(new Event('input', { bubbles: true }));
          field.dispatchEvent(new Event('change', { bubbles: true }));

          return true;
        }
      }
      return false;
    }, scriptTag);

    if (injected) {
      // Try to find and click save/publish button
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const saveBtn = buttons.find(
          (b) =>
            b.textContent?.toLowerCase().includes('save') ||
            b.textContent?.toLowerCase().includes('publish') ||
            b.textContent?.toLowerCase().includes('update')
        );
        if (saveBtn) {
          (saveBtn as HTMLElement).click();
        }
      });

      await page.waitForTimeout(3000);
    }

    await browser.close();

    if (injected) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Enrollment script injected successfully',
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error:
            'Could not find code injection field. Please add script manually.',
          scriptTag,
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        details: 'Puppeteer automation failed',
      }),
    };
  }
};

export { handler };
