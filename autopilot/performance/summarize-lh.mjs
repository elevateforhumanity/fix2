#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

/**
 * Looks in .lighthouseci for *-report.json files, picks the median run by LCP,
 * and prints a tiny JSON summary to stdout: { preset, url, score, fcp, lcp, tbt, cls }
 * Usage: node summarize-lh.mjs mobile > summary.mobile.json
 */

const PRESET = process.argv[2] || process.env.LH_PRESET || 'desktop';
const dir = '.lighthouseci';

const files = fs.readdirSync(dir).filter((f) => f.endsWith('-report.json'));
if (!files.length) {
  console.error('No Lighthouse JSON reports found in .lighthouseci');
  process.exit(1);
}

// Load all reports, group by URL
const reports = files
  .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))
  .filter((r) => r?.lhr || r?.audits || r?.categories) // tolerate formats
  .map((r) => r.lhr ?? r);

const byUrl = new Map();
for (const r of reports) {
  const url = r.finalUrl || r.requestedUrl;
  if (!byUrl.has(url)) byUrl.set(url, []);
  byUrl.get(url).push(r);
}

function toSummary(r) {
  const audits = r.audits;
  const cats = r.categories;
  const score = Math.round((cats.performance.score || 0) * 100);
  const fcp = Math.round(audits['first-contentful-paint'].numericValue);
  const lcp = Math.round(audits['largest-contentful-paint'].numericValue);
  const tbt = Math.round(audits['total-blocking-time'].numericValue);
  const cls = Number(audits['cumulative-layout-shift'].numericValue.toFixed(3));
  return { url: r.finalUrl || r.requestedUrl, score, fcp, lcp, tbt, cls };
}

function medianBy(arr, key) {
  const s = [...arr].sort((a, b) => a[key] - b[key]);
  return s[Math.floor(s.length / 2)];
}

const out = [];
for (const [url, runs] of byUrl) {
  const summaries = runs.map(toSummary);
  const pick = medianBy(summaries, 'lcp');
  out.push(pick);
}

const agg = {
  preset: PRESET,
  pages: out,
  // Simple "site" rollup by median across pages
  site: {
    score: Math.round(
      out.map((p) => p.score).sort((a, b) => a - b)[Math.floor(out.length / 2)]
    ),
    fcp: Math.round(
      out.map((p) => p.fcp).sort((a, b) => a - b)[Math.floor(out.length / 2)]
    ),
    lcp: Math.round(
      out.map((p) => p.lcp).sort((a, b) => a - b)[Math.floor(out.length / 2)]
    ),
    tbt: Math.round(
      out.map((p) => p.tbt).sort((a, b) => a - b)[Math.floor(out.length / 2)]
    ),
    cls: Number(
      out
        .map((p) => p.cls)
        .sort((a, b) => a - b)
        [Math.floor(out.length / 2)].toFixed(3)
    ),
  },
};

process.stdout.write(JSON.stringify(agg, null, 2));
