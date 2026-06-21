//Module 12 - Test 2&3

import { test } from "../fixtures";
import { expect } from "playwright/test";

const sortingOption = [
  { option: 'Name (A - Z)', direction: 'asc' },
  { option: 'Name (Z - A)', direction: 'desc' },
];



sortingOption.forEach(({ option, direction }) => {

  test(`Verify user can perform sorting by name ${direction}`, async ({ allPages }) => {
    // Open homepage: https://practicesoftwaretesting.com.
    // Select Name (A - Z) / Name (Z - A) in the sort dropdown.
    // Assert: 1. Verify all the displayed products are sorted by names ascending or descending.
    //const allPages = new AllPages(page);
    await allPages.homePage.openHomePage();

    //const homePage = new AllPages(page);
   // await homePage.openHomePage();

    await allPages.homePage.selectSortingOption(option);

    const productNames = await allPages.homePage.getListOfAllProductNames();
    const sortedNames = [...productNames].sort()

    if (direction === 'desc') {
      sortedNames.reverse();
    }
    expect(productNames).toEqual(sortedNames);

  });
});




