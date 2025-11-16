// content/courses/ecdCatalog.ts

export type EcdCourse = {
  slug: string;
  title: string;
  shortDescription: string;
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
    path: '/programs/hvac-technician',
    coverImageKey: 'hvac-technician-cover',
    aiVideoUrl: '', // add URL to AI video later
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
    path: '/programs/cna-healthcare',
    coverImageKey: 'cna-healthcare-cover',
    aiVideoUrl: '',
  },
  {
    slug: 'cdl-transportation',
    title: 'CDL & Transportation Training',
    shortDescription:
      'Commercial driver training for high-earning transportation and logistics careers.',
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
