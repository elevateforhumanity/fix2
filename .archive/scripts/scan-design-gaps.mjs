#!/usr/bin/env node
/**
 * Scan website for design gaps and inconsistencies
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const designIssues = [];

async function scanFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    const issues = [];
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      // Check for inconsistent spacing classes
      if (line.includes('className') && line.includes('py-')) {
        const pyMatches = line.match(/py-(\d+)/g);
        if (pyMatches && pyMatches.length > 1) {
          issues.push({ type: 'inconsistent_spacing', line: lineNum, detail: 'Multiple py- classes' });
        }
      }

      // Check for missing alt text on images
      if (line.includes('<Image') || line.includes('<img')) {
        if (!line.includes('alt=') && !lines[i + 1]?.includes('alt=')) {
          issues.push({ type: 'missing_alt', line: lineNum, detail: 'Image missing alt text' });
        }
      }

      // Check for empty sections
      if (line.includes('<section') && lines[i + 1]?.trim() === '</section>') {
        issues.push({ type: 'empty_section', line: lineNum, detail: 'Empty section tag' });
      }

      // Check for inconsistent button styles
      if (line.includes('className') && (line.includes('button') || line.includes('btn'))) {
        if (!line.includes('px-') || !line.includes('py-')) {
          issues.push({ type: 'inconsistent_button', line: lineNum, detail: 'Button missing padding' });
        }
      }

      // Check for hardcoded colors (should use theme)
      if (line.includes('bg-[#') || line.includes('text-[#')) {
        issues.push({ type: 'hardcoded_color', line: lineNum, detail: 'Hardcoded hex color instead of theme' });
      }

      // Check for missing responsive classes
      if (line.includes('text-') && !line.includes('md:') && !line.includes('sm:') && !line.includes('lg:')) {
        if (line.includes('text-4xl') || line.includes('text-5xl') || line.includes('text-6xl')) {
          issues.push({ type: 'missing_responsive', line: lineNum, detail: 'Large text without responsive classes' });
        }
      }

      // Check for inconsistent container usage
      if (line.includes('max-w-')) {
        const maxWMatches = line.match(/max-w-(\w+)/g);
        if (maxWMatches && maxWMatches.length > 1) {
          issues.push({ type: 'inconsistent_container', line: lineNum, detail: 'Multiple max-w classes' });
        }
      }
    }

    if (issues.length > 0) {
      designIssues.push({
        file: filePath.replace('/workspaces/fix2/', ''),
        issues
      });
    }
  } catch (error) {
    // Skip files that can't be read
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
        await scanFile(fullPath);
      }
    }
  } catch (error) {
    // Skip directories we can't access
  }
}

console.log('🔍 Scanning for design gaps and inconsistencies...\n');

await scanDirectory('/workspaces/fix2/app');
await scanDirectory('/workspaces/fix2/components');

console.log(`\n📊 Found ${designIssues.length} files with design issues:\n`);

const issueTypes = {
  inconsistent_spacing: 0,
  missing_alt: 0,
  empty_section: 0,
  inconsistent_button: 0,
  hardcoded_color: 0,
  missing_responsive: 0,
  inconsistent_container: 0
};

designIssues.forEach(({ file, issues }) => {
  issues.forEach(issue => {
    issueTypes[issue.type]++;
  });
});

console.log('📈 Issue Summary:');
console.log(`   Inconsistent Spacing: ${issueTypes.inconsistent_spacing}`);
console.log(`   Missing Alt Text: ${issueTypes.missing_alt}`);
console.log(`   Empty Sections: ${issueTypes.empty_section}`);
console.log(`   Inconsistent Buttons: ${issueTypes.inconsistent_button}`);
console.log(`   Hardcoded Colors: ${issueTypes.hardcoded_color}`);
console.log(`   Missing Responsive: ${issueTypes.missing_responsive}`);
console.log(`   Inconsistent Containers: ${issueTypes.inconsistent_container}`);

console.log('\n--- Top 20 Files with Most Issues ---\n');
designIssues
  .sort((a, b) => b.issues.length - a.issues.length)
  .slice(0, 20)
  .forEach(({ file, issues }) => {
    console.log(`📄 ${file} (${issues.length} issues)`);
  });
