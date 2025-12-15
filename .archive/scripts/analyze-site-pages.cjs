#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const categories = {
  programs: [],
  student: [],
  portal: [],
  employer: [],
  partner: [],
  lms: [],
  auth: [],
  marketing: [],
  other: []
};

const issues = {
  placeholderItems: [],
  duplicateSupabase: [],
  noDatabase: [],
  clientComponent: [],
  serverComponent: []
};

function analyzeFile(filePath, relativePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  const hasPlaceholderItems = content.includes("from('items')");
  const hasDuplicateSupabase = (content.match(/const supabase = await createClient\(\)/g) || []).length > 1;
  const hasDatabase = content.includes('supabase') && content.includes('.from(');
  const isClientComponent = content.includes("'use client'");
  const isServerComponent = !isClientComponent && content.includes('async function');
  
  // Categorize
  if (relativePath.includes('/programs/')) categories.programs.push(relativePath);
  else if (relativePath.includes('/student/') || relativePath.includes('/students/')) categories.student.push(relativePath);
  else if (relativePath.includes('/portal/')) categories.portal.push(relativePath);
  else if (relativePath.includes('/employer/')) categories.employer.push(relativePath);
  else if (relativePath.includes('/partner/')) categories.partner.push(relativePath);
  else if (relativePath.includes('/lms/')) categories.lms.push(relativePath);
  else if (relativePath.includes('/login') || relativePath.includes('/signup') || relativePath.includes('/auth/')) categories.auth.push(relativePath);
  else if (relativePath.includes('/(marketing)/') || relativePath.includes('/about') || relativePath.includes('/contact')) categories.marketing.push(relativePath);
  else categories.other.push(relativePath);
  
  // Track issues
  if (hasPlaceholderItems) issues.placeholderItems.push(relativePath);
  if (hasDuplicateSupabase) issues.duplicateSupabase.push(relativePath);
  if (!hasDatabase && (isClientComponent || isServerComponent)) issues.noDatabase.push(relativePath);
  if (isClientComponent) issues.clientComponent.push(relativePath);
  if (isServerComponent) issues.serverComponent.push(relativePath);
}

function scanDirectory(dir, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);
    
    // Skip node_modules and .next
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') {
      continue;
    }
    
    if (entry.isDirectory()) {
      scanDirectory(fullPath, baseDir);
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
      analyzeFile(fullPath, relativePath);
    }
  }
}

// Main execution
console.log('🔍 Analyzing site pages...\n');

const appDir = path.join(__dirname, 'app');
scanDirectory(appDir);

// Calculate totals
const totalPages = Object.values(categories).reduce((sum, arr) => sum + arr.length, 0);

console.log('📊 SITE ANALYSIS REPORT\n');
console.log('=' .repeat(60));
console.log('\n📁 PAGES BY CATEGORY:\n');

for (const [category, pages] of Object.entries(categories)) {
  console.log(`  ${category.padEnd(15)} ${pages.length.toString().padStart(4)} pages`);
}

console.log(`\n  ${'TOTAL'.padEnd(15)} ${totalPages.toString().padStart(4)} pages`);

console.log('\n' + '='.repeat(60));
console.log('\n⚠️  ISSUES FOUND:\n');

console.log(`  Placeholder 'items' table:     ${issues.placeholderItems.length.toString().padStart(4)} pages`);
console.log(`  Duplicate supabase init:       ${issues.duplicateSupabase.length.toString().padStart(4)} pages`);
console.log(`  No database queries:           ${issues.noDatabase.length.toString().padStart(4)} pages`);
console.log(`  Client components:             ${issues.clientComponent.length.toString().padStart(4)} pages`);
console.log(`  Server components:             ${issues.serverComponent.length.toString().padStart(4)} pages`);

console.log('\n' + '='.repeat(60));
console.log('\n🎯 PRIORITY FIXES:\n');

const highPriority = [
  ...categories.programs.filter(p => issues.placeholderItems.includes(p)),
  ...categories.student.filter(p => issues.placeholderItems.includes(p)),
  ...categories.employer.filter(p => issues.placeholderItems.includes(p))
];

console.log(`  High Priority (programs/student/employer): ${highPriority.length} pages`);
console.log(`  Medium Priority (portal/lms):              ${[...categories.portal, ...categories.lms].filter(p => issues.placeholderItems.includes(p)).length} pages`);
console.log(`  Low Priority (marketing/other):            ${[...categories.marketing, ...categories.other].filter(p => issues.placeholderItems.includes(p)).length} pages`);

// Write detailed report to file
const report = {
  summary: {
    totalPages,
    categories: Object.fromEntries(
      Object.entries(categories).map(([k, v]) => [k, v.length])
    ),
    issues: Object.fromEntries(
      Object.entries(issues).map(([k, v]) => [k, v.length])
    )
  },
  categories,
  issues,
  highPriority
};

fs.writeFileSync(
  path.join(__dirname, 'SITE_ANALYSIS.json'),
  JSON.stringify(report, null, 2),
  'utf8'
);

console.log('\n✅ Detailed report saved to SITE_ANALYSIS.json\n');
