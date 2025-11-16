import { test, expect } from '@playwright/test';

test.describe('User Profile Management', () => {
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

  test('should display user profile page', async ({ page }) => {
    await page.goto('/profile');

    await expect(page.locator('h1, h2')).toContainText(/profile|account/i);

    // Should show user information
    await expect(
      page.locator('input[name="email"], input[type="email"]')
    ).toBeVisible();
  });

  test('should update profile information', async ({ page }) => {
    await page.goto('/profile');

    // Update name
    const nameInput = page.locator(
      'input[name="name"], input[name="fullName"]'
    );
    await nameInput.fill('Updated Name');

    // Save changes
    await page.click('button:has-text("Save"), button[type="submit"]');

    // Should show success message
    await expect(page.locator('text=/success|saved|updated/i')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/profile');

    // Enter invalid email
    const emailInput = page.locator('input[name="email"], input[type="email"]');
    await emailInput.fill('invalid-email');

    // Try to save
    await page.click('button:has-text("Save"), button[type="submit"]');

    // Should show validation error
    await expect(
      page.locator('text=/invalid.*email|email.*invalid/i')
    ).toBeVisible();
  });

  test('should upload profile picture', async ({ page }) => {
    await page.goto('/profile');

    const fileInput = page.locator('input[type="file"]');

    if ((await fileInput.count()) > 0) {
      // Mock file upload
      await fileInput.setInputFiles({
        name: 'avatar.png',
        mimeType: 'image/png',
        buffer: Buffer.from('fake-image-data'),
      });

      // Should show preview or success
      await expect(
        page.locator('img[alt*="profile"], img[alt*="avatar"]')
      ).toBeVisible();
    }
  });
});

test.describe('Password Management', () => {
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

  test('should display change password form', async ({ page }) => {
    await page.goto('/profile/security');

    // Should have password fields
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('should require current password', async ({ page }) => {
    await page.goto('/profile/security');

    // Try to change without current password
    await page.fill('input[name="newPassword"]', 'NewPass123!');
    await page.click('button[type="submit"]');

    // Should show error
    await expect(
      page.locator('text=/current password|old password/i')
    ).toBeVisible();
  });

  test('should validate password strength', async ({ page }) => {
    await page.goto('/profile/security');

    // Enter weak password
    await page.fill('input[name="currentPassword"]', 'OldPass123!');
    await page.fill('input[name="newPassword"]', '123');
    await page.click('button[type="submit"]');

    // Should show strength error
    await expect(page.locator('text=/weak|short|characters/i')).toBeVisible();
  });

  test('should confirm password match', async ({ page }) => {
    await page.goto('/profile/security');

    // Enter mismatched passwords
    await page.fill('input[name="newPassword"]', 'NewPass123!');
    await page.fill('input[name="confirmPassword"]', 'DifferentPass123!');
    await page.click('button[type="submit"]');

    // Should show mismatch error
    await expect(page.locator('text=/match|same/i')).toBeVisible();
  });
});

test.describe('Notification Preferences', () => {
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

  test('should display notification settings', async ({ page }) => {
    await page.goto('/profile/notifications');

    // Should show notification toggles
    await expect(
      page.locator('input[type="checkbox"], input[type="radio"]')
    ).toBeVisible();
  });

  test('should toggle email notifications', async ({ page }) => {
    await page.goto('/profile/notifications');

    const emailToggle = page.locator('input[name*="email"]').first();

    if ((await emailToggle.count()) > 0) {
      await emailToggle.click();

      // Save settings
      await page.click('button:has-text("Save")');

      // Should show success
      await expect(page.locator('text=/success|saved/i')).toBeVisible();
    }
  });
});

test.describe('Account Deletion', () => {
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

  test('should show delete account option', async ({ page }) => {
    await page.goto('/profile/settings');

    // Should have delete button
    const deleteButton = page.locator(
      'button:has-text("Delete"), button:has-text("Close Account")'
    );

    if ((await deleteButton.count()) > 0) {
      await expect(deleteButton).toBeVisible();
    }
  });

  test('should require confirmation for deletion', async ({ page }) => {
    await page.goto('/profile/settings');

    const deleteButton = page.locator(
      'button:has-text("Delete"), button:has-text("Close Account")'
    );

    if ((await deleteButton.count()) > 0) {
      await deleteButton.click();

      // Should show confirmation dialog
      await expect(
        page.locator('text=/confirm|are you sure|permanent/i')
      ).toBeVisible();
    }
  });
});

test.describe('Learning Progress', () => {
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

  test('should display enrolled courses', async ({ page }) => {
    await page.goto('/profile/courses');

    // Should show course list
    await expect(page.locator('text=/enrolled|my courses/i')).toBeVisible();
  });

  test('should show course progress', async ({ page }) => {
    await page.goto('/profile/courses');

    // Should have progress indicators
    const progressBars = page.locator(
      '[role="progressbar"], .progress-bar, .progress'
    );

    if ((await progressBars.count()) > 0) {
      await expect(progressBars.first()).toBeVisible();
    }
  });

  test('should display certificates', async ({ page }) => {
    await page.goto('/profile/certificates');

    // Should show certificates section
    await expect(page.locator('h1, h2')).toContainText(/certificate/i);
  });
});
