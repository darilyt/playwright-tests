import test, { chromium, expect } from "@playwright/test";
import { regularUser } from "../test_data/user";

import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.use({storageState: authFile });

const sortingOption = [
    { option: 'Name (A - Z)', direction: 'asc' },
    { option: 'Name (Z - A)', direction: 'desc' },
  ];
  
sortingOption.forEach(({ option, direction }) => {
  test(`Verify user can perform sorting by name ${direction}`, async ({ page }) => { 
// Open homepage: https://practicesoftwaretesting.com.
// Select Name (A - Z) / Name (Z - A) in the sort dropdown.
// Assert: 1. Verify all the displayed products are sorted by names ascending or descending.
    await page.goto('/');
    await page.getByTestId('sort').click();
    await page.selectOption('[data-test="sort"]', { label: option });
   
    const productNames = await page.getByTestId('product-name').allTextContents();
    const sortedNames = [...productNames].sort()
  
    if (direction === 'desc') {
      sortedNames.reverse();
    }
    expect(productNames).toEqual(sortedNames);
    
  });
});




