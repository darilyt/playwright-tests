//Module 11 - Task 3

import test from "@playwright/test";
import path from 'path';
import { HomePage } from "../pageObjects/home.page";
import { PDPPage } from "../pageObjects/pdp.page";
import { BasePage } from "../pageObjects/base.page";

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({ storageState: authFile });



test(`Verify user can view product details: name, price, ATC, Favorites`, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openHomePage();
    const basePage = new BasePage(page);
    const pdpPage = new PDPPage(page);
    const productToVerify = 'Combination Pliers';

    await test.step(`Click on the product "${productToVerify}" and verify product name and product price`, async () => {
        // Click on the product "Combination Pliers"
        await homePage.clickOnProduct(productToVerify);

        // Assertions:
        // Verify URL contains https://practicesoftwaretesting.com/product.
        await basePage.verifyURLContains(/\/product/);

        // Verify product name is "Combination Pliers".
        await pdpPage.verifyProductName(productToVerify);

        // Verify product price is 14.15.
        await pdpPage.verifyProductPrice('14.15');
    });

    await test.step(`Verify ATC`, async () => {
        // Verify "Add to Cart" button is visible.
        await pdpPage.verifyAddToCart();
    });

    await test.step(`Verify ATC`, async () => {
        // Verify "Add to Favorites" button is visible.
        await pdpPage.verifyAddToFavorites();

    });
});

