import { test, expect } from '@playwright/test';

test('Login validations + Dashboard navigation', async ({ page }) => {

  test.setTimeout(60000);

  const slow = async (ms: number = 700) => {
    await page.waitForTimeout(ms);
  };

  // Step 1: Navigate to login page
  await page.goto('https://test.coursemill.com/nsui/login');
  await slow();

  await expect(page).toHaveURL(/login/);

  const username = page.locator('#username');
  const password = page.locator('#password');
  const loginBtn = page.locator('#submitBtn');

  // Step 2: Empty fields validation
  await username.fill('');
  await slow();
  await password.fill('');
  await slow();
  await expect(loginBtn).toBeDisabled();
  await slow();

  // Step 3: Invalid login
  await username.fill('invalid_user');
  await slow();
  await password.fill('wrong_password');
  await slow();
  await loginBtn.click();
  await slow(1200);

  const errorMsg = page.locator('text=/invalid/i');
  await expect(errorMsg).toBeVisible();
  await slow();

  // Step 4: Valid login
  await username.fill('naveen_testuser9');
  await slow();
  await password.fill('Password@01');
  await slow();

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    loginBtn.click()
  ]);

  await slow(1500);

  // Step 5: Validate My Courses page
  await expect(page).toHaveURL(/myCourses/);

  // Step 6: Click Dashboard tab
  const dashboardTab = page.getByText('Dashboard');
  await expect(dashboardTab).toBeVisible();
  await slow();

  await dashboardTab.click();
  await slow(1500);

  // Step 7: Click "View All" (first occurrence to avoid strict mode issue)
  const viewAllBtn = page.locator('button:has-text("View All")').nth(1);

await expect(viewAllBtn).toBeVisible();
await viewAllBtn.click();

  // Step 8: Optional validation (Calendar page)
  await expect(page).toHaveURL(/calendar/i);

});