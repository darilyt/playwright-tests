//Module 12 - Task 'Authentication'

import test from "@playwright/test";
import { regularUser } from "../test_data/user";
import path from 'path';
import { AccountPage } from "../pageObjects/account.page";
import { HomePage } from "../pageObjects/home.page";

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({ storageState: authFile });



test('Verify login as a user with valid credentials,', async ({ page }) => {
  const { name } = regularUser;
  const accountPage = new AccountPage(page);
  const homePage = new HomePage(page);
  const headerFragment = homePage.header;

  await accountPage.openAccountPage();

  await test.step('Verify page title', async () => {
    // Verify page title is "My Account".
    await accountPage.verifyPageTitle();
  });

  await test.step('Verify username in the navigation bar', async () => {
    // Verify username "Jane Doe" appears in the navigation bar.  
    await headerFragment.verifyUserNameInNavBar(name);
  });
});
