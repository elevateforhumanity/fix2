import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const publicDir = '/workspaces/fix2/public';

// Images to enhance
const imagesToEnhance = [
  // Location photos (low quality - need enhancement)
  'images/location-1.jpg',
  'images/location-2.jpg',
  'images/location-3.jpg',
  'images/location-4.jpg',
  'images/location-5.jpg',
  'images/location-6.jpg',
  'images/location-7.jpg',
  'images/location-8.jpg',
  'images/location-9.jpg',
  'images/location-10.jpg',
  'images/location-11.jpg',
];

async function enhanceImage(inputPath) {
  try {
    const fullInputPath = join(publicDir, inputPath);
    const tempPath = fullInputPath + '.tmp';
    
    console.log(`Enhancing: ${inputPath}`);
    
    // Process to temp file
    await sharp(fullInputPath)
      .resize(1920, 1280, {
        fit: 'cover',
        position: 'center',
        withoutEnlargement: false // Allow upscaling
      })
      .sharpen({
        sigma: 1.5,
        m1: 1.0,
        m2: 0.7,
        x1: 3,
        y2: 15,
        y3: 15
      })
      .modulate({
        brightness: 1.05,
        saturation: 1.1,
        hue: 0
      })
      .jpeg({
        quality: 95,
        chromaSubsampling: '4:4:4',
        mozjpeg: true
      })
      .withMetadata({
        density: 300 // 300 DPI
      })
      .toFile(tempPath);
    
    // Replace original with enhanced version
    const { rename } = await import('fs/promises');
    await rename(tempPath, fullInputPath);
    
    console.log(`✅ Enhanced: ${inputPath}`);
  } catch (error) {
    console.error(`❌ Failed to enhance ${inputPath}:`, error.message);
  }
}

async function enhanceAllImages() {
  console.log('Starting image enhancement...\n');
  
  for (const imagePath of imagesToEnhance) {
    await enhanceImage(imagePath);
  }
  
  console.log('\n✅ All images enhanced!');
  console.log('Resolution: 1920x1280');
  console.log('DPI: 300');
  console.log('Quality: 95%');
  console.log('Sharpening: Applied');
  console.log('Color enhancement: Applied');
}

enhanceAllImages();
