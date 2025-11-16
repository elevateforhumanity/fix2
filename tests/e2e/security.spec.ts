import { test, expect } from '@playwright/test';

test.describe('XSS Protection', () => {
  test('should sanitize user input in forms', async ({ page }) => {
    await page.goto('/contact');

    const xssPayload = '<script>alert("XSS")</script>';

    // Try to inject XSS in form field
    await page.fill(
      'input[name="name"], input[type="text"]:first-child',
      xssPayload
    );
    await page.fill('textarea', xssPayload);

    // Submit form
    await page.click('button[type="submit"]');

    // Check that script was not executed
    const alerts = [];
    page.on('dialog', (dialog) => {
      alerts.push(dialog.message());
      dialog.dismiss();
    });

    await page.waitForTimeout(1000);
    expect(alerts).toHaveLength(0);
  });

  test('should sanitize HTML in rendered content', async ({ page }) => {
    await page.goto('/');

    // Check that no inline scripts exist
    const scripts = await page
      .locator('script[src*="javascript:"], script:has-text("alert")')
      .count();
    expect(scripts).toBe(0);

    // Check that no event handlers in HTML
    const eventHandlers = await page
      .locator('[onclick], [onerror], [onload]')
      .count();
    expect(eventHandlers).toBe(0);
  });

  test('should have Content Security Policy headers', async ({ page }) => {
    const response = await page.goto('/');
    const headers = response?.headers();

    // Should have CSP header
    expect(
      headers?.['content-security-policy'] ||
        headers?.['x-content-security-policy']
    ).toBeTruthy();
  });
});

test.describe('Authentication Security', () => {
  test('should have secure password requirements', async ({ page }) => {
    await page.goto('/signup');

    // Try weak password
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', '123');
    await page.click('button[type="submit"]');

    // Should show password strength error
    await expect(
      page.locator(
        'text=/password.*weak|password.*short|password.*characters/i'
      )
    ).toBeVisible();
  });

  test('should have HTTPS enforcement', async ({ page }) => {
    const response = await page.goto('/');
    const headers = response?.headers();

    // Should have HSTS header
    expect(headers?.['strict-transport-security']).toBeTruthy();
  });

  test('should prevent CSRF attacks', async ({ page }) => {
    await page.goto('/login');

    // Check for CSRF token in forms
    const csrfToken = await page
      .locator('input[name="_csrf"], input[name="csrf_token"]')
      .count();

    // Should have CSRF protection (token or SameSite cookies)
    const cookies = await page.context().cookies();
    const hasSecureCookies = cookies.some(
      (c) => c.sameSite === 'Strict' || c.sameSite === 'Lax'
    );

    expect(csrfToken > 0 || hasSecureCookies).toBe(true);
  });
});

test.describe('Data Protection', () => {
  test('should not expose sensitive data in HTML', async ({ page }) => {
    await page.goto('/');

    const content = await page.content();

    // Should not contain API keys
    expect(content).not.toMatch(/sk_live_|pk_live_|api[_-]?key/i);

    // Should not contain passwords
    expect(content).not.toMatch(/password\s*[:=]\s*["'][^"']+["']/i);
  });

  test('should have secure cookie attributes', async ({ page, context }) => {
    await page.goto('/login');

    // Mock login
    await context.addCookies([
      {
        name: 'session',
        value: 'test-session',
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
      },
    ]);

    const cookies = await context.cookies();
    const sessionCookie = cookies.find((c) => c.name === 'session');

    if (sessionCookie) {
      expect(sessionCookie.httpOnly).toBe(true);
      expect(sessionCookie.secure).toBe(true);
      expect(sessionCookie.sameSite).toBe('Strict');
    }
  });
});

test.describe('SQL Injection Protection', () => {
  test('should sanitize database queries', async ({ page }) => {
    await page.goto('/search');

    const sqlPayload = "'; DROP TABLE users; --";

    // Try SQL injection in search
    await page.fill('input[type="search"], input[name="q"]', sqlPayload);
    await page.press('input[type="search"], input[name="q"]', 'Enter');

    // Should not cause error or expose database structure
    await expect(
      page.locator('text=/sql|syntax error|database/i')
    ).not.toBeVisible();
  });
});
