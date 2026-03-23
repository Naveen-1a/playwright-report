import { test, expect } from '@playwright/test';

test('Login validations - CourseMill (slow execution)', async ({ page }) => {

  // ✅ Increase timeout for this test
  test.setTimeout(60000);

  // Helper for delay (cleaner)
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

  // Step 3: Empty password
  await username.fill('naveen_testuser9');
  await slow();

  await password.fill('');
  await slow();

  await expect(loginBtn).toBeDisabled();
  await slow();

  // Step 4: Empty username
  await username.fill('');
  await slow();

  await password.fill('Password@01');
  await slow();

  await expect(loginBtn).toBeDisabled();
  await slow();

  // Step 5: Invalid login
  await username.fill('invalid_user');
  await slow();

  await password.fill('wrong_password');
  await slow();

  await loginBtn.click();
  await slow(1200);

  const errorMsg = page.locator('text=The User ID/Password combination you have entered is invalid. Please try again.');
  await expect(errorMsg).toBeVisible();
  await slow(1200);

  // Step 6: Valid login
  await username.fill('naveen_testuser9');
  await slow();

  await password.fill('Password@01');
  await slow();

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    loginBtn.click()
  ]);

  await slow(1500);

  // Step 7: Validate successful login
  await expect(page).toHaveURL(/myCourses/);

});