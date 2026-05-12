//Module 12 - Test 6

import { test } from "../fixtures";
import { expect } from "@playwright/test";
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({ storageState: authFile });



test(`Verify user can filter products by Sander`, async ({ allPages }) => {
  await allPages.homePage.openHomePage();

  await test.step('Select Sander in the category list', async () => {
    await allPages.homePage.clickOnCategoryCheckbox('Sander');
  });

  await test.step('Verify the displayed products contain Sander in their names', async () => {
    const filteredProducts = await allPages.homePage.getListOfAllProductNames();
    for (const product of filteredProducts) {
      expect(product).toContain('Sander');
    }
  });
});




