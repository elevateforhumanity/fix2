import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    provider: 'Certiport',
    status: 'active',
    certifications: [
      'Microsoft Office Specialist',
      'IC3 Digital Literacy',
      'Adobe Certified Professional',
      'Autodesk Certified User',
      'Intuit QuickBooks Certified User',
    ],
    integration_status: 'ready',
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    success: true,
    message: 'Certiport certification tracking activated',
    student_id: body.student_id,
    certification: body.certification,
  });
}
