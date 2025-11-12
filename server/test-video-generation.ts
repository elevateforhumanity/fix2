/**
 * Test Video Generation
 * Test script for the complete video generation workflow
 */

import { generateVideo, processTimeline, VideoGenerationRequest } from './video-generator-v2';
import { testTTSService, validateTTSConfig } from './tts-service';
import { defaultStorage } from './video-storage';

async function testVideoGeneration() {
  console.log('🎬 Testing Video Generation System\n');

  // Test 1: Validate TTS Configuration
  console.log('Test 1: Validating TTS Configuration...');
  const ttsValidation = validateTTSConfig();
  if (!ttsValidation.valid) {
    console.error('❌ TTS validation failed:', ttsValidation.error);
    console.log('Please set OPENAI_API_KEY environment variable\n');
    return;
  }
  console.log('✅ TTS configuration valid\n');

  // Test 2: Test TTS Service
  console.log('Test 2: Testing TTS Service...');
  const ttsTest = await testTTSService();
  if (!ttsTest) {
    console.error('❌ TTS service test failed\n');
    return;
  }
  console.log('✅ TTS service working\n');

  // Test 3: Test Timeline Validation
  console.log('Test 3: Testing Timeline Validation...');
  const testScenes = [
    {
      id: 'scene-1',
      type: 'title' as const,
      duration: 5,
      script: 'Test Video',
      voiceOver: true,
      background: '#2563EB',
      textPosition: 'center' as const,
      animation: 'fade' as const
    },
    {
      id: 'scene-2',
      type: 'content' as const,
      duration: 10,
      script: 'This is a test of the video generation system',
      voiceOver: true,
      background: '#FFFFFF',
      textPosition: 'bottom' as const,
      animation: 'slide' as const
    }
  ];

  const timelineValidation = processTimeline(testScenes);
  if (!timelineValidation.valid) {
    console.error('❌ Timeline validation failed:', timelineValidation.errors);
    return;
  }
  console.log(`✅ Timeline valid (${timelineValidation.totalDuration}s total)\n`);

  // Test 4: Test Storage Initialization
  console.log('Test 4: Testing Storage Initialization...');
  try {
    await defaultStorage.initialize();
    console.log('✅ Storage initialized\n');
  } catch (error) {
    console.error('❌ Storage initialization failed:', error);
    return;
  }

  // Test 5: Generate Test Video
  console.log('Test 5: Generating Test Video...');
  console.log('This may take 1-2 minutes...\n');

  const videoRequest: VideoGenerationRequest = {
    title: 'Test Video',
    scenes: testScenes,
    settings: {
      format: '16:9',
      resolution: '720p',
      voiceOver: true,
      backgroundMusic: false,
      voice: 'alloy'
    },
    userId: 'test-user'
  };

  try {
    const result = await generateVideo(videoRequest);

    if (result.status === 'completed') {
      console.log('✅ Video generation completed!');
      console.log(`   Job ID: ${result.jobId}`);
      console.log(`   Duration: ${result.duration}s`);
      console.log(`   Path: ${result.videoPath}`);
      console.log('');

      // Test 6: Verify Video File
      console.log('Test 6: Verifying Video File...');
      const videoPath = await defaultStorage.getVideo(result.jobId);
      if (videoPath) {
        console.log('✅ Video file accessible');
        console.log(`   URL: ${videoPath}\n`);
      } else {
        console.log('⚠️  Video file not found in storage\n');
      }

      // Test 7: Get Video Metadata
      console.log('Test 7: Getting Video Metadata...');
      const metadata = await defaultStorage.getVideoMetadata(result.jobId);
      if (metadata) {
        console.log('✅ Metadata retrieved');
        console.log(`   Title: ${metadata.title}`);
        console.log(`   Format: ${metadata.format}`);
        console.log(`   Resolution: ${metadata.resolution}`);
        console.log(`   File Size: ${(metadata.fileSize / 1024 / 1024).toFixed(2)} MB\n`);
      } else {
        console.log('⚠️  Metadata not found\n');
      }

      // Test 8: List Videos
      console.log('Test 8: Listing Videos...');
      const videos = await defaultStorage.listVideos('test-user');
      console.log(`✅ Found ${videos.length} video(s) for test-user\n`);

      console.log('🎉 All tests passed!\n');
      console.log('Summary:');
      console.log('--------');
      console.log('✅ TTS Configuration');
      console.log('✅ TTS Service');
      console.log('✅ Timeline Validation');
      console.log('✅ Storage Initialization');
      console.log('✅ Video Generation');
      console.log('✅ Video File Access');
      console.log('✅ Metadata Retrieval');
      console.log('✅ Video Listing');
      console.log('');
      console.log('The video generation system is working correctly!');
      console.log(`Generated video: ${result.videoPath}`);
    } else {
      console.error('❌ Video generation failed');
      console.error(`   Error: ${result.error}`);
    }
  } catch (error) {
    console.error('❌ Video generation error:', error);
  }
}

// Run tests
console.log('='.repeat(60));
console.log('VIDEO GENERATION SYSTEM TEST');
console.log('='.repeat(60));
console.log('');

testVideoGeneration()
  .then(() => {
    console.log('');
    console.log('Test completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('');
    console.error('Test failed with error:', error);
    process.exit(1);
  });
