import { NextRequest, NextResponse } from 'next/server';
import {
  getUserOctokit,
  gh,
  parseRepo,
  getLanguageFromPath,
} from '@/lib/github';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function GET(req: NextRequest) {
  const userToken = req.headers.get('x-gh-token');
  const repo = req.nextUrl.searchParams.get('repo');
  const path = req.nextUrl.searchParams.get('path');
  const ref = req.nextUrl.searchParams.get('ref') || 'main';

  if (!repo || !path) {
    return NextResponse.json(
      { error: 'Missing repo or path parameter' },
      { status: 400 }
    );
  }

  try {
    const { owner, name } = parseRepo(repo);
    const client = userToken ? getUserOctokit(userToken) : gh();

    const { data } = await client.repos.getContent({
      owner,
      repo: name,
      path,
      ref,
    });

    // Handle directory vs file
    if (Array.isArray(data)) {
      return NextResponse.json(
        {
          error: 'Path is a directory, not a file',
        },
        { status: 400 }
      );
    }

    // Decode base64 content
    // @ts-expect-error TS2339: Property 'content' does not exist on type '{ type: "file"; encoding: string; ...
    const content = Buffer.from(data.content || '', 'base64').toString('utf8');

    // Detect language for syntax highlighting
    const language = getLanguageFromPath(path);

    return NextResponse.json({
      content,
      sha: data.sha,
      size: data.size,
      name: data.name,
      path: data.path,
      language,
      // @ts-expect-error TS2339: Property 'encoding' does not exist on type '{ type: "file"; encoding: string;...
      encoding: data.encoding,
      url: data.url,
      git_url: data.git_url,
      html_url: data.html_url,
      download_url: data.download_url,
    });
  } catch (error: unknown) {
    // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'Error'.
    logger.error('GitHub file read error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch file',
        message: toErrorMessage(error),
        // @ts-expect-error TS2339: Property 'status' does not exist on type 'unknown'.
        status: error.status,
      },
      // @ts-expect-error TS2339: Property 'status' does not exist on type 'unknown'.
      { status: error.status || 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const userToken = req.headers.get('x-gh-token');

  try {
    const body = await req.json();
    const {
      repo,
      path,
      message,
      content,
      sha,
      branch = 'main',
      committer,
    } = body;

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

    // Build commit message
    const commitMessage = message || `Update ${path} via Dev Studio`;

    // Prepare request
    const requestData: unknown = {
      owner,
      repo: name,
      path,
      message: commitMessage,
      content: Buffer.from(content, 'utf8').toString('base64'),
      branch,
    };

    // Add SHA if updating existing file
    if (sha) {
      // @ts-expect-error TS2339: Property 'sha' does not exist on type 'unknown'.
      requestData.sha = sha;
    }

    // Add committer info if provided
    if (committer) {
      // @ts-expect-error TS2339: Property 'committer' does not exist on type 'unknown'.
      requestData.committer = committer;
    }

    // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'RequestPar...
    const res = await client.repos.createOrUpdateFileContents(requestData);

    return NextResponse.json({
      ok: true,
      commit: res.data.commit.sha,
      content: {
        sha: res.data.content?.sha,
        path: res.data.content?.path,
        size: res.data.content?.size,
      },
      message: commitMessage,
    });
  } catch (error: unknown) {
    // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'Error'.
    logger.error('GitHub file write error:', error);
    return NextResponse.json(
      {
        error: 'Failed to save file',
        message: toErrorMessage(error),
        // @ts-expect-error TS2339: Property 'status' does not exist on type 'unknown'.
        status: error.status,
      },
      // @ts-expect-error TS2339: Property 'status' does not exist on type 'unknown'.
      { status: error.status || 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const userToken = req.headers.get('x-gh-token');

  try {
    const body = await req.json();
    const { repo, path, message, sha, branch = 'main' } = body;

    if (!repo || !path || !sha) {
      return NextResponse.json(
        {
          error: 'Missing required fields (repo, path, sha)',
        },
        { status: 400 }
      );
    }

    const { owner, name } = parseRepo(repo);
    const client = userToken ? getUserOctokit(userToken) : gh();

    const commitMessage = message || `Delete ${path} via Dev Studio`;

    const res = await client.repos.deleteFile({
      owner,
      repo: name,
      path,
      message: commitMessage,
      sha,
      branch,
    });

    return NextResponse.json({
      ok: true,
      commit: res.data.commit.sha,
      message: commitMessage,
    });
  } catch (error: unknown) {
    // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'Error'.
    logger.error('GitHub file delete error:', error);
    return NextResponse.json(
      {
        error: 'Failed to delete file',
        message: toErrorMessage(error),
        // @ts-expect-error TS2339: Property 'status' does not exist on type 'unknown'.
        status: error.status,
      },
      // @ts-expect-error TS2339: Property 'status' does not exist on type 'unknown'.
      { status: error.status || 500 }
    );
  }
}
