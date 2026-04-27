import test, { chromium, expect } from "@playwright/test";
import { regularUser } from "../test_data/user";

import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.use({storageState: authFile });

test('Verify user can add product to cart', async ({ page }) => {
  await page.goto('/');

  await test.step('Click on the product "Slip Joint Pliers"', async () => {
// Assert: 1. Verify URL contains https://practicesoftwaretesting.com/product.
// 2. Verify product name is "Slip Joint Pliers".
// 3. Verify product price is 9.17.
    await page.getByText('Slip Joint Pliers').click();    
    await expect(page.getByTestId('product-name')).toHaveText('Slip Joint Pliers');
    await expect(page.getByTestId('unit-price')).toHaveText('9.17');
   });


  await test.step('Click "Add to Cart" button', async () => {
//     Assert: 1. Verify alert message is visible.
// 2. Verify alert message text is "Product added to shopping cart".
// 3. Verify alert disappears in 8 seconds.
// 4. Verify cart icon in navigation shows quantity = 1.
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.getByRole('alert', {name: 'Product added to shopping cart'})
    await expect(page.getByRole('alert')).toBeHidden({ timeout: 8000 });
    await expect(page.getByTestId('cart-quantity')).toHaveText('1');
   });

  await test.step('Click on the cart icon in the navigation.', async () => {
// Assert: 1. Verify URL is https://practicesoftwaretesting.com/checkout.
// 2. Verify the number of products in the cart table equals 1.
// 3. Verify product title in the cart is "Slip Joint Pliers".
// 4. Verify "Proceed to Checkout" button is visible.
    await page.getByTestId('nav-cart').click();
    await expect (page).toHaveURL('/checkout');
    await expect(page.getByTestId('product-title')).toHaveCount(1);
    await expect(page.getByTestId('product-title')).toHaveText('Slip Joint Pliers');
    await expect(page.getByRole('button', { name: 'Proceed to Checkout' })).toBeVisible();
   });


});

