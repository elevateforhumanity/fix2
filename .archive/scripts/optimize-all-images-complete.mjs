#!/usr/bin/env node
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const QUALITY = 85;

let processed = 0;
let skipped = 0;
let totalSaved = 0;

async function optimizeImage(filePath) {
  try {
    const stats = await stat(filePath);
    const sizeKB = stats.size / 1024;
    
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    let pipeline = image;
    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      pipeline = pipeline.resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    if (filePath.endsWith('.png')) {
      await pipeline
        .png({ quality: QUALITY, compressionLevel: 9 })
        .toFile(filePath + '.tmp');
    } else {
      await pipeline
        .jpeg({ quality: QUALITY, progressive: true })
        .toFile(filePath + '.tmp');
    }
    
    const newStats = await stat(filePath + '.tmp');
    const newSizeKB = newStats.size / 1024;
    const savedKB = sizeKB - newSizeKB;
    
    if (savedKB > 10) { // Only replace if we save at least 10KB
      const fs = await import('fs');
      fs.renameSync(filePath + '.tmp', filePath);
      totalSaved += savedKB;
      processed++;
      console.log(`✅ ${filePath.replace('public/images/', '')}: ${sizeKB.toFixed(0)}KB → ${newSizeKB.toFixed(0)}KB (-${savedKB.toFixed(0)}KB)`);
    } else {
      const fs = await import('fs');
      fs.unlinkSync(filePath + '.tmp');
      skipped++;
    }
  } catch (error) {
    console.error(`❌ ${filePath}: ${error.message}`);
  }
}

async function walkDirectory(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = join(dir, file.name);
    
    if (file.isDirectory()) {
      await walkDirectory(fullPath);
    } else if (/\.(jpg|jpeg|png)$/i.test(file.name)) {
      await optimizeImage(fullPath);
    }
  }
}

console.log('🖼️  Optimizing ALL images...\n');
const startTime = Date.now();

await walkDirectory('public/images');

const duration = ((Date.now() - startTime) / 1000).toFixed(1);
console.log(`\n✅ Complete in ${duration}s`);
console.log(`   Optimized: ${processed} images`);
console.log(`   Skipped: ${skipped} images (already optimal)`);
console.log(`   Total saved: ${(totalSaved / 1024).toFixed(2)}MB`);
