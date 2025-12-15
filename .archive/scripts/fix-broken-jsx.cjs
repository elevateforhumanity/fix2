const fs = require('fs');
const path = require('path');

const files = [
  'app/admin/grants/workflow/page.tsx',
  'app/admin/notifications/page.tsx',
  'app/admin/payroll/page.tsx',
  'app/admin/store/clones/page.tsx',
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
  'app/programs/page.tsx',
  'app/student/portfolio/page.tsx',
  'app/supersonicfastcash/page.tsx',
  'app/vita/page.tsx',
  'app/workforce-board/dashboard/page.tsx'
];

let fixedCount = 0;

files.forEach(file => {
  const filePath = path.join('/workspaces/fix2', file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Not found: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  // Fix 1: Broken Image tags with duplicate quality
  content = content.replace(
    /<Image\s+([^>]*?)\s+fill\s*\n\s*className="([^"]+)"\s*\n\s*quality=\{100\}\s*\n\s*\/\s*\n\s*quality=\{100\}\s*\n\s*sizes="([^"]+)"\s*>/g,
    '<Image $1 fill className="$2" quality={100} sizes="$3" />'
  );
  
  // Fix 2: Broken Image tags with quality after /
  content = content.replace(
    /<Image\s+([^>]*?)\s+quality=\{100\}\s*\n\s*\/\s*\n\s*quality=\{100\}\s*\n\s*sizes="([^"]+)"\s*>/g,
    '<Image $1 quality={100} sizes="$2" />'
  );
  
  // Fix 3: Image tags with / in wrong place
  content = content.replace(
    /quality=\{100\}\s*\n\s*\/\s*\n\s*quality=\{100\}/g,
    'quality={100}'
  );
  
  // Fix 4: Unclosed JSX elements (missing closing tag before EOF)
  const openTags = (content.match(/<(?!\/)[a-zA-Z][^>]*>/g) || []).length;
  const closeTags = (content.match(/<\/[a-zA-Z][^>]*>/g) || []).length;
  
  if (openTags > closeTags && !content.trim().endsWith('}')) {
    content = content.trim() + '\n  );\n}\n';
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixedCount++;
    console.log(`✅ Fixed: ${file}`);
  } else {
    console.log(`⚠️  No changes: ${file}`);
  }
});

console.log(`\n✅ Fixed ${fixedCount} files`);
