import { NextRequest, NextResponse } from 'next/server';
import { gh, parseRepo, getUserOctokit } from '@/lib/github';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(req: NextRequest) {
  const userToken = req.headers.get('x-gh-token');

  try {
    const { repo, path, branch, content, sha, message } = await req.json();

    if (!repo || !path || !content) {
      return NextResponse.json(
        {
          error: 'Missing required fields (repo, path, content)',
        },
        { status: 400 }
      );
    }

    const { owner, name } = parseRepo(repo);
    const client = userToken ? getUserOctokit(userToken) : gh();

    const commitMessage = message || `update: ${path}`;

    // Commit new version of file
    const res = await client.repos.createOrUpdateFileContents({
      owner,
      repo: name,
      path,
      message: commitMessage,
      content: Buffer.from(content).toString('base64'),
      sha,
      branch: branch || 'main',
    });

    return NextResponse.json({
      ok: true,
      commit: res.data.commit.sha,
      content: {
        sha: res.data.content?.sha,
        path: res.data.content?.path,
      },
      message: commitMessage,
    });
  } catch (error: unknown) {
    // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'Error'.
    logger.error('GitHub commit error:', error);
    return NextResponse.json(
      {
        error: 'Failed to commit file',
        message: toErrorMessage(error),
        // @ts-expect-error TS2339: Property 'status' does not exist on type 'unknown'.
        status: error.status,
      },
      // @ts-expect-error TS2339: Property 'status' does not exist on type 'unknown'.
      { status: error.status || 500 }
    );
  }
}
