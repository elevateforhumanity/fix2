import { NextResponse } from 'next/server';
import { calculateOverallMetrics } from '@/lib/reporting/enterprise-dashboard';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const metrics = await calculateOverallMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    logger.error('Error fetching overall metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch overall metrics' },
      { status: 500 }
    );
  }
}
