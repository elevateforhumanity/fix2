import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Elevate for Humanity/);
  });

  test('displays hero section', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('h1');
    await expect(hero).toBeVisible();
  });

  test('navigates to programs page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=View Programs');
    await expect(page).toHaveURL(/.*programs/);
  });
});
