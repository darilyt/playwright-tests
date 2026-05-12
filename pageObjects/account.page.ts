import { test, Page} from '@playwright/test';
import { BasePage } from './base.page';
import { expect } from "@playwright/test";
import { HeaderFragment } from './header.fragment';

export class AccountPage extends BasePage {

    header: HeaderFragment;
    constructor(page: Page) {
        super(page);
        this.header = new HeaderFragment(page);
    }

    async openAccountPage(): Promise<void> {
        await test.step('Open Account Page', async () => {
            await this.page.goto('/account');
        });
    }

    async verifyPageTitle(): Promise<void> {
        await test.step('VerifyPageTitle', async () => {
            await expect(this.page.getByRole('heading', { name: 'My account' })).toBeVisible();
        });
    }

}