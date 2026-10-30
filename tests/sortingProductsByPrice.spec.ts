//Module 12 - Test 4&5

import { test, expect } from "../fixtures";

const sortingOption = [
  { option: 'Price (High - Low)', direction: 'desc' },
  { option: 'Price (Low - High)', direction: 'asc' },
];



sortingOption.forEach(({ option, direction }) => {
  test(`Verify user can perform sorting by price ${direction}`, async ({ allPages }) => {
    // Open homepage: https://practicesoftwaretesting.com.
    // Select Price (High - Low) / Price (Low - High) in the sort dropdown.
    //Assert: 1. Verify all the displayed products are sorted by prices ascending or descending.
    await allPages.homePage.openHomePage();
    await allPages.homePage.selectSortingOption(option);

    const productPrices = await allPages.homePage.getListOfAllProductPrices();
    const prices = productPrices.map(price => parseFloat(price.replace('$', '')));
    const sortedPrices = [...prices].sort((a, b) => a - b);

    if (direction === 'desc') {
      sortedPrices.reverse();
    }
    expect(prices).toEqual(sortedPrices);

  });
});



