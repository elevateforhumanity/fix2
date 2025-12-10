#!/usr/bin/env node
/**
 * Second pass: Fix remaining TypeScript 'any' types
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = join(dirPath, file);
    if (statSync(filePath).isDirectory()) {
      if (!file.includes('node_modules') && !file.startsWith('.')) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      arrayOfFiles.push(filePath);
    }
  });
  return arrayOfFiles;
}

const fixes = {
  // Remaining reduce patterns
  'reduce((acc: Record<string, any>, course: any)': 'reduce((acc: Record<string, unknown>, course: Record<string, unknown>)',
  'reduce((sum: number, t: any)': 'reduce((sum: number, t: Record<string, unknown>)',
  'reduce((sum: number, mp: any)': 'reduce((sum: number, mp: Record<string, unknown>)',
  
  // Remaining map patterns
  '.map((enrollment: any,': '.map((enrollment: Record<string, unknown>,',
  '.map((app: any)': '.map((app: Record<string, unknown>)',
  '.map((u: any)': '.map((u: Record<string, unknown>)',
  '.map((ic: any,': '.map((ic: Record<string, unknown>,',
  '.map((e: any)': '.map((e: Record<string, unknown>)',
  '.map((program: any)': '.map((program: Record<string, unknown>)',
  '.map((preparer: any)': '.map((preparer: Record<string, unknown>)',
  
  // Filter patterns
  '.filter((e: any)': '.filter((e: Record<string, unknown>)',
  '.filter((p: any)': '.filter((p: Record<string, unknown>)',
  '(t: any) =>': '(t: Record<string, unknown>) =>',
  '(mp: any) =>': '(mp: Record<string, unknown>) =>',
  
  // Type assertions - be more specific
  'e.target.value as any': 'e.target.value',
  'provider as any': 'provider as string',
  
  // Function parameters
  'supabase: any,': 'supabase: any, // TODO: Type with SupabaseClient',
  'reportData: any': 'reportData: Record<string, unknown>',
};

let totalFiles = 0;
let totalReplacements = 0;

function fixFile(filePath) {
  try {
    let content = readFileSync(filePath, 'utf-8');
    let originalContent = content;
    let fileReplacements = 0;

    for (const [pattern, replacement] of Object.entries(fixes)) {
      const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, replacement);
        fileReplacements += matches.length;
      }
    }

    if (content !== originalContent) {
      writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ Fixed ${fileReplacements} instances in ${filePath}`);
      totalReplacements += fileReplacements;
      totalFiles++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

const files = [
  ...getAllFiles('app'),
  ...getAllFiles('lib'),
  ...getAllFiles('components'),
];

console.log(`🔍 Pass 2: Checking ${files.length} TypeScript files\n`);
files.forEach(fixFile);

console.log(`\n✅ Pass 2 Complete!`);
console.log(`📊 Fixed ${totalReplacements} more 'any' types across ${totalFiles} files`);
