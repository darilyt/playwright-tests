import { test } from '@playwright/test';
import { BasePage } from './base.page';

import { expect } from "@playwright/test";

export class CheckoutPage extends BasePage{

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
    
}
