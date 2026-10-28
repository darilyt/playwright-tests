import { Page } from '@playwright/test';

export async function mockProducts(page: Page, count: number): Promise<void> {
    await page.route(/\/products(\?|$)/, async (route) => {
        const response = await route.fetch();
        const json = await response.json();

        json.data = Array.from({ length: count }, (_, i) => ({
            ...json.data[0],
            id: `mock-${i + 1}`,
            name: `Mock Product ${i + 1}`,
        }));
        json.per_page = count;
        json.total = count;
        json.to = count;
        json.last_page = 1;

        await route.fulfill({ response, json });
    });
}