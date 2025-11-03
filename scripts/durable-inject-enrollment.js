#!/usr/bin/env node

/**
 * Durable Autopilot - Inject Enrollment Script
 * Adds enrollment-injector.js to Durable site
 */

import puppeteer from 'puppeteer';

const CONFIG = {
  email: process.env.DURABLE_EMAIL || 'Elevateforhumanity@gmail.com',
  password: process.env.DURABLE_PASSWORD || 'Elijah1$',
  scriptUrl: 'https://main--elevateforhumanityfix.netlify.app/enrollment-injector.js',
  timeout: 120000,
};

const SCRIPT_TAG = `<script src="${CONFIG.scriptUrl}" defer></script>`;

async function injectEnrollmentScript() {
  console.log('🚀 Durable Autopilot - Injecting Enrollment Script');
  console.log('');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // Login to Durable
    console.log('🔐 Logging into Durable.co...');
    await page.goto('https://durable.co/login', { waitUntil: 'networkidle2' });
    
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });
    await page.type('input[type="email"]', CONFIG.email);
    await page.type('input[type="password"]', CONFIG.password);
    
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('button[type="submit"]'),
    ]);
    
    console.log('✅ Logged in');
    await page.waitForTimeout(3000);

    // Navigate to site editor
    console.log('📝 Opening site editor...');
    const editorUrl = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const editorLink = links.find(a => 
        a.href.includes('editor') || 
        a.textContent.includes('Edit') ||
        a.textContent.includes('Website')
      );
      return editorLink ? editorLink.href : null;
    });

    if (editorUrl) {
      await page.goto(editorUrl, { waitUntil: 'networkidle2' });
      console.log('✅ Editor opened');
    } else {
      console.log('⚠️  Could not find editor link');
    }

    await page.waitForTimeout(5000);

    // Look for settings or custom code section
    console.log('🔍 Looking for custom code section...');
    
    const settingsButton = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, a, [role="button"]'));
      const settings = buttons.find(b => 
        b.textContent.toLowerCase().includes('settings') ||
        b.textContent.toLowerCase().includes('custom') ||
        b.textContent.toLowerCase().includes('code') ||
        b.textContent.toLowerCase().includes('advanced')
      );
      return settings ? settings.textContent : null;
    });

    if (settingsButton) {
      console.log(`✅ Found: ${settingsButton}`);
      await page.evaluate((text) => {
        const buttons = Array.from(document.querySelectorAll('button, a, [role="button"]'));
        const btn = buttons.find(b => b.textContent === text);
        if (btn) btn.click();
      }, settingsButton);
      
      await page.waitForTimeout(3000);
    }

    // Try to find custom HTML or code injection field
    console.log('📝 Looking for code injection field...');
    
    const codeFields = await page.$$('textarea, [contenteditable="true"]');
    
    if (codeFields.length > 0) {
      console.log(`✅ Found ${codeFields.length} editable fields`);
      console.log('');
      console.log('⚠️  MANUAL STEP REQUIRED:');
      console.log('');
      console.log('Please add this code to the site:');
      console.log('─────────────────────────────────────');
      console.log(SCRIPT_TAG);
      console.log('─────────────────────────────────────');
      console.log('');
      console.log('Location: Custom HTML block or Site Settings > Custom Code');
      console.log('');
      console.log('Browser will stay open for 2 minutes...');
      
      await page.waitForTimeout(120000);
    } else {
      console.log('⚠️  Could not find code injection field');
      console.log('');
      console.log('Please manually add this script tag:');
      console.log(SCRIPT_TAG);
      console.log('');
      console.log('Browser will stay open for 2 minutes...');
      await page.waitForTimeout(120000);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

injectEnrollmentScript();
