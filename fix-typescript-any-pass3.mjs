#!/usr/bin/env node
/**
 * Third pass: Fix remaining complex 'any' patterns
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
  // Function parameters
  '(sum: number, mp: any)': '(sum: number, mp: { module?: { required_hours?: number } })',
  '(sum: number, q: any)': '(sum: number, q: { points?: number })',
  '(a: any, b: any) => a + (b.percent': '(a: number, b: { percent?: number }) => a + (b.percent',
  '(a: any, b: any) => a + (b.minutes': '(a: number, b: { minutes?: number }) => a + (b.minutes',
  '(a: any, b: any) => a.order_index': '(a: { order_index: number }, b: { order_index: number }) => a.order_index',
  
  // Map/forEach patterns
  '.map(async (program: any)': '.map(async (program: Record<string, unknown>)',
  '.forEach((ev: any)': '.forEach((ev: Record<string, unknown>)',
  '.forEach((question: any)': '.forEach((question: Record<string, unknown>)',
  '.forEach((row: any)': '.forEach((row: Record<string, unknown>)',
  '.filter((row: any)': '.filter((row: Record<string, unknown>)',
  '.filter((r: any)': '.filter((r: Record<string, unknown>)',
  '.filter((u: any)': '.filter((u: Record<string, unknown>)',
  
  // Map with specific patterns
  '.map((q: any,': '.map((q: Record<string, unknown>,',
  '.map((module: any,': '.map((module: Record<string, unknown>,',
  '.map((block: any)': '.map((block: Record<string, unknown>)',
  '.map((h: any)': '.map((h: Record<string, unknown>)',
  '.map((n: any)': '.map((n: Record<string, unknown>)',
  '.map((row: any)': '.map((row: Record<string, unknown>)',
  '.map((c: any)': '.map((c: Record<string, unknown>)',
  '.map((cell: any)': '.map((cell: unknown)',
  
  // Reduce patterns
  'reduce((acc: number, m: any)': 'reduce((acc: number, m: { lessons: unknown[] })',
  
  // Type assertions
  'event.data.object as any': 'event.data.object',
  'action as any': 'action',
  
  // Function signatures
  'async function createStripeProduct(product: any)': 'async function createStripeProduct(product: Record<string, unknown>)',
  'async function postToSocialMedia(platform: string, content: string, campaign: any)': 'async function postToSocialMedia(platform: string, content: string, campaign: Record<string, unknown>)',
  'async function postToFacebook(content: string, campaign: any)': 'async function postToFacebook(content: string, campaign: Record<string, unknown>)',
  'async function postToTwitter(content: string, campaign: any)': 'async function postToTwitter(content: string, campaign: Record<string, unknown>)',
  'async function postToLinkedIn(content: string, campaign: any)': 'async function postToLinkedIn(content: string, campaign: Record<string, unknown>)',
  'async function postToInstagram(content: string, campaign: any)': 'async function postToInstagram(content: string, campaign: Record<string, unknown>)',
  'async function notifyTeam(callbackData: any)': 'async function notifyTeam(callbackData: Record<string, unknown>)',
  'async function getHandler(req: any, context: any, user: any)': 'async function getHandler(req: Request, context: Record<string, unknown>, user: Record<string, unknown>)',
  'function escapeCsvField(field: any)': 'function escapeCsvField(field: unknown)',
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

console.log(`🔍 Pass 3: Checking ${files.length} TypeScript files\n`);
files.forEach(fixFile);

console.log(`\n✅ Pass 3 Complete!`);
console.log(`📊 Fixed ${totalReplacements} more 'any' types across ${totalFiles} files`);
