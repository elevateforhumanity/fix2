# Data Governance Checklist

Use this checklist to ensure privacy obligations (FERPA, GDPR, CCPA) are satisfied.

## Data Inventory

- [ ] Maintain a source-of-truth catalogue describing PII fields stored in Supabase, Stripe, and analytics tools.
- [ ] Tag data elements with retention periods and legal basis (consent, contract, legitimate interest).

## Access Control & Auditing

- [ ] Enforce least privilege through Supabase policies and application RBAC.
- [ ] Log administrative actions via the audit hook (`src/audit/audit.ts`).
- [ ] Review access lists quarterly; archive approvals.

## Data Subject Rights

- [ ] Implement workflows for access/export, rectification, and deletion requests.
- [ ] Track requests in a ticketing system with SLA < 30 days.

## Retention & Disposal

- [ ] Automate purge jobs for inactive accounts after retention period.
- [ ] Securely wipe data from backups when retention expires.

## Incident Response

- [ ] Map notification timelines (FERPA, GDPR, state breach laws).
- [ ] Reference Incident Runbook for communication templates.

## Third-Party Processors

- [ ] Maintain DPAs for Supabase, Cloudflare, Netlify, Stripe.
- [ ] Conduct yearly security questionnaire or review assurance reports.

## Training & Awareness

- [ ] Provide annual privacy/security training to staff handling PII.
- [ ] Document acknowledgement of acceptable use and privacy policies.

## Monitoring & Review

- [ ] Review this checklist quarterly and update evidence repositories.
- [ ] Capture proof (screenshots, exports, signed docs) for audits.
