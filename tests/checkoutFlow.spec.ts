//Module 13

import { test } from "../fixtures";
//import path from 'path';
//import { HeaderFragment } from "../pageObjects/header.fragment";
import { regularUser } from "../test_data/user";


test(`Verify user can purchase 1st product from base page`, async ({ loggedInPage }) => {
    await loggedInPage.homePage.openHomePage();
    const headerFragment = loggedInPage.pdpPage.header;
    const { name, userCountry, userPostalCode, userHouseNumber, cardNumber, cardCVV, cardHolder } = regularUser;

    let productToVerifyName: string;
    let productToVerifyPrice: string;

    await test.step(`Add to cart 1st product on base page and store product name and product price`, async () => {

        productToVerifyName = await loggedInPage.homePage.get1stProductName();
        productToVerifyPrice = await loggedInPage.homePage.get1stProductPrice();
        await loggedInPage.homePage.click1stProduct();
        await loggedInPage.pdpPage.addProductToCart();

    });

    await test.step(`Open cart and check product details`, async () => {
        //Відкрити корзину та перевірити, що назва, ціна і сумарна ціна відповідають доданому товару.
        await headerFragment.clickOnCartIcon();
        await loggedInPage.checkoutPage.verifyProductNameOnCheckout(productToVerifyName);
        await loggedInPage.checkoutPage.verifyProductPriceOnCheckout(productToVerifyPrice);
        await loggedInPage.checkoutPage.verifyTotalPriceOnCheckout(productToVerifyPrice);

    });

    await test.step(`Click Proceed to Checkout`, async () => {
        //Натиснути Proceed to checkout
        //Перевірити, що юзер вже залогінений і нічого додатково робити не потрібно
        await loggedInPage.checkoutPage.clickOnProceedToCheckout();
        await loggedInPage.checkoutPage.header.verifyUserNameInNavBar(name);
        //Натиснути Proceed to checkout вдруге
        await loggedInPage.checkoutPage.clickOnProceedToCheckout2();
    });

    await test.step(`Fill in billing details`, async () => {
        //Ввести відсутні поля на сторінці Billing Address
        await loggedInPage.checkoutPage.fillInBillingAddress(userCountry, userPostalCode, userHouseNumber);
    });

    await test.step(`Fill in credit card details`, async () => {
        await loggedInPage.checkoutPage.clickOnProceedToCheckout3ToPayment();
        const date = new Date();
        date.setMonth(date.getMonth() + 3);
        date.getMonth();
        date.getFullYear();
        const expirationDate = ((date.getMonth()+1).toString().padStart(2, "0") + '/' + date.getFullYear());
        await loggedInPage.checkoutPage.payWithPaymentMethodCreditCard(cardNumber, cardCVV, expirationDate, cardHolder);
    });

    await test.step(`Receive success payment message`, async () => {
        await loggedInPage.checkoutPage.verifySuccessfullCheckout('Payment was successful');
    });

});

