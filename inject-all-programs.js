#!/usr/bin/env node

/**
 * Inject ALL Program Pages into Durable
 * Creates 7 remaining program pages automatically
 */

import puppeteer from 'puppeteer';
import fs from 'fs';

const CONFIG = {
  email: process.env.DURABLE_EMAIL || 'Elevateforhumanity@gmail.com',
  password: process.env.DURABLE_PASSWORD || 'Elijah1$',
  timeout: 120000,
};

// Program data with full page content
const PROGRAMS = [
  {
    slug: 'building-services-technician',
    title: 'Building Services Technician',
    subtitle: 'Multi-trade training in electrical, HVAC, plumbing, welding, and construction. Prepare for high-demand facilities and maintenance careers.',
    duration: '8-16 weeks',
    format: 'Hybrid - Classroom + Hands-on Labs',
    certification: 'OSHA-10, Multi-Trade Certification',
    cost: '$0 with approved funding (WRG/WIOA)',
    badges: ['💰 WRG Funded', '💰 WIOA Funded', '🏗️ Multi-Trade', '⏱️ 8-16 Weeks'],
    overview: 'Our Building Services Technician program provides comprehensive cross-training in multiple skilled trades. You\'ll gain hands-on experience in electrical systems, HVAC, plumbing, welding, and general construction—preparing you for versatile careers in facilities management and building maintenance.',
    skills: [
      'Electrical systems and wiring',
      'HVAC installation and repair',
      'Plumbing and pipe fitting',
      'Basic welding techniques',
      'Construction and carpentry',
      'Safety protocols and OSHA compliance',
      'Preventive maintenance',
      'Blueprint reading'
    ],
    eligibility: [
      '18 years or older',
      'High school diploma or GED',
      'Marion County, IN resident (or willing to relocate)',
      'Eligible for WIOA or WRG funding',
      'Pass background check',
      'Physical ability to perform trade work'
    ],
    careers: [
      { title: 'Facilities Technician', description: 'Maintain and repair building systems in commercial and residential properties.', salary: '$35,000-$55,000/year' },
      { title: 'Maintenance Supervisor', description: 'Oversee building maintenance teams and coordinate repair projects.', salary: '$45,000-$65,000/year' },
      { title: 'Independent Contractor', description: 'Start your own multi-trade service business.', salary: '$50,000-$80,000+/year' }
    ]
  },
  {
    slug: 'hvac-welding',
    title: 'HVAC & Welding',
    subtitle: 'Master heating, ventilation, air conditioning systems and welding techniques. Enter high-paying skilled trades with strong job security.',
    duration: '8-16 weeks',
    format: 'Hybrid - Classroom + Hands-on Labs',
    certification: 'EPA 608 Certification, Welding Certification',
    cost: '$0 with approved funding (WRG/WIOA)',
    badges: ['💰 WRG Funded', '💰 WIOA Funded', '🔥 EPA Certified', '⏱️ 8-16 Weeks'],
    overview: 'Combine two in-demand skilled trades in one comprehensive program. Learn HVAC installation, maintenance, and repair alongside professional welding techniques. Graduate with dual certifications and multiple career pathways.',
    skills: [
      'HVAC system installation and repair',
      'Refrigeration cycles and controls',
      'EPA 608 certification prep',
      'MIG, TIG, and stick welding',
      'Blueprint reading and interpretation',
      'Safety protocols and PPE',
      'Troubleshooting and diagnostics',
      'Customer service and professionalism'
    ],
    eligibility: [
      '18 years or older',
      'High school diploma or GED',
      'Marion County, IN resident (or willing to relocate)',
      'Eligible for WIOA or WRG funding',
      'Pass background check',
      'Physical ability to perform trade work'
    ],
    careers: [
      { title: 'HVAC Technician', description: 'Install, maintain, and repair heating and cooling systems.', salary: '$40,000-$60,000/year' },
      { title: 'Welder', description: 'Work in manufacturing, construction, or fabrication shops.', salary: '$38,000-$58,000/year' },
      { title: 'HVAC/Welding Contractor', description: 'Run your own service business with dual specializations.', salary: '$60,000-$100,000+/year' }
    ]
  },
  {
    slug: 'healthcare-cna-qma',
    title: 'Healthcare (CNA/QMA)',
    subtitle: 'Launch your healthcare career as a Certified Nursing Assistant. Provide essential patient care and advance to QMA certification.',
    duration: '4-8 weeks',
    format: 'Hybrid - Classroom + Clinical Practicum',
    certification: 'Indiana CNA License, QMA Certification',
    cost: '$0 with approved funding (WRG/WIOA)',
    badges: ['💰 WRG Funded', '💰 WIOA Funded', '🏥 State Licensed', '⏱️ 4-8 Weeks'],
    overview: 'Start your rewarding healthcare career with our CNA/QMA program. Learn essential patient care skills, medical terminology, and professional ethics. Complete clinical rotations in real healthcare settings and qualify for Indiana state licensure.',
    skills: [
      'Patient care and hygiene',
      'Vital signs monitoring',
      'Medical terminology',
      'Infection control protocols',
      'Patient safety and mobility',
      'Documentation and charting',
      'Medication administration (QMA)',
      'Professional communication'
    ],
    eligibility: [
      '18 years or older',
      'High school diploma or GED',
      'Marion County, IN resident (or willing to relocate)',
      'Eligible for WIOA or WRG funding',
      'Pass background check',
      'Pass drug screening',
      'Current immunizations'
    ],
    careers: [
      { title: 'Certified Nursing Assistant', description: 'Provide direct patient care in hospitals, nursing homes, and home health.', salary: '$28,000-$38,000/year' },
      { title: 'Qualified Medication Aide', description: 'Administer medications and provide enhanced patient care.', salary: '$32,000-$42,000/year' },
      { title: 'Healthcare Advancement', description: 'Use CNA as stepping stone to RN, LPN, or other healthcare careers.', salary: '$45,000-$75,000+/year' }
    ]
  },
  {
    slug: 'drug-testing-business',
    title: 'Drug Testing Business',
    subtitle: 'Start your own mobile drug testing business. Serve employers, courts, and individuals with professional testing services.',
    duration: '2-4 weeks',
    format: 'Hybrid - Online + In-Person Training',
    certification: 'Drug Testing Technician Certification',
    cost: '$0 with approved funding (WRG/WIOA)',
    badges: ['💰 WRG Funded', '💰 WIOA Funded', '💼 Entrepreneurship', '⏱️ 2-4 Weeks'],
    overview: 'Launch a profitable mobile drug testing business serving employers, legal systems, and individuals. Learn testing procedures, compliance requirements, business operations, and marketing strategies. Start earning immediately with low overhead and high demand.',
    skills: [
      'Drug testing procedures and protocols',
      'Chain of custody documentation',
      'Federal and state compliance',
      'Business formation and licensing',
      'Marketing and client acquisition',
      'Mobile testing operations',
      'Quality control and accuracy',
      'Professional client service'
    ],
    eligibility: [
      '18 years or older',
      'High school diploma or GED',
      'Marion County, IN resident (or willing to relocate)',
      'Eligible for WIOA or WRG funding',
      'Pass background check',
      'Entrepreneurial mindset'
    ],
    careers: [
      { title: 'Mobile Testing Technician', description: 'Provide on-site drug testing services to businesses and individuals.', salary: '$35,000-$50,000/year' },
      { title: 'Testing Business Owner', description: 'Build and scale your own drug testing company.', salary: '$50,000-$100,000+/year' },
      { title: 'Multi-Service Provider', description: 'Add drug testing to existing healthcare or HR services.', salary: '$60,000-$120,000+/year' }
    ]
  },
  {
    slug: 'digital-skills',
    title: 'Digital Skills',
    subtitle: 'Master essential digital tools and technologies. Prepare for remote work opportunities and tech-enabled careers.',
    duration: '4-8 weeks',
    format: 'Hybrid - Online + In-Person Labs',
    certification: 'Digital Literacy Certification, Microsoft Office Specialist',
    cost: '$0 with approved funding (WRG/WIOA)',
    badges: ['💰 WRG Funded', '💰 WIOA Funded', '💻 Tech Skills', '⏱️ 4-8 Weeks'],
    overview: 'Build essential digital skills for today\'s workplace. Master Microsoft Office, Google Workspace, professional communication, data management, and remote work tools. Perfect for career changers and those re-entering the workforce.',
    skills: [
      'Microsoft Office Suite (Word, Excel, PowerPoint)',
      'Google Workspace (Docs, Sheets, Slides)',
      'Professional email and communication',
      'Data entry and management',
      'Virtual meeting platforms (Zoom, Teams)',
      'Cloud storage and file sharing',
      'Basic cybersecurity awareness',
      'Remote work best practices'
    ],
    eligibility: [
      '18 years or older',
      'High school diploma or GED',
      'Marion County, IN resident (or willing to relocate)',
      'Eligible for WIOA or WRG funding',
      'Basic computer literacy'
    ],
    careers: [
      { title: 'Administrative Assistant', description: 'Support office operations with digital tools and organization.', salary: '$30,000-$45,000/year' },
      { title: 'Data Entry Specialist', description: 'Manage and input data for businesses and organizations.', salary: '$28,000-$40,000/year' },
      { title: 'Remote Customer Service', description: 'Work from home providing customer support.', salary: '$32,000-$48,000/year' }
    ]
  },
  {
    slug: 'leadership-development',
    title: 'Leadership Development',
    subtitle: 'Develop essential leadership and management skills. Advance your career and lead teams effectively.',
    duration: '6-12 weeks',
    format: 'Hybrid - Classroom + Practical Application',
    certification: 'Leadership Development Certificate',
    cost: '$0 with approved funding (WRG/WIOA)',
    badges: ['💰 WRG Funded', '💰 WIOA Funded', '👔 Management', '⏱️ 6-12 Weeks'],
    overview: 'Transform into an effective leader with our comprehensive leadership development program. Learn team management, conflict resolution, strategic thinking, and professional communication. Perfect for aspiring managers and current supervisors seeking advancement.',
    skills: [
      'Team leadership and motivation',
      'Conflict resolution and mediation',
      'Strategic planning and goal setting',
      'Professional communication',
      'Performance management',
      'Decision-making and problem-solving',
      'Emotional intelligence',
      'Change management'
    ],
    eligibility: [
      '18 years or older',
      'High school diploma or GED',
      'Marion County, IN resident (or willing to relocate)',
      'Eligible for WIOA or WRG funding',
      'Current or aspiring leadership role'
    ],
    careers: [
      { title: 'Team Leader', description: 'Lead small teams and coordinate daily operations.', salary: '$40,000-$55,000/year' },
      { title: 'Department Manager', description: 'Oversee department operations and staff development.', salary: '$50,000-$75,000/year' },
      { title: 'Operations Manager', description: 'Manage multiple teams and strategic initiatives.', salary: '$60,000-$90,000+/year' }
    ]
  },
  {
    slug: 'cprs',
    title: 'Certified Peer Recovery Specialist (CPRS)',
    subtitle: 'Help others overcome addiction through peer support. Launching December 2025 with high-demand career opportunities.',
    duration: '80 hours (40 classroom + 40 practicum)',
    format: 'Hybrid - Classroom + Supervised Practicum',
    certification: 'Indiana Certification Board CPRS, Mental Health First Aid',
    cost: '$0 with approved funding (WRG/WIOA)',
    badges: ['💰 WRG Funded', '💰 WIOA Funded', '🎯 Launching Dec 2025', '⏱️ 80 Hours'],
    overview: 'Make a meaningful difference in your community as a Certified Peer Recovery Specialist. Use your lived experience to support others in recovery from substance use disorders. This rewarding career combines personal growth with professional impact.',
    skills: [
      'Peer support and mentoring',
      'Recovery principles and practices',
      'Crisis intervention techniques',
      'Mental Health First Aid',
      'Motivational interviewing',
      'Trauma-informed care',
      'Professional boundaries and ethics',
      'Documentation and case management'
    ],
    eligibility: [
      '18 years or older',
      'High school diploma or GED',
      'Marion County, IN resident (or willing to relocate)',
      'Eligible for WIOA or WRG funding',
      'Minimum 1 year of recovery (substance use)',
      'Pass background check',
      'Commitment to ongoing recovery'
    ],
    careers: [
      { title: 'Peer Recovery Specialist', description: 'Provide one-on-one peer support in treatment facilities and community settings.', salary: '$32,000-$45,000/year' },
      { title: 'Recovery Coach', description: 'Lead group sessions and coordinate recovery programs.', salary: '$38,000-$52,000/year' },
      { title: 'Program Coordinator', description: 'Oversee peer support programs and train new specialists.', salary: '$45,000-$60,000+/year' }
    ]
  }
];

function generatePageHTML(program) {
  return `<div class="relative z-10 container mx-auto pt-12 lg:pt-20 pb-12 lg:pb-20">
  
  <div class="flex flex-col gap-6 max-w-4xl mx-auto mb-12 text-center">
    <h1 class="heading-xlarge" style="color:#000000">
      ${program.title}
    </h1>
    <p class="body-large" style="color:#000000">
      ${program.subtitle}
    </p>
    <div class="flex flex-wrap gap-3 justify-center">
      ${program.badges.map(badge => `<span class="px-4 py-2 rounded" style="background:#F2F0D9;color:#4D4B37;font-size:14px;font-weight:500">${badge}</span>`).join('\n      ')}
    </div>
  </div>

  <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start mb-16">
    <div class="flex-1">
      <div class="rich-text-block" style="color:#000000">
        <h2>Program Overview</h2>
        <p>${program.overview}</p>
        
        <h3>What You'll Learn</h3>
        <ul>
          ${program.skills.map(skill => `<li>${skill}</li>`).join('\n          ')}
        </ul>
      </div>
    </div>
    <div class="flex-1">
      <div class="rich-text-block" style="color:#000000">
        <h2>Program Details</h2>
        <p><strong>Duration:</strong> ${program.duration}</p>
        <p><strong>Format:</strong> ${program.format}</p>
        <p><strong>Certification:</strong> ${program.certification}</p>
        <p><strong>Cost:</strong> ${program.cost}</p>
        
        <h3>Eligibility Requirements</h3>
        <ul>
          ${program.eligibility.map(req => `<li>${req}</li>`).join('\n          ')}
        </ul>
      </div>
    </div>
  </div>

  <div class="mb-16">
    <div class="rich-text-block max-w-4xl mx-auto" style="color:#000000">
      <h2 class="text-center">Career Outcomes</h2>
      <p class="text-center">Upon completion, you'll be qualified for:</p>
    </div>
    
    <div class="flex flex-wrap relative justify-start gap-6 mt-8">
      ${program.careers.map(career => `
      <div class="group w-full lg:w-[calc(33.333%-16px)] relative overflow-hidden">
        <div class="transition-all h-full">
          <div class="flex flex-col h-full">
            <div class="flex flex-col items-start py-6" style="color:#000000">
              <p class="heading-medium mb-4" style="color:currentColor">${career.title}</p>
              <div class="rich-text-block mb-4" style="color:currentColor">
                ${career.description}
              </div>
              <p style="color:#4D4B37;font-weight:500">${career.salary}</p>
            </div>
          </div>
        </div>
      </div>`).join('\n')}
    </div>
  </div>

  <div class="mb-16" style="background:#e9f2e9;padding:48px 24px;border-radius:8px">
    <div class="max-w-4xl mx-auto">
      <div class="rich-text-block" style="color:#000000">
        <h2 class="text-center">100% Funded Training Available</h2>
        <p class="text-center">This program is eligible for full funding through:</p>
        
        <div class="flex flex-wrap gap-6 justify-center mt-8">
          <div style="background:#FEFAF5;padding:24px;border-radius:8px;flex:1;min-width:250px">
            <h3 style="color:#4D4B37">WIOA Funding</h3>
            <p>Workforce Innovation and Opportunity Act provides funding for eligible individuals seeking career training.</p>
          </div>
          <div style="background:#FEFAF5;padding:24px;border-radius:8px;flex:1;min-width:250px">
            <h3 style="color:#4D4B37">WRG Funding</h3>
            <p>Workforce Ready Grant covers tuition, fees, and materials for approved training programs.</p>
          </div>
        </div>
        
        <p class="text-center mt-8"><strong>You pay $0 if approved for funding.</strong></p>
      </div>
    </div>
  </div>

  <div class="mb-16">
    <div class="rich-text-block max-w-4xl mx-auto" style="color:#000000">
      <h2 class="text-center">How to Enroll</h2>
      
      <div class="flex flex-col gap-6 mt-8">
        <div class="flex gap-4 items-start">
          <div style="background:#4D4B37;color:#FEFAF5;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700">1</div>
          <div>
            <h3>Create Your Profile</h3>
            <p>Sign up on Indiana Career Connect and complete your profile.</p>
          </div>
        </div>
        
        <div class="flex gap-4 items-start">
          <div style="background:#4D4B37;color:#FEFAF5;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700">2</div>
          <div>
            <h3>Meet with Career Advisor</h3>
            <p>Schedule a meeting with a WorkOne Career Advisor to discuss eligibility and funding options.</p>
          </div>
        </div>
        
        <div class="flex gap-4 items-start">
          <div style="background:#4D4B37;color:#FEFAF5;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700">3</div>
          <div>
            <h3>Apply for Funding</h3>
            <p>Your advisor will help you apply for WIOA or WRG funding and gather required documents.</p>
          </div>
        </div>
        
        <div class="flex gap-4 items-start">
          <div style="background:#4D4B37;color:#FEFAF5;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700">4</div>
          <div>
            <h3>Get Approved &amp; Start</h3>
            <p>Once approved, you'll receive your training authorization and start date for the next cohort.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="text-center">
    <a href="https://www.indianacareerconnect.com" target="_blank" rel="noopener" class="button" style="border-width:2px;border-style:solid;box-shadow:none;display:inline-block;font-size:18px;padding:16px 40px">
      Start Your Application on Indiana Career Connect →
    </a>
    <p class="mt-4" style="color:#000000">Questions? <a href="/contact" style="color:#4D4B37;text-decoration:underline">Contact us</a> for more information.</p>
  </div>

</div>`;
}

async function injectAllPrograms() {
  console.log('🚀 Injecting ALL Program Pages into Durable');
  console.log(`📋 Total programs to inject: ${PROGRAMS.length}`);
  console.log('');

  // First, save all HTML files locally
  console.log('💾 Saving HTML files locally...');
  for (const program of PROGRAMS) {
    const html = generatePageHTML(program);
    const filename = `public/program-pages/${program.slug}.html`;
    fs.mkdirSync('public/program-pages', { recursive: true });
    fs.writeFileSync(filename, html);
    console.log(`✅ Saved: ${filename}`);
  }
  console.log('');

  console.log('📋 MANUAL STEPS REQUIRED:');
  console.log('');
  console.log('For each program below, do the following in Durable:');
  console.log('1. Go to durable.co → Edit Site → Add Page');
  console.log('2. Create page with the slug shown below');
  console.log('3. Add "Custom HTML" block');
  console.log('4. Copy the HTML from the file shown below');
  console.log('5. Paste into Custom HTML block');
  console.log('6. Save and Publish');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  PROGRAMS.forEach((program, index) => {
    console.log(`${index + 1}. ${program.title}`);
    console.log(`   Slug: /${program.slug}`);
    console.log(`   HTML File: public/program-pages/${program.slug}.html`);
    console.log('');
  });

  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('💡 TIP: Open each HTML file in VSCode, select all (Ctrl+A), copy (Ctrl+C)');
  console.log('');
}

injectAllPrograms().catch(console.error);
