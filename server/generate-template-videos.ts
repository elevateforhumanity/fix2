/**
 * Generate Sample Videos from Templates
 * Pre-generates videos for all templates for demo/testing purposes
 */

import { videoTemplates } from '../src/data/video-templates';
import { generateVideo, VideoGenerationRequest } from './video-generator-v2';
import { defaultStorage } from './video-storage';
import path from 'path';
import fs from 'fs/promises';

async function generateTemplateVideos() {
  console.log('🎬 Generating Sample Videos from Templates\n');
  console.log(`Found ${videoTemplates.length} templates to process\n`);

  const results: Array<{
    template: string;
    status: 'success' | 'failed';
    videoPath?: string;
    error?: string;
  }> = [];

  for (let i = 0; i < videoTemplates.length; i++) {
    const template = videoTemplates[i];
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Processing ${i + 1}/${videoTemplates.length}: ${template.name}`);
    console.log(`${'='.repeat(60)}`);
    console.log(`Category: ${template.category}`);
    console.log(`Duration: ${template.duration}s`);
    console.log(`Scenes: ${template.scenes.length}`);
    console.log('');

    try {
      // Convert template to video generation request
      const request: VideoGenerationRequest = {
        title: template.name,
        scenes: template.scenes.map((scene, idx) => ({
          id: `${template.id}-scene-${idx + 1}`,
          type: scene.type,
          duration: scene.duration,
          script: scene.script,
          voiceOver: scene.voiceOver,
          background: scene.background,
          textPosition: scene.textPosition,
          animation: scene.animation,
          image: scene.media?.url,
          textStyle: scene.textStyle
        })),
        settings: {
          format: template.format || '16:9',
          resolution: '720p', // Use 720p for faster generation
          voiceOver: true,
          backgroundMusic: false,
          voice: 'alloy'
        },
        userId: 'template-generator'
      };

      console.log('Starting video generation...');
      const result = await generateVideo(request);

      if (result.status === 'completed' && result.videoPath) {
        console.log('✅ Video generated successfully!');
        console.log(`   Job ID: ${result.jobId}`);
        console.log(`   Duration: ${result.duration}s`);
        console.log(`   Path: ${result.videoPath}`);

        // Copy to samples directory
        const samplesDir = path.join(process.cwd(), 'samples');
        await fs.mkdir(samplesDir, { recursive: true });
        
        const samplePath = path.join(samplesDir, `${template.id}.mp4`);
        await fs.copyFile(result.videoPath, samplePath);
        
        console.log(`   Sample: ${samplePath}`);

        results.push({
          template: template.name,
          status: 'success',
          videoPath: samplePath
        });
      } else {
        console.error('❌ Video generation failed');
        console.error(`   Error: ${result.error}`);
        
        results.push({
          template: template.name,
          status: 'failed',
          error: result.error
        });
      }
    } catch (error) {
      console.error('❌ Error generating video:', error);
      
      results.push({
        template: template.name,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Add delay between generations to avoid overwhelming the system
    if (i < videoTemplates.length - 1) {
      console.log('\nWaiting 5 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  // Print summary
  console.log('\n\n' + '='.repeat(60));
  console.log('GENERATION SUMMARY');
  console.log('='.repeat(60));
  console.log('');

  const successful = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status === 'failed');

  console.log(`Total Templates: ${videoTemplates.length}`);
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log('');

  if (successful.length > 0) {
    console.log('Successful Generations:');
    successful.forEach(r => {
      console.log(`  ✅ ${r.template}`);
      console.log(`     ${r.videoPath}`);
    });
    console.log('');
  }

  if (failed.length > 0) {
    console.log('Failed Generations:');
    failed.forEach(r => {
      console.log(`  ❌ ${r.template}`);
      console.log(`     Error: ${r.error}`);
    });
    console.log('');
  }

  console.log('All sample videos saved to: ./samples/');
  console.log('');

  // Create index file
  const indexPath = path.join(process.cwd(), 'samples', 'README.md');
  const indexContent = `# Sample Videos from Templates

Generated: ${new Date().toISOString()}

## Videos

${successful.map(r => `- **${r.template}**
  - File: \`${path.basename(r.videoPath!)}\`
  - Status: ✅ Generated
`).join('\n')}

${failed.length > 0 ? `## Failed

${failed.map(r => `- **${r.template}**
  - Error: ${r.error}
`).join('\n')}` : ''}

## Usage

These sample videos demonstrate the capabilities of the AI Video Builder templates.
Each video was generated using:
- Resolution: 720p
- Format: As specified in template
- Voice: Alloy (OpenAI TTS)
- Quality: Medium

To regenerate these videos, run:
\`\`\`bash
pnpm video:generate-samples
\`\`\`
`;

  await fs.writeFile(indexPath, indexContent);
  console.log('Index file created: ./samples/README.md');
}

// Run generation
console.log('='.repeat(60));
console.log('TEMPLATE VIDEO GENERATOR');
console.log('='.repeat(60));
console.log('');
console.log('This will generate sample videos for all templates.');
console.log('This may take 30-60 minutes depending on your system.');
console.log('');
console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...');
console.log('');

setTimeout(() => {
  generateTemplateVideos()
    .then(() => {
      console.log('');
      console.log('✅ Template video generation complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('');
      console.error('❌ Template video generation failed:', error);
      process.exit(1);
    });
}, 5000);
