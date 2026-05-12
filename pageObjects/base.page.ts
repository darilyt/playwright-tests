import { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';

export class BasePage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async verifyURLContains(urlPart: RegExp): Promise<void> {
        await test.step('Verify URL contains', async () => {
            await expect(this.page).toHaveURL(urlPart);
        });
    }
}