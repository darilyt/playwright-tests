//Unit 14: mocking response
import { test, expect } from '@playwright/test';

test('Verify 20 mocked products on PDP', async ({ page }) => {
  await page.route('https://api.practicesoftwaretesting.com/products?page=1&between=price,1,100&is_rental=false', async route => {
      const response = await route.fetch();
      const json = await response.json();
      // Duplicate products until have 20
      json.data = Array.from({ length: 20 }, (_, i) => ({
        ...json.data[0],
        id: `mock-${i + 1}`,
        name: `Mock Product ${i + 1}`,
      }));

      json.per_page = 20;
      json.total = 20;
      json.to = 20;
      json.last_page = 1;

      await route.fulfill({ response, json });
    }
  );

  await page.goto('https://practicesoftwaretesting.com/');
  await expect(page.getByText('Mock Product 1', { exact: true })).toBeVisible();
  await expect(page.locator('[data-test="product-name"]')).toHaveCount(20);
})
