#!/usr/bin/env node

/**
 * Inject Barber Apprenticeship Page into Durable
 * Matches existing site styling
 */

import puppeteer from 'puppeteer';
import fs from 'fs';

const CONFIG = {
  email: process.env.DURABLE_EMAIL || 'Elevateforhumanity@gmail.com',
  password: process.env.DURABLE_PASSWORD || 'Elijah1$',
  timeout: 120000,
};

// Barber page HTML (from copy-pages.html)
const BARBER_HTML = `<div class="relative z-10 container mx-auto pt-12 lg:pt-20 pb-12 lg:pb-20">
  
  <div class="flex flex-col gap-6 max-w-4xl mx-auto mb-12 text-center">
    <h1 class="heading-xlarge" style="color:#000000">
      Barber Apprenticeship Program
    </h1>
    <p class="body-large" style="color:#000000">
      Earn while you learn. Master professional barbering skills and qualify for Indiana State Licensure through our 2,000-hour registered apprenticeship program.
    </p>
    <div class="flex flex-wrap gap-3 justify-center">
      <span class="px-4 py-2 rounded" style="background:#F2F0D9;color:#4D4B37;font-size:14px;font-weight:500">💰 WRG Funded</span>
      <span class="px-4 py-2 rounded" style="background:#F2F0D9;color:#4D4B37;font-size:14px;font-weight:500">💰 WIOA Funded</span>
      <span class="px-4 py-2 rounded" style="background:#F2F0D9;color:#4D4B37;font-size:14px;font-weight:500">📜 State Licensure</span>
      <span class="px-4 py-2 rounded" style="background:#F2F0D9;color:#4D4B37;font-size:14px;font-weight:500">⏱️ 2,000 Hours</span>
    </div>
  </div>

  <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start mb-16">
    <div class="flex-1">
      <div class="rich-text-block" style="color:#000000">
        <h2>Program Overview</h2>
        <p>Our Barber Apprenticeship Program combines hands-on training with classroom instruction to prepare you for a successful career in barbering. You'll work alongside experienced professionals while earning a wage and building your skills.</p>
        
        <h3>What You'll Learn</h3>
        <ul>
          <li>Professional fades and line-ups</li>
          <li>Braiding and styling techniques</li>
          <li>Beard grooming and shaping</li>
          <li>Sanitation and safety protocols</li>
          <li>Customer service excellence</li>
          <li>Business management basics</li>
          <li>Product knowledge and retail</li>
        </ul>
      </div>
    </div>
    <div class="flex-1">
      <div class="rich-text-block" style="color:#000000">
        <h2>Program Details</h2>
        <p><strong>Duration:</strong> 2,000 hours (approximately 12-18 months)</p>
        <p><strong>Format:</strong> Hybrid - On-the-job training + classroom instruction</p>
        <p><strong>Certification:</strong> Indiana State Barber License</p>
        <p><strong>Cost:</strong> $0 with approved funding (WRG/WIOA)</p>
        
        <h3>Eligibility Requirements</h3>
        <ul>
          <li>18 years or older</li>
          <li>High school diploma or GED</li>
          <li>Marion County, IN resident (or willing to relocate)</li>
          <li>Eligible for WIOA or WRG funding</li>
          <li>Pass background check</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="mb-16">
    <div class="rich-text-block max-w-4xl mx-auto" style="color:#000000">
      <h2 class="text-center">Career Outcomes</h2>
      <p class="text-center">Upon completion, you'll be qualified for:</p>
    </div>
    
    <div class="flex flex-wrap relative justify-start gap-6 mt-8">
      
      <div class="group w-full lg:w-[calc(33.333%-16px)] relative overflow-hidden">
        <div class="transition-all h-full">
          <div class="flex flex-col h-full">
            <div class="flex flex-col items-start py-6" style="color:#000000">
              <p class="heading-medium mb-4" style="color:currentColor">Licensed Barber</p>
              <div class="rich-text-block mb-4" style="color:currentColor">
                Work in established barbershops across Indiana with your state license.
              </div>
              <p style="color:#4D4B37;font-weight:500">Avg. Salary: $35,000-$50,000/year</p>
            </div>
          </div>
        </div>
      </div>

      <div class="group w-full lg:w-[calc(33.333%-16px)] relative overflow-hidden">
        <div class="transition-all h-full">
          <div class="flex flex-col h-full">
            <div class="flex flex-col items-start py-6" style="color:#000000">
              <p class="heading-medium mb-4" style="color:currentColor">Shop Owner</p>
              <div class="rich-text-block mb-4" style="color:currentColor">
                Start your own barbershop and build your client base.
              </div>
              <p style="color:#4D4B37;font-weight:500">Potential: $60,000-$100,000+/year</p>
            </div>
          </div>
        </div>
      </div>

      <div class="group w-full lg:w-[calc(33.333%-16px)] relative overflow-hidden">
        <div class="transition-all h-full">
          <div class="flex flex-col h-full">
            <div class="flex flex-col items-start py-6" style="color:#000000">
              <p class="heading-medium mb-4" style="color:currentColor">Mobile Barber</p>
              <div class="rich-text-block mb-4" style="color:currentColor">
                Provide on-site services to clients, events, and businesses.
              </div>
              <p style="color:#4D4B37;font-weight:500">Flexible: $40,000-$70,000/year</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div class="mb-16" style="background:#e9f2e9;padding:48px 24px;border-radius:8px">
    <div class="max-w-4xl mx-auto">
      <div class="rich-text-block" style="color:#000000">
        <h2 class="text-center">100% Funded Training Available</h2>
        <p class="text-center">This program is eligible for full funding through:</p>
        
        <div class="flex flex-wrap gap-6 justify-center mt-8">
          <div style="background:#FEFAF5;padding:24px;border-radius:8px;flex:1;min-width:250px">
            <h3 style="color:#4D4B37">WIOA Funding</h3>
            <p>Workforce Innovation and Opportunity Act provides funding for eligible individuals seeking career training.</p>
          </div>
          <div style="background:#FEFAF5;padding:24px;border-radius:8px;flex:1;min-width:250px">
            <h3 style="color:#4D4B37">WRG Funding</h3>
            <p>Workforce Ready Grant covers tuition, fees, and materials for approved training programs.</p>
          </div>
        </div>
        
        <p class="text-center mt-8"><strong>You pay $0 if approved for funding.</strong></p>
      </div>
    </div>
  </div>

  <div class="mb-16">
    <div class="rich-text-block max-w-4xl mx-auto" style="color:#000000">
      <h2 class="text-center">How to Enroll</h2>
      
      <div class="flex flex-col gap-6 mt-8">
        <div class="flex gap-4 items-start">
          <div style="background:#4D4B37;color:#FEFAF5;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700">1</div>
          <div>
            <h3>Create Your Profile</h3>
            <p>Sign up on Indiana Career Connect and complete your profile.</p>
          </div>
        </div>
        
        <div class="flex gap-4 items-start">
          <div style="background:#4D4B37;color:#FEFAF5;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700">2</div>
          <div>
            <h3>Meet with Career Advisor</h3>
            <p>Schedule a meeting with a WorkOne Career Advisor to discuss eligibility and funding options.</p>
          </div>
        </div>
        
        <div class="flex gap-4 items-start">
          <div style="background:#4D4B37;color:#FEFAF5;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700">3</div>
          <div>
            <h3>Apply for Funding</h3>
            <p>Your advisor will help you apply for WIOA or WRG funding and gather required documents.</p>
          </div>
        </div>
        
        <div class="flex gap-4 items-start">
          <div style="background:#4D4B37;color:#FEFAF5;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700">4</div>
          <div>
            <h3>Get Approved & Start</h3>
            <p>Once approved, you'll receive your training authorization and start date for the next cohort.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="text-center">
    <a href="https://www.indianacareerconnect.com" target="_blank" rel="noopener" class="button" style="border-width:2px;border-style:solid;box-shadow:none;display:inline-block;font-size:18px;padding:16px 40px">
      Start Your Application on Indiana Career Connect →
    </a>
    <p class="mt-4" style="color:#000000">Questions? <a href="/contact" style="color:#4D4B37;text-decoration:underline">Contact us</a> for more information.</p>
  </div>

</div>`;

async function injectBarberPage() {
  console.log('🚀 Injecting Barber Apprenticeship Page into Durable');
  console.log('');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false, // Show browser so you can see what's happening
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--window-size=1920,1080',
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // Login to Durable
    console.log('🔐 Logging into Durable.co...');
    await page.goto('https://durable.co/login', {
      waitUntil: 'networkidle2',
      timeout: CONFIG.timeout,
    });

    await page.waitForSelector('input[type="email"]', { timeout: 10000 });
    await page.type('input[type="email"]', CONFIG.email);
    await page.type('input[type="password"]', CONFIG.password);

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('button[type="submit"]'),
    ]);

    console.log('✅ Logged in successfully');
    console.log('');

    // Wait a bit for dashboard to load
    await page.waitForTimeout(3000);

    console.log('📸 Taking screenshot of current state...');
    await page.screenshot({ path: 'durable-dashboard.png', fullPage: true });
    console.log('✅ Screenshot saved as durable-dashboard.png');
    console.log('');

    console.log('🔍 Looking for site editor or pages section...');
    
    // Try to find and click on "Pages" or "Edit Site" button
    const possibleSelectors = [
      'a[href*="pages"]',
      'button:has-text("Pages")',
      'a:has-text("Edit")',
      'button:has-text("Edit Site")',
      '[data-testid="pages"]',
      '[data-testid="edit-site"]',
    ];

    let found = false;
    for (const selector of possibleSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 2000 });
        console.log(`✅ Found element: ${selector}`);
        await page.click(selector);
        found = true;
        break;
      } catch (e) {
        // Try next selector
      }
    }

    if (!found) {
      console.log('⚠️  Could not find pages/edit button automatically');
      console.log('📋 Manual steps needed:');
      console.log('1. Navigate to your site editor');
      console.log('2. Create a new page: "Barber Apprenticeship"');
      console.log('3. Set slug: /programs/barber');
      console.log('4. Add Custom HTML block');
      console.log('5. Paste the code from public/copy-pages.html');
      console.log('');
      console.log('Browser will stay open for 2 minutes so you can do this manually...');
      await page.waitForTimeout(120000);
    } else {
      await page.waitForTimeout(5000);
      console.log('📸 Taking screenshot after navigation...');
      await page.screenshot({ path: 'durable-editor.png', fullPage: true });
      console.log('✅ Screenshot saved as durable-editor.png');
      console.log('');
      console.log('Browser will stay open for 2 minutes so you can complete the setup...');
      await page.waitForTimeout(120000);
    }

    console.log('');
    console.log('✅ Script complete');
    console.log('');
    console.log('📋 HTML code is ready in: public/copy-pages.html');
    console.log('🌐 Or visit: https://main--elevateforhumanityfix.netlify.app/copy-pages.html');

  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

injectBarberPage().catch(console.error);
