#!/usr/bin/env node
import assert from 'node:assert/strict';

const REPO_SLUG = process.env.REPO_SLUG || 'elevateforhumanity/fix2';
const BRANCH = process.env.BRANCH || 'main';
const REQUIRED = (process.env.REQUIRED_CHECKS || 'lhci (desktop),lhci (mobile)')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const token = process.env.GITHUB_TOKEN || process.env.REPO_ADMIN_TOKEN;
if (!token) {
  console.error('❌ Missing GITHUB_TOKEN/REPO_ADMIN_TOKEN');
  process.exit(2);
}

const res = await fetch(
  `https://api.github.com/repos/${REPO_SLUG}/branches/${BRANCH}/protection`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  }
);
if (res.status === 404) {
  console.error(`❌ No protection rule found for ${REPO_SLUG}@${BRANCH}`);
  process.exit(1);
}
if (!res.ok) {
  console.error(
    `❌ Failed to read protection: ${res.status} ${res.statusText}`
  );
  process.exit(1);
}

const json = await res.json();
const contexts = json?.required_status_checks?.contexts || [];
const strict = !!json?.required_status_checks?.strict;
const convo = !!json?.required_conversation_resolution;
const admins = !!json?.enforce_admins?.enabled;

// Validate contexts include both desktop+mobile
const missing = REQUIRED.filter((r) => !contexts.includes(r));

const problems = [];
if (!strict) problems.push('required_status_checks.strict=false');
if (missing.length) problems.push(`missing contexts: ${missing.join(', ')}`);
if (!convo) problems.push('required_conversation_resolution=false');
if (!admins) problems.push('enforce_admins=false');

if (problems.length) {
  console.error(
    '❌ Branch protection drift detected:\n - ' + problems.join('\n - ')
  );
  process.exit(1);
}

console.log('✅ Branch protection OK:', { contexts, strict, convo, admins });
