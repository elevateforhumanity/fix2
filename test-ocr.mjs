#!/usr/bin/env node
/**
 * Test Tesseract.js OCR
 * Creates a simple test image with text and extracts it
 */

import Tesseract from 'tesseract.js';
import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';

console.log('🧪 Testing Tesseract.js OCR');
console.log('============================\n');

// Create a test image with text
console.log('1. Creating test image with text...');
const canvas = createCanvas(800, 200);
const ctx = canvas.getContext('2d');

// White background
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, 800, 200);

// Black text
ctx.fillStyle = 'black';
ctx.font = 'bold 48px Arial';
ctx.fillText('Elevate for Humanity', 50, 100);
ctx.font = '32px Arial';
ctx.fillText('Workforce Training Programs', 50, 150);

// Save test image
const buffer = canvas.toBuffer('image/png');
writeFileSync('test-image.png', buffer);
console.log('✅ Test image created: test-image.png\n');

// Test OCR
console.log('2. Running OCR on test image...');
try {
  const result = await Tesseract.recognize(
    buffer,
    'eng',
    {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          process.stdout.write(`\r   Progress: ${Math.round(m.progress * 100)}%`);
        }
      },
    }
  );

  console.log('\n\n3. OCR Results:');
  console.log('   Text extracted:', result.data.text.trim());
  console.log('   Confidence:', Math.round(result.data.confidence) + '%');
  console.log('   Words found:', result.data.words.length);
  
  console.log('\n4. Word-by-word analysis:');
  result.data.words.forEach((word, i) => {
    console.log(`   ${i + 1}. "${word.text}" (${Math.round(word.confidence)}% confidence)`);
  });

  console.log('\n============================');
  console.log('✅ OCR Test Complete\n');
  
  console.log('Tesseract.js is working correctly!');
  console.log('You can now use it for:');
  console.log('- Document scanning');
  console.log('- Receipt OCR');
  console.log('- Form data extraction');
  console.log('- Certificate verification\n');

} catch (error) {
  console.error('\n❌ OCR Test Failed:', error.message);
  console.error('\nThis might mean:');
  console.error('- Tesseract.js not properly installed');
  console.error('- Missing dependencies');
  console.error('- Canvas not working\n');
  process.exit(1);
}
