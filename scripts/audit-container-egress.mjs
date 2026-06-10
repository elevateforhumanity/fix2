#!/usr/bin/env node
import { auditContainerEgress } from '../lib/network/egress-audit.ts';

const strict =
  process.argv.includes('--strict') || process.env.EGRESS_AUDIT_STRICT === '1';
const audit = await auditContainerEgress(
  Number(process.env.EGRESS_AUDIT_TIMEOUT_MS || 8000)
);

console.log(JSON.stringify(audit, null, 2));

if (!audit.ok) {
  const mode = strict ? 'strict' : 'diagnostic';
  console.warn(
    `[egress-audit] ${mode} mode: direct egress is blocked. ${audit.recommendation}`
  );
}

if (strict && !audit.ok) {
  process.exitCode = 2;
}
