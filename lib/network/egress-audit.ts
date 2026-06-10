import { resolve4 } from 'node:dns/promises';

export type EgressProbe = {
  name: string;
  url: string;
  host: string;
  ok: boolean;
  dnsOk: boolean;
  fetchOk: boolean;
  status?: number;
  durationMs: number;
  dnsError?: string;
  fetchError?: string;
};

export type EgressAuditResult = {
  ok: boolean;
  generatedAt: string;
  proxy: {
    httpProxy: boolean;
    httpsProxy: boolean;
    allProxy: boolean;
    noProxy: string | null;
  };
  probes: EgressProbe[];
  blockers: string[];
  recommendation: string;
};

const DEFAULT_TIMEOUT_MS = 8_000;

const TARGETS = [
  {
    name: 'GitHub API',
    url: 'https://api.github.com/rate_limit',
    host: 'api.github.com',
  },
  { name: 'GitHub', url: 'https://github.com', host: 'github.com' },
  {
    name: 'Northflank API',
    url: 'https://api.northflank.com/v1/projects',
    host: 'api.northflank.com',
  },
];

function envFlag(...names: string[]) {
  return names.some((name) => Boolean(process.env[name]?.trim()));
}

function envValue(...names: string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }

  return null;
}

function messageFrom(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

async function probeTarget(
  target: (typeof TARGETS)[number],
  timeoutMs: number
): Promise<EgressProbe> {
  const started = Date.now();
  let dnsOk = false;
  let fetchOk = false;
  let status: number | undefined;
  let dnsError: string | undefined;
  let fetchError: string | undefined;

  try {
    await resolve4(target.host);
    dnsOk = true;
  } catch (error: unknown) {
    dnsError = messageFrom(error);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(target.url, {
      method: target.name === 'Northflank API' ? 'GET' : 'HEAD',
      cache: 'no-store',
      signal: controller.signal,
      headers:
        target.name === 'Northflank API'
          ? { Accept: 'application/json' }
          : undefined,
    });
    status = response.status;
    fetchOk = response.status < 500;
  } catch (error: unknown) {
    fetchError = messageFrom(error);
  } finally {
    clearTimeout(timer);
  }

  return {
    ...target,
    ok: dnsOk && fetchOk,
    dnsOk,
    fetchOk,
    status,
    durationMs: Date.now() - started,
    dnsError,
    fetchError,
  };
}

export async function auditContainerEgress(
  timeoutMs = DEFAULT_TIMEOUT_MS
): Promise<EgressAuditResult> {
  const proxy = {
    httpProxy: envFlag('HTTP_PROXY', 'http_proxy'),
    httpsProxy: envFlag('HTTPS_PROXY', 'https_proxy'),
    allProxy: envFlag('ALL_PROXY', 'all_proxy'),
    noProxy: envValue('NO_PROXY', 'no_proxy'),
  };

  const probes = await Promise.all(
    TARGETS.map((target) => probeTarget(target, timeoutMs))
  );
  const blockers: string[] = [];

  const dnsFailures = probes.filter((probe) => !probe.dnsOk);
  const fetchFailures = probes.filter((probe) => !probe.fetchOk);

  if (dnsFailures.length > 0) {
    blockers.push(
      `DNS failed for ${dnsFailures.map((probe) => probe.host).join(', ')}. Direct egress cannot work until the container resolver can resolve public hosts.`
    );
  }

  const proxyTunnelFailures = fetchFailures.filter((probe) =>
    /CONNECT tunnel failed|proxy|tunnel/i.test(probe.fetchError || '')
  );
  if (proxyTunnelFailures.length > 0) {
    blockers.push(
      `Proxy tunnel blocked ${proxyTunnelFailures.map((probe) => probe.host).join(', ')}. The outer proxy allowlist must allow HTTPS CONNECT to GitHub and Northflank.`
    );
  }

  const otherFetchFailures = fetchFailures.filter(
    (probe) =>
      !/CONNECT tunnel failed|proxy|tunnel/i.test(probe.fetchError || '')
  );
  if (otherFetchFailures.length > 0) {
    blockers.push(
      `Fetch failed for ${otherFetchFailures.map((probe) => probe.host).join(', ')}. See per-host fetchError values for details.`
    );
  }

  const ok = probes.every((probe) => probe.ok);

  return {
    ok,
    generatedAt: new Date().toISOString(),
    proxy,
    probes,
    blockers,
    recommendation: ok
      ? 'Container direct egress is available for GitHub and Northflank.'
      : 'Use the GitHub Actions Northflank deploy relay from Dev Studio, or update the container/host network policy to allow DNS plus HTTPS CONNECT to github.com, api.github.com, and api.northflank.com.',
  };
}
