//Unit 14: mocking response
import { test } from '../fixtures';
import { mockProducts } from '../utils/mock.utils';

test('Verify 20 mocked products on home page', async ({ page, allPages }) => {
    await mockProducts(page, 20);
    await allPages.homePage.openHomePage();
    await allPages.homePage.verifyNumberOfProducts(20);
});