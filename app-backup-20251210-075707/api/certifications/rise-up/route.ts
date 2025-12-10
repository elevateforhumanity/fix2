import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    provider: 'NRF Rise Up',
    status: 'active',
    certifications: [
      'Customer Service & Sales',
      'Retail Industry Fundamentals',
      'Store Operations',
      'Inventory Management',
    ],
    integration_status: 'ready',
  });
}
