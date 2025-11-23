#!/usr/bin/env node

/**
 * Puppeteer Automation: Supabase SQL Execution
 * 
 * Logs into Supabase and executes SQL from a file
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'elevateforhumanity';
const GITHUB_PASSWORD = process.env.GITHUB_PASSWORD || '';
const PROJECT_ID = 'cuxzzpsyufcewtmicszk';
const SQL_FILE = path.join(process.cwd(), 'simple-credentials.sql');
const HEADLESS = process.env.HEADLESS !== 'false';
const USE_GITHUB_AUTH = true;

async function runSupabaseSQL() {
  console.log('🤖 PUPPETEER AUTOPILOT: Supabase SQL Execution');
  console.log('==============================================\n');

  // Check if SQL file exists
  if (!fs.existsSync(SQL_FILE)) {
    console.error(`❌ SQL file not found: ${SQL_FILE}`);
    process.exit(1);
  }

  const sqlContent = fs.readFileSync(SQL_FILE, 'utf8');
  console.log(`📄 Loaded SQL file: ${SQL_FILE}`);
  console.log(`📏 SQL length: ${sqlContent.length} characters\n`);

  // Launch browser
  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({
    headless: HEADLESS,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // Go to Supabase login
    console.log('🔐 Navigating to Supabase login...');
    await page.goto('https://supabase.com/dashboard/sign-in', {
      waitUntil: 'networkidle2',
    });

    // Check if already logged in
    const currentUrl = page.url();
    if (currentUrl.includes('/projects')) {
      console.log('✅ Already logged in!');
    } else {
      console.log('📝 Logging in with GitHub...');
      
      // Click "Sign in with GitHub" button
      await page.waitForSelector('button:has-text("GitHub"), a:has-text("GitHub")', { timeout: 10000 });
      await page.click('button:has-text("GitHub"), a:has-text("GitHub")');
      
      // Wait for GitHub login page
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
      
      if (page.url().includes('github.com')) {
        console.log('🔐 GitHub login page detected...');
        
        // Fill in GitHub username
        await page.waitForSelector('input[name="login"]', { timeout: 10000 });
        await page.type('input[name="login"]', GITHUB_USERNAME);
        
        // Fill in GitHub password
        await page.type('input[name="password"]', GITHUB_PASSWORD);
        
        // Click sign in
        await page.click('input[type="submit"]');
        
        // Wait for redirect back to Supabase
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 });
        console.log('✅ Logged in successfully!');
      } else {
        console.log('✅ Already authenticated with GitHub!');
      }
    }

    // Navigate to SQL Editor
    console.log('📊 Opening SQL Editor...');
    const sqlEditorUrl = `https://supabase.com/dashboard/project/${PROJECT_ID}/sql/new`;
    await page.goto(sqlEditorUrl, { waitUntil: 'networkidle2' });

    // Wait for SQL editor to load
    console.log('⏳ Waiting for SQL editor...');
    await page.waitForSelector('.monaco-editor', { timeout: 30000 });
    await page.waitForTimeout(2000); // Give Monaco editor time to initialize

    // Clear existing content and paste SQL
    console.log('📝 Pasting SQL content...');
    
    // Click in the editor
    await page.click('.monaco-editor');
    
    // Select all and delete
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    
    // Type the SQL (Monaco editor requires typing, not paste)
    await page.keyboard.type(sqlContent, { delay: 0 });
    
    console.log('✅ SQL pasted into editor');

    // Find and click Run button
    console.log('▶️  Clicking Run button...');
    await page.waitForSelector('button:has-text("Run")', { timeout: 10000 });
    await page.click('button:has-text("Run")');

    // Wait for execution
    console.log('⏳ Waiting for SQL execution...');
    await page.waitForTimeout(5000);

    // Check for success or error
    const pageContent = await page.content();
    
    if (pageContent.includes('Success') || pageContent.includes('completed')) {
      console.log('✅ SQL executed successfully!');
    } else if (pageContent.includes('error') || pageContent.includes('Error')) {
      console.log('⚠️  SQL execution may have errors - check Supabase dashboard');
    } else {
      console.log('✅ SQL execution completed');
    }

    // Take screenshot
    const screenshotPath = path.join(process.cwd(), 'supabase-sql-result.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot saved: ${screenshotPath}`);

    console.log('\n✅ PUPPETEER AUTOPILOT: COMPLETE');
    console.log('Check Supabase dashboard to verify tables were created');

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    // Take error screenshot
    try {
      const errorScreenshot = path.join(process.cwd(), 'supabase-error.png');
      await page.screenshot({ path: errorScreenshot, fullPage: true });
      console.log(`📸 Error screenshot: ${errorScreenshot}`);
    } catch (e) {}
    
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the automation
runSupabaseSQL().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
