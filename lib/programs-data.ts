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
    blurb: 'Hands-on clinical training that prepares you for entry-level MA roles in clinics, hospitals, and specialty practices.',
    funding: 'WRG • WIOA • Workforce Grants',
    duration: '16–24 Weeks • Hybrid',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
    etplApproved: true,
  },
  {
    slug: 'barber-apprenticeship',
    name: 'Barber Apprenticeship',
    blurb: 'State-approved apprenticeship – train in real barbershops while earning hours toward your barber license.',
    funding: 'Apprenticeship • WIOA',
    duration: '12–18 Months • On-the-Job + Classroom',
    image: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=600&q=80',
    etplApproved: true,
  },
  {
    slug: 'hvac-technician',
    name: 'HVAC Technician',
    blurb: 'Learn heating, cooling, and refrigeration systems and prepare for in-demand technician roles.',
    funding: 'Workforce Grants • Employer Sponsors',
    duration: '4–9 Months • Lab + Field',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80',
    etplApproved: true,
  },
  {
    slug: 'building-maintenance',
    name: 'Building Maintenance Technician',
    blurb: 'Training for building systems, repairs, and facility maintenance to keep properties safe and functional.',
    funding: 'Workforce Grants • Apprenticeship',
    duration: '4–9 Months • Hands-On',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    etplApproved: true,
  },
  {
    slug: 'truck-driving',
    name: 'CDL / Truck Driving',
    blurb: 'Get your Commercial Driver\'s License and start a career in transportation with high demand and competitive pay.',
    funding: 'Workforce Grants • Employer Sponsors',
    duration: '4–6 Weeks (160 Hours) • Range + Road',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80',
    etplApproved: true,
  },
  {
    slug: 'workforce-readiness',
    name: 'Workforce Readiness & Re-Entry',
    blurb: 'Rebuild, reset, and re-enter the workforce with coaching, skills training, and real employment connections.',
    funding: 'Support Services • Referrals',
    duration: '4–12 Weeks • Coaching + Workshops',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
    etplApproved: false,
  },
];
