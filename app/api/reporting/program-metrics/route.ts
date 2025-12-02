import { NextResponse } from 'next/server';
import { calculateProgramMetrics } from '@/lib/reporting/enterprise-dashboard';

export async function GET() {
  try {
    const metrics = await calculateProgramMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error fetching program metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch program metrics' },
      { status: 500 }
    );
  }
}
