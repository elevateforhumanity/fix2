# Incident Response Runbook

## 1. Purpose

This runbook describes how to respond to production incidents for the Elevate for Humanity platform (LMS, portals, APIs).

## 2. Severity Levels

- **SEV1 – Critical**
  - Platform unavailable for all users or data loss suspected.
- **SEV2 – High**
  - Major feature down for multiple tenants (e.g. LMS login, enrollment).
- **SEV3 – Medium**
  - Degraded performance, partial feature outage.
- **SEV4 – Low**
  - Cosmetic bugs, non-blocking issues.

## 3. First Responder Checklist

1. Acknowledge alert (Slack #alerts / PagerDuty).
2. Check:
   - Vercel status
   - Supabase status
   - Cloudflare / DNS status
3. Capture screenshots and timestamps.
4. Notify stakeholders in:
   - Slack #ops
   - Email: ops@elevateforhumanity.org

## 4. Standard Steps for SEV1/SEV2

1. Freeze deployments.
2. Verify logs in:
   - Sentry
   - Supabase logs
3. Roll back to last known good version if needed.
4. Post updates every 30 minutes in #status channel.

## 5. Post-Incident Review

Within 48 hours:

1. Document **root cause**.
2. Document **customer impact**.
3. Create follow-up issues in GitHub with:
   - Summary
   - Steps to prevent recurrence.
