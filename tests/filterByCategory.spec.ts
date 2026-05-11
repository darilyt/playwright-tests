//Module 12 - Test 6

import test, { expect } from "@playwright/test";
import path from 'path';
import { HomePage } from "../pageObjects/home.page";

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({ storageState: authFile });



test(`Verify user can filter products by Sander`, async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.openHomePage();

  await test.step('Select Sander in the category list', async () => {
    await homePage.clickOnCategoryCheckbox('Sander');
  });

  await test.step('Verify the displayed products contain Sander in their names', async () => {
    const filteredProducts = await homePage.getListOfAllProductNames();
    for (const product of filteredProducts) {
      expect(product).toContain('Sander');
    }
  });
});

