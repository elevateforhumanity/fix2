import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'all';

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  // Mock search results - replace with actual database queries
  const allResults = {
    programs: [
      { id: 1, title: 'HVAC Technician Training', type: 'program', url: '/programs/hvac-technician', description: '12-week intensive HVAC training program' },
      { id: 2, title: 'Certified Nursing Assistant', type: 'program', url: '/programs/cna-training', description: 'CNA certification program' },
      { id: 3, title: 'Web Development Bootcamp', type: 'program', url: '/programs/web-development', description: '16-week coding bootcamp' },
    ],
    pages: [
      { id: 4, title: 'About Us', type: 'page', url: '/about', description: 'Learn about our mission and values' },
      { id: 5, title: 'WIOA Eligibility', type: 'page', url: '/wioa-eligibility', description: 'Check if you qualify for WIOA funding' },
      { id: 6, title: 'Career Services', type: 'page', url: '/career-services', description: 'Job placement and career support' },
    ],
    resources: [
      { id: 7, title: 'Financial Aid Guide', type: 'resource', url: '/financial-aid', description: 'Learn about funding options' },
      { id: 8, title: 'Success Stories', type: 'resource', url: '/success-stories', description: 'Read student testimonials' },
    ],
  };

  // Filter results based on query
  const searchLower = query.toLowerCase();
  let results: any[] = [];

  if (type === 'all' || type === 'programs') {
    results = results.concat(
      allResults.programs.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      )
    );
  }

  if (type === 'all' || type === 'pages') {
    results = results.concat(
      allResults.pages.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      )
    );
  }

  if (type === 'all' || type === 'resources') {
    results = results.concat(
      allResults.resources.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      )
    );
  }

  return NextResponse.json({ results, query });
}
