//Module 12 - Test 4&5

import test, { expect } from "@playwright/test";
import path from 'path';
import { HomePage } from "../pageObjects/home.page";

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({ storageState: authFile });

const sortingOption = [
  { option: 'Price (High - Low)', direction: 'asc' },
  { option: 'Price (Low - High)', direction: 'desc' },
];



sortingOption.forEach(({ option, direction }) => {
  test(`Verify user can perform sorting by price ${direction}`, async ({ page }) => {
    // Open homepage: https://practicesoftwaretesting.com.
    // Select Price (High - Low) / Price (Low - High) in the sort dropdown.
    //Assert: 1. Verify all the displayed products are sorted by prices ascending or descending.
    const homePage = new HomePage(page);
    await homePage.openHomePage();
    await homePage.selectSortingOption(option);

    const productPrices = await homePage.getListOfAllProductPrices();
    const sortedPrices = [...productPrices].sort()

    if (direction === 'desc') {
      sortedPrices.reverse();
    }
    expect(productPrices).toEqual(sortedPrices);

  });
});



