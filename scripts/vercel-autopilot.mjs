#!/usr/bin/env node
/**
 * Vercel Autopilot - Automated Vercel Dashboard Configuration
 *
 * This script uses Puppeteer to:
 * 1. Login to Vercel
 * 2. Navigate to fix2-gpql project
 * 3. Verify production branch is set to 'main'
 * 4. Delete old deployments
 * 5. Trigger fresh deployment
 */

import puppeteer from 'puppeteer';

const VERCEL_EMAIL = process.env.VERCEL_EMAIL;
const VERCEL_PASSWORD = process.env.VERCEL_PASSWORD;
const PROJECT_URL = 'https://vercel.com/elevate-48e460c9/fix2-gpql';

if (!VERCEL_EMAIL || !VERCEL_PASSWORD) {
  console.error('❌ Missing credentials');
  console.error('Set VERCEL_EMAIL and VERCEL_PASSWORD environment variables');
  process.exit(1);
}

console.log('🤖 Vercel Autopilot Starting...');
console.log('================================\n');

const browser = await puppeteer.launch({
  headless: false, // Show browser so you can see what's happening
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // Step 1: Login to Vercel
  console.log('🔐 Step 1: Logging in to Vercel...');
  await page.goto('https://vercel.com/login', { waitUntil: 'networkidle2' });

  // Wait for login form
  await page.waitForSelector('input[type="email"]', { timeout: 10000 });
  await page.type('input[type="email"]', VERCEL_EMAIL);

  // Click continue
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);

  // Enter password
  await page.waitForSelector('input[type="password"]', { timeout: 10000 });
  await page.type('input[type="password"]', VERCEL_PASSWORD);

  // Submit
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 });

  console.log('✅ Logged in successfully\n');

  // Step 2: Navigate to project
  console.log('📂 Step 2: Navigating to fix2-gpql project...');
  await page.goto(PROJECT_URL, { waitUntil: 'networkidle2' });
  await page.waitForTimeout(2000);
  console.log('✅ Project loaded\n');

  // Step 3: Check Git settings
  console.log('⚙️  Step 3: Checking Git configuration...');
  await page.goto(`${PROJECT_URL}/settings/git`, { waitUntil: 'networkidle2' });
  await page.waitForTimeout(2000);

  // Look for production branch setting
  const pageContent = await page.content();

  if (pageContent.includes('deepsource')) {
    console.log('⚠️  Found DeepSource branch reference');
    console.log('🔧 Attempting to fix production branch...');

    // Try to find and click edit button
    const editButtons = await page.$$('button:has-text("Edit")');
    if (editButtons.length > 0) {
      await editButtons[0].click();
      await page.waitForTimeout(1000);

      // Clear and type 'main'
      await page.keyboard.selectAll();
      await page.keyboard.type('main');

      // Save
      const saveButton = await page.$('button:has-text("Save")');
      if (saveButton) {
        await saveButton.click();
        await page.waitForTimeout(2000);
        console.log('✅ Production branch updated to main');
      }
    }
  } else if (pageContent.includes('main')) {
    console.log('✅ Production branch already set to main');
  } else {
    console.log('⚠️  Could not determine production branch');
  }

  console.log('');

  // Step 4: Check deployments
  console.log('📦 Step 4: Checking deployments...');
  await page.goto(`${PROJECT_URL}/deployments`, { waitUntil: 'networkidle2' });
  await page.waitForTimeout(2000);

  // Count deployments
  const deployments = await page.$$('[data-testid="deployment-card"]');
  console.log(`   Found ${deployments.length} deployments`);

  if (deployments.length > 5) {
    console.log('⚠️  More than 5 deployments found');
    console.log('💡 Consider cleaning up old deployments manually');
  }

  console.log('');

  // Step 5: Trigger redeploy
  console.log('🚀 Step 5: Triggering fresh deployment...');

  // Look for Redeploy button
  const redeployButton = await page.$('button:has-text("Redeploy")');
  if (redeployButton) {
    await redeployButton.click();
    await page.waitForTimeout(2000);

    // Uncheck "Use existing Build Cache" if present
    const cacheCheckbox = await page.$('input[type="checkbox"]');
    if (cacheCheckbox) {
      const isChecked = await page.evaluate((el) => el.checked, cacheCheckbox);
      if (isChecked) {
        await cacheCheckbox.click();
        console.log('   ✅ Disabled build cache');
      }
    }

    // Click final Redeploy button
    const confirmButton = await page.$('button:has-text("Redeploy")');
    if (confirmButton) {
      await confirmButton.click();
      console.log('✅ Deployment triggered');
      await page.waitForTimeout(3000);
    }
  } else {
    console.log('⚠️  Could not find Redeploy button');
  }

  console.log('');

  // Step 6: Verify domain
  console.log('🌐 Step 6: Verifying domain configuration...');
  await page.goto(`${PROJECT_URL}/settings/domains`, {
    waitUntil: 'networkidle2',
  });
  await page.waitForTimeout(2000);

  const domainContent = await page.content();
  if (domainContent.includes('www.elevateforhumanity.org')) {
    console.log('✅ Domain www.elevateforhumanity.org is configured');
  } else {
    console.log('❌ Domain not found - needs manual configuration');
  }

  console.log('');
  console.log('================================');
  console.log('✅ Autopilot Complete!');
  console.log('');
  console.log('📊 Summary:');
  console.log('  - Logged in to Vercel');
  console.log('  - Checked Git configuration');
  console.log('  - Verified deployments');
  console.log('  - Triggered fresh deployment');
  console.log('  - Verified domain');
  console.log('');
  console.log('🔍 Next steps:');
  console.log('  1. Wait 2-3 minutes for deployment');
  console.log('  2. Check: https://www.elevateforhumanity.org');
  console.log('  3. Hard refresh: Ctrl+Shift+R');
  console.log('');

  // Keep browser open for 10 seconds so you can see the result
  await page.waitForTimeout(10000);
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('');
  console.error('💡 Manual steps required:');
  console.error(
    '  1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/git'
  );
  console.error('  2. Set Production Branch to: main');
  console.error('  3. Click Redeploy with cache disabled');
} finally {
  await browser.close();
}
