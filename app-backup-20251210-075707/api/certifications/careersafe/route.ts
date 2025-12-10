import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    provider: 'CareerSafe',
    status: 'active',
    certifications: [
      'OSHA 10-Hour General Industry',
      'OSHA 10-Hour Construction',
      'OSHA 30-Hour General Industry',
      'OSHA 30-Hour Construction',
    ],
    integration_status: 'ready',
  });
}
