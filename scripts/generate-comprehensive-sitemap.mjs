#!/usr/bin/env node

/**
 * Generate comprehensive sitemap with ALL pages
 * Optimized for Google and Bing indexing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://www.elevateforhumanity.org';
const TODAY = new Date().toISOString().split('T')[0];

// ALL public pages - COMPREHENSIVE LIST (150+ pages)
const pages = [
  // Main pages
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/about', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs', priority: 0.9, changefreq: 'daily' },
  { url: '/partners', priority: 0.8, changefreq: 'weekly' },
  { url: '/contact', priority: 0.8, changefreq: 'monthly' },
  { url: '/compare', priority: 0.7, changefreq: 'monthly' },
  { url: '/demo', priority: 0.7, changefreq: 'monthly' },
  { url: '/pricing', priority: 0.8, changefreq: 'monthly' },
  { url: '/employers', priority: 0.8, changefreq: 'weekly' },
  { url: '/success-stories', priority: 0.7, changefreq: 'weekly' },
  { url: '/wioa-eligibility', priority: 0.8, changefreq: 'monthly' },
  { url: '/financial-aid', priority: 0.8, changefreq: 'monthly' },
  { url: '/video', priority: 0.6, changefreq: 'weekly' },
  { url: '/unauthorized', priority: 0.3, changefreq: 'yearly' },
  { url: '/workforce-partners', priority: 0.7, changefreq: 'weekly' },
  
  // Program pages - ALL variations
  { url: '/programs/barber-apprenticeship', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/barber', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/hvac-technician', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/hvac', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/hvac-tech', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/medical-assistant', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/building-maintenance', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/building-tech', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/truck-driving', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/cdl', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/workforce-readiness', priority: 0.9, changefreq: 'weekly' },
  
  // Enrollment & Application
  { url: '/enroll', priority: 0.9, changefreq: 'weekly' },
  { url: '/enroll/apply', priority: 0.8, changefreq: 'weekly' },
  { url: '/enroll/success', priority: 0.5, changefreq: 'monthly' },
  { url: '/partner-application', priority: 0.8, changefreq: 'weekly' },
  { url: '/partners/enroll', priority: 0.8, changefreq: 'weekly' },
  
  // Auth
  { url: '/login', priority: 0.7, changefreq: 'monthly' },
  { url: '/signup', priority: 0.7, changefreq: 'monthly' },
  
  // LMS Public Pages
  { url: '/lms', priority: 0.8, changefreq: 'weekly' },
  { url: '/lms/dashboard', priority: 0.7, changefreq: 'daily' },
  { url: '/lms/courses', priority: 0.8, changefreq: 'daily' },
  { url: '/lms/certificates', priority: 0.7, changefreq: 'weekly' },
  { url: '/lms/progress', priority: 0.6, changefreq: 'weekly' },
  { url: '/lms/calendar', priority: 0.6, changefreq: 'weekly' },
  { url: '/lms/resources', priority: 0.6, changefreq: 'weekly' },
  { url: '/lms/help', priority: 0.6, changefreq: 'weekly' },
  { url: '/lms/messages', priority: 0.6, changefreq: 'daily' },
  { url: '/lms/profile', priority: 0.6, changefreq: 'weekly' },
  { url: '/lms/settings', priority: 0.5, changefreq: 'monthly' },
  { url: '/lms/notifications', priority: 0.5, changefreq: 'daily' },
  { url: '/lms/achievements', priority: 0.6, changefreq: 'weekly' },
  { url: '/lms/leaderboard', priority: 0.6, changefreq: 'daily' },
  
  // Student Portal
  { url: '/student/dashboard', priority: 0.7, changefreq: 'daily' },
  { url: '/student/courses', priority: 0.8, changefreq: 'daily' },
  { url: '/student/certificates', priority: 0.7, changefreq: 'weekly' },
  { url: '/student/progress', priority: 0.6, changefreq: 'weekly' },
  { url: '/student/assignments', priority: 0.7, changefreq: 'daily' },
  { url: '/student/grades', priority: 0.7, changefreq: 'weekly' },
  { url: '/student/schedule', priority: 0.6, changefreq: 'weekly' },
  { url: '/student/resources', priority: 0.6, changefreq: 'weekly' },
  
  // Partner Portal
  { url: '/partner/dashboard', priority: 0.6, changefreq: 'daily' },
  { url: '/partner/students', priority: 0.6, changefreq: 'daily' },
  { url: '/partner/reports', priority: 0.6, changefreq: 'weekly' },
  { url: '/partner/settings', priority: 0.5, changefreq: 'monthly' },
  
  // Program Holder Portal
  { url: '/program-holder/dashboard', priority: 0.6, changefreq: 'daily' },
  { url: '/program-holder/apply', priority: 0.7, changefreq: 'weekly' },
  { url: '/program-holder/cases', priority: 0.6, changefreq: 'daily' },
  { url: '/program-holder/mou', priority: 0.6, changefreq: 'weekly' },
  { url: '/program-holder/certificates', priority: 0.6, changefreq: 'weekly' },
  { url: '/program-holder/reports', priority: 0.6, changefreq: 'weekly' },
  { url: '/program-holder/settings', priority: 0.5, changefreq: 'monthly' },
  
  // Delegate Portal
  { url: '/delegate/dashboard', priority: 0.6, changefreq: 'daily' },
  { url: '/delegate/students', priority: 0.6, changefreq: 'daily' },
  { url: '/delegate/reports', priority: 0.6, changefreq: 'weekly' },
  
  // Admin Pages (public info only)
  { url: '/admin/dashboard', priority: 0.5, changefreq: 'daily' },
  { url: '/admin/courses', priority: 0.5, changefreq: 'weekly' },
  { url: '/admin/students', priority: 0.5, changefreq: 'daily' },
  { url: '/admin/reports', priority: 0.5, changefreq: 'weekly' },
  { url: '/admin/certificates', priority: 0.5, changefreq: 'weekly' },
  { url: '/admin/program-holders', priority: 0.5, changefreq: 'weekly' },
  { url: '/admin/delegates', priority: 0.5, changefreq: 'weekly' },
  { url: '/admin/partners', priority: 0.5, changefreq: 'weekly' },
  { url: '/admin/settings', priority: 0.4, changefreq: 'monthly' },
  { url: '/admin/users', priority: 0.5, changefreq: 'daily' },
  { url: '/admin/analytics', priority: 0.5, changefreq: 'daily' },
  { url: '/admin/compliance', priority: 0.5, changefreq: 'weekly' },
  { url: '/admin/audit-logs', priority: 0.4, changefreq: 'daily' },
  { url: '/admin/success', priority: 0.5, changefreq: 'weekly' },
  { url: '/admin/tenants', priority: 0.5, changefreq: 'weekly' },
  { url: '/admin/applications', priority: 0.5, changefreq: 'daily' },
  { url: '/admin/contacts', priority: 0.5, changefreq: 'weekly' },
  { url: '/admin/course-authoring', priority: 0.5, changefreq: 'weekly' },
  
  // Courses (dynamic - examples)
  { url: '/courses', priority: 0.8, changefreq: 'daily' },
  { url: '/courses/catalog', priority: 0.8, changefreq: 'daily' },
  { url: '/courses/search', priority: 0.7, changefreq: 'weekly' },
  
  // Legal & Compliance
  { url: '/privacy', priority: 0.6, changefreq: 'monthly' },
  { url: '/privacy-policy', priority: 0.6, changefreq: 'monthly' },
  { url: '/terms', priority: 0.6, changefreq: 'monthly' },
  { url: '/terms-of-service', priority: 0.6, changefreq: 'monthly' },
  { url: '/cookies', priority: 0.5, changefreq: 'monthly' },
  { url: '/accessibility', priority: 0.6, changefreq: 'monthly' },
  { url: '/compliance', priority: 0.5, changefreq: 'monthly' },
  { url: '/gdpr', priority: 0.5, changefreq: 'monthly' },
  { url: '/ccpa', priority: 0.5, changefreq: 'monthly' },
  
  // Resources & Support
  { url: '/resources', priority: 0.7, changefreq: 'weekly' },
  { url: '/faq', priority: 0.7, changefreq: 'weekly' },
  { url: '/help', priority: 0.7, changefreq: 'weekly' },
  { url: '/support', priority: 0.7, changefreq: 'weekly' },
  { url: '/docs', priority: 0.6, changefreq: 'weekly' },
  { url: '/guides', priority: 0.6, changefreq: 'weekly' },
  { url: '/tutorials', priority: 0.6, changefreq: 'weekly' },
  { url: '/blog', priority: 0.6, changefreq: 'weekly' },
  { url: '/news', priority: 0.6, changefreq: 'weekly' },
  { url: '/events', priority: 0.6, changefreq: 'weekly' },
  { url: '/webinars', priority: 0.6, changefreq: 'weekly' },
  { url: '/downloads', priority: 0.5, changefreq: 'monthly' },
  
  // Career Services
  { url: '/career-services', priority: 0.7, changefreq: 'weekly' },
  { url: '/job-board', priority: 0.7, changefreq: 'daily' },
  { url: '/resume-builder', priority: 0.6, changefreq: 'monthly' },
  { url: '/interview-prep', priority: 0.6, changefreq: 'monthly' },
  { url: '/career-coaching', priority: 0.6, changefreq: 'weekly' },
  
  // Community
  { url: '/community', priority: 0.6, changefreq: 'weekly' },
  { url: '/forums', priority: 0.6, changefreq: 'daily' },
  { url: '/discussions', priority: 0.6, changefreq: 'daily' },
  { url: '/alumni', priority: 0.6, changefreq: 'weekly' },
  { url: '/testimonials', priority: 0.6, changefreq: 'weekly' },
  
  // Integrations
  { url: '/integrations', priority: 0.5, changefreq: 'monthly' },
  { url: '/integrations/zoom', priority: 0.5, changefreq: 'monthly' },
  { url: '/integrations/teams', priority: 0.5, changefreq: 'monthly' },
  { url: '/integrations/salesforce', priority: 0.5, changefreq: 'monthly' },
  { url: '/integrations/workday', priority: 0.5, changefreq: 'monthly' },
];

function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
  xml += '        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

  pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}${page.url}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

function generateRobotsTxt() {
  return `# Robots.txt for Elevate for Humanity
# Updated: ${TODAY}

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /lms/messages
Disallow: /lms/profile
Disallow: /student/
Disallow: /partner/
Disallow: /delegate/

# Sitemaps
Sitemap: ${DOMAIN}/sitemap.xml

# Crawl delay
Crawl-delay: 1

# Google
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 0
`;
}

// Generate files
const sitemap = generateSitemap();
const robots = generateRobotsTxt();

const publicDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);

console.log('✅ Generated sitemap.xml with', pages.length, 'pages');
console.log('✅ Generated robots.txt');
console.log(`\nDomain: ${DOMAIN}`);
console.log(`Date: ${TODAY}`);
