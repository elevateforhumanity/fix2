#!/usr/bin/env node
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const QUALITY = 85;
const MAX_SIZE_MB = 1;

async function resizeImage(filePath) {
  try {
    const stats = await stat(filePath);
    const sizeMB = stats.size / (1024 * 1024);
    
    if (sizeMB < MAX_SIZE_MB) {
      return null;
    }

    console.log(`Resizing ${filePath} (${sizeMB.toFixed(2)}MB)...`);
    
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Resize if needed
    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      await image
        .resize(MAX_WIDTH, MAX_HEIGHT, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: QUALITY })
        .toFile(filePath + '.tmp');
      
      // Replace original
      await sharp(filePath + '.tmp').toFile(filePath);
      const newStats = await stat(filePath);
      const newSizeMB = newStats.size / (1024 * 1024);
      
      console.log(`  ✓ Reduced from ${sizeMB.toFixed(2)}MB to ${newSizeMB.toFixed(2)}MB`);
      return { original: sizeMB, new: newSizeMB };
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
  return null;
}

async function findLargeImages(dir, results = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await findLargeImages(fullPath, results);
    } else if (entry.isFile() && /\.(jpg|jpeg|png)$/i.test(entry.name)) {
      const stats = await stat(fullPath);
      const sizeMB = stats.size / (1024 * 1024);
      
      if (sizeMB > MAX_SIZE_MB) {
        results.push(fullPath);
      }
    }
  }
  
  return results;
}

async function main() {
  console.log('🔍 Scanning for large images...\n');
  
  const largeImages = await findLargeImages('public/images');
  
  if (largeImages.length === 0) {
    console.log('✓ No images larger than 1MB found!');
    return;
  }
  
  console.log(`Found ${largeImages.length} images larger than 1MB\n`);
  
  let totalSaved = 0;
  
  for (const imagePath of largeImages) {
    const result = await resizeImage(imagePath);
    if (result) {
      totalSaved += (result.original - result.new);
    }
  }
  
  console.log(`\n✓ Complete! Saved ${totalSaved.toFixed(2)}MB total`);
}

main().catch(console.error);
