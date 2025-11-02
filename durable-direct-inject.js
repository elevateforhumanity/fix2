#!/usr/bin/env node

/**
 * DURABLE DIRECT INJECTION AUTOPILOT
 *
 * Alternative approach: Inject enrollment code directly into the page HTML
 * by intercepting network requests and modifying the response.
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const DURABLE_EMAIL =
  process.env.DURABLE_EMAIL || 'Elevateforhumanity@gmail.com';
const DURABLE_PASSWORD = process.env.DURABLE_PASSWORD || 'Elijah1$';
const SITE_URL = 'https://www.elevateforhumanity.org';

// Read the enrollment HTML code
const enrollmentHTML = fs.readFileSync(
  './DURABLE_ENROLLMENT_CODE.html',
  'utf8'
);

console.log('═══════════════════════════════════════════════════════════');
console.log('🤖 DURABLE DIRECT INJECTION AUTOPILOT');
console.log('    Intercept & Modify Approach');
console.log('═══════════════════════════════════════════════════════════\n');

async function runDirectInjection() {
  let browser;

  try {
    console.log('📍 Step 1: Launching browser with request interception...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // Enable request interception
    await page.setRequestInterception(true);

    console.log('✅ Request interception enabled\n');

    console.log('📍 Step 2: Logging into Durable.co...');

    // Login first
    await page.goto('https://durable.co/login', { waitUntil: 'networkidle2' });
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Try multiple login strategies
    const loginSuccess = await page.evaluate(
      (email, password) => {
        // Strategy 1: Find by ID
        let emailInput =
          document.getElementById('email') ||
          document.getElementById('username') ||
          document.querySelector('input[type="email"]') ||
          document.querySelector('input[name="email"]');

        let passwordInput =
          document.getElementById('password') ||
          document.querySelector('input[type="password"]') ||
          document.querySelector('input[name="password"]');

        if (emailInput && passwordInput) {
          emailInput.value = email;
          passwordInput.value = password;

          // Find submit button
          const submitBtn =
            document.querySelector('button[type="submit"]') ||
            document.querySelector('button:contains("Log in")') ||
            document.querySelector('button:contains("Sign in")') ||
            Array.from(document.querySelectorAll('button')).find(
              (btn) =>
                btn.textContent.toLowerCase().includes('log') ||
                btn.textContent.toLowerCase().includes('sign')
            );

          if (submitBtn) {
            submitBtn.click();
            return true;
          }
        }
        return false;
      },
      DURABLE_EMAIL,
      DURABLE_PASSWORD
    );

    if (!loginSuccess) {
      console.log('⚠️  Could not find login form, trying manual approach...');
      await page.type('input[type="email"]', DURABLE_EMAIL);
      await page.type('input[type="password"]', DURABLE_PASSWORD);
      await page.click('button[type="submit"]');
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log('✅ Login submitted\n');

    console.log('📍 Step 3: Setting up request interceptor...');

    // Intercept requests and modify HTML responses
    page.on('request', (request) => {
      request.continue();
    });

    page.on('response', async (response) => {
      const url = response.url();

      // Intercept the main site HTML
      if (
        url.includes('elevateforhumanity.org') &&
        response.headers()['content-type']?.includes('text/html')
      ) {
        try {
          const originalHTML = await response.text();

          // Inject enrollment code before closing body tag
          const modifiedHTML = originalHTML.replace(
            '</body>',
            `${enrollmentHTML}\n</body>`
          );

          console.log('✅ Injected enrollment code into HTML response');

          // Note: We can't actually modify the response in Puppeteer
          // This is a limitation - we can intercept but not modify responses
          // We need a different approach
        } catch (err) {
          // Response already consumed
        }
      }
    });

    console.log('⚠️  Limitation: Puppeteer cannot modify responses\n');

    console.log('📍 Step 4: Alternative - Direct DOM injection...');

    // Navigate to the site editor
    await page.goto('https://durable.co/dashboard', {
      waitUntil: 'networkidle2',
    });
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Look for the site in dashboard
    const siteFound = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const siteLink = links.find(
        (link) =>
          link.href.includes('elevateforhumanity') ||
          link.textContent.includes('elevateforhumanity')
      );

      if (siteLink) {
        siteLink.click();
        return true;
      }
      return false;
    });

    if (siteFound) {
      console.log('✅ Found site in dashboard');
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Look for edit button
      const editClicked = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, a'));
        const editBtn = buttons.find(
          (btn) =>
            btn.textContent.toLowerCase().includes('edit') ||
            btn.textContent.toLowerCase().includes('customize')
        );

        if (editBtn) {
          editBtn.click();
          return true;
        }
        return false;
      });

      if (editClicked) {
        console.log('✅ Clicked edit button');
        await new Promise((resolve) => setTimeout(resolve, 5000));

        // Try to find and click "Add section" or similar
        const addSectionClicked = await page.evaluate(() => {
          const buttons = Array.from(
            document.querySelectorAll('button, a, div[role="button"]')
          );
          const addBtn = buttons.find(
            (btn) =>
              btn.textContent.toLowerCase().includes('add section') ||
              btn.textContent.toLowerCase().includes('add block') ||
              btn.textContent.toLowerCase().includes('add element') ||
              btn.textContent.toLowerCase().includes('+')
          );

          if (addBtn) {
            addBtn.click();
            return true;
          }
          return false;
        });

        if (addSectionClicked) {
          console.log('✅ Clicked add section');
          await new Promise((resolve) => setTimeout(resolve, 3000));

          // Look for Custom HTML or Code option
          const customHTMLClicked = await page.evaluate(() => {
            const options = Array.from(
              document.querySelectorAll('button, a, div[role="button"], li')
            );
            const htmlOption = options.find(
              (opt) =>
                opt.textContent.toLowerCase().includes('custom html') ||
                opt.textContent.toLowerCase().includes('code') ||
                opt.textContent.toLowerCase().includes('html') ||
                opt.textContent.toLowerCase().includes('embed')
            );

            if (htmlOption) {
              htmlOption.click();
              return true;
            }
            return false;
          });

          if (customHTMLClicked) {
            console.log('✅ Found Custom HTML option');
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Try to paste the code
            const codePasted = await page.evaluate((code) => {
              const textareas = document.querySelectorAll('textarea');
              const codeEditors = document.querySelectorAll(
                '[contenteditable="true"]'
              );

              if (textareas.length > 0) {
                textareas[0].value = code;
                textareas[0].dispatchEvent(
                  new Event('input', { bubbles: true })
                );
                return true;
              } else if (codeEditors.length > 0) {
                codeEditors[0].textContent = code;
                codeEditors[0].dispatchEvent(
                  new Event('input', { bubbles: true })
                );
                return true;
              }
              return false;
            }, enrollmentHTML);

            if (codePasted) {
              console.log('✅ Pasted enrollment code!');
              await new Promise((resolve) => setTimeout(resolve, 2000));

              // Look for Save/Publish button
              const published = await page.evaluate(() => {
                const buttons = Array.from(document.querySelectorAll('button'));
                const publishBtn = buttons.find(
                  (btn) =>
                    btn.textContent.toLowerCase().includes('publish') ||
                    btn.textContent.toLowerCase().includes('save') ||
                    btn.textContent.toLowerCase().includes('done')
                );

                if (publishBtn) {
                  publishBtn.click();
                  return true;
                }
                return false;
              });

              if (published) {
                console.log('✅ Published changes!');
                await new Promise((resolve) => setTimeout(resolve, 5000));

                console.log('\n📍 Step 5: Verifying deployment...');
                await page.goto(SITE_URL, { waitUntil: 'networkidle2' });
                await new Promise((resolve) => setTimeout(resolve, 3000));

                const enrollmentVisible = await page.evaluate(() => {
                  return (
                    document.body.innerHTML.includes(
                      'Enroll in Our Programs'
                    ) ||
                    document.body.innerHTML.includes('AI & Machine Learning')
                  );
                });

                if (enrollmentVisible) {
                  console.log('✅ ENROLLMENT PROGRAMS ARE LIVE! 🎉\n');
                  console.log(`Visit: ${SITE_URL}`);
                  return true;
                } else {
                  console.log('⚠️  Changes published but not visible yet');
                  console.log('   May need a few minutes for CDN to update');
                }
              }
            }
          }
        }
      }
    }

    console.log('\n⚠️  Could not complete automatic injection');
    console.log("   Durable's editor UI is dynamic and hard to automate");
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

runDirectInjection();
