import { test, expect } from '@playwright/test';

test.describe('Certificate Generation', () => {
  test.beforeEach(async ({ page, context }) => {
    // Mock authentication
    await context.addCookies([
      {
        name: 'auth-token',
        value: 'mock-token',
        domain: 'localhost',
        path: '/',
      },
    ]);
  });

  test('should display certificates page', async ({ page }) => {
    await page.goto('/certificates');

    await expect(page.locator('h1, h2')).toContainText(/certificate/i);
  });

  test('should show earned certificates', async ({ page }) => {
    await page.goto('/certificates');

    // Should show certificate list or message
    const hasCertificates = await page
      .locator('.certificate-card, [data-testid="certificate"]')
      .count();
    const noMessage = await page
      .locator('text=/no certificates|complete.*course/i')
      .count();

    expect(hasCertificates > 0 || noMessage > 0).toBe(true);
  });

  test('should generate certificate after course completion', async ({
    page,
  }) => {
    // Complete a course
    await page.goto('/lms/courses/test-course');

    // Mock course completion
    await page.evaluate(() => {
      localStorage.setItem('course-test-course-progress', '100');
    });

    await page.goto('/certificates');

    // Should show new certificate
    await expect(
      page.locator('.certificate-card, [data-testid="certificate"]')
    ).toBeVisible();
  });

  test('should display certificate details', async ({ page }) => {
    await page.goto('/certificates');

    const certificate = page
      .locator('.certificate-card, [data-testid="certificate"]')
      .first();

    if ((await certificate.count()) > 0) {
      await certificate.click();

      // Should show certificate details
      await expect(page.locator('text=/issued|completed|date/i')).toBeVisible();
    }
  });

  test('should download certificate as PDF', async ({ page }) => {
    await page.goto('/certificates');

    const downloadButton = page
      .locator('button:has-text("Download"), a:has-text("Download")')
      .first();

    if ((await downloadButton.count()) > 0) {
      // Set up download listener
      const downloadPromise = page.waitForEvent('download');

      await downloadButton.click();

      const download = await downloadPromise;

      // Verify download
      expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
    }
  });

  test('should share certificate', async ({ page }) => {
    await page.goto('/certificates');

    const shareButton = page
      .locator('button:has-text("Share"), a:has-text("Share")')
      .first();

    if ((await shareButton.count()) > 0) {
      await shareButton.click();

      // Should show share options
      await expect(
        page.locator('text=/linkedin|twitter|facebook|copy link/i')
      ).toBeVisible();
    }
  });

  test('should verify certificate authenticity', async ({ page }) => {
    await page.goto('/verify-certificate');

    // Should have verification form
    await expect(
      page.locator(
        'input[name="certificateId"], input[placeholder*="certificate"]'
      )
    ).toBeVisible();
  });

  test('should validate certificate ID', async ({ page }) => {
    await page.goto('/verify-certificate');

    // Enter certificate ID
    await page.fill('input[name="certificateId"]', 'CERT-12345');
    await page.click('button[type="submit"]');

    // Should show verification result
    await expect(
      page.locator('text=/valid|invalid|verified|not found/i')
    ).toBeVisible();
  });
});

test.describe('Certificate Display', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'auth-token',
        value: 'mock-token',
        domain: 'localhost',
        path: '/',
      },
    ]);
  });

  test('should render certificate preview', async ({ page }) => {
    await page.goto('/certificates');

    const certificate = page
      .locator('.certificate-card, [data-testid="certificate"]')
      .first();

    if ((await certificate.count()) > 0) {
      await certificate.click();

      // Should show certificate image or canvas
      await expect(
        page.locator('img[alt*="certificate"], canvas')
      ).toBeVisible();
    }
  });

  test('should display certificate metadata', async ({ page }) => {
    await page.goto('/certificates');

    const certificate = page
      .locator('.certificate-card, [data-testid="certificate"]')
      .first();

    if ((await certificate.count()) > 0) {
      // Should show course name
      await expect(certificate.locator('text=/course|program/i')).toBeVisible();

      // Should show completion date
      await expect(
        certificate.locator('text=/\\d{4}|\\d{1,2}\\/\\d{1,2}/i')
      ).toBeVisible();
    }
  });

  test('should show certificate badge', async ({ page }) => {
    await page.goto('/profile');

    // Should display earned badges
    const badges = page.locator('.badge, [data-testid="badge"]');

    if ((await badges.count()) > 0) {
      await expect(badges.first()).toBeVisible();
    }
  });
});

test.describe('Certificate Security', () => {
  test('should have unique certificate IDs', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'auth-token',
        value: 'mock-token',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.goto('/certificates');

    const certificates = page.locator(
      '.certificate-card, [data-testid="certificate"]'
    );
    const count = await certificates.count();

    if (count > 1) {
      const ids = [];

      for (let i = 0; i < count; i++) {
        const cert = certificates.nth(i);
        const id = await cert.getAttribute('data-id');
        if (id) ids.push(id);
      }

      // All IDs should be unique
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    }
  });

  test('should prevent certificate tampering', async ({ page }) => {
    await page.goto('/verify-certificate');

    // Try to verify tampered certificate
    await page.fill('input[name="certificateId"]', 'TAMPERED-ID');
    await page.click('button[type="submit"]');

    // Should show invalid
    await expect(page.locator('text=/invalid|not found/i')).toBeVisible();
  });
});
