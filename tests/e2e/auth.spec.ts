import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('h1')).toContainText(/log in|sign in/i);
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/login');
    await page.click('button[type="submit"]');

    // Should show validation errors
    await expect(page.locator('text=/email.*required/i')).toBeVisible();
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/login');
    await page.click('text=/sign up|create account/i');

    await expect(page).toHaveURL(/\/signup/);
    await expect(page.locator('h1')).toContainText(/sign up|create account/i);
  });

  test('should display forgot password link', async ({ page }) => {
    await page.goto('/login');
    const forgotLink = page.locator('text=/forgot password/i');
    await expect(forgotLink).toBeVisible();
  });
});

test.describe('Protected Routes', () => {
  test('should redirect to login when accessing protected route', async ({
    page,
  }) => {
    await page.goto('/lms/dashboard');

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });

  test('should access protected route after login', async ({
    page,
    context,
  }) => {
    // Mock authentication
    await context.addCookies([
      {
        name: 'auth-token',
        value: 'mock-token',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.goto('/lms/dashboard');

    // Should stay on dashboard (not redirect)
    await expect(page).toHaveURL(/\/lms\/dashboard/);
  });
});
