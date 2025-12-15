#!/usr/bin/env node

import { readdir, readFile } from 'fs/promises';
import { join, extname } from 'path';

const realIssues = [];

async function checkFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    const issues = [];

    // Check for ACTUAL empty hrefs (not in comments)
    const emptyHrefMatches = content.matchAll(/href=["']["']/g);
    for (const match of emptyHrefMatches) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      issues.push({ type: 'empty_href', line: lineNum });
    }

    // Check for href="#" without onClick (not in comments)
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Skip comments
      if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;
      
      // Check for href="#" without onClick
      if (line.includes('href="#"') && !line.includes('onClick')) {
        issues.push({ type: 'placeholder_href', line: i + 1, code: line.trim() });
      }

      // Check for href={undefined} or href={null}
      if (line.includes('href={undefined}') || line.includes('href={null}')) {
        issues.push({ type: 'undefined_href', line: i + 1, code: line.trim() });
      }

      // Check for broken image paths
      if (line.includes('src=') && !line.includes('//')) {
        const imgMatch = line.match(/src=["']([^"']+)["']/);
        if (imgMatch && imgMatch[1]) {
          const imgPath = imgMatch[1];
          if (!imgPath.startsWith('/') && !imgPath.startsWith('data:') && !imgPath.startsWith('http')) {
            issues.push({ type: 'relative_image', line: i + 1, path: imgPath });
          }
        }
      }
    }

    if (issues.length > 0) {
      realIssues.push({
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
          entry.name === 'dist' ||
          entry.name === 'build' ||
          entry.name.includes('backup')) {
        continue;
      }
      
      if (entry.isDirectory()) {
        await scanDirectory(fullPath);
      } else if (entry.isFile()) {
        const ext = extname(entry.name);
        if (['.tsx', '.ts', '.jsx', '.js'].includes(ext)) {
          await checkFile(fullPath);
        }
      }
    }
  } catch (error) {
    // Skip directories we can't access
  }
}

console.log('🔍 Finding REAL broken links...\n');

await scanDirectory('/workspaces/fix2/app');
await scanDirectory('/workspaces/fix2/components');

console.log(`\n📊 Found ${realIssues.length} files with REAL issues:\n`);

if (realIssues.length > 0) {
  realIssues.forEach(({ file, issues }) => {
    console.log(`\n📄 ${file}`);
    issues.forEach(issue => {
      if (issue.type === 'empty_href') {
        console.log(`   ❌ Line ${issue.line}: Empty href=""`);
      } else if (issue.type === 'placeholder_href') {
        console.log(`   ❌ Line ${issue.line}: Placeholder href="#" without onClick`);
        console.log(`      ${issue.code.substring(0, 100)}...`);
      } else if (issue.type === 'undefined_href') {
        console.log(`   ❌ Line ${issue.line}: href={undefined} or href={null}`);
        console.log(`      ${issue.code.substring(0, 100)}...`);
      } else if (issue.type === 'relative_image') {
        console.log(`   ⚠️  Line ${issue.line}: Relative image path: ${issue.path}`);
      }
    });
  });
} else {
  console.log('✅ No real broken links found!');
}

console.log('\n--- JSON OUTPUT ---');
console.log(JSON.stringify(realIssues, null, 2));
