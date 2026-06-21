//Module 14

import { test, expect } from '@playwright/test';
import path from 'path';
import { regularUser } from "../test_data/user";

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');
let token: string;

test('get access_token via API', async ({ request }) => {
    const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
        data: {
            email: regularUser.email,
            password: regularUser.password,
        },
    })
    const jsonData = await response.json();
    token = jsonData.access_token;
});

test('verify login via API can be performed successfully', async ({ page }) => {
    const { name } = regularUser;
    
    await page.goto('/auth/login');

    await page.evaluate((token) => {
        localStorage.setItem('auth-token', token);
    }, token);

    await page.reload();
    await expect(page.locator('[data-test="nav-menu"]')).toContainText(name);

    await page.context().storageState({ path: authFile });
});

