import { test, expect } from '@playwright/test';

test('Login test', async ({ page }) => {

  await page.goto('https://test.coursemill.com/nsui/login');

  await page.fill('#username', 'naveen_testuser9');
  await page.fill('#password', 'Password@01');

  await page.click('#submitBtn');

  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/myCourses/);

});