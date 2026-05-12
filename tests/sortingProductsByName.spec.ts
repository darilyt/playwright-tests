//Module 12 - Test 2&3

import test, { expect } from "@playwright/test";
import path from 'path';
import { HomePage } from "../pageObjects/home.page";

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({ storageState: authFile });

const sortingOption = [
  { option: 'Name (A - Z)', direction: 'asc' },
  { option: 'Name (Z - A)', direction: 'desc' },
];



sortingOption.forEach(({ option, direction }) => {

  test(`Verify user can perform sorting by name ${direction}`, async ({ page }) => {
    // Open homepage: https://practicesoftwaretesting.com.
    // Select Name (A - Z) / Name (Z - A) in the sort dropdown.
    // Assert: 1. Verify all the displayed products are sorted by names ascending or descending.
    const homePage = new HomePage(page);
    await homePage.openHomePage();
    await homePage.selectSortingOption(option);

    const productNames = await homePage.getListOfAllProductNames();
    const sortedNames = [...productNames].sort()

    if (direction === 'desc') {
      sortedNames.reverse();
    }
    expect(productNames).toEqual(sortedNames);

  });
});




