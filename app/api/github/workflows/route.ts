export const runtime = 'nodejs';
export const maxDuration = 60;

import { NextRequest, NextResponse } from 'next/server';
import { requireDevStudioAccess } from '@/lib/auth/dev-studio-access';
import { getUserOctokit, gh, parseRepo } from '@/lib/github';
import { logger } from '@/lib/logger';
import { toErrorMessage } from '@/lib/safe';

function clientFor(req: NextRequest) {
  const userToken = req.headers.get('x-gh-token');
  return userToken ? getUserOctokit(userToken) : gh();
}

export async function GET(req: NextRequest) {
  const unauthorized = await requireDevStudioAccess();
  if (unauthorized) return unauthorized;

  const repo = req.nextUrl.searchParams.get('repo');

  if (!repo) {
    return NextResponse.json(
      { error: 'Missing repo parameter' },
      { status: 400 }
    );
  }

  try {
    const { owner, name } = parseRepo(repo);
    const client = clientFor(req);
    const { data } = await client.actions.listRepoWorkflows({
      owner,
      repo: name,
      per_page: 100,
    });

    return NextResponse.json({
      workflows: data.workflows.map((workflow) => ({
        id: workflow.id,
        name: workflow.name,
        path: workflow.path,
        state: workflow.state,
        badge_url: workflow.badge_url,
        html_url: workflow.html_url,
        created_at: workflow.created_at,
        updated_at: workflow.updated_at,
      })),
    });
  } catch (error: unknown) {
    logger.error(
      'GitHub workflows list error:',
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(
      { error: 'Failed to list workflows', message: toErrorMessage(error) },
      { status: (error as { status?: number })?.status || 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireDevStudioAccess();
  if (unauthorized) return unauthorized;

  try {
    const { repo, workflowId, ref = 'main', inputs } = await req.json();

    if (!repo || !workflowId) {
      return NextResponse.json(
        { error: 'Missing required fields (repo, workflowId)' },
        { status: 400 }
      );
    }

    const { owner, name } = parseRepo(repo);
    const client = clientFor(req);

    await client.actions.createWorkflowDispatch({
      owner,
      repo: name,
      workflow_id: workflowId,
      ref,
      inputs: inputs || undefined,
    });

    return NextResponse.json({ ok: true, workflowId, ref });
  } catch (error: unknown) {
    logger.error(
      'GitHub workflow dispatch error:',
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(
      {
        error: 'Failed to dispatch workflow',
        message: toErrorMessage(error),
        note: 'The workflow must include workflow_dispatch and the token must have Actions write access.',
      },
      { status: (error as { status?: number })?.status || 500 }
    );
  }
}
