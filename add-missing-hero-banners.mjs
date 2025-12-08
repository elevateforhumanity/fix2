#!/usr/bin/env node
/**
 * Add hero banners to pages missing them
 */

import { readFileSync, writeFileSync } from 'fs';

const pages = [
  {
    file: 'app/programs/hvac-tech/page.tsx',
    title: 'HVAC Technician',
    subtitle: 'Start your career in heating, ventilation, and air conditioning with hands-on training and industry certifications',
    image: '/media/programs/hvac-hd.jpg'
  },
  {
    file: 'app/programs/hvac-technician/page.tsx',
    title: 'HVAC Technician',
    subtitle: 'Master HVAC systems installation, maintenance, and repair with free professional training',
    image: '/media/programs/hvac-hd.jpg'
  },
  {
    file: 'app/programs/peer-support-professional/page.tsx',
    title: 'Peer Support Professional',
    subtitle: 'Help others overcome challenges through certified peer support training and mental health services',
    image: '/images/gallery/image6.jpg'
  },
  {
    file: 'app/programs/rise-up/page.tsx',
    title: 'RISE UP Program',
    subtitle: 'Transform your life with workforce readiness training and career development support',
    image: '/images/gallery/image6.jpg'
  },
  {
    file: 'app/programs/truck-driving/page.tsx',
    title: 'Commercial Truck Driving (CDL)',
    subtitle: 'Get your CDL license and start a high-paying trucking career in just 4-6 weeks',
    image: '/media/programs/cdl-hd.jpg'
  }
];

const heroTemplate = (title, subtitle, image) => `      {/* Hero Banner */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="${image}"
            alt="${title} Training"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 md:mb-8 tracking-tight drop-shadow-2xl">
                ${title}
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-white mb-8 md:mb-10 leading-relaxed drop-shadow-lg max-w-3xl">
                ${subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-2xl"
                >
                  Apply Now - Free Training
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl font-bold text-white bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all hover:scale-105 border-2 border-white/50 shadow-2xl"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
`;

console.log('🔧 Adding hero banners to pages...\n');

for (const page of pages) {
  try {
    let content = readFileSync(page.file, 'utf-8');
    
    // Check if already has hero
    if (content.includes('h-[400px]') || content.includes('Hero Banner')) {
      console.log(`  ⏭️  ${page.file} - Already has hero`);
      continue;
    }
    
    // Add Image import if missing
    if (!content.includes("import Image from 'next/image'")) {
      content = content.replace(
        "import Link from 'next/link';",
        "import Link from 'next/link';\nimport Image from 'next/image';"
      );
    }
    
    // Find the first section and replace it
    const hero = heroTemplate(page.title, page.subtitle, page.image);
    
    // Replace the first section after return
    content = content.replace(
      /(<div className="min-h-screen bg-white">)\s*<section className="py-20">[\s\S]*?<\/section>/,
      `$1\n${hero}`
    );
    
    writeFileSync(page.file, content);
    console.log(`  ✅ ${page.file} - Hero added`);
    
  } catch (error) {
    console.log(`  ❌ ${page.file} - Error: ${error.message}`);
  }
}

console.log('\n✅ Hero banner addition complete!');
