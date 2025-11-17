import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const enrollments = [
    {
      id: '1',
      userId: userId || '1',
      courseId: '1',
      courseName: 'Certified Nursing Assistant (CNA)',
      progress: 65,
      status: 'in-progress',
      enrolledAt: '2024-02-15',
      lastAccessed: '2024-03-15',
    },
    {
      id: '2',
      userId: userId || '1',
      courseId: '2',
      courseName: 'HVAC Technician',
      progress: 30,
      status: 'in-progress',
      enrolledAt: '2024-03-01',
      lastAccessed: '2024-03-14',
    },
  ];

  return NextResponse.json({ enrollments });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.userId || !body.courseId) {
    return NextResponse.json(
      { error: 'Missing userId or courseId' },
      { status: 400 }
    );
  }

  const enrollment = {
    id: Date.now().toString(),
    ...body,
    progress: 0,
    status: 'enrolled',
    enrolledAt: new Date().toISOString(),
  };

  return NextResponse.json(enrollment, { status: 201 });
}
