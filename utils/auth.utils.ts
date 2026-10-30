import { Page } from '@playwright/test';

export async function addLoginToken(page: Page, token: string): Promise<void> {
    await page.goto('/auth/login');
    await page.evaluate((token) => {
        localStorage.setItem('auth-token', token);
    }, token);
    await page.reload();
}