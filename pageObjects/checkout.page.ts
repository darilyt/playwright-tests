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

    CountryField: Locator = this.page.getByTestId('country');
    PostalCodeField: Locator = this.page.getByTestId('postal_code');
    HouseNumberField: Locator = this.page.getByTestId('house_number');
    PaymentMethodDropdownField: Locator = this.page.getByTestId('payment-method');
    CreditCardNumberField: Locator = this.page.getByTestId('credit_card_number');
    CreditCardCVVField: Locator = this.page.getByTestId('cvv');
    CreditCardExpirationField: Locator = this.page.getByTestId('expiration_date');
    CreditCardHolderField: Locator = this.page.getByTestId('card_holder_name');


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
            await this.page.waitForLoadState()
        });
    }

    async clickOnProceedToCheckout2(): Promise<void> {
        await test.step('Click Proceed to Checkout', async () => {
            await this.page.getByTestId('proceed-2').click();
            await this.page.waitForLoadState()
        });
    }
        async clickOnProceedToCheckout3ToPayment(): Promise<void> {
        await test.step('Click Proceed to Checkout', async () => {
            await this.page.getByTestId('proceed-3').click();
            await this.page.waitForLoadState()
        });
    }

    async fillInBillingAddress(userCountry: string, userPostalCode: string, userHouseNumber: string): Promise<void> {
        await test.step('Fill in billing information', async () => {
            //заповнюються тільки обов'язкові поля, які відсутні. В даному випадку це Country, Postal code і House number. Enter country, postal code and house number. We will fill in the rest automatically.
            await this.page.waitForLoadState()
            await this.CountryField.selectOption(userCountry);
            await this.page.waitForLoadState()
            await this.PostalCodeField.clear();
            await this.PostalCodeField.pressSequentially(userPostalCode);
            await this.page.waitForLoadState()
            await this.HouseNumberField.clear();
            await this.HouseNumberField.pressSequentially(userHouseNumber);
        });
    }
   
    async payWithPaymentMethodCreditCard(cardNumber: string, cardCVV: string, cardExpiration: string, cardHolder: string): Promise<void> {
        await test.step('Select Credit Card Payment Method and fill in details', async () => {
            await this.page.waitForLoadState()
            await this.PaymentMethodDropdownField.selectOption('Credit Card');
            await this.page.waitForLoadState()
            await this.CreditCardNumberField.pressSequentially(cardNumber);
            await this.page.waitForLoadState()
            await this.CreditCardCVVField.clear();
            await this.CreditCardCVVField.pressSequentially(cardCVV);
            await this.page.waitForLoadState()
            await this.CreditCardExpirationField.clear();
            await this.CreditCardExpirationField.pressSequentially(cardExpiration);
            await this.page.waitForLoadState()
            await this.CreditCardHolderField.clear();
            await this.CreditCardHolderField.pressSequentially(cardHolder);   
        });

        await test.step('Confirm payment', async () => {
            await this.page.getByTestId('finish').click();
            await this.page.waitForLoadState()
        });
    }

    async verifySuccessfullCheckout(expectedSuccessMessage: string): Promise<void> {
        await test.step('Verify Success Message on Checkout', async () => {
            await expect(this.page.getByTestId('payment-success-message')).toHaveText(expectedSuccessMessage);
        });
    }

}
