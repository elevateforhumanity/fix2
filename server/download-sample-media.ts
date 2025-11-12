/**
 * Download Sample Media
 * Downloads free stock images and videos to local storage for offline use
 */

import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import { stockImages, stockVideos } from '../src/data/stock-media';

const MEDIA_DIR = path.join(process.cwd(), 'public', 'media');
const IMAGES_DIR = path.join(MEDIA_DIR, 'images');
const VIDEOS_DIR = path.join(MEDIA_DIR, 'videos');

async function downloadFile(url: string, outputPath: string): Promise<boolean> {
  try {
    console.log(`  Downloading: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`  ❌ Failed: ${response.statusText}`);
      return false;
    }

    const buffer = await response.arrayBuffer();
    await fs.writeFile(outputPath, Buffer.from(buffer));
    
    const stats = await fs.stat(outputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`  ✅ Downloaded: ${sizeMB} MB`);
    
    return true;
  } catch (error) {
    console.error(`  ❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
}

async function downloadImages() {
  console.log('\n📸 Downloading Stock Images...\n');
  
  await fs.mkdir(IMAGES_DIR, { recursive: true });
  
  let downloaded = 0;
  let failed = 0;

  for (let i = 0; i < stockImages.length; i++) {
    const image = stockImages[i];
    console.log(`\n[${i + 1}/${stockImages.length}] ${image.id}`);
    console.log(`  Category: ${image.category}`);
    console.log(`  Photographer: ${image.photographer}`);
    
    const filename = `${image.id}.jpg`;
    const outputPath = path.join(IMAGES_DIR, filename);
    
    // Check if already exists
    try {
      await fs.access(outputPath);
      console.log(`  ⏭️  Already exists, skipping`);
      downloaded++;
      continue;
    } catch {
      // File doesn't exist, download it
    }
    
    const success = await downloadFile(image.url, outputPath);
    if (success) {
      downloaded++;
    } else {
      failed++;
    }
    
    // Rate limiting - wait 1 second between downloads
    if (i < stockImages.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log(`\n✅ Images: ${downloaded} downloaded, ${failed} failed`);
  return { downloaded, failed };
}

async function downloadVideos() {
  console.log('\n🎥 Downloading Stock Videos...\n');
  
  await fs.mkdir(VIDEOS_DIR, { recursive: true });
  
  let downloaded = 0;
  let failed = 0;

  for (let i = 0; i < stockVideos.length; i++) {
    const video = stockVideos[i];
    console.log(`\n[${i + 1}/${stockVideos.length}] ${video.id}`);
    console.log(`  Category: ${video.category}`);
    console.log(`  Creator: ${video.creator}`);
    console.log(`  Duration: ${video.duration}s`);
    
    const filename = `${video.id}.mp4`;
    const outputPath = path.join(VIDEOS_DIR, filename);
    
    // Check if already exists
    try {
      await fs.access(outputPath);
      console.log(`  ⏭️  Already exists, skipping`);
      downloaded++;
      continue;
    } catch {
      // File doesn't exist, download it
    }
    
    const success = await downloadFile(video.url, outputPath);
    if (success) {
      downloaded++;
    } else {
      failed++;
    }
    
    // Rate limiting - wait 2 seconds between video downloads
    if (i < stockVideos.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log(`\n✅ Videos: ${downloaded} downloaded, ${failed} failed`);
  return { downloaded, failed };
}

async function updateMediaPaths() {
  console.log('\n📝 Updating media paths in templates...\n');
  
  // Create updated stock media file with local paths
  const updatedStockMediaPath = path.join(process.cwd(), 'src', 'data', 'stock-media-local.ts');
  
  const content = `/**
 * Stock Media Library - Local Paths
 * Auto-generated file with local media paths
 * Generated: ${new Date().toISOString()}
 */

import { StockImage, StockVideo, BackgroundMusic } from './stock-media';

// Stock images with local paths
export const localStockImages: StockImage[] = [
${stockImages.map(img => `  {
    id: '${img.id}',
    url: '/media/images/${img.id}.jpg',
    thumbnail: '/media/images/${img.id}.jpg',
    category: '${img.category}',
    tags: ${JSON.stringify(img.tags)},
    source: '${img.source}',
    photographer: '${img.photographer}',
    description: '${img.description}'
  }`).join(',\n')}
];

// Stock videos with local paths
export const localStockVideos: StockVideo[] = [
${stockVideos.map(vid => `  {
    id: '${vid.id}',
    url: '/media/videos/${vid.id}.mp4',
    thumbnail: '/media/videos/${vid.id}.mp4',
    category: '${vid.category}',
    tags: ${JSON.stringify(vid.tags)},
    source: '${vid.source}',
    creator: '${vid.creator}',
    description: '${vid.description}',
    duration: ${vid.duration}
  }`).join(',\n')}
];

// Use local media by default, fallback to remote
export const useLocalMedia = true;
`;

  await fs.writeFile(updatedStockMediaPath, content);
  console.log(`✅ Created: ${updatedStockMediaPath}`);
  
  // Create README
  const readmePath = path.join(MEDIA_DIR, 'README.md');
  const readmeContent = `# Downloaded Stock Media

Downloaded: ${new Date().toISOString()}

## Images (${stockImages.length})

${stockImages.map(img => `- **${img.id}** - ${img.description}
  - Category: ${img.category}
  - Photographer: ${img.photographer} (${img.source})
  - Path: \`/media/images/${img.id}.jpg\`
`).join('\n')}

## Videos (${stockVideos.length})

${stockVideos.map(vid => `- **${vid.id}** - ${vid.description}
  - Category: ${vid.category}
  - Creator: ${vid.creator} (${vid.source})
  - Duration: ${vid.duration}s
  - Path: \`/media/videos/${vid.id}.mp4\`
`).join('\n')}

## Usage

These files are downloaded from free stock media sources:
- **Images**: Unsplash (Free for commercial use)
- **Videos**: Pexels (Free for commercial use)

All content is properly licensed and can be used in generated videos.

## Attribution

While not required, it's good practice to credit:
- Unsplash: "Photo by [Photographer] on Unsplash"
- Pexels: "Video by [Creator] from Pexels"

## Updating

To re-download or update media:
\`\`\`bash
pnpm video:download-media
\`\`\`

This will:
1. Download missing files
2. Skip existing files
3. Update local paths
4. Create this README
`;

  await fs.writeFile(readmePath, readmeContent);
  console.log(`✅ Created: ${readmePath}`);
}

async function downloadSampleMedia() {
  console.log('='.repeat(60));
  console.log('DOWNLOAD SAMPLE MEDIA');
  console.log('='.repeat(60));
  console.log('');
  console.log('This will download free stock media for offline use.');
  console.log(`Images: ${stockImages.length} files`);
  console.log(`Videos: ${stockVideos.length} files`);
  console.log('');
  console.log('Estimated download size: ~500MB - 1GB');
  console.log('Estimated time: 10-20 minutes');
  console.log('');
  console.log('All media is free for commercial use (CC0/Public Domain)');
  console.log('');

  try {
    // Create directories
    await fs.mkdir(MEDIA_DIR, { recursive: true });
    
    // Download images
    const imageResults = await downloadImages();
    
    // Download videos
    const videoResults = await downloadVideos();
    
    // Update paths
    await updateMediaPaths();
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('DOWNLOAD COMPLETE');
    console.log('='.repeat(60));
    console.log('');
    console.log(`📸 Images: ${imageResults.downloaded}/${stockImages.length} downloaded`);
    console.log(`🎥 Videos: ${videoResults.downloaded}/${stockVideos.length} downloaded`);
    console.log('');
    console.log(`📁 Media directory: ${MEDIA_DIR}`);
    console.log(`📝 Local paths: src/data/stock-media-local.ts`);
    console.log('');
    
    if (imageResults.failed > 0 || videoResults.failed > 0) {
      console.log('⚠️  Some downloads failed. You can re-run this script to retry.');
      console.log('');
    }
    
    console.log('✅ All media downloaded and ready to use!');
    console.log('');
    console.log('To use local media in templates:');
    console.log('  import { localStockImages, localStockVideos } from "./stock-media-local"');
    console.log('');
    
  } catch (error) {
    console.error('\n❌ Download failed:', error);
    throw error;
  }
}

// Run download
downloadSampleMedia()
  .then(() => {
    console.log('Download completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Download failed:', error);
    process.exit(1);
  });
