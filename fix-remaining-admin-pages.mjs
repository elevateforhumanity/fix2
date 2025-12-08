#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

const pagesToFix = [
  'app/admin/ai-console/page.tsx',
  'app/admin/media-studio/page.tsx',
];

let fixed = 0;

for (const page of pagesToFix) {
  try {
    let content = readFileSync(page, 'utf-8');
    let changed = false;
    
    // Fix images - set quality and add alt text
    if (content.includes('<Image') || content.includes('<img')) {
      // Replace any Image without quality
      content = content.replace(
        /<Image([^>]*?)(?!quality)([^>]*?)\/>/g,
        (match) => {
          if (match.includes('quality=')) return match;
          return match.replace('/>', '\n          quality={100}\n        />');
        }
      );
      
      // Add alt text if missing
      content = content.replace(
        /<Image([^>]*?)src="([^"]+)"([^>]*?)(?!alt=)([^>]*?)>/g,
        (match, before, src, middle, after) => {
          if (match.includes('alt=')) return match;
          return `<Image${before}src="${src}"${middle}\n          alt="Image"${after}>`;
        }
      );
      
      // Add sizes to fill images
      content = content.replace(
        /<Image([^>]*?)fill([^>]*?)(?!sizes)([^>]*?)\/>/g,
        (match) => {
          if (match.includes('sizes=')) return match;
          return match.replace('/>', '\n          sizes="100vw"\n        />');
        }
      );
      
      changed = true;
    }
    
    if (changed) {
      writeFileSync(page, content, 'utf-8');
      console.log(`✅ Fixed: ${page}`);
      fixed++;
    }
    
  } catch (error) {
    console.error(`❌ Error: ${page} - ${error.message}`);
  }
}

console.log(`\n✅ Fixed ${fixed} admin pages`);

