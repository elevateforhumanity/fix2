/**
 * Program data - Single source of truth
 * Update this file to change program information across the site
 * This data should match what's in Supabase and on ETPL
 */

export interface ProgramData {
  slug: string;
  name: string;
  blurb: string;
  funding: string;
  duration: string;
  image: string;
  etplApproved: boolean;
}

export const PROGRAMS: ProgramData[] = [
  {
    slug: 'medical-assistant',
    name: 'Medical Assistant',
    blurb: 'Train for a healthcare career in just 16-24 weeks! Learn vital signs, EKG, phlebotomy, medical records, and patient care through hands-on clinical practice. Our hybrid program combines online coursework with real clinic experience, preparing you for immediate employment in doctors\' offices, hospitals, and urgent care centers. ETPL-approved and WRG/WIOA funded.',
    funding: 'WRG • WIOA • Workforce Grants',
    duration: '16–24 Weeks • Hybrid (Online + Clinical)',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
    etplApproved: true,
  },
  {
    slug: 'barber-apprenticeship',
    name: 'Barber Apprenticeship',
    blurb: 'Earn while you learn! This state-approved apprenticeship places you in real barbershops where you\'ll master fades, tapers, razor work, and client service while building your hours toward Indiana barber licensure. Perfect for career changers and re-entry participants. Get paid on-the-job training, business coaching, and a clear path to owning your own chair or shop.',
    funding: 'Registered Apprenticeship • WIOA • WRG',
    duration: '12–18 Months • Barbershop + Classroom',
    image: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=600&q=80',
    etplApproved: true,
  },
  {
    slug: 'hvac-technician',
    name: 'HVAC Technician',
    blurb: 'Start a high-paying skilled trade career! Learn to install, repair, and maintain heating, cooling, and refrigeration systems through hands-on lab work and real job sites. Our 4-9 month hybrid program covers EPA certification, electrical basics, troubleshooting, and customer service. Graduate ready for immediate employment with HVAC companies, property management, or start your own business.',
    funding: 'Workforce Grants • Employer Sponsors • WIOA',
    duration: '4–9 Months • Hybrid (Lab + Field Training)',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80',
    etplApproved: true,
  },
  {
    slug: 'building-maintenance',
    name: 'Building Maintenance Technician',
    blurb: 'Become the go-to person who keeps buildings running! Learn plumbing basics, electrical repairs, HVAC maintenance, carpentry, and safety systems through hands-on training. This 4-9 month program prepares you for steady employment with property management companies, schools, hospitals, and commercial buildings. Perfect for those who like variety and problem-solving.',
    funding: 'Workforce Grants • Apprenticeship • WIOA',
    duration: '4–9 Months • Hands-On Training',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    etplApproved: true,
  },
  {
    slug: 'truck-driving',
    name: 'CDL / Truck Driving',
    blurb: 'Get your Commercial Driver\'s License in just 4-6 weeks! Our 160-hour program includes classroom instruction, range practice, and real road experience. Learn pre-trip inspections, backing maneuvers, highway driving, and DOT regulations. Graduate with your CDL Class A and immediate job placement assistance with trucking companies offering $50K+ starting salaries.',
    funding: 'Workforce Grants • Employer Sponsors • WIOA',
    duration: '4–6 Weeks (160 Hours) • Range + Road',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80',
    etplApproved: true,
  },
  {
    slug: 'workforce-readiness',
    name: 'Workforce Readiness & Re-Entry',
    blurb: 'Rebuild your career with confidence! Whether you\'re re-entering after incarceration, overcoming gaps in work history, or starting fresh, this 4-12 week program provides resume building, interview coaching, workplace skills, and direct connections to employers who hire second-chance candidates. Includes support with transportation, childcare, and work clothing.',
    funding: 'Support Services • Referrals • Case Management',
    duration: '4–12 Weeks • Flexible Coaching + Workshops',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
    etplApproved: false,
  },
];
