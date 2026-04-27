import { test, expect } from '@playwright/test';
import path from 'path';
import { regularUser } from '../test_data/user';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Verify login as a user with valid credentials', async ({ page }) => {
 const {email, password, name} =  regularUser;

  await test.step('Open login page', async () => {
    // Open URL: https://practicesoftwaretesting.com/auth/login.
    await page.goto('/auth/login');
  });

  await test.step('Fill in email', async () => {
    // Fill in credentials:
    // Email: customer@practicesoftwaretesting.com
    await page.getByTestId('email').fill(email);
  });

  await test.step('Fill in password', async () => {
    // Password: welcome01
    await page.getByTestId('password').fill(password);
  });

  await test.step('Click the Login', async () => {
    // Click the Login button.
    await page.getByTestId('login-submit').click(); 
   });

  await test.step('Verify URL is /account', async () => {
    // Assertions:
    // Verify URL is https://practicesoftwaretesting.com/account.
    await expect(page).toHaveURL('/account');
  });

await page.context().storageState({ path: authFile });

});

