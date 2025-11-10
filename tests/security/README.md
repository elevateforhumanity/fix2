# Security Testing Suite

Comprehensive security testing for the EFH LMS platform.

## Test Coverage

### 1. OWASP Top 10 (2021)
- ✅ A01:2021 – Broken Access Control
- ✅ A02:2021 – Cryptographic Failures
- ✅ A03:2021 – Injection (XSS, SQL)
- ✅ A04:2021 – Insecure Design
- ✅ A05:2021 – Security Misconfiguration
- ✅ A06:2021 – Vulnerable Components
- ✅ A07:2021 – Authentication Failures
- ✅ A08:2021 – Software and Data Integrity
- ✅ A09:2021 – Security Logging Failures
- ✅ A10:2021 – Server-Side Request Forgery

### 2. Security Headers
- Content-Security-Policy (CSP)
- X-Content-Type-Options
- X-Frame-Options
- Strict-Transport-Security (HSTS)
- Referrer-Policy
- Permissions-Policy

### 3. Authentication & Authorization
- Password strength validation
- Multi-factor authentication
- Session management
- Role-based access control (RBAC)
- OAuth integration

### 4. Data Protection
- Input validation
- Output encoding
- SQL injection prevention
- XSS prevention
- CSRF protection

## Running Security Tests

### Unit Tests
```bash
npm run test tests/security/security-headers.test.ts
```

### E2E Security Tests
```bash
npx playwright test tests/e2e/security.spec.ts
```

### OWASP ZAP Scan

**Prerequisites:**
```bash
# Install OWASP ZAP
# Download from: https://www.zaproxy.org/download/

# Or use Docker
docker pull owasp/zap2docker-stable
```

**Run Baseline Scan:**
```bash
docker run -v $(pwd):/zap/wrk/:rw -t owasp/zap2docker-stable \
  zap-baseline.py -t http://localhost:5173 -r zap-report.html
```

**Run Full Scan:**
```bash
docker run -v $(pwd):/zap/wrk/:rw -t owasp/zap2docker-stable \
  zap-full-scan.py -t http://localhost:5173 -r zap-full-report.html
```

**Run with Configuration:**
```bash
docker run -v $(pwd):/zap/wrk/:rw -t owasp/zap2docker-stable \
  zap-full-scan.py -t http://localhost:5173 \
  -c tests/security/owasp-zap-config.yaml \
  -r test-results/zap-report.html
```

### Nikto Web Scanner

**Install:**
```bash
# Ubuntu/Debian
sudo apt-get install nikto

# macOS
brew install nikto
```

**Run:**
```bash
nikto -h http://localhost:5173 -o nikto-report.html -Format html
```

### SSL/TLS Testing

**Using testssl.sh:**
```bash
# Clone repository
git clone --depth 1 https://github.com/drwetter/testssl.sh.git

# Run scan
./testssl.sh/testssl.sh https://elevateforhumanity.org
```

**Using SSL Labs:**
Visit: https://www.ssllabs.com/ssltest/analyze.html?d=elevateforhumanity.org

## Security Checklist

### Pre-Deployment
- [ ] All XSS vulnerabilities fixed
- [ ] SQL injection prevention verified
- [ ] CSRF tokens implemented
- [ ] Security headers configured
- [ ] HTTPS enforced
- [ ] Sensitive data encrypted
- [ ] API authentication required
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] Error messages sanitized

### Authentication
- [ ] Password complexity enforced
- [ ] Account lockout after failed attempts
- [ ] Session timeout configured
- [ ] Secure password reset flow
- [ ] MFA available
- [ ] OAuth properly configured

### Authorization
- [ ] RBAC implemented
- [ ] Least privilege principle
- [ ] Protected routes verified
- [ ] API endpoint authorization
- [ ] File access controls

### Data Protection
- [ ] Sensitive data encrypted at rest
- [ ] TLS 1.3 for data in transit
- [ ] PII handling compliant
- [ ] Secure backup procedures
- [ ] Data retention policies

### Infrastructure
- [ ] Firewall configured
- [ ] DDoS protection enabled
- [ ] Regular security updates
- [ ] Monitoring and alerting
- [ ] Incident response plan

## Vulnerability Severity Levels

### Critical (P0)
- Remote code execution
- SQL injection
- Authentication bypass
- Exposed secrets/credentials

**Action:** Fix immediately, deploy hotfix

### High (P1)
- XSS vulnerabilities
- CSRF vulnerabilities
- Privilege escalation
- Sensitive data exposure

**Action:** Fix within 24 hours

### Medium (P2)
- Missing security headers
- Weak password policy
- Information disclosure
- Insecure dependencies

**Action:** Fix within 1 week

### Low (P3)
- Missing best practices
- Minor configuration issues
- Informational findings

**Action:** Fix in next release

## Security Tools

### Static Analysis
- **ESLint Security Plugin**: `eslint-plugin-security`
- **Semgrep**: Pattern-based code scanning
- **SonarQube**: Code quality and security

### Dynamic Analysis
- **OWASP ZAP**: Web application scanner
- **Burp Suite**: Security testing platform
- **Nikto**: Web server scanner

### Dependency Scanning
- **npm audit**: Built-in npm security audit
- **Snyk**: Dependency vulnerability scanner
- **Dependabot**: Automated dependency updates

### Penetration Testing
- **Metasploit**: Penetration testing framework
- **Nmap**: Network scanner
- **Wireshark**: Network protocol analyzer

## Compliance

### Standards
- OWASP Top 10
- CWE Top 25
- NIST Cybersecurity Framework
- ISO 27001

### Regulations
- GDPR (EU)
- CCPA (California)
- COPPA (Children's privacy)
- FERPA (Education records)

## Reporting Security Issues

**DO NOT** create public GitHub issues for security vulnerabilities.

**Instead:**
1. Email: security@elevateforhumanity.org
2. Include detailed description
3. Provide steps to reproduce
4. Suggest fix if possible

**Response Time:**
- Critical: 24 hours
- High: 48 hours
- Medium: 1 week
- Low: 2 weeks

## Security Resources

### Documentation
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Supabase Security](https://supabase.com/docs/guides/platform/security)

### Training
- [OWASP WebGoat](https://owasp.org/www-project-webgoat/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [HackerOne CTF](https://www.hackerone.com/for-hackers/hacker-101)

### Communities
- [OWASP Slack](https://owasp.org/slack/invite)
- [r/netsec](https://reddit.com/r/netsec)
- [Security StackExchange](https://security.stackexchange.com/)

## Continuous Security

### CI/CD Integration
```yaml
# .github/workflows/security.yml
name: Security Scan

on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run npm audit
        run: npm audit --audit-level=moderate
      
      - name: Run Snyk
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      
      - name: Run OWASP ZAP
        uses: zaproxy/action-baseline@v0.7.0
        with:
          target: 'http://localhost:5173'
```

### Regular Audits
- Weekly: Dependency scanning
- Monthly: Security header checks
- Quarterly: Full penetration test
- Annually: Third-party security audit

## Incident Response

### Detection
1. Monitor security logs
2. Set up alerts for suspicious activity
3. Review error reports

### Response
1. Assess severity
2. Contain the threat
3. Investigate root cause
4. Apply fix
5. Verify resolution

### Recovery
1. Restore from backup if needed
2. Update security measures
3. Document incident
4. Communicate with stakeholders

### Post-Incident
1. Conduct retrospective
2. Update security policies
3. Improve monitoring
4. Train team on lessons learned
