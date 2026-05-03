import { Page } from '@playwright/test';
import { HeaderFragment } from './header.fragment';
import { test, expect } from '@playwright/test';

export class BasePage {
  page: Page;
  header: HeaderFragment;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page); 
  }

async verifyURLContains(urlPart: RegExp): Promise<void> {
    await test.step('Verify URL contains', async () => {
            await expect(this.page).toHaveURL(urlPart);
        });
    }

}