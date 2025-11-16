import { test, expect } from '@playwright/test';

test.describe('Course Enrollment and Progress', () => {
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

  test('should browse available courses', async ({ page }) => {
    await page.goto('/programs');

    await expect(page.locator('h1')).toContainText(/programs|courses/i);

    // Should show course cards
    const courseCards = page.locator(
      '[data-testid="course-card"], .course-card, .program-card'
    );
    await expect(courseCards.first()).toBeVisible();
  });

  test('should view course details', async ({ page }) => {
    await page.goto('/programs');

    // Click first course
    await page.click(
      '[data-testid="course-card"]:first-child, .course-card:first-child, .program-card:first-child'
    );

    // Should show course details
    await expect(page.locator('h1, h2')).toBeVisible();
    await expect(page.locator('text=/enroll|start|begin/i')).toBeVisible();
  });

  test('should enroll in a course', async ({ page }) => {
    await page.goto('/programs');

    // Click first course
    await page.click(
      '[data-testid="course-card"]:first-child, .course-card:first-child'
    );

    // Click enroll button
    await page.click('button:has-text("Enroll"), a:has-text("Enroll")');

    // Should redirect to course or show success
    await expect(page).toHaveURL(/\/lms|\/courses|\/enroll/);
  });

  test('should track course progress', async ({ page }) => {
    await page.goto('/lms/dashboard');

    // Should show progress indicators
    const progressBars = page.locator(
      '[role="progressbar"], .progress-bar, .progress'
    );
    await expect(progressBars.first()).toBeVisible();
  });

  test('should play course video', async ({ page }) => {
    await page.goto('/lms/courses/test-course/lessons/test-lesson');

    // Should have video player
    const video = page.locator('video');
    await expect(video).toBeVisible();

    // Should have play button
    const playButton = page.locator(
      'button[aria-label*="play"], button:has-text("Play")'
    );
    await expect(playButton).toBeVisible();
  });

  test('should complete a lesson', async ({ page }) => {
    await page.goto('/lms/courses/test-course/lessons/test-lesson');

    // Mark as complete
    await page.click(
      'button:has-text("Complete"), button:has-text("Mark Complete")'
    );

    // Should show completion indicator
    await expect(page.locator('text=/completed|done/i')).toBeVisible();
  });
});

test.describe('Quiz and Assessment', () => {
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

  test('should display quiz questions', async ({ page }) => {
    await page.goto('/lms/courses/test-course/quiz');

    // Should show quiz questions
    await expect(page.locator('text=/question/i')).toBeVisible();

    // Should have answer options
    const options = page.locator('input[type="radio"], input[type="checkbox"]');
    await expect(options.first()).toBeVisible();
  });

  test('should submit quiz answers', async ({ page }) => {
    await page.goto('/lms/courses/test-course/quiz');

    // Select first answer
    await page.click(
      'input[type="radio"]:first-child, input[type="checkbox"]:first-child'
    );

    // Submit quiz
    await page.click('button:has-text("Submit")');

    // Should show results
    await expect(page.locator('text=/score|result|grade/i')).toBeVisible();
  });
});
