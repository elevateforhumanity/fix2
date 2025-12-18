import { NextResponse } from 'next/server';
import { runAutomationTasks } from '@/lib/automation/enrollment-automation';

export const dynamic = 'force-dynamic';

/**
 * Cron job endpoint for enrollment automation
 * Called by Vercel Cron or external scheduler
 */
export async function GET(req: Request) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'dev-secret';
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const results = await runAutomationTasks();
    
    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error: any) {
    console.error('[Cron] Automation error:', error);
    return NextResponse.json(
      { error: 'Automation failed', message: error.message },
      { status: 500 }
    );
  }
}
