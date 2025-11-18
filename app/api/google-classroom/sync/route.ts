import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Import Google Classroom sync module
    const { syncAllCourses } = await import(
      '@/google-classroom-autopilot/src/lms-sync'
    );

    const result = await syncAllCourses();

    return NextResponse.json({
      success: true,
      synced: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Google Classroom Autopilot Active',
    modules: [
      'lms-sync',
      'email-correlation',
      'guardian-preferences',
      'missing-assignments-email',
      'auto-sync-jobs',
      'alerts',
      'email-webhooks',
      'identity-import',
    ],
  });
}
