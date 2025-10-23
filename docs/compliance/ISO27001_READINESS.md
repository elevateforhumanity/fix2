# ISO 27001 Readiness Checklist

This document outlines the controls we must demonstrate to satisfy an ISO 27001 audit. Track ownership in a separate issue tracker.

## Context & Scope

- **Scope**: Elevate for Humanity SaaS platform (web + mobile), supporting services (Supabase, Cloudflare, Netlify) and corporate network.
- **Assets**: Production data (student PII, content, payments), source code repositories, build systems, monitoring data.

## Leadership & Governance

- [ ] Appoint an Information Security Manager.
- [ ] Maintain an Information Security Policy (reviewed annually).
- [ ] Establish Statement of Applicability covering Annex A controls.
- [ ] Retain change-management and risk registers.

## Risk Management

- [ ] Run formal risk assessments twice per year.
- [ ] Define risk acceptance criteria and escalation path.
- [ ] Link mitigations to technical controls (e.g. RLS policies, monitoring).

## Asset & Access Control

- [ ] Inventory cloud resources (Supabase, Cloudflare Workers, Netlify) and owners.
- [ ] Enforce least privilege through role-based access (Okta or GitHub SSO).
- [ ] Review access quarterly; log approvals in the access review matrix.
- [ ] Enable MFA on all privileged accounts.

## Operational Security

- [ ] Document secure deployment pipeline and rollback playbooks.
- [ ] Ensure production secrets are stored in a managed secret vault (Supabase Vault / Cloudflare Secrets).
- [ ] Require code reviews for all changes merged to `main`.
- [ ] Maintain backup schedule (daily DB snapshots, object storage versioning) and restoration tests.

## Incident Management

- [ ] Reference the Incident Runbook (`docs/runbooks/INCIDENT_RUNBOOK.md`).
- [ ] Provide 24/7 on-call coverage with documented escalation.
- [ ] Record incidents and corrective actions in a ticketing system.
- [ ] Conduct post-incident reviews within five business days.

## Business Continuity & DR

- [ ] Align with `docs/ops/DR_PLAN.md` and `docs/ops/HA_GUIDE.md`.
- [ ] Document failover testing cadence and last execution date.

## Supplier Management

- [ ] Maintain list of subprocessors with DPAs (Supabase, Stripe, Cloudflare, Netlify).
- [ ] Assess suppliers yearly for compliance (ISO/SOC reports).

## Documentation & Training

- [ ] Publish security awareness training for all staff (new hires within 30 days).
- [ ] Track acknowledgement of policies and procedures.

Maintain evidence artifacts (screenshots, exports, signed policies) in the compliance drive for audit preparation.
