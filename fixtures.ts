import { test as base } from '@playwright/test';
import { AllPages } from './pageObjects/allPages';
import { regularUser } from './test_data/user';


type MyFixtures = {
    loggedInPage: AllPages;
    allPages: AllPages;
};
export const test = base.extend<MyFixtures>({


    allPages: async ({ page }, use) => {
        await use(new AllPages(page));
    },

    loggedInPage: async ({ allPages }, use) => {
        const { email, password } = regularUser;
        await allPages.loginPage.openLoginPage();
        await allPages.loginPage.performLogin(email, password);
        await use(allPages);
    },

});
