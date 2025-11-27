import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const programs = [
  {
    id: 'cna',
    name: 'Certified Nursing Assistant (CNA)',
    category: 'Healthcare',
    duration: '4-6 weeks',
    funding: 'WIOA, WRG',
    url: '/programs/cna',
  },
  {
    id: 'hvac',
    name: 'HVAC Technician',
    category: 'Skilled Trades',
    duration: '6-12 months',
    funding: 'WIOA, WRG, Apprenticeship',
    url: '/programs/hvac',
  },
  {
    id: 'barber',
    name: 'Barber Apprenticeship',
    category: 'Beauty & Wellness',
    duration: '1-2 years',
    funding: 'Apprenticeship',
    url: '/programs/barber',
  },
  {
    id: 'medical-assistant',
    name: 'Medical Assistant',
    category: 'Healthcare',
    duration: '8-12 weeks',
    funding: 'WIOA, WRG',
    url: '/programs/medical-assistant',
  },
  {
    id: 'patient-care',
    name: 'Patient Care Technician',
    category: 'Healthcare',
    duration: '6-8 weeks',
    funding: 'WIOA, WRG',
    url: '/programs/patient-care',
  },
  {
    id: 'building-maintenance',
    name: 'Building Maintenance Technician',
    category: 'Skilled Trades',
    duration: '8-12 weeks',
    funding: 'WIOA, WRG',
    url: '/programs/building-maintenance',
  },
  {
    id: 'esthetician',
    name: 'Esthetician',
    category: 'Beauty & Wellness',
    duration: '6-9 months',
    funding: 'WIOA, WRG',
    url: '/programs/esthetician',
  },
  {
    id: 'culinary',
    name: 'Culinary Arts',
    category: 'Hospitality',
    duration: '12-18 months',
    funding: 'WIOA, WRG',
    url: '/programs/culinary',
  },
  {
    id: 'emt',
    name: 'Emergency Medical Technician (EMT)',
    category: 'Healthcare',
    duration: '3-6 months',
    funding: 'WIOA, WRG',
    url: '/programs/emt',
  },
  {
    id: 'tax-prep',
    name: 'VITA Tax Preparation',
    category: 'Business',
    duration: '4-8 weeks',
    funding: 'Free',
    url: '/programs/tax-prep',
  },
  {
    id: 'rise-up',
    name: 'NRF RISE Up Retail Training',
    category: 'Retail',
    duration: '4-6 weeks',
    funding: 'Free',
    url: '/programs/rise-up',
  },
  {
    id: 'childcare',
    name: 'Childcare & Early Education',
    category: 'Education',
    duration: '8-12 weeks',
    funding: 'WIOA, WRG',
    url: '/programs/childcare',
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let filteredPrograms = programs;

    // Filter by category
    if (category) {
      filteredPrograms = filteredPrograms.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPrograms = filteredPrograms.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      success: true,
      count: filteredPrograms.length,
      programs: filteredPrograms,
    });
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch programs' },
      { status: 500 }
    );
  }
}
