/**
 * Mock course data for testing without Supabase
 * Use this when developing locally or demoing the platform
 */

export const mockCourses = [
  {
    id: 1,
    slug: 'hvac-technician',
    title: 'HVAC Technician Training',
    subtitle: 'Master heating, ventilation, and air conditioning systems',
    description: '600-hour program covering HVAC installation, maintenance, and repair with EPA 608 certification.',
    level: 'beginner',
    duration_hours: 600,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity / Trade School Partner',
      cip_code: '47.0201',
      credentials: ['EPA 608', 'HVAC Certification'],
      format: 'Hybrid',
      funding: ['WIOA', 'WRG', 'Apprenticeship']
    }
  },
  {
    id: 2,
    slug: 'barber-apprenticeship-full',
    title: 'Barber Apprenticeship Program',
    subtitle: 'Earn while you learn - DOL Registered Apprenticeship',
    description: '1,500-hour apprenticeship combining classroom and shop training.',
    level: 'beginner',
    duration_hours: 1500,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity / Licensed Barbershop',
      cip_code: '12.0402',
      credentials: ['State Barber License'],
      format: 'Apprenticeship',
      funding: ['WIOA', 'Apprenticeship', 'WRG']
    }
  },
  {
    id: 3,
    slug: 'medical-assistant',
    title: 'Medical Assistant Program',
    subtitle: 'Clinical and administrative healthcare training',
    description: '720-hour program preparing students for Certified Medical Assistant certification.',
    level: 'beginner',
    duration_hours: 720,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity / Healthcare Partner',
      cip_code: '51.0801',
      credentials: ['Certified Medical Assistant (CMA)'],
      format: 'Hybrid',
      funding: ['WIOA', 'WRG', 'Pell']
    }
  },
  {
    id: 4,
    slug: 'business-startup-marketing',
    title: 'Business Start-Up & Marketing Program',
    subtitle: 'Launch your own business with Rise Forward',
    description: 'Learn entrepreneurship, digital marketing, LLC formation, and business planning.',
    level: 'beginner',
    duration_hours: 32,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Rise Forward / Elevate for Humanity',
      cip_code: '52.0701',
      credentials: ['Certificate of Completion', 'Retail Industry Fundamentals'],
      format: '100% Online',
      funding: ['WIOA', 'WRG']
    }
  },
  {
    id: 5,
    slug: 'direct-support-professional',
    title: 'Direct Support Professional (DSP)',
    subtitle: 'Support individuals with disabilities',
    description: '120-hour program preparing students for DSP certification.',
    level: 'beginner',
    duration_hours: 120,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity',
      cip_code: '51.1599',
      credentials: ['DSP Certification', 'CPR/First Aid'],
      format: 'Hybrid',
      funding: ['WIOA', 'WRG']
    }
  },
  {
    id: 6,
    slug: 'professional-esthetician',
    title: 'Professional Esthetician Program',
    subtitle: 'Skincare and beauty specialist training',
    description: '700-hour program leading to state esthetician license.',
    level: 'beginner',
    duration_hours: 700,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity / Licensed School',
      cip_code: '12.0409',
      credentials: ['State Esthetician License'],
      format: 'Hybrid',
      funding: ['WIOA', 'WRG', 'Pell']
    }
  },
  {
    id: 7,
    slug: 'tax-prep-financial-services',
    title: 'Tax Preparation & Financial Services',
    subtitle: 'Become a certified tax preparer',
    description: '80-hour program preparing students for tax preparation certification.',
    level: 'beginner',
    duration_hours: 80,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity',
      cip_code: '52.0803',
      credentials: ['IRS PTIN', 'Tax Preparer Certification'],
      format: '100% Online',
      funding: ['WIOA', 'WRG']
    }
  },
  {
    id: 8,
    slug: 'public-safety-reentry-specialist',
    title: 'Public Safety Reentry Specialist',
    subtitle: 'Support justice-involved individuals',
    description: '160-hour program preparing students for reentry specialist certification.',
    level: 'beginner',
    duration_hours: 160,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity',
      cip_code: '43.0103',
      credentials: ['Reentry Specialist Certification'],
      format: 'Hybrid',
      funding: ['WIOA', 'JRI', 'WRG']
    }
  },
  {
    id: 9,
    slug: 'beauty-career-educator',
    title: 'Beauty & Career Educator Training',
    subtitle: 'Train the next generation of beauty professionals',
    description: '240-hour program preparing experienced beauty professionals to become educators.',
    level: 'intermediate',
    duration_hours: 240,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity',
      cip_code: '12.0413',
      credentials: ['Career Educator Certification'],
      format: 'Hybrid',
      funding: ['WIOA', 'WRG']
    }
  },
  {
    id: 10,
    slug: 'certified-peer-support-professional',
    title: 'Certified Peer Support Professional',
    subtitle: 'Support individuals in recovery',
    description: '80-hour program preparing students for peer support certification.',
    level: 'beginner',
    duration_hours: 80,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity',
      cip_code: '51.1508',
      credentials: ['Peer Support Specialist Certification'],
      format: 'Hybrid',
      funding: ['WIOA', 'WRG']
    }
  },
  {
    id: 11,
    slug: 'certified-peer-recovery-coach',
    title: 'Certified Peer Recovery Coach',
    subtitle: 'Guide others on their recovery journey',
    description: '80-hour program preparing students for recovery coach certification.',
    level: 'beginner',
    duration_hours: 80,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity',
      cip_code: '51.1508',
      credentials: ['Recovery Coach Certification'],
      format: 'Hybrid',
      funding: ['WIOA', 'WRG']
    }
  },
  {
    id: 12,
    slug: 'cpr-certification',
    title: 'CPR & First Aid Certification',
    subtitle: 'Life-saving skills training',
    description: '8-hour program leading to CPR/AED/First Aid certification.',
    level: 'beginner',
    duration_hours: 8,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity / AHA Certified',
      cip_code: '51.0904',
      credentials: ['CPR/AED/First Aid Certification'],
      format: 'In-person',
      funding: ['WIOA', 'WRG']
    }
  },
  {
    id: 13,
    slug: 'certified-community-healthcare-worker',
    title: 'Certified Community Healthcare Worker',
    subtitle: 'Bridge healthcare and community',
    description: '160-hour program preparing students for community health worker certification.',
    level: 'beginner',
    duration_hours: 160,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity',
      cip_code: '51.0000',
      credentials: ['Community Health Worker Certification'],
      format: 'Hybrid',
      funding: ['WIOA', 'WRG']
    }
  },
  {
    id: 14,
    slug: 'emergency-health-safety-tech',
    title: 'Emergency Health & Safety Technician',
    subtitle: 'Workplace safety and emergency response',
    description: '40-hour program covering CPR, First Aid, and OSHA 10.',
    level: 'beginner',
    duration_hours: 40,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity',
      cip_code: '51.0904',
      credentials: ['CPR/AED', 'First Aid', 'OSHA 10'],
      format: 'Hybrid',
      funding: ['WIOA', 'WRG']
    }
  },
  {
    id: 15,
    slug: 'nrf-rise-up-complete',
    title: 'NRF Rise Up Certificate',
    subtitle: 'Retail industry fundamentals',
    description: '40-hour online program covering retail customer service and operations.',
    level: 'beginner',
    duration_hours: 40,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'National Retail Federation / Elevate for Humanity',
      cip_code: '52.1801',
      credentials: ['NRF Customer Service Certification'],
      format: '100% Online',
      funding: ['WIOA', 'WRG']
    }
  },
  {
    id: 16,
    slug: 'jri-complete-series',
    title: 'JRI Complete Series',
    subtitle: 'Justice Reinvestment Initiative training',
    description: '120-hour program for justice-involved individuals.',
    level: 'beginner',
    duration_hours: 120,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'JRI / Elevate for Humanity',
      cip_code: '43.0103',
      credentials: ['JRI Facilitator Certification'],
      format: 'Hybrid',
      funding: ['WIOA', 'JRI', 'WRG']
    }
  },
  {
    id: 17,
    slug: 'rise-up-certificate',
    title: 'Rise Up Certificate',
    subtitle: 'Retail industry fundamentals',
    description: '40-hour online program covering retail basics.',
    level: 'beginner',
    duration_hours: 40,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Rise Forward / Elevate for Humanity',
      cip_code: '52.1801',
      credentials: ['Retail Industry Fundamentals'],
      format: '100% Online',
      funding: ['WIOA', 'WRG']
    }
  }
];

export function getMockCourses() {
  return mockCourses;
}

export function getMockCourseBySlug(slug: string) {
  return mockCourses.find(c => c.slug === slug);
}

export function getMockCourseById(id: number) {
  return mockCourses.find(c => c.id === id);
}

export function getMockCourseStats() {
  return {
    total: mockCourses.length,
    published: mockCourses.filter(c => c.status === 'published').length,
    totalHours: mockCourses.reduce((sum, c) => sum + c.duration_hours, 0),
    avgDuration: Math.round(mockCourses.reduce((sum, c) => sum + c.duration_hours, 0) / mockCourses.length)
  };
}
