const fs = require('fs');
const path = require('path');

const fixes = [
  // Remove metadata from client components
  {
    files: ['app/admin/email-marketing/page.tsx'],
    pattern: /export const metadata: Metadata = \{[^}]+\};?\n*/g,
    replacement: '',
    description: 'Remove metadata from client component'
  },
  // Fix duplicate Metadata imports
  {
    files: ['app/admin/master-control/page.tsx'],
    pattern: /import \{ Metadata \} from 'next';\n(.*\n)*?import \{ Metadata \} from 'next';/,
    replacement: "import { Metadata } from 'next';",
    description: 'Remove duplicate Metadata import'
  }
];

let totalFixed = 0;

fixes.forEach(fix => {
  fix.files.forEach(file => {
    const filePath = path.join('/workspaces/fix2', file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ Not found: ${file}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    
    content = content.replace(fix.pattern, fix.replacement);
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      totalFixed++;
      console.log(`✅ ${fix.description}: ${file}`);
    }
  });
});

console.log(`\n✅ Fixed ${totalFixed} issues`);
