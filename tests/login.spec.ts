import test, { chromium, expect } from "@playwright/test";
import { regularUser } from "../test_data/user";



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

  await test.step('Verify page title', async () => {
    // Verify page title is "My Account".
    await expect(page.getByTestId('page-title')).toHaveText('My account');
   });

  await test.step('Verify username in the navigation bar', async () => {
    // Verify username "Jane Doe" appears in the navigation bar.  
    await expect(page.getByTestId('nav-menu')).toHaveText(name);
   });
});

