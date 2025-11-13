/**
 * Security Audit Utility
 * Automated security vulnerability scanning
 */

interface SecurityIssue {
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  category: string;
  description: string;
  recommendation: string;
  cwe?: string; // Common Weakness Enumeration
}

interface SecurityAuditResult {
  passed: boolean;
  score: number;
  issues: SecurityIssue[];
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
}

export class SecurityAuditor {
  private issues: SecurityIssue[] = [];

  /**
   * Run complete security audit
   */
  audit(): SecurityAuditResult {
    this.issues = [];

    // Run all security checks
    this.checkHTTPS();
    this.checkSecurityHeaders();
    this.checkCSP();
    this.checkCookies();
    this.checkLocalStorage();
    this.checkXSS();
    this.checkMixedContent();
    this.checkDependencies();
    this.checkAuthentication();
    this.checkInputValidation();

    // Calculate score
    const critical = this.issues.filter(i => i.severity === 'critical').length;
    const high = this.issues.filter(i => i.severity === 'high').length;
    const medium = this.issues.filter(i => i.severity === 'medium').length;
    const low = this.issues.filter(i => i.severity === 'low').length;

    const score = Math.max(0, 100 - (critical * 25) - (high * 10) - (medium * 5) - (low * 2));

    return {
      passed: critical === 0 && high === 0,
      score,
      issues: this.issues,
      summary: {
        critical,
        high,
        medium,
        low,
        info: this.issues.filter(i => i.severity === 'info').length,
      },
    };
  }

  /**
   * Check if site is using HTTPS
   */
  private checkHTTPS(): void {
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      this.issues.push({
        severity: 'critical',
        category: 'Transport Security',
        description: 'Site is not using HTTPS',
        recommendation: 'Enable HTTPS to encrypt data in transit',
        cwe: 'CWE-319',
      });
    }
  }

  /**
   * Check security headers
   */
  private checkSecurityHeaders(): void {
    // Note: Can't check response headers from client-side
    // This would need to be done server-side
    this.issues.push({
      severity: 'info',
      category: 'Security Headers',
      description: 'Security headers should be verified server-side',
      recommendation: 'Ensure X-Frame-Options, X-Content-Type-Options, CSP, HSTS are set',
    });
  }

  /**
   * Check Content Security Policy
   */
  private checkCSP(): void {
    const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    
    if (!metaCSP) {
      this.issues.push({
        severity: 'high',
        category: 'Content Security Policy',
        description: 'No Content Security Policy detected',
        recommendation: 'Implement CSP to prevent XSS attacks',
        cwe: 'CWE-79',
      });
    }
  }

  /**
   * Check cookie security
   */
  private checkCookies(): void {
    const cookies = document.cookie.split(';');
    
    cookies.forEach(cookie => {
      const [name] = cookie.trim().split('=');
      
      // Check for sensitive data in cookie names
      const sensitivePatterns = ['password', 'secret', 'token', 'key'];
      if (sensitivePatterns.some(pattern => name.toLowerCase().includes(pattern))) {
        this.issues.push({
          severity: 'high',
          category: 'Cookie Security',
          description: `Cookie "${name}" may contain sensitive data`,
          recommendation: 'Use HttpOnly and Secure flags for sensitive cookies',
          cwe: 'CWE-614',
        });
      }
    });
  }

  /**
   * Check localStorage for sensitive data
   */
  private checkLocalStorage(): void {
    try {
      const sensitivePatterns = ['password', 'secret', 'token', 'key', 'credit', 'ssn'];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        
        const value = localStorage.getItem(key);
        if (!value) continue;
        
        // Check key names
        if (sensitivePatterns.some(pattern => key.toLowerCase().includes(pattern))) {
          this.issues.push({
            severity: 'high',
            category: 'Data Storage',
            description: `localStorage key "${key}" may contain sensitive data`,
            recommendation: 'Encrypt sensitive data or use secure storage',
            cwe: 'CWE-312',
          });
        }
        
        // Check for unencrypted tokens
        if (value.length > 20 && !value.includes('{')) {
          this.issues.push({
            severity: 'medium',
            category: 'Data Storage',
            description: `localStorage item "${key}" may contain unencrypted token`,
            recommendation: 'Encrypt tokens before storing',
            cwe: 'CWE-312',
          });
        }
      }
    } catch (error) {
      // localStorage not available
    }
  }

  /**
   * Check for XSS vulnerabilities
   */
  private checkXSS(): void {
    // Check for dangerous innerHTML usage
    const scripts = document.querySelectorAll('script');
    scripts.forEach((script) => {
      if (script.innerHTML.includes('innerHTML') || script.innerHTML.includes('outerHTML')) {
        this.issues.push({
          severity: 'high',
          category: 'XSS Prevention',
          description: 'Potential XSS vulnerability detected (innerHTML usage)',
          recommendation: 'Use textContent or sanitize HTML with DOMPurify',
          cwe: 'CWE-79',
        });
      }
    });

    // Check for eval usage
    scripts.forEach((script) => {
      if (script.innerHTML.includes('eval(')) {
        this.issues.push({
          severity: 'critical',
          category: 'Code Injection',
          description: 'eval() usage detected - critical security risk',
          recommendation: 'Never use eval() - find alternative solution',
          cwe: 'CWE-95',
        });
      }
    });
  }

  /**
   * Check for mixed content
   */
  private checkMixedContent(): void {
    if (window.location.protocol === 'https:') {
      // Check images
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        if (img.src.startsWith('http://')) {
          this.issues.push({
            severity: 'medium',
            category: 'Mixed Content',
            description: 'HTTP image loaded on HTTPS page',
            recommendation: 'Use HTTPS for all resources',
            cwe: 'CWE-311',
          });
        }
      });

      // Check scripts
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach((script) => {
        const src = script.getAttribute('src');
        if (src && src.startsWith('http://')) {
          this.issues.push({
            severity: 'high',
            category: 'Mixed Content',
            description: 'HTTP script loaded on HTTPS page',
            recommendation: 'Use HTTPS for all scripts',
            cwe: 'CWE-311',
          });
        }
      });
    }
  }

  /**
   * Check dependencies (placeholder - would need build-time check)
   */
  private checkDependencies(): void {
    this.issues.push({
      severity: 'info',
      category: 'Dependencies',
      description: 'Dependency vulnerabilities should be checked with npm audit',
      recommendation: 'Run "npm audit" regularly and update vulnerable packages',
    });
  }

  /**
   * Check authentication implementation
   */
  private checkAuthentication(): void {
    // Check if password fields have autocomplete disabled
    const passwordFields = document.querySelectorAll('input[type="password"]');
    passwordFields.forEach((field) => {
      const autocomplete = field.getAttribute('autocomplete');
      if (autocomplete === 'off') {
        this.issues.push({
          severity: 'low',
          category: 'Authentication',
          description: 'Password field has autocomplete disabled',
          recommendation: 'Allow password managers by using autocomplete="current-password"',
        });
      }
    });
  }

  /**
   * Check input validation
   */
  private checkInputValidation(): void {
    const inputs = document.querySelectorAll('input, textarea');
    let unvalidatedInputs = 0;

    inputs.forEach((input) => {
      const hasValidation = 
        input.hasAttribute('required') ||
        input.hasAttribute('pattern') ||
        input.hasAttribute('minlength') ||
        input.hasAttribute('maxlength') ||
        input.hasAttribute('min') ||
        input.hasAttribute('max');

      if (!hasValidation) {
        unvalidatedInputs++;
      }
    });

    if (unvalidatedInputs > 0) {
      this.issues.push({
        severity: 'medium',
        category: 'Input Validation',
        description: `${unvalidatedInputs} input fields lack validation attributes`,
        recommendation: 'Add validation attributes (required, pattern, min/max length)',
        cwe: 'CWE-20',
      });
    }
  }
}

/**
 * Run security audit and log results
 */
export function runSecurityAudit(): SecurityAuditResult {
  const auditor = new SecurityAuditor();
  const result = auditor.audit();

  console.group('🔒 Security Audit Results');
  console.log(`Score: ${result.score}/100`);
  console.log(`Status: ${result.passed ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Critical: ${result.summary.critical}`);
  console.log(`High: ${result.summary.high}`);
  console.log(`Medium: ${result.summary.medium}`);
  console.log(`Low: ${result.summary.low}`);
  console.log(`Info: ${result.summary.info}`);

  if (result.issues.length > 0) {
    console.group('Issues:');
    result.issues.forEach((issue) => {
      const icon = 
        issue.severity === 'critical' ? '🔴' :
        issue.severity === 'high' ? '🟠' :
        issue.severity === 'medium' ? '🟡' :
        issue.severity === 'low' ? '🔵' : 'ℹ️';
      
      console.log(`${icon} [${issue.severity.toUpperCase()}] ${issue.category}`);
      console.log(`   ${issue.description}`);
      console.log(`   💡 ${issue.recommendation}`);
      if (issue.cwe) {
        console.log(`   CWE: ${issue.cwe}`);
      }
    });
    console.groupEnd();
  }

  console.groupEnd();

  return result;
}
