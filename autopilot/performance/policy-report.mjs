#!/usr/bin/env node
/**
 * Inputs via env:
 *  - GITHUB_REPOSITORY (owner/repo)
 *  - GITHUB_TOKEN
 *  - PR_NUMBER
 *  - DESKTOP_PATH (artifact file path, e.g., desktop.summary.json)
 *  - MOBILE_PATH (artifact file path, e.g., mobile.summary.json)
 *  - BASELINE_WORKFLOW_NAME (e.g., Nightly Lighthouse)
 *
 * Behavior:
 *  - Downloads the latest successful run of BASELINE_WORKFLOW_NAME
 *    and finds artifacts named baseline-desktop-summary.json and baseline-mobile-summary.json
 *  - Computes deltas (current - baseline), prints a markdown table,
 *    and upserts a PR comment titled "Performance Policy Report"
 */

import fs from 'node:fs/promises';

const repo = process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;
const prNumber = Number(process.env.PR_NUMBER);
const wfName = process.env.BASELINE_WORKFLOW_NAME || 'Nightly Lighthouse';
const desktopPath = process.env.DESKTOP_PATH || 'desktop.summary.json';
const mobilePath = process.env.MOBILE_PATH || 'mobile.summary.json';

if (!repo || !token || !prNumber) {
  console.error('Missing env: GITHUB_REPOSITORY, GITHUB_TOKEN, PR_NUMBER');
  process.exit(1);
}

const [owner, repoName] = repo.split('/');

async function gh(path, opts = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
    ...opts,
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(
      `GitHub API ${path} failed: ${res.status} ${res.statusText} :: ${t}`
    );
  }
  return res.json();
}

async function upsertComment(title, body) {
  // Find existing bot comment
  const comments = await gh(
    `/repos/${owner}/${repoName}/issues/${prNumber}/comments`
  );
  const marker = `<!-- ${title} -->`;
  const existing = comments.find((c) => c.body?.includes(marker));

  const payload = { body: `${marker}\n${body}` };
  if (existing) {
    await gh(`/repos/${owner}/${repoName}/issues/comments/${existing.id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  } else {
    await gh(`/repos/${owner}/${repoName}/issues/${prNumber}/comments`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}

function passBadge(ok, label) {
  return ok
    ? `![pass](https://img.shields.io/badge/${encodeURIComponent(label)}-pass-brightgreen)`
    : `![fail](https://img.shields.io/badge/${encodeURIComponent(label)}-fail-red)`;
}
function checkMobile(m) {
  return (
    m.site.score >= 92 &&
    m.site.lcp <= 2200 &&
    m.site.tbt <= 150 &&
    m.site.cls <= 0.08
  );
}
function checkDesktop(m) {
  return (
    m.site.score >= 90 &&
    m.site.lcp <= 2500 &&
    m.site.tbt <= 200 &&
    m.site.cls <= 0.1
  );
}

function badges(desk, mob) {
  const b1 = passBadge(checkMobile(mob), 'mobile');
  const b2 = passBadge(checkDesktop(desk), 'desktop');
  return `${b1} ${b2}`;
}

function table(rows, baselines) {
  const header = `| Target | Score | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|`;
  const lines = [header];
  rows.forEach(([label, cur], i) => {
    const base = baselines ? (i === 0 ? baselines[0] : baselines[1]) : cur;
    lines.push(renderRow(label, cur, base));
  });
  return lines.join('\n');
}

function renderRow(label, cur, base) {
  const dScore = delta(cur.site.score, base.site.score);
  const dFcp = delta(cur.site.fcp, base.site.fcp);
  const dLcp = delta(cur.site.lcp, base.site.lcp);
  const dTbt = delta(cur.site.tbt, base.site.tbt);
  const dCls = (cur.site.cls - base.site.cls)
    .toFixed(3)
    .replace(/^(-?)0\./, '$1.');
  return `| ${label} | ${cur.site.score}% (${dScore}) | ${cur.site.fcp} ms (${dFcp}) | ${cur.site.lcp} ms (${dLcp}) | ${cur.site.tbt} ms (${dTbt}) | ${cur.site.cls} (${dCls}) |`;
}

function delta(a, b) {
  const d = a - b;
  const s = d > 0 ? '+' : '';
  return `${s}${Math.round(d)}`;
}

async function main() {
  // Read current PR summaries
  const curDesktop = JSON.parse(await fs.readFile(desktopPath, 'utf8'));
  const curMobile = JSON.parse(await fs.readFile(mobilePath, 'utf8'));

  // Pull baseline files from the perf-baseline branch (raw contents API)
  const getFile = async (path) => {
    const res = await gh(
      `/repos/${owner}/${repoName}/contents/${encodeURIComponent(path)}?ref=perf-baseline`
    );
    const buf = Buffer.from(res.content, 'base64').toString('utf8');
    return JSON.parse(buf);
  };

  const baseDesktop = await getFile('baseline-desktop-summary.json').catch(
    () => null
  );
  const baseMobile = await getFile('baseline-mobile-summary.json').catch(
    () => null
  );

  const title = 'Performance Policy Report';
  if (!baseDesktop || !baseMobile) {
    await upsertComment(
      title,
      `**Baseline not available yet.** Merge one Nightly Lighthouse run to initialize baselines.

Current (no deltas):
${table(
  [
    ['Desktop', curDesktop],
    ['Mobile', curMobile],
  ],
  null
)}
`
    );
    return;
  }

  const md = `${badges(curDesktop, curMobile)}

${table(
  [
    ['Desktop', curDesktop],
    ['Mobile', curMobile],
  ],
  [baseDesktop, baseMobile]
)}

_Thresholds: Mobile ≥92% perf, FCP ≤1800 ms, LCP ≤2200 ms, TBT ≤150 ms, CLS ≤0.08. Desktop ≥90% perf, LCP ≤2500 ms, TBT ≤200 ms, CLS ≤0.1._
`;
  await upsertComment(title, md);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
