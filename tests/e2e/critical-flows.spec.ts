import { test, expect } from '@playwright/test';

test.describe('Critical User Flows', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Elevate for Humanity/);
  });

  test('apply page accessible', async ({ page }) => {
    await page.goto('/apply');
    await expect(page.locator('h1')).toContainText(/apply/i);
  });

  test('login page accessible', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('programs page loads', async ({ page }) => {
    await page.goto('/programs');
    await expect(page.locator('h1')).toContainText(/programs/i);
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Programs');
    await expect(page).toHaveURL(/programs/);
  });

  test('mobile menu works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const menuButton = page.locator('button[aria-label*="menu"]').first();
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await expect(page.locator('nav')).toBeVisible();
    }
  });

  test('footer links present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer a[href="/privacy-policy"]')).toBeVisible();
    await expect(page.locator('footer a[href="/terms-of-service"]')).toBeVisible();
  });
});

test.describe('Dashboard Routing', () => {
  test('dashboard redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/login/);
  });

  test('admin dashboard requires auth', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/login/);
  });

  test('lms dashboard requires auth', async ({ page }) => {
    await page.goto('/lms/dashboard');
    await expect(page).toHaveURL(/login/);
  });
});

test.describe('Accessibility', () => {
  test('skip to content link exists', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('a:has-text("Skip to")').first();
    await skipLink.focus();
    await expect(skipLink).toBeVisible();
  });

  test('all images have alt text', async ({ page }) => {
    await page.goto('/');
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeDefined();
    }
  });

  test('form inputs have labels', async ({ page }) => {
    await page.goto('/login');
    const inputs = await page.locator('input').all();
    
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        await expect(label).toBeVisible();
      }
    }
  });
});
