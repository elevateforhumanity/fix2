#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const issues = {
  lowQualityImages: [],
  missingAltText: [],
  noMetadata: [],
  noCanonical: [],
  noDescription: [],
  noGoogleAnalytics: [],
  improperImageSizing: []
};

let totalPages = 0;
let perfectPages = 0;

function checkPage(filePath) {
  totalPages++;
  
  try {
    const content = readFileSync(filePath, 'utf-8');
    const relativePath = filePath.replace('app/', '/').replace('/page.tsx', '');
    let pageIssues = [];
    
    // Check metadata
    const hasMetadata = content.includes('export const metadata');
    const hasCanonical = content.includes('canonical:');
    const hasTitle = content.includes('title:');
    const hasDescription = content.includes('description:');
    
    if (!hasMetadata) {
      issues.noMetadata.push(relativePath);
      pageIssues.push('no-metadata');
    }
    if (!hasCanonical) {
      issues.noCanonical.push(relativePath);
      pageIssues.push('no-canonical');
    }
    if (!hasDescription) {
      issues.noDescription.push(relativePath);
      pageIssues.push('no-description');
    }
    
    // Check images
    const imageMatches = content.match(/<Image[^>]*>/g) || [];
    for (const img of imageMatches) {
      // Check quality
      if (!img.includes('quality={100}') && !img.includes('quality={95}')) {
        if (!issues.lowQualityImages.includes(relativePath)) {
          issues.lowQualityImages.push(relativePath);
          pageIssues.push('low-quality-images');
        }
      }
      
      // Check alt text
      if (!img.includes('alt=')) {
        if (!issues.missingAltText.includes(relativePath)) {
          issues.missingAltText.push(relativePath);
          pageIssues.push('missing-alt-text');
        }
      }
      
      // Check sizing
      const hasFill = img.includes('fill');
      const hasWidth = img.includes('width=');
      const hasHeight = img.includes('height=');
      const hasSizes = img.includes('sizes=');
      
      if (hasFill && !hasSizes) {
        if (!issues.improperImageSizing.includes(relativePath)) {
          issues.improperImageSizing.push(relativePath);
          pageIssues.push('missing-sizes-prop');
        }
      }
    }
    
    // Check Google Analytics
    // Note: GA is typically in layout.tsx or _app.tsx, not individual pages
    
    if (pageIssues.length === 0) {
      perfectPages++;
    }
    
  } catch (error) {
    // Skip
  }
}

function scanDirectory(dir) {
  try {
    const items = readdirSync(dir);
    
    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanDirectory(fullPath);
      } else if (item === 'page.tsx') {
        checkPage(fullPath);
      }
    }
  } catch (error) {
    // Skip
  }
}

console.log('🔍 COMPREHENSIVE QUALITY CHECK');
console.log('='.repeat(80));
console.log('Checking images, metadata, SEO, and quality...\n');

scanDirectory('app');

console.log('='.repeat(80));
console.log('QUALITY REPORT');
console.log('='.repeat(80));
console.log(`Total Pages: ${totalPages}`);
console.log(`✅ Perfect Pages: ${perfectPages} (${Math.round(perfectPages/totalPages*100)}%)`);
console.log(`⚠️  Pages with Issues: ${totalPages - perfectPages} (${Math.round((totalPages-perfectPages)/totalPages*100)}%)`);
console.log('');

if (issues.lowQualityImages.length > 0) {
  console.log(`❌ Low Quality Images (${issues.lowQualityImages.length} pages):`);
  console.log(`   Images not set to quality={100}`);
  issues.lowQualityImages.slice(0, 10).forEach(p => console.log(`   ${p}`));
  if (issues.lowQualityImages.length > 10) console.log(`   ... and ${issues.lowQualityImages.length - 10} more`);
  console.log('');
}

if (issues.missingAltText.length > 0) {
  console.log(`❌ Missing Alt Text (${issues.missingAltText.length} pages):`);
  issues.missingAltText.slice(0, 10).forEach(p => console.log(`   ${p}`));
  if (issues.missingAltText.length > 10) console.log(`   ... and ${issues.missingAltText.length - 10} more`);
  console.log('');
}

if (issues.improperImageSizing.length > 0) {
  console.log(`❌ Improper Image Sizing (${issues.improperImageSizing.length} pages):`);
  console.log(`   Images with fill need sizes prop`);
  issues.improperImageSizing.slice(0, 10).forEach(p => console.log(`   ${p}`));
  if (issues.improperImageSizing.length > 10) console.log(`   ... and ${issues.improperImageSizing.length - 10} more`);
  console.log('');
}

if (issues.noMetadata.length > 0) {
  console.log(`❌ No Metadata (${issues.noMetadata.length} pages):`);
  issues.noMetadata.slice(0, 10).forEach(p => console.log(`   ${p}`));
  if (issues.noMetadata.length > 10) console.log(`   ... and ${issues.noMetadata.length - 10} more`);
  console.log('');
}

if (issues.noCanonical.length > 0) {
  console.log(`❌ No Canonical URL (${issues.noCanonical.length} pages):`);
  issues.noCanonical.slice(0, 10).forEach(p => console.log(`   ${p}`));
  if (issues.noCanonical.length > 10) console.log(`   ... and ${issues.noCanonical.length - 10} more`);
  console.log('');
}

if (issues.noDescription.length > 0) {
  console.log(`❌ No Description (${issues.noDescription.length} pages):`);
  issues.noDescription.slice(0, 10).forEach(p => console.log(`   ${p}`));
  if (issues.noDescription.length > 10) console.log(`   ... and ${issues.noDescription.length - 10} more`);
  console.log('');
}

console.log('='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));
console.log(`Image Quality Issues: ${issues.lowQualityImages.length}`);
console.log(`Alt Text Issues: ${issues.missingAltText.length}`);
console.log(`Image Sizing Issues: ${issues.improperImageSizing.length}`);
console.log(`Metadata Issues: ${issues.noMetadata.length}`);
console.log(`Canonical Issues: ${issues.noCanonical.length}`);
console.log(`Description Issues: ${issues.noDescription.length}`);

