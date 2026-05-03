import { test } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage{

    async openHomePage (): Promise<void> {
    await test.step('Open homepage', async () => {
        // Open homepage: https://practicesoftwaretesting.com.
            await this.page.goto('/');
        });
    }


    async clickOnProduct (productToVerify: string): Promise<void> {
        await test.step('Click on the product', async () => {
            await this.page.getByText(productToVerify).click();
            });
        }


    async getListOfAllProductNames (): Promise<string[]> {
        return await test.step(`Get list of all displayed product names`, async () => {
            return await this.page.getByTestId('product-name').allTextContents();
        });
    }

    async getListOfAllProductPrices (): Promise<string[]> {
        return await test.step(`Get list of all displayed product prices`, async () => {
            return await this.page.getByTestId('product-price').allTextContents();
        });
    }

    async selectSortingOption (option: string): Promise<void> {
        await test.step(`Select ${option} in the sorting dropdown`, async () => {
            await this.page.getByTestId('sort').click();
            await this.page.selectOption('[data-test="sort"]', { label: option });
        });
    }



}
