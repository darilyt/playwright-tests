import { test, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderFragment } from './header.fragment';
import { expect } from "@playwright/test";

export class PDPPage extends BasePage {

    header: HeaderFragment;
    constructor(page: Page) {
        super(page);
        this.header = new HeaderFragment(page);
    }

    async addProductToCart(): Promise<void> {
        await test.step(`Click 'Add to Cart' button`, async () => {
            await this.page.getByRole('button', { name: 'Add to cart' }).click();
        });
    }


    async verifyProductName(expectedName: string): Promise<void> {
        await expect(this.page.getByTestId('product-name')).toHaveText(expectedName);
    }


    async verifyProductPrice(expectedPrice: string): Promise<void> {
        await expect(this.page.getByTestId('unit-price')).toHaveText(expectedPrice);
    }

    async verifyAlertMessageText(alertMessage: string): Promise<void> {
        await expect(this.page.getByRole('alert')).toHaveText(alertMessage);
    }

    async verifyAlertMessageShownTime(timeout: number): Promise<void> {
        await expect(this.page.getByRole('alert')).toBeHidden({ timeout });
    }

    async verifyAddToCart(): Promise<void> {
        await expect(this.page.getByRole('button', { name: 'Add to Cart ' })).toBeVisible();
    }

    async verifyAddToFavorites(): Promise<void> {
        await expect(this.page.getByRole('button', { name: 'Add to favourites ' })).toBeVisible();
    }

}

