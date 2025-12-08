#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

// List of critical pages that need heroes and images
const criticalPages = [
  'app/about/page.tsx',
  'app/students/page.tsx',
  'app/employers/page.tsx',
  'app/success-stories/page.tsx',
  'app/marketplace/page.tsx',
  'app/lms/dashboard/page.tsx',
  'app/board/dashboard/page.tsx',
  'app/delegate/dashboard/page.tsx',
  'app/partner/dashboard/page.tsx',
  'app/workforce-board/dashboard/page.tsx',
];

let fixed = 0;

for (const pagePath of criticalPages) {
  try {
    const content = readFileSync(pagePath, 'utf-8');
    
    // Check if needs fixing
    const hasHero = content.includes('h-[400px]') || content.includes('h-[500px]') || content.includes('h-[600px]');
    const hasImage = content.includes('<Image') && content.includes('next/image');
    
    if (hasHero && hasImage) {
      console.log(`✅ ${pagePath} - Already complete`);
      continue;
    }
    
    // Add hero and images if missing
    const lines = content.split('\n');
    let newContent = content;
    
    // Find the return statement
    const returnIndex = lines.findIndex(line => line.trim().startsWith('return ('));
    
    if (returnIndex > -1 && !hasHero) {
      // Add Image import if missing
      if (!content.includes("import Image from 'next/image'")) {
        newContent = newContent.replace(
          "import Link from 'next/link';",
          "import Link from 'next/link';\nimport Image from 'next/image';"
        );
      }
      
      // Add hero section after return
      const heroSection = `
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Hero"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Transform your career with free training
          </p>
        </div>
      </section>
`;
      
      // Insert hero after the opening div
      newContent = newContent.replace(
        /<div className="min-h-screen[^"]*">/,
        `<div className="min-h-screen bg-gray-50">${heroSection}`
      );
      
      writeFileSync(pagePath, newContent, 'utf-8');
      console.log(`✅ Fixed ${pagePath}`);
      fixed++;
    } else {
      console.log(`⏭️  ${pagePath} - Skipped (already has hero)`);
    }
    
  } catch (error) {
    console.log(`❌ ${pagePath} - Error: ${error.message}`);
  }
}

console.log(`\n✅ Fixed ${fixed} critical pages`);

