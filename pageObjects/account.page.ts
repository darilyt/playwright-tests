import { test } from '@playwright/test';
import { BasePage } from './base.page';
import { expect } from "@playwright/test";

export class AccountPage extends BasePage{

    async openAccountPage (): Promise<void> {
        await test.step('Open Account Page', async () => {
          await this.page.goto('/account');
        });
    }

    async verifyPageTitle (): Promise<void> {
        await test.step('VerifyPageTitle', async () => {
          await expect(this.page.getByRole('heading', { name: 'My account' })).toBeVisible();
        });
    }
    
}