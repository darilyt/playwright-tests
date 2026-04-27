import test, { chromium, expect } from "@playwright/test";
import { regularUser } from "../test_data/user";

import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.use({storageState: authFile });

test('Verify login as a user with valid credentials', async ({ page }) => {
 const {email, password, name} =  regularUser;

  await page.goto('/account');

  await test.step('Verify page title', async () => {
    // Verify page title is "My Account".
    //await expect(page.getByTestId('page-title')).toHaveText('My account');
    await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();
   });

  await test.step('Verify username in the navigation bar', async () => {
    // Verify username "Jane Doe" appears in the navigation bar.  
    await expect(page.getByTestId('nav-menu')).toHaveText(name);
   });
});

