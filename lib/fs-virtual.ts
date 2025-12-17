import { gh, parseRepo } from './github';

export async function readFile(repo: string, path: string, ref = 'main') {
  const { owner, name } = parseRepo(repo);
  const client = gh();

  const file = await client.repos.getContent({
    owner,
    repo: name,
    path,
    ref,
  });

  // Handle array response (directory)
  if (Array.isArray(file.data)) {
    throw new Error('Path is a directory, not a file');
  }

  // @ts-expect-error TS2339: Property 'content' does not exist on type '{ type: "file"; encoding: string; ...
  return Buffer.from(file.data.content || '', 'base64').toString('utf8');
}

export async function writeFile(
  repo: string,
  path: string,
  content: string,
  sha?: string,
  branch = 'main'
) {
  const { owner, name } = parseRepo(repo);
  const client = gh();

  const params: unknown = {
    owner,
    repo: name,
    path,
    branch,
    message: `autopilot: update ${path}`,
    content: Buffer.from(content).toString('base64'),
  };

  if (sha) {
    // @ts-expect-error TS2339: Property 'sha' does not exist on type 'unknown'.
    params.sha = sha;
  }

  // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'RequestPar...
  return client.repos.createOrUpdateFileContents(params);
}

export async function listFiles(repo: string, folder: string, ref = 'main') {
  const { owner, name } = parseRepo(repo);
  const client = gh();

  try {
    const res = await client.repos.getContent({
      owner,
      repo: name,
      path: folder,
      ref,
    });

    if (!Array.isArray(res.data)) return [];

    return res.data.map((f) => f.path);
  } catch (error) {
    return [];
  }
}

export async function fileExists(
  repo: string,
  path: string,
  ref = 'main'
): Promise<boolean> {
  try {
    await readFile(repo, path, ref);
    return true;
  } catch {
    return false;
  }
}

export async function deleteFile(
  repo: string,
  path: string,
  sha: string,
  branch = 'main'
) {
  const { owner, name } = parseRepo(repo);
  const client = gh();

  return client.repos.deleteFile({
    owner,
    repo: name,
    path,
    message: `autopilot: delete ${path}`,
    sha,
    branch,
  });
}
