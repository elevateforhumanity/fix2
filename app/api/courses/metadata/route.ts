import { NextRequest, NextResponse } from 'next/server';
import { gh, parseRepo } from '@/lib/github';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const course = searchParams.get('course');
    const repo = searchParams.get('repo') || 'elevateforhumanity/fix2';
    const branch = searchParams.get('branch') || 'main';

    if (!course) {
      return NextResponse.json(
        { error: 'Missing course parameter' },
        { status: 400 }
      );
    }

    const client = gh();
    const { owner, name } = parseRepo(repo);
    const path = `courses/${course}/metadata.json`;

    const response = await client.repos.getContent({
      owner,
      repo: name,
      path,
      ref: branch,
    });

    // Handle array response (directory)
    if (Array.isArray(response.data)) {
      return NextResponse.json(
        { error: 'Path is a directory, not a file' },
        { status: 400 }
      );
    }

    // @ts-expect-error TS2339: Property 'content' does not exist on type '{ type: "file"; encoding: string; ...
    const raw = Buffer.from(response.data.content || '', 'base64').toString(
      'utf8'
    );
    const metadata = JSON.parse(raw);

    return NextResponse.json(metadata);
  } catch (error: unknown) {
    // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'Error'.
    logger.error('Get metadata error:', error);

    // @ts-expect-error TS2339: Property 'status' does not exist on type 'unknown'.
    if (error.status === 404) {
      return NextResponse.json(
        { error: 'Metadata file not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch metadata', message: toErrorMessage(error) },
      { status: 500 }
    );
  }
}
