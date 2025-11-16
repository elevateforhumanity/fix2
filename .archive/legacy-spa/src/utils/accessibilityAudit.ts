/**
 * Accessibility Audit Utility
 * Automated WCAG 2.1 AA compliance checking
 */

interface AuditResult {
  passed: boolean;
  issues: AuditIssue[];
  score: number;
  summary: {
    total: number;
    passed: number;
    failed: number;
    warnings: number;
  };
}

interface AuditIssue {
  severity: 'error' | 'warning' | 'info';
  rule: string;
  description: string;
  element?: string;
  wcagLevel: 'A' | 'AA' | 'AAA';
  wcagCriteria: string;
}

export class AccessibilityAuditor {
  private issues: AuditIssue[] = [];

  /**
   * Run complete accessibility audit
   */
  audit(): AuditResult {
    this.issues = [];

    // Run all checks
    this.checkImages();
    this.checkHeadings();
    this.checkLinks();
    this.checkForms();
    this.checkButtons();
    this.checkColorContrast();
    this.checkKeyboardNavigation();
    this.checkARIA();
    this.checkLandmarks();
    this.checkLanguage();
    this.checkPageTitle();
    this.checkSkipLinks();

    // Calculate score
    const errors = this.issues.filter((i) => i.severity === 'error').length;
    const warnings = this.issues.filter((i) => i.severity === 'warning').length;
    const total = this.issues.length;
    const passed = 100 - (errors * 10 + warnings * 2);
    const score = Math.max(0, Math.min(100, passed));

    return {
      passed: errors === 0,
      issues: this.issues,
      score,
      summary: {
        total,
        passed: total - errors - warnings,
        failed: errors,
        warnings,
      },
    };
  }

  /**
   * Check all images have alt text
   */
  private checkImages(): void {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.hasAttribute('alt')) {
        this.issues.push({
          severity: 'error',
          rule: 'img-alt',
          description: 'Image missing alt attribute',
          element: `img[${index}]: ${img.src}`,
          wcagLevel: 'A',
          wcagCriteria: '1.1.1 Non-text Content',
        });
      } else if (
        img.alt === '' &&
        img.getAttribute('role') !== 'presentation'
      ) {
        this.issues.push({
          severity: 'warning',
          rule: 'img-alt-empty',
          description: 'Image has empty alt text but no role="presentation"',
          element: `img[${index}]: ${img.src}`,
          wcagLevel: 'A',
          wcagCriteria: '1.1.1 Non-text Content',
        });
      }
    });
  }

  /**
   * Check heading hierarchy
   */
  private checkHeadings(): void {
    const headings = Array.from(
      document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    );

    // Check for h1
    const h1Count = document.querySelectorAll('h1').length;
    if (h1Count === 0) {
      this.issues.push({
        severity: 'error',
        rule: 'h1-required',
        description: 'Page must have exactly one h1 element',
        wcagLevel: 'A',
        wcagCriteria: '2.4.6 Headings and Labels',
      });
    } else if (h1Count > 1) {
      this.issues.push({
        severity: 'warning',
        rule: 'h1-multiple',
        description: 'Page should have only one h1 element',
        wcagLevel: 'A',
        wcagCriteria: '2.4.6 Headings and Labels',
      });
    }

    // Check heading order
    let previousLevel = 0;
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1]);
      if (previousLevel > 0 && level > previousLevel + 1) {
        this.issues.push({
          severity: 'warning',
          rule: 'heading-order',
          description: `Heading level skipped from h${previousLevel} to h${level}`,
          element: `${heading.tagName}[${index}]: ${heading.textContent?.substring(0, 50)}`,
          wcagLevel: 'A',
          wcagCriteria: '2.4.6 Headings and Labels',
        });
      }
      previousLevel = level;
    });
  }

  /**
   * Check links have accessible names
   */
  private checkLinks(): void {
    const links = document.querySelectorAll('a');
    links.forEach((link, index) => {
      const text = link.textContent?.trim();
      const ariaLabel = link.getAttribute('aria-label');
      const title = link.getAttribute('title');

      if (!text && !ariaLabel && !title) {
        this.issues.push({
          severity: 'error',
          rule: 'link-name',
          description: 'Link has no accessible name',
          element: `a[${index}]: ${link.href}`,
          wcagLevel: 'A',
          wcagCriteria: '2.4.4 Link Purpose',
        });
      }

      // Check for generic link text
      const genericTexts = ['click here', 'read more', 'more', 'here', 'link'];
      if (text && genericTexts.includes(text.toLowerCase())) {
        this.issues.push({
          severity: 'warning',
          rule: 'link-text-generic',
          description: 'Link text is too generic',
          element: `a[${index}]: "${text}"`,
          wcagLevel: 'A',
          wcagCriteria: '2.4.4 Link Purpose',
        });
      }
    });
  }

  /**
   * Check form accessibility
   */
  private checkForms(): void {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach((input, index) => {
      const id = input.id;
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledby = input.getAttribute('aria-labelledby');
      const label = id ? document.querySelector(`label[for="${id}"]`) : null;

      if (!label && !ariaLabel && !ariaLabelledby) {
        this.issues.push({
          severity: 'error',
          rule: 'form-label',
          description: 'Form control has no associated label',
          element: `${input.tagName}[${index}]: ${input.getAttribute('name') || input.id}`,
          wcagLevel: 'A',
          wcagCriteria: '3.3.2 Labels or Instructions',
        });
      }
    });
  }

  /**
   * Check buttons have accessible names
   */
  private checkButtons(): void {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button, index) => {
      const text = button.textContent?.trim();
      const ariaLabel = button.getAttribute('aria-label');

      if (!text && !ariaLabel) {
        this.issues.push({
          severity: 'error',
          rule: 'button-name',
          description: 'Button has no accessible name',
          element: `button[${index}]`,
          wcagLevel: 'A',
          wcagCriteria: '4.1.2 Name, Role, Value',
        });
      }
    });
  }

  /**
   * Check color contrast (simplified check)
   */
  private checkColorContrast(): void {
    // This is a simplified check - full contrast checking requires color analysis
    const textElements = document.querySelectorAll(
      'p, span, a, button, h1, h2, h3, h4, h5, h6'
    );

    textElements.forEach((element) => {
      const styles = window.getComputedStyle(element);
      const fontSize = parseFloat(styles.fontSize);
      const fontWeight = styles.fontWeight;

      // Large text is 18pt+ or 14pt+ bold
      const isLargeText =
        fontSize >= 24 || (fontSize >= 18.66 && parseInt(fontWeight) >= 700);

      // Note: Actual contrast ratio calculation would require color parsing
      // This is a placeholder for the check
      if (!isLargeText && fontSize < 14) {
        this.issues.push({
          severity: 'info',
          rule: 'color-contrast',
          description: 'Text may be too small for optimal readability',
          element: element.tagName,
          wcagLevel: 'AA',
          wcagCriteria: '1.4.3 Contrast (Minimum)',
        });
      }
    });
  }

  /**
   * Check keyboard navigation
   */
  private checkKeyboardNavigation(): void {
    const interactiveElements = document.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]'
    );

    interactiveElements.forEach((element, index) => {
      const tabindex = element.getAttribute('tabindex');

      if (tabindex && parseInt(tabindex) > 0) {
        this.issues.push({
          severity: 'warning',
          rule: 'tabindex-positive',
          description: 'Positive tabindex values should be avoided',
          element: `${element.tagName}[${index}]: tabindex="${tabindex}"`,
          wcagLevel: 'A',
          wcagCriteria: '2.4.3 Focus Order',
        });
      }
    });
  }

  /**
   * Check ARIA usage
   */
  private checkARIA(): void {
    const ariaElements = document.querySelectorAll(
      '[role], [aria-label], [aria-labelledby], [aria-describedby]'
    );

    ariaElements.forEach((element, index) => {
      const role = element.getAttribute('role');

      // Check for invalid roles
      const validRoles = [
        'alert',
        'alertdialog',
        'application',
        'article',
        'banner',
        'button',
        'checkbox',
        'complementary',
        'contentinfo',
        'dialog',
        'document',
        'feed',
        'figure',
        'form',
        'grid',
        'gridcell',
        'heading',
        'img',
        'link',
        'list',
        'listbox',
        'listitem',
        'main',
        'navigation',
        'region',
        'row',
        'rowgroup',
        'search',
        'switch',
        'tab',
        'table',
        'tablist',
        'tabpanel',
        'textbox',
        'timer',
        'toolbar',
        'tooltip',
        'tree',
      ];

      if (role && !validRoles.includes(role)) {
        this.issues.push({
          severity: 'error',
          rule: 'aria-role-invalid',
          description: `Invalid ARIA role: ${role}`,
          element: `${element.tagName}[${index}]`,
          wcagLevel: 'A',
          wcagCriteria: '4.1.2 Name, Role, Value',
        });
      }
    });
  }

  /**
   * Check landmark regions
   */
  private checkLandmarks(): void {
    const hasMain = document.querySelector('main, [role="main"]');
    const hasNav = document.querySelector('nav, [role="navigation"]');

    if (!hasMain) {
      this.issues.push({
        severity: 'warning',
        rule: 'landmark-main',
        description: 'Page should have a main landmark',
        wcagLevel: 'A',
        wcagCriteria: '2.4.1 Bypass Blocks',
      });
    }

    if (!hasNav) {
      this.issues.push({
        severity: 'info',
        rule: 'landmark-nav',
        description: 'Page should have a navigation landmark',
        wcagLevel: 'A',
        wcagCriteria: '2.4.1 Bypass Blocks',
      });
    }
  }

  /**
   * Check page language
   */
  private checkLanguage(): void {
    const html = document.documentElement;
    const lang = html.getAttribute('lang');

    if (!lang) {
      this.issues.push({
        severity: 'error',
        rule: 'html-lang',
        description: 'HTML element must have a lang attribute',
        wcagLevel: 'A',
        wcagCriteria: '3.1.1 Language of Page',
      });
    }
  }

  /**
   * Check page title
   */
  private checkPageTitle(): void {
    const title = document.querySelector('title');

    if (!title || !title.textContent?.trim()) {
      this.issues.push({
        severity: 'error',
        rule: 'page-title',
        description: 'Page must have a descriptive title',
        wcagLevel: 'A',
        wcagCriteria: '2.4.2 Page Titled',
      });
    }
  }

  /**
   * Check skip links
   */
  private checkSkipLinks(): void {
    const skipLink = document.querySelector('a[href^="#"]');

    if (!skipLink) {
      this.issues.push({
        severity: 'warning',
        rule: 'skip-link',
        description: 'Page should have a skip navigation link',
        wcagLevel: 'A',
        wcagCriteria: '2.4.1 Bypass Blocks',
      });
    }
  }
}

/**
 * Run accessibility audit and log results
 */
export function runAccessibilityAudit(): AuditResult {
  const auditor = new AccessibilityAuditor();
  const result = auditor.audit();

  console.group('♿ Accessibility Audit Results');
  console.log(`Score: ${result.score}/100`);
  console.log(`Status: ${result.passed ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Total Issues: ${result.summary.total}`);
  console.log(`  - Errors: ${result.summary.failed}`);
  console.log(`  - Warnings: ${result.summary.warnings}`);
  console.log(
    `  - Info: ${result.summary.total - result.summary.failed - result.summary.warnings}`
  );

  if (result.issues.length > 0) {
    console.group('Issues:');
    result.issues.forEach((issue, index) => {
      const icon =
        issue.severity === 'error'
          ? '❌'
          : issue.severity === 'warning'
            ? '⚠️'
            : 'ℹ️';
      console.log(
        `${icon} [${issue.wcagLevel}] ${issue.rule}: ${issue.description}`
      );
      if (issue.element) {
        console.log(`   Element: ${issue.element}`);
      }
      console.log(`   WCAG: ${issue.wcagCriteria}`);
    });
    console.groupEnd();
  }

  console.groupEnd();

  return result;
}
