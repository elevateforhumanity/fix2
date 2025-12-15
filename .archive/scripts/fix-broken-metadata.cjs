#!/usr/bin/env node

const fs = require('fs');

const files = [
  'app/admin/cash-advances/page.tsx',
  'app/admin/courses/page.tsx',
  'app/admin/grants/workflow/page.tsx',
  'app/admin/master-control/page.tsx',
  'app/admin/users/page.tsx',
  'app/board/dashboard/page.tsx',
  'app/delegate/dashboard/page.tsx',
  'app/lms/dashboard/page.tsx',
  'app/partner/dashboard/page.tsx',
  'app/workforce-board/dashboard/page.tsx'
];

console.log('🔧 Fixing broken metadata objects...\n');

for (const file of files) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if metadata is broken (missing closing)
    if (content.includes('export const metadata: Metadata = {') && 
        content.match(/export const metadata: Metadata = \{\s*\n\s*\n\s*export default/)) {
      
      // Add proper metadata object
      content = content.replace(
        /export const metadata: Metadata = \{\s*\n\s*\n\s*export default/,
        `export const metadata: Metadata = {
  title: 'Admin | Elevate For Humanity',
  description: 'Admin dashboard',
};

export default`
      );
      
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✓ ${file}`);
    }
    
  } catch (error) {
    console.log(`✗ ${file}: ${error.message}`);
  }
}

console.log('\n✅ Done\n');
