#!/usr/bin/env node
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const QUALITY = 80;

async function optimizeImage(filePath) {
  try {
    const stats = await stat(filePath);
    const sizeMB = stats.size / (1024 * 1024);
    
    // Only optimize if > 500KB
    if (sizeMB < 0.5) {
      console.log(`⏭️  Skipping ${filePath} (${sizeMB.toFixed(2)}MB - already small)`);
      return;
    }

    console.log(`🔄 Optimizing ${filePath} (${sizeMB.toFixed(2)}MB)...`);
    
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Resize if too large
    let pipeline = image;
    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      pipeline = pipeline.resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Optimize based on format
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
    const newSizeMB = newStats.size / (1024 * 1024);
    const savings = ((sizeMB - newSizeMB) / sizeMB * 100).toFixed(1);
    
    // Replace original with optimized
    await import('fs').then(fs => {
      fs.renameSync(filePath + '.tmp', filePath);
    });
    
    console.log(`✅ ${filePath}: ${sizeMB.toFixed(2)}MB → ${newSizeMB.toFixed(2)}MB (${savings}% smaller)`);
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
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

console.log('🖼️  Image Optimization Starting...\n');
await walkDirectory('public/images');
console.log('\n✅ Image optimization complete!');
