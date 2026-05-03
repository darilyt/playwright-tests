//Module 12 - Test 1

import test from "@playwright/test";
import path from 'path';
import { HomePage } from "../pageObjects/home.page";
import { PDPPage } from "../pageObjects/pdp.page";
import { BasePage } from "../pageObjects/base.page";
import { CheckoutPage } from "../pageObjects/checkout.page";


const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({storageState: authFile });



test('Verify user can add product to cart', async ({ page }) => { 
  const homePage = new HomePage(page);
  const pdpPage = new PDPPage(page);
  const basePage = new BasePage(page);
  const headerFragment = homePage.header;
  const checkoutPage = new CheckoutPage(page);

  await homePage.openHomePage();
  const productToVerify = 'Slip Joint Pliers'; 

  await test.step(`Click on the product "${productToVerify}" and verify product name and product price`, async () => {
// Assert: 1. Verify URL contains https://practicesoftwaretesting.com/product.
// 2. Verify product name is "Slip Joint Pliers".
// 3. Verify product price is 9.17. 
    await homePage.clickOnProduct(productToVerify);  
    await basePage.verifyURLContains(/\/product/);
    await pdpPage.verifyProductName(productToVerify);
    await pdpPage.verifyProductPrice('9.17');
   });

    await test.step(`Click "Add to Cart" button and verify the alert message text (that it disappears in 8sec), cart icon shows qty=1`, async () => {
//     Assert: 1. Verify alert message is visible.
// 2. Verify alert message text is "Product added to shopping cart".
// 3. Verify alert disappears in 8 seconds.
// 4. Verify cart icon in navigation shows quantity = 1.
    await pdpPage.addProductToCart();
    await pdpPage.verifyAlertMessageText('Product added to shopping cart.');
    await pdpPage.verifyAlertMessageShownTime(8000);
    await headerFragment.verifyCartQuantity('1');
   });

  await test.step(`Click on the cart icon in the navigation and verify # of products in cart, product title and verify "Proceed to Checkout" is available`, async () => {
// Assert: 1. Verify URL is https://practicesoftwaretesting.com/checkout.
// 2. Verify the number of products in the cart table equals 1.
// 3. Verify product title in the cart is "Slip Joint Pliers".
// 4. Verify "Proceed to Checkout" button is visible.  
    await headerFragment.clickOnCartIcon();
    await basePage.verifyURLContains(/\/checkout/);
  
    await checkoutPage.verifyNumberOfProducts(1);
    await checkoutPage.verifyProductTitle(productToVerify);
    await checkoutPage.verifyProceedToCheckoutButtonVisible();
   });
});

