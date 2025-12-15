#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

const pagesToFix = [
  'app/compare-programs/page.tsx',
  'app/jri/page.tsx',
  'app/portal/instructor/skills-tracking-esthetician/page.tsx',
  'app/portal/instructor/skills-tracking-nail/page.tsx',
  'app/programs/page.tsx',
  'app/student/portfolio/page.tsx',
  'app/supersonicfastcash/page.tsx',
  'app/demos/page.tsx',
  'app/store/page.tsx',
  'app/vita/page.tsx',
];

let fixed = 0;

for (const page of pagesToFix) {
  try {
    let content = readFileSync(page, 'utf-8');
    let changed = false;
    
    // Fix 1: Set all images to quality={100}
    const imageRegex = /<Image([^>]*?)>/g;
    let match;
    while ((match = imageRegex.exec(content)) !== null) {
      const imageTag = match[0];
      if (!imageTag.includes('quality=')) {
        const fixedTag = imageTag.replace('>', '\n          quality={100}\n        >').replace('/>', '\n          quality={100}\n        />');
        content = content.replace(imageTag, fixedTag);
        changed = true;
      }
    }
    
    // Fix 2: Add sizes to fill images
    content = content.replace(
      /fill\n([^>]*?)(?!sizes)([^>]*?)>/g,
      (match) => {
        if (match.includes('sizes=')) return match;
        return match.replace('>', '\n          sizes="100vw"\n        >');
      }
    );
    
    // Fix 3: Add alt text if missing
    content = content.replace(
      /<Image([^>]*?)src=([^>]*?)(?!alt)([^>]*?)>/g,
      (match) => {
        if (match.includes('alt=')) return match;
        return match.replace('src=', 'alt="Image"\n          src=');
      }
    );
    
    if (changed || content !== readFileSync(page, 'utf-8')) {
      writeFileSync(page, content, 'utf-8');
      console.log(`✅ Fixed: ${page}`);
      fixed++;
    }
    
  } catch (error) {
    console.error(`❌ Error: ${page} - ${error.message}`);
  }
}

console.log(`\n✅ Fixed ${fixed} pages`);

