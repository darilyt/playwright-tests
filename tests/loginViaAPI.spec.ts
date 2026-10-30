//Module 14
import { test } from '../fixtures';
import { regularUser } from '../test_data/user';
import { authFile } from '../config/auth';
import { loginAndGetToken } from '../api/auth.api';
import { addLoginToken } from '../utils/auth.utils';

test('login via API and save storage state', async ({ page, request, allPages }) => {
    const token = await loginAndGetToken(request, regularUser.email, regularUser.password);
    await addLoginToken(page, token);
    await allPages.homePage.header.verifyUserNameInNavBar(regularUser.name);

    await page.context().storageState({ path: authFile });
});