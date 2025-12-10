#!/usr/bin/env node
/**
 * Script to fix TypeScript 'any' types with proper types
 * Handles common patterns and suggests fixes
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
  // Error handling
  'catch (err: any)': 'catch (err: unknown)',
  'catch (error: any)': 'catch (error: unknown)',
  'catch (e: any)': 'catch (e: unknown)',
  
  // Array reduce
  'reduce((acc: any,': 'reduce((acc: Record<string, any>,',
  'reduce((acc: any[],': 'reduce((acc: unknown[],',
  
  // Map functions with any
  '.map((course: any)': '.map((course: Record<string, any>)',
  '.map((user: any)': '.map((user: Record<string, any>)',
  '.map((item: any)': '.map((item: Record<string, any>)',
  '.map((enrollment: any)': '.map((enrollment: Record<string, any>)',
  '.map((student: any)': '.map((student: Record<string, any>)',
  '.map((application: any)': '.map((application: Record<string, any>)',
  '.map((submission: any)': '.map((submission: Record<string, any>)',
  '.map((advance: any)': '.map((advance: Record<string, any>)',
  '.map((grant: any)': '.map((grant: Record<string, any>)',
  '.map((provider: any)': '.map((provider: Record<string, any>)',
  '.map((r: any)': '.map((r: Record<string, any>)',
  '.map((b: any)': '.map((b: Record<string, any>)',
  '.map((f: any)': '.map((f: Record<string, any>)',
  '.map((s: any)': '.map((s: Record<string, any>)',
  '.map((a: any)': '.map((a: Record<string, any>)',
  
  // Filter functions
  '.filter((a: any)': '.filter((a: Record<string, any>)',
  '.filter((s: any)': '.filter((s: Record<string, any>)',
  
  // Type assertions
  'as any)': 'as string)',
  
  // Object types
  ': any;': ': unknown;',
  ': any[]': ': unknown[]',
  ': any =': ': unknown =',
};

// More specific type replacements
const specificFixes = {
  // Icon components
  'icon: any': 'icon: React.ComponentType<any> | React.ReactElement',
  
  // Event handlers
  'onChange={(e) => ': 'onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => ',
  'onClick={(e) => ': 'onClick={(e: React.MouseEvent<HTMLElement>) => ',
  'onSubmit={(e) => ': 'onSubmit={(e: React.FormEvent<HTMLFormElement>) => ',
  
  // Common props
  'props: any': 'props: Record<string, unknown>',
  'data: any': 'data: Record<string, unknown>',
  'params: any': 'params: Record<string, unknown>',
  'options: any': 'options: Record<string, unknown>',
};

let totalFiles = 0;
let totalReplacements = 0;

function fixFile(filePath) {
  try {
    let content = readFileSync(filePath, 'utf-8');
    let originalContent = content;
    let fileReplacements = 0;

    // Apply general fixes
    for (const [pattern, replacement] of Object.entries(fixes)) {
      const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, replacement);
        fileReplacements += matches.length;
      }
    }

    // Apply specific fixes
    for (const [pattern, replacement] of Object.entries(specificFixes)) {
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

// Find all TypeScript files
const files = [
  ...getAllFiles('app'),
  ...getAllFiles('lib'),
  ...getAllFiles('components'),
];

console.log(`🔍 Found ${files.length} TypeScript files to check\n`);

files.forEach(fixFile);

console.log(`\n✅ Complete!`);
console.log(`📊 Fixed ${totalReplacements} 'any' types across ${totalFiles} files`);
console.log(`\n⚠️  Note: Some 'any' types may require manual review for proper typing`);
