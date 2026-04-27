import test, { chromium, expect } from "@playwright/test";
import { regularUser } from "../test_data/user";

import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.use({storageState: authFile });

const sortingOption = [
    { option: 'Price (High - Low)', direction: 'asc' },
    { option: 'Price (Low - High)', direction: 'desc' },
  ];
  
sortingOption.forEach(({ option, direction }) => {
  test(`Verify user can perform sorting by price ${direction}`, async ({ page }) => { 
// Open homepage: https://practicesoftwaretesting.com.
// Select Price (High - Low) / Price (Low - High) in the sort dropdown.
//Assert: 1. Verify all the displayed products are sorted by prices ascending or descending.

    await page.goto('/');
    await page.getByTestId('sort').click();
    await page.selectOption('[data-test="sort"]', { label: option });
   
    const productPrices = await page.getByTestId('product-price').allTextContents();
    const sortedPrices = [...productPrices].sort()
  
    if (direction === 'desc') {
      sortedPrices.reverse();
    }
    expect(productPrices).toEqual(sortedPrices);
    
  });
});




