import { NextResponse } from 'next/server';

export async function GET() {
  const courses = [
    {
      id: '1',
      title: 'Certified Nursing Assistant (CNA)',
      category: 'Healthcare',
      duration: '6-8 weeks',
      price: 0,
      rating: 4.8,
      students: 342,
      image: '/media/programs/healthcare-1.jpg',
      description: 'State-approved CNA training with clinical experience',
    },
    {
      id: '2',
      title: 'HVAC Technician',
      category: 'Skilled Trades',
      duration: '12 weeks',
      price: 0,
      rating: 4.7,
      students: 256,
      image: '/media/programs/trades-1.jpg',
      description: 'Comprehensive HVAC training for residential and commercial systems',
    },
    {
      id: '3',
      title: 'Barber Apprenticeship',
      category: 'Skilled Trades',
      duration: '12-18 months',
      price: 0,
      rating: 4.9,
      students: 189,
      image: '/media/programs/barber-hero.jpg',
      description: 'State-approved apprenticeship leading to barber license',
    },
  ];

  return NextResponse.json({ courses, total: courses.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // Validate course data
  if (!body.title || !body.category) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  // Create course (mock)
  const newCourse = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(newCourse, { status: 201 });
}
