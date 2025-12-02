import { NextResponse } from 'next/server';
import { calculateFunderMetrics } from '@/lib/reporting/enterprise-dashboard';

export async function GET() {
  try {
    const metrics = await calculateFunderMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error fetching funder metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch funder metrics' },
      { status: 500 }
    );
  }
}
