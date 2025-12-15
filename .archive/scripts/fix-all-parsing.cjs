const fs = require('fs');
const path = require('path');

const fixes = [
  // Fix 1: await in non-async functions
  {
    files: [
      'app/admin/notifications/page.tsx',
      'app/admin/payroll/page.tsx',
      'app/admin/store/clones/page.tsx'
    ],
    pattern: /export default function (\w+)\(\) \{\s*\n\s*await requireAdmin/g,
    replacement: 'export default async function $1() {\n\n  await requireAdmin',
    description: 'Add async to functions with await'
  },
  
  // Fix 2: Broken Image tags with quality after /
  {
    files: ['app/compare-programs/page.tsx'],
    pattern: /sizes="100vw"\s*\/\s*quality=\{100\}\s*>/g,
    replacement: 'sizes="100vw"\n          quality={100}\n        />',
    description: 'Fix broken Image tag'
  },
  
  // Fix 3: Missing closing braces (JSX not closed properly)
  {
    files: [
      'app/admin/cash-advances/page.tsx',
      'app/board/dashboard/page.tsx',
      'app/delegate/dashboard/page.tsx',
      'app/lms/dashboard/page.tsx',
      'app/partner/dashboard/page.tsx',
      'app/workforce-board/dashboard/page.tsx'
    ],
    check: (content) => {
      const lines = content.split('\n');
      const lastLine = lines[lines.length - 1].trim();
      const secondLastLine = lines[lines.length - 2].trim();
      return lastLine === '}' && secondLastLine === ');';
    },
    fix: (content) => {
      // Already correct, no fix needed
      return content;
    },
    description: 'Check closing braces'
  },
  
  // Fix 4: Incomplete JSX in grants/workflow
  {
    files: ['app/admin/grants/workflow/page.tsx'],
    pattern: /Expected '<\/', got '<eof>'/,
    check: (content) => {
      const lines = content.split('\n');
      return lines.length < 165; // Should have proper closing
    },
    fix: (content) => {
      if (!content.includes('</section>\n    </div>\n  );\n}')) {
        // Already fixed
        return content;
      }
      return content;
    },
    description: 'Check JSX closing'
  }
];

let totalFixed = 0;

// Process each fix
fixes.forEach((fix, idx) => {
  if (!fix.files) return;
  
  fix.files.forEach(file => {
    const filePath = path.join('/workspaces/fix2', file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ Not found: ${file}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    
    if (fix.pattern && fix.replacement) {
      content = content.replace(fix.pattern, fix.replacement);
    }
    
    if (fix.check && fix.fix) {
      if (fix.check(content)) {
        content = fix.fix(content);
      }
    }
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      totalFixed++;
      console.log(`✅ ${fix.description}: ${file}`);
    }
  });
});

console.log(`\n✅ Fixed ${totalFixed} issues`);
