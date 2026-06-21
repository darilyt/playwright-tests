import { test, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { expect } from "@playwright/test";
import { HeaderFragment } from './header.fragment';

export class CheckoutPage extends BasePage {

    header: HeaderFragment;
    constructor(page: Page) {
        super(page);
        this.header = new HeaderFragment(page);
    }

    countryField: Locator = this.page.getByTestId('country');
    postalCodeField: Locator = this.page.getByTestId('postal_code');
    houseNumberField: Locator = this.page.getByTestId('house_number');
    paymentMethodDropdownField: Locator = this.page.getByTestId('payment-method');
    creditCardNumberField: Locator = this.page.getByTestId('credit_card_number');
    creditCardCVVField: Locator = this.page.getByTestId('cvv');
    creditCardExpirationField: Locator = this.page.getByTestId('expiration_date');
    creditCardHolderField: Locator = this.page.getByTestId('card_holder_name');


    async verifyNumberOfProducts(expectedCount: number): Promise<void> {
        await test.step('Verify the number of products in the cart table equals {x}', async () => {
            await expect(this.page.getByTestId('product-title')).toHaveCount(expectedCount);
        });
    }

    async verifyProductTitle(productToVerify: string): Promise<void> {
        await test.step('Verify product title in the cart', async () => {
            await expect(this.page.getByTestId('product-title')).toHaveText(productToVerify);
        });
    }

    async verifyProceedToCheckoutButtonVisible(): Promise<void> {
        await test.step('Verify "Proceed to Checkout" button is visible', async () => {
            await expect(this.page.getByRole('button', { name: 'Proceed to Checkout' })).toBeVisible();
        });
    }


    async verifyProductNameOnCheckout(expectedName: string): Promise<void> {
        await test.step('Verify Product Name on Checkout', async () => {
            await expect(this.page.getByTestId('product-title')).toHaveText(expectedName);
        });
    }

    async verifyProductPriceOnCheckout(expectedPrice: string): Promise<void> {
        await test.step('Verify Product Price on Checkout', async () => {
            await expect(this.page.getByTestId('product-price')).toHaveText(expectedPrice);
        });
    }

    async verifyTotalPriceOnCheckout(expectedTotal: string): Promise<void> {
        await test.step('Verify Total Price on Checkout', async () => {
            await expect(this.page.getByTestId('cart-total')).toHaveText(expectedTotal);
        })

    }

    async clickOnProceedToCheckout(): Promise<void> {
        await test.step('Click Proceed to Checkout', async () => {
            await this.page.getByTestId('proceed-1').click();
        });
    }

    async clickOnProceedToCheckout2(): Promise<void> {
        await test.step('Click Proceed to Checkout', async () => {
            await this.page.getByTestId('proceed-2').click();
            await this.page.waitForLoadState()
            //without this waitForLoadState() test fails
        });
    }
        async clickOnProceedToCheckout3ToPayment(): Promise<void> {
        await test.step('Click Proceed to Checkout', async () => {
            await this.page.getByTestId('proceed-3').click();
        });
    }

    async fillInBillingAddress(userCountry: string, userPostalCode: string, userHouseNumber: string): Promise<void> {
        await test.step('Fill in billing information', async () => {
            //заповнюються тільки обов'язкові поля, які відсутні. В даному випадку це Country, Postal code і House number. Enter country, postal code and house number. We will fill in the rest automatically.
            await this.countryField.selectOption(userCountry);
            await this.postalCodeField.clear();
            await this.postalCodeField.fill(userPostalCode);
            await this.houseNumberField.clear();
            await this.houseNumberField.fill(userHouseNumber);
        });
    }
   
    async payWithPaymentMethodCreditCard(cardNumber: string, cardCVV: string, cardExpiration: string, cardHolder: string): Promise<void> {
        await test.step('Select Credit Card Payment Method and fill in details', async () => {
            await this.paymentMethodDropdownField.selectOption('Credit Card');
            await this.creditCardNumberField.fill(cardNumber);
            await this.creditCardCVVField.clear();
            await this.creditCardCVVField.fill(cardCVV);
            await this.creditCardExpirationField.clear();
            await this.creditCardExpirationField.fill(cardExpiration);
            await this.creditCardHolderField.clear();
            await this.creditCardHolderField.fill(cardHolder);   
        });

        await test.step('Confirm payment', async () => {
            await this.page.getByTestId('finish').click();
        });
    }

    async verifySuccessfullCheckout(expectedSuccessMessage: string): Promise<void> {
        await test.step('Verify Success Message on Checkout', async () => {
            await expect(this.page.getByTestId('payment-success-message')).toHaveText(expectedSuccessMessage);
        });
    }

}
