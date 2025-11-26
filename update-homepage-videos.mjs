#!/usr/bin/env node
/**
 * Update Homepage with InVideo AI Video URLs
 * 
 * Usage: node update-homepage-videos.mjs [barber-url] [medical-url] [hvac-url]
 * 
 * Example:
 * node update-homepage-videos.mjs \
 *   https://ai.invideo.io/watch/ABC123 \
 *   https://ai.invideo.io/watch/DEF456 \
 *   https://ai.invideo.io/watch/GHI789
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);

if (args.length !== 3) {
  console.log('❌ Error: Need 3 video URLs\n');
  console.log('Usage:');
  console.log('  node update-homepage-videos.mjs [barber-url] [medical-url] [hvac-url]\n');
  console.log('Example:');
  console.log('  node update-homepage-videos.mjs \\');
  console.log('    https://ai.invideo.io/watch/ABC123 \\');
  console.log('    https://ai.invideo.io/watch/DEF456 \\');
  console.log('    https://ai.invideo.io/watch/GHI789\n');
  process.exit(1);
}

const [barberUrl, medicalUrl, hvacUrl] = args;

console.log('🎬 Updating Homepage with Video URLs');
console.log('=====================================\n');
console.log('Barber:', barberUrl);
console.log('Medical:', medicalUrl);
console.log('HVAC:', hvacUrl);
console.log('');

// Read homepage
const homepagePath = path.join(__dirname, 'app', 'page.tsx');
let content = fs.readFileSync(homepagePath, 'utf8');

// Convert InVideo URLs to embed format
const getEmbedUrl = (url) => {
  // InVideo format: https://ai.invideo.io/watch/VIDEO_ID
  // Embed format: https://ai.invideo.io/embed/VIDEO_ID
  return url.replace('/watch/', '/embed/');
};

const barberEmbed = getEmbedUrl(barberUrl);
const medicalEmbed = getEmbedUrl(medicalUrl);
const hvacEmbed = getEmbedUrl(hvacUrl);

// Update the video section to use iframes instead of images
const newVideoSection = `          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Barber Program Video */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-56 sm:h-64 group">
              <iframe
                src="${barberEmbed}"
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
              <div className="absolute bottom-4 left-4 text-white bg-black/60 px-3 py-1 rounded-lg">
                <p className="text-sm font-bold">Barber Apprenticeship</p>
              </div>
            </div>

            {/* Medical Assistant Program Video */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-56 sm:h-64 group">
              <iframe
                src="${medicalEmbed}"
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
              <div className="absolute bottom-4 left-4 text-white bg-black/60 px-3 py-1 rounded-lg">
                <p className="text-sm font-bold">Medical Assistant</p>
              </div>
            </div>

            {/* HVAC Program Video */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-56 sm:h-64 group">
              <iframe
                src="${hvacEmbed}"
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
              <div className="absolute bottom-4 left-4 text-white bg-black/60 px-3 py-1 rounded-lg">
                <p className="text-sm font-bold">HVAC Technician</p>
              </div>
            </div>
          </div>`;

// Find and replace the video grid section
const videoGridRegex = / {10}<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">[\s\S]*?<\/div>\s*<\/div>/;

if (videoGridRegex.test(content)) {
  content = content.replace(videoGridRegex, newVideoSection + '\n        </div>');
  
  // Write updated content
  fs.writeFileSync(homepagePath, content, 'utf8');
  
  console.log('✅ Homepage updated successfully!\n');
  console.log('📝 Changes made:');
  console.log('  - Replaced static images with video iframes');
  console.log('  - Added InVideo AI embeds');
  console.log('  - Maintained responsive layout\n');
  console.log('🚀 Next steps:');
  console.log('  1. Review changes: git diff app/page.tsx');
  console.log('  2. Test locally: npm run dev');
  console.log('  3. Commit: git add app/page.tsx && git commit -m "Add InVideo AI videos"');
  console.log('  4. Deploy: git push origin main\n');
} else {
  console.log('❌ Could not find video grid section in homepage');
  console.log('   The homepage structure may have changed');
  console.log('   Please update manually\n');
  process.exit(1);
}
