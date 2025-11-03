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
      await browser.close();

      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Enrollment script injected successfully',
        }),
      };
    }

    // If injection field not found, try alternative methods
    console.log('Injection field not found, trying alternative methods...');

    // Method 2: Try to add HTML block via UI
    const htmlBlockAdded = await page.evaluate((script) => {
      // Look for "Add" or "+" buttons
      const buttons = Array.from(document.querySelectorAll('button, [role="button"]'));
      const addBtn = buttons.find(
        (b) =>
          b.textContent?.toLowerCase().includes('add') ||
          b.textContent?.toLowerCase().includes('+') ||
          b.textContent?.toLowerCase().includes('block')
      );

      if (addBtn) {
        (addBtn as HTMLElement).click();
        return true;
      }
      return false;
    }, scriptTag);

    if (htmlBlockAdded) {
      await page.waitForTimeout(2000);

      // Try to find HTML/Custom Code option
      const htmlOptionClicked = await page.evaluate(() => {
        const options = Array.from(document.querySelectorAll('button, div, [role="button"]'));
        const htmlOption = options.find(
          (o) =>
            o.textContent?.toLowerCase().includes('html') ||
            o.textContent?.toLowerCase().includes('custom') ||
            o.textContent?.toLowerCase().includes('code')
        );

        if (htmlOption) {
          (htmlOption as HTMLElement).click();
          return true;
        }
        return false;
      });

      if (htmlOptionClicked) {
        await page.waitForTimeout(2000);

        // Try to inject into newly opened field
        const injectedInNewField = await page.evaluate((script) => {
          const textareas = Array.from(document.querySelectorAll('textarea'));
          const editables = Array.from(document.querySelectorAll('[contenteditable="true"]'));
          const allFields = [...textareas, ...editables];

          for (const field of allFields) {
            if (field instanceof HTMLTextAreaElement) {
              field.value = script;
            } else {
              field.textContent = script;
            }
            field.dispatchEvent(new Event('input', { bubbles: true }));
            field.dispatchEvent(new Event('change', { bubbles: true }));
            return true;
          }
          return false;
        }, scriptTag);

        if (injectedInNewField) {
          // Click save
          await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const saveBtn = buttons.find(
              (b) =>
                b.textContent?.toLowerCase().includes('save') ||
                b.textContent?.toLowerCase().includes('done') ||
                b.textContent?.toLowerCase().includes('add')
            );
            if (saveBtn) {
              (saveBtn as HTMLElement).click();
            }
          });

          await page.waitForTimeout(3000);
          await browser.close();

          return {
            statusCode: 200,
            body: JSON.stringify({
              success: true,
              message: 'Enrollment script injected via HTML block',
            }),
          };
        }
      }
    }

    // Method 3: Use Durable AI to add the script
    const aiPromptSent = await page.evaluate((script) => {
      // Look for AI chat or command input
      const inputs = Array.from(document.querySelectorAll('input[type="text"], textarea'));
      const aiInput = inputs.find(
        (i) =>
          i.placeholder?.toLowerCase().includes('ask') ||
          i.placeholder?.toLowerCase().includes('ai') ||
          i.placeholder?.toLowerCase().includes('command')
      );

      if (aiInput) {
        const prompt = `Add this custom HTML code to the homepage: ${script}`;
        if (aiInput instanceof HTMLInputElement) {
          aiInput.value = prompt;
        } else if (aiInput instanceof HTMLTextAreaElement) {
          aiInput.value = prompt;
        }
        aiInput.dispatchEvent(new Event('input', { bubbles: true }));

        // Try to submit
        const form = aiInput.closest('form');
        if (form) {
          form.dispatchEvent(new Event('submit', { bubbles: true }));
          return true;
        }

        // Or find submit button
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) {
          (submitBtn as HTMLElement).click();
          return true;
        }
      }
      return false;
    }, scriptTag);

    if (aiPromptSent) {
      await page.waitForTimeout(5000);
      await browser.close();

      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Sent script to Durable AI for injection',
        }),
      };
    }

    // If all methods fail, save screenshot and return instructions
    const screenshot = await page.screenshot({ encoding: 'base64', fullPage: false });
    await browser.close();

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Could not automatically inject script. Manual step required.',
        scriptTag,
        instructions: [
          '1. Go to Durable.co editor',
          '2. Click "Add" or "+" button',
          '3. Select "Custom HTML" or "Code Block"',
          '4. Paste the script tag',
          '5. Save and publish',
        ],
        screenshot: `data:image/png;base64,${screenshot}`,
      }),
    };
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
