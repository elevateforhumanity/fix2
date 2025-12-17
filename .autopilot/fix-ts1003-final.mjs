#!/usr/bin/env node
import fs from 'node:fs';

const files = [
  'app/api/ai/chat/route.ts',
  'app/api/courses/metadata/route.ts',
  'app/api/cron/end-of-day-summary/route.ts',
  'app/api/cron/missed-checkins/route.ts',
  'app/api/preview/render/route.ts',
  'app/api/referrals/route.ts',
  'app/auth/signup/SignUpForm.tsx',
  'app/program-holder/sign-mou/SignMOUForm.tsx',
  'components/lms/ContentLibrary.tsx',
  'lib/autopilot/course-normalizer.ts',
  'lib/collaboration/yjs-provider.ts',
  'lib/fs-virtual.ts',
  'lib/partners/careersafe.ts',
  'lib/partners/certiport.ts',
  'lib/partners/hsi.ts',
  'lib/partners/hybrid-enrollment.ts',
  'lib/partners/jri.ts',
  'lib/partners/milady.ts',
  'lib/partners/nds.ts',
  'lib/partners/nrf.ts',
  'lib/scorm/scorm-api.ts'
];

console.log('Fixing TS1003 errors in 21 files...\n');

let fixCount = 0;

for (const file of files) {
  try {
    if (!fs.existsSync(file)) {
      console.log(`⚠️  Skip: ${file} (not found)`);
      continue;
    }

    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    // Fix ONLY: identifier.(property as any) -> (identifier.property as any)
    // Be very specific to avoid breaking other patterns
    content = content.replace(
      /\b([a-zA-Z_][a-zA-Z0-9_]*)\.\(([a-zA-Z_][a-zA-Z0-9_]*) as any\)/g,
      '($1.$2 as any)'
    );

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      fixCount++;
      console.log(`✅ ${file}`);
    } else {
      console.log(`⏭️  ${file} (no changes needed)`);
    }

  } catch (err) {
    console.log(`❌ ${file}: ${err.message}`);
  }
}

console.log(`\n✅ Fixed ${fixCount} files`);
