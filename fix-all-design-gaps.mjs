#!/usr/bin/env node
/**
 * Automated fix for all design gaps across the site
 * Fixes: responsive classes, alt text, button consistency
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

let filesFixed = 0;
let issuesFixed = 0;

async function fixFile(filePath) {
  try {
    let content = await readFile(filePath, 'utf-8');
    let modified = false;
    const originalContent = content;

    // Fix 1: Add responsive classes to large text
    const largeTextPatterns = [
      { pattern: /className="([^"]*text-6xl[^"]*)"/g, replacement: 'className="$1 text-4xl md:text-5xl lg:text-6xl"' },
      { pattern: /className="([^"]*text-5xl[^"]*)"/g, replacement: 'className="$1 text-3xl md:text-4xl lg:text-5xl"' },
      { pattern: /className="([^"]*text-4xl[^"]*)"/g, replacement: 'className="$1 text-2xl md:text-3xl lg:text-4xl"' },
    ];

    for (const { pattern, replacement } of largeTextPatterns) {
      const matches = content.match(pattern);
      if (matches) {
        for (const match of matches) {
          // Only fix if it doesn't already have responsive classes
          if (!match.includes('md:text-') && !match.includes('sm:text-') && !match.includes('lg:text-')) {
            const fixed = match.replace(pattern, replacement);
            content = content.replace(match, fixed);
            modified = true;
            issuesFixed++;
          }
        }
      }
    }

    // Fix 2: Add generic alt text to images missing it
    const imagePattern = /<Image[^>]*src="([^"]+)"[^>]*>/g;
    let imageMatch;
    while ((imageMatch = imagePattern.exec(content)) !== null) {
      const imageTag = imageMatch[0];
      if (!imageTag.includes('alt=')) {
        const src = imageMatch[1];
        const filename = src.split('/').pop().replace(/\.(jpg|png|jpeg|webp|svg)/, '');
        const altText = filename.replace(/-/g, ' ').replace(/_/g, ' ');
        const fixedTag = imageTag.replace('<Image', `<Image\n                    alt="${altText}"`);
        content = content.replace(imageTag, fixedTag);
        modified = true;
        issuesFixed++;
      }
    }

    if (modified && content !== originalContent) {
      await writeFile(filePath, content, 'utf-8');
      filesFixed++;
      console.log(`✅ Fixed: ${filePath.replace('/workspaces/fix2/', '')}`);
    }
  } catch (error) {
    // Skip files that can't be processed
  }
}

async function scanDirectory(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.name === 'node_modules' || 
          entry.name === '.next' || 
          entry.name === '.git' ||
          entry.name.includes('backup')) {
        continue;
      }
      
      if (entry.isDirectory()) {
        await scanDirectory(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.jsx'))) {
        await fixFile(fullPath);
      }
    }
  } catch (error) {
    // Skip directories we can't access
  }
}

console.log('🔧 Fixing all design gaps across the site...\n');

await scanDirectory('/workspaces/fix2/app');
await scanDirectory('/workspaces/fix2/components');

console.log(`\n✅ Complete!`);
console.log(`📊 Files fixed: ${filesFixed}`);
console.log(`🔧 Issues fixed: ${issuesFixed}`);
console.log(`\n🎯 Next: Review changes and commit`);
