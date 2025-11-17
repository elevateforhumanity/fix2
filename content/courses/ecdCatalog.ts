// content/courses/ecdCatalog.ts

export type EcdCourse = {
  slug: string;
  title: string;
  shortDescription: string;
  category?: string;
  duration?: string;
  cost?: string;
  placementRate?: number;
  avgSalary?: string;
  certifications?: string[];
  prerequisites?: string[];
  path: string; // route for the program page
  coverImageKey: string; // key in generated-images/manifest.json
  aiVideoUrl?: string; // fill in when you have AI videos
};

export const ecdCourses: EcdCourse[] = [
  {
    slug: 'hvac-technician',
    title: 'HVAC Technician Training',
    shortDescription:
      'Hands-on training to install, maintain, and repair heating and cooling systems for homes and businesses.',
    category: 'Skilled Trades',
    duration: '12 weeks',
    cost: 'WIOA Funded',
    placementRate: 88,
    avgSalary: '$45,000 - $65,000',
    certifications: ['EPA 608 Certification', 'OSHA 10', 'HVAC Excellence'],
    prerequisites: [
      'High school diploma or GED',
      "Valid driver's license",
      'Pass background check',
    ],
    path: '/programs/hvac-technician',
    coverImageKey: 'hvac-technician-cover',
    aiVideoUrl: '',
  },
  {
    slug: 'barber-apprenticeship',
    title: 'Barber Apprenticeship',
    shortDescription:
      'Earn-while-you-learn apprenticeship in a real barbershop, building hours toward state barber licensure.',
    path: '/programs/barber-apprenticeship',
    coverImageKey: 'barber-apprenticeship-cover',
    aiVideoUrl: '',
  },
  {
    slug: 'cna-healthcare',
    title: 'CNA & Healthcare Careers',
    shortDescription:
      'Entry-level healthcare training focused on CNA skills, patient care, and healthcare pathways.',
    category: 'Healthcare',
    duration: '6-8 weeks',
    cost: 'WIOA Funded',
    placementRate: 92,
    avgSalary: '$32,000 - $42,000',
    certifications: [
      'Certified Nursing Assistant (CNA)',
      'CPR/First Aid',
      'HIPAA Training',
    ],
    prerequisites: [
      'High school diploma or GED',
      'Pass background check',
      'TB test and immunizations',
    ],
    path: '/programs/cna-healthcare',
    coverImageKey: 'cna-healthcare-cover',
    aiVideoUrl: '',
  },
  {
    slug: 'cdl-transportation',
    title: 'CDL & Transportation Training',
    shortDescription:
      'Commercial driver training for high-earning transportation and logistics careers.',
    category: 'Transportation',
    duration: '4-6 weeks',
    cost: 'WIOA Funded',
    placementRate: 90,
    avgSalary: '$50,000 - $70,000',
    certifications: [
      'Class A CDL',
      'Hazmat Endorsement',
      'Air Brakes Certification',
    ],
    prerequisites: [
      "Valid driver's license",
      'Clean driving record',
      'Pass DOT physical',
    ],
    path: '/programs/cdl-transportation',
    coverImageKey: 'cdl-transportation-cover',
    aiVideoUrl: '',
  },
  {
    slug: 'building-technician',
    title: 'Building Technician & Skilled Trades',
    shortDescription:
      'Maintenance, basic electrical, plumbing, and systems skills for building and facilities roles.',
    path: '/programs/building-technician',
    coverImageKey: 'building-technician-cover',
    aiVideoUrl: '',
  },
  {
    slug: 'it-support-apprenticeship',
    title: 'IT Support & Help Desk Apprenticeship',
    shortDescription:
      'Foundational IT support training with apprenticeships in help desk, troubleshooting, and user support.',
    path: '/programs/it-support-apprenticeship',
    coverImageKey: 'it-support-apprenticeship-cover',
    aiVideoUrl: '',
  },
  {
    slug: 'beauty-career-educator',
    title: 'Beauty & Career Educator Training',
    shortDescription:
      'Hybrid program that prepares experienced beauty professionals to become educators and trainers.',
    path: '/programs/beauty-career-educator',
    coverImageKey: 'beauty-career-educator-cover',
    aiVideoUrl: '',
  },
];

export function getEcdCourseBySlug(slug: string): EcdCourse | undefined {
  return ecdCourses.find((c) => c.slug === slug);
}
