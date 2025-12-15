#!/usr/bin/env node

import { readdir, readFile } from 'fs/promises';
import { join, extname } from 'path';

const brokenLinks = [];
const checkedFiles = [];

// Patterns to check for broken links
const linkPatterns = [
  /href=["']([^"']+)["']/g,
  /src=["']([^"']+)["']/g,
  /import.*from\s+["']([^"']+)["']/g,
  /require\(["']([^"']+)["']\)/g,
];

async function checkFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    const issues = [];

    // Check for common broken link patterns
    if (content.includes('href=""') || content.includes("href=''")) {
      issues.push('Empty href attribute');
    }
    if (content.includes('src=""') || content.includes("src=''")) {
      issues.push('Empty src attribute');
    }
    if (content.includes('href="#"') && !content.includes('onClick')) {
      issues.push('Placeholder href="#" without onClick handler');
    }
    if (content.includes('undefined') && content.includes('href')) {
      issues.push('Possible undefined in href');
    }
    if (content.includes('null') && content.includes('href')) {
      issues.push('Possible null in href');
    }

    // Check for broken image paths
    const imgMatches = content.matchAll(/src=["']([^"']+\.(jpg|jpeg|png|gif|svg|webp))["']/gi);
    for (const match of imgMatches) {
      const imgPath = match[1];
      if (!imgPath.startsWith('http') && !imgPath.startsWith('/') && !imgPath.startsWith('data:')) {
        issues.push(`Relative image path: ${imgPath}`);
      }
    }

    if (issues.length > 0) {
      brokenLinks.push({
        file: filePath.replace('/workspaces/fix2/', ''),
        issues
      });
    }

    checkedFiles.push(filePath);
  } catch (error) {
    // Skip files that can't be read
  }
}

async function scanDirectory(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      // Skip node_modules, .next, .git, etc.
      if (entry.name === 'node_modules' || 
          entry.name === '.next' || 
          entry.name === '.git' ||
          entry.name === 'dist' ||
          entry.name === 'build') {
        continue;
      }
      
      if (entry.isDirectory()) {
        await scanDirectory(fullPath);
      } else if (entry.isFile()) {
        const ext = extname(entry.name);
        if (['.tsx', '.ts', '.jsx', '.js', '.html'].includes(ext)) {
          await checkFile(fullPath);
        }
      }
    }
  } catch (error) {
    // Skip directories we can't access
  }
}

console.log('🔍 Scanning entire codebase for broken links...\n');

await scanDirectory('/workspaces/fix2/app');
await scanDirectory('/workspaces/fix2/components');
await scanDirectory('/workspaces/fix2/lib');

console.log(`\n📊 Scan Complete!`);
console.log(`✅ Files checked: ${checkedFiles.length}`);
console.log(`❌ Files with issues: ${brokenLinks.length}\n`);

if (brokenLinks.length > 0) {
  console.log('🚨 BROKEN LINKS FOUND:\n');
  brokenLinks.forEach(({ file, issues }) => {
    console.log(`📄 ${file}`);
    issues.forEach(issue => console.log(`   ❌ ${issue}`));
    console.log('');
  });
} else {
  console.log('✅ No broken links found!');
}

// Output JSON for parsing
console.log('\n--- JSON OUTPUT ---');
console.log(JSON.stringify({ 
  totalFiles: checkedFiles.length,
  filesWithIssues: brokenLinks.length,
  issues: brokenLinks 
}, null, 2));
