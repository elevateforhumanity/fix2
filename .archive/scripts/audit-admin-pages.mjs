#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const adminDir = 'app/admin';
const results = {
  functional: [],
  placeholder: [],
  missing: []
};

function scanDirectory(dir) {
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (item === 'page.tsx') {
      const content = readFileSync(fullPath, 'utf-8');
      const relativePath = fullPath.replace('app/', '/');
      
      // Check if it's a placeholder
      if (content.includes('No recent activity') || 
          content.includes('Total Items</h3>\n                <p className="text-2xl font-bold text-blue-600">0</p>') ||
          content.includes('Discover more about')) {
        results.placeholder.push(relativePath);
      } else if (content.includes("'use client'") || 
                 content.includes('useState') || 
                 content.includes('useEffect') ||
                 content.includes('fetch(') ||
                 content.includes('supabase.from')) {
        results.functional.push(relativePath);
      } else {
        results.missing.push(relativePath);
      }
    }
  }
}

scanDirectory(adminDir);

console.log('='.repeat(80));
console.log('ADMIN PAGES AUDIT REPORT');
console.log('='.repeat(80));
console.log('');
console.log(`✅ FUNCTIONAL PAGES: ${results.functional.length}`);
console.log(`⚠️  PLACEHOLDER PAGES: ${results.placeholder.length}`);
console.log(`❌ MISSING/INCOMPLETE: ${results.missing.length}`);
console.log(`📊 TOTAL: ${results.functional.length + results.placeholder.length + results.missing.length}`);
console.log('');
console.log('='.repeat(80));
console.log('PLACEHOLDER PAGES THAT NEED FIXING:');
console.log('='.repeat(80));
results.placeholder.forEach((page, i) => {
  console.log(`${i + 1}. ${page}`);
});
console.log('');
console.log('='.repeat(80));
console.log('FUNCTIONAL PAGES:');
console.log('='.repeat(80));
results.functional.forEach((page, i) => {
  console.log(`${i + 1}. ${page}`);
});

