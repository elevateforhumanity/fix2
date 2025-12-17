import { NextRequest, NextResponse } from 'next/server';
import { gh, parseRepo, getUserOctokit } from '@/lib/github';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function GET(req: NextRequest) {
  const repo = req.nextUrl.searchParams.get('repo');
  const userToken = req.headers.get('x-gh-token');

  if (!repo) {
    return NextResponse.json(
      { error: 'Missing repo parameter' },
      { status: 400 }
    );
  }

  try {
    const { owner, name } = parseRepo(repo);
    const client = userToken ? getUserOctokit(userToken) : gh();

    const { data } = await client.repos.listBranches({
      owner,
      repo: name,
      per_page: 100,
    });

    // Get detailed branch info including protection status
    const branches = data.map((branch) => ({
      name: branch.name,
      commit: {
        sha: branch.commit.sha,
        url: branch.commit.url,
      },
      protected: branch.protected,
    }));

    return NextResponse.json(branches);
  } catch (error: unknown) {
    // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'Error'.
    logger.error('GitHub branches error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch branches',
        message: toErrorMessage(error),
        // @ts-expect-error TS2339: Property 'status' does not exist on type 'unknown'.
        status: error.status,
      },
      // @ts-expect-error TS2339: Property 'status' does not exist on type 'unknown'.
      { status: error.status || 500 }
    );
  }
}
