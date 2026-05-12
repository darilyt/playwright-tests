import { Page, test } from '@playwright/test';
import { expect } from "@playwright/test";

export class HeaderFragment {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyUserNameInNavBar(name: string): Promise<void> {
        await test.step('Verify username in the navigation bar', async () => {
            await expect(this.page.getByTestId('nav-menu')).toHaveText(name);
        });
    }


    async clickOnCartIcon(): Promise<void> {
        await test.step('Click on the cart icon in the navigation', async () => {
            await this.page.getByTestId('nav-cart').click();
        });
    }

    async verifyCartQuantity(cartQuantity: string): Promise<void> {
        await test.step('Verify cart icon in navigation shows quantity {x}', async () => {
            await expect(this.page.getByTestId('cart-quantity')).toHaveText(cartQuantity);
        });
    }
}