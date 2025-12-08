#!/usr/bin/env node
/**
 * Integrate all partner courses with direct links
 * HSI, JRI, NRF, CareerSafe
 */

import { writeFileSync, mkdirSync } from 'fs';

const partners = [
  {
    id: 'hsi',
    name: 'Health & Safety Institute (HSI)',
    description: 'CPR, AED, First Aid, and Emergency Medical Responder Training',
    signupUrl: 'https://hsi.com/solutions/cpr-aed-first-aid-training/elevate-for-humanity-career-training-institute-nts-class-sign-up',
    website: 'https://hsi.com',
    contact: {
      name: 'Geoff Albrecht',
      email: 'galbrecht@hsi.com',
      phone: '(949) 456-8366'
    },
    courses: [
      { name: 'CPR & AED Training', duration: '4 hours', credential: 'HSI CPR/AED Certificate' },
      { name: 'First Aid Training', duration: '4 hours', credential: 'HSI First Aid Certificate' },
      { name: 'Emergency Medical Responder', duration: '80 hours', credential: 'EMR Certification' },
      { name: 'RSV Training', duration: '2 hours', credential: 'RSV Certificate' }
    ],
    features: [
      'Industry-recognized certifications',
      'Hands-on training with real equipment',
      'Experienced instructors',
      'Small class sizes (max 12 students)',
      'Traditional and blended learning options'
    ]
  },
  {
    id: 'jri',
    name: 'Job Ready Indy (JRI)',
    description: 'Employability Skills and Workforce Readiness Training',
    signupUrl: 'https://learning.employindy.org/jri-participant-elevatehumanitycareertraining',
    learningHub: 'https://learning.employindy.org',
    participantPortal: 'https://jri.employindy.org',
    setupGuide: 'https://employindy.org/hosting-jri-on-your-own-lms',
    contact: {
      name: 'Elizabeth Greene',
      email: 'elizabethpowell6262@gmail.com'
    },
    courses: [
      { name: 'Introduction to Job Ready Indy', badge: 1 },
      { name: 'Professional Communication', badge: 2 },
      { name: 'Workplace Professionalism', badge: 3 },
      { name: 'Problem Solving & Critical Thinking', badge: 4 },
      { name: 'Teamwork & Collaboration', badge: 5 },
      { name: 'Career Planning', badge: 6 },
      { name: 'Financial Literacy', additional: true },
      { name: 'Digital Literacy', additional: true }
    ],
    features: [
      '6 badge courses + 2 additional courses',
      'Self-paced online learning',
      'Industry-backed credentials',
      'Progress tracking dashboard',
      'Facilitator support available'
    ]
  },
  {
    id: 'nrf',
    name: 'NRF Foundation RISE Up',
    description: 'Retail Industry Skills and Employability Training',
    platformUrl: 'https://riseup.nrf.com',
    loginUrl: 'https://riseup.nrf.com/login',
    helpCenter: 'https://support.riseup.nrf.com',
    contact: {
      email: 'riseup@kaleidolearning.com',
      support: 'riseupsupport@kaleidolearning.com'
    },
    courses: [
      { name: 'Customer Service Excellence', focus: 'Retail customer service skills' },
      { name: 'Professional Communication', focus: 'Workplace communication' },
      { name: 'Teamwork & Collaboration', focus: 'Working effectively in teams' },
      { name: 'Problem Solving', focus: 'Critical thinking skills' },
      { name: 'Career Readiness', focus: 'Employability fundamentals' }
    ],
    features: [
      'Industry-backed credential from NRF Foundation',
      'Foundational employability skills',
      'Applicable to retail and beyond',
      'Self-paced online training',
      'Help center support available'
    ]
  },
  {
    id: 'careersafe',
    name: 'CareerSafe OSHA Training',
    description: 'OSHA 10 & OSHA 30 Safety Certification',
    loginUrl: 'https://www.careersafeonline.com/campus/signin',
    website: 'https://www.careersafeonline.com',
    supportUrl: 'https://www.careersafeonline.com/support',
    contact: {
      primary: {
        name: 'Mark Sattele',
        title: 'Postsecondary Account Executive',
        email: 'Mark.Sattele@careersafeonline.com',
        phone: '(216) 926-6536'
      },
      secondary: {
        name: 'Hollie Dove',
        title: 'Account Executive',
        email: 'Hollie.Dove@careersafeonline.com',
        phone: '(260) 466-3145'
      },
      customerCare: '(888) 614-7233'
    },
    courses: [
      { name: 'OSHA 10-Hour Construction', duration: '10 hours', credential: 'OSHA 10 Card' },
      { name: 'OSHA 30-Hour Construction', duration: '30 hours', credential: 'OSHA 30 Card' },
      { name: 'OSHA 10-Hour General Industry', duration: '10 hours', credential: 'OSHA 10 Card' },
      { name: 'OSHA 30-Hour General Industry', duration: '30 hours', credential: 'OSHA 30 Card' }
    ],
    features: [
      'Official OSHA certification cards',
      'Required for many construction jobs',
      'Self-paced online training',
      'Lifetime access to materials',
      '24/7 customer support'
    ]
  }
];

console.log('🔗 Integrating partner courses...\n');

for (const partner of partners) {
  const pageContent = `import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, CheckCircle, Clock, Award, Users, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: '${partner.name} | Partner Courses | Elevate For Humanity',
  description: '${partner.description}',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/partners/${partner.id}',
  },
};

export default function ${partner.id.toUpperCase()}Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-4xl">
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4">
                Partner Course
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                ${partner.name}
              </h1>
              <p className="text-2xl text-white mb-8 drop-shadow-lg">
                ${partner.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                ${partner.signupUrl ? `
                <a
                  href="${partner.signupUrl}"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-slate-100 transition-all hover:scale-105 shadow-2xl gap-2"
                >
                  Enroll Now
                  <ExternalLink className="w-5 h-5" />
                </a>
                ` : partner.platformUrl ? `
                <a
                  href="${partner.platformUrl}"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-slate-100 transition-all hover:scale-105 shadow-2xl gap-2"
                >
                  Access Platform
                  <ExternalLink className="w-5 h-5" />
                </a>
                ` : partner.loginUrl ? `
                <a
                  href="${partner.loginUrl}"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-slate-100 transition-all hover:scale-105 shadow-2xl gap-2"
                >
                  Student Login
                  <ExternalLink className="w-5 h-5" />
                </a>
                ` : ''}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all hover:scale-105 border-2 border-white/50 shadow-2xl"
                >
                  Questions? Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            What You Get
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            ${partner.features.map(feature => `
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="text-slate-700">${feature}</div>
            </div>
            `).join('')}
          </div>
        </div>
      </section>

      {/* Available Courses */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Available Courses
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            ${partner.courses.map(course => `
            <div className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-blue-500 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900">${course.name}</h3>
                ${course.badge ? `<div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">Badge ${course.badge}</div>` : ''}
                ${course.additional ? `<div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">Bonus</div>` : ''}
              </div>
              ${course.duration ? `
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <Clock className="w-4 h-4" />
                <span>${course.duration}</span>
              </div>
              ` : ''}
              ${course.credential ? `
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <Award className="w-4 h-4" />
                <span>${course.credential}</span>
              </div>
              ` : ''}
              ${course.focus ? `
              <p className="text-slate-600">${course.focus}</p>
              ` : ''}
            </div>
            `).join('')}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Need Help?
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            ${partner.contact.name ? `
            <div className="mb-6">
              <div className="font-bold text-slate-900 text-lg mb-2">${partner.contact.name}</div>
              ${partner.contact.title ? `<div className="text-slate-600 mb-3">${partner.contact.title}</div>` : ''}
              <div className="space-y-2">
                ${partner.contact.email ? `
                <a href="mailto:${partner.contact.email}" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Mail className="w-4 h-4" />
                  ${partner.contact.email}
                </a>
                ` : ''}
                ${partner.contact.phone ? `
                <a href="tel:${partner.contact.phone}" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Phone className="w-4 h-4" />
                  ${partner.contact.phone}
                </a>
                ` : ''}
              </div>
            </div>
            ` : ''}
            ${partner.contact.primary ? `
            <div className="mb-6 pb-6 border-b border-slate-200">
              <div className="font-bold text-slate-900 mb-2">${partner.contact.primary.name}</div>
              <div className="text-slate-600 mb-3">${partner.contact.primary.title}</div>
              <div className="space-y-2">
                <a href="mailto:${partner.contact.primary.email}" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Mail className="w-4 h-4" />
                  ${partner.contact.primary.email}
                </a>
                <a href="tel:${partner.contact.primary.phone}" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Phone className="w-4 h-4" />
                  ${partner.contact.primary.phone}
                </a>
              </div>
            </div>
            ` : ''}
            ${partner.contact.customerCare ? `
            <div className="text-center">
              <div className="text-slate-600 mb-2">Customer Care</div>
              <a href="tel:${partner.contact.customerCare}" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
                ${partner.contact.customerCare}
              </a>
            </div>
            ` : ''}
            ${partner.helpCenter ? `
            <div className="mt-6 text-center">
              <a href="${partner.helpCenter}" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
                Visit Help Center
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            ` : ''}
            ${partner.supportUrl ? `
            <div className="mt-6 text-center">
              <a href="${partner.supportUrl}" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
                Visit Support Center
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            ` : ''}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white mb-8">
            Enroll in ${partner.name} courses through Elevate for Humanity
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            ${partner.signupUrl || partner.platformUrl || partner.loginUrl ? `
            <a
              href="${partner.signupUrl || partner.platformUrl || partner.loginUrl}"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 text-xl font-bold rounded-full hover:bg-slate-100 transition-all hover:scale-105 shadow-2xl gap-2"
            >
              Get Started
              <ExternalLink className="w-6 h-6" />
            </a>
            ` : ''}
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-10 py-5 bg-white/20 backdrop-blur-sm text-white text-xl font-bold rounded-full hover:bg-white/30 transition-all hover:scale-105 border-2 border-white/50 shadow-2xl"
            >
              Apply to Elevate
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
`;

  // Create partner directory and page
  try {
    mkdirSync(`app/partners/${partner.id}`, { recursive: true });
    writeFileSync(`app/partners/${partner.id}/page.tsx`, pageContent);
    console.log(`✅ Created: ${partner.name}`);
  } catch (error) {
    console.log(`❌ Error creating ${partner.name}: ${error.message}`);
  }
}

// Create partners index page
const indexContent = `import { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, Award, Users, Briefcase, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Partner Courses | Elevate For Humanity',
  description: 'Access industry-recognized training from our trusted partners: HSI, Job Ready Indy, NRF RISE Up, and CareerSafe OSHA.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/partners',
  },
};

export default function PartnersPage() {
  const partners = [
    {
      id: 'hsi',
      name: 'Health & Safety Institute',
      description: 'CPR, AED, First Aid, and Emergency Medical Responder Training',
      icon: Shield,
      color: 'red'
    },
    {
      id: 'jri',
      name: 'Job Ready Indy',
      description: 'Employability Skills and Workforce Readiness Training',
      icon: Briefcase,
      color: 'blue'
    },
    {
      id: 'nrf',
      name: 'NRF Foundation RISE Up',
      description: 'Retail Industry Skills and Employability Training',
      icon: Users,
      color: 'purple'
    },
    {
      id: 'careersafe',
      name: 'CareerSafe OSHA',
      description: 'OSHA 10 & OSHA 30 Safety Certification',
      icon: Award,
      color: 'orange'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Partner Courses
          </h1>
          <p className="text-2xl text-white max-w-3xl mx-auto">
            Access industry-recognized training from our trusted partners
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((partner) => {
              const Icon = partner.icon;
              return (
                <Link
                  key={partner.id}
                  href={\`/partners/\${partner.id}\`}
                  className="group bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl transition-all"
                >
                  <div className={\`w-16 h-16 bg-\${partner.color}-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform\`}>
                    <Icon className={\`w-8 h-8 text-\${partner.color}-600\`} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {partner.name}
                  </h2>
                  <p className="text-slate-600 mb-4">
                    {partner.description}
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold">
                    View Courses
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Apply to Elevate for Humanity and get access to all partner courses
          </p>
          <Link
            href="/apply"
            className="inline-block px-10 py-5 bg-orange-500 text-white text-xl font-bold rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-xl"
          >
            Apply Now - It's Free
          </Link>
        </div>
      </section>
    </main>
  );
}
`;

try {
  mkdirSync('app/partners', { recursive: true });
  writeFileSync('app/partners/page.tsx', indexContent);
  console.log('\n✅ Created partners index page');
} catch (error) {
  console.log(`\n❌ Error creating index: ${error.message}`);
}

console.log('\n✅ Partner course integration complete!');
console.log('\nPartner courses now accessible at:');
console.log('  - /partners (main page)');
console.log('  - /partners/hsi (HSI courses)');
console.log('  - /partners/jri (Job Ready Indy)');
console.log('  - /partners/nrf (NRF RISE Up)');
console.log('  - /partners/careersafe (OSHA training)');
