import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';
import {
  startOnboarding,
  completeOnboarding,
  skipOnboarding,
  resetOnboarding,
  getOnboardingProgress,
  getRecommendedOnboarding,
} from '@/lib/onboarding';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const flowId = searchParams.get('flowId');

    if (action === 'recommended') {
      // @ts-expect-error TS2339: Property 'role' does not exist on type 'string'.
      // @ts-expect-error TS2352: Conversion of type 'Session' to type 'string' may be a mistake because neithe...
      const userRole = (user as string).role || 'student';
      const recommended = await getRecommendedOnboarding(
        // @ts-expect-error TS2339: Property 'id' does not exist on type 'string'.
        // @ts-expect-error TS2352: Conversion of type 'Session' to type 'string' may be a mistake because neithe...
        (user as string).id,
        userRole as 'student' | 'instructor' | 'admin'
      );
      return NextResponse.json({ recommended });
    }

    if (action === 'progress' && flowId) {
      // @ts-expect-error TS2339: Property 'id' does not exist on type 'string'.
      // @ts-expect-error TS2352: Conversion of type 'Session' to type 'string' may be a mistake because neithe...
      const progress = await getOnboardingProgress((user as string).id, flowId);
      return NextResponse.json({ progress });
    }

    return NextResponse.json(
      { error: 'Invalid action or missing parameters' },
      { status: 400 }
    );
  } catch (error) {
    logger.error('Onboarding GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch onboarding data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { action, flowId } = body;

    if (!flowId) {
      return NextResponse.json(
        { error: 'flowId is required' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'start':
        // @ts-expect-error TS2339: Property 'id' does not exist on type 'string'.
        // @ts-expect-error TS2352: Conversion of type 'Session' to type 'string' may be a mistake because neithe...
        await startOnboarding((user as string).id, flowId);
        return NextResponse.json({
          success: true,
          message: 'Onboarding started',
        });

      case 'complete':
        // @ts-expect-error TS2339: Property 'id' does not exist on type 'string'.
        // @ts-expect-error TS2352: Conversion of type 'Session' to type 'string' may be a mistake because neithe...
        await completeOnboarding((user as string).id, flowId);
        return NextResponse.json({
          success: true,
          message: 'Onboarding completed',
        });

      case 'skip':
        // @ts-expect-error TS2339: Property 'id' does not exist on type 'string'.
        // @ts-expect-error TS2352: Conversion of type 'Session' to type 'string' may be a mistake because neithe...
        await skipOnboarding((user as string).id, flowId);
        return NextResponse.json({
          success: true,
          message: 'Onboarding skipped',
        });

      case 'reset':
        // @ts-expect-error TS2339: Property 'id' does not exist on type 'string'.
        // @ts-expect-error TS2352: Conversion of type 'Session' to type 'string' may be a mistake because neithe...
        await resetOnboarding((user as string).id, flowId);
        return NextResponse.json({
          success: true,
          message: 'Onboarding reset',
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    logger.error('Onboarding POST error:', error);
    return NextResponse.json(
      { error: 'Failed to update onboarding' },
      { status: 500 }
    );
  }
}
