const fs = require('fs');
const path = require('path');

const files = [
  'app/admin/cash-advances/page.tsx',
  'app/admin/grants/workflow/page.tsx',
  'app/admin/master-control/page.tsx',
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
  'app/portal/student/courses/[courseId]/page.tsx',
  'app/programs/[slug]/page.tsx',
  'app/programs/page.tsx',
  'app/store/page.tsx',
  'app/student/courses/[courseId]/page.tsx',
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
  
  // Fix 1: Remove metadata in wrong location (middle of JSX)
  content = content.replace(/\n\s*alternates:\s*\{[^}]+\},?\n\s*title:[^,]+,\n\s*description:[^}]+\};?/g, '');
  
  // Fix 2: Fix broken import statements
  content = content.replace(/import\s+\{\s*\nexport const metadata/g, 'import { Metadata } from \'next\';\n\nexport const metadata');
  
  // Fix 3: Remove orphaned closing tags
  content = content.replace(/\n\s*<\/p>\s*\n\s*alternates:/g, '\n                </p>\n              )}\n            </div>\n          </div>\n        </div>\n      </section>\n    </div>\n  );\n}');
  
  // Fix 4: Fix incomplete JSX closing
  content = content.replace(/No new opportunities\. Run sync to import grants\.\s*alternates:/g, 'No new opportunities. Run sync to import grants.\n                </p>\n              )}\n            </div>\n          </div>\n        </div>\n      </section>\n    </div>\n  );\n}');
  
  // Fix 5: Remove duplicate/misplaced metadata
  const metadataMatches = content.match(/export const metadata.*?};/gs);
  if (metadataMatches && metadataMatches.length > 1) {
    // Keep only the first one
    const firstMetadata = metadataMatches[0];
    content = content.replace(/export const metadata.*?};/gs, '');
    content = content.replace(/^/, firstMetadata + '\n\n');
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
