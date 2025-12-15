#!/usr/bin/env node
/**
 * Add authentication to all admin pages missing it
 */

import { readFileSync, writeFileSync } from 'fs';

const serverPages = [
  'app/admin/cash-advances/page.tsx',
  'app/admin/external-modules/approvals/page.tsx',
  'app/admin/external-progress/page.tsx',
  'app/admin/grants/submissions/page.tsx',
  'app/admin/grants/workflow/page.tsx',
  'app/admin/license/page.tsx',
  'app/admin/notifications/page.tsx',
  'app/admin/payroll/page.tsx',
  'app/admin/store/clones/page.tsx',
  'app/admin/store/page.tsx',
];

const clientPages = [
  'app/admin/autopilots/page.tsx',
  'app/admin/course-studio/page.tsx',
  'app/admin/course-studio-ai/page.tsx',
  'app/admin/course-studio-simple/page.tsx',
  'app/admin/dev-studio/page.tsx',
  'app/admin/editor/page.tsx',
  'app/admin/email-marketing/analytics/page.tsx',
  'app/admin/email-marketing/automation/new/page.tsx',
  'app/admin/email-marketing/automation/page.tsx',
  'app/admin/email-marketing/campaigns/new/page.tsx',
  'app/admin/email-marketing/page.tsx',
  'app/admin/live-chat/page.tsx',
  'app/admin/media-studio/page.tsx',
  'app/admin/social-media/campaigns/new/page.tsx',
  'app/admin/social-media/page.tsx',
];

console.log('🔒 Adding authentication to admin pages...\n');

// Fix server components
for (const file of serverPages) {
  try {
    let content = readFileSync(file, 'utf-8');
    
    // Check if already has auth
    if (content.includes('requireAdmin') || content.includes('getUser')) {
      console.log(`  ⏭️  ${file} - Already has auth`);
      continue;
    }
    
    // Add import
    if (!content.includes("import { requireAdmin }")) {
      content = content.replace(
        /^(import.*from.*;\n)/m,
        `$1import { requireAdmin } from '@/lib/authGuards';\n`
      );
    }
    
    // Add auth check at start of component
    content = content.replace(
      /(export default (?:async )?function \w+\([^)]*\) \{)/,
      `$1\n  await requireAdmin();\n`
    );
    
    writeFileSync(file, content);
    console.log(`  ✅ ${file} - Auth added`);
  } catch (error) {
    console.log(`  ❌ ${file} - Error: ${error.message}`);
  }
}

// Fix client components
for (const file of clientPages) {
  try {
    let content = readFileSync(file, 'utf-8');
    
    // Check if already has auth
    if (content.includes('useEffect') && content.includes('router.push')) {
      console.log(`  ⏭️  ${file} - Already has auth`);
      continue;
    }
    
    // Add imports
    if (!content.includes("import { useEffect }")) {
      content = content.replace(
        /^'use client';\n/,
        `'use client';\n\nimport { useEffect } from 'react';\nimport { useRouter } from 'next/navigation';\n`
      );
    }
    
    // Add auth check in component
    content = content.replace(
      /(export default function \w+\([^)]*\) \{)/,
      `$1\n  const router = useRouter();\n\n  useEffect(() => {\n    // Check admin auth\n    fetch('/api/auth/check-admin')\n      .then(res => res.json())\n      .then(data => {\n        if (!data.isAdmin) {\n          router.push('/login?redirect=/admin');\n        }\n      })\n      .catch(() => router.push('/login'));\n  }, [router]);\n`
    );
    
    writeFileSync(file, content);
    console.log(`  ✅ ${file} - Client auth added`);
  } catch (error) {
    console.log(`  ❌ ${file} - Error: ${error.message}`);
  }
}

console.log('\n✅ Authentication added to all admin pages!');
