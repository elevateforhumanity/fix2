import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
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
      const userRole = (user as any).role || 'student';
      const recommended = await getRecommendedOnboarding(
        (user as any).id,
        userRole as 'student' | 'instructor' | 'admin'
      );
      return NextResponse.json({ recommended });
    }

    if (action === 'progress' && flowId) {
      const progress = await getOnboardingProgress((user as any).id, flowId);
      return NextResponse.json({ progress });
    }

    return NextResponse.json(
      { error: 'Invalid action or missing parameters' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Onboarding GET error:', error);
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
        await startOnboarding((user as any).id, flowId);
        return NextResponse.json({ success: true, message: 'Onboarding started' });

      case 'complete':
        await completeOnboarding((user as any).id, flowId);
        return NextResponse.json({ success: true, message: 'Onboarding completed' });

      case 'skip':
        await skipOnboarding((user as any).id, flowId);
        return NextResponse.json({ success: true, message: 'Onboarding skipped' });

      case 'reset':
        await resetOnboarding((user as any).id, flowId);
        return NextResponse.json({ success: true, message: 'Onboarding reset' });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Onboarding POST error:', error);
    return NextResponse.json(
      { error: 'Failed to update onboarding' },
      { status: 500 }
    );
  }
}
