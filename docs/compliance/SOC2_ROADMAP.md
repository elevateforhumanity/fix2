# SOC 2 Type II Roadmap

This roadmap highlights the work required to achieve SOC 2 Type II attestation across the Trust Service Criteria (Security, Availability, Confidentiality, and Privacy).

## Phase 1 – Gap Assessment

- [ ] Map existing controls to SOC 2 criteria; identify gaps.
- [ ] Document system description and architecture diagram (web, mobile, Supabase, Cloudflare, Netlify).
- [ ] Engage external auditor or readiness consultant.

## Phase 2 – Control Implementation

### Security

- [ ] Enforce MFA on all production accounts (GitHub, Supabase, Stripe, Cloudflare, Netlify).
- [ ] Centralise logging for auth, configuration changes, and privileged actions.
- [ ] Deploy automated vulnerability scanning on dependencies/container images.

### Availability

- [ ] Finalise DR plan (see `docs/ops/DR_PLAN.md`) with quarterly failover tests.
- [ ] Implement uptime/SLA monitoring and paging (Cloudflare synthetic, GitHub Actions checks).

### Confidentiality & Privacy

- [ ] Apply row-level security in Supabase for tenant isolation.
- [ ] Encrypt sensitive PII at rest and in transit.
- [ ] Automate removal of unused exports and expire presigned URLs.

## Phase 3 – Evidence Collection & Monitoring Period

- [ ] Establish ticketing workflows for change management and incident response.
- [ ] Capture access reviews, training records, and policy acknowledgements.
- [ ] Keep monitoring artefacts (logs, metrics) for the entire observation window (minimum 3 months).

## Phase 4 – Audit & Continuous Compliance

- [ ] Schedule readiness check, then Type II observation window.
- [ ] Respond to auditor requests via a secure portal.
- [ ] Track and remediate any findings.

**Supporting documents**: ISO readiness checklist, Incident Runbook, On-Call Guide, DR Plan, HA Guide, FERPA/GDPR overview.
