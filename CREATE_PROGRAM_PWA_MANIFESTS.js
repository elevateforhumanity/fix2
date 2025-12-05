#!/usr/bin/env node
/**
 * Generate PWA manifests for each program
 * Creates installable apps for Barber, CNA, CDL, etc.
 */

const fs = require('fs');
const path = require('path');

const programs = [
  {
    slug: 'barber-apprenticeship',
    name: 'Barber Apprenticeship',
    shortName: 'Barber',
    description: 'Track your barber apprenticeship hours, skills, and progress. Check in/out from the barbershop.',
    themeColor: '#8B4513',
    backgroundColor: '#FFF8DC',
    icon: '/images/efh/programs/barber.jpg'
  },
  {
    slug: 'cna',
    name: 'CNA Training',
    shortName: 'CNA',
    description: 'Certified Nursing Assistant training tracker. Access courses, track clinical hours, study materials.',
    themeColor: '#0066CC',
    backgroundColor: '#E6F2FF',
    icon: '/images/efh/programs/cna.jpg'
  },
  {
    slug: 'cdl',
    name: 'CDL Training',
    shortName: 'CDL',
    description: 'Commercial Driver License training. Track driving hours, pre-trip inspections, and road tests.',
    themeColor: '#FF6600',
    backgroundColor: '#FFF4E6',
    icon: '/images/artlist/hero-training-1.jpg'
  },
  {
    slug: 'hvac-technician',
    name: 'HVAC Technician',
    shortName: 'HVAC',
    description: 'HVAC technician training tracker. Log service calls, track certifications, study materials.',
    themeColor: '#00A86B',
    backgroundColor: '#E6FFF4',
    icon: '/images/trades/program-hvac-technician.jpg'
  },
  {
    slug: 'medical-assistant',
    name: 'Medical Assistant',
    shortName: 'Med Asst',
    description: 'Medical Assistant training. Track clinical hours, procedures, and certifications.',
    themeColor: '#DC143C',
    backgroundColor: '#FFE6EB',
    icon: '/images/efh/programs/cna.jpg'
  },
  {
    slug: 'phlebotomy',
    name: 'Phlebotomy Technician',
    shortName: 'Phlebotomy',
    description: 'Phlebotomy training tracker. Log blood draws, track stick count, study materials.',
    themeColor: '#8B0000',
    backgroundColor: '#FFE6E6',
    icon: '/images/artlist/hero-training-1.jpg'
  }
];

// Create manifests directory
const manifestsDir = path.join(__dirname, 'public', 'manifests');
if (!fs.existsSync(manifestsDir)) {
  fs.mkdirSync(manifestsDir, { recursive: true });
}

console.log('🎨 Generating PWA manifests for programs...\n');

programs.forEach(program => {
  const manifest = {
    name: `${program.name} - Elevate For Humanity`,
    short_name: program.shortName,
    description: program.description,
    start_url: `/programs/${program.slug}?source=pwa`,
    display: 'standalone',
    background_color: program.backgroundColor,
    theme_color: program.themeColor,
    orientation: 'portrait-primary',
    scope: `/programs/${program.slug}/`,
    lang: 'en-US',
    dir: 'ltr',
    categories: ['education', 'productivity'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    shortcuts: [
      {
        name: 'Check In',
        short_name: 'Check In',
        description: 'Check in to work/training',
        url: `/student/apprenticeship-hours?action=checkin&program=${program.slug}`,
        icons: [{ src: '/icon-192.png', sizes: '192x192' }]
      },
      {
        name: 'My Hours',
        short_name: 'Hours',
        description: 'View my training hours',
        url: `/student/apprenticeship-hours?program=${program.slug}`,
        icons: [{ src: '/icon-192.png', sizes: '192x192' }]
      },
      {
        name: 'My Portfolio',
        short_name: 'Portfolio',
        description: 'View my digital portfolio',
        url: `/student/portfolio?program=${program.slug}`,
        icons: [{ src: '/icon-192.png', sizes: '192x192' }]
      },
      {
        name: 'Courses',
        short_name: 'Courses',
        description: 'Access my courses',
        url: `/student/courses?program=${program.slug}`,
        icons: [{ src: '/icon-192.png', sizes: '192x192' }]
      }
    ]
  };

  const filename = `manifest-${program.slug}.json`;
  const filepath = path.join(manifestsDir, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(manifest, null, 2));
  console.log(`✅ Created: /public/manifests/${filename}`);
});

console.log(`\n🎉 Generated ${programs.length} PWA manifests!`);
console.log('\nNext steps:');
console.log('1. Add manifest links to program pages');
console.log('2. Students can install program-specific apps');
console.log('3. Each app has shortcuts for check-in, hours, portfolio\n');
