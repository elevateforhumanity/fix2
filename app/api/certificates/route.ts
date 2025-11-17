import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const certificates = [
    {
      id: 'CERT-2024-001',
      userId,
      courseName: 'Certified Nursing Assistant (CNA)',
      studentName: 'John Doe',
      completionDate: '2024-03-01',
      issueDate: '2024-03-05',
      status: 'issued',
      downloadUrl: '/api/certificates/CERT-2024-001/download',
    },
  ];

  return NextResponse.json({ certificates });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.userId || !body.courseId) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const certificate = {
    id: `CERT-${Date.now()}`,
    ...body,
    issueDate: new Date().toISOString(),
    status: 'issued',
  };

  return NextResponse.json(certificate, { status: 201 });
}
