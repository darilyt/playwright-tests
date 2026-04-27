import test, { chromium, expect } from "@playwright/test";
import { regularUser } from "../test_data/user";

import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.use({storageState: authFile });

enum Category {
  HandTools = 'Hand Tools',
  PowerTools = 'Power Tools',
  Other = 'Other',
}

Object.values(Category).forEach((categoryItem) => {
  test(`Verify user can filter products by ${categoryItem}`, async ({ page }) => {

await test.step('Open homepage', async () => {
// Open homepage: https://practicesoftwaretesting.com.
    await page.goto('/');
  });

await test.step('Select Sander in the category list', async () => {
// Select Sander in the category list (note: create 3 enums with categories: Hand Tools , Power Tools , and Other).  
  // locate label of the category to find and check 'Sander'  
  // go to its parent container (checkbox group)
  const categoryLabel = page.getByText(categoryItem);
  const categoryGroup = categoryLabel.locator('..');
  // find Sander checkbox inside same group
  const sanderCheckbox = categoryGroup.getByRole('checkbox', {name: 'Sander'});
  // check Sander if present in the category and then do rest steps.
  if (await sanderCheckbox.count() > 0) {
      await sanderCheckbox.check();
  }
  });

await test.step('Verify the displayed products contain Sander in their names', async () => {
// Assert: 1. Verify the displayed products contain Sander in their names.
  // get list of products after filtering
  const filteredProducts = await page.getByTestId('product-name').allTextContents();  
  // verify that all products contain 'Sander' in their names
  for (const product of filteredProducts) {
    expect(product).toContain('Sander');
  }
  });

  });
});




