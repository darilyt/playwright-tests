//Module 11 - Task 3

import { test } from "../fixtures";
import path from 'path';


const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({ storageState: authFile });



test(`Verify user can view product details: name, price, ATC, Favorites`, async ({ allPages }) => {
    await allPages.homePage.openHomePage();
    const productToVerify = 'Combination Pliers';

    await test.step(`Click on the product "${productToVerify}" and verify product name and product price`, async () => {
        // Click on the product "Combination Pliers"
        await allPages.homePage.clickOnProduct(productToVerify);

        // Assertions:
        // Verify URL contains https://practicesoftwaretesting.com/product.
        await allPages.pdpPage.verifyURLContains(/\/product/);

        // Verify product name is "Combination Pliers".
        await allPages.pdpPage.verifyProductName(productToVerify);

        // Verify product price is 14.15.
        await allPages.pdpPage.verifyProductPrice('14.15');
    });

    await test.step(`Verify ATC`, async () => {
        // Verify "Add to Cart" button is visible.
        await allPages.pdpPage.verifyAddToCart();
    });

    await test.step(`Verify ATC`, async () => {
        // Verify "Add to Favorites" button is visible.
        await allPages.pdpPage.verifyAddToFavorites();

    });
});

