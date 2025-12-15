const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all files that use Link but don't import it
const files = [
  'app/tax-filing/page.tsx',
  'app/tax-filing/enhanced/page.tsx',
  'app/tax-filing/locations/page.tsx',
  'app/tax-filing/locations/[state]/page.tsx',
  'app/tax-filing/apply/page.tsx',
  'app/employer/opportunities/page.tsx',
  'app/employer/page.tsx',
  'app/employer/dashboard/page.tsx',
  'app/employer/analytics/page.tsx',
  'app/employer/post-job/page.tsx',
  'app/employer/placements/page.tsx',
  'app/educatorhub/page.tsx',
  'app/blog/page.tsx',
  'app/blog/[slug]/page.tsx',
  'app/checkout/prog-esthetics-apprentice/page.tsx',
  'app/checkout/prog-business-apprentice/page.tsx',
  'app/checkout/prog-tax-vita/page.tsx',
  'app/checkout/[programId]/page.tsx',
  'app/signup/page.tsx',
  'app/webinars/page.tsx',
  'app/faq/page.tsx',
  'app/workforce-partners/page.tsx',
  'app/financial-aid/page.tsx',
  'app/financial-aid/apply/page.tsx',
  'app/consumer-education/page.tsx',
  'app/about/team/page.tsx',
  'app/about/page.tsx',
  'app/learners/page.tsx'
];

console.log(`Found ${files.length} files missing Link import\n`);

let fixedCount = 0;

files.forEach(file => {
  const filePath = path.join('/workspaces/fix2', file);
  
  if (!fs.existsSync(filePath)) {
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  // Check if file actually uses Link
  if (!content.includes('<Link')) {
    return;
  }
  
  // Check if already has Link import
  if (content.includes("import Link from 'next/link'") || 
      content.includes('import Link from "next/link"')) {
    return;
  }
  
  // Add Link import after other next imports
  if (content.includes("import Image from 'next/image'")) {
    content = content.replace(
      "import Image from 'next/image';",
      "import Image from 'next/image';\nimport Link from 'next/link';"
    );
  } else if (content.includes("import { Metadata } from 'next'")) {
    content = content.replace(
      "import { Metadata } from 'next';",
      "import { Metadata } from 'next';\nimport Link from 'next/link';"
    );
  } else {
    // Add at the top after first import
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ')) {
        lines.splice(i + 1, 0, "import Link from 'next/link';");
        break;
      }
    }
    content = lines.join('\n');
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixedCount++;
    console.log(`✅ Added Link import: ${file}`);
  }
});

console.log(`\n✅ Fixed ${fixedCount} files`);
