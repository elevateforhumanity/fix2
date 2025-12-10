import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    provider: 'IRS VITA/TCE',
    status: 'active',
    program: 'Volunteer Income Tax Assistance',
    certifications: [
      'Basic Tax Preparation',
      'Advanced Tax Preparation',
      'Military Tax Preparation',
      'International Tax Preparation',
    ],
    integration_status: 'ready',
  });
}
