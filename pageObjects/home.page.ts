import { BasePage } from './base.page';
import { HeaderFragment } from './header.fragment';
import { test, expect, Page, Locator } from '@playwright/test';

export class HomePage extends BasePage {
    header: HeaderFragment;
    constructor(page: Page) {
        super(page);
        this.header = new HeaderFragment(page);
    }

    async openHomePage(): Promise<void> {
        await test.step('Open homepage', async () => {
            // Open homepage: https://practicesoftwaretesting.com.
            await this.page.goto('/');
        });
    }


    async clickOnProduct(productToVerify: string): Promise<void> {
        await test.step('Click on the product', async () => {
            await this.page.getByText(productToVerify).click();
        });
    }


    async getListOfAllProductNames(): Promise<string[]> {
        return await test.step(`Get list of all displayed product names`, async () => {
            await this.page.waitForLoadState();
            return await this.page.getByTestId('product-name').allTextContents();
        });
    }

    async getListOfAllProductPrices(): Promise<string[]> {
        return await test.step(`Get list of all displayed product prices`, async () => {
            await this.page.waitForLoadState();
            return await this.page.getByTestId('product-price').allTextContents();
        });
    }

    async selectSortingOption(option: string): Promise<void> {
        await test.step(`Select ${option} in the sorting dropdown`, async () => {
            const responsePromise = this.page.waitForResponse(response =>
                response.url().endsWith('/products') &&
                (response.request().postData() ?? '').includes('sort') &&
                response.status() === 200
            );
            await this.page.getByTestId('sort').selectOption({ label: option });
            await responsePromise;
        });
    }

    findCategoryByName(categoryName: string): Locator {
        return this.page
            .getByTestId('filters')
            .getByText(categoryName);
    }

    async click1stProduct(): Promise<void> {
        await this.page.locator('[data-test^="product-"]').first().click();
    }


    async get1stProductName(): Promise<string> {
        const text = await this.page
            .getByTestId('product-name')
            .first()
            .textContent();
        return text ?? '';
    }

    async get1stProductPrice(): Promise<string> {
        const text = await this.page
            .getByTestId('product-price')
            .first()
            .textContent();
        return text ?? '';
    }

    async clickOnCategoryCheckbox(category: string): Promise<void> {
        await test.step('Click on the category checkbox', async () => {
            await this.page.getByRole('checkbox', { name: category }).click();
            await this.page.waitForResponse(response =>
                response.url().includes('/products') && response.status() === 200
            );
        });
    }

    async verifyNumberOfProducts(expectedCount: number): Promise<void> {
        await test.step(`Verify ${expectedCount} products are displayed`, async () => {
            await expect(this.page.getByTestId('product-name')).toHaveCount(expectedCount);
    });
}

}
