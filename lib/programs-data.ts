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
  {
    slug: 'phlebotomy',
    name: 'Phlebotomy Technician',
    blurb: 'Launch your healthcare career in just 4-8 weeks! Learn proper blood draw techniques, patient interaction, lab safety, and specimen handling. Our hands-on program includes clinical rotations at real healthcare facilities. Graduate ready for immediate employment in hospitals, clinics, blood banks, and diagnostic labs with national certification.',
    funding: 'WRG • WIOA • Workforce Grants',
    duration: '4–8 Weeks • Clinical Rotations Included',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80',
    etplApproved: true,
  },
  {
    slug: 'welding',
    name: 'Welding Technology',
    blurb: 'Master a high-demand skilled trade! Learn MIG, TIG, stick welding, blueprint reading, and metal fabrication through intensive hands-on training. Our 12-24 week program prepares you for AWS certification and immediate employment in manufacturing, construction, automotive, and industrial settings. Welders earn $40K-$60K+ starting.',
    funding: 'Workforce Grants • Apprenticeship • WIOA',
    duration: '12–24 Weeks • Hands-On Lab Training',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
    etplApproved: true,
  },
  {
    slug: 'electrical',
    name: 'Electrical Technician',
    blurb: 'Start your career in the electrical trades! Learn residential and commercial wiring, electrical code, circuit design, troubleshooting, and safety procedures. Our 16-24 week program combines classroom theory with real-world installations. Graduate ready for apprenticeship positions or immediate employment with electrical contractors.',
    funding: 'Registered Apprenticeship • WIOA • WRG',
    duration: '16–24 Weeks • Classroom + Field Work',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80',
    etplApproved: true,
  },
  {
    slug: 'pharmacy-tech',
    name: 'Pharmacy Technician',
    blurb: 'Enter the growing pharmacy field in 12-16 weeks! Learn medication dispensing, prescription processing, inventory management, insurance billing, and patient service. Our program includes externship at retail or hospital pharmacies. Graduate ready for national PTCB certification and employment at CVS, Walgreens, hospitals, and clinics.',
    funding: 'WRG • WIOA • Workforce Grants',
    duration: '12–16 Weeks • Externship Included',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80',
    etplApproved: true,
  },
  {
    slug: 'it-support',
    name: 'IT Support Specialist',
    blurb: 'Launch your tech career with CompTIA A+ certification! Learn computer hardware, software, networking, troubleshooting, and customer service. Our 12-20 week program prepares you for help desk, desktop support, and IT technician roles. No prior experience needed. Tech jobs start at $40K+ with room for growth.',
    funding: 'Workforce Grants • WIOA • Employer Sponsors',
    duration: '12–20 Weeks • Online + Hands-On Labs',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80',
    etplApproved: true,
  },
  {
    slug: 'culinary-arts',
    name: 'Culinary Arts & Food Service',
    blurb: 'Turn your passion for cooking into a career! Learn food preparation, kitchen safety, menu planning, nutrition, and restaurant operations. Our 16-24 week program includes hands-on training in professional kitchens. Graduate ready for line cook, prep cook, or food service management positions in restaurants, hotels, and catering.',
    funding: 'Workforce Grants • Apprenticeship • WIOA',
    duration: '16–24 Weeks • Professional Kitchen Training',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80',
    etplApproved: true,
  },
];
