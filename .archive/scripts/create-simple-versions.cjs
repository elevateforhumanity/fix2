#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const files = [
  'app/admin/cash-advances/page.tsx',
  'app/admin/courses/page.tsx',
  'app/admin/email-marketing/page.tsx',
  'app/admin/grants/workflow/page.tsx',
  'app/admin/master-control/page.tsx',
  'app/admin/notifications/page.tsx',
  'app/admin/payroll/page.tsx',
  'app/admin/store/clones/page.tsx',
  'app/admin/users/page.tsx',
  'app/board/dashboard/page.tsx',
  'app/compare-programs/page.tsx',
  'app/delegate/dashboard/page.tsx',
  'app/demos/page.tsx',
  'app/jri/page.tsx',
  'app/lms/course/[courseId]/page.tsx',
  'app/lms/dashboard/page.tsx',
  'app/partner/dashboard/page.tsx',
  'app/portal/instructor/skills-tracking-esthetician/page.tsx',
  'app/portal/instructor/skills-tracking-nail/page.tsx',
  'app/portal/student/courses/[courseId]/page.tsx',
  'app/programs/[slug]/page.tsx',
  'app/programs/page.tsx',
  'app/store/page.tsx',
  'app/student/courses/[courseId]/page.tsx',
  'app/student/portfolio/page.tsx',
  'app/supersonicfastcash/page.tsx',
  'app/tax-filing/locations/[state]/page.tsx',
  'app/vita/page.tsx',
  'app/workforce-board/dashboard/page.tsx'
];

console.log('🔧 Creating backup and simple versions...\n');

for (const file of files) {
  try {
    if (!fs.existsSync(file)) continue;
    
    // Backup original
    const backup = file.replace('.tsx', '.tsx.backup');
    fs.copyFileSync(file, backup);
    
    // Get page name
    const pageName = path.basename(path.dirname(file));
    const title = pageName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    // Create simple version
    const simple = `import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '${title} | Elevate For Humanity',
  description: '${title} page',
};

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">${title}</h1>
        <p className="text-gray-600 mb-8">This page is under construction.</p>
        <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
`;
    
    fs.writeFileSync(file, simple, 'utf8');
    console.log(`✓ ${file}`);
    
  } catch (error) {
    console.log(`✗ ${file}: ${error.message}`);
  }
}

console.log('\n✅ Created simple versions. Originals backed up with .backup extension\n');
