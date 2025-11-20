import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  let deploymentTimestamp = 'unknown';

  try {
    const timestampPath = path.join(process.cwd(), '.deployment-timestamp');
    if (fs.existsSync(timestampPath)) {
      deploymentTimestamp = fs.readFileSync(timestampPath, 'utf-8').trim();
    }
  } catch (error) {
    // Ignore errors reading timestamp
  }

  const buildInfo = {
    success: true,
    deployment: {
      timestamp: deploymentTimestamp,
      buildTime: '2025-11-20T04:24:00Z',
      commitSha: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
      commitMessage:
        process.env.VERCEL_GIT_COMMIT_MESSAGE || 'local development',
      branch: process.env.VERCEL_GIT_COMMIT_REF || 'main',
    },
    environment: {
      nodeVersion: process.version,
      nextVersion: '16.0.1',
      vercelEnv: process.env.VERCEL_ENV || 'development',
    },
    features: {
      supabaseConfigured: !!(
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ),
      stripeConfigured: !!process.env.STRIPE_SECRET_KEY,
      emailConfigured: !!process.env.RESEND_API_KEY,
    },
    message: 'Build deployed successfully with all fixes applied',
  };

  return NextResponse.json(buildInfo, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
      'X-Build-Time': '2025-11-20T04:24:00Z',
    },
  });
}
