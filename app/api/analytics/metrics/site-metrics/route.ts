import { NextResponse } from 'next/server';
import { calculateSiteMetrics } from '@/lib/reporting/enterprise-dashboard';

export async function GET() {
  try {
    const metrics = await calculateSiteMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error fetching site metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch site metrics' },
      { status: 500 }
    );
  }
}
