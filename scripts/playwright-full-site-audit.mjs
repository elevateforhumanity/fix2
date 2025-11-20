#!/usr/bin/env node

/**
 * COMPREHENSIVE SITE AUDIT - Playwright Automation
 *
 * Performs COMPLETE audit of the live site - ALL pages, not just homepage
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SITE_URL = process.env.SITE_URL || 'https://www.elevateforhumanity.org';
const OUTPUT_DIR = '.';
const REPORT_FILE = path.join(OUTPUT_DIR, 'FULL_SITE_AUDIT_REPORT.md');

// ALL pages to audit
const PAGES_TO_AUDIT = [
  '/',
  '/about',
  '/programs',
  '/programs/barber-apprenticeship',
  '/programs/hvac-technician',
  '/programs/medical-assistant',
  '/programs/building-maintenance',
  '/programs/truck-driving',
  '/partners',
  '/contact',
  '/login',
  '/signup',
  '/lms/dashboard',
  '/lms/courses',
  '/lms/certificates',
  '/lms/progress',
  '/lms/messages',
  '/lms/profile',
  '/lms/calendar',
  '/lms/resources',
  '/admin/dashboard',
  '/admin/courses',
  '/admin/students',
  '/admin/reports',
  '/admin/certificates',
  '/admin/program-holders',
  '/admin/delegates',
  '/partner/dashboard',
  '/delegate/dashboard',
  '/student/dashboard',
  '/student/courses',
  '/student/certificates',
  '/enroll',
  '/partner-application',
  '/privacy',
  '/terms',
  '/accessibility',
];

const auditResults = {
  timestamp: new Date().toISOString(),
  siteUrl: SITE_URL,
  pages: {},
  summary: {
    totalPages: 0,
    workingPages: 0,
    brokenPages: 0,
    incompletePages: 0,
    totalErrors: 0,
    totalWarnings: 0,
  },
  recommendations: [],
};

async function main() {
  console.log('🔍 COMPREHENSIVE SITE AUDIT');
  console.log('============================\n');
  console.log(`Site: ${SITE_URL}`);
  console.log(`Pages to audit: ${PAGES_TO_AUDIT.length}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  for (const pagePath of PAGES_TO_AUDIT) {
    console.log(`\n📄 Auditing: ${pagePath}`);
    const pageUrl = `${SITE_URL}${pagePath}`;

    try {
      const pageAudit = await auditPage(page, pageUrl, pagePath);
      auditResults.pages[pagePath] = pageAudit;
      auditResults.summary.totalPages++;

      if (pageAudit.status === 'working') {
        auditResults.summary.workingPages++;
      } else if (pageAudit.status === 'broken') {
        auditResults.summary.brokenPages++;
      } else if (pageAudit.status === 'incomplete') {
        auditResults.summary.incompletePages++;
      }

      auditResults.summary.totalErrors += pageAudit.errors.length;
      auditResults.summary.totalWarnings += pageAudit.warnings.length;

      console.log(`  Status: ${pageAudit.status}`);
      console.log(`  Errors: ${pageAudit.errors.length}`);
      console.log(`  Warnings: ${pageAudit.warnings.length}`);
    } catch (error) {
      console.log(`  ❌ Failed: ${error.message}`);
      auditResults.pages[pagePath] = {
        status: 'broken',
        errors: [error.message],
        warnings: [],
      };
      auditResults.summary.brokenPages++;
    }

    await page.waitForTimeout(500);
  }

  await browser.close();

  generateRecommendations();
  await writeReport();

  console.log('\n✅ AUDIT COMPLETE');
  console.log(`\nReport saved: ${REPORT_FILE}`);
  console.log('\nSummary:');
  console.log(`  Total Pages: ${auditResults.summary.totalPages}`);
  console.log(`  Working: ${auditResults.summary.workingPages}`);
  console.log(`  Broken: ${auditResults.summary.brokenPages}`);
  console.log(`  Incomplete: ${auditResults.summary.incompletePages}`);
  console.log(`  Total Errors: ${auditResults.summary.totalErrors}`);
  console.log(`  Total Warnings: ${auditResults.summary.totalWarnings}`);
}

async function auditPage(page, url, pagePath) {
  const audit = {
    url,
    status: 'working',
    errors: [],
    warnings: [],
    content: {},
  };

  try {
    const response = await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    if (!response.ok()) {
      audit.status = 'broken';
      audit.errors.push(`HTTP ${response.status()}: ${response.statusText()}`);
      return audit;
    }

    // Analyze page content
    const content = await page.evaluate(() => {
      return {
        title: document.title,
        h1Count: document.querySelectorAll('h1').length,
        h1Text: document.querySelector('h1')?.textContent || '',
        bodyText: document.body.textContent.substring(0, 500),
        hasNav:
          !!document.querySelector('nav') ||
          !!document.querySelector('[role="navigation"]'),
        hasFooter: !!document.querySelector('footer'),
        imageCount: document.querySelectorAll('img').length,
        brokenImages: Array.from(document.querySelectorAll('img')).filter(
          (img) => !img.complete || img.naturalHeight === 0
        ).length,
        linkCount: document.querySelectorAll('a').length,
        hasPlaceholder:
          document.body.textContent.toLowerCase().includes('placeholder') ||
          document.body.textContent.toLowerCase().includes('coming soon') ||
          document.body.textContent
            .toLowerCase()
            .includes('under construction') ||
          document.body.textContent.toLowerCase().includes('todo'),
        hasLorem: document.body.textContent
          .toLowerCase()
          .includes('lorem ipsum'),
        hasError:
          document.body.textContent.toLowerCase().includes('error') ||
          document.body.textContent.toLowerCase().includes('not found') ||
          document.body.textContent.toLowerCase().includes('404'),
      };
    });

    audit.content = content;

    // Check for incomplete pages
    if (content.hasPlaceholder || content.hasLorem) {
      audit.status = 'incomplete';
      audit.warnings.push('Page contains placeholder content');
    }

    if (content.hasError) {
      audit.warnings.push('Page may contain error messages');
    }

    // Check for broken images
    if (content.brokenImages > 0) {
      audit.warnings.push(`${content.brokenImages} broken images`);
    }

    // Check for missing title
    if (
      !content.title ||
      content.title === 'React App' ||
      content.title === 'Next.js'
    ) {
      audit.warnings.push('Missing or default page title');
    }

    // Check for missing h1
    if (content.h1Count === 0) {
      audit.warnings.push('No H1 heading found');
    } else if (content.h1Count > 1) {
      audit.warnings.push(`Multiple H1 headings (${content.h1Count})`);
    }

    // Check for missing nav/footer
    if (!content.hasNav) {
      audit.warnings.push('No navigation found');
    }
    if (!content.hasFooter) {
      audit.warnings.push('No footer found');
    }
  } catch (error) {
    audit.status = 'broken';
    audit.errors.push(error.message);
  }

  return audit;
}

function generateRecommendations() {
  const incompletePages = Object.entries(auditResults.pages)
    .filter(([_, audit]) => audit.status === 'incomplete')
    .map(([path, _]) => path);

  const brokenPages = Object.entries(auditResults.pages)
    .filter(([_, audit]) => audit.status === 'broken')
    .map(([path, _]) => path);

  if (brokenPages.length > 0) {
    auditResults.recommendations.push({
      priority: 'CRITICAL',
      title: 'Fix Broken Pages',
      description: `${brokenPages.length} pages are completely broken`,
      pages: brokenPages,
      action: 'Fix these pages immediately',
    });
  }

  if (incompletePages.length > 0) {
    auditResults.recommendations.push({
      priority: 'HIGH',
      title: 'Complete Placeholder Pages',
      description: `${incompletePages.length} pages contain placeholder content`,
      pages: incompletePages,
      action: 'Replace placeholder content with real content',
    });
  }

  const pagesWithWarnings = Object.entries(auditResults.pages)
    .filter(([_, audit]) => audit.warnings.length >= 3)
    .map(([path, audit]) => ({ path, warnings: audit.warnings.length }));

  if (pagesWithWarnings.length > 0) {
    auditResults.recommendations.push({
      priority: 'MEDIUM',
      title: 'Fix Pages with Multiple Issues',
      description: `${pagesWithWarnings.length} pages have 3+ warnings`,
      pages: pagesWithWarnings.map((p) => `${p.path} (${p.warnings} warnings)`),
      action: 'Review and fix warnings',
    });
  }
}

async function writeReport() {
  let report = '# COMPREHENSIVE SITE AUDIT REPORT\n\n';
  report += `**Generated:** ${auditResults.timestamp}\n`;
  report += `**Site:** ${auditResults.siteUrl}\n\n`;

  report += '## Executive Summary\n\n';
  report += `- **Total Pages Audited:** ${auditResults.summary.totalPages}\n`;
  report += `- **Working Pages:** ${auditResults.summary.workingPages} ✅\n`;
  report += `- **Broken Pages:** ${auditResults.summary.brokenPages} ❌\n`;
  report += `- **Incomplete Pages:** ${auditResults.summary.incompletePages} ⚠️\n`;
  report += `- **Total Errors:** ${auditResults.summary.totalErrors}\n`;
  report += `- **Total Warnings:** ${auditResults.summary.totalWarnings}\n\n`;

  if (auditResults.recommendations.length > 0) {
    report += '## 🎯 Recommendations\n\n';
    auditResults.recommendations.forEach((rec, i) => {
      report += `### ${i + 1}. [${rec.priority}] ${rec.title}\n\n`;
      report += `**Description:** ${rec.description}\n\n`;
      report += `**Action:** ${rec.action}\n\n`;
      report += '**Affected Pages:**\n';
      rec.pages.forEach((page) => {
        report += `- ${page}\n`;
      });
      report += '\n';
    });
  }

  report += '## 📄 Detailed Page Results\n\n';
  Object.entries(auditResults.pages).forEach(([path, audit]) => {
    const statusEmoji =
      audit.status === 'working'
        ? '✅'
        : audit.status === 'broken'
          ? '❌'
          : '⚠️';
    report += `### ${statusEmoji} ${path}\n\n`;
    report += `**Status:** ${audit.status}\n`;
    report += `**URL:** ${audit.url}\n\n`;

    if (audit.content) {
      report += '**Content:**\n';
      report += `- Title: ${audit.content.title}\n`;
      report += `- H1: ${audit.content.h1Text}\n`;
      report += `- Images: ${audit.content.imageCount} (${audit.content.brokenImages} broken)\n`;
      report += `- Links: ${audit.content.linkCount}\n`;
      report += `- Has Nav: ${audit.content.hasNav ? 'Yes' : 'No'}\n`;
      report += `- Has Footer: ${audit.content.hasFooter ? 'Yes' : 'No'}\n\n`;
    }

    if (audit.errors.length > 0) {
      report += '**Errors:**\n';
      audit.errors.forEach((error) => {
        report += `- ${error}\n`;
      });
      report += '\n';
    }

    if (audit.warnings.length > 0) {
      report += '**Warnings:**\n';
      audit.warnings.forEach((warning) => {
        report += `- ${warning}\n`;
      });
      report += '\n';
    }

    report += '---\n\n';
  });

  fs.writeFileSync(REPORT_FILE, report);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
