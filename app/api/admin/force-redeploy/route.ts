import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    // Check for admin authorization
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Clear all caches
    await execAsync('rm -rf .next node_modules/.cache .vercel');

    // Add cache buster
    const timestamp = Date.now();
    await execAsync(`echo "CACHEBUSTER=${timestamp}" >> .env.local`);

    // Trigger Vercel deployment
    const { stdout, stderr } = await execAsync('vercel --prod --force');

    return NextResponse.json({
      success: true,
      message: 'Force redeploy triggered',
      timestamp,
      output: stdout,
      errors: stderr || null,
    });
  } catch (error) {
    console.error('Force redeploy error:', error);
    return NextResponse.json(
      {
        error: 'Failed to trigger redeploy',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
