//Module 12 - Task 'Authentication'

import { test } from '@playwright/test';
import path from 'path';
import { regularUser } from '../test_data/user';
import { LoginPage } from '../pageObjects/login.page';
import { BasePage } from '../pageObjects/base.page';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');



test('Verify login as a user with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const { email, password } = regularUser;
  const basePage = new BasePage(page);

  await test.step('Open login page', async () => {
    // Open URL: https://practicesoftwaretesting.com/auth/login.
    await loginPage.openLoginPage();
  });

  await test.step('Login', async () => {
    await loginPage.performLogin(email, password);
  });

  await test.step('Verify URL is /account', async () => {
    // Assertions:
    // Verify URL is https://practicesoftwaretesting.com/account.
    await basePage.verifyURLContains(/\/account/);
  });

  await page.context().storageState({ path: authFile });

});

