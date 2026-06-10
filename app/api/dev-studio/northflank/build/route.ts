import { NextRequest, NextResponse } from 'next/server';

import { requireDevStudioAccess } from '@/lib/auth/dev-studio-access';
import { logger } from '@/lib/logger';
import { toErrorMessage } from '@/lib/safe';

export const runtime = 'nodejs';
export const maxDuration = 60;

type NorthflankTarget = 'public' | 'admin' | 'lms';

const SERVICE_ID_BY_TARGET: Record<NorthflankTarget, string> = {
  public: 'NORTHFLANK_PUBLIC_SERVICE_ID',
  admin: 'NORTHFLANK_ADMIN_SERVICE_ID',
  lms: 'NORTHFLANK_LMS_SERVICE_ID',
};

function isNorthflankTarget(value: unknown): value is NorthflankTarget {
  return value === 'public' || value === 'admin' || value === 'lms';
}

function configured(value: string | undefined) {
  return Boolean(value && value.trim().length > 0);
}

function northflankJson(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: {
      'Cache-Control': 'no-store',
      ...(init?.headers || {}),
    },
  });
}

function optionalString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function parseResponseBody(text: string) {
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireDevStudioAccess();
  if (unauthorized) return unauthorized;

  try {
    const body = await req.json().catch(() => ({}));
    const target = body.target;
    const branch = optionalString(body.branch);
    const sha = optionalString(body.sha);
    const bundleUrl = optionalString(body.bundleUrl);

    if (!isNorthflankTarget(target)) {
      return northflankJson(
        { error: 'Invalid target. Expected public, admin, or lms.' },
        { status: 400 }
      );
    }

    if (sha && !/^[a-f0-9]{40}$/i.test(sha)) {
      return northflankJson(
        { error: 'Invalid sha. Expected a 40 character git commit SHA.' },
        { status: 400 }
      );
    }

    const token = process.env.NORTHFLANK_API_TOKEN;
    const projectId = process.env.NORTHFLANK_PROJECT_ID;
    const serviceEnvName = SERVICE_ID_BY_TARGET[target];
    const serviceId = process.env[serviceEnvName];
    const missing = [
      ['NORTHFLANK_API_TOKEN', token],
      ['NORTHFLANK_PROJECT_ID', projectId],
      [serviceEnvName, serviceId],
    ]
      .filter(([, value]) => !configured(value))
      .map(([name]) => name);

    if (missing.length > 0) {
      return northflankJson(
        {
          error: 'Northflank deployment is not configured.',
          missing,
        },
        { status: 503 }
      );
    }

    const payload: Record<string, unknown> = {};
    if (bundleUrl) {
      payload.bundleUrl = bundleUrl;
      if (branch) payload.branch = branch;
    } else {
      if (sha) payload.sha = sha;
      if (branch) payload.branch = branch;
    }

    const response = await fetch(
      `https://api.northflank.com/v1/projects/${encodeURIComponent(
        projectId!
      )}/services/${encodeURIComponent(serviceId!)}/build`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
      }
    );

    const text = await response.text();
    const data = parseResponseBody(text);

    if (!response.ok) {
      logger.error(
        'Northflank build trigger failed',
        new Error(
          `Northflank ${target} build failed with ${response.status}: ${text}`
        )
      );
      return northflankJson(
        {
          error: 'Northflank build trigger failed.',
          status: response.status,
          details: data,
        },
        { status: response.status }
      );
    }

    return northflankJson({
      ok: true,
      target,
      projectId,
      serviceId,
      branch: branch || null,
      sha: sha || null,
      bundleUrl: bundleUrl || null,
      build: data,
    });
  } catch (error: unknown) {
    logger.error(
      'Northflank build route error',
      error instanceof Error ? error : new Error(String(error))
    );
    return northflankJson(
      {
        error: 'Failed to trigger Northflank build.',
        message: toErrorMessage(error),
      },
      { status: 500 }
    );
  }
}
