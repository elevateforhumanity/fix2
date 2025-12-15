#!/usr/bin/env node
import { readFile } from 'fs/promises';

const content = await readFile('app/page.tsx', 'utf-8');
const lines = content.split('\n');
const issues = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const lineNum = i + 1;

  // Missing alt text
  if ((line.includes('<Image') || line.includes('<img')) && !line.includes('alt=')) {
    const nextLine = lines[i + 1] || '';
    if (!nextLine.includes('alt=')) {
      issues.push({ line: lineNum, type: 'missing_alt', code: line.trim().substring(0, 80) });
    }
  }

  // Missing responsive classes on large text
  if (line.includes('text-4xl') || line.includes('text-5xl') || line.includes('text-6xl')) {
    if (!line.includes('md:') && !line.includes('sm:') && !line.includes('lg:')) {
      issues.push({ line: lineNum, type: 'missing_responsive', code: line.trim().substring(0, 80) });
    }
  }

  // Inconsistent buttons
  if (line.includes('className') && (line.includes('Link') || line.includes('button'))) {
    if (line.includes('px-') && line.includes('py-')) {
      // Good
    } else if (line.includes('href') || line.includes('onClick')) {
      issues.push({ line: lineNum, type: 'inconsistent_button', code: line.trim().substring(0, 80) });
    }
  }
}

console.log(`Found ${issues.length} issues in homepage:\n`);
issues.forEach(issue => {
  console.log(`Line ${issue.line}: ${issue.type}`);
  console.log(`  ${issue.code}...`);
  console.log('');
});
