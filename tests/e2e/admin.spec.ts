import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard Access', () => {
  test('should require admin authentication', async ({ page }) => {
    await page.goto('/admin');
    
    // Should redirect to login or show access denied
    await expect(page).toHaveURL(/\/login|\/unauthorized|\/403/);
  });

  test('should allow admin access with proper role', async ({ page, context }) => {
    // Mock admin authentication
    await context.addCookies([{
      name: 'auth-token',
      value: 'admin-token',
      domain: 'localhost',
      path: '/',
    }]);
    
    await page.goto('/admin');
    
    // Should show admin dashboard
    await expect(page.locator('h1, h2')).toContainText(/admin|dashboard/i);
  });
});

test.describe('User Management', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addCookies([{
      name: 'auth-token',
      value: 'admin-token',
      domain: 'localhost',
      path: '/',
    }]);
  });

  test('should display user list', async ({ page }) => {
    await page.goto('/admin/users');
    
    await expect(page.locator('h1, h2')).toContainText(/users/i);
    
    // Should show user table or list
    const userList = page.locator('table, [data-testid="user-list"]');
    await expect(userList).toBeVisible();
  });

  test('should search users', async ({ page }) => {
    await page.goto('/admin/users');
    
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"]');
    
    if (await searchInput.count() > 0) {
      await searchInput.fill('test@example.com');
      await page.waitForTimeout(500);
      
      // Should filter results
      await expect(page.locator('table tbody tr, .user-item')).toBeVisible();
    }
  });

  test('should view user details', async ({ page }) => {
    await page.goto('/admin/users');
    
    // Click first user
    await page.click('table tbody tr:first-child, .user-item:first-child');
    
    // Should show user details
    await expect(page.locator('text=/email|name|role/i')).toBeVisible();
  });

  test('should edit user role', async ({ page }) => {
    await page.goto('/admin/users');
    
    // Click edit button
    const editButton = page.locator('button:has-text("Edit"), a:has-text("Edit")');
    
    if (await editButton.count() > 0) {
      await editButton.first().click();
      
      // Should show role selector
      await expect(page.locator('select[name="role"], input[name="role"]')).toBeVisible();
    }
  });
});

test.describe('Course Management', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addCookies([{
      name: 'auth-token',
      value: 'admin-token',
      domain: 'localhost',
      path: '/',
    }]);
  });

  test('should display course list', async ({ page }) => {
    await page.goto('/admin/courses');
    
    await expect(page.locator('h1, h2')).toContainText(/courses|programs/i);
    
    // Should show courses
    const courseList = page.locator('table, [data-testid="course-list"]');
    await expect(courseList).toBeVisible();
  });

  test('should create new course', async ({ page }) => {
    await page.goto('/admin/courses');
    
    // Click create button
    await page.click('button:has-text("Create"), button:has-text("New"), a:has-text("Add")');
    
    // Should show course form
    await expect(page.locator('input[name="title"], input[name="name"]')).toBeVisible();
  });

  test('should edit existing course', async ({ page }) => {
    await page.goto('/admin/courses');
    
    // Click edit on first course
    const editButton = page.locator('button:has-text("Edit"), a:has-text("Edit")').first();
    
    if (await editButton.count() > 0) {
      await editButton.click();
      
      // Should show edit form
      await expect(page.locator('input[name="title"], input[name="name"]')).toBeVisible();
    }
  });

  test('should delete course', async ({ page }) => {
    await page.goto('/admin/courses');
    
    // Click delete button
    const deleteButton = page.locator('button:has-text("Delete")').first();
    
    if (await deleteButton.count() > 0) {
      await deleteButton.click();
      
      // Should show confirmation dialog
      await expect(page.locator('text=/confirm|are you sure/i')).toBeVisible();
    }
  });
});

test.describe('Analytics Dashboard', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addCookies([{
      name: 'auth-token',
      value: 'admin-token',
      domain: 'localhost',
      path: '/',
    }]);
  });

  test('should display analytics overview', async ({ page }) => {
    await page.goto('/admin/analytics');
    
    // Should show metrics
    await expect(page.locator('text=/users|enrollments|revenue/i')).toBeVisible();
  });

  test('should show charts and graphs', async ({ page }) => {
    await page.goto('/admin/analytics');
    
    // Should have chart elements
    const charts = page.locator('canvas, svg[class*="chart"]');
    
    if (await charts.count() > 0) {
      await expect(charts.first()).toBeVisible();
    }
  });
});

test.describe('Autopilot Admin', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addCookies([{
      name: 'auth-token',
      value: 'admin-token',
      domain: 'localhost',
      path: '/',
    }]);
  });

  test('should display autopilot dashboard', async ({ page }) => {
    await page.goto('/autopilot-admin');
    
    await expect(page.locator('h1, h2')).toContainText(/autopilot|automation/i);
  });

  test('should show automation suites', async ({ page }) => {
    await page.goto('/autopilot-admin');
    
    // Should show suite list
    await expect(page.locator('text=/suite|workflow|automation/i')).toBeVisible();
  });

  test('should trigger automation', async ({ page }) => {
    await page.goto('/autopilot-admin');
    
    const runButton = page.locator('button:has-text("Run"), button:has-text("Execute")');
    
    if (await runButton.count() > 0) {
      await runButton.first().click();
      
      // Should show execution status
      await expect(page.locator('text=/running|executing|processing/i')).toBeVisible();
    }
  });
});
