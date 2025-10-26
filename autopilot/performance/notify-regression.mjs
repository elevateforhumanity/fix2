#!/usr/bin/env node
/**
 * Sends performance regression notifications to Slack/Teams webhooks
 *
 * Inputs via env:
 *  - DESKTOP_PATH (e.g., desktop.summary.json)
 *  - MOBILE_PATH (e.g., mobile.summary.json)
 *  - SLACK_WEBHOOK_URL (optional)
 *  - TEAMS_WEBHOOK_URL (optional)
 *  - GITHUB_REPOSITORY
 *  - GITHUB_RUN_ID
 *  - GITHUB_SERVER_URL (default: https://github.com)
 *  - PR_NUMBER (optional, for PR context)
 *  - BASELINE_DESKTOP_PATH (optional, for delta calculation)
 *  - BASELINE_MOBILE_PATH (optional, for delta calculation)
 *
 * Behavior:
 *  - Checks if mobile/desktop pass thresholds
 *  - If regression detected, sends webhook notification
 *  - Supports both Slack and Teams formats
 */

import fs from 'node:fs/promises';

const desktopPath = process.env.DESKTOP_PATH || 'desktop.summary.json';
const mobilePath = process.env.MOBILE_PATH || 'mobile.summary.json';
const slackWebhook = process.env.SLACK_WEBHOOK_URL;
const teamsWebhook = process.env.TEAMS_WEBHOOK_URL;
const repo = process.env.GITHUB_REPOSITORY;
const runId = process.env.GITHUB_RUN_ID;
const serverUrl = process.env.GITHUB_SERVER_URL || 'https://github.com';
const prNumber = process.env.PR_NUMBER;
const baseDesktopPath = process.env.BASELINE_DESKTOP_PATH;
const baseMobilePath = process.env.BASELINE_MOBILE_PATH;

if (!slackWebhook && !teamsWebhook) {
  console.log('No webhook URLs configured. Skipping notification.');
  process.exit(0);
}

// Thresholds
function checkMobile(m) {
  return (
    m.site.score >= 92 &&
    m.site.fcp <= 1800 &&
    m.site.lcp <= 2200 &&
    m.site.tbt <= 150 &&
    m.site.cls <= 0.08
  );
}

function checkDesktop(m) {
  return (
    m.site.score >= 90 &&
    m.site.fcp <= 2000 &&
    m.site.lcp <= 2500 &&
    m.site.tbt <= 200 &&
    m.site.cls <= 0.1
  );
}

function formatMetric(value, unit = '') {
  return `${value}${unit}`;
}

function delta(current, baseline) {
  if (!baseline) return '';
  const d = current - baseline;
  const sign = d > 0 ? '+' : '';
  return ` (${sign}${Math.round(d)})`;
}

async function loadJson(path) {
  try {
    return JSON.parse(await fs.readFile(path, 'utf8'));
  } catch {
    return null;
  }
}

async function sendSlack(payload) {
  const res = await fetch(slackWebhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.error(`Slack webhook failed: ${res.status} ${res.statusText}`);
  } else {
    console.log('✅ Slack notification sent');
  }
}

async function sendTeams(payload) {
  const res = await fetch(teamsWebhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.error(`Teams webhook failed: ${res.status} ${res.statusText}`);
  } else {
    console.log('✅ Teams notification sent');
  }
}

async function main() {
  const desktop = await loadJson(desktopPath);
  const mobile = await loadJson(mobilePath);
  const baseDesktop = baseDesktopPath ? await loadJson(baseDesktopPath) : null;
  const baseMobile = baseMobilePath ? await loadJson(baseMobilePath) : null;

  if (!desktop || !mobile) {
    console.error('Missing performance summaries');
    process.exit(1);
  }

  const mobilePass = checkMobile(mobile);
  const desktopPass = checkDesktop(desktop);

  // Only notify on regression
  if (mobilePass && desktopPass) {
    console.log('✅ All performance checks passed. No notification needed.');
    process.exit(0);
  }

  // Build context
  const runUrl = `${serverUrl}/${repo}/actions/runs/${runId}`;
  const prUrl = prNumber ? `${serverUrl}/${repo}/pull/${prNumber}` : null;
  const context = prNumber ? `PR #${prNumber}` : 'Nightly Run';

  // Identify failures
  const failures = [];
  if (!mobilePass) {
    const issues = [];
    if (mobile.site.score < 92)
      issues.push(`Score: ${mobile.site.score}% (threshold: ≥92%)`);
    if (mobile.site.fcp > 1800)
      issues.push(`FCP: ${mobile.site.fcp}ms (threshold: ≤1800ms)`);
    if (mobile.site.lcp > 2200)
      issues.push(`LCP: ${mobile.site.lcp}ms (threshold: ≤2200ms)`);
    if (mobile.site.tbt > 150)
      issues.push(`TBT: ${mobile.site.tbt}ms (threshold: ≤150ms)`);
    if (mobile.site.cls > 0.08)
      issues.push(`CLS: ${mobile.site.cls} (threshold: ≤0.08)`);
    failures.push({ preset: 'Mobile', issues });
  }
  if (!desktopPass) {
    const issues = [];
    if (desktop.site.score < 90)
      issues.push(`Score: ${desktop.site.score}% (threshold: ≥90%)`);
    if (desktop.site.fcp > 2000)
      issues.push(`FCP: ${desktop.site.fcp}ms (threshold: ≤2000ms)`);
    if (desktop.site.lcp > 2500)
      issues.push(`LCP: ${desktop.site.lcp}ms (threshold: ≤2500ms)`);
    if (desktop.site.tbt > 200)
      issues.push(`TBT: ${desktop.site.tbt}ms (threshold: ≤200ms)`);
    if (desktop.site.cls > 0.1)
      issues.push(`CLS: ${desktop.site.cls} (threshold: ≤0.1)`);
    failures.push({ preset: 'Desktop', issues });
  }

  // Slack payload
  if (slackWebhook) {
    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '⚠️ Performance Regression Detected',
          emoji: true,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Repository:* ${repo}\n*Context:* ${context}`,
        },
      },
    ];

    failures.forEach(({ preset, issues }) => {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${preset} Failures:*\n${issues.map((i) => `• ${i}`).join('\n')}`,
        },
      });
    });

    // Add deltas if baselines available
    if (baseDesktop && baseMobile) {
      const deltaText = [
        '*Deltas vs Baseline:*',
        `Desktop: Score ${desktop.site.score}%${delta(desktop.site.score, baseDesktop.site.score)}, LCP ${desktop.site.lcp}ms${delta(desktop.site.lcp, baseDesktop.site.lcp)}`,
        `Mobile: Score ${mobile.site.score}%${delta(mobile.site.score, baseMobile.site.score)}, LCP ${mobile.site.lcp}ms${delta(mobile.site.lcp, baseMobile.site.lcp)}`,
      ].join('\n');

      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: deltaText,
        },
      });
    }

    blocks.push({
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'View Run',
            emoji: true,
          },
          url: runUrl,
        },
      ],
    });

    if (prUrl) {
      blocks[blocks.length - 1].elements.push({
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'View PR',
          emoji: true,
        },
        url: prUrl,
      });
    }

    await sendSlack({ blocks });
  }

  // Teams payload
  if (teamsWebhook) {
    const facts = [];
    failures.forEach(({ preset, issues }) => {
      facts.push({
        name: `${preset} Failures`,
        value: issues.join(', '),
      });
    });

    if (baseDesktop && baseMobile) {
      facts.push({
        name: 'Desktop Delta',
        value: `Score ${desktop.site.score}%${delta(desktop.site.score, baseDesktop.site.score)}, LCP ${desktop.site.lcp}ms${delta(desktop.site.lcp, baseDesktop.site.lcp)}`,
      });
      facts.push({
        name: 'Mobile Delta',
        value: `Score ${mobile.site.score}%${delta(mobile.site.score, baseMobile.site.score)}, LCP ${mobile.site.lcp}ms${delta(mobile.site.lcp, baseMobile.site.lcp)}`,
      });
    }

    const potentialAction = [
      {
        '@type': 'OpenUri',
        name: 'View Run',
        targets: [{ os: 'default', uri: runUrl }],
      },
    ];

    if (prUrl) {
      potentialAction.push({
        '@type': 'OpenUri',
        name: 'View PR',
        targets: [{ os: 'default', uri: prUrl }],
      });
    }

    const payload = {
      '@type': 'MessageCard',
      '@context': 'https://schema.org/extensions',
      summary: 'Performance Regression Detected',
      themeColor: 'FF0000',
      title: '⚠️ Performance Regression Detected',
      sections: [
        {
          activityTitle: repo,
          activitySubtitle: context,
          facts,
        },
      ],
      potentialAction,
    };

    await sendTeams(payload);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
