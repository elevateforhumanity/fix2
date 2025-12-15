/**
 * Advanced Autopilot - Environment Variable Sync Worker
 * Runs inside Vercel to automatically sync all environment variables
 * 
 * Endpoint: /api/autopilot/sync-env
 * Method: POST
 * Auth: Requires AUTOPILOT_SECRET
 */

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface VercelEnvVar {
  type: string;
  id: string;
  key: string;
  value: string;
  target: string[];
  gitBranch?: string;
  configurationId?: string;
  updatedAt?: number;
  createdAt?: number;
}

interface EnvSyncResult {
  success: boolean;
  message: string;
  variables?: {
    total: number;
    categories: Record<string, number>;
    keys: string[];
  };
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Verify autopilot secret
    const authHeader = request.headers.get('authorization');
    const autopilotSecret = process.env.AUTOPILOT_SECRET;
    
    if (!autopilotSecret || authHeader !== `Bearer ${autopilotSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get Vercel credentials from environment
    const vercelToken = process.env.VERCEL_TOKEN;
    const vercelProjectId = process.env.VERCEL_PROJECT_ID || 'prj_iUns4lz1mbDP6kRIcukXFVsDWUAV';
    const vercelTeamId = process.env.VERCEL_TEAM_ID || 'team_Ae8f33vVYR36quLOS8HCeROs';

    if (!vercelToken) {
      return NextResponse.json(
        { success: false, error: 'VERCEL_TOKEN not configured' },
        { status: 500 }
      );
    }

    // Fetch all environment variables from Vercel
    const envVars = await fetchVercelEnvVars(vercelToken, vercelProjectId, vercelTeamId);

    if (!envVars) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch environment variables' },
        { status: 500 }
      );
    }

    // Process and categorize variables
    const result = processEnvVars(envVars);

    // Generate .env.local content
    const envContent = generateEnvContent(envVars);

    // Return result
    return NextResponse.json({
      success: true,
      message: `Successfully synced ${result.total} environment variables`,
      variables: result,
      envContent: envContent,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Autopilot sync error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Status endpoint
  return NextResponse.json({
    status: 'active',
    worker: 'env-sync-autopilot',
    version: '1.0.0',
    endpoints: {
      sync: 'POST /api/autopilot/sync-env',
      status: 'GET /api/autopilot/sync-env',
    },
    timestamp: new Date().toISOString(),
  });
}

async function fetchVercelEnvVars(
  token: string,
  projectId: string,
  teamId: string
): Promise<VercelEnvVar[] | null> {
  try {
    const url = `https://api.vercel.com/v9/projects/${projectId}/env?teamId=${teamId}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Vercel API error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    return data.envs || [];
  } catch (error) {
    console.error('Error fetching Vercel env vars:', error);
    return null;
  }
}

function processEnvVars(envVars: VercelEnvVar[]) {
  const categories: Record<string, number> = {
    supabase: 0,
    stripe: 0,
    email: 0,
    auth: 0,
    ai: 0,
    analytics: 0,
    other: 0,
  };

  const keys: string[] = [];

  for (const envVar of envVars) {
    keys.push(envVar.key);

    const key = envVar.key.toLowerCase();
    if (key.includes('supabase')) {
      categories.supabase++;
    } else if (key.includes('stripe')) {
      categories.stripe++;
    } else if (key.includes('smtp') || key.includes('email') || key.includes('resend')) {
      categories.email++;
    } else if (key.includes('auth') || key.includes('nextauth')) {
      categories.auth++;
    } else if (key.includes('openai') || key.includes('ai') || key.includes('elevenlabs')) {
      categories.ai++;
    } else if (key.includes('ga_') || key.includes('analytics') || key.includes('sentry')) {
      categories.analytics++;
    } else {
      categories.other++;
    }
  }

  return {
    total: envVars.length,
    categories,
    keys,
  };
}

function generateEnvContent(envVars: VercelEnvVar[]): string {
  const timestamp = new Date().toISOString();
  
  let content = `# =============================================================================
# ENVIRONMENT VARIABLES - Auto-synced by Autopilot
# =============================================================================
# Generated: ${timestamp}
# Source: Vercel Project
# Autopilot: env-sync-worker
# =============================================================================

`;

  // Categorize variables
  const categories: Record<string, VercelEnvVar[]> = {
    'SUPABASE - Database & Authentication': [],
    'STRIPE - Payment Processing': [],
    'EMAIL - SMTP Configuration': [],
    'AUTHENTICATION - NextAuth': [],
    'AI SERVICES - OpenAI, ElevenLabs': [],
    'ANALYTICS - Google Analytics, Sentry': [],
    'SITE CONFIGURATION': [],
    'OTHER': [],
  };

  for (const envVar of envVars) {
    const key = envVar.key.toLowerCase();
    
    if (key.includes('supabase')) {
      categories['SUPABASE - Database & Authentication'].push(envVar);
    } else if (key.includes('stripe')) {
      categories['STRIPE - Payment Processing'].push(envVar);
    } else if (key.includes('smtp') || key.includes('email') || key.includes('resend')) {
      categories['EMAIL - SMTP Configuration'].push(envVar);
    } else if (key.includes('auth') || key.includes('nextauth')) {
      categories['AUTHENTICATION - NextAuth'].push(envVar);
    } else if (key.includes('openai') || key.includes('ai') || key.includes('elevenlabs')) {
      categories['AI SERVICES - OpenAI, ElevenLabs'].push(envVar);
    } else if (key.includes('ga_') || key.includes('analytics') || key.includes('sentry')) {
      categories['ANALYTICS - Google Analytics, Sentry'].push(envVar);
    } else if (key.includes('site') || key.includes('url') || key.includes('node_env')) {
      categories['SITE CONFIGURATION'].push(envVar);
    } else {
      categories['OTHER'].push(envVar);
    }
  }

  // Generate content by category
  for (const [category, vars] of Object.entries(categories)) {
    if (vars.length === 0) continue;

    content += `# -----------------------------------------------------------------------------\n`;
    content += `# ${category}\n`;
    content += `# -----------------------------------------------------------------------------\n`;

    for (const envVar of vars) {
      content += `${envVar.key}=${envVar.value}\n`;
    }

    content += '\n';
  }

  return content;
}
