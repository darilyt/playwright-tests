import { test, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderFragment } from './header.fragment';

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
            return await this.page.getByTestId('product-name').allTextContents();
        });
    }

    async getListOfAllProductPrices(): Promise<string[]> {
        return await test.step(`Get list of all displayed product prices`, async () => {
            return await this.page.getByTestId('product-price').allTextContents();
        });
    }

    async selectSortingOption(option: string): Promise<void> {
        await test.step(`Select ${option} in the sorting dropdown`, async () => {
            await this.page.getByTestId('sort').click();
            await this.page.selectOption('[data-test="sort"]', { label: option });
        });
    }

    findCategoryByName(categoryName: string): Locator {
        return this.page
            .getByTestId('filters')
            .getByText(categoryName);
    }


    async clickOnCategoryCheckbox(category: string): Promise<void> {
        await test.step('Click on the category checkbox', async () => {
            await this.page.getByRole('checkbox', { name: category }).click();
            await this.page.waitForTimeout(1000)
            //^^solution with waitForTimeout(1000) to be changed to more stable later. 
            // Currently, after clicking on the checkbox, the page is not reloaded, but products are getting updates, so need some time for rendering filtered products.  
        });
    }
}
