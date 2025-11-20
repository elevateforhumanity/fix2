import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/rbac';

export async function POST(req: NextRequest) {
  // Check if user is admin
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
    const PROJECT_ID = process.env.VERCEL_PROJECT_ID;

    if (!VERCEL_TOKEN || !PROJECT_ID) {
      return NextResponse.json(
        { error: 'Vercel credentials not configured' },
        { status: 500 }
      );
    }

    // Trigger a new deployment
    const response = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'fix2-gpql',
        projectId: PROJECT_ID,
        target: 'production',
        gitSource: {
          type: 'github',
          ref: 'main',
          repoId: 'elevateforhumanity/fix2',
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Vercel deployment error:', error);
      return NextResponse.json(
        { error: 'Failed to trigger deployment' },
        { status: 500 }
      );
    }

    const deployment = await response.json();

    return NextResponse.json({
      success: true,
      deploymentId: deployment.id,
      deploymentUrl: deployment.url,
      message: 'New deployment triggered successfully',
    });
  } catch (err: any) {
    console.error('Hard refresh error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to trigger hard refresh' },
      { status: 500 }
    );
  }
}
