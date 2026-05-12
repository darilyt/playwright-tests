//Module 12 - Test 4&5

import { expect } from "@playwright/test";
import { test } from "../fixtures";

const sortingOption = [
  { option: 'Price (High - Low)', direction: 'asc' },
  { option: 'Price (Low - High)', direction: 'desc' },
];



sortingOption.forEach(({ option, direction }) => {
  test(`Verify user can perform sorting by price ${direction}`, async ({ allPages }) => {
    // Open homepage: https://practicesoftwaretesting.com.
    // Select Price (High - Low) / Price (Low - High) in the sort dropdown.
    //Assert: 1. Verify all the displayed products are sorted by prices ascending or descending.
    await allPages.homePage.openHomePage();
    await allPages.homePage.selectSortingOption(option);

    const productPrices = await allPages.homePage.getListOfAllProductPrices();
    const sortedPrices = [...productPrices].sort()

    if (direction === 'desc') {
      sortedPrices.reverse();
    }
    expect(productPrices).toEqual(sortedPrices);

  });
});



