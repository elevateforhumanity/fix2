import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/rbac';

const GITHUB_API_BASE = 'https://api.github.com';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    return NextResponse.json(
      { error: 'Missing GitHub CI configuration' },
      { status: 500 }
    );
  }

  const url = new URL(`${GITHUB_API_BASE}/repos/${owner}/${repo}/actions/runs`);
  url.searchParams.set('per_page', '15');

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: 'Failed to fetch CI runs', details: text },
      { status: 500 }
    );
  }

  const data = await res.json();

  const runs =
    data?.workflow_runs?.map((r: any) => ({
      id: r.id,
      name: r.name,
      status: r.status,
      conclusion: r.conclusion,
      event: r.event,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
      url: r.html_url,
      branch: r.head_branch,
      commitSha: r.head_sha,
    })) || [];

  return NextResponse.json({ runs });
}
