//Module 12 - Test 6

import { expect } from "@playwright/test";
import { test } from "../fixtures";


enum Category {
  HandTools = 'Hand Tools',
  PowerTools = 'Power Tools',
  Other = 'Other',
}


Object.values(Category).forEach((categoryItem) => {
  test(`Verify user can filter products by ${categoryItem}`, async ({ allPages }) => {
    await allPages.homePage.openHomePage();

    await test.step('Select Sander in the category list', async () => {
      // Select Sander in the category list (note: create 3 enums with categories: Hand Tools , Power Tools , and Other).  
      // locate label of the category to find and check 'Sander'  
      // go to its parent container (checkbox group)
      const categoryGroup = allPages.homePage.findCategoryByName(categoryItem).locator('..');
      // find Sander checkbox inside same group
      const sanderCheckbox = categoryGroup.getByRole('checkbox', { name: 'Sander' });
      // check Sander if present in the category and then do rest steps.
      if (await sanderCheckbox.count() > 0) {
        await sanderCheckbox.check();
      }
    });

    await test.step('Verify the displayed products contain Sander in their names', async () => {
      // Assert: 1. Verify the displayed products contain Sander in their names.
      // get list of products after filtering
      const filteredProducts = await allPages.homePage.getListOfAllProductNames();
      // verify that all products contain 'Sander' in their names
      for (const product of filteredProducts) {
        expect(product).toContain('Sander');
      }
    });
  });
});




